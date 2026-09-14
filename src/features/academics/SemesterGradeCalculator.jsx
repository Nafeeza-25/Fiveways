import { motion } from 'framer-motion'
import { BookOpenCheck, Database, RotateCcw, Save, Sigma } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/Button'
import AnimatedNumber from '../../components/motion/AnimatedNumber'
import useLocalStorage from '../../hooks/useLocalStorage'
import { getCourses, getDepartments, getSemesters, regulations } from '../../data/curriculum'
import { calculateCgpa, calculateSemesterResult, DEFAULT_GRADE_POINTS, upsertSemesterResult } from './academicLogic'

const gradeOptions = Object.entries(DEFAULT_GRADE_POINTS)
const selectClass = 'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100'
function semesterLabel(value) { return `Semester ${value}` }

export default function SemesterGradeCalculator() {
  const [regulation, setRegulation] = useState(regulations[0] ?? '')
  const departmentOptions = getDepartments(regulation)
  const [department, setDepartment] = useState(departmentOptions[0]?.code ?? '')
  const semesterOptions = getSemesters(regulation, department)
  const [semester, setSemester] = useState(semesterOptions[0] ?? '')
  const [gradesByCode, setGradesByCode] = useState({})
  const [savedSemesters, setSavedSemesters] = useLocalStorage('fiveways-academic-semesters', [])

  const courses = getCourses(regulation, department, semester)
  const currentResult = useMemo(() => calculateSemesterResult({ courses, gradesByCode }), [courses, gradesByCode])
  const savedForProgram = useMemo(() => savedSemesters.filter((item) => item.regulation === regulation && item.department === department).sort((a, b) => Number(a.semester) - Number(b.semester)), [savedSemesters, regulation, department])
  const cumulativeCgpa = calculateCgpa(savedForProgram)

  useEffect(() => {
    const saved = savedSemesters.find((item) => item.regulation === regulation && item.department === department && Number(item.semester) === Number(semester))
    setGradesByCode(saved?.gradesByCode ?? {})
  }, [regulation, department, semester, savedSemesters])

  function changeRegulation(nextRegulation) { const departments = getDepartments(nextRegulation); const nextDepartment = departments[0]?.code ?? ''; const semesters = getSemesters(nextRegulation, nextDepartment); setRegulation(nextRegulation); setDepartment(nextDepartment); setSemester(semesters[0] ?? '') }
  function changeDepartment(nextDepartment) { const semesters = getSemesters(regulation, nextDepartment); setDepartment(nextDepartment); setSemester(semesters[0] ?? '') }
  function updateGrade(code, grade) { setGradesByCode((current) => ({ ...current, [code]: grade })) }
  function saveSemester() { if (!currentResult) return; const next = { regulation, department, semester: Number(semester), gradesByCode, ...currentResult, savedAt: new Date().toISOString() }; setSavedSemesters((current) => upsertSemesterResult(current, next)) }

  const requiredCourses = courses.filter((course) => Number(course.credits) > 0)
  const completedGrades = requiredCourses.filter((course) => gradesByCode[course.code]).length
  const isSaved = savedForProgram.some((item) => Number(item.semester) === Number(semester))
  const progress = requiredCourses.length ? (completedGrades / requiredCourses.length) * 100 : 0

  return (
    <section aria-labelledby="semester-calculator-title">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-700"><Sigma className="h-4 w-4" /> Main calculator</p><h2 id="semester-calculator-title" className="mt-3 text-3xl font-black tracking-[-.045em] text-slate-950 sm:text-4xl">Enter grades. Credits are already handled.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">Choose your regulation, department and semester. FIVEWAYS loads the subjects and credits from an admin-managed curriculum, so you only select your letter grades.</p></div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-black text-cyan-800"><Database className="h-4 w-4" /> Admin-managed credits</div>
      </div>

      <div className="mt-7 grid gap-4 rounded-[30px] border border-cyan-100 bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
        <label className="grid gap-2 text-sm font-bold text-slate-700"><span>Regulation</span><select aria-label="Academic regulation" className={selectClass} value={regulation} onChange={(event) => changeRegulation(event.target.value)}>{regulations.map((item) => <option key={item} value={item}>{item} (CBCS)</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700"><span>Department</span><select aria-label="Academic department" className={selectClass} value={department} onChange={(event) => changeDepartment(event.target.value)}>{departmentOptions.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700"><span>Semester</span><select aria-label="Academic semester" className={selectClass} value={semester} onChange={(event) => setSemester(Number(event.target.value))}>{semesterOptions.map((item) => <option key={item} value={item}>{semesterLabel(item)}</option>)}</select></label>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr] xl:items-start">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_70px_rgba(15,23,42,.07)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><strong className="text-lg font-black text-slate-950">{semesterLabel(semester)} subjects</strong><span className="mt-1 block text-xs font-semibold text-slate-500">{completedGrades}/{requiredCourses.length} credit-bearing grades selected</span><div className="mt-3 h-1.5 w-52 overflow-hidden rounded-full bg-slate-100"><motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" animate={{ width: `${progress}%` }} transition={{ duration: .35 }} /></div></div><Button variant="ghost" type="button" onClick={() => setGradesByCode({})}><RotateCcw className="h-4 w-4" /> Reset grades</Button></div>

          <div role="table" aria-label={`${semesterLabel(semester)} subjects and grades`}>
            <div className="hidden grid-cols-[1fr_90px_150px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-[10px] font-black uppercase tracking-[.18em] text-slate-400 md:grid" role="row"><span role="columnheader">Course</span><span role="columnheader">Credits</span><span role="columnheader">Grade</span></div>
            {courses.map((course) => <div className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 md:grid-cols-[1fr_90px_150px] md:items-center md:px-6" role="row" key={course.code}>
              <div role="cell"><strong className="block text-sm font-extrabold text-slate-900">{course.title}</strong><span className="mt-1 block text-[11px] font-bold tracking-wide text-slate-400">{course.code}</span></div>
              <div role="cell"><span className={`inline-flex min-w-10 justify-center rounded-full px-2.5 py-1 text-xs font-black ${Number(course.credits) === 0 ? 'bg-slate-100 text-slate-400' : 'bg-cyan-50 text-cyan-800'}`} aria-label={`${course.credits} credits`}>{course.credits}</span></div>
              <label role="cell"><span className="sr-only">Grade for {course.title}</span><select aria-label={`Grade for ${course.title}`} value={gradesByCode[course.code] ?? ''} onChange={(event) => updateGrade(course.code, event.target.value)} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-800 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"><option value="">{Number(course.credits) === 0 ? 'Optional' : 'Select'}</option>{gradeOptions.map(([grade, point]) => <option key={grade} value={grade}>{grade} · {point}</option>)}</select></label>
            </div>)}
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><p className="max-w-2xl text-xs leading-5 text-slate-500">Grade points follow the IFET COE Manual scale: O=10, A+=9, A=8, B+=7, B=6, C=5 and U=0. Non-credit mandatory courses do not affect GPA/CGPA.</p><Button type="button" onClick={saveSemester} disabled={!currentResult}><Save className="h-4 w-4" /> {isSaved ? 'Update semester result' : 'Save semester result'}</Button></div>
        </div>

        <aside className="grid gap-4" aria-live="polite">
          <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-cyan-950 via-indigo-950 to-slate-950 p-6 text-white shadow-2xl"><div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/[.15] blur-3xl" /><p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300">Semester GPA</p><strong className="relative mt-2 block text-6xl font-black tracking-[-.07em]">{currentResult ? <AnimatedNumber value={currentResult.sgpa} /> : '—'}</strong><span className="relative mt-2 block text-xs leading-5 text-white/50">{currentResult ? 'Calculated from subject credits × grade points.' : 'Select a grade for every credit-bearing subject to calculate SGPA.'}</span></div>

          <div className="grid grid-cols-2 gap-3"><div className="rounded-[24px] border border-slate-200 bg-white p-5"><span className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Credits registered</span><strong className="mt-2 block text-2xl font-black text-slate-950">{currentResult?.creditsRegistered ?? '—'}</strong></div><div className="rounded-[24px] border border-slate-200 bg-white p-5"><span className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Grade points</span><strong className="mt-2 block text-2xl font-black text-slate-950">{currentResult ? currentResult.gradePointsEarned.toFixed(1) : '—'}</strong></div></div>

          <div className="rounded-[28px] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-cyan-50 p-6"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-indigo-600"><BookOpenCheck className="h-4 w-4" /> Cumulative</div><span className="mt-5 block text-sm font-bold text-slate-500">Current CGPA</span><strong className="mt-1 block text-5xl font-black tracking-[-.06em] text-slate-950">{cumulativeCgpa === null ? '—' : <AnimatedNumber value={cumulativeCgpa} />}</strong><small className="mt-3 block text-xs leading-5 text-slate-500">{savedForProgram.length === 0 ? 'Save semester results to build your CGPA.' : `Based on ${savedForProgram.length} saved semester${savedForProgram.length === 1 ? '' : 's'} and their actual credits.`}</small></div>

          {savedForProgram.length > 0 && <div className="rounded-[26px] border border-slate-200 bg-white p-5"><strong className="text-xs font-black uppercase tracking-[.16em] text-slate-500">Saved semesters</strong><div className="mt-3 grid gap-2">{savedForProgram.map((item) => <button key={`${item.regulation}-${item.department}-${item.semester}`} type="button" className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left transition hover:bg-cyan-50" onClick={() => setSemester(Number(item.semester))}><span className="text-sm font-bold text-slate-700">{semesterLabel(item.semester)}</span><strong className="text-sm font-black text-cyan-800">{Number(item.sgpa).toFixed(2)}</strong></button>)}</div></div>}
        </aside>
      </div>

      <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-xs leading-5 text-cyan-950">Competition curriculum data currently demonstrates CSE Regulation 2023 using the supplied IFET grade sheets and Semester V timetable. In production, the college admin can add or update departments, semesters, subjects, credits and the complete official grade scale without students entering credits manually.</div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Gauge, Goal, WandSparkles } from 'lucide-react'
import { useState } from 'react'
import AnimatedNumber from '../../components/motion/AnimatedNumber'
import { Input } from '../../components/ui/input'
import { projectCgpa, requiredAverageSgpa } from './academicLogic'

const initial = { currentCgpa: '8.14', completedSemesters: '4', targetCgpa: '8.50', futureSemesters: '4', whatIf1: '8.70', whatIf2: '9.00' }

export default function AcademicPlanner() {
  const [form, setForm] = useState(initial)
  const required = requiredAverageSgpa({ currentCgpa: form.currentCgpa, completedSemesters: Number(form.completedSemesters), targetCgpa: form.targetCgpa, futureSemesters: Number(form.futureSemesters) })
  const projected = projectCgpa({ currentCgpa: form.currentCgpa, completedSemesters: Number(form.completedSemesters), futureSgpas: [form.whatIf1, form.whatIf2] })
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })) }
  const field = (label, key, min, max, step='0.01') => <label className="grid gap-2 text-sm font-bold text-slate-700"><span>{label}</span><Input aria-label={label} type="number" min={min} max={max} step={step} value={form[key]} onChange={(e) => update(key, e.target.value)} className="focus:border-indigo-400 focus:ring-indigo-100" /></label>

  return (
    <div className="grid gap-5 xl:grid-cols-[1.12fr_.88fr] xl:items-start">
      <section className="rounded-[30px] border border-indigo-100 bg-white p-6 shadow-sm sm:p-7"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-700"><Goal className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-indigo-600">Target inputs</p><h3 className="text-xl font-black text-slate-950">Set your target</h3></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{field('Current CGPA','currentCgpa',0,10)}{field('Completed semesters','completedSemesters',1,8,'1')}{field('Target CGPA','targetCgpa',0,10)}{field('Future semesters','futureSemesters',1,8,'1')}</div><div className="mt-7 border-t border-slate-100 pt-6"><div className="flex items-center gap-2"><WandSparkles className="h-4 w-4 text-indigo-600" /><h4 className="font-black text-slate-950">What if?</h4></div><div className="mt-4 grid gap-4 sm:grid-cols-2">{field('What-if SGPA 1','whatIf1',0,10)}{field('What-if SGPA 2','whatIf2',0,10)}</div></div></section>

      <aside className="grid gap-4">
        <motion.div layout className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950 p-6 text-white shadow-2xl"><Gauge className="h-5 w-5 text-indigo-300" /><p className="mt-5 text-xs font-black uppercase tracking-[.17em] text-indigo-300">Average SGPA to aim for</p>{required === null ? <><strong className="mt-2 block text-5xl font-black">—</strong><span className="mt-3 block text-xs leading-5 text-white/50">This target is not reachable under the current estimate because it would require an SGPA above 10, or one of the inputs is invalid.</span></> : <><strong className="mt-2 block text-6xl font-black tracking-[-.07em]"><AnimatedNumber value={required} /></strong><span className="mt-3 block text-xs leading-5 text-white/[.55]">Aim for an average SGPA of about {required.toFixed(2)} across the remaining semesters.</span></>}</motion.div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6"><p className="text-xs font-black uppercase tracking-[.17em] text-slate-400">Projected CGPA after two what-if semesters</p><strong className="mt-2 block text-5xl font-black tracking-[-.06em] text-slate-950">{projected === null ? '—' : <AnimatedNumber value={projected} />}</strong><span className="mt-3 block text-xs leading-5 text-slate-500">Based on SGPA {form.whatIf1 || '—'} and {form.whatIf2 || '—'}.</span></div>
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-xs leading-5 text-indigo-950">Goal-planner <strong>estimate only</strong>: this lower section uses equal semester weighting for quick what-if exploration. The semester calculator above uses the admin-managed course credits for SGPA/CGPA.</div>
      </aside>
    </div>
  )
}

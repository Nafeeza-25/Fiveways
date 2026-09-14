import { AnimatePresence, motion } from 'framer-motion'
import { Check, FileText, GraduationCap, School, UserRound } from 'lucide-react'
import { useState } from 'react'
import Button from '../../components/Button'
import { Card, CardContent } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'

const emptyProfile = {
  department: '', year: '', governmentSchool: false, firstGeneration: false,
  incomeRange: '', category: '', documents: [],
}

const documents = ['Aadhaar', 'Bonafide Certificate', 'Income Certificate', 'Community Certificate', 'First Graduate Certificate', 'School Study Certificate']
const stepTitles = ['About you', 'Education background', 'Eligibility details', 'Documents']
const StepIcon = [UserRound, School, GraduationCap, FileText]
const fieldClass = 'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100'

export default function ScholarshipWizard({ initialProfile = emptyProfile, onComplete }) {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState({ ...emptyProfile, ...initialProfile, documents: initialProfile.documents ?? [] })
  const stepValid = [Boolean(profile.department && profile.year), true, Boolean(profile.incomeRange && profile.category), true][step]

  function update(key, value) { setProfile((current) => ({ ...current, [key]: value })) }
  function toggleDocument(document) {
    setProfile((current) => ({ ...current, documents: current.documents.includes(document) ? current.documents.filter((item) => item !== document) : [...current.documents, document] }))
  }

  const Icon = StepIcon[step]
  return (
    <Card className="mx-auto max-w-4xl overflow-hidden border-violet-100">
      <div className="grid lg:grid-cols-[230px_1fr]">
        <aside className="bg-gradient-to-b from-violet-950 via-indigo-950 to-slate-950 p-6 text-white">
          <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10"><GraduationCap className="h-5 w-5 text-violet-200" /></div><div><span className="text-[10px] font-black tracking-[.18em] text-violet-200">MATCH PROFILE</span><strong className="block text-sm">4 quick steps</strong></div></div>
          <div className="mt-8 grid gap-3">
            {stepTitles.map((title, index) => <div key={title} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition ${index === step ? 'bg-white/10 text-white' : index < step ? 'text-violet-200' : 'text-white/[.35]'}`}><span className={`grid h-7 w-7 place-items-center rounded-full border text-[11px] ${index <= step ? 'border-violet-300/40 bg-violet-400/[.15]' : 'border-white/10'}`}>{index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>{title}</div>)}
          </div>
        </aside>

        <CardContent className="p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[.18em] text-slate-400"><span>Step {step + 1} of 4</span><span>{Math.round(((step + 1) / 4) * 100)}%</span></div><Progress value={((step + 1) / 4) * 100} indicatorClassName="bg-gradient-to-r from-violet-600 to-fuchsia-500" /></div></div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: .22 }}>
              <p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Step {step + 1}</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-slate-950">{stepTitles[step]}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">A few details help FIVEWAYS surface opportunities worth checking. This is guidance, not an official eligibility decision.</p>

              {step === 0 && <div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold text-slate-700"><span>Department</span><select aria-label="Department" className={fieldClass} value={profile.department} onChange={(e) => update('department', e.target.value)}><option value="">Select department</option><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="MECH">Mechanical</option><option value="CIVIL">Civil</option></select></label><label className="grid gap-2 text-sm font-bold text-slate-700"><span>Year</span><select aria-label="Year" className={fieldClass} value={profile.year} onChange={(e) => update('year', Number(e.target.value))}><option value="">Select year</option>{[1,2,3,4].map((year) => <option value={year} key={year}>Year {year}</option>)}</select></label></div>}

              {step === 1 && <div className="mt-7 grid gap-3 sm:grid-cols-2">{[
                ['governmentSchool', 'Government-school background', 'Select if this applies to your schooling background.'],
                ['firstGeneration', 'First-generation student', 'Select if this applies to you.'],
              ].map(([key, title, help]) => <label key={key} className={`group flex cursor-pointer gap-3 rounded-[22px] border p-4 transition ${profile[key] ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-white hover:border-violet-200'}`}><input type="checkbox" aria-label={title} className="mt-1 h-4 w-4 accent-violet-600" checked={profile[key]} onChange={(e) => update(key, e.target.checked)} /><span><strong className="text-sm text-slate-900">{title}</strong><span className="mt-1 block text-xs leading-5 text-slate-500">{help}</span></span></label>)}</div>}

              {step === 2 && <div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold text-slate-700"><span>Income range</span><select aria-label="Income range" className={fieldClass} value={profile.incomeRange} onChange={(e) => update('incomeRange', e.target.value)}><option value="">Select range</option><option value="under-250000">Below ₹2.5 lakh</option><option value="250000-500000">₹2.5–5 lakh</option><option value="above-500000">Above ₹5 lakh</option></select></label><label className="grid gap-2 text-sm font-bold text-slate-700"><span>Category</span><select aria-label="Category" className={fieldClass} value={profile.category} onChange={(e) => update('category', e.target.value)}><option value="">Select category</option><option value="BC">BC</option><option value="MBC">MBC</option><option value="SC">SC</option><option value="ST">ST</option><option value="Minority">Minority</option><option value="General">General / Other</option></select></label></div>}

              {step === 3 && <div className="mt-7 grid gap-3 sm:grid-cols-2">{documents.map((document) => { const selected = profile.documents.includes(document); return <label key={document} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-bold transition ${selected ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-slate-200 text-slate-700 hover:border-violet-200'}`}><input type="checkbox" aria-label={document} className="h-4 w-4 accent-violet-600" checked={selected} onChange={() => toggleDocument(document)} /><span className={`grid h-7 w-7 place-items-center rounded-full ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{selected ? <Check className="h-4 w-4" /> : <FileText className="h-3.5 w-3.5" />}</span>{document}</label> })}</div>}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-5"><Button variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</Button>{step < 3 ? <Button disabled={!stepValid} onClick={() => setStep((current) => current + 1)}>Continue</Button> : <Button onClick={() => onComplete(profile)}>Find scholarships</Button>}</div>
        </CardContent>
      </div>
    </Card>
  )
}

import { motion } from 'framer-motion'
import { ArrowDown, Target } from 'lucide-react'
import FeatureHero from '../../components/FeatureHero'
import AcademicPlanner from './AcademicPlanner'
import SemesterGradeCalculator from './SemesterGradeCalculator'
import Reveal from '../../components/motion/Reveal'

export default function AcademicsPage() {
  return (
    <section className="bg-slate-50">
      <FeatureHero variant="academics" title="Plan My Academics" question="What should I aim for next?" description="Grades become motion, credits become weight, and semester results build into one cumulative number. The page visually communicates calculation before the student touches a field." meta="Credits loaded automatically" />
      <div className="relative z-10 -mt-10 rounded-t-[42px] bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <Reveal><SemesterGradeCalculator /></Reveal>
        <motion.div className="my-14 flex items-center gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><span className="h-px flex-1 bg-slate-200" /><span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-400"><ArrowDown className="h-4 w-4" /></span><span className="h-px flex-1 bg-slate-200" /></motion.div>
        <Reveal><section><div className="mb-7 flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-100 text-indigo-700"><Target className="h-5 w-5" /></span><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">Goal planner</p><h2 className="mt-2 text-3xl font-black tracking-[-.045em] text-slate-950">Target CGPA & What If?</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Keep the original FIVEWAYS planner underneath the main calculator. Use your calculated CGPA above as the starting point when you want to explore possible outcomes.</p></div></div><AcademicPlanner /></section></Reveal>
      </div></div>
    </section>
  )
}

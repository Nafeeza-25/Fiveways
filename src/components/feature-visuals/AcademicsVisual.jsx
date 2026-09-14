import { motion, useReducedMotion } from 'framer-motion'
import { BookOpenCheck, Sigma } from 'lucide-react'

export default function AcademicsVisual({ compact = false }) {
  const reduce = useReducedMotion()
  const bars = [64, 78, 88, 72, 94]
  return (
    <div className={`relative overflow-hidden ${compact ? 'h-full min-h-32' : 'h-[300px] sm:h-[360px]'} rounded-[30px] border border-cyan-300/[.15] bg-[#071827] shadow-2xl shadow-cyan-950/40`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(6,182,212,.28),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(79,70,229,.22),transparent_32%)]" />
      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-cyan-100 backdrop-blur"><Sigma className="h-5 w-5 text-cyan-300" /><span className="text-xs font-black tracking-[.18em]">CREDIT × GRADE</span></div>
      <motion.div className="absolute left-[12%] top-[35%] grid h-28 w-28 place-items-center rounded-full border border-cyan-200/20 bg-white/5 shadow-[0_0_70px_rgba(6,182,212,.25)] backdrop-blur-xl" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        <motion.div className="grid h-20 w-20 place-items-center rounded-full border border-indigo-300/20 bg-indigo-500/10" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}><div className="text-center text-white"><span className="block text-[10px] font-black tracking-[.2em] text-cyan-200">CGPA</span><strong className="text-2xl">8.72</strong></div></motion.div>
      </motion.div>
      <div className="absolute bottom-7 right-6 flex h-28 w-[45%] items-end gap-2 rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        {bars.map((height, index) => <motion.span key={height} className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500 to-cyan-300" initial={{ height: 8 }} animate={reduce ? { height: `${height}%` } : { height: [`${Math.max(18, height - 24)}%`, `${height}%`, `${Math.max(18, height - 10)}%`] }} transition={{ duration: 3 + index * .25, repeat: Infinity, delay: index * .12 }} />)}
      </div>
      {!compact && <div className="absolute right-7 top-[25%] flex items-center gap-2 text-cyan-100"><BookOpenCheck className="h-5 w-5 text-cyan-300" /><span className="text-xs font-bold">Subjects loaded automatically</span></div>}
    </div>
  )
}

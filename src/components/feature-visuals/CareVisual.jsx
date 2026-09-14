import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, CircleDot, ClipboardPlus, Wrench } from 'lucide-react'

export default function CareVisual({ compact = false }) {
  const reduce = useReducedMotion()
  const stages = [
    { Icon: ClipboardPlus, label: 'Report', x: '8%' },
    { Icon: CircleDot, label: 'Track', x: '39%' },
    { Icon: Wrench, label: 'Resolve', x: '70%' },
  ]
  return (
    <div className={`relative overflow-hidden ${compact ? 'h-full min-h-32' : 'h-[300px] sm:h-[360px]'} rounded-[30px] border border-emerald-300/[.15] bg-[#071d18] shadow-2xl shadow-emerald-950/40`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(16,185,129,.32),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(45,212,191,.15),transparent_28%)]" />
      <div className="absolute left-[12%] right-[12%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300" initial={{ width: '8%' }} animate={reduce ? undefined : { width: ['8%', '100%', '8%'] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
      {stages.map(({ Icon, label, x }, index) => (
        <motion.div key={label} className="absolute top-[34%] flex flex-col items-center gap-3" style={{ left: x }} animate={reduce ? undefined : { y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * .35 }}>
          <div className="grid h-14 w-14 place-items-center rounded-[20px] border border-emerald-200/[.15] bg-white/10 text-emerald-200 shadow-2xl backdrop-blur-xl"><Icon className="h-6 w-6" /></div>
          {!compact && <span className="text-xs font-black uppercase tracking-[.18em] text-emerald-100/[.8]0">{label}</span>}
        </motion.div>
      ))}
      <motion.div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-2xl border border-emerald-300/[.15] bg-emerald-400/10 px-3 py-2 text-xs font-extrabold text-emerald-100 backdrop-blur" animate={reduce ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 2.4, repeat: Infinity }}><CheckCircle2 className="h-4 w-4" /> Ticket progress visible</motion.div>
    </div>
  )
}

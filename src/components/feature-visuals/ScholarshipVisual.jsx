import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, FileCheck2, GraduationCap, Sparkles } from 'lucide-react'

export default function ScholarshipVisual({ compact = false }) {
  const reduce = useReducedMotion()
  const cards = [
    { icon: GraduationCap, label: 'Profile', x: '12%', y: '24%', delay: 0 },
    { icon: FileCheck2, label: 'Documents', x: '58%', y: '13%', delay: .25 },
    { icon: BadgeCheck, label: 'Match', x: '56%', y: '58%', delay: .5 },
  ]
  return (
    <div className={`relative overflow-hidden ${compact ? 'h-full min-h-32' : 'h-[300px] sm:h-[360px]'} rounded-[30px] border border-violet-300/[.15] bg-[#140d2c] shadow-2xl shadow-violet-950/40`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(139,92,246,.33),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(216,180,254,.14),transparent_25%)]" />
      {[70, 120, 170].map((size, index) => (
        <motion.div key={size} className="absolute left-1/2 top-1/2 rounded-full border border-violet-300/[.15]" style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }} animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [.35, .12, .35] }} transition={{ duration: 3 + index * .7, repeat: Infinity, delay: index * .2 }} />
      ))}
      <motion.div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] border border-violet-200/20 bg-violet-500/20 text-violet-100 shadow-[0_0_60px_rgba(139,92,246,.45)] backdrop-blur-xl" animate={reduce ? undefined : { rotate: [0, 4, -4, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        <Sparkles className="h-9 w-9" />
      </motion.div>
      {cards.map(({ icon: Icon, label, x, y, delay }) => (
        <motion.div key={label} className="absolute flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-extrabold text-violet-50 shadow-xl backdrop-blur-xl" style={{ left: x, top: y }} animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 3.4, repeat: Infinity, delay }}>
          <Icon className="h-4 w-4 text-violet-300" /> {label}
        </motion.div>
      ))}
      {!compact && (
        <motion.div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-emerald-100 backdrop-blur-xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>
          <div className="flex items-center justify-between gap-3"><span className="text-xs font-black tracking-[.2em]">MATCH ENGINE</span><strong className="text-lg">3 opportunities</strong></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-emerald-300" initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.1, delay: .6 }} /></div>
        </motion.div>
      )}
    </div>
  )
}

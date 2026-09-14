import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Ticket, Trophy, Users } from 'lucide-react'

export default function EventsVisual({ compact = false }) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative overflow-hidden ${compact ? 'h-full min-h-32' : 'h-[300px] sm:h-[360px]'} rounded-[30px] border border-orange-300/[.15] bg-[#281109] shadow-2xl shadow-orange-950/40`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(249,115,22,.35),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(251,191,36,.18),transparent_28%)]" />
      <motion.div className="absolute left-[12%] top-[14%] w-[48%] rounded-[26px] border border-white/[.15] bg-white/10 p-4 text-white shadow-2xl backdrop-blur-xl" animate={reduce ? undefined : { rotateZ: [-3, -1, -3], y: [0, -5, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>
        <div className="flex items-center justify-between"><CalendarDays className="h-5 w-5 text-orange-300" /><span className="text-[10px] font-black tracking-[.22em] text-orange-200">07 SEP</span></div>
        <strong className="mt-5 block text-xl">WebCraft 2026</strong>
        {!compact && <span className="mt-1 block text-xs text-orange-100/70">Competition · IFET Campus</span>}
      </motion.div>
      <motion.div className="absolute right-[9%] top-[31%] w-[42%] rounded-[24px] border border-white/[.15] bg-gradient-to-br from-orange-400/25 to-amber-300/5 p-4 text-white shadow-2xl backdrop-blur-xl" animate={reduce ? undefined : { rotateZ: [4, 1, 4], y: [0, 7, 0] }} transition={{ duration: 4.1, repeat: Infinity, delay: .2 }}>
        <Ticket className="h-6 w-6 text-amber-300" /><strong className="mt-3 block">Discover</strong><span className="text-xs text-orange-100/70">Filter · Save · Join</span>
      </motion.div>
      <div className="absolute bottom-5 left-5 flex gap-2">
        {[Trophy, Users].map((Icon, index) => <motion.span key={index} className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 text-orange-200 backdrop-blur" animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 2.6, repeat: Infinity, delay: index * .35 }}><Icon className="h-5 w-5" /></motion.span>)}
      </div>
      {[0,1,2,3,4,5].map((dot) => <motion.span key={dot} className="absolute h-2 w-2 rounded-full bg-amber-300" style={{ left: `${18 + dot * 12}%`, top: `${65 + (dot % 2) * 13}%` }} animate={reduce ? undefined : { y: [0, -18, 0], opacity: [.25, 1, .25], rotate: [0, 180, 360] }} transition={{ duration: 2.8 + dot * .2, repeat: Infinity, delay: dot * .12 }} />)}
    </div>
  )
}

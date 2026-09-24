import { motion, useReducedMotion } from 'framer-motion'
import { BusFront, MapPin, Radio } from 'lucide-react'

export default function BusVisual({ compact = false }) {
  const reduce = useReducedMotion()
  const duration = compact ? 3.4 : 4.8
  return (
    <div className={`relative isolate overflow-hidden ${compact ? 'h-full min-h-32' : 'h-[300px] sm:h-[360px]'} rounded-[30px] border border-blue-300/[.15] bg-[#07142f] shadow-2xl shadow-blue-950/40`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(59,130,246,.35),transparent_30%),linear-gradient(145deg,rgba(37,99,235,.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="absolute bottom-7 left-5 right-5 h-[44%] [transform:perspective(500px)_rotateX(58deg)] rounded-[28px] bg-gradient-to-b from-slate-700/50 to-slate-950/80 shadow-[0_30px_50px_rgba(0,0,0,.4)]">
        {[18, 42, 66, 90].map((left) => <span key={left} className="absolute top-0 h-full w-1 rounded-full bg-white/25" style={{ left: `${left}%` }} />)}
        <motion.div
          className="absolute left-[51%] top-[-16%] grid h-14 w-14 -translate-x-1/2 place-items-center rounded-2xl border border-blue-200/40 bg-gradient-to-br from-blue-400 to-indigo-700 text-white shadow-[0_0_38px_rgba(59,130,246,.65)]"
          animate={reduce ? undefined : { y: ['20%', '245%'], scale: [0.78, 1.08] }}
          transition={{ duration, ease: 'linear', repeat: Infinity, repeatDelay: 0.4 }}
        >
          <BusFront className="h-7 w-7" />
        </motion.div>
      </div>

      <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl">
        <Radio className="h-5 w-5 text-blue-300" />
      </div>

      <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-blue-100 backdrop-blur-xl">
        <motion.span className="h-2 w-2 rounded-full bg-emerald-400" animate={reduce ? undefined : { opacity: [1, .25, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
        SIMULATED LIVE
      </div>

      <motion.div className="absolute left-[17%] top-[31%]" animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
        <MapPin className="h-6 w-6 fill-blue-400/30 text-blue-300" />
      </motion.div>
      <motion.div className="absolute right-[14%] top-[42%] flex flex-col items-center gap-1" animate={reduce ? undefined : { rotateZ: [-2, 2, -2] }} transition={{ duration: 2.4, repeat: Infinity }}>
        <div className="flex flex-col gap-1 rounded-full border border-white/10 bg-slate-950/80 p-1.5 shadow-xl">
          <motion.span className="h-2.5 w-2.5 rounded-full bg-red-500" animate={reduce ? undefined : { opacity: [1, .18, .18, 1] }} transition={{ duration: 3.2, repeat: Infinity }} />
          <motion.span className="h-2.5 w-2.5 rounded-full bg-amber-400" animate={reduce ? undefined : { opacity: [.18, 1, .18, .18] }} transition={{ duration: 3.2, repeat: Infinity }} />
          <motion.span className="h-2.5 w-2.5 rounded-full bg-emerald-400" animate={reduce ? undefined : { opacity: [.18, .18, 1, .18] }} transition={{ duration: 3.2, repeat: Infinity }} />
        </div>
        {!compact && <span className="text-[10px] font-black tracking-[.25em] text-blue-100/60">SIGNAL</span>}
      </motion.div>
    </div>
  )
}

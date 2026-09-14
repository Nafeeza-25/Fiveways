import { motion } from 'framer-motion'
import { ArrowRight, BusFront, Clock3, Sparkles } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import AnimatedNumber from '../../components/motion/AnimatedNumber'

export default function BusRecommendation({ bus, reason, nextAvailable }) {
  if (!bus) return null
  return (
    <motion.section initial={{ opacity: 0, y: 22, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#06142f] via-[#0b2c62] to-[#1d4ed8] p-6 text-white shadow-[0_28px_90px_rgba(37,99,235,.24)] sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-blue-200"><Sparkles className="h-4 w-4" /> Best option right now</p>
          <div className="mt-4 flex flex-wrap items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-[20px] border border-white/[.15] bg-white/10 backdrop-blur"><BusFront className="h-7 w-7" /></div><div><h2 className="text-4xl font-black tracking-[-.05em]">Bus {bus.number}</h2><p className="mt-1 text-sm text-blue-100/[.65]">{bus.routeName}</p></div></div>
          <div className="mt-5"><StatusBadge tone="success">Recommended · Take Bus {bus.number}</StatusBadge></div>
          <div className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/[.07] p-4 backdrop-blur-xl"><span className="text-[10px] font-black uppercase tracking-[.2em] text-blue-200">Why this bus</span><strong className="mt-2 block text-sm leading-6 text-white/90">{reason}</strong></div>
        </div>
        <div className="min-w-[220px] rounded-[28px] border border-white/[.12] bg-white/10 p-5 text-center backdrop-blur-xl">
          <Clock3 className="mx-auto h-5 w-5 text-blue-200" />
          <strong className="mt-2 block text-5xl font-black tracking-[-.06em]">~<AnimatedNumber value={bus.etaMinutes} decimals={0} /> <span className="text-xl">min</span></strong>
          <span className="mt-2 block text-xs font-bold text-blue-100/[.65]">{bus.status === 'approaching' ? 'Approaching your stop' : 'Next available demo bus'}</span>
          {nextAvailable && <div className="mt-5 border-t border-white/10 pt-4 text-left"><span className="text-[10px] font-black uppercase tracking-[.18em] text-white/[.45]">If you miss it</span><strong className="mt-1 flex items-center justify-between text-sm">Bus {nextAvailable.number} · ~{nextAvailable.etaMinutes} min <ArrowRight className="h-4 w-4" /></strong></div>}
        </div>
      </div>
    </motion.section>
  )
}

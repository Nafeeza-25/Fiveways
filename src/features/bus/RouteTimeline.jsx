import { motion, useReducedMotion } from 'framer-motion'
import { BusFront, MapPin } from 'lucide-react'

export default function RouteTimeline({ bus, selectedStop }) {
  const reduce = useReducedMotion()
  if (!bus) return null
  const activeStop = selectedStop || bus.selectedStop
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft-xl sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Demo route</p><h3 className="mt-2 text-2xl font-black tracking-[-.035em] text-slate-950">Bus {bus.number} route progress</h3></div><span className="text-xs font-bold text-slate-400">Visual simulation only</span></div>
      <div className="relative mt-10 px-2 pb-4">
        <div className="absolute left-3 right-3 top-[18px] h-1 rounded-full bg-slate-100"><motion.div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" initial={reduce ? false : { width: 0 }} animate={{ width: `${bus.progress}%` }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }} /></div>
        <motion.div className="absolute top-0 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/[.35]" initial={reduce ? false : { left: 0 }} animate={{ left: `${bus.progress}%` }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}><BusFront className="h-5 w-5" /></motion.div>
        <div className="relative grid gap-3 pt-14" style={{ gridTemplateColumns: `repeat(${bus.stops.length}, minmax(0,1fr))` }}>
          {bus.stops.map((stop) => {
            const isSelected = Boolean(activeStop && stop.toLowerCase() === activeStop.toLowerCase())
            return (
              <div key={stop} className={`min-w-0 text-center ${isSelected ? 'route-stop--selected text-blue-700' : 'text-slate-400'}`}>
                <div className={`mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full border ${isSelected ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                  {isSelected ? <MapPin className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />}
                </div>
                {isSelected && <small className="block text-[9px] font-black uppercase tracking-wider">Your stop</small>}
                <span className="block truncate text-[10px] font-bold sm:text-xs">{stop}</span>
              </div>
            )
          })}
        </div>
      </div>
      <span className="sr-only" aria-label={`Bus ${bus.number} simulated position on the ${bus.routeName} route`} />
    </motion.section>
  )
}

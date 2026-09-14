import { motion } from 'framer-motion'
import { BusFront, Clock3 } from 'lucide-react'
import { Badge } from '../../components/ui/badge'

export default function BusCard({ bus, recommended }) {
  const statusText = bus.status === 'crossed' ? 'Already crossed your stop' : `${bus.status === 'approaching' ? 'Approaching' : 'Next'} · ${bus.etaMinutes} min`
  return (
    <motion.article layout whileHover={{ y: -4 }} className={`grid gap-4 rounded-[26px] border bg-white p-5 shadow-sm transition sm:grid-cols-[1fr_auto_auto] sm:items-center ${recommended ? 'border-blue-300 shadow-blue-100/[.8]0' : 'border-slate-200'}`}>
      <div className="flex items-center gap-4"><div className={`grid h-11 w-11 place-items-center rounded-2xl ${recommended ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}><BusFront className="h-5 w-5" /></div><div><strong className="text-base font-black text-slate-950">Bus {bus.number}</strong><p className="mt-1 text-xs text-slate-500">{bus.routeName}</p></div></div>
      <span className={`flex items-center gap-2 text-sm font-bold ${bus.status === 'crossed' ? 'text-slate-400' : 'text-slate-700'}`}><Clock3 className="h-4 w-4" />{statusText}</span>
      {recommended ? <Badge variant="info">Recommended</Badge> : <span />}
    </motion.article>
  )
}

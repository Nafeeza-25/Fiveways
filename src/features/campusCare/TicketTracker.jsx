import { motion } from 'framer-motion'
import { Check, CircleDot, TicketCheck } from 'lucide-react'
import Button from '../../components/Button'

const stages = ['Submitted', 'Assigned', 'In Progress', 'Resolved']

export default function TicketTracker({ ticket, onAdvance }) {
  if (!ticket) return null
  const currentIndex = stages.indexOf(ticket.status)
  return (
    <motion.section initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden rounded-[30px] border border-emerald-100 bg-white shadow-[0_18px_70px_rgba(6,78,59,.08)]">
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 p-6 text-white sm:p-7"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-emerald-300"><TicketCheck className="h-4 w-4" /> Demo ticket created</p><div className="mt-3 text-4xl font-black tracking-[-.055em]">{ticket.id}</div><div className="mt-3 text-xs leading-5 text-white/[.55]"><span><strong className="text-white/[.8]0">{ticket.category}</strong> · {ticket.location}</span>{ticket.description ? <span className="mt-1 block">{ticket.description}</span> : null}</div></div>
      <div className="p-6 sm:p-7"><div className="relative grid gap-0" aria-label={`Ticket status: ${ticket.status}`}>
        {stages.map((stage, index) => { const done = index < currentIndex; const current = index === currentIndex; return <div key={stage} className="relative grid min-h-[70px] grid-cols-[42px_1fr] gap-3"><div className="relative flex justify-center">{index < stages.length - 1 && <span className="absolute bottom-0 top-9 w-0.5 bg-slate-100" />}<motion.span animate={current ? { scale: [1, 1.12, 1] } : undefined} transition={{ duration: 1.8, repeat: Infinity }} className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border ${done || current ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-300'}`}>{done ? <Check className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}</motion.span></div><div className="pt-1"><strong className={`text-sm ${current ? 'text-emerald-700' : done ? 'text-slate-800' : 'text-slate-400'}`}>{stage}</strong>{current ? <div className="mt-1 text-xs font-semibold text-emerald-600">Current demo status</div> : null}</div></div> })}
      </div>{ticket.status !== 'Resolved' && onAdvance ? <div className="mt-2"><Button variant="secondary" onClick={onAdvance}>Advance demo status</Button></div> : null}</div>
    </motion.section>
  )
}

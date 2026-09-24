import { motion } from 'framer-motion'
import { Bookmark, CalendarDays, MapPin, Timer, Users, ArrowUpRight } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import Button from '../../components/Button'

function formatDate(value) {
  if (!value) return 'Not specified'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`))
}

export default function EventCard({ event, saved, onToggleSave }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} whileHover={{ y: -5 }} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,.07)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-100 blur-3xl transition group-hover:bg-orange-200" />
      <div className="relative flex items-start justify-between gap-3"><StatusBadge tone={event.category === 'Competition' ? 'info' : event.category === 'Workshop' ? 'success' : 'warning'}>{event.category}</StatusBadge><button className={`grid h-10 w-10 place-items-center rounded-2xl border transition ${saved ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700'}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${event.title}`} onClick={() => onToggleSave(event.id)} title={saved ? 'Remove bookmark' : 'Save event'}><Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} /></button></div>
      <h3 className="relative mt-6 text-2xl font-black tracking-[-.035em] text-slate-950">{event.title}</h3>
      <div className="relative mt-5 grid gap-3 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-orange-500" /> {formatDate(event.date)}</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-500" /> {event.venue}</span>
        <span className="flex items-center gap-2"><Users className="h-4 w-4 text-orange-500" /> {event.eligibility}</span>
        <span className="flex items-center gap-2"><Timer className="h-4 w-4 text-orange-500" /> {event.deadline ? `Register by ${formatDate(event.deadline)}` : 'Deadline not listed in demo data'}</span>
      </div>
      <p className="relative mt-5 text-xs leading-5 text-slate-400">{event.note}</p>
      <div className="relative mt-6 border-t border-slate-100 pt-4">{event.registrationUrl ? <Button as="a" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register <ArrowUpRight className="h-4 w-4" /></Button> : <span className="text-xs font-semibold text-slate-400">Official registration link not stored in this prototype.</span>}</div>
    </motion.article>
  )
}

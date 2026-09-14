import { AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import FeatureHero from '../../components/FeatureHero'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import useLocalStorage from '../../hooks/useLocalStorage'
import { events } from '../../data/events'
import { filterEvents } from './eventLogic'
import EventCard from './EventCard'
import { Input } from '../../components/ui/input'
import Reveal from '../../components/motion/Reveal'

const categories = ['All', 'Competition', 'Workshop', 'Club']

export default function EventsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [savedIds, setSavedIds] = useLocalStorage('fiveways-saved-events', [])
  const visibleEvents = filterEvents(events, { query, category })
  function toggleSave(id) { setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }
  function clearFilters() { setQuery(''); setCategory('All') }

  return (
    <section className="bg-slate-50">
      <FeatureHero variant="events" title="Find an Event" question="What can I participate in?" description="Tickets, dates and opportunity signals make the page feel like an event board before you read a single paragraph. Then search, filter and save what matters." meta="Discover · filter · save" />
      <div className="relative z-10 -mt-10 rounded-t-[42px] bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <Reveal><div className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-sm"><div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end"><label className="grid gap-2 text-sm font-bold text-slate-700"><span className="flex items-center gap-2"><Search className="h-4 w-4 text-orange-600" /> Search events</span><Input aria-label="Search events" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by event, venue or eligibility…" className="focus:border-orange-400 focus:ring-orange-100" /></label><div><span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><SlidersHorizontal className="h-4 w-4 text-orange-600" /> Categories</span><div className="flex flex-wrap gap-2" aria-label="Event categories">{categories.map((item) => <button key={item} className={`rounded-full border px-4 py-2 text-xs font-extrabold transition ${category === item ? 'border-slate-950 bg-slate-950 text-white shadow-lg' : 'border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-700'}`} onClick={() => setCategory(item)}>{item}</button>)}</div></div></div></div></Reveal>

          <div className="mt-6"><AnimatePresence mode="popLayout">{visibleEvents.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleEvents.map((event) => <EventCard key={event.id} event={event} saved={savedIds.includes(event.id)} onToggleSave={toggleSave} />)}</div> : <EmptyState title="No events match those filters" description="Try a different search or reset the category." action={<Button onClick={clearFilters}>Clear filters</Button>} />}</AnimatePresence></div>
        </div>
      </div>
    </section>
  )
}

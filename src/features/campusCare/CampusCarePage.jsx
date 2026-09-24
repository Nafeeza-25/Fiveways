import { Info } from 'lucide-react'
import FeatureHero from '../../components/FeatureHero'
import EmptyState from '../../components/EmptyState'
import useLocalStorage from '../../hooks/useLocalStorage'
import IssueForm from './IssueForm'
import TicketTracker from './TicketTracker'
import { createDemoTicket } from './campusCareLogic'
import Reveal from '../../components/motion/Reveal'

const stages = ['Submitted', 'Assigned', 'In Progress', 'Resolved']

export default function CampusCarePage() {
  const [ticket, setTicket] = useLocalStorage('fiveways-campus-ticket', null)
  function createTicket(input) { setTicket(createDemoTicket(input)) }
  function advanceTicket() { setTicket((current) => { if (!current) return current; const index = stages.indexOf(current.status); return { ...current, status: stages[Math.min(index + 1, stages.length - 1)] } }) }

  return (
    <section className="bg-slate-50">
      <FeatureHero variant="care" title="Report a Campus Issue" question="How do I get this fixed?" description="The page shows the journey before the form: report → track → resolve. Students can immediately understand that a problem becomes a visible, traceable ticket." meta="Report · track · resolve" />
      <div className="relative z-10 -mt-10 rounded-t-[42px] bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <Reveal><div className="mb-6 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950"><Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" /><p>For serious or formal grievances, use the appropriate official college grievance channel. FIVEWAYS Campus Care is a prototype for everyday campus issue tracking.</p></div></Reveal>
        <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr] lg:items-start"><IssueForm onSubmit={createTicket} />{ticket ? <TicketTracker ticket={ticket} onAdvance={advanceTicket} /> : <EmptyState title="No demo ticket yet" description="Submit an everyday campus issue to see the Report → Track → Resolve experience." />}</div>
      </div></div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ExternalLink, SearchCheck } from 'lucide-react'
import { scholarships } from '../../data/scholarships'
import { getDiscoveryScholarships, matchScholarships } from './scholarshipLogic'
import ScholarshipCard from './ScholarshipCard'
import EmptyState from '../../components/EmptyState'
import StatusBadge from '../../components/StatusBadge'
import AnimatedNumber from '../../components/motion/AnimatedNumber'

export default function ScholarshipResults({ profile }) {
  const matches = matchScholarships(profile, scholarships)
  const discovery = getDiscoveryScholarships(scholarships)
  return (
    <section>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 grid gap-5 rounded-[30px] bg-gradient-to-r from-violet-950 via-indigo-950 to-slate-950 p-6 text-white shadow-2xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-violet-300"><SearchCheck className="h-4 w-4" /> Based on the information provided</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.04em] sm:text-4xl">{matches.length > 0 ? `You may be eligible for ${matches.length} opportunities worth checking` : 'No clear rules-based match in this demo profile'}</h2></div>
        {matches.length > 0 && <div className="rounded-[24px] border border-white/10 bg-white/10 px-6 py-4 text-center backdrop-blur"><strong className="block text-5xl font-black tracking-[-.06em]"><AnimatedNumber value={matches.length} decimals={0} /></strong><span className="text-xs font-bold text-white/50">matches surfaced</span></div>}
      </motion.div>

      {matches.length > 0 ? <div className="grid gap-4">{matches.map((match) => { const scholarship = scholarships.find((item) => item.id === match.scholarshipId); return <ScholarshipCard key={match.scholarshipId} scholarship={scholarship} match={match} /> })}</div> : <EmptyState title="No clear demo match" description="That does not mean you have no options. Check the official IFET guidance and current government portals for schemes not modeled by this prototype." />}

      <section className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="ifet-listed-heading"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Broader discovery</p><h3 id="ifet-listed-heading" className="mt-2 text-2xl font-black tracking-[-.035em] text-slate-950">Also listed by IFET</h3></div><StatusBadge tone="info">Verify current rules</StatusBadge></div><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">These schemes appear in IFET scholarship guidance, but FIVEWAYS intentionally does not invent matching rules for conditions this profile does not collect.</p><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{discovery.map((scholarship) => <article className="rounded-[22px] border border-slate-200 bg-slate-50 p-5" key={scholarship.id}><h4 className="font-black text-slate-950">{scholarship.name}</h4><p className="mt-2 text-xs leading-5 text-slate-500">{scholarship.description}</p><a className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-violet-700" href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer">Check IFET guidance <ExternalLink className="h-3.5 w-3.5" /></a></article>)}</div></section>
    </section>
  )
}

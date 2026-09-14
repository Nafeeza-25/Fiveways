import { motion } from 'framer-motion'
import { Check, ExternalLink, FileWarning, ShieldCheck } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'

export default function ScholarshipCard({ scholarship, match }) {
  const strength = match.score >= 75 ? 'Strong match' : 'Worth checking'
  const missing = new Set(match.missingDocuments ?? [])
  const requiredDocuments = scholarship.requiredDocuments ?? []
  const ready = requiredDocuments.length - missing.size

  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-[0_18px_70px_rgba(76,29,149,.08)]">
      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_230px] lg:p-7">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-violet-600">Rules-based match</p><h3 className="mt-2 text-2xl font-black tracking-[-.035em] text-slate-950">{scholarship.name}</h3></div><StatusBadge tone={match.score >= 75 ? 'success' : 'info'}>{strength}</StatusBadge></div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{scholarship.description}</p>
          <div className="mt-6"><h4 className="text-xs font-black uppercase tracking-[.18em] text-slate-400">Why this matched</h4><div className="mt-3 grid gap-2">{match.matchedReasons.map((reason) => <div key={reason} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3.5 w-3.5" /></span>{reason}</div>)}</div></div>
        </div>
        <div className="rounded-[24px] bg-gradient-to-b from-violet-50 to-indigo-50 p-5"><ShieldCheck className="h-5 w-5 text-violet-600" /><span className="mt-4 block text-xs font-black uppercase tracking-[.17em] text-violet-600">Match strength</span><strong className="mt-1 block text-4xl font-black tracking-[-.05em] text-slate-950">{match.score}%</strong><div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><motion.div initial={{ width: 0 }} animate={{ width: `${match.score}%` }} transition={{ duration: .75, delay: .15 }} className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" /></div></div>
      </div>

      {requiredDocuments.length > 0 && <div className="border-t border-slate-100 bg-slate-50/60 p-6 lg:p-7"><div className="flex flex-wrap items-center justify-between gap-3"><h4 className="text-sm font-black text-slate-950">Document checklist</h4><span className="text-xs font-bold text-slate-500">{ready}/{requiredDocuments.length} ready</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{requiredDocuments.map((document) => { const isMissing = missing.has(document); return <div key={document} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${isMissing ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}><span className={`grid h-7 w-7 place-items-center rounded-full ${isMissing ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{isMissing ? <FileWarning className="h-4 w-4" /> : <Check className="h-4 w-4" />}</span><div><strong className="block text-xs text-slate-900">{document}</strong><small className={isMissing ? 'text-amber-700' : 'text-emerald-700'}>{isMissing ? 'Missing' : 'Available'}</small></div></div>})}</div></div>}

      <div className="flex flex-col gap-3 border-t border-slate-100 p-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:p-7"><p className="max-w-2xl leading-6 text-slate-500"><strong className="text-slate-800">Next step:</strong> {scholarship.contact}. Check official eligibility and current scheme guidance before applying.</p>{scholarship.sourceUrl && <a className="inline-flex shrink-0 items-center gap-2 font-extrabold text-violet-700 hover:text-violet-900" href={scholarship.sourceUrl} target="_blank" rel="noreferrer">View IFET scholarship guidance <ExternalLink className="h-4 w-4" /></a>}</div>
    </motion.article>
  )
}

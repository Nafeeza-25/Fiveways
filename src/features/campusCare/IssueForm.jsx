import { MapPin, MessageSquareText, Wrench } from 'lucide-react'
import { useState } from 'react'
import Button from '../../components/Button'
import { Input } from '../../components/ui/input'
import { validateIssue } from './campusCareLogic'

const initial = { category: '', location: '', description: '' }
const fieldClass = 'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100'

export default function IssueForm({ onSubmit }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })) }
  function submit(event) { event.preventDefault(); const nextErrors = validateIssue(form); setErrors(nextErrors); if (Object.keys(nextErrors).length) return; onSubmit(form); setForm(initial) }

  return (
    <form className="rounded-[30px] border border-emerald-100 bg-white p-6 shadow-[0_18px_70px_rgba(6,78,59,.08)] sm:p-7" onSubmit={submit}>
      <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><Wrench className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-600">Create a ticket</p><h2 className="text-xl font-black tracking-tight text-slate-950">Report an everyday issue</h2></div></div>
      <p className="mt-3 text-sm leading-6 text-slate-500">Create a demo ticket for a facilities or campus inconvenience.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700"><span>Issue category</span><select aria-label="Issue category" className={fieldClass} value={form.category} onChange={(e) => update('category', e.target.value)}><option value="">Choose category</option><option value="Electrical">Electrical</option><option value="Cleanliness">Cleanliness</option><option value="Water">Water</option><option value="Furniture">Furniture</option><option value="Lost/Found">Lost/Found</option><option value="Other">Other</option></select>{errors.category ? <span className="text-xs font-bold text-rose-600">{errors.category}</span> : null}</label>
        <label className="grid gap-2 text-sm font-bold text-slate-700"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-600" /> Location</span><Input aria-label="Location" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. CSE Block, Room 204" className="focus:border-emerald-400 focus:ring-emerald-100" />{errors.location ? <span className="text-xs font-bold text-rose-600">{errors.location}</span> : null}</label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700"><span className="flex items-center gap-2"><MessageSquareText className="h-4 w-4 text-emerald-600" /> Description</span><textarea aria-label="Description" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe what needs attention…" className="min-h-28 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-950 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" /></label>
      <div className="mt-5"><Button type="submit">Submit report</Button></div>
    </form>
  )
}

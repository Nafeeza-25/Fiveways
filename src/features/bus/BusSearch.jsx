import { MapPin } from 'lucide-react'

export default function BusSearch({ stops, value, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" /> Where are you travelling from?</span>
      <select aria-label="Where are you travelling from?" value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100">
        <option value="">Select a stop</option>
        {stops.map((stop) => <option key={stop} value={stop}>{stop}</option>)}
      </select>
    </label>
  )
}

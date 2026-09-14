import { Link } from 'react-router-dom'

export default function SectionHeader({ eyebrow, title, description, meta }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 lg:px-10">
      <Link to="/" className="text-sm font-bold text-slate-500 hover:text-slate-950">← All five ways</Link>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="text-xs font-black uppercase tracking-[.22em] text-indigo-600">{eyebrow}</p><h1 className="mt-3 text-5xl font-black tracking-[-.055em] text-slate-950">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">{description}</p></div>
        {meta ? <div>{meta}</div> : null}
      </div>
    </section>
  )
}

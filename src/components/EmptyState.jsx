import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function EmptyState({ title, description, action }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-7 shadow-sm backdrop-blur-xl">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white"><Sparkles className="h-5 w-5" /></div>
      <h3 className="text-xl font-black tracking-tight text-slate-950">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </motion.section>
  )
}

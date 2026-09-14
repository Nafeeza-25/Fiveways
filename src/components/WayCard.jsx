import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function WayCard({ to, icon, title, question, index = 0, badge }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}>
      <Link to={to} className="block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center justify-between"><span className="text-2xl">{icon}</span>{badge ? <span className="way-card__badge text-[10px] font-black uppercase tracking-widest text-indigo-600">{badge}</span> : null}</div>
        <h2 className="mt-8 text-xl font-black">{title}</h2><p className="mt-2 text-sm text-slate-500">{question}</p>
      </Link>
    </motion.div>
  )
}

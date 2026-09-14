import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import { FeatureVisual } from './feature-visuals'
import { cn } from '../lib/utils'

const themes = {
  bus: {
    eyebrow: 'WAY 02 · SMART BUS',
    accent: 'text-blue-300',
    glow: 'from-blue-500/25 via-indigo-500/10 to-transparent',
    chip: 'border-blue-300/20 bg-blue-400/10 text-blue-100',
  },
  scholarships: {
    eyebrow: 'WAY 03 · SCHOLARSHIP FINDER',
    accent: 'text-violet-300',
    glow: 'from-violet-500/25 via-fuchsia-500/10 to-transparent',
    chip: 'border-violet-300/20 bg-violet-400/10 text-violet-100',
  },
  events: {
    eyebrow: 'WAY 01 · EVENTS',
    accent: 'text-orange-300',
    glow: 'from-orange-500/25 via-amber-500/10 to-transparent',
    chip: 'border-orange-300/20 bg-orange-400/10 text-orange-100',
  },
  care: {
    eyebrow: 'WAY 04 · CAMPUS CARE',
    accent: 'text-emerald-300',
    glow: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    chip: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
  },
  academics: {
    eyebrow: 'WAY 05 · ACADEMIC PATH',
    accent: 'text-cyan-300',
    glow: 'from-cyan-500/25 via-indigo-500/10 to-transparent',
    chip: 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100',
  },
}

export default function FeatureHero({ variant, title, question, description, meta, children }) {
  const reduce = useReducedMotion()
  const theme = themes[variant] ?? themes.bus

  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br', theme.glow)} />
      <motion.div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/[.045] blur-3xl" animate={reduce ? undefined : { x: [0, 45, -10, 0], y: [0, -20, 25, 0], scale: [1, 1.12, .96, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto grid min-h-[610px] max-w-7xl items-center gap-12 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:px-10 lg:pt-36">
        <div className="max-w-2xl">
          <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
            <Link to="/" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-white/[.55] transition hover:text-white"><ArrowLeft className="h-4 w-4" /> All five ways</Link>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className={cn('text-xs font-black tracking-[.22em]', theme.accent)}>{theme.eyebrow}</span>
              {meta ? <Badge variant="glass" className={theme.chip}>{meta}</Badge> : null}
            </div>
            <p className="mb-3 text-lg font-semibold text-white/[.55]">{question}</p>
            <h1 className="text-balance text-5xl font-black leading-[.94] tracking-[-.055em] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/[.62] sm:text-lg">{description}</p>
            {children ? <div className="mt-8">{children}</div> : null}
            <div className="mt-10 flex items-center gap-3 text-xs font-black uppercase tracking-[.22em] text-white/[.35]"><ArrowDownRight className="h-4 w-4" /> interact below</div>
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: .94, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .75, delay: .1, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <FeatureVisual variant={variant} />
        </motion.div>
      </div>
    </section>
  )
}

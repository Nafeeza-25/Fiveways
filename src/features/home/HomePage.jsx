import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Layers3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import TiltCard from '../../components/motion/TiltCard'
import { HomeFeatureVisual } from '../../components/feature-visuals'
import { Badge } from '../../components/ui/badge'
import { cn } from '../../lib/utils'

const ways = [
  { to: '/bus', number: '02', variant: 'bus', title: 'Find My Bus', question: 'Which bus should I take now?', accent: 'text-blue-300', ring: 'hover:border-blue-400/[.35]', size: 'lg:col-span-7 lg:row-span-2', badge: 'Flagship demo' },
  { to: '/scholarships', number: '03', variant: 'scholarships', title: 'Check Scholarships', question: 'What financial support may be available?', accent: 'text-violet-300', ring: 'hover:border-violet-400/[.35]', size: 'lg:col-span-5', badge: 'Flagship demo' },
  { to: '/events', number: '01', variant: 'events', title: 'Find an Event', question: 'What can I participate in?', accent: 'text-orange-300', ring: 'hover:border-orange-400/[.35]', size: 'lg:col-span-5' },
  { to: '/campus-care', number: '04', variant: 'care', title: 'Report a Campus Issue', question: 'How do I get this fixed?', accent: 'text-emerald-300', ring: 'hover:border-emerald-400/[.35]', size: 'lg:col-span-5' },
  { to: '/academics', number: '05', variant: 'academics', title: 'Plan My Academics', question: 'What should I aim for next?', accent: 'text-cyan-300', ring: 'hover:border-cyan-400/[.35]', size: 'lg:col-span-7' },
]

function WayBento({ way, index }) {
  return (
    <TiltCard className={cn('group min-h-[290px]', way.size)} intensity={5}>
      <Link to={way.to} className={cn('relative block h-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[.045] p-4 text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition-colors duration-300', way.ring)}>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.10),transparent_42%)]" />
        <div className="relative grid h-full gap-4 sm:grid-cols-[.82fr_1.18fr] lg:grid-cols-1 xl:grid-cols-[.72fr_1.28fr]">
          <div className="flex min-h-[190px] flex-col justify-between p-3 sm:min-h-0">
            <div className="flex items-center justify-between gap-3">
              <span className={cn('text-xs font-black tracking-[.2em]', way.accent)}>{way.number}</span>
              {way.badge ? <Badge variant="glass" className="border-white/10 bg-white/5 text-[10px] tracking-[.18em] text-white/70">{way.badge}</Badge> : null}
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-white/[.35]">{way.question}</p>
              <h2 className="text-balance text-2xl font-black tracking-[-.035em] sm:text-3xl">{way.title}</h2>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-white/[.45] transition group-hover:text-white">Open this way <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
            </div>
          </div>
          <div className="min-h-[185px] overflow-hidden rounded-[26px] [transform:translateZ(30px)]"><HomeFeatureVisual variant={way.variant} /></div>
        </div>
      </Link>
    </TiltCard>
  )
}

export default function HomePage() {
  const reduce = useReducedMotion()
  return (
    <motion.section className="relative overflow-hidden bg-[#050816] text-white" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(79,70,229,.26),transparent_28%),radial-gradient(circle_at_83%_20%,rgba(14,165,233,.16),transparent_28%),radial-gradient(circle_at_55%_80%,rgba(139,92,246,.14),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:46px_46px]" />
      <motion.div className="pointer-events-none absolute -left-24 top-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[100px]" animate={reduce ? undefined : { x: [0, 80, -20, 0], y: [0, -30, 35, 0], scale: [1, 1.13, .95, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="pointer-events-none absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[110px]" animate={reduce ? undefined : { x: [0, -55, 10, 0], y: [0, 45, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:px-10">
        <div className="grid min-h-[68vh] items-end gap-12 pb-16 lg:grid-cols-[1fr_320px]">
          <div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="mb-7 flex flex-wrap items-center gap-3">
              <Badge variant="glass" className="gap-2 border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-indigo-100"><Sparkles className="h-3.5 w-3.5" /> IFET STUDENT UTILITY</Badge>
              <span className="text-xs font-black tracking-[.18em] text-white/[.35]">05 WAYS · 01 CAMPUS</span>
            </motion.div>
            <motion.h1 initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .06, ease: [0.22, 1, 0.36, 1] }} className="max-w-5xl text-balance text-[clamp(3.7rem,9.6vw,8.7rem)] font-black leading-[.82] tracking-[-.075em]">
              WHAT DO YOU<br /><span className="bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">NEED RIGHT NOW?</span>
            </motion.h1>
            <motion.p initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .16 }} className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">Don't search through messages, notices and portals. Pick the student problem in front of you and move to one clear next action.</motion.p>
          </div>

          <motion.aside initial={reduce ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, delay: .2 }} className="rounded-[30px] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between"><Layers3 className="h-5 w-5 text-indigo-300" /><span className="text-[10px] font-black tracking-[.2em] text-white/30">FIVEWAYS / 2026</span></div>
            <strong className="mt-10 block text-5xl font-black tracking-[-.06em]">5 → 1</strong>
            <p className="mt-3 text-sm leading-6 text-white/[.45]">Five everyday situations. One student-first interface that tells you what to do next.</p>
            <a href="#ways" className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.15em] text-white/70 hover:text-white">Explore the five ways <ArrowDown className="h-4 w-4" /></a>
          </motion.aside>
        </div>

        <div id="ways" className="grid auto-rows-[minmax(290px,auto)] gap-4 lg:grid-cols-12">
          {ways.map((way, index) => <WayBento key={way.to} way={way} index={index} />)}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/[.35] sm:flex-row sm:items-center sm:justify-between"><span>Designed to move from problem → decision → next action.</span><span className="font-black tracking-[.15em]">FIVEWAYS · KNOW WHAT TO DO NEXT</span></div>
      </div>
    </motion.section>
  )
}

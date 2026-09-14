import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'

const navItems = [
  ['/events', 'Events'],
  ['/bus', 'Bus'],
  ['/scholarships', 'Scholarships'],
  ['/campus-care', 'Campus Care'],
  ['/academics', 'Academics'],
]

export default function TopNav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const isHome = location.pathname === '/'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className={cn('pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-[22px] border px-3 py-2.5 shadow-2xl backdrop-blur-2xl transition-colors sm:px-4', isHome ? 'border-white/10 bg-[#060916]/70 text-white shadow-black/20' : 'border-white/10 bg-[#060916]/[.8]2 text-white shadow-black/25')}>
        <NavLink to="/" className="group flex items-center gap-2.5" aria-label="FIVEWAYS home" onClick={() => setOpen(false)}>
          <motion.span whileHover={{ rotate: -8, scale: 1.05 }} className="grid h-9 w-9 place-items-center rounded-[14px] bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-sm font-black text-white shadow-lg shadow-indigo-500/30">5</motion.span>
          <div className="leading-none"><span className="block text-sm font-black tracking-[.12em]">FIVEWAYS</span><span className="mt-1 hidden text-[9px] font-bold tracking-[.18em] text-white/[.35] sm:block">IFET STUDENT UTILITY</span></div>
        </NavLink>

        <nav className="hidden items-center gap-1 rounded-2xl border border-white/[.8] bg-white/[.035] p-1 lg:flex" aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => cn('relative rounded-xl px-3 py-2 text-xs font-extrabold text-white/[.55] transition hover:text-white', isActive && 'text-white')}>
              {({ isActive }) => <>{isActive && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-xl bg-white/10" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}<span className="relative">{label}</span></>}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 text-[10px] font-black tracking-[.17em] text-white/40 md:flex"><motion.span className="h-2 w-2 rounded-full bg-emerald-400" animate={{ opacity: [1, .25, 1] }} transition={{ duration: 1.8, repeat: Infinity }} /> ONE CAMPUS · FIVE PATHS</div>
        <button type="button" className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen((value) => !value)}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }} transition={{ duration: .2 }} className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-[22px] border border-white/10 bg-[#090d1c]/95 p-2 text-white shadow-2xl backdrop-blur-2xl lg:hidden" aria-label="Mobile navigation">
            {navItems.map(([to, label], index) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => cn('flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-extrabold text-white/60 transition hover:bg-white/5 hover:text-white', isActive && 'bg-white/10 text-white')}><span>{`0${index + 1} · ${label}`}</span><span>↗</span></NavLink>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

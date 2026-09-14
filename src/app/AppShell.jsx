import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import TopNav from '../components/TopNav'

export default function AppShell() {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <div className="min-h-screen bg-[#050816]">
      <TopNav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduce ? undefined : { opacity: 0, y: -10, filter: 'blur(3px)' }}
          transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <footer className="border-t border-white/10 bg-[#050816] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <strong className="tracking-[.16em] text-white/[.8]0">FIVEWAYS</strong>
          <span>Five student problems · five clear next actions · competition prototype</span>
        </div>
      </footer>
    </div>
  )
}

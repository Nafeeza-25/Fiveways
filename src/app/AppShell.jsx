import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopNav from '../components/TopNav'

export default function AppShell() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#050816]">
      <TopNav />

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-[#050816] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <strong className="tracking-[.16em] text-white/80">FIVEWAYS</strong>
          <span>Five student problems · five clear next actions · competition prototype</span>
        </div>
      </footer>
    </div>
  )
}


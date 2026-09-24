import { createBrowserRouter } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AppShell from './AppShell'
import HomePage from '../features/home/HomePage'
import EventsPage from '../features/events/EventsPage'
import BusPage from '../features/bus/BusPage'
import ScholarshipsPage from '../features/scholarships/ScholarshipsPage'
import CampusCarePage from '../features/campusCare/CampusCarePage'
import AcademicsPage from '../features/academics/AcademicsPage'

function NotFoundPage() {
  return (
    <section className="grid min-h-screen place-items-center bg-[#050816] px-5 text-white">
      <div className="max-w-xl text-center"><p className="text-xs font-black uppercase tracking-[.22em] text-indigo-300">404 · Wrong turn</p><h1 className="mt-4 text-5xl font-black tracking-[-.055em]">That Way does not exist.</h1><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/50">Return to FIVEWAYS and choose one of the five student paths.</p><a className="mt-7 inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-slate-950" href="/"><ArrowLeft className="h-4 w-4" /> Back to FIVEWAYS</a></div>
    </section>
  )
}

function RouteErrorFallback() {
  return (
    <section className="grid min-h-screen place-items-center bg-[#050816] px-5 text-white">
      <div className="max-w-xl text-center">
        <p className="text-xs font-black uppercase tracking-[.22em] text-cyan-400">Error</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-.055em] sm:text-5xl">Something went wrong while loading this page.</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/50">Return to FIVEWAYS and try navigating again.</p>
        <a className="mt-7 inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-white/90" href="/">
          <ArrowLeft className="h-4 w-4" /> Return to FIVEWAYS
        </a>
      </div>
    </section>
  )
}

export const appRouter = createBrowserRouter([{ element: <AppShell />, errorElement: <RouteErrorFallback />, children: [
  { path: '/', element: <HomePage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/bus', element: <BusPage /> },
  { path: '/scholarships', element: <ScholarshipsPage /> },
  { path: '/campus-care', element: <CampusCarePage /> },
  { path: '/academics', element: <AcademicsPage /> },
  { path: '*', element: <NotFoundPage /> },
] }])

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../features/home/HomePage'
import BusPage from '../features/bus/BusPage'
import ScholarshipsPage from '../features/scholarships/ScholarshipsPage'
import EventsPage from '../features/events/EventsPage'
import CampusCarePage from '../features/campusCare/CampusCarePage'
import AcademicsPage from '../features/academics/AcademicsPage'

const cases = [
  [<HomePage />, /WHAT DO YOU/i],
  [<BusPage />, 'Find My Bus'],
  [<ScholarshipsPage />, 'Check Scholarships'],
  [<EventsPage />, 'Find an Event'],
  [<CampusCarePage />, 'Report a Campus Issue'],
  [<AcademicsPage />, 'Plan My Academics'],
]

test.each(cases)('judge route renders %s', async (page, text) => {
  const { unmount } = render(<MemoryRouter>{page}</MemoryRouter>)
  expect(await screen.findByText(text)).toBeInTheDocument()
  unmount()
})

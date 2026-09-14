import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'

test('renders the five action paths', () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: /what do you need right now/i })).toBeInTheDocument()
  for (const title of ['Find an Event', 'Find My Bus', 'Check Scholarships', 'Report a Campus Issue', 'Plan My Academics']) {
    expect(screen.getByText(title)).toBeInTheDocument()
  }
})

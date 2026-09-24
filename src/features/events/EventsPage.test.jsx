import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import EventsPage from './EventsPage'

test('filters events and can save an event', async () => {
  localStorage.clear()
  const user = userEvent.setup()
  render(<MemoryRouter><EventsPage /></MemoryRouter>)
  await user.type(screen.getByLabelText('Search events'), 'web')
  expect(screen.getAllByText('WebCraft 2026').length).toBeGreaterThan(0)
  expect(screen.queryByText('Applied AI Workshop')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Save WebCraft 2026' }))
  expect(screen.getByRole('button', { name: 'Unsave WebCraft 2026' })).toBeInTheDocument()
})

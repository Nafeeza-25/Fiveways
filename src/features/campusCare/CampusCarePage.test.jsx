import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CampusCarePage from './CampusCarePage'
import { createDemoTicket } from './campusCareLogic'

test('submits a campus issue and shows a ticket with unique FW- ID', async () => {
  localStorage.clear()
  const user = userEvent.setup()
  render(<MemoryRouter><CampusCarePage /></MemoryRouter>)
  await user.selectOptions(screen.getByLabelText('Issue category'), 'Electrical')
  await user.type(screen.getByLabelText('Location'), 'CSE Block, Room 204')
  await user.type(screen.getByLabelText('Description'), 'Fan not working')
  await user.click(screen.getByRole('button', { name: 'Submit report' }))
  expect(screen.getByText(/FW-/)).toBeInTheDocument()
  for (const status of ['Submitted', 'Assigned', 'In Progress', 'Resolved']) expect(screen.getByText(status)).toBeInTheDocument()
})

test('multiple ticket creations produce different IDs', () => {
  const ticket1 = createDemoTicket({ category: 'Electrical', location: 'Block A', description: 'Light flickering' })
  const ticket2 = createDemoTicket({ category: 'Plumbing', location: 'Block B', description: 'Tap leak' })
  expect(ticket1.id).toMatch(/^FW-/)
  expect(ticket2.id).toMatch(/^FW-/)
  expect(ticket1.id).not.toBe(ticket2.id)
})

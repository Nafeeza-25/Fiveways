import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CampusCarePage from './CampusCarePage'

test('submits a campus issue and shows a ticket', async () => {
  localStorage.clear()
  const user = userEvent.setup()
  render(<MemoryRouter><CampusCarePage /></MemoryRouter>)
  await user.selectOptions(screen.getByLabelText('Issue category'), 'Electrical')
  await user.type(screen.getByLabelText('Location'), 'CSE Block, Room 204')
  await user.type(screen.getByLabelText('Description'), 'Fan not working')
  await user.click(screen.getByRole('button', { name: 'Submit report' }))
  expect(screen.getByText(/FW-2048/)).toBeInTheDocument()
  for (const status of ['Submitted', 'Assigned', 'In Progress', 'Resolved']) expect(screen.getByText(status)).toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AcademicsPage from './AcademicsPage'

test('shows a required SGPA estimate and assumption note', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  await user.clear(screen.getByLabelText('Current CGPA'))
  await user.type(screen.getByLabelText('Current CGPA'), '8.14')
  await user.clear(screen.getByLabelText('Completed semesters'))
  await user.type(screen.getByLabelText('Completed semesters'), '4')
  await user.clear(screen.getByLabelText('Target CGPA'))
  await user.type(screen.getByLabelText('Target CGPA'), '8.5')
  await user.clear(screen.getByLabelText('Future semesters'))
  await user.type(screen.getByLabelText('Future semesters'), '4')
  expect(screen.getByText(/[.8]\.86/)).toBeInTheDocument()
  expect(screen.getByText(/estimate only/i)).toBeInTheDocument()
})

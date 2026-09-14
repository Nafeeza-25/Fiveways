import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ScholarshipsPage from './ScholarshipsPage'

test('completes wizard and shows explainable cautious match language', async () => {
  localStorage.clear()
  const user = userEvent.setup()
  render(<MemoryRouter><ScholarshipsPage /></MemoryRouter>)
  await user.selectOptions(screen.getByLabelText('Department'), 'CSE')
  await user.selectOptions(screen.getByLabelText('Year'), '3')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.click(screen.getByLabelText('Government-school background'))
  await user.click(screen.getByLabelText('First-generation student'))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.selectOptions(screen.getByLabelText('Income range'), 'under-250000')
  await user.selectOptions(screen.getByLabelText('Category'), 'BC')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.click(screen.getByLabelText('Aadhaar'))
  await user.click(screen.getByLabelText('Bonafide Certificate'))
  await user.click(screen.getByRole('button', { name: 'Find scholarships' }))
  expect(screen.getByText(/you may be eligible/i)).toBeInTheDocument()
  expect(screen.queryByText(/^you are eligible$/i)).not.toBeInTheDocument()
  expect(screen.getByText('First Generation Graduate Scheme')).toBeInTheDocument()
  expect(screen.getAllByText(/why this matched/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/income certificate/i).length).toBeGreaterThan(0)
})

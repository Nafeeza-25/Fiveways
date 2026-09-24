import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ScholarshipsPage from './ScholarshipsPage'

beforeEach(() => {
  localStorage.clear()
})

test('completes wizard and shows explainable cautious match language', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><ScholarshipsPage /></MemoryRouter>)

  await user.selectOptions(screen.getByLabelText('Department'), 'CSE')
  await user.selectOptions(screen.getByLabelText('Year'), '3')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  const govSchool = await screen.findByLabelText('Government-school background')
  await user.click(govSchool)
  await user.click(screen.getByLabelText('First-generation student'))
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  const incomeRange = await screen.findByLabelText('Income range')
  await user.selectOptions(incomeRange, 'under-250000')
  await user.selectOptions(screen.getByLabelText('Category'), 'BC')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  const aadhaar = await screen.findByLabelText('Aadhaar')
  await user.click(aadhaar)
  await user.click(screen.getByLabelText('Bonafide Certificate'))
  await user.click(screen.getByRole('button', { name: 'Find scholarships' }))

  await waitFor(() => {
    expect(screen.getByText(/You may be eligible for/i)).toBeInTheDocument()
  })
  expect(screen.queryByText(/^you are eligible$/i)).not.toBeInTheDocument()
  expect(screen.getByText(/First Generation Graduate/i)).toBeInTheDocument()
  expect(screen.getAllByText(/why this matched/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/income certificate/i).length).toBeGreaterThan(0)
})

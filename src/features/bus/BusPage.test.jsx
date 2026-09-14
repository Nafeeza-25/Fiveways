import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import BusPage from './BusPage'

test('selecting Cuddalore recommends Bus 18', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><BusPage /></MemoryRouter>)
  expect(screen.getByText(/Simulated Live Demo/i)).toBeInTheDocument()
  await user.selectOptions(screen.getByLabelText(/travelling from/i), 'Cuddalore')
  expect(screen.getByRole('heading', { name: /bus 18/i })).toBeInTheDocument()
  expect(screen.getByText(/approaching your stop/i)).toBeInTheDocument()
  expect(screen.getByText(/~4 min/i)).toBeInTheDocument()
})

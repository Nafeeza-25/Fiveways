import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import BusPage from './BusPage'
import { getBusesForStop, recommendBus } from './busLogic'

test('selecting Cuddalore recommends Bus 18', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><BusPage /></MemoryRouter>)
  expect(screen.getByText(/Simulated Live Demo/i)).toBeInTheDocument()
  await user.selectOptions(screen.getByLabelText(/travelling from/i), 'Cuddalore')
  expect(await screen.findByRole('heading', { level: 2, name: /bus 18/i })).toBeInTheDocument()
  expect(screen.getByText(/approaching your stop/i)).toBeInTheDocument()
  expect(screen.getByText('4')).toBeInTheDocument()
})

test('selecting Nellikuppam recommends Bus 18 with 14 min ETA', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><BusPage /></MemoryRouter>)
  await user.selectOptions(screen.getByLabelText(/travelling from/i), 'Nellikuppam')
  expect(await screen.findByRole('heading', { level: 2, name: /bus 18/i })).toBeInTheDocument()
  expect(screen.getByText('14')).toBeInTheDocument()
})

test('selecting Panruti recommends Bus 12 with 5 min ETA', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><BusPage /></MemoryRouter>)
  await user.selectOptions(screen.getByLabelText(/travelling from/i), 'Panruti')
  expect(await screen.findByRole('heading', { level: 2, name: /bus 12/i })).toBeInTheDocument()
  expect(screen.getByText('5')).toBeInTheDocument()
})

test('selecting Villupuram recommends Bus 24 with 6 min ETA', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><BusPage /></MemoryRouter>)
  await user.selectOptions(screen.getByLabelText(/travelling from/i), 'Villupuram')
  expect(await screen.findByRole('heading', { level: 2, name: /bus 24/i })).toBeInTheDocument()
  expect(screen.getByText('6')).toBeInTheDocument()
})

test('crossed bus is not recommended and handles case with no upcoming buses', () => {
  const testBuses = [
    { id: 'b1', number: '10', stops: ['Cuddalore'], stopStates: { Cuddalore: { etaMinutes: -5, status: 'crossed' } } }
  ]
  const matches = getBusesForStop(testBuses, 'cuddalore')
  expect(matches[0].status).toBe('crossed')
  const { recommended, reason } = recommendBus(matches)
  expect(recommended).toBeNull()
  expect(reason).toMatch(/already crossed/i)
})

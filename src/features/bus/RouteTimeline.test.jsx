import { render, screen } from '@testing-library/react'
import RouteTimeline from './RouteTimeline'

const bus = { number: '18', routeName: 'Cuddalore → IFET Express', stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'], progress: 18 }

test('renders every route stop and the bus marker', () => {
  render(<RouteTimeline bus={bus} selectedStop="Cuddalore" />)
  for (const stop of bus.stops) expect(screen.getByText(stop)).toBeInTheDocument()
  expect(screen.getByLabelText(/Bus 18 simulated position/i)).toBeInTheDocument()
})

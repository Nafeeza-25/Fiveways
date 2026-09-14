import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import StatusBadge from './StatusBadge'

test('shared primitives render semantic text', () => {
  render(<MemoryRouter><><SectionHeader eyebrow="Smart Bus" title="Find My Bus" description="Which bus should I take now?" /><StatusBadge tone="info">Simulated Live Demo</StatusBadge></></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Find My Bus' })).toBeInTheDocument()
  expect(screen.getByText('Simulated Live Demo')).toBeInTheDocument()
})

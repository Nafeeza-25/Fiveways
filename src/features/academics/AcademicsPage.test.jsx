import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AcademicsPage from './AcademicsPage'

test('shows a required SGPA estimate and assumption note', () => {
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  expect(screen.getAllByText(/8\.86/).length).toBeGreaterThan(0)
  expect(screen.getByText(/estimate only/i)).toBeInTheDocument()
})

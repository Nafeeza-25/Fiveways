import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AcademicsPage from './AcademicsPage'

test('shows a required SGPA estimate and assumption note', () => {
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  expect(screen.getAllByText(/8\.86/).length).toBeGreaterThan(0)
  expect(screen.getByText(/estimate only/i)).toBeInTheDocument()
})

test('renders cleanly when localStorage fiveways-academic-semesters is null', () => {
  localStorage.setItem('fiveways-academic-semesters', 'null')
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  expect(screen.getByText(/Enter grades\. Credits are already handled\./i)).toBeInTheDocument()
})

test('renders cleanly when localStorage fiveways-academic-semesters is an object', () => {
  localStorage.setItem('fiveways-academic-semesters', '{}')
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  expect(screen.getByText(/Enter grades\. Credits are already handled\./i)).toBeInTheDocument()
})

test('renders cleanly when localStorage fiveways-academic-semesters is a raw string', () => {
  localStorage.setItem('fiveways-academic-semesters', '"invalid"')
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  expect(screen.getByText(/Enter grades\. Credits are already handled\./i)).toBeInTheDocument()
})

test('handles malformed records inside semester array without crashing', () => {
  localStorage.setItem('fiveways-academic-semesters', JSON.stringify([
    null,
    {},
    'invalid',
    {
      regulation: '2023',
      department: 'CSE',
      semester: 1,
      creditsRegistered: 20,
      gradePointsEarned: 170,
      sgpa: 8.5,
    },
  ]))
  render(<MemoryRouter><AcademicsPage /></MemoryRouter>)
  expect(screen.getByText(/Enter grades\. Credits are already handled\./i)).toBeInTheDocument()
})

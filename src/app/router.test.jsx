import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AppShell from './AppShell'

function TestPage() { return <h1>Route works</h1> }

test('AppShell renders route content', () => {
  render(
    <MemoryRouter initialEntries={['/test']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
  expect(screen.getAllByText('FIVEWAYS').length).toBeGreaterThan(0)
  expect(screen.getByRole('heading', { name: 'Route works' })).toBeInTheDocument()
})

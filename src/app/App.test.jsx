import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the FIVEWAYS brand', () => {
  window.history.pushState({}, '', '/')
  render(<App />)
  expect(screen.getAllByText('FIVEWAYS').length).toBeGreaterThan(0)
})

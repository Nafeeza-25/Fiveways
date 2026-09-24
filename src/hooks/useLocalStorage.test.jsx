import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

test('persists updates as JSON', () => {
  localStorage.clear()
  const { result } = renderHook(() => useLocalStorage('fiveways-test', { year: 1 }))
  act(() => result.current[1]({ year: 3 }))
  expect(JSON.parse(localStorage.getItem('fiveways-test'))).toEqual({ year: 3 })
})

test('falls back safely to initialValue when localStorage has invalid JSON', () => {
  localStorage.clear()
  localStorage.setItem('fiveways-corrupt', 'invalid-json{{{')
  const { result } = renderHook(() => useLocalStorage('fiveways-corrupt', { default: 'value' }))
  expect(result.current[0]).toEqual({ default: 'value' })
})

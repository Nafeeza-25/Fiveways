import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

test('persists updates as JSON', () => {
  localStorage.clear()
  const { result } = renderHook(() => useLocalStorage('fiveways-test', { year: 1 }))
  act(() => result.current[1]({ year: 3 }))
  expect(JSON.parse(localStorage.getItem('fiveways-test'))).toEqual({ year: 3 })
})

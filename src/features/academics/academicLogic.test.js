import { expect, test } from 'vitest'
import { validNumber, projectCgpa, requiredAverageSgpa } from './academicLogic'

test('estimates required future SGPA', () => {
  expect(requiredAverageSgpa({ currentCgpa: 8.14, completedSemesters: 4, targetCgpa: 8.5, futureSemesters: 4 })).toBeCloseTo(8.86, 2)
})

test('projects CGPA from what-if semester values', () => {
  expect(projectCgpa({ currentCgpa: 8.14, completedSemesters: 4, futureSgpas: [8.7, 9.0] })).toBeCloseTo(8.38, 2)
})

test('returns null when target requires SGPA above 10', () => {
  expect(requiredAverageSgpa({ currentCgpa: 6, completedSemesters: 6, targetCgpa: 9.5, futureSemesters: 2 })).toBeNull()
})

test('validNumber returns null for empty or whitespace strings', () => {
  expect(validNumber('')).toBeNull()
  expect(validNumber('  ')).toBeNull()
  expect(validNumber(null)).toBeNull()
  expect(validNumber(undefined)).toBeNull()
  expect(validNumber(0)).toBe(0)
  expect(validNumber('0')).toBe(0)
})

test('projectCgpa returns null when futureSgpas contains empty or whitespace string', () => {
  expect(projectCgpa({ currentCgpa: '8.14', completedSemesters: 4, futureSgpas: ['', '9.0'] })).toBeNull()
  expect(projectCgpa({ currentCgpa: '8.14', completedSemesters: 4, futureSgpas: ['  ', '9.0'] })).toBeNull()
  expect(requiredAverageSgpa({ currentCgpa: '', completedSemesters: 4, targetCgpa: 8.5, futureSemesters: 4 })).toBeNull()
})

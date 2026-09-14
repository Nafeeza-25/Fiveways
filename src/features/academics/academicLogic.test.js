import { expect, test } from 'vitest'
import { projectCgpa, requiredAverageSgpa } from './academicLogic'

test('estimates required future SGPA', () => {
  expect(requiredAverageSgpa({ currentCgpa: 8.14, completedSemesters: 4, targetCgpa: 8.5, futureSemesters: 4 })).toBeCloseTo(8.86, 2)
})

test('projects CGPA from what-if semester values', () => {
  expect(projectCgpa({ currentCgpa: 8.14, completedSemesters: 4, futureSgpas: [8.7, 9.0] })).toBeCloseTo(8.38, 2)
})

test('returns null when target requires SGPA above 10', () => {
  expect(requiredAverageSgpa({ currentCgpa: 6, completedSemesters: 6, targetCgpa: 9.5, futureSemesters: 2 })).toBeNull()
})

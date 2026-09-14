import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateCgpa, calculateSemesterResult, DEFAULT_GRADE_POINTS } from './academicLogic.js'

test('uses the complete IFET COE grade-point scale for credit-bearing grades', () => {
  assert.deepEqual(DEFAULT_GRADE_POINTS, {
    O: 10,
    'A+': 9,
    A: 8,
    'B+': 7,
    B: 6,
    C: 5,
    U: 0,
  })
})

test('U contributes zero grade points but its registered credits remain in GPA denominator', () => {
  const failed = calculateSemesterResult({
    courses: [{ code: 'X', title: 'Course X', credits: 3 }],
    gradesByCode: { X: 'U' },
  })
  assert.equal(failed.creditsRegistered, 3)
  assert.equal(failed.creditsEarned, 0)
  assert.equal(failed.gradePointsEarned, 0)
  assert.equal(failed.sgpa, 0)
})

test('CGPA uses total registered credits when semester results provide them', () => {
  const cgpa = calculateCgpa([
    { creditsRegistered: 3, creditsEarned: 0, gradePointsEarned: 0 },
    { creditsRegistered: 3, creditsEarned: 3, gradePointsEarned: 30 },
  ])
  assert.equal(cgpa, 5)
})

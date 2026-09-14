import test from 'node:test'
import assert from 'node:assert/strict'
import * as academics from './academicLogic.js'
import { getCourses } from '../../data/curriculum.js'

const courses = [
  { code: 'CS101', title: 'Core', credits: 3 },
  { code: 'CS102', title: 'Math', credits: 4 },
  { code: 'MC100', title: 'Mandatory', credits: 0 },
]

test('exposes a credit-weighted semester calculator', () => {
  assert.equal(typeof academics.calculateSemesterResult, 'function')
})

test('calculates SGPA from admin-owned credits and selected letter grades', () => {
  const result = academics.calculateSemesterResult({
    courses,
    gradesByCode: { CS101: 'A', CS102: 'O', MC100: 'A+' },
  })

  assert.deepEqual(result, {
    creditsRegistered: 7,
    creditsEarned: 7,
    gradePointsEarned: 64,
    sgpa: 64 / 7,
  })
})

test('zero-credit courses do not change SGPA', () => {
  const result = academics.calculateSemesterResult({
    courses,
    gradesByCode: { CS101: 'A', CS102: 'O', MC100: 'O' },
  })
  assert.equal(result.gradePointsEarned, 64)
  assert.equal(result.creditsRegistered, 7)
})

test('returns null until every listed course has a grade selection', () => {
  assert.equal(
    academics.calculateSemesterResult({ courses, gradesByCode: { CS101: 'A' } }),
    null,
  )
})

test('calculates CGPA from cumulative credits and grade points instead of averaging SGPAs', () => {
  assert.equal(typeof academics.calculateCgpa, 'function')
  const cgpa = academics.calculateCgpa([
    { creditsEarned: 18, gradePointsEarned: 149, sgpa: 149 / 18 },
    { creditsEarned: 21, gradePointsEarned: 176, sgpa: 176 / 21 },
  ])
  assert.equal(cgpa, 325 / 39)
})

test('upserts a saved semester by regulation, department and semester', () => {
  assert.equal(typeof academics.upsertSemesterResult, 'function')
  const first = {
    regulation: '2023', department: 'CSE', semester: 1,
    creditsEarned: 18, gradePointsEarned: 149, sgpa: 149 / 18,
  }
  const updated = { ...first, gradePointsEarned: 153, sgpa: 8.5 }
  const sem2 = {
    regulation: '2023', department: 'CSE', semester: 2,
    creditsEarned: 21, gradePointsEarned: 176, sgpa: 176 / 21,
  }

  const saved = academics.upsertSemesterResult([first, sem2], updated)
  assert.equal(saved.length, 2)
  assert.equal(saved.find((item) => item.semester === 1).gradePointsEarned, 153)
})

test('zero-credit courses may be ungraded and do not block the semester result', () => {
  const result = academics.calculateSemesterResult({
    courses,
    gradesByCode: { CS101: 'A', CS102: 'O' },
  })
  assert.equal(result.sgpa, 64 / 7)
})


test('CSE semester 1 supplied curriculum reproduces the 149 grade points / 8.28 GPA example', () => {
  const result = academics.calculateSemesterResult({
    courses: getCourses('2023', 'CSE', 1),
    gradesByCode: {
      '23EN1101': 'A',
      '23MA1201': 'A+',
      '23CH1201': 'A',
      '23CS1301': 'B+',
      '23CH1L01': 'O',
      '23CS1L01': 'A',
      '23PL1001': 'A+',
      '23GE1T01': 'A',
    },
  })
  assert.equal(result.creditsRegistered, 18)
  assert.equal(result.gradePointsEarned, 149)
  assert.equal(Number(result.sgpa.toFixed(2)), 8.28)
})

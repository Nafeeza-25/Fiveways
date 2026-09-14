import { describe, expect, test } from 'vitest'
import { scholarships } from '../../data/scholarships'
import { matchScholarships } from './scholarshipLogic'

const demoProfile = {
  department: 'CSE', year: 3, incomeRange: 'under-250000', category: 'BC',
  firstGeneration: true, governmentSchool: true,
  documents: ['Aadhaar', 'Bonafide Certificate'],
}

describe('Scholarship matching', () => {
  test('returns explainable matches sorted by score', () => {
    const matches = matchScholarships(demoProfile, scholarships)
    expect(matches.length).toBeGreaterThan(0)
    expect(matches[0].score).toBeGreaterThanOrEqual(matches.at(-1).score)
    expect(matches[0].matchedReasons.length).toBeGreaterThan(0)
  })
  test('detects missing required documents', () => {
    const matches = matchScholarships(demoProfile, scholarships)
    const firstGen = matches.find((match) => match.scholarshipId === 'first-generation')
    expect(firstGen.missingDocuments).toContain('Income Certificate')
  })
})

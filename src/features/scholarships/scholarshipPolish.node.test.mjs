import test from 'node:test'
import assert from 'node:assert/strict'
import { scholarships } from '../../data/scholarships.js'
import { getDiscoveryScholarships, matchScholarships } from './scholarshipLogic.js'

const profile = {
  department: 'CSE', year: 3, incomeRange: 'under-250000', category: 'BC',
  firstGeneration: true, governmentSchool: true,
  documents: ['Aadhaar', 'Bonafide Certificate'],
}

test('rules-based results exclude discovery-only schemes', () => {
  const matches = matchScholarships(profile, scholarships)
  const ids = matches.map((match) => match.scholarshipId)
  assert(ids.includes('first-generation'))
  assert(ids.includes('government-school-7-5'))
  assert(ids.includes('bc-mbc'))
  assert(!ids.includes('pudhumai-penn'))
})

test('IFET-listed discovery schemes remain visible without fabricated matching rules', () => {
  const discovery = getDiscoveryScholarships(scholarships)
  assert(discovery.some((item) => item.id === 'pudhumai-penn'))
  assert(discovery.some((item) => item.id === 'tamil-pudhalvan'))
  assert(discovery.some((item) => item.id === 'pragati'))
  assert(discovery.every((item) => item.discoveryOnly === true))
  assert(discovery.every((item) => item.sourceUrl?.includes('ifet.ac.in/scholarship-policy')))
})

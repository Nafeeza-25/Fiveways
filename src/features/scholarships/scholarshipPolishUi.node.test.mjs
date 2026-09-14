import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const results = await readFile(new URL('./ScholarshipResults.jsx', import.meta.url), 'utf8')
const card = await readFile(new URL('./ScholarshipCard.jsx', import.meta.url), 'utf8')
const page = await readFile(new URL('./ScholarshipsPage.jsx', import.meta.url), 'utf8')

test('Scholarship results distinguish rule-based matches from discovery-only schemes', () => {
  assert.match(results, /getDiscoveryScholarships/)
  assert.match(results, /Also listed by IFET/)
  assert.match(results, /Verify current rules/)
})

test('Scholarship cards show document readiness and official source', () => {
  assert.match(card, /Document checklist/)
  assert.match(card, /Available/)
  assert.match(card, /Missing/)
  assert.match(card, /View IFET scholarship guidance/)
})

test('Scholarship page links to the verified IFET scholarship policy', () => {
  assert.match(page, /IFET_SCHOLARSHIP_POLICY/)
  assert.match(page, /Verified college guidance/)
})

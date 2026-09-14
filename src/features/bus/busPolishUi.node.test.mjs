import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const page = await readFile(new URL('./BusPage.jsx', import.meta.url), 'utf8')
const hero = await readFile(new URL('./BusRecommendation.jsx', import.meta.url), 'utf8')
const route = await readFile(new URL('./RouteTimeline.jsx', import.meta.url), 'utf8')

test('Smart Bus UI explains why the recommendation wins and shows a fallback', () => {
  assert.match(page, /nextAvailable/)
  assert.match(hero, /Why this bus/)
  assert.match(hero, /If you miss it/)
})

test('route timeline adapts to route length and identifies the selected stop', () => {
  assert.match(route, /gridTemplateColumns/)
  assert.match(route, /route-stop--selected/)
})

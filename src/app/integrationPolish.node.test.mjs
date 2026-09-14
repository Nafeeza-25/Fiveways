import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const nav = await readFile(new URL('../components/TopNav.jsx', import.meta.url), 'utf8')
const home = await readFile(new URL('../features/home/HomePage.jsx', import.meta.url), 'utf8')
const wayCard = await readFile(new URL('../components/WayCard.jsx', import.meta.url), 'utf8')

test('desktop navigation exposes all five ways', () => {
  for (const route of ['/events', '/bus', '/scholarships', '/campus-care', '/academics']) {
    assert.match(nav, new RegExp(route.replace('/', '\\/')))
  }
})

test('home visually identifies the two flagship competition flows', () => {
  assert.match(home, /Flagship demo/)
  assert.match(wayCard, /way-card__badge/)
})

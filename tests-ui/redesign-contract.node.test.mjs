import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFileSync(resolve(root, path), 'utf8')

test('redesign declares Tailwind, Framer Motion, and shadcn support dependencies', () => {
  const pkg = JSON.parse(read('package.json'))
  assert.ok(pkg.dependencies['framer-motion'])
  assert.ok(pkg.dependencies['@radix-ui/react-slot'])
  assert.ok(pkg.dependencies['class-variance-authority'])
  assert.ok(pkg.dependencies['tailwind-merge'])
  assert.ok(pkg.devDependencies.tailwindcss)
})

test('shadcn-style ui primitives exist', () => {
  for (const file of ['button.jsx', 'card.jsx', 'badge.jsx', 'input.jsx', 'progress.jsx', 'tabs.jsx']) {
    assert.ok(existsSync(resolve(root, 'src/components/ui', file)), `${file} missing`)
  }
})

test('global page transitions use Framer Motion', () => {
  const source = read('src/app/AppShell.jsx')
  assert.match(source, /AnimatePresence/)
  assert.match(source, /motion\./)
  assert.match(source, /useLocation/)
})

test('each feature page opens with a purpose-specific visual hero', () => {
  const pages = {
    'src/features/bus/BusPage.jsx': 'variant="bus"',
    'src/features/scholarships/ScholarshipsPage.jsx': 'variant="scholarships"',
    'src/features/events/EventsPage.jsx': 'variant="events"',
    'src/features/campusCare/CampusCarePage.jsx': 'variant="care"',
    'src/features/academics/AcademicsPage.jsx': 'variant="academics"',
  }
  for (const [path, marker] of Object.entries(pages)) {
    assert.match(read(path), new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${path} lacks ${marker}`)
  }
})

test('home uses motion-driven bento cards and feature visuals', () => {
  const home = read('src/features/home/HomePage.jsx')
  assert.match(home, /motion\./)
  assert.match(home, /TiltCard/)
  assert.match(home, /HomeFeatureVisual/)
})

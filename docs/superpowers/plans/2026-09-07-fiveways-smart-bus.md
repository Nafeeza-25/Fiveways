# FIVEWAYS Smart Bus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the flagship Smart Bus flow that lets a student select a stop, compares simulated buses, recommends the best upcoming bus, and visualizes route progress honestly as demo data.

**Architecture:** Local deterministic bus records feed pure recommendation functions. The page separates search, recommendation, comparison cards, and route timeline so logic can be unit tested independently from presentation. Animation is CSS/React visual state only and never changes the recommendation result.

**Tech Stack:** React, Vitest, React Testing Library, CSS, local mock data.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Smart Bus is a flagship module.
- All timing and movement data is simulated unless verified real data is supplied.
- A visible **Simulated Live Demo** disclosure must be present.
- Default demo stop: Cuddalore.
- Default comparison: Bus 12 crossed, Bus 18 approaching in 4 minutes, Bus 21 next in 11 minutes.
- Recommendation must prefer the smallest non-negative ETA among buses that have not crossed the selected stop.
- Unknown stops and no-upcoming-bus states must not crash the page.

---

## File Map

- `src/data/buses.js` — deterministic bus and stop records.
- `src/features/bus/busLogic.js` — pure search/recommendation functions.
- `src/features/bus/busLogic.test.js` — recommendation unit tests.
- `src/features/bus/BusSearch.jsx` — stop selector.
- `src/features/bus/BusRecommendation.jsx` — hero recommendation card.
- `src/features/bus/BusCard.jsx` — comparison card.
- `src/features/bus/RouteTimeline.jsx` — route progress visualization.
- `src/features/bus/BusPage.jsx` — feature composition/state.
- `src/features/bus/BusPage.test.jsx` — flagship flow smoke test.
- `src/styles/globals.css` — bus-specific styles.

---

### Task 1: Create deterministic bus data and recommendation logic

**Files:**
- Create: `src/data/buses.js`
- Create: `src/features/bus/busLogic.js`
- Create: `src/features/bus/busLogic.test.js`

**Interfaces:**
- Produces: `getAvailableStops(buses)`, `getBusesForStop(buses, stopName)`, `recommendBus(busesForStop)`.
- `recommendBus` returns `{ recommended, ordered }` where `recommended` is a bus object or `null`.

- [ ] **Step 1: Write failing logic tests**

Create `src/features/bus/busLogic.test.js`:

```js
import { describe, expect, test } from 'vitest'
import { buses } from '../../data/buses'
import { getAvailableStops, getBusesForStop, recommendBus } from './busLogic'

describe('Smart Bus logic', () => {
  test('lists Cuddalore as a searchable stop', () => {
    expect(getAvailableStops(buses)).toContain('Cuddalore')
  })

  test('recommends Bus 18 for Cuddalore', () => {
    const matches = getBusesForStop(buses, 'Cuddalore')
    const { recommended, ordered } = recommendBus(matches)

    expect(recommended.number).toBe('18')
    expect(recommended.etaMinutes).toBe(4)
    expect(ordered.map((bus) => bus.number)).toEqual(['18', '21', '12'])
  })

  test('returns no recommendation when all buses crossed', () => {
    const crossed = [
      { id: 'x1', number: '1', status: 'crossed', etaMinutes: -5 },
      { id: 'x2', number: '2', status: 'crossed', etaMinutes: -2 },
    ]
    expect(recommendBus(crossed).recommended).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/features/bus/busLogic.test.js
```

Expected: FAIL because the dataset and functions do not exist.

- [ ] **Step 3: Add the demo dataset and pure logic**

Create `src/data/buses.js`:

```js
export const buses = [
  {
    id: 'bus-12', number: '12', routeName: 'Cuddalore → IFET',
    stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
    selectedStop: 'Cuddalore', currentSegment: 2, progress: 56,
    status: 'crossed', etaMinutes: -7,
  },
  {
    id: 'bus-18', number: '18', routeName: 'Cuddalore → IFET Express',
    stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
    selectedStop: 'Cuddalore', currentSegment: 0, progress: 18,
    status: 'approaching', etaMinutes: 4,
  },
  {
    id: 'bus-21', number: '21', routeName: 'Cuddalore → IFET',
    stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
    selectedStop: 'Cuddalore', currentSegment: 0, progress: 4,
    status: 'upcoming', etaMinutes: 11,
  },
  {
    id: 'bus-07', number: '07', routeName: 'Panruti → IFET',
    stops: ['Panruti', 'Koliyanur', 'Villupuram', 'IFET'],
    selectedStop: 'Panruti', currentSegment: 0, progress: 8,
    status: 'upcoming', etaMinutes: 9,
  },
]
```

Create `src/features/bus/busLogic.js`:

```js
export function getAvailableStops(buses) {
  return [...new Set(buses.flatMap((bus) => bus.stops))].sort()
}

export function getBusesForStop(buses, stopName) {
  const normalized = stopName.trim().toLowerCase()
  return buses.filter((bus) => bus.stops.some((stop) => stop.toLowerCase() === normalized))
}

export function recommendBus(busesForStop) {
  const ordered = [...busesForStop].sort((a, b) => {
    const aUpcoming = a.status !== 'crossed' && a.etaMinutes >= 0
    const bUpcoming = b.status !== 'crossed' && b.etaMinutes >= 0
    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1
    return a.etaMinutes - b.etaMinutes
  })

  const recommended = ordered.find((bus) => bus.status !== 'crossed' && bus.etaMinutes >= 0) ?? null
  return { recommended, ordered }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/features/bus/busLogic.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/buses.js src/features/bus/busLogic.js src/features/bus/busLogic.test.js
git commit -m "feat: add Smart Bus recommendation logic"
```

---

### Task 2: Build stop search, recommendation, and comparison UI

**Files:**
- Create: `src/features/bus/BusSearch.jsx`
- Create: `src/features/bus/BusRecommendation.jsx`
- Create: `src/features/bus/BusCard.jsx`
- Modify: `src/features/bus/BusPage.jsx`
- Create: `src/features/bus/BusPage.test.jsx`

**Interfaces:**
- `BusSearch({ stops, value, onChange })` emits the selected stop string.
- `BusRecommendation({ bus })` renders the flagship choice.
- `BusCard({ bus, recommended })` renders status and ETA.

- [ ] **Step 1: Write the failing page flow test**

Create `src/features/bus/BusPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BusPage from './BusPage'

test('selecting Cuddalore recommends Bus 18', async () => {
  const user = userEvent.setup()
  render(<BusPage />)

  expect(screen.getByText('Simulated Live Demo')).toBeInTheDocument()
  await user.selectOptions(screen.getByLabelText(/travelling from/i), 'Cuddalore')

  expect(screen.getByRole('heading', { name: /bus 18/i })).toBeInTheDocument()
  expect(screen.getByText(/approaching your stop/i)).toBeInTheDocument()
  expect(screen.getByText(/4 min/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/features/bus/BusPage.test.jsx
```

Expected: FAIL because the interactive UI is not implemented.

- [ ] **Step 3: Implement the page components**

Create `src/features/bus/BusSearch.jsx`:

```jsx
export default function BusSearch({ stops, value, onChange }) {
  return (
    <label className="field">
      <span>Where are you travelling from?</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select a stop</option>
        {stops.map((stop) => <option key={stop} value={stop}>{stop}</option>)}
      </select>
    </label>
  )
}
```

Create `src/features/bus/BusRecommendation.jsx`:

```jsx
export default function BusRecommendation({ bus }) {
  if (!bus) return <div className="empty-panel">No upcoming demo bus is available for this stop.</div>
  return (
    <section className="bus-hero rise-in">
      <p className="eyebrow">Best option right now</p>
      <h2>Bus {bus.number}</h2>
      <p>Approaching your stop · ~{bus.etaMinutes} min</p>
      <strong>Recommended: Take Bus {bus.number}</strong>
    </section>
  )
}
```

Create `src/features/bus/BusCard.jsx`:

```jsx
export default function BusCard({ bus, recommended }) {
  const statusText = bus.status === 'crossed'
    ? 'Already crossed your stop'
    : `${bus.status === 'approaching' ? 'Approaching' : 'Next'} · ${bus.etaMinutes} min`

  return (
    <article className={`bus-card ${recommended ? 'bus-card--recommended' : ''}`}>
      <div><strong>Bus {bus.number}</strong><p>{bus.routeName}</p></div>
      <span>{statusText}</span>
      {recommended && <span className="recommend-pill">Recommended</span>}
    </article>
  )
}
```

Replace `src/features/bus/BusPage.jsx` with state that defaults to an empty stop, computes stop options, filters buses, then renders `BusRecommendation` and `BusCard` components using `recommendBus`.

Use this exact state core:

```jsx
const [stop, setStop] = useState('')
const stops = getAvailableStops(buses)
const matches = stop ? getBusesForStop(buses, stop) : []
const { recommended, ordered } = recommendBus(matches)
```

Include the visible disclosure:

```jsx
<span className="demo-badge">● Simulated Live Demo</span>
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/features/bus/BusPage.test.jsx src/features/bus/busLogic.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/bus
git commit -m "feat: build Smart Bus recommendation experience"
```

---

### Task 3: Add route timeline and deterministic visual movement

**Files:**
- Create: `src/features/bus/RouteTimeline.jsx`
- Create: `src/features/bus/RouteTimeline.test.jsx`
- Modify: `src/features/bus/BusPage.jsx`
- Modify: `src/styles/globals.css`

**Interfaces:**
- `RouteTimeline({ bus })` renders bus stops and a marker using `bus.progress`.
- Marker movement is visual only; recommendation logic does not read animated progress.

- [ ] **Step 1: Write the failing timeline test**

Create `src/features/bus/RouteTimeline.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import RouteTimeline from './RouteTimeline'

const bus = {
  number: '18',
  stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
  progress: 18,
}

test('renders every route stop and the bus marker', () => {
  render(<RouteTimeline bus={bus} />)
  for (const stop of bus.stops) expect(screen.getByText(stop)).toBeInTheDocument()
  expect(screen.getByLabelText('Bus 18 simulated position')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/features/bus/RouteTimeline.test.jsx
```

Expected: FAIL because `RouteTimeline` does not exist.

- [ ] **Step 3: Implement the timeline**

Create `src/features/bus/RouteTimeline.jsx`:

```jsx
export default function RouteTimeline({ bus }) {
  if (!bus) return null
  return (
    <section className="route-panel">
      <div className="route-line" aria-hidden="true">
        <span className="route-marker" style={{ left: `${bus.progress}%` }} />
      </div>
      <div className="route-stops">
        {bus.stops.map((stop) => <span key={stop}>{stop}</span>)}
      </div>
      <span className="sr-only" aria-label={`Bus ${bus.number} simulated position`} />
    </section>
  )
}
```

Add CSS:

```css
.bus-layout { display: grid; gap: 1.25rem; }
.demo-badge { display: inline-flex; width: fit-content; padding: 0.45rem 0.7rem; border-radius: 999px; background: #eff6ff; color: #1d4ed8; font-size: 0.82rem; font-weight: 700; }
.field { display: grid; gap: 0.5rem; max-width: 520px; }
.field select, .field input, .field textarea { width: 100%; padding: 0.9rem 1rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); }
.bus-hero, .route-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.4rem; box-shadow: var(--shadow-card); }
.bus-card { display: grid; grid-template-columns: 1fr auto auto; gap: 1rem; align-items: center; padding: 1rem 1.2rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--surface); }
.bus-card--recommended { border-color: #93c5fd; }
.recommend-pill { padding: 0.35rem 0.6rem; border-radius: 999px; background: #dbeafe; color: #1d4ed8; font-size: 0.8rem; font-weight: 700; }
.route-line { height: 6px; border-radius: 999px; background: #dbeafe; position: relative; margin: 1rem 0; }
.route-marker { position: absolute; top: 50%; width: 18px; height: 18px; border-radius: 50%; background: #2563eb; transform: translate(-50%, -50%); transition: left 500ms ease; }
.route-stops { display: flex; justify-content: space-between; gap: 0.5rem; color: var(--muted); font-size: 0.78rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 640px) { .bus-card { grid-template-columns: 1fr; } .route-stops { flex-wrap: wrap; } }
```

Render `<RouteTimeline bus={recommended} />` under the recommendation hero.

- [ ] **Step 4: Run tests and manually verify disclosure**

```bash
npm test -- src/features/bus
npm run build
```

Expected: PASS.

Manual check: the route marker visibly moves only if `progress` is changed; the page always shows `Simulated Live Demo`.

- [ ] **Step 5: Commit**

```bash
git add src/features/bus src/styles/globals.css
git commit -m "feat: add Smart Bus route visualization"
```

---

## Completion Gate

Run:

```bash
npm test
npm run build
```

Manual flagship demo:

1. Open `/bus`.
2. Confirm **Simulated Live Demo** is visible before selecting a stop.
3. Select **Cuddalore**.
4. Confirm Bus 18 is recommended with ~4 min.
5. Confirm Bus 21 shows 11 min.
6. Confirm Bus 12 is marked as crossed.
7. Confirm the route timeline renders without claiming GPS/live college data.

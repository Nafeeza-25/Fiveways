# FIVEWAYS Events Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Events page with local event cards, search/filtering, bookmark persistence, and safe registration links.

**Architecture:** Local event records are filtered by a pure helper. The page owns search/category state while saved IDs use shared profile/localStorage state. Event cards are presentation-only.

**Tech Stack:** React, Vitest, React Testing Library, CSS, local mock data, localStorage.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Events answers: **What can I participate in?**
- Use local mock data unless organizers provide official data.
- Support search, category filters, date/deadline, venue, eligibility summary, save/bookmark, and registration link where present.
- No filter results must show a clear-filters action.

---

## File Map

- `src/data/events.js` — local event records.
- `src/features/events/eventLogic.js` — pure filter function.
- `src/features/events/eventLogic.test.js` — filter tests.
- `src/features/events/EventCard.jsx` — event presentation.
- `src/features/events/EventsPage.jsx` — search/filter/save state.
- `src/features/events/EventsPage.test.jsx` — interaction test.
- `src/styles/globals.css` — events styles.

---

### Task 1: Add event data and filtering logic

**Files:**
- Create: `src/data/events.js`
- Create: `src/features/events/eventLogic.js`
- Create: `src/features/events/eventLogic.test.js`

**Interfaces:**
- Produces: `filterEvents(events, { query, category })`.

- [ ] **Step 1: Write failing tests**

```js
import { expect, test } from 'vitest'
import { events } from '../../data/events'
import { filterEvents } from './eventLogic'

test('filters by search text and category', () => {
  const result = filterEvents(events, { query: 'web', category: 'Competition' })
  expect(result.map((event) => event.id)).toEqual(['webcraft-2026'])
})

test('returns all events when filters are empty', () => {
  expect(filterEvents(events, { query: '', category: 'All' })).toHaveLength(events.length)
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/features/events/eventLogic.test.js
```

Expected: FAIL because files do not exist.

- [ ] **Step 3: Implement data and filter**

Create `src/data/events.js`:

```js
export const events = [
  { id: 'webcraft-2026', title: 'WebCraft 2026', category: 'Competition', date: '2026-09-07', deadline: '2026-09-07', venue: 'IFET Campus', eligibility: 'Registered IFET participants', registrationUrl: '' },
  { id: 'ai-workshop', title: 'Applied AI Workshop', category: 'Workshop', date: '2026-09-15', deadline: '2026-09-13', venue: 'Seminar Hall', eligibility: 'Open to all departments', registrationUrl: '' },
  { id: 'coding-club', title: 'Coding Club Challenge', category: 'Club', date: '2026-09-20', deadline: '2026-09-18', venue: 'CSE Lab', eligibility: 'Interested students', registrationUrl: '' },
]
```

Create `src/features/events/eventLogic.js`:

```js
export function filterEvents(events, { query, category }) {
  const normalized = query.trim().toLowerCase()
  return events.filter((event) => {
    const textMatch = !normalized || `${event.title} ${event.venue} ${event.eligibility}`.toLowerCase().includes(normalized)
    const categoryMatch = category === 'All' || event.category === category
    return textMatch && categoryMatch
  })
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/features/events/eventLogic.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/events.js src/features/events/eventLogic.js src/features/events/eventLogic.test.js
git commit -m "feat: add event discovery data and filters"
```

---

### Task 2: Build event cards, filtering UI, and bookmark state

**Files:**
- Create: `src/features/events/EventCard.jsx`
- Modify: `src/features/events/EventsPage.jsx`
- Create: `src/features/events/EventsPage.test.jsx`
- Modify: `src/styles/globals.css`

**Interfaces:**
- `EventCard({ event, saved, onToggleSave })`.

- [ ] **Step 1: Write failing interaction test**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventsPage from './EventsPage'

test('filters events and can save an event', async () => {
  const user = userEvent.setup()
  render(<EventsPage />)

  await user.type(screen.getByLabelText('Search events'), 'web')
  expect(screen.getByText('WebCraft 2026')).toBeInTheDocument()
  expect(screen.queryByText('Applied AI Workshop')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Save WebCraft 2026' }))
  expect(screen.getByRole('button', { name: 'Unsave WebCraft 2026' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/features/events/EventsPage.test.jsx
```

Expected: FAIL because the page is still a placeholder.

- [ ] **Step 3: Implement the event UI**

Create `EventCard.jsx` with title, category, date, deadline, venue, eligibility, save button, and a registration `<a>` only when `registrationUrl` is non-empty. The save button aria-label must be `Save ${event.title}` or `Unsave ${event.title}`.

Implement `EventsPage.jsx` with:

```jsx
const [query, setQuery] = useState('')
const [category, setCategory] = useState('All')
const [savedIds, setSavedIds] = useLocalStorage('fiveways-saved-events', [])
const visibleEvents = filterEvents(events, { query, category })
```

Provide category buttons for `All`, `Competition`, `Workshop`, `Club`. When `visibleEvents.length === 0`, render a `Clear filters` button that resets query and category.

- [ ] **Step 4: Run tests and build**

```bash
npm test -- src/features/events
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/events src/styles/globals.css
git commit -m "feat: build event discovery and bookmarks"
```

---

## Completion Gate

Manual checks:

- Search narrows cards immediately.
- Category chips work.
- Save state survives refresh.
- Missing registration URLs do not render dead buttons.
- `Clear filters` restores all events.

# FIVEWAYS Campus Care Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Campus Care **Report → Track → Resolve** flow with local persistence, validation, deterministic demo ticket IDs, and clear redirection language for serious/formal matters.

**Architecture:** A local form validates category and location, creates a ticket object, persists it in localStorage, and renders a four-stage tracker. No backend is required for the competition-safe version.

**Tech Stack:** React, Vitest, React Testing Library, CSS, localStorage.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Campus Care does not replace IFET's official grievance process.
- Positioning: **Report → Track → Resolve**.
- Formal/serious matters must be redirected to the appropriate official system.
- Required fields: issue category and location.
- Status sequence: Submitted → Assigned → In Progress → Resolved.
- Competition-safe default persistence: localStorage.

---

## File Map

- `src/features/campusCare/campusCareLogic.js` — validation and ticket creation.
- `src/features/campusCare/campusCareLogic.test.js` — unit tests.
- `src/features/campusCare/IssueForm.jsx` — report form.
- `src/features/campusCare/TicketTracker.jsx` — status display.
- `src/features/campusCare/CampusCarePage.jsx` — page state/persistence.
- `src/features/campusCare/CampusCarePage.test.jsx` — interaction test.
- `src/styles/globals.css` — tracker styles.

---

### Task 1: Add ticket validation and creation logic

**Files:**
- Create: `src/features/campusCare/campusCareLogic.js`
- Create: `src/features/campusCare/campusCareLogic.test.js`

**Interfaces:**
- Produces: `validateIssue(input)` and `createDemoTicket(input, sequence)`.

- [ ] **Step 1: Write failing tests**

```js
import { expect, test } from 'vitest'
import { createDemoTicket, validateIssue } from './campusCareLogic'

test('requires category and location', () => {
  expect(validateIssue({ category: '', location: '', description: '' })).toEqual({ category: 'Choose an issue category.', location: 'Enter the issue location.' })
})

test('creates a submitted demo ticket', () => {
  const ticket = createDemoTicket({ category: 'Electrical', location: 'CSE Block, Room 204', description: 'Fan not working' }, 2048)
  expect(ticket.id).toBe('FW-2048')
  expect(ticket.status).toBe('Submitted')
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/features/campusCare/campusCareLogic.test.js
```

Expected: FAIL because functions do not exist.

- [ ] **Step 3: Implement logic**

```js
export function validateIssue(input) {
  const errors = {}
  if (!input.category.trim()) errors.category = 'Choose an issue category.'
  if (!input.location.trim()) errors.location = 'Enter the issue location.'
  return errors
}

export function createDemoTicket(input, sequence) {
  return {
    id: `FW-${sequence}`,
    category: input.category,
    location: input.location,
    description: input.description.trim(),
    status: 'Submitted',
    createdAt: new Date().toISOString(),
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/features/campusCare/campusCareLogic.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/campusCare/campusCareLogic.js src/features/campusCare/campusCareLogic.test.js
git commit -m "feat: add Campus Care ticket logic"
```

---

### Task 2: Build report form and ticket tracker

**Files:**
- Create: `src/features/campusCare/IssueForm.jsx`
- Create: `src/features/campusCare/TicketTracker.jsx`
- Modify: `src/features/campusCare/CampusCarePage.jsx`
- Create: `src/features/campusCare/CampusCarePage.test.jsx`
- Modify: `src/styles/globals.css`

**Interfaces:**
- `IssueForm({ onSubmit })` passes validated input.
- `TicketTracker({ ticket })` renders all four stages with the current stage highlighted.

- [ ] **Step 1: Write failing page test**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CampusCarePage from './CampusCarePage'

test('submits a campus issue and shows a ticket', async () => {
  const user = userEvent.setup()
  render(<CampusCarePage />)

  await user.selectOptions(screen.getByLabelText('Issue category'), 'Electrical')
  await user.type(screen.getByLabelText('Location'), 'CSE Block, Room 204')
  await user.type(screen.getByLabelText('Description'), 'Fan not working')
  await user.click(screen.getByRole('button', { name: 'Submit report' }))

  expect(screen.getByText(/FW-2048/)).toBeInTheDocument()
  expect(screen.getByText('Submitted')).toBeInTheDocument()
  expect(screen.getByText('Assigned')).toBeInTheDocument()
  expect(screen.getByText('In Progress')).toBeInTheDocument()
  expect(screen.getByText('Resolved')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/features/campusCare/CampusCarePage.test.jsx
```

Expected: FAIL because the page is still a placeholder.

- [ ] **Step 3: Implement form, page, and tracker**

`IssueForm` must render:

```text
Issue category: Electrical, Cleanliness, Water, Furniture, Lost/Found, Other
Location
Description (optional)
Submit report
```

Inline error messages come from `validateIssue`.

`CampusCarePage` must persist the latest ticket under `fiveways-campus-ticket` with `useLocalStorage`, starting the sequence at `2048` for the demo.

`TicketTracker` uses:

```js
const stages = ['Submitted', 'Assigned', 'In Progress', 'Resolved']
```

Render the guidance sentence above the form:

```text
For serious or formal grievances, use the appropriate official college grievance channel. FIVEWAYS Campus Care is a prototype for everyday campus issue tracking.
```

- [ ] **Step 4: Run tests and build**

```bash
npm test -- src/features/campusCare
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/campusCare src/styles/globals.css
git commit -m "feat: build Campus Care report and tracking flow"
```

---

## Completion Gate

Manual checks:

- Blank category/location produces inline errors.
- Successful report shows `FW-2048` and all four stages.
- Ticket survives refresh.
- Formal-grievance redirect language is visible.
- No backend dependency exists in the judge-critical path.

# FIVEWAYS Integration & Competition Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate all five Ways into one consistent, responsive, demo-reliable competition experience and verify the full 2–3 minute judge journey.

**Architecture:** No new product subsystem is added. This plan standardizes shared primitives, responsive behavior, accessibility, motion, persistence boundaries, and route-level smoke coverage across the completed feature plans.

**Tech Stack:** React, Vite, Vitest, React Testing Library, CSS.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Judge-critical flows must work without external APIs.
- No optional backend may be introduced before all five routes are stable.
- Motion should communicate state, not decorate constantly.
- Laptop is the primary presentation target; tablet/mobile must not overflow.
- Smart Bus simulated-data disclosure must remain visible.
- Scholarship wording must remain non-authoritative.
- Academic assumptions must remain visible.
- Final judge path: Home → Smart Bus → Scholarship Finder → Events/Campus Care/Academic Path → Home.

---

## File Map

- `src/components/SectionHeader.jsx` — consistent route heading/back action.
- `src/components/Button.jsx` — shared button styles.
- `src/components/StatusBadge.jsx` — shared state badge.
- `src/components/EmptyState.jsx` — shared empty-state presentation.
- `src/styles/globals.css` — final responsive and accessibility polish.
- `src/styles/animations.css` — restrained motion utilities.
- `src/app/fullJourney.test.jsx` — route-level smoke test.
- `README.md` — local setup, demo assumptions, competition demo script.

---

### Task 1: Standardize shared presentation primitives

**Files:**
- Create: `src/components/SectionHeader.jsx`
- Create: `src/components/Button.jsx`
- Create: `src/components/StatusBadge.jsx`
- Create: `src/components/EmptyState.jsx`
- Modify: feature pages to adopt shared primitives where applicable.

**Interfaces:**
- `SectionHeader({ eyebrow, title, description })`.
- `Button({ as, variant, children, ...props })`.
- `StatusBadge({ tone, children })`.
- `EmptyState({ title, description, action })`.

- [ ] **Step 1: Write a shared component smoke test**

Create `src/components/shared.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import SectionHeader from './SectionHeader'
import StatusBadge from './StatusBadge'

test('shared primitives render semantic text', () => {
  render(<><SectionHeader eyebrow="Smart Bus" title="Find My Bus" description="Which bus should I take now?" /><StatusBadge tone="info">Simulated Live Demo</StatusBadge></>)
  expect(screen.getByRole('heading', { name: 'Find My Bus' })).toBeInTheDocument()
  expect(screen.getByText('Simulated Live Demo')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/components/shared.test.jsx
```

Expected: FAIL because primitives do not exist.

- [ ] **Step 3: Implement primitives and replace duplicated page headings/badges**

Use semantic `section`, `h1`, `p`, and `span` elements. Keep `Button` as a thin visual wrapper rather than moving feature logic into shared code.

- [ ] **Step 4: Run the full suite**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components src/features
git commit -m "refactor: standardize FIVEWAYS shared UI primitives"
```

---

### Task 2: Add full-journey route smoke coverage

**Files:**
- Create: `src/app/fullJourney.test.jsx`

**Interfaces:**
- Consumes: `appRouter` route tree.
- Produces: one smoke test proving every key route renders its central heading/feature label.

- [ ] **Step 1: Write the failing route assertions**

Use a memory-router compatible test helper or individual `MemoryRouter` renders for each page component. Assert these exact visible strings:

```text
WHAT DO YOU NEED RIGHT NOW?
Find My Bus
Check Scholarships
Find an Event
Report a Campus Issue
Plan My Academics
```

- [ ] **Step 2: Run the test**

```bash
npm test -- src/app/fullJourney.test.jsx
```

Expected: PASS if all prior plans are integrated; any failure identifies a broken route/page contract.

- [ ] **Step 3: Fix only integration defects exposed by the smoke test**

Do not add new product scope. Resolve import paths, route mismatches, or missing headings so the six route contracts are stable.

- [ ] **Step 4: Run full tests and production build**

```bash
npm test
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/fullJourney.test.jsx src/app src/features
git commit -m "test: verify FIVEWAYS judge journey routes"
```

---

### Task 3: Responsive, motion, and accessibility polish

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/styles/animations.css`
- Modify: feature components where labels/focus states are missing.

**Interfaces:**
- No new JavaScript API.

- [ ] **Step 1: Add explicit keyboard focus styles**

Append:

```css
:focus-visible { outline: 3px solid color-mix(in srgb, var(--accent) 55%, white); outline-offset: 3px; }
button, a, input, select, textarea { -webkit-tap-highlight-color: transparent; }
```

- [ ] **Step 2: Add responsive guardrails**

Ensure every route container uses `min-width: 0`, cards wrap, and long text/URLs cannot force overflow:

```css
.page-shell > * { min-width: 0; }
img { max-width: 100%; height: auto; }
.scholarship-card, .bus-card, .way-card { overflow-wrap: anywhere; }
@media (max-width: 480px) { .page-shell { padding-bottom: 2.5rem; } }
```

- [ ] **Step 3: Keep motion restrained and reduced-motion safe**

Every animation must have a `prefers-reduced-motion` fallback. Do not add looping decorative effects. The bus marker transition and result entrance may remain.

- [ ] **Step 4: Verify at presentation widths**

Run:

```bash
npm run dev
```

Manual viewport checks:

```text
1440 × 900 laptop
1024 × 768 tablet
390 × 844 mobile
```

Expected: no horizontal scroll, no clipped CTA, all five home cards usable.

- [ ] **Step 5: Commit**

```bash
git add src/styles src/components src/features
git commit -m "style: polish FIVEWAYS responsive competition UI"
```

---

### Task 4: Write the competition README and final verification script

**Files:**
- Create or modify: `README.md`

**Interfaces:**
- Documentation only.

- [ ] **Step 1: Document local commands**

README must contain:

```bash
npm install
npm run dev
npm test
npm run build
```

- [ ] **Step 2: Document prototype assumptions**

State clearly:

```text
Smart Bus timing/position data is simulated for the competition prototype.
Scholarship matches are guidance only and do not determine official eligibility.
Academic Path uses an equal-semester-weight estimate unless official regulation-specific credit rules are supplied.
Campus Care is a prototype tracking layer and does not replace the official grievance process.
```

- [ ] **Step 3: Add the 2–3 minute demo script**

README demo order:

```text
1. Home: explain the five action paths.
2. Smart Bus: select Cuddalore and show Bus 18 recommendation.
3. Scholarship Finder: complete the prepared profile and show explainable matches/missing documents.
4. Events: demonstrate search/filter/bookmark.
5. Campus Care: submit a demo ticket and show the four-stage tracker.
6. Academic Path: show target SGPA estimate and what-if projection.
7. Return Home and close with the FIVEWAYS value proposition.
```

- [ ] **Step 4: Run final verification**

```bash
npm test
npm run build
```

Then use a fresh browser profile or cleared localStorage and perform the full judge journey once without network dependency.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add FIVEWAYS competition demo guide"
```

---

## Final Completion Gate

All conditions must be true before presentation:

```text
[ ] npm test passes.
[ ] npm run build passes.
[ ] All six routes load.
[ ] Smart Bus recommends Bus 18 for Cuddalore.
[ ] Simulated Live Demo label is visible.
[ ] Scholarship results explain why they matched.
[ ] Scholarship UI never claims guaranteed eligibility.
[ ] Events filtering and bookmarks work.
[ ] Campus Care creates a trackable local ticket.
[ ] Academic Path shows assumptions and handles impossible targets.
[ ] 390px viewport has no horizontal overflow.
[ ] Full demo works after disabling network access.
```

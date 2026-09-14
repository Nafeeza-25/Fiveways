# FIVEWAYS Academic Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a narrowly scoped Academic Path calculator that answers **What should I aim for next?** using transparent estimated CGPA/SGPA assumptions.

**Architecture:** Pure calculation helpers validate numeric inputs, estimate the average future SGPA required to reach a target, and project CGPA from what-if semester SGPA values. The UI explicitly labels the model as an estimate unless verified IFET regulation/credit rules are later supplied.

**Tech Stack:** React, Vitest, React Testing Library, CSS.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Academic Path is not a results portal or COE replacement.
- It only supports current CGPA, target CGPA, future SGPA estimate, and what-if projection.
- Assumptions must be visible.
- If exact IFET credit weighting is unavailable, results must be labeled as estimates.
- Invalid inputs and impossible targets need explanatory states.

---

## File Map

- `src/features/academics/academicLogic.js` — calculation helpers.
- `src/features/academics/academicLogic.test.js` — calculation tests.
- `src/features/academics/AcademicPlanner.jsx` — inputs/results.
- `src/features/academics/AcademicsPage.jsx` — page shell.
- `src/features/academics/AcademicsPage.test.jsx` — interaction test.
- `src/styles/globals.css` — calculator styles.

---

### Task 1: Add estimated target and projection calculations

**Files:**
- Create: `src/features/academics/academicLogic.js`
- Create: `src/features/academics/academicLogic.test.js`

**Interfaces:**
- Produces: `requiredAverageSgpa({ currentCgpa, completedSemesters, targetCgpa, futureSemesters })`.
- Produces: `projectCgpa({ currentCgpa, completedSemesters, futureSgpas })`.

- [ ] **Step 1: Write failing calculation tests**

```js
import { expect, test } from 'vitest'
import { projectCgpa, requiredAverageSgpa } from './academicLogic'

test('estimates required future SGPA', () => {
  expect(requiredAverageSgpa({ currentCgpa: 8.14, completedSemesters: 4, targetCgpa: 8.5, futureSemesters: 4 })).toBeCloseTo(8.86, 2)
})

test('projects CGPA from what-if semester values', () => {
  expect(projectCgpa({ currentCgpa: 8.14, completedSemesters: 4, futureSgpas: [8.7, 9.0] })).toBeCloseTo(8.38, 2)
})

test('returns null when target requires SGPA above 10', () => {
  expect(requiredAverageSgpa({ currentCgpa: 6, completedSemesters: 6, targetCgpa: 9.5, futureSemesters: 2 })).toBeNull()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/features/academics/academicLogic.test.js
```

Expected: FAIL because functions do not exist.

- [ ] **Step 3: Implement the estimated equal-semester-weight model**

```js
export function requiredAverageSgpa({ currentCgpa, completedSemesters, targetCgpa, futureSemesters }) {
  const currentPoints = currentCgpa * completedSemesters
  const targetPoints = targetCgpa * (completedSemesters + futureSemesters)
  const required = (targetPoints - currentPoints) / futureSemesters
  if (!Number.isFinite(required) || required < 0 || required > 10) return null
  return required
}

export function projectCgpa({ currentCgpa, completedSemesters, futureSgpas }) {
  const currentPoints = currentCgpa * completedSemesters
  const futurePoints = futureSgpas.reduce((sum, sgpa) => sum + Number(sgpa), 0)
  return (currentPoints + futurePoints) / (completedSemesters + futureSgpas.length)
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/features/academics/academicLogic.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/academics/academicLogic.js src/features/academics/academicLogic.test.js
git commit -m "feat: add Academic Path estimate logic"
```

---

### Task 2: Build the target and what-if planner UI

**Files:**
- Create: `src/features/academics/AcademicPlanner.jsx`
- Modify: `src/features/academics/AcademicsPage.jsx`
- Create: `src/features/academics/AcademicsPage.test.jsx`
- Modify: `src/styles/globals.css`

**Interfaces:**
- `AcademicPlanner` owns numeric form state and calls pure logic helpers.

- [ ] **Step 1: Write failing page test**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AcademicsPage from './AcademicsPage'

test('shows a required SGPA estimate and assumption note', async () => {
  const user = userEvent.setup()
  render(<AcademicsPage />)

  await user.clear(screen.getByLabelText('Current CGPA'))
  await user.type(screen.getByLabelText('Current CGPA'), '8.14')
  await user.clear(screen.getByLabelText('Completed semesters'))
  await user.type(screen.getByLabelText('Completed semesters'), '4')
  await user.clear(screen.getByLabelText('Target CGPA'))
  await user.type(screen.getByLabelText('Target CGPA'), '8.5')
  await user.clear(screen.getByLabelText('Future semesters'))
  await user.type(screen.getByLabelText('Future semesters'), '4')

  expect(screen.getByText(/8\.86/)).toBeInTheDocument()
  expect(screen.getByText(/estimate/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/features/academics/AcademicsPage.test.jsx
```

Expected: FAIL because the planner does not exist.

- [ ] **Step 3: Implement the planner**

Render numeric inputs with these labels and defaults:

```text
Current CGPA: 8.14
Completed semesters: 4
Target CGPA: 8.50
Future semesters: 4
What-if SGPA 1: 8.70
What-if SGPA 2: 9.00
```

Show either:

```text
Aim for an average SGPA of about 8.86 across the remaining semesters.
```

or, when helper returns `null`:

```text
This target is not reachable under the current estimate because it would require an SGPA above 10.
```

Show the assumption note verbatim:

```text
Estimate only: this competition prototype uses equal semester weighting. Official CGPA calculations may depend on IFET regulation-specific credit weighting.
```

Show projected CGPA from the two what-if fields using `projectCgpa`.

- [ ] **Step 4: Run tests and build**

```bash
npm test -- src/features/academics
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/academics src/styles/globals.css
git commit -m "feat: build Academic Path goal planner"
```

---

## Completion Gate

Manual checks:

- Invalid text/non-numeric values do not produce `NaN` in the UI.
- Impossible targets produce explanation rather than a bogus SGPA.
- Estimate disclaimer is always visible near results.
- No marksheet/results/exam portal features are present.

# FIVEWAYS Scholarship Finder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the flagship Scholarship Finder wizard with transparent local rules, explainable matches, and missing-document detection without claiming authoritative eligibility.

**Architecture:** Scholarship records are local data. A pure matcher scores profile fields, collects matched reasons and unmet conditions, and compares required documents against the student's demo document state. The React wizard collects four steps and then renders explainable result cards.

**Tech Stack:** React, Vitest, React Testing Library, CSS, local mock data, localStorage via shared profile context.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Scholarship Finder is a flagship module.
- Use cautious language such as **You may be eligible**, **Worth checking**, and **Strong match**.
- Never render **You are eligible** or **Guaranteed**.
- Matching is transparent and rules-based.
- Every result explains why it appeared.
- Missing deadlines or URLs are omitted rather than fabricated.
- Document availability is demo profile state, not a document-storage product.

---

## File Map

- `src/data/scholarships.js` — local scholarship records.
- `src/features/scholarships/scholarshipLogic.js` — pure matching functions.
- `src/features/scholarships/scholarshipLogic.test.js` — matcher tests.
- `src/features/scholarships/ScholarshipWizard.jsx` — four-step profile form.
- `src/features/scholarships/ScholarshipResults.jsx` — result list.
- `src/features/scholarships/ScholarshipCard.jsx` — explainable result card.
- `src/features/scholarships/ScholarshipsPage.jsx` — feature state/composition.
- `src/features/scholarships/ScholarshipsPage.test.jsx` — guided flow test.
- `src/styles/globals.css` — scholarship UI styles.

---

### Task 1: Add scholarship data and explainable matcher

**Files:**
- Create: `src/data/scholarships.js`
- Create: `src/features/scholarships/scholarshipLogic.js`
- Create: `src/features/scholarships/scholarshipLogic.test.js`

**Interfaces:**
- Produces: `matchScholarships(profile, scholarships)` returning sorted match objects.
- Match object: `{ scholarshipId, score, matchedReasons, unmetConditions, missingDocuments }`.

- [ ] **Step 1: Write failing matcher tests**

Create `src/features/scholarships/scholarshipLogic.test.js`:

```js
import { describe, expect, test } from 'vitest'
import { scholarships } from '../../data/scholarships'
import { matchScholarships } from './scholarshipLogic'

const demoProfile = {
  department: 'CSE', year: 3, incomeRange: 'under-250000', category: 'BC',
  firstGeneration: true, governmentSchool: true,
  documents: ['Aadhaar', 'Bonafide Certificate'],
}

describe('Scholarship matching', () => {
  test('returns explainable matches sorted by score', () => {
    const matches = matchScholarships(demoProfile, scholarships)
    expect(matches.length).toBeGreaterThan(0)
    expect(matches[0].score).toBeGreaterThanOrEqual(matches.at(-1).score)
    expect(matches[0].matchedReasons.length).toBeGreaterThan(0)
  })

  test('detects missing required documents', () => {
    const matches = matchScholarships(demoProfile, scholarships)
    const firstGen = matches.find((match) => match.scholarshipId === 'first-generation')
    expect(firstGen.missingDocuments).toContain('Income Certificate')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/features/scholarships/scholarshipLogic.test.js
```

Expected: FAIL because the matcher and data do not exist.

- [ ] **Step 3: Add local records and matcher**

Create `src/data/scholarships.js`:

```js
export const scholarships = [
  {
    id: 'first-generation',
    name: 'First Generation Graduate Scheme',
    description: 'Support worth checking for qualifying first-generation graduate students.',
    rules: { firstGeneration: true, incomeRanges: ['under-250000', '250000-500000'] },
    requiredDocuments: ['Aadhaar', 'Bonafide Certificate', 'Income Certificate', 'First Graduate Certificate'],
    contact: 'Scholarship / student support office',
  },
  {
    id: 'government-school',
    name: 'Government School Student Support',
    description: 'A scheme worth checking for students from eligible government-school backgrounds.',
    rules: { governmentSchool: true },
    requiredDocuments: ['Aadhaar', 'Bonafide Certificate', 'School Study Certificate'],
    contact: 'Scholarship / student support office',
  },
  {
    id: 'bc-mbc',
    name: 'BC / MBC Scholarship',
    description: 'Community and income-linked support worth checking where applicable.',
    rules: { categories: ['BC', 'MBC'], incomeRanges: ['under-250000', '250000-500000'] },
    requiredDocuments: ['Aadhaar', 'Bonafide Certificate', 'Income Certificate', 'Community Certificate'],
    contact: 'Scholarship / student support office',
  },
]
```

Create `src/features/scholarships/scholarshipLogic.js`:

```js
function matchesRule(profile, key, allowed) {
  if (!allowed) return null
  if (Array.isArray(allowed)) return allowed.includes(profile[key])
  return profile[key] === allowed
}

export function matchScholarships(profile, scholarships) {
  return scholarships.map((scholarship) => {
    const matchedReasons = []
    const unmetConditions = []
    const { rules } = scholarship

    const checks = [
      ['firstGeneration', rules.firstGeneration, 'First-generation status matches'],
      ['governmentSchool', rules.governmentSchool, 'Government-school background matches'],
      ['category', rules.categories, 'Community/category is within the listed groups'],
      ['incomeRange', rules.incomeRanges, 'Income range is within the listed band'],
    ]

    for (const [profileKey, rule, reason] of checks) {
      const result = matchesRule(profile, profileKey, rule)
      if (result === null) continue
      if (result) matchedReasons.push(reason)
      else unmetConditions.push(reason.replace('matches', 'does not match'))
    }

    const missingDocuments = scholarship.requiredDocuments.filter(
      (document) => !profile.documents.includes(document),
    )

    const totalRuleCount = matchedReasons.length + unmetConditions.length
    const score = totalRuleCount === 0 ? 0 : Math.round((matchedReasons.length / totalRuleCount) * 100)

    return {
      scholarshipId: scholarship.id,
      score,
      matchedReasons,
      unmetConditions,
      missingDocuments,
    }
  }).filter((match) => match.matchedReasons.length > 0)
    .sort((a, b) => b.score - a.score)
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/features/scholarships/scholarshipLogic.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/scholarships.js src/features/scholarships/scholarshipLogic.js src/features/scholarships/scholarshipLogic.test.js
git commit -m "feat: add transparent scholarship matching"
```

---

### Task 2: Build the four-step scholarship wizard

**Files:**
- Create: `src/features/scholarships/ScholarshipWizard.jsx`
- Modify: `src/features/scholarships/ScholarshipsPage.jsx`
- Create: `src/features/scholarships/ScholarshipsPage.test.jsx`

**Interfaces:**
- `ScholarshipWizard({ initialProfile, onComplete })` calls `onComplete(profile)` only after required fields are present.

- [ ] **Step 1: Write the failing wizard flow test**

Create `src/features/scholarships/ScholarshipsPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScholarshipsPage from './ScholarshipsPage'

test('completes the wizard and shows cautious match language', async () => {
  const user = userEvent.setup()
  render(<ScholarshipsPage />)

  await user.selectOptions(screen.getByLabelText('Department'), 'CSE')
  await user.selectOptions(screen.getByLabelText('Year'), '3')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.click(screen.getByLabelText('Government-school background'))
  await user.click(screen.getByLabelText('First-generation student'))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.selectOptions(screen.getByLabelText('Income range'), 'under-250000')
  await user.selectOptions(screen.getByLabelText('Category'), 'BC')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.click(screen.getByLabelText('Aadhaar'))
  await user.click(screen.getByLabelText('Bonafide Certificate'))
  await user.click(screen.getByRole('button', { name: 'Find scholarships' }))

  expect(screen.getByText(/you may be eligible/i)).toBeInTheDocument()
  expect(screen.queryByText(/^you are eligible$/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/features/scholarships/ScholarshipsPage.test.jsx
```

Expected: FAIL because the wizard does not exist.

- [ ] **Step 3: Implement the guided wizard**

Create `src/features/scholarships/ScholarshipWizard.jsx` with four explicit steps and this initial shape:

```jsx
const emptyProfile = {
  department: '', year: '', governmentSchool: false, firstGeneration: false,
  incomeRange: '', category: '', documents: [],
}
```

Required controls and labels:

```text
Step 1: Department select, Year select
Step 2: Government-school background checkbox, First-generation student checkbox
Step 3: Income range select, Category select
Step 4: Aadhaar, Bonafide Certificate, Income Certificate, Community Certificate, First Graduate Certificate, School Study Certificate checkboxes
```

Use this step transition guard:

```js
const stepValid = [
  Boolean(profile.department && profile.year),
  true,
  Boolean(profile.incomeRange && profile.category),
  true,
][step]
```

Buttons must be named exactly `Continue` for steps 1–3 and `Find scholarships` on step 4. Disable the button when `stepValid` is false.

Replace `ScholarshipsPage.jsx` with state that initially renders the wizard and stores the completed profile for Task 3.

- [ ] **Step 4: Run the page test until the wizard reaches result state**

For this task, render a temporary result heading after completion:

```jsx
<h2>You may be eligible for opportunities worth checking</h2>
```

Run:

```bash
npm test -- src/features/scholarships/ScholarshipsPage.test.jsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/scholarships/ScholarshipWizard.jsx src/features/scholarships/ScholarshipsPage.jsx src/features/scholarships/ScholarshipsPage.test.jsx
git commit -m "feat: add scholarship profile wizard"
```

---

### Task 3: Render explainable scholarship results and missing documents

**Files:**
- Create: `src/features/scholarships/ScholarshipCard.jsx`
- Create: `src/features/scholarships/ScholarshipResults.jsx`
- Modify: `src/features/scholarships/ScholarshipsPage.jsx`
- Modify: `src/styles/globals.css`
- Modify: `src/features/scholarships/ScholarshipsPage.test.jsx`

**Interfaces:**
- `ScholarshipResults({ profile })` matches local data and renders one `ScholarshipCard` per result.
- `ScholarshipCard({ scholarship, match })` never asserts final eligibility.

- [ ] **Step 1: Extend the failing page test for explainability**

Append these assertions after completing the wizard:

```jsx
expect(screen.getByText('First Generation Graduate Scheme')).toBeInTheDocument()
expect(screen.getAllByText(/why this matched/i).length).toBeGreaterThan(0)
expect(screen.getAllByText(/income certificate/i).length).toBeGreaterThan(0)
```

Run:

```bash
npm test -- src/features/scholarships/ScholarshipsPage.test.jsx
```

Expected: FAIL because result cards are not implemented.

- [ ] **Step 2: Implement result components**

Create `src/features/scholarships/ScholarshipCard.jsx`:

```jsx
export default function ScholarshipCard({ scholarship, match }) {
  const strength = match.score >= 75 ? 'Strong match' : 'Worth checking'
  return (
    <article className="scholarship-card">
      <div className="scholarship-card__top"><h3>{scholarship.name}</h3><span>{strength}</span></div>
      <p>{scholarship.description}</p>
      <h4>Why this matched</h4>
      <ul>{match.matchedReasons.map((reason) => <li key={reason}>✓ {reason}</li>)}</ul>
      {match.missingDocuments.length > 0 && (
        <><h4>Missing documents</h4><ul>{match.missingDocuments.map((doc) => <li key={doc}>⚠ {doc}</li>)}</ul></>
      )}
      {scholarship.contact && <p><strong>Next step:</strong> {scholarship.contact}</p>}
    </article>
  )
}
```

Create `src/features/scholarships/ScholarshipResults.jsx`:

```jsx
import { scholarships } from '../../data/scholarships'
import { matchScholarships } from './scholarshipLogic'
import ScholarshipCard from './ScholarshipCard'

export default function ScholarshipResults({ profile }) {
  const matches = matchScholarships(profile, scholarships)
  if (matches.length === 0) return <div className="empty-panel">No clear demo match was found. Check official scholarship guidance for additional schemes.</div>

  return (
    <section className="rise-in">
      <p className="eyebrow">Based on the information provided</p>
      <h2>You may be eligible for {matches.length} opportunities worth checking</h2>
      <div className="scholarship-grid">
        {matches.map((match) => {
          const scholarship = scholarships.find((item) => item.id === match.scholarshipId)
          return <ScholarshipCard key={match.scholarshipId} scholarship={scholarship} match={match} />
        })}
      </div>
    </section>
  )
}
```

Update `ScholarshipsPage` to render `<ScholarshipResults profile={completedProfile} />` after the wizard completes.

- [ ] **Step 3: Add result styling**

Append to `src/styles/globals.css`:

```css
.scholarship-grid { display: grid; gap: 1rem; margin-top: 1.25rem; }
.scholarship-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.35rem; box-shadow: var(--shadow-card); }
.scholarship-card__top { display: flex; justify-content: space-between; gap: 1rem; align-items: start; }
.scholarship-card h3 { margin: 0; }
.scholarship-card h4 { margin-bottom: 0.4rem; }
.scholarship-card ul { padding-left: 1.2rem; color: var(--muted); }
```

- [ ] **Step 4: Run tests and build**

```bash
npm test -- src/features/scholarships
npm run build
```

Expected: PASS, and no rendered copy contains `You are eligible` or `Guaranteed`.

- [ ] **Step 5: Commit**

```bash
git add src/features/scholarships src/styles/globals.css
git commit -m "feat: show explainable scholarship matches"
```

---

## Completion Gate

Run:

```bash
npm test
npm run build
```

Manual flagship demo:

1. Open `/scholarships`.
2. Complete all four steps with the prepared profile.
3. Confirm cautious language is visible.
4. Confirm at least one result explains why it matched.
5. Confirm `Income Certificate` can appear as missing.
6. Confirm there is no document upload/storage feature.

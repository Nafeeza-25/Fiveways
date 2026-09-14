# FIVEWAYS Foundation & Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the React + Vite application shell, routing, shared design system, student profile state, and the action-first FIVEWAYS home screen.

**Architecture:** A single Vite React app uses React Router for six routes, plain CSS tokens for the shared premium visual system, and a lightweight context plus localStorage for student preferences. Feature pages begin as route-safe placeholders so every navigation path works before deep feature implementation.

**Tech Stack:** React, Vite, React Router, Vitest, React Testing Library, CSS, localStorage.

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

## Global Constraints

- Primary stack: React + Vite.
- Design direction: Modern premium student app.
- The home screen is an action-first decision screen, not a dashboard.
- Five routes must exist: `/events`, `/bus`, `/scholarships`, `/campus-care`, `/academics`.
- No authentication system is required.
- Shared student data is lightweight application state persisted with localStorage.
- The app must remain usable on laptop, tablet, and mobile.
- Shared components contain presentation primitives only; feature logic stays inside feature folders.

---

## File Map

- `package.json` — runtime and test scripts/dependencies.
- `src/main.jsx` — React entry point.
- `src/app/App.jsx` — root application component.
- `src/app/router.jsx` — route definitions.
- `src/app/AppShell.jsx` — shared page shell and outlet.
- `src/components/TopNav.jsx` — shared navigation.
- `src/components/WayCard.jsx` — clickable home action card.
- `src/components/Button.jsx` — shared button primitive.
- `src/components/StatusBadge.jsx` — shared badge primitive.
- `src/hooks/useLocalStorage.js` — safe JSON localStorage hook.
- `src/state/StudentProfileContext.jsx` — shared lightweight student profile state.
- `src/features/home/HomePage.jsx` — action-first home screen.
- `src/features/events/EventsPage.jsx` — route-safe placeholder.
- `src/features/bus/BusPage.jsx` — route-safe placeholder.
- `src/features/scholarships/ScholarshipsPage.jsx` — route-safe placeholder.
- `src/features/campusCare/CampusCarePage.jsx` — route-safe placeholder.
- `src/features/academics/AcademicsPage.jsx` — route-safe placeholder.
- `src/styles/tokens.css` — design tokens.
- `src/styles/globals.css` — reset/layout/shared classes.
- `src/styles/animations.css` — motion primitives.
- `src/test/setup.js` — Testing Library setup.
- `src/features/home/HomePage.test.jsx` — home behavior tests.
- `src/app/router.test.jsx` — route smoke tests.

---

### Task 1: Scaffold the tested React application

**Files:**
- Create: `package.json`
- Create: `src/main.jsx`
- Create: `src/test/setup.js`
- Create: `src/app/App.jsx`

**Interfaces:**
- Consumes: browser DOM.
- Produces: `App` root component and `npm test` command using Vitest.

- [ ] **Step 1: Create the Vite React project and install dependencies**

Run:

```bash
npm create vite@latest . -- --template react
npm install
npm install react-router-dom
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Update `package.json` scripts to include:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Add this Vite test configuration in `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 2: Write the failing root render test**

Create `src/app/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the FIVEWAYS brand', () => {
  render(<App />)
  expect(screen.getByText('FIVEWAYS')).toBeInTheDocument()
})
```

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
npm test -- src/app/App.test.jsx
```

Expected: FAIL because `src/app/App.jsx` does not yet render `FIVEWAYS`.

- [ ] **Step 4: Add the minimal root component and entry point**

Create `src/app/App.jsx`:

```jsx
export default function App() {
  return <div>FIVEWAYS</div>
}
```

Replace `src/main.jsx` with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Run tests and commit**

Run:

```bash
npm test -- src/app/App.test.jsx
npm run build
```

Expected: both commands PASS.

Commit:

```bash
git add package.json package-lock.json vite.config.js src/main.jsx src/test/setup.js src/app/App.jsx src/app/App.test.jsx
git commit -m "chore: scaffold tested FIVEWAYS app"
```

---

### Task 2: Add routing, app shell, and shared visual tokens

**Files:**
- Create: `src/app/AppShell.jsx`
- Create: `src/components/TopNav.jsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/globals.css`
- Create: `src/styles/animations.css`
- Modify: `src/app/App.jsx`
- Create: `src/app/router.test.jsx`

**Interfaces:**
- Consumes: route page components from `src/features/*`.
- Produces: `appRouter`, `AppShell`, `TopNav`, global CSS variables.

- [ ] **Step 1: Write the failing routing smoke test**

Create `src/app/router.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AppShell from './AppShell'

function TestPage() {
  return <h1>Route works</h1>
}

test('AppShell renders route content', () => {
  render(
    <MemoryRouter initialEntries={['/test']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

  expect(screen.getByText('FIVEWAYS')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Route works' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/app/router.test.jsx
```

Expected: FAIL because `AppShell` does not exist.

- [ ] **Step 3: Implement the shell and visual system**

Create `src/components/TopNav.jsx`:

```jsx
import { Link } from 'react-router-dom'

export default function TopNav() {
  return (
    <header className="top-nav">
      <Link className="brand" to="/" aria-label="FIVEWAYS home">FIVEWAYS</Link>
      <span className="top-nav__tagline">Know what to do next.</span>
    </header>
  )
}
```

Create `src/app/AppShell.jsx`:

```jsx
import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav'

export default function AppShell() {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  )
}
```

Create `src/styles/tokens.css`:

```css
:root {
  --bg: #f7f8fb;
  --surface: #ffffff;
  --surface-soft: #f0f3f8;
  --text: #111827;
  --muted: #667085;
  --border: #e5e7eb;
  --accent: #4f46e5;
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --shadow-card: 0 12px 32px rgba(15, 23, 42, 0.08);
  --space-1: 0.5rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  --max-width: 1180px;
}
```

Create `src/styles/globals.css`:

```css
* { box-sizing: border-box; }
html { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--text); background: var(--bg); }
body { margin: 0; min-width: 320px; min-height: 100vh; }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
.top-nav { max-width: var(--max-width); margin: 0 auto; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.brand { font-weight: 850; letter-spacing: 0.06em; }
.top-nav__tagline { color: var(--muted); font-size: 0.9rem; }
.page-shell { max-width: var(--max-width); margin: 0 auto; padding: 1rem 1.5rem 4rem; }
@media (max-width: 640px) { .top-nav__tagline { display: none; } .page-shell { padding-inline: 1rem; } }
```

Create `src/styles/animations.css`:

```css
@keyframes rise-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.rise-in { animation: rise-in 320ms ease both; }
@media (prefers-reduced-motion: reduce) { .rise-in { animation: none; } }
```

- [ ] **Step 4: Import styles and run the shell test**

Add these imports to `src/main.jsx` immediately after the React imports:

```jsx
import './styles/tokens.css'
import './styles/globals.css'
import './styles/animations.css'
```

Run:

```bash
npm test -- src/app/router.test.jsx
```

Expected: PASS. The production router is intentionally created in Task 3 together with the actual route pages.

- [ ] **Step 5: Commit**

```bash
git add src/app/AppShell.jsx src/components/TopNav.jsx src/styles src/app/router.test.jsx src/main.jsx
git commit -m "feat: add FIVEWAYS app shell and design tokens"
```

---

### Task 3: Build the action-first home page and all six routes

**Files:**
- Create: `src/components/WayCard.jsx`
- Create: `src/features/home/HomePage.jsx`
- Create: `src/features/home/HomePage.test.jsx`
- Create: `src/features/events/EventsPage.jsx`
- Create: `src/features/bus/BusPage.jsx`
- Create: `src/features/scholarships/ScholarshipsPage.jsx`
- Create: `src/features/campusCare/CampusCarePage.jsx`
- Create: `src/features/academics/AcademicsPage.jsx`
- Create: `src/app/router.jsx`
- Modify: `src/app/App.jsx`
- Modify: `src/styles/globals.css`

**Interfaces:**
- Consumes: `AppShell` and React Router.
- Produces: six working routes and `WayCard({ to, icon, title, question, accent })`.

- [ ] **Step 1: Write the failing home test**

Create `src/features/home/HomePage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'

test('renders the five action paths', () => {
  render(<MemoryRouter><HomePage /></MemoryRouter>)

  expect(screen.getByRole('heading', { name: /what do you need right now/i })).toBeInTheDocument()
  expect(screen.getByText('Find an Event')).toBeInTheDocument()
  expect(screen.getByText('Find My Bus')).toBeInTheDocument()
  expect(screen.getByText('Check Scholarships')).toBeInTheDocument()
  expect(screen.getByText('Report a Campus Issue')).toBeInTheDocument()
  expect(screen.getByText('Plan My Academics')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/features/home/HomePage.test.jsx
```

Expected: FAIL because `HomePage` does not exist.

- [ ] **Step 3: Implement WayCard and HomePage**

Create `src/components/WayCard.jsx`:

```jsx
import { Link } from 'react-router-dom'

export default function WayCard({ to, icon, title, question, accent }) {
  return (
    <Link className="way-card" to={to} style={{ '--way-accent': accent }}>
      <span className="way-card__icon" aria-hidden="true">{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{question}</p>
      </div>
      <span className="way-card__arrow" aria-hidden="true">→</span>
    </Link>
  )
}
```

Create `src/features/home/HomePage.jsx`:

```jsx
import WayCard from '../../components/WayCard'

const ways = [
  { to: '/events', icon: '🎪', title: 'Find an Event', question: 'What can I participate in?', accent: '#7c3aed' },
  { to: '/bus', icon: '🚌', title: 'Find My Bus', question: 'Which bus should I take now?', accent: '#2563eb' },
  { to: '/scholarships', icon: '🎓', title: 'Check Scholarships', question: 'What financial support may be available?', accent: '#059669' },
  { to: '/campus-care', icon: '🛠️', title: 'Report a Campus Issue', question: 'How do I get this fixed?', accent: '#ea580c' },
  { to: '/academics', icon: '📈', title: 'Plan My Academics', question: 'What should I aim for next?', accent: '#db2777' },
]

export default function HomePage() {
  return (
    <section className="home rise-in">
      <p className="eyebrow">FIVEWAYS · IFET Student Utility Hub</p>
      <h1>WHAT DO YOU NEED RIGHT NOW?</h1>
      <p className="home__intro">Five student problems. Five useful paths. One place to know what to do next.</p>
      <div className="way-grid">
        {ways.map((way) => <WayCard key={way.to} {...way} />)}
      </div>
    </section>
  )
}
```

Add shared home CSS to `src/styles/globals.css`:

```css
.eyebrow { color: var(--accent); font-weight: 750; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.78rem; }
.home h1 { max-width: 850px; font-size: clamp(2.6rem, 7vw, 5.8rem); line-height: 0.96; letter-spacing: -0.05em; margin: 0.5rem 0 1rem; }
.home__intro { max-width: 650px; color: var(--muted); font-size: 1.1rem; line-height: 1.7; }
.way-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-top: 2.25rem; }
.way-card { min-height: 170px; padding: 1.4rem; border: 1px solid var(--border); border-radius: var(--radius-lg); background: linear-gradient(145deg, var(--surface), color-mix(in srgb, var(--way-accent) 6%, white)); box-shadow: var(--shadow-card); display: grid; grid-template-columns: auto 1fr auto; gap: 1rem; align-items: start; transition: transform 180ms ease, box-shadow 180ms ease; }
.way-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(15, 23, 42, 0.11); }
.way-card__icon { font-size: 1.8rem; }
.way-card h2 { margin: 0; font-size: 1.35rem; }
.way-card p { margin: 0.5rem 0 0; color: var(--muted); }
.way-card__arrow { font-size: 1.4rem; color: var(--way-accent); }
@media (max-width: 760px) { .way-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Create route-safe feature pages and router**

Each placeholder page must have a unique heading and no feature logic. Example `src/features/events/EventsPage.jsx`:

```jsx
export default function EventsPage() {
  return <section><h1>Find an Event</h1><p>Discover opportunities relevant to you.</p></section>
}
```

Use the same pattern for the other feature routes with these headings:

```text
Find My Bus
Check Scholarships
Report a Campus Issue
Plan My Academics
```

Create `src/app/router.jsx`:

```jsx
import { createBrowserRouter } from 'react-router-dom'
import AppShell from './AppShell'
import HomePage from '../features/home/HomePage'
import EventsPage from '../features/events/EventsPage'
import BusPage from '../features/bus/BusPage'
import ScholarshipsPage from '../features/scholarships/ScholarshipsPage'
import CampusCarePage from '../features/campusCare/CampusCarePage'
import AcademicsPage from '../features/academics/AcademicsPage'

export const appRouter = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/events', element: <EventsPage /> },
      { path: '/bus', element: <BusPage /> },
      { path: '/scholarships', element: <ScholarshipsPage /> },
      { path: '/campus-care', element: <CampusCarePage /> },
      { path: '/academics', element: <AcademicsPage /> },
    ],
  },
])
```

Replace `src/app/App.jsx` with:

```jsx
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router'

export default function App() {
  return <RouterProvider router={appRouter} />
}
```

Run:

```bash
npm test -- src/features/home/HomePage.test.jsx src/app/router.test.jsx
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/WayCard.jsx src/features src/app/router.jsx src/app/App.jsx src/styles/globals.css
git commit -m "feat: add FIVEWAYS action hub and routes"
```

---

### Task 4: Add safe localStorage profile state

**Files:**
- Create: `src/hooks/useLocalStorage.js`
- Create: `src/hooks/useLocalStorage.test.jsx`
- Create: `src/state/StudentProfileContext.jsx`
- Modify: `src/app/App.jsx`

**Interfaces:**
- Produces: `useLocalStorage(key, initialValue)` and `useStudentProfile()`.
- Student profile shape: `{ name, department, year, preferredBusStop, scholarshipProfile, savedEventIds }`.

- [ ] **Step 1: Write the failing localStorage test**

Create `src/hooks/useLocalStorage.test.jsx`:

```jsx
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

test('persists updates as JSON', () => {
  localStorage.clear()
  const { result } = renderHook(() => useLocalStorage('fiveways-test', { year: 1 }))

  act(() => result.current[1]({ year: 3 }))

  expect(JSON.parse(localStorage.getItem('fiveways-test'))).toEqual({ year: 3 })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm test -- src/hooks/useLocalStorage.test.jsx
```

Expected: FAIL because the hook does not exist.

- [ ] **Step 3: Implement the hook and context**

Create `src/hooks/useLocalStorage.js`:

```js
import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      return
    }
  }, [key, value])

  return [value, setValue]
}
```

Create `src/state/StudentProfileContext.jsx`:

```jsx
import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const StudentProfileContext = createContext(null)

const initialProfile = {
  name: '',
  department: '',
  year: null,
  preferredBusStop: '',
  scholarshipProfile: {},
  savedEventIds: [],
}

export function StudentProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('fiveways-profile', initialProfile)
  return <StudentProfileContext.Provider value={{ profile, setProfile }}>{children}</StudentProfileContext.Provider>
}

export function useStudentProfile() {
  const value = useContext(StudentProfileContext)
  if (!value) throw new Error('useStudentProfile must be used within StudentProfileProvider')
  return value
}
```

Replace `src/app/App.jsx` with:

```jsx
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router'
import { StudentProfileProvider } from '../state/StudentProfileContext'

export default function App() {
  return (
    <StudentProfileProvider>
      <RouterProvider router={appRouter} />
    </StudentProfileProvider>
  )
}
```

- [ ] **Step 4: Run tests and build**

```bash
npm test
npm run build
```

Expected: PASS with no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/hooks src/state src/app/App.jsx
git commit -m "feat: add persistent student profile state"
```

---

## Completion Gate

Before starting Smart Bus:

```bash
npm test
npm run build
```

Manual checks:

- Home shows exactly five action cards.
- Every card navigates to its expected route.
- Browser refresh works on the development server.
- Layout has no horizontal overflow at 390px width.
- `fiveways-profile` is written to localStorage after profile state changes.
- No feature-specific logic has leaked into shared components.

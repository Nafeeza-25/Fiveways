# FIVEWAYS — IFET Student Utility Hub

**Five student problems. Five useful paths. One place to know what to do next.**

FIVEWAYS is a student-first React + Vite competition prototype built around one question:

> **WHAT DO YOU NEED RIGHT NOW?**

## 2026 competition UI redesign

The interface now uses a **Midnight Launch → Bright Workspace** visual system:

- **Tailwind CSS** for the styling system and responsive layouts.
- **shadcn/ui-style components** (`src/components/ui`) for Button, Card, Badge, Input, Progress and Tabs primitives.
- **Framer Motion** for route transitions, hero motion, scroll reveals, animated counters, hover movement and 3D-style tilt interactions.
- Purpose-first animated hero graphics on every feature page so the user can partially understand the feature before reading the copy.
- `prefers-reduced-motion` support for accessibility.

### Page visual language

- **Smart Bus** — electric blue road perspective, moving bus, route signal and traffic-light motion.
- **Scholarship Finder** — violet matching radar, floating profile/document/match objects and animated result strength.
- **Events** — orange ticket/calendar composition with floating event cards and confetti-like micro-motion.
- **Campus Care** — emerald Report → Track → Resolve node flow.
- **Academic Path** — cyan/indigo grade bars, credit×grade visual language and CGPA orbit/ring.

## Functional modules

1. **Events** — discover, filter and save opportunities.
2. **Smart Bus** ⭐ — compare simulated arrivals and choose the best bus.
3. **Scholarship Finder** ⭐ — get explainable, non-authoritative scholarship matches.
4. **Campus Care** — Report → Track → Resolve routine campus issues using demo tickets.
5. **Academic Path** — calculate credit-weighted SGPA/CGPA from admin-managed curriculum data, then use the original target-CGPA and what-if planner underneath.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints, normally `http://localhost:5173`.

## Verify

```bash
npm test
npm run build
```

Dependency-free checks included in the repository:

```bash
npm run verify:logic
npm run verify:redesign
node --test src/features/academics/*.node.test.mjs src/features/bus/*.node.test.mjs src/features/scholarships/*.node.test.mjs src/app/*.node.test.mjs
```

## Competition assumptions

- **Smart Bus timing/position data is simulated for the competition prototype.** It is never presented as official IFET GPS/ETA data.
- **Scholarship matches are guidance only and do not determine official eligibility.** The UI uses wording such as “You may be eligible”, “Strong match”, and “Worth checking”.
- **Academic Path main calculator is credit-weighted**: students select only letter grades while subject credits come from the admin-managed curriculum dataset. The lower Target CGPA / What If? planner remains a quick equal-semester-weight estimate.
- **Campus Care is a prototype tracking layer** for everyday issues and does not replace the official college grievance process.
- Event entries without verified registration links intentionally do not render fake/dead registration CTAs.

Additional source/positioning notes are documented in `docs/ifet-data-pack.md`.

## Judge demo

1. **Home** — let the animated bento grid establish the five Ways visually.
2. **Smart Bus** — choose **Cuddalore** and show Bus 18 recommended at ~4 min, animated route progress, signal motion and Bus 21 fallback.
3. **Scholarship Finder** — complete the short profile wizard and show explainable matches, match strength and missing documents.
4. **Events** — search `web`, show WebCraft 2026, filter and bookmark it.
5. **Campus Care** — submit Electrical / `CSE Block, Room 204` / `Fan not working`, then show ticket `FW-2048` moving through Report → Track → Resolve.
6. **Academic Path** — choose Regulation 2023 → CSE → semester, select only grades, show animated SGPA/CGPA, then scroll to the preserved Target CGPA / What If? planner.
7. **Return Home** — close with: “Five student problems. Five useful paths. One place to know what to do next.”

## Project structure

```text
src/
├── app/                  app shell + animated route transitions
├── components/
│   ├── feature-visuals/  page-purpose animated graphics
│   ├── motion/           tilt, reveal, animated numbers
│   └── ui/               shadcn/ui-style primitives
├── data/                 deterministic local prototype data
├── features/             five student utility modules + home
├── hooks/                localStorage helper
├── lib/                  Tailwind class utilities
├── state/                lightweight student profile context
└── styles/               Tailwind entry + minimal motion fallbacks
```

## Routes

```text
/                     Home
/events               Events
/bus                  Smart Bus
/scholarships         Scholarship Finder
/campus-care          Campus Care
/academics            Academic Path
```

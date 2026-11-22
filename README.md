# FIVEWAYS — IFET Student Utility Hub

*Five student problems. Five useful paths. One place to know what to do next.*

**Live Deployment:** [https://fiveways-nine.vercel.app](https://fiveways-nine.vercel.app)

FIVEWAYS is a student-first React + Vite competition prototype built around one question:
*WHAT DO YOU NEED RIGHT NOW?*

## Live Demo

- **Deployed App:** [fiveways-nine.vercel.app](https://fiveways-nine.vercel.app)

## 2026 competition UI redesign

The interface now uses a *Midnight Launch → Bright Workspace* visual system:
- *Tailwind CSS* for the styling system and responsive layouts.
- *shadcn/ui-style components* (`src/components/ui`) for Button, Card, Badge, Input, Progress and Tabs primitives.
- *Framer Motion* for route transitions, hero motion, scroll reveals, animated counters, hover movement and 3D-style tilt interactions.
- Purpose-first animated hero graphics on every feature page so the user can partially understand the feature before reading the copy.
- `prefers-reduced-motion` support for accessibility.

## Page visual language

- *Smart Bus* — electric blue road perspective, moving bus, route signal and traffic-light motion.
- *Scholarship Finder* — violet matching radar, floating profile/document/match objects and animated result strength.
- *Events* — orange ticket/calendar composition with floating event cards and confetti-like micro-motion.
- *Campus Care* — emerald Report → Track → Resolve node flow.
- *Academic Path* — cyan/indigo grade bars, credit×grade visual language and CGPA orbit/ring.

## Functional modules

1. *Events* — discover, filter and save opportunities.
2. *Smart Bus* ⭐ — compare simulated arrivals and choose the best bus.
3. *Scholarship Finder* ⭐ — get explainable, non-authoritative scholarship matches.
4. *Campus Care* — Report → Track → Resolve routine campus issues using demo tickets.
5. *Academic Path* — calculate credit-weighted SGPA/CGPA from admin-managed curriculum data, then use the original target-CGPA and what-if planner underneath.

## Run locally

```bash
npm install
npm run dev

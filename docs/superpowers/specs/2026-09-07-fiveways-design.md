# FIVEWAYS — Competition Prototype Design Specification

**Date:** 2026-09-07  
**Project:** FIVEWAYS — IFET Student Utility Hub  
**Target:** WebCraft 2026 competition prototype  
**Primary stack:** React + Vite  
**Design direction:** Modern premium student app  

---

## 1. Product Summary

FIVEWAYS is a student-first utility web application for IFET students. Instead of behaving like a general college portal, it starts from a student's immediate need and directs them toward a useful next action.

The central interaction is:

> **WHAT DO YOU NEED RIGHT NOW?**

The student chooses one of five Ways:

1. **Events** — Find something to participate in.
2. **Smart Bus** — Decide which college bus to take.
3. **Scholarship Finder** — Discover financial support worth checking.
4. **Campus Care** — Report and track a campus issue.
5. **Academic Path** — Plan toward an academic target.

The competition prototype uses an **action-first hub** rather than a traditional dashboard.

---

## 2. Competition Strategy

The prototype will show all five Ways, but only two will be implemented as deep flagship experiences:

- **Smart Bus** — visual / interaction flagship.
- **Scholarship Finder** — logic / personalization flagship.

The other three Ways will be polished and functional, but deliberately narrower:

- Events: browse, search/filter, save, and open registration link.
- Campus Care: report an issue and view a ticket-status flow.
- Academic Path: calculate target-focused academic scenarios.

This keeps the project achievable for a solo participant while still communicating a complete platform vision.

---

## 3. Goals

### 3.1 Primary goals

- Make the concept understandable within 5–10 seconds.
- Demonstrate clear usefulness for real student situations.
- Provide two memorable interactive demo moments.
- Keep all judge-critical flows reliable without external APIs.
- Maintain a consistent premium UI across all five modules.
- Make the app responsive enough for both laptop and mobile viewing.

### 3.2 Success criteria

A judge should be able to:

1. Understand FIVEWAYS from the home screen without explanation.
2. Search a bus stop and receive a recommended bus.
3. Complete a short scholarship profile and receive explainable matches.
4. Open the remaining three Ways and see credible working interactions.
5. Return to the home screen with a clear understanding of the overall value proposition.

---

## 4. Non-Goals / Explicit Scope Exclusions

The competition version will **not** attempt to become a replacement for official IFET systems.

Specifically:

- No real-time GPS integration.
- No claim that simulated bus positions are live college data.
- No authoritative scholarship eligibility decision.
- No full scholarship application workflow.
- No student authentication system unless later required.
- No document-storage portal.
- No full examination/results portal.
- No replacement for IFET's grievance system.
- No payment, fee, attendance, timetable, or ERP functionality.

The prototype is a student utility layer focused on discovery, decision support, and clear next actions.

---

## 5. Information Architecture

```text
FIVEWAYS
│
├── /                     Home — WHAT DO YOU NEED RIGHT NOW?
│
├── /events               🎪 Find an Event
│
├── /bus                  🚌 Find My Bus ⭐ FLAGSHIP
│
├── /scholarships         🎓 Check Scholarships ⭐ FLAGSHIP
│
├── /campus-care          🛠️ Report a Campus Issue
│
└── /academics            📈 Plan My Academics
```

Each route shares the same application shell, navigation, spacing system, typography, buttons, badges, and responsive behavior.

---

## 6. Home Experience

### 6.1 Purpose

The home screen is a decision screen, not a dashboard.

### 6.2 Core copy

**FIVEWAYS**  
*Five student problems. Five useful paths. One place to know what to do next.*

Primary heading:

> **WHAT DO YOU NEED RIGHT NOW?**

### 6.3 Five action cards

Each card uses a problem-oriented label and short question:

- **Find an Event** — What can I participate in?
- **Find My Bus** — Which bus should I take now?
- **Check Scholarships** — What financial support may be available?
- **Report a Campus Issue** — How do I get this fixed?
- **Plan My Academics** — What should I aim for next?

### 6.4 Interaction

- Entire card is clickable.
- Hover/press states are subtle and fast.
- Cards may have a small accent treatment specific to each Way.
- Avoid dense dashboard metrics on the home screen.

---

## 7. Flagship Module: Smart Bus

### 7.1 User question

> **Which college bus should I take right now?**

### 7.2 Prototype constraint

All movement and timing data is simulated unless real verified data is later supplied.

A visible badge must state:

> **Simulated Live Demo**

### 7.3 Main flow

1. Student opens `/bus`.
2. Page asks: **Where are you travelling from?**
3. Student searches or selects a stop, e.g. **Cuddalore**.
4. The system compares matching buses.
5. A recommendation panel appears.
6. Student can inspect route details / stop sequence.

### 7.4 Demo scenario

For the default competition demo:

- Bus 12 — Already crossed stop.
- Bus 18 — Approaching, ~4 min.
- Bus 21 — Next, ~11 min.
- Recommendation — **Take Bus 18**.

### 7.5 UI elements

- Stop search / autocomplete.
- Recommended-bus hero panel.
- ETA / status badge.
- Bus comparison cards.
- Route timeline.
- Animated bus marker.
- Expandable stop list.
- Simulated-data disclosure.

### 7.6 Recommendation logic

Each mock bus record includes:

```ts
{
  id,
  number,
  routeName,
  stops,
  currentSegment,
  status,
  etaMinutes
}
```

For a selected stop:

- Exclude or downgrade buses that have already crossed the stop.
- Sort remaining buses by positive ETA.
- Recommend the lowest ETA.
- If no bus is upcoming, display a clear empty state.

### 7.7 Animation

The animation is visual-only and must not imply actual GPS tracking.

Recommended approach:

- Use CSS transform / percentage progress.
- Update position on a controlled demo interval.
- Keep animation deterministic enough for presentation.

---

## 8. Flagship Module: Scholarship Finder

### 8.1 User question

> **Which scholarships should I check, and what should I do next?**

### 8.2 Language requirement

The application must not claim final eligibility.

Preferred wording:

- **You may be eligible**
- **Worth checking**
- **Strong match**
- **Based on the information provided**

Avoid:

- **You are eligible**
- **Guaranteed**

### 8.3 Main flow

The finder is a short guided wizard rather than one long form.

Suggested steps:

1. **About you** — Department, year.
2. **Education background** — Government-school background, first-generation status.
3. **Eligibility details** — Income range, category/community where applicable.
4. **Documents** — Mark selected documents as available / missing for demo purposes.

After submission, show matched opportunities.

### 8.4 Scholarship result card

Each result displays:

- Scholarship name.
- Match strength.
- Why it matched.
- Important condition(s).
- Required documents.
- Missing documents.
- Deadline if present in dataset.
- Official application destination if present in dataset.
- College contact / next step if present in dataset.

### 8.5 Match model

Local scholarship data can use this shape:

```ts
{
  id,
  name,
  description,
  rules,
  requiredDocuments,
  deadline,
  officialUrl,
  contact
}
```

The student profile can use:

```ts
{
  department,
  year,
  incomeRange,
  category,
  firstGeneration,
  governmentSchool,
  documents
}
```

The matching layer returns:

```ts
{
  scholarshipId,
  score,
  matchedReasons,
  unmetConditions,
  missingDocuments
}
```

### 8.6 Explainability

Every match must explain **why** it appeared.

The system must prefer a transparent rules-based matcher over an opaque AI label for the competition prototype.

---

## 9. Events

### 9.1 User question

> **What can I participate in?**

### 9.2 Features

- Event cards.
- Search.
- Filter chips such as department / category / year.
- Date and deadline.
- Venue.
- Eligibility summary.
- Save/bookmark using local state / localStorage.
- Official registration link button where available.

### 9.3 Data

Use local mock data unless organizers provide an official dataset.

---

## 10. Campus Care

### 10.1 Positioning

Campus Care does not replace the official grievance process.

Its prototype value proposition is:

> **Report → Track → Resolve**

For serious or formal matters, the UI should direct students toward the appropriate official college system rather than implying FIVEWAYS is the authority.

### 10.2 Flow

1. Select issue category.
2. Select / enter location.
3. Add optional description.
4. Add optional image in UI if desired.
5. Submit.
6. Generate a demo ticket ID.
7. Display ticket-status tracker.

### 10.3 Status model

```text
Submitted → Assigned → In Progress → Resolved
```

### 10.4 Persistence

Competition-safe default:

- localStorage for submitted ticket demo data.

Optional enhancement after core completion:

- Supabase backend for real persistence.

Backend failure must never break the rest of the app.

---

## 11. Academic Path

### 11.1 Positioning

Academic Path is **not** a complete academic portal or replacement for the official Controller of Examinations area.

Its single purpose is:

> **What should I aim for next?**

### 11.2 Features

- Current CGPA input.
- Target CGPA input.
- Completed semester / credit information as required by the selected calculation model.
- Required future SGPA estimate.
- What-if future semester GPA inputs.
- Projected CGPA output.

### 11.3 Accuracy constraint

The final competition build must clearly state the assumptions used by the calculator.

If exact IFET credit-weighting / regulation rules are not available, the prototype must label the result as an estimate rather than implying official academic accuracy.

---

## 12. Shared Student Profile

A lightweight profile may hold:

```ts
{
  name?: string,
  department?: string,
  year?: number,
  preferredBusStop?: string,
  scholarshipProfile?: {...},
  savedEventIds?: string[]
}
```

This is application state, not a full account system.

Persistence can use localStorage.

---

## 13. React Application Architecture

### 13.1 Suggested source structure

```text
src/
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── AppShell.jsx
│
├── components/
│   ├── TopNav.jsx
│   ├── WayCard.jsx
│   ├── SectionHeader.jsx
│   ├── SearchInput.jsx
│   ├── FilterChips.jsx
│   ├── StatusBadge.jsx
│   ├── Button.jsx
│   ├── EmptyState.jsx
│   └── Modal.jsx
│
├── features/
│   ├── events/
│   ├── bus/
│   ├── scholarships/
│   ├── campusCare/
│   └── academics/
│
├── data/
│   ├── events.js
│   ├── buses.js
│   └── scholarships.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── state/
│   └── StudentProfileContext.jsx
│
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   └── animations.css
│
└── main.jsx
```

### 13.2 Feature isolation

Each feature should own:

- its page,
- feature-specific components,
- feature-specific logic,
- tests for its pure logic.

Shared components should contain presentation primitives only.

This prevents the five modules from becoming one large coupled component tree.

---

## 14. Visual System

### 14.1 Direction

Modern premium student app.

### 14.2 Principles

- Light neutral background.
- Clear hierarchy.
- Large, confident headings.
- Generous spacing.
- Rounded cards.
- Restrained shadows.
- Subtle gradients.
- Consistent icon treatment.
- Small accent distinction for each Way.
- Minimal visual clutter.

### 14.3 Motion

Use motion only when it communicates state or improves the demo.

Good uses:

- Card hover/press.
- Page transition / content entrance.
- Bus marker movement.
- Scholarship result reveal.
- Ticket status transition.

Avoid:

- Constant decorative animation.
- Heavy parallax.
- Slow transitions.
- Excessive glassmorphism.

### 14.4 Responsive behavior

Primary target: laptop presentation.

Also support:

- Tablet.
- Mobile viewport.

The home cards may shift from multi-column to single-column layouts.

---

## 15. Data Strategy

### 15.1 Demo-critical data

Must be local and deterministic:

- Bus routes and ETAs.
- Scholarship rules.
- Event cards.

### 15.2 Optional backend

Only add a backend after all flagship flows work reliably.

Recommended optional use:

- Campus Care submissions.

The application should still function if the backend is unavailable.

---

## 16. Error and Empty States

### Smart Bus

- Unknown stop → show suggested stops.
- No upcoming buses → explain that no upcoming demo route is available.
- Invalid mock data → do not crash page; show fallback card.

### Scholarships

- Incomplete profile → identify missing fields.
- No matches → show guidance rather than an empty page.
- Missing deadline / URL → omit field instead of fabricating data.

### Events

- No filter results → clear filters CTA.

### Campus Care

- Required issue fields missing → inline validation.
- Optional backend unavailable → store locally / show demo-safe state.

### Academics

- Invalid numeric input → inline validation.
- Impossible target → explain that the target cannot be reached under current assumptions.

---

## 17. Testing Strategy

### 17.1 Priority tests

Pure logic should be tested first:

- Bus recommendation selection.
- Bus sorting by ETA / crossed state.
- Scholarship rule matching.
- Scholarship missing-document detection.
- Academic target calculations.

### 17.2 Component smoke tests

At minimum:

- Home renders five Ways.
- Clicking each Way opens its route.
- Bus search produces recommendation.
- Scholarship wizard produces result state.
- Campus Care form produces ticket state.
- Event filters update results.

### 17.3 Manual demo checklist

Before presentation:

- App loads from a fresh browser.
- All five routes work.
- Flagship flows work without network.
- Mobile layout does not overflow.
- No console errors in judge journey.
- Simulated bus label is visible.
- Scholarship language does not promise eligibility.
- Academic calculation displays assumptions.

---

## 18. Judge Demo Flow

Recommended demo length: approximately 2–3 minutes.

### Step 1 — Value proposition

Open home screen.

Explain:

> Students often know what problem they have, but not where to go or what to do next. FIVEWAYS gives them five direct paths.

### Step 2 — Smart Bus wow moment

- Open **Find My Bus**.
- Search **Cuddalore**.
- Show Bus 18 recommended.
- Point out route progress / animated marker.
- Mention clearly that live movement is simulated for the prototype.

### Step 3 — Scholarship logic wow moment

- Open **Check Scholarships**.
- Use preselected / quick-fill demo profile.
- Show matched opportunities.
- Open one result.
- Point out **why it matched** and **missing document** detection.

### Step 4 — Breadth

Quickly show:

- Events filter.
- Campus Care ticket tracker.
- Academic target what-if.

### Step 5 — Close

Return home and reinforce:

> **Five student problems. Five useful paths. One place to know what to do next.**

---

## 19. Build Order

Implementation should proceed in this order:

1. Vite project + routing + global styles.
2. Shared app shell and design tokens.
3. Home action hub.
4. Smart Bus data + recommendation logic + UI.
5. Scholarship data + matching logic + wizard + results.
6. Events.
7. Campus Care.
8. Academic Path.
9. Local persistence.
10. Responsive polish and animations.
11. Optional backend only if time remains.

---

## 20. Final Product Principle

Every FIVEWAYS screen should answer two questions:

1. **What is happening / what applies to me?**
2. **What should I do next?**

If a feature does not improve one of those answers, it should not be added to the competition prototype.

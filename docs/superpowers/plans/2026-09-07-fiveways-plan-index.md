# FIVEWAYS Implementation Plan Index

**Spec:** `docs/superpowers/specs/2026-09-07-fiveways-design.md`

Execute the plans in this order:

1. `2026-09-07-fiveways-foundation-home.md` — Vite setup, tests, shared shell, action-first home, routing, profile state.
2. `2026-09-07-fiveways-smart-bus.md` — flagship bus logic, recommendation UI, simulated route visualization.
3. `2026-09-07-fiveways-scholarship-finder.md` — flagship guided wizard, transparent matcher, explainable results.
4. `2026-09-07-fiveways-events.md` — local event discovery, filters, bookmarks.
5. `2026-09-07-fiveways-campus-care.md` — Report → Track → Resolve ticket flow.
6. `2026-09-07-fiveways-academic-path.md` — target SGPA estimate and what-if CGPA projection.
7. `2026-09-07-fiveways-integration-polish.md` — shared primitives, route smoke checks, responsive polish, README, final offline demo verification.

## Review checkpoints

After plans 1, 2, and 3, run the full test suite and production build before continuing. After plans 4–6, verify each supporting Way independently. Plan 7 is the final integration gate and must not add new product scope.

## Scope protection

Do not add authentication, document storage, real GPS, a full academic portal, or an authoritative grievance/scholarship workflow during this implementation sequence. Optional backend work is excluded until the competition-critical build is complete and verified.

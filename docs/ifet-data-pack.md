# FIVEWAYS — IFET Source Data Pack

Prepared for the WebCraft competition prototype. This document separates current IFET facts from prototype-only simulated data so the demo stays credible.

## Transport

Official source: https://ifet.ac.in/transport/

Verified current facts:
- IFET says the college provides 30 buses from various cities.
- The campus is on the Pondicherry–Villupuram National Highway (NH45A).
- The official transport page does not publish a complete stop-by-stop route/ETA dataset.

Prototype rule:
- Bus numbers, stops, ETAs, and moving positions used in FIVEWAYS must be labelled **Simulated Live Demo** unless the team obtains an official route list from the college.
- Avoid presenting invented route timings as official IFET data.

## Scholarships

Primary official source: https://ifet.ac.in/scholarship-policy/

Verified current facts:
- IFET has a scholarship policy focused on disseminating government and non-government scholarship information.
- The policy says the college provides student guidance through a designated Liaison Officer.
- The policy lists prominent schemes including First Generation Graduate, 7.5% Government School Students, BC/MBC, SC/ST, minority, Pudhumai Penn, Tamil Pudhalvan, Pragati and Swanath, among others.
- Scholarship results in FIVEWAYS should use cautious wording such as **You may be eligible** and should direct students to official sources for final eligibility.
- FIVEWAYS models only rules supported by the profile fields it actually collects; other IFET-listed schemes appear as discovery items instead of receiving fabricated match scores.

Data-quality note:
- The separate `/scholarships/` page currently appears to contain generic placeholder content referring to “Unipix University.” Do not use that page as the source for prototype scholarship rules.
- Use the scholarship-policy page and any official scheme portals/circulars instead.

## Campus Care / Grievances

Official source: https://ifet.ac.in/grievances/

Verified current facts:
- IFET already provides an online grievance mechanism.
- FIVEWAYS should not claim to replace the official grievance system.

Prototype positioning:
- FIVEWAYS differentiates through a simple student UX: **Report → Track → Resolve**.
- Routine facilities issues can be demonstrated as structured mock tickets.
- Serious grievances, harassment, ragging, or formal complaints should redirect to the appropriate official college channel.

Additional support source: https://ifet.ac.in/student-support-cells/

## Events

Official source: https://ifet.ac.in/

Verified current facts:
- The IFET homepage publishes event highlights and upcoming/recent events.
- Examples visible in 2026 include alumni, guest lectures, department activities, innovation/entrepreneurship events, annual day, sports day, and technical programmes.

Prototype rule:
- The Events module can use real published event categories and clearly marked demo entries.
- Do not invent official registration deadlines or eligibility rules for real events unless sourced.

## Academic Path

Official contextual sources:
- https://ifet.ac.in/coe/
- https://ifet.ac.in/wp-content/uploads/2024/08/COE-Manual-Version-3.0.pdf

Verified calculation facts from the COE Manual:
- Non-credit mandatory courses are not counted for GPA/CGPA.
- Credit point = course credit × grade point.
- GPA uses total credit points divided by the total registered credits in the semester.
- CGPA uses cumulative credit points divided by cumulative course credits.
- The published grade-point scale is **O=10, A+=9, A=8, B+=7, B=6, C=5, U=0**; SA/UA/WD do not carry numerical grade points.

Positioning:
- FIVEWAYS Academic Path is a planning/calculation helper, not a replacement for IFET Controller of Examinations systems.
- The main calculator loads admin-managed curriculum credits and asks the student only for letter grades.
- The existing Target CGPA / What If? planner remains underneath as a separate planning estimate.
- The competition curriculum currently includes only semesters supported by supplied academic documents; do not invent missing subject-credit tables.

## Competition-safe copy rules

Use:
- “Simulated Live Demo” for bus movement/ETA.
- “You may be eligible” for scholarship matches.
- “Check official eligibility” for financial-aid results.
- “Demo ticket” for Campus Care prototype tracking.

Avoid:
- “Live GPS” unless actual GPS integration exists.
- “Official IFET bus ETA” for simulated data.
- “You are eligible” unless the official scheme rules have been fully evaluated.
- “FIVEWAYS grievance portal” for serious/formal grievances.

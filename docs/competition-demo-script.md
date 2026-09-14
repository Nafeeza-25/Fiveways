# FIVEWAYS — 2–3 Minute Competition Demo Script

## Opening — 15 seconds

**Say:**

> Students do not usually have one big problem. They have five small problems every day: finding opportunities, catching transport, finding financial support, reporting campus issues, and understanding academics. FIVEWAYS starts with one question: **What do you need right now?**

On the home page, point to the five Ways. Mention that **Smart Bus** and **Scholarship Finder** are the two flagship demo flows.

## 1. Smart Bus — 30–40 seconds

1. Open **Find My Bus**.
2. Choose **Cuddalore** or use the prepared Cuddalore demo button.
3. Point to **Bus 18 · ~4 min** as the recommendation.
4. Point out that Bus 12 has already crossed and Bus 21 is the fallback.
5. Show the route progress line and the **Simulated Live Demo** label.

**Say:**

> Instead of only listing routes, FIVEWAYS answers the student's real question: which bus should I take now? The timing and movement here are clearly simulated for the prototype, so we are not pretending to have official GPS data.

## 2. Scholarship Finder — 40–50 seconds

Use this prepared profile:

- Department: **CSE**
- Year: **3**
- Government-school background: **Yes**
- First-generation student: **Yes**
- Income range: **Below ₹2.5 lakh**
- Category: **BC**
- Documents available: **Aadhaar**, **Bonafide Certificate**

Show the results:

- rules-based matches explain **why** they appeared;
- missing documents are highlighted;
- other IFET-listed schemes appear separately as discovery items where the prototype does not have enough information to model the full official rules.

**Say:**

> FIVEWAYS never says "you are eligible." It says "you may be eligible" and explains why the opportunity is worth checking. Scheme names are grounded in IFET's scholarship policy, while final eligibility stays with the official scheme and college support office.

## 3. Events + Campus Care — 25 seconds

### Events
Search **web**, open the WebCraft entry, and save it.

**Say:**

> Events brings opportunities that are otherwise scattered across messages, forms, and notices into one searchable place.

### Campus Care
Submit:

- Category: **Electrical**
- Location: **CSE Block, Room 204**
- Description: **Fan not working**

Show demo ticket **FW-2048** and advance its status.

**Say:**

> Campus Care is not replacing IFET's formal grievance system. It makes routine facilities issues easier to report and track: Report → Track → Resolve.

## 4. Academic Path — 35–45 seconds

1. Open **Plan My Academics**.
2. Choose **Regulation 2023 → CSE → Semester 1**.
3. Enter the prepared grade-sheet example:
   - Professional English — A
   - Calculus and its Applications — A+
   - Chemistry for Information Science — A
   - Problem Solving using C Programming — B+
   - Chemistry Laboratory — O
   - C Programming Laboratory — A
   - Product Development Lab I — A+
   - Heritage of Tamils — A
4. Show **18 credits → 149 grade points → GPA 8.28**.
5. Save the semester and point to cumulative CGPA.
6. Scroll down to the existing **Target CGPA / What If?** planner.

**Say:**

> The student never enters credits manually. Subjects and credits come from the admin-maintained curriculum. The grade-point scale follows IFET's COE guidance, and the calculator uses credit-weighted GPA and CGPA rather than a simple average.

## Closing — 10 seconds

Return to Home.

**Say:**

> FIVEWAYS is not another college dashboard. It is a decision layer for student life: **five student problems, five useful paths, one place to know what to do next.**

## Demo recovery notes

- If Smart Bus is blank, click **Try Cuddalore demo**.
- If scholarship results show an old profile, click **Edit profile** and enter the prepared values above.
- If Academic Path contains saved data from a previous rehearsal, use **Reset grades** for the active semester. Saved semester results are kept in browser localStorage for the prototype.
- If internet is unavailable during judging, the core demo still works because bus data, scholarship matching, events, academic curriculum, and ticket state are local prototype data.

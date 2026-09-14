function validNumber(value, min = 0, max = 10) {
  const number = Number(value)
  return Number.isFinite(number) && number >= min && number <= max ? number : null
}

export function requiredAverageSgpa({ currentCgpa, completedSemesters, targetCgpa, futureSemesters }) {
  const current = validNumber(currentCgpa)
  const target = validNumber(targetCgpa)
  const completed = Number(completedSemesters)
  const future = Number(futureSemesters)
  if (current === null || target === null || !Number.isInteger(completed) || !Number.isInteger(future) || completed < 1 || future < 1) return null
  const currentPoints = current * completed
  const targetPoints = target * (completed + future)
  const required = (targetPoints - currentPoints) / future
  if (!Number.isFinite(required) || required < 0 || required > 10) return null
  return required
}

export function projectCgpa({ currentCgpa, completedSemesters, futureSgpas }) {
  const current = validNumber(currentCgpa)
  const completed = Number(completedSemesters)
  const parsedFuture = futureSgpas.map((value) => validNumber(value))
  if (current === null || !Number.isInteger(completed) || completed < 1 || parsedFuture.some((value) => value === null) || parsedFuture.length === 0) return null
  const currentPoints = current * completed
  const futurePoints = parsedFuture.reduce((sum, sgpa) => sum + sgpa, 0)
  return (currentPoints + futurePoints) / (completed + parsedFuture.length)
}

export const DEFAULT_GRADE_POINTS = Object.freeze({
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  U: 0,
})

export function calculateSemesterResult({ courses, gradesByCode, gradePoints = DEFAULT_GRADE_POINTS }) {
  if (!Array.isArray(courses) || courses.length === 0 || !gradesByCode) return null

  let creditsRegistered = 0
  let creditsEarned = 0
  let gradePointsEarned = 0

  for (const course of courses) {
    const credits = Number(course.credits)
    if (!Number.isFinite(credits) || credits < 0) return null
    if (credits === 0) continue

    const grade = gradesByCode[course.code]
    const point = gradePoints[grade]
    if (point === undefined) return null
    creditsRegistered += credits
    if (point > 0) creditsEarned += credits
    gradePointsEarned += credits * point
  }

  if (creditsRegistered <= 0) return null
  return {
    creditsRegistered,
    creditsEarned,
    gradePointsEarned,
    sgpa: gradePointsEarned / creditsRegistered,
  }
}

export function calculateCgpa(semesterResults) {
  if (!Array.isArray(semesterResults) || semesterResults.length === 0) return null
  const totals = semesterResults.reduce((acc, result) => {
    const credits = Number(result?.creditsRegistered ?? result?.creditsEarned)
    const points = Number(result?.gradePointsEarned)
    if (!Number.isFinite(credits) || !Number.isFinite(points) || credits < 0 || points < 0) {
      acc.invalid = true
      return acc
    }
    acc.credits += credits
    acc.points += points
    return acc
  }, { credits: 0, points: 0, invalid: false })

  if (totals.invalid || totals.credits <= 0) return null
  return totals.points / totals.credits
}

export function upsertSemesterResult(savedResults, nextResult) {
  const items = Array.isArray(savedResults) ? savedResults : []
  const keyMatches = (item) => (
    item.regulation === nextResult.regulation
    && item.department === nextResult.department
    && Number(item.semester) === Number(nextResult.semester)
  )
  const existingIndex = items.findIndex(keyMatches)
  if (existingIndex === -1) return [...items, nextResult]
  return items.map((item, index) => (index === existingIndex ? nextResult : item))
}

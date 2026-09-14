import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('semester calculator is the main academic tool and target planner remains underneath', async () => {
  const source = await readFile(new URL('./AcademicsPage.jsx', import.meta.url), 'utf8')
  assert.match(source, /SemesterGradeCalculator/)
  const semesterIndex = source.indexOf('<SemesterGradeCalculator')
  const plannerIndex = source.indexOf('<AcademicPlanner')
  assert.ok(semesterIndex >= 0, 'semester calculator must render')
  assert.ok(plannerIndex > semesterIndex, 'existing target planner must render underneath the semester calculator')
})

import assert from 'node:assert/strict'
import { buses } from '../src/data/buses.js'
import { getAvailableStops, getBusesForStop, recommendBus } from '../src/features/bus/busLogic.js'
import { scholarships } from '../src/data/scholarships.js'
import { matchScholarships } from '../src/features/scholarships/scholarshipLogic.js'
import { events } from '../src/data/events.js'
import { filterEvents } from '../src/features/events/eventLogic.js'
import { validateIssue, createDemoTicket } from '../src/features/campusCare/campusCareLogic.js'
import { calculateCgpa, calculateSemesterResult, requiredAverageSgpa, projectCgpa } from '../src/features/academics/academicLogic.js'
import { getCourses } from '../src/data/curriculum.js'

assert(getAvailableStops(buses).includes('Cuddalore'))
const { recommended, ordered } = recommendBus(getBusesForStop(buses, 'Cuddalore'))
assert.equal(recommended.number, '18')
assert.equal(recommended.etaMinutes, 4)
assert.deepEqual(ordered.map((bus) => bus.number), ['18', '21', '12'])

const matches = matchScholarships({
  department: 'CSE', year: 3, incomeRange: 'under-250000', category: 'BC',
  firstGeneration: true, governmentSchool: true,
  documents: ['Aadhaar', 'Bonafide Certificate'],
}, scholarships)
assert(matches.length >= 3)
assert(matches.find((match) => match.scholarshipId === 'first-generation').missingDocuments.includes('Income Certificate'))

assert.deepEqual(filterEvents(events, { query: 'web', category: 'Competition' }).map((event) => event.id), ['webcraft-2026'])
assert.equal(filterEvents(events, { query: '', category: 'All' }).length, events.length)

assert.deepEqual(validateIssue({ category: '', location: '', description: '' }), {
  category: 'Choose an issue category.',
  location: 'Enter the issue location.',
})
assert.equal(createDemoTicket({ category: 'Electrical', location: 'CSE Block, Room 204', description: 'Fan not working' }, 2048).id, 'FW-2048')


const semesterOne = calculateSemesterResult({
  courses: getCourses('2023', 'CSE', 1),
  gradesByCode: {
    '23EN1101': 'A', '23MA1201': 'A+', '23CH1201': 'A', '23CS1301': 'B+',
    '23CH1L01': 'O', '23CS1L01': 'A', '23PL1001': 'A+', '23GE1T01': 'A',
  },
})
assert.equal(semesterOne.creditsRegistered, 18)
assert.equal(semesterOne.gradePointsEarned, 149)
assert.equal(Number(semesterOne.sgpa.toFixed(2)), 8.28)
assert.equal(Number(calculateCgpa([
  semesterOne,
  { creditsEarned: 21, gradePointsEarned: 176 },
]).toFixed(2)), 8.33)

assert(Math.abs(requiredAverageSgpa({ currentCgpa: 8.14, completedSemesters: 4, targetCgpa: 8.5, futureSemesters: 4 }) - 8.86) < 0.001)
assert(Math.abs(projectCgpa({ currentCgpa: 8.14, completedSemesters: 4, futureSgpas: [8.7, 9.0] }) - 8.3766666667) < 0.0001)
assert.equal(requiredAverageSgpa({ currentCgpa: 6, completedSemesters: 6, targetCgpa: 9.5, futureSemesters: 2 }), null)

console.log('FIVEWAYS logic verification passed: bus, scholarships, events, campus care, academics.')

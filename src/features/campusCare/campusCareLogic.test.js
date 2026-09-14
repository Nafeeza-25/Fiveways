import { expect, test } from 'vitest'
import { createDemoTicket, validateIssue } from './campusCareLogic'

test('requires category and location', () => {
  expect(validateIssue({ category: '', location: '', description: '' })).toEqual({ category: 'Choose an issue category.', location: 'Enter the issue location.' })
})

test('creates a submitted demo ticket', () => {
  const ticket = createDemoTicket({ category: 'Electrical', location: 'CSE Block, Room 204', description: 'Fan not working' }, 2048)
  expect(ticket.id).toBe('FW-2048')
  expect(ticket.status).toBe('Submitted')
})

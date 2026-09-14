import { expect, test } from 'vitest'
import { events } from '../../data/events'
import { filterEvents } from './eventLogic'

test('filters by search text and category', () => {
  const result = filterEvents(events, { query: 'web', category: 'Competition' })
  expect(result.map((event) => event.id)).toEqual(['webcraft-2026'])
})

test('returns all events when filters are empty', () => {
  expect(filterEvents(events, { query: '', category: 'All' })).toHaveLength(events.length)
})

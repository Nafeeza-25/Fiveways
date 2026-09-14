import { describe, expect, test } from 'vitest'
import { buses } from '../../data/buses'
import { getAvailableStops, getBusesForStop, recommendBus } from './busLogic'

describe('Smart Bus logic', () => {
  test('lists Cuddalore as a searchable stop', () => {
    expect(getAvailableStops(buses)).toContain('Cuddalore')
  })
  test('recommends Bus 18 for Cuddalore', () => {
    const matches = getBusesForStop(buses, 'Cuddalore')
    const { recommended, ordered } = recommendBus(matches)
    expect(recommended.number).toBe('18')
    expect(recommended.etaMinutes).toBe(4)
    expect(ordered.map((bus) => bus.number)).toEqual(['18', '21', '12'])
  })
  test('returns no recommendation when all buses crossed', () => {
    const crossed = [
      { id: 'x1', number: '1', status: 'crossed', etaMinutes: -5 },
      { id: 'x2', number: '2', status: 'crossed', etaMinutes: -2 },
    ]
    expect(recommendBus(crossed).recommended).toBeNull()
  })
})

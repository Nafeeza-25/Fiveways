import test from 'node:test'
import assert from 'node:assert/strict'
import { buses } from '../../data/buses.js'
import { getBusesForStop, recommendBus } from './busLogic.js'

test('Cuddalore recommendation explains the advantage and next fallback bus', () => {
  const result = recommendBus(getBusesForStop(buses, 'Cuddalore'))
  assert.equal(result.recommended.number, '18')
  assert.equal(result.nextAvailable.number, '21')
  assert.equal(result.leadMinutes, 7)
  assert.match(result.reason, /7 min sooner/i)
})

test('no-upcoming state returns a clear reason', () => {
  const result = recommendBus([
    { id: 'x', number: '1', status: 'crossed', etaMinutes: -4 },
  ])
  assert.equal(result.recommended, null)
  assert.equal(result.nextAvailable, null)
  assert.match(result.reason, /already crossed/i)
})

export function getAvailableStops(buses) {
  return [...new Set(buses.flatMap((bus) => bus.stops))].sort()
}

export function getBusesForStop(buses, stopName) {
  const normalized = String(stopName ?? '').trim().toLowerCase()
  if (!normalized) return []
  return buses
    .filter((bus) => bus.stops.some((stop) => stop.toLowerCase() === normalized))
    .map((bus) => {
      const matchedStop = bus.stops.find((stop) => stop.toLowerCase() === normalized)
      const stopData = bus.stopStates ? bus.stopStates[matchedStop] : null
      return {
        ...bus,
        selectedStop: matchedStop ?? stopName,
        etaMinutes: stopData ? stopData.etaMinutes : (bus.etaMinutes ?? 0),
        status: stopData ? stopData.status : (bus.status ?? 'upcoming'),
      }
    })
}

export function recommendBus(busesForStop) {
  const ordered = [...busesForStop].sort((a, b) => {
    const aUpcoming = a.status !== 'crossed' && a.etaMinutes >= 0
    const bUpcoming = b.status !== 'crossed' && b.etaMinutes >= 0
    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1
    return a.etaMinutes - b.etaMinutes
  })

  const upcoming = ordered.filter((bus) => bus.status !== 'crossed' && bus.etaMinutes >= 0)
  const recommended = upcoming[0] ?? null
  const nextAvailable = upcoming[1] ?? null
  const leadMinutes = recommended && nextAvailable
    ? Math.max(0, nextAvailable.etaMinutes - recommended.etaMinutes)
    : null

  let reason = 'No simulated buses are available for this stop.'
  if (!recommended && ordered.length > 0) {
    reason = 'All matching demo buses have already crossed this stop.'
  } else if (recommended && nextAvailable && leadMinutes > 0) {
    reason = `Earliest upcoming option · ${leadMinutes} min sooner than Bus ${nextAvailable.number}.`
  } else if (recommended) {
    reason = 'Earliest upcoming demo bus for this stop.'
  }

  return { recommended, nextAvailable, leadMinutes, reason, ordered }
}

export function filterEvents(events, { query, category }) {
  const normalized = String(query ?? '').trim().toLowerCase()
  return events.filter((event) => {
    const textMatch = !normalized || `${event.title} ${event.venue} ${event.eligibility}`.toLowerCase().includes(normalized)
    const categoryMatch = category === 'All' || event.category === category
    return textMatch && categoryMatch
  })
}

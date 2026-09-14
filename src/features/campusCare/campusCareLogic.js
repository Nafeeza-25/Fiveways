export function validateIssue(input) {
  const errors = {}
  if (!String(input.category ?? '').trim()) errors.category = 'Choose an issue category.'
  if (!String(input.location ?? '').trim()) errors.location = 'Enter the issue location.'
  return errors
}

export function createDemoTicket(input, sequence) {
  return {
    id: `FW-${sequence}`,
    category: input.category,
    location: input.location.trim(),
    description: String(input.description ?? '').trim(),
    status: 'Submitted',
    createdAt: new Date().toISOString(),
  }
}

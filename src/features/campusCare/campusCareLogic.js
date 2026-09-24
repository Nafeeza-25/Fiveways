export function validateIssue(input) {
  const errors = {}
  if (!String(input.category ?? '').trim()) errors.category = 'Choose an issue category.'
  if (!String(input.location ?? '').trim()) errors.location = 'Enter the issue location.'
  return errors
}

export function createDemoTicket(input, sequence) {
  let id
  if (sequence !== undefined && sequence !== null) {
    id = `FW-${sequence}`
  } else {
    const stamp = Date.now().toString().slice(-6)
    const random = Math.floor(1000 + Math.random() * 9000)
    id = `FW-${stamp}-${random}`
  }
  return {
    id,
    category: input.category,
    location: input.location.trim(),
    description: String(input.description ?? '').trim(),
    status: 'Submitted',
    createdAt: new Date().toISOString(),
  }
}

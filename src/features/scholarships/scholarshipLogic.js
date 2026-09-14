function matchesRule(profile, key, allowed) {
  if (allowed === undefined || allowed === null) return null
  if (Array.isArray(allowed)) return allowed.includes(profile[key])
  return profile[key] === allowed
}

export function getDiscoveryScholarships(scholarships) {
  return scholarships.filter((scholarship) => scholarship.discoveryOnly === true)
}

export function matchScholarships(profile, scholarships) {
  const documents = Array.isArray(profile.documents) ? profile.documents : []

  return scholarships.filter((scholarship) => scholarship.discoveryOnly !== true).map((scholarship) => {
    const matchedReasons = []
    const unmetConditions = []
    const { rules = {} } = scholarship

    const checks = [
      ['firstGeneration', rules.firstGeneration, 'First-generation status matches'],
      ['governmentSchool', rules.governmentSchool, 'Government-school background matches'],
      ['category', rules.categories, 'Community/category is within the listed groups'],
      ['incomeRange', rules.incomeRanges, 'Income range is within the listed band'],
    ]

    for (const [profileKey, rule, reason] of checks) {
      const result = matchesRule(profile, profileKey, rule)
      if (result === null) continue
      if (result) matchedReasons.push(reason)
      else unmetConditions.push(reason.replace('matches', 'does not match'))
    }

    const requiredDocuments = Array.isArray(scholarship.requiredDocuments) ? scholarship.requiredDocuments : []
    const missingDocuments = requiredDocuments.filter((document) => !documents.includes(document))
    const availableDocuments = requiredDocuments.filter((document) => documents.includes(document))
    const totalRuleCount = matchedReasons.length + unmetConditions.length
    const score = totalRuleCount === 0 ? 0 : Math.round((matchedReasons.length / totalRuleCount) * 100)

    return {
      scholarshipId: scholarship.id,
      score,
      matchedReasons,
      unmetConditions,
      missingDocuments,
      availableDocuments,
    }
  }).filter((match) => match.matchedReasons.length > 0)
    .sort((a, b) => b.score - a.score)
}

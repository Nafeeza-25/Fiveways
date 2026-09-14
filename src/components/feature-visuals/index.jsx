import BusVisual from './BusVisual'
import ScholarshipVisual from './ScholarshipVisual'
import EventsVisual from './EventsVisual'
import CareVisual from './CareVisual'
import AcademicsVisual from './AcademicsVisual'

const visuals = {
  bus: BusVisual,
  scholarships: ScholarshipVisual,
  events: EventsVisual,
  care: CareVisual,
  academics: AcademicsVisual,
}

export function FeatureVisual({ variant, compact = false }) {
  const Visual = visuals[variant]
  return Visual ? <Visual compact={compact} /> : null
}

export function HomeFeatureVisual({ variant }) {
  return <FeatureVisual variant={variant} compact />
}

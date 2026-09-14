import { Badge } from './ui/badge'

export default function StatusBadge({ tone = 'info', children, className = '' }) {
  return <Badge variant={tone} className={className}>{children}</Badge>
}

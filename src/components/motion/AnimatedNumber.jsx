import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

export default function AnimatedNumber({ value, decimals = 2, className = '' }) {
  const reduce = useReducedMotion()
  const numeric = Number(value)
  const [display, setDisplay] = useState(Number.isFinite(numeric) ? numeric : 0)

  useEffect(() => {
    if (!Number.isFinite(numeric)) return
    if (reduce) {
      setDisplay(numeric)
      return
    }
    const controls = animate(display, numeric, {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numeric, reduce])

  if (!Number.isFinite(numeric)) return <span className={className}>—</span>
  return <span className={className}>{display.toFixed(decimals)}</span>
}

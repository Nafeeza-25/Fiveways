import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function TiltCard({ className, children, intensity = 7, ...props }) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 180, damping: 22 })
  const smoothY = useSpring(y, { stiffness: 180, damping: 22 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-intensity, intensity])

  function onMove(event) {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={cn('perspective-1200', className)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

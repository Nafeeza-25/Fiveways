import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold tracking-wide transition-colors', {
  variants: {
    variant: {
      default: 'border-transparent bg-slate-950 text-white',
      secondary: 'border-slate-200 bg-slate-100 text-slate-700',
      info: 'border-blue-200 bg-blue-50 text-blue-700',
      success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      warning: 'border-amber-200 bg-amber-50 text-amber-700',
      danger: 'border-rose-200 bg-rose-50 text-rose-700',
      glass: 'border-white/[.15] bg-white/10 text-white backdrop-blur-xl',
    },
  },
  defaultVariants: { variant: 'default' },
})

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }

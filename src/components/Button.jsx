import { Button as ShadcnButton } from './ui/button'

const variants = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  outline: 'outline',
}

export default function Button({ as: Component, variant = 'primary', children, ...props }) {
  if (Component === 'a') {
    return <ShadcnButton asChild variant={variants[variant] ?? variant}><a {...props}>{children}</a></ShadcnButton>
  }
  return <ShadcnButton variant={variants[variant] ?? variant} {...props}>{children}</ShadcnButton>
}

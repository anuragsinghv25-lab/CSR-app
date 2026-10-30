import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type LinkOrButton = Omit<ButtonProps, 'asChild'> & { to?: string; arrow?: boolean }

function renderButton({ to, arrow, children, ...props }: LinkOrButton) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden />}
    </>
  )
  if (to) {
    return (
      <Button asChild {...props} className={cn('group/btn', props.className)}>
        <Link to={to}>{content}</Link>
      </Button>
    )
  }
  return (
    <Button {...props} className={cn('group/btn', props.className)}>
      {content}
    </Button>
  )
}

/** Primary action. Pass `to` for navigation (renders a link) or `onClick` for an action (renders a button). */
export function PrimaryButton({ variant = 'primary', ...props }: LinkOrButton) {
  return renderButton({ variant, ...props })
}

export function SecondaryButton({ variant = 'secondary', ...props }: LinkOrButton) {
  return renderButton({ variant, ...props })
}

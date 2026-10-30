import { cn } from '@/lib/utils'

const tones = {
  ivory: 'bg-ivory',
  white: 'bg-white',
  soft: 'bg-soft-blue',
  sand: 'bg-sand',
  navy: 'on-dark bg-navy text-white',
}

/** A full-width section with consistent vertical rhythm and an inner container. */
export function SectionContainer({
  children,
  tone = 'ivory',
  id,
  className,
  innerClassName,
  labelledBy,
  bordered,
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  id?: string
  className?: string
  innerClassName?: string
  labelledBy?: string
  bordered?: boolean
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('section-y relative', tones[tone], bordered && 'border-t border-line', className)}>
      <div className={cn('container-rv relative', innerClassName)}>{children}</div>
    </section>
  )
}

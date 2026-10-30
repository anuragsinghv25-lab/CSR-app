import { cn } from '@/lib/utils'
import type { OrganisationMetric } from '@/data/types'
import { StatCounter } from './StatCounter'
import { StatusBadge } from './StatusBadge'

/** Number-led metric. Not a boxed card by default — a typographic unit with a rule above. */
export function MetricCard({ metric, onDark, className }: { metric: OrganisationMetric; onDark?: boolean; className?: string }) {
  return (
    <div className={cn('border-t pt-5', onDark ? 'border-white/20' : 'border-charcoal/15', className)}>
      <p
        className={cn('font-display text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em]', onDark ? 'text-white' : 'text-blue')}
        aria-hidden
      >
        <StatCounter value={metric.value} suffix={metric.suffix} />
      </p>
      <p className="sr-only">{`${metric.value}${metric.suffix ?? ''} ${metric.label}`}</p>
      <p className={cn('mt-3 font-display text-base font-semibold', onDark ? 'text-white' : 'text-charcoal')}>{metric.label}</p>
      <p className={cn('mt-1 text-sm', onDark ? 'text-white/65' : 'text-muted')}>{metric.description}</p>
      {metric.status !== 'reference' && (
        <StatusBadge status={metric.status} help={metric.note} onDark={onDark} className="mt-3" />
      )}
    </div>
  )
}

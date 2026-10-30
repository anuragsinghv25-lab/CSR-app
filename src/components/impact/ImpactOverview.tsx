import { headlineMetrics, programmeCountMetric } from '@/data/organisation'
import { MetricCard } from '@/components/common/MetricCard'
import { cn } from '@/lib/utils'

/** The organisation-level reference figures. */
export function ImpactOverview({ includeProgrammes, onDark, className }: { includeProgrammes?: boolean; onDark?: boolean; className?: string }) {
  const metrics = includeProgrammes ? [...headlineMetrics, programmeCountMetric] : headlineMetrics
  return (
    <div className={cn('grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-10', includeProgrammes ? 'lg:grid-cols-5' : 'lg:grid-cols-4', className)}>
      {metrics.map((m) => (
        <MetricCard key={m.id} metric={m} onDark={onDark} />
      ))}
    </div>
  )
}

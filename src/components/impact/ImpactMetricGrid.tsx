import { AnimatePresence, motion } from 'framer-motion'
import { programmes, programmeBySlug } from '@/data/programmes'
import { stateImpact } from '@/data/impact'
import { formatNumber } from '@/lib/utils'
import type { ProgrammeFilter } from './ImpactFilterBar'

/** Filter-aware headline indicators aggregated from the (illustrative) state records. */
export function ImpactMetricGrid({ filter }: { filter: ProgrammeFilter }) {
  const slugs = filter === 'all' ? programmes.map((p) => p.slug) : [filter]
  const cards = slugs.map((slug) => {
    const records = stateImpact.flatMap((s) => s.records).filter((r) => r.programmeId === slug)
    const total = records.reduce((n, r) => n + r.metricValue, 0)
    const states = new Set(records.map((r) => r.geography)).size
    return { slug, metric: records[0]?.metricName ?? '', unit: records[0]?.unit ?? '', total, states }
  })
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {cards.map((c) => {
          const p = programmeBySlug[c.slug]
          const Icon = p.icon
          return (
            <motion.div
              key={c.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white p-6"
            >
              <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: p.accentColour }}>
                <Icon className="size-4" aria-hidden /> {p.title}
              </p>
              <p className="tabular mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-charcoal">{formatNumber(c.total)}</p>
              <p className="mt-1 text-sm text-charcoal">{c.metric}</p>
              <p className="mt-3 text-xs text-muted">Across {c.states} sample states · unit: {c.unit}</p>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

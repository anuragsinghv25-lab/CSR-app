import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { stateById } from '@/data/impact'
import { programmeBySlug } from '@/data/programmes'
import { formatNumber } from '@/lib/utils'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { ProgrammeFilter } from './ImpactFilterBar'

export function StateDetailPanel({ stateId, filter }: { stateId: string | null; filter: ProgrammeFilter }) {
  const s = stateId ? stateById[stateId] : undefined
  return (
    <div className="rounded-xl border border-line bg-white p-6 md:p-8" aria-live="polite">
      <AnimatePresence mode="wait">
        {!s ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MapPin className="size-6 text-blue" aria-hidden />
            <h3 className="mt-4 font-display text-xl font-bold text-charcoal">Select a state</h3>
            <p className="mt-2 text-muted">Choose a highlighted state on the map, or from the list, to see its programme areas and sample indicators.</p>
          </motion.div>
        ) : (
          <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-display text-h3 font-bold text-charcoal">{s.name}</h3>
              <StatusBadge status="illustrative" />
            </div>
            <p className="mt-4 font-display text-5xl font-extrabold tracking-[-0.03em] text-blue tabular">{s.projects}</p>
            <p className="text-sm text-muted">illustrative projects</p>

            <h4 className="mt-7 text-sm font-semibold text-charcoal">Programme areas</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.programmes.map((slug) => {
                const p = programmeBySlug[slug]
                const Icon = p.icon
                const on = filter === 'all' || filter === slug
                return (
                  <li
                    key={slug}
                    className="inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-sm font-medium transition-opacity"
                    style={{ borderColor: `color-mix(in srgb, ${p.accentColour} 35%, white)`, color: p.accentColour, opacity: on ? 1 : 0.4 }}
                  >
                    <Icon className="size-3.5" aria-hidden /> {p.title}
                  </li>
                )
              })}
            </ul>

            <h4 className="mt-7 text-sm font-semibold text-charcoal">Sample indicators</h4>
            <dl className="mt-3 divide-y divide-line border-y border-line">
              {s.records
                .filter((r) => filter === 'all' || r.programmeId === filter)
                .map((r) => (
                  <div key={r.id} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{r.metricName}</dt>
                    <dd className="tabular shrink-0 font-display font-bold text-charcoal">{formatNumber(r.metricValue)}</dd>
                  </div>
                ))}
            </dl>
            {filter !== 'all' && !s.programmes.includes(filter) && (
              <p className="mt-3 text-sm text-muted">No sample {programmeBySlug[filter].title.toLowerCase()} activity in this state.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

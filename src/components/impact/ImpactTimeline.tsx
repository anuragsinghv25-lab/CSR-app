import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Milestone } from '@/data/types'
import { StatusBadge } from '@/components/common/StatusBadge'
import { cn } from '@/lib/utils'

/** Interactive organisational timeline. Select a milestone to read it. */
export function ImpactTimeline({ milestones }: { milestones: Milestone[] }) {
  const [active, setActive] = useState(milestones.length - 1)
  const m = milestones[active]
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol className="relative lg:col-span-5" aria-label="Milestones">
        <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-white/20" />
        {milestones.map((ms, i) => {
          const isActive = i === active
          return (
            <li key={ms.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive ? 'step' : undefined}
                className="group relative flex w-full items-center gap-5 py-3 text-left"
              >
                <span
                  className={cn(
                    'relative z-10 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors',
                    isActive ? 'border-yellow bg-yellow' : 'border-white/40 bg-navy group-hover:border-white',
                  )}
                >
                  {isActive && <span className="size-2 rounded-full bg-navy" />}
                </span>
                <span>
                  <span className={cn('block font-display text-lg font-semibold transition-colors', isActive ? 'text-white' : 'text-white/60 group-hover:text-white')}>
                    {ms.phase}
                  </span>
                  <span className="block text-xs text-white/50">{ms.year ?? 'Year to be confirmed'}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="lg:col-span-7" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-white/15 bg-white/[0.04] p-7 md:p-10"
          >
            <p className="font-display text-sm font-semibold text-yellow">{m.phase}</p>
            <h3 className="mt-3 font-display text-h3 font-bold text-white">{m.title}</h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-white/75">{m.description}</p>
            <StatusBadge status={m.status} onDark className="mt-6" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

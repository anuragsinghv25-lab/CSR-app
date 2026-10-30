import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TimelineStep {
  title: string
  description: string
  output?: string
}

/**
 * Sequential process. Horizontal and interactive on desktop (select a
 * step to read it), vertical and fully expanded on mobile.
 */
export function Timeline({ steps, onDark, className }: { steps: TimelineStep[]; onDark?: boolean; className?: string }) {
  const [active, setActive] = useState(0)
  const cols = steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'

  return (
    <div className={className}>
      {/* Desktop: horizontal selectable rail */}
      <div className="hidden lg:block">
        <div role="tablist" aria-label="Process steps" className={cn('relative grid', cols)}>
          <div aria-hidden className={cn('absolute left-0 right-0 top-[19px] h-px', onDark ? 'bg-white/20' : 'bg-line-strong')} />
          <motion.div
            aria-hidden
            className="absolute left-0 top-[19px] h-px bg-terracotta"
            animate={{ width: `${((active + 0.5) / steps.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          />
          {steps.map((s, i) => {
            const isActive = i === active
            return (
              <button
                key={s.title}
                role="tab"
                aria-selected={isActive}
                aria-controls={`step-panel-${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group relative pr-6 text-left"
              >
                <span
                  className={cn(
                    'relative z-10 grid size-10 place-items-center rounded-full border font-display text-sm font-bold transition-colors',
                    isActive
                      ? 'border-terracotta bg-terracotta text-white'
                      : onDark
                        ? 'border-white/30 bg-navy text-white/80 group-hover:border-white'
                        : 'border-line-strong bg-ivory text-muted group-hover:border-charcoal group-hover:text-charcoal',
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    'mt-5 block font-display text-[1.05rem] font-semibold leading-snug transition-colors',
                    onDark ? (isActive ? 'text-white' : 'text-white/60') : isActive ? 'text-charcoal' : 'text-muted',
                  )}
                >
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
        <div className="mt-8 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`step-panel-${active}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-12 gap-8"
            >
              <p className={cn('col-span-7 text-lead', onDark ? 'text-white/80' : 'text-muted')}>{steps[active].description}</p>
              {steps[active].output && (
                <div className={cn('col-span-4 col-start-9 border-l pl-6', onDark ? 'border-white/20' : 'border-line-strong')}>
                  <p className={cn('text-xs font-semibold', onDark ? 'text-yellow' : 'text-terracotta')}>What you receive</p>
                  <p className={cn('mt-1 font-display font-semibold', onDark ? 'text-white' : 'text-charcoal')}>{steps[active].output}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile & tablet: vertical list */}
      <ol className="relative lg:hidden">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
            {i < steps.length - 1 && (
              <span aria-hidden className={cn('absolute left-[19px] top-10 bottom-0 w-px', onDark ? 'bg-white/20' : 'bg-line-strong')} />
            )}
            <span
              className={cn(
                'relative z-10 grid size-10 shrink-0 place-items-center rounded-full border font-display text-sm font-bold',
                onDark ? 'border-white/30 text-white' : 'border-terracotta/50 bg-ivory text-terracotta',
              )}
            >
              {i + 1}
            </span>
            <div className="pt-1.5">
              <h3 className={cn('font-display text-lg font-semibold', onDark ? 'text-white' : 'text-charcoal')}>{s.title}</h3>
              <p className={cn('mt-2 leading-relaxed', onDark ? 'text-white/75' : 'text-muted')}>{s.description}</p>
              {s.output && (
                <p className={cn('mt-3 text-sm', onDark ? 'text-white/70' : 'text-charcoal')}>
                  <span className={cn('font-semibold', onDark ? 'text-yellow' : 'text-terracotta')}>You receive: </span>
                  {s.output}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

import { programmes } from '@/data/programmes'
import type { ProgrammeSlug } from '@/data/types'
import { cn } from '@/lib/utils'

export type ProgrammeFilter = ProgrammeSlug | 'all'

/** Single-select programme filter. One row, placed above the content it controls. */
export function ImpactFilterBar({
  value,
  onChange,
  label = 'Filter by programme',
  onDark,
}: {
  value: ProgrammeFilter
  onChange: (v: ProgrammeFilter) => void
  label?: string
  onDark?: boolean
}) {
  const options: { value: ProgrammeFilter; label: string; colour?: string }[] = [
    { value: 'all', label: 'All programmes' },
    ...programmes.map((p) => ({ value: p.slug as ProgrammeFilter, label: p.title, colour: p.accentColour })),
  ]
  return (
    <div role="radiogroup" aria-label={label} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
      {options.map((o) => {
        const active = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-3.5 font-display text-sm font-semibold transition-colors',
              active
                ? onDark ? 'border-white bg-white text-navy' : 'border-charcoal bg-charcoal text-white'
                : onDark ? 'border-white/25 text-white/80 hover:border-white/60' : 'border-line-strong bg-white text-charcoal hover:border-charcoal',
            )}
          >
            {o.colour && <span aria-hidden className="size-2 rounded-full" style={{ background: o.colour }} />}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

import { useMemo, useRef, useState } from 'react'
import india from '@svg-maps/india'
import { stateById } from '@/data/impact'
import { cn } from '@/lib/utils'
import type { ProgrammeFilter } from './ImpactFilterBar'

/*
 * Base map: @svg-maps/india (state boundaries). Before production, verify
 * boundaries against official Survey of India depictions.
 */

// Sequential single-hue ramp (light → dark blue) for number of sample projects.
const ramp = ['#C9D6EA', '#8FAAD3', '#4D78B6', '#164A91']
const inactive = '#E9E6DD'
const dimmed = '#E4E1D7' // no sample activity for the selected programme (neutral, not part of the scale)

function stepFor(projects: number) {
  if (projects <= 3) return 0
  if (projects <= 5) return 1
  if (projects <= 7) return 2
  return 3
}

export function GeographicImpactMap({
  filter = 'all',
  selected,
  onSelect,
  interactive = true,
  className,
}: {
  filter?: ProgrammeFilter
  selected?: string | null
  onSelect?: (id: string) => void
  interactive?: boolean
  className?: string
}) {
  const [hover, setHover] = useState<{ id: string; x: number; y: number } | null>(null)
  const wrap = useRef<HTMLDivElement>(null)

  const locations = useMemo(() => india.locations, [])

  function fillFor(id: string) {
    const s = stateById[id]
    if (!s) return inactive
    if (filter !== 'all' && !s.programmes.includes(filter)) return dimmed
    if (selected === id) return '#FDBB19'
    return ramp[stepFor(s.projects)]
  }

  const isActive = (id: string) => Boolean(stateById[id]) && (filter === 'all' || stateById[id].programmes.includes(filter))

  function onMove(e: React.PointerEvent, id: string) {
    const r = wrap.current?.getBoundingClientRect()
    if (!r) return
    setHover({ id, x: e.clientX - r.left, y: e.clientY - r.top })
  }

  const hovered = hover ? locations.find((l) => l.id === hover.id) : null
  const hoveredData = hover ? stateById[hover.id] : undefined

  return (
    <div ref={wrap} className={cn('relative', className)}>
      <svg viewBox={india.viewBox} className="h-auto w-full" role="group" aria-label="Map of India showing illustrative state presence">
        {locations.map((loc) => {
          const active = interactive && isActive(loc.id)
          const name = loc.name
          return (
            <path
              key={loc.id}
              d={loc.path}
              fill={fillFor(loc.id)}
              stroke="#FFFFFF"
              strokeWidth={selected === loc.id ? 2 : 0.8}
              strokeLinejoin="round"
              className={cn(
                'transition-[fill,opacity] duration-200',
                active && 'cursor-pointer outline-none hover:opacity-80 focus-visible:opacity-80 [&:focus-visible]:stroke-charcoal [&:focus-visible]:[stroke-width:2]',
              )}
              {...(active
                ? {
                    role: 'button',
                    tabIndex: 0,
                    'aria-label': `${name}: view illustrative details`,
                    'aria-pressed': selected === loc.id,
                    onClick: () => onSelect?.(loc.id),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onSelect?.(loc.id)
                      }
                    },
                  }
                : { 'aria-hidden': true })}
              onPointerMove={(e) => onMove(e, loc.id)}
              onPointerLeave={() => setHover(null)}
            />
          )
        })}
        {selected && (() => {
          const loc = locations.find((l) => l.id === selected)
          return loc ? <path d={loc.path} fill="none" stroke="#17191D" strokeWidth={1.6} pointerEvents="none" /> : null
        })()}
      </svg>

      {hover && hovered && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-md bg-charcoal px-3 py-2 text-xs text-white shadow-lg"
          style={{ left: hover.x, top: hover.y }}
          aria-hidden
        >
          <p className="font-semibold">{hovered.name}</p>
          <p className="text-white/70">
            {hoveredData ? `${hoveredData.projects} sample projects · ${hoveredData.programmes.length} programmes` : 'No sample presence'}
          </p>
        </div>
      )}
    </div>
  )
}

/** Legend for the map's sequential scale. */
export function MapLegend({ className }: { className?: string }) {
  const labels = ['1–3', '4–5', '6–7', '8+']
  return (
    <div className={cn('text-xs text-muted', className)}>
      <p className="mb-2 font-medium text-charcoal">Sample projects per state</p>
      <div className="flex items-center gap-3">
        <div className="flex">
          {ramp.map((c, i) => (
            <div key={c} className="flex flex-col items-center gap-1">
              <span className="h-2.5 w-10 first:rounded-l-sm last:rounded-r-sm" style={{ background: c, marginRight: i < ramp.length - 1 ? 2 : 0 }} />
              <span className="tabular">{labels[i]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="h-2.5 w-10 rounded-sm" style={{ background: inactive }} />
          <span>None</span>
        </div>
      </div>
    </div>
  )
}

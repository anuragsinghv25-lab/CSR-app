import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { programmes } from '@/data/programmes'
import type { ProgrammeSlug } from '@/data/types'
import { cn } from '@/lib/utils'

const R = 38 // node radius as % of the container

function nodePos(i: number) {
  const a = ((-90 + i * 60) * Math.PI) / 180
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
}

/**
 * The 360-degree model: six pillars around COMMUNITY PROSPERITY.
 * `mode="link"`: nodes navigate to programme pages (homepage).
 * `mode="select"`: nodes are toggle buttons controlled by the parent (Approach page).
 */
export function PillarDiagram({
  mode = 'link',
  selected = null,
  onSelect,
  onDark = false,
  className,
}: {
  mode?: 'link' | 'select'
  selected?: ProgrammeSlug | null
  onSelect?: (slug: ProgrammeSlug) => void
  onDark?: boolean
  className?: string
}) {
  const pts = programmes.map((_, i) => nodePos(i))
  const hex = pts.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div className={cn('relative mx-auto aspect-square w-full max-w-[560px]', className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        <circle cx={50} cy={50} r={R} fill="none" stroke={onDark ? '#fff' : '#164A91'} strokeOpacity={0.18} strokeWidth={0.25} />
        <circle cx={50} cy={50} r={R + 8} fill="none" stroke={onDark ? '#fff' : '#164A91'} strokeOpacity={0.1} strokeWidth={0.2} strokeDasharray="0.6 1.4" />
        <polygon points={hex} fill="none" stroke={onDark ? '#fff' : '#17191D'} strokeOpacity={0.12} strokeWidth={0.2} strokeDasharray="0.8 1" />
        {programmes.map((p, i) => {
          const active = selected === p.slug
          return (
            <motion.line
              key={p.slug}
              x1={50}
              y1={50}
              x2={pts[i].x}
              y2={pts[i].y}
              stroke={p.accentColour}
              initial={false}
              animate={{ strokeOpacity: selected ? (active ? 1 : 0.15) : 0.55, strokeWidth: active ? 0.7 : 0.35 }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
      </svg>

      {/* Centre */}
      <div className="absolute left-1/2 top-1/2 grid aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy text-center shadow-[0_20px_50px_-24px_rgb(10_35_72/0.7)]">
        <div className="px-3">
          <span className="mx-auto mb-2 block size-2.5 rounded-full bg-yellow" aria-hidden />
          <p className="font-display text-[clamp(0.6rem,0.4rem+0.9vw,0.95rem)] font-extrabold uppercase leading-tight tracking-[0.08em] text-white">
            Community
            <br />
            prosperity
          </p>
        </div>
      </div>

      {/* Nodes */}
      {programmes.map((p, i) => {
        const Icon = p.icon
        const active = selected === p.slug
        const dim = selected && !active
        const inner = (
          <>
            <span
              className={cn(
                'grid size-[clamp(2.75rem,1.6rem+3.6vw,4.25rem)] place-items-center rounded-full border-2 bg-white transition-all duration-300',
                active ? 'scale-110 text-white' : 'group-hover:scale-105',
              )}
              style={{ borderColor: p.accentColour, background: active ? p.accentColour : undefined, color: active ? '#fff' : p.accentColour }}
            >
              <Icon className="size-[45%]" aria-hidden />
            </span>
            <span
              className={cn(
                'mt-2 whitespace-nowrap rounded-sm px-1.5 font-display text-[clamp(0.72rem,0.6rem+0.4vw,0.92rem)] font-semibold',
                onDark ? 'text-white' : 'text-charcoal',
                active && !onDark && 'bg-white',
              )}
            >
              {p.title}
            </span>
          </>
        )
        const cls = cn(
          'group absolute flex -translate-x-1/2 -translate-y-[38%] flex-col items-center transition-opacity duration-300',
          dim && 'opacity-45 hover:opacity-100',
        )
        const style = { left: `${pts[i].x}%`, top: `${pts[i].y}%` }
        return mode === 'link' ? (
          <Link key={p.slug} to={`/programs/${p.slug}`} className={cls} style={style} aria-label={`${p.title} programme`}>
            {inner}
          </Link>
        ) : (
          <button
            key={p.slug}
            type="button"
            className={cls}
            style={style}
            aria-pressed={active}
            aria-label={`${p.title}: show details`}
            onClick={() => onSelect?.(p.slug)}
          >
            {inner}
          </button>
        )
      })}
    </div>
  )
}

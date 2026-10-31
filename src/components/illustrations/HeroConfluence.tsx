import { motion } from 'framer-motion'
import { programmes } from '@/data/programmes'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const C = 300
const NODE_R = 214

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }
}

/**
 * "Confluence" — the Rainvows signature illustration.
 * Six programme streams spiral inward from the communities around them
 * and meet in a single pool: community prosperity. Rain marks fall in
 * from the edge. Drawn once on load, then still.
 */
export function HeroConfluence({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] as const },
        }
  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  const nodes = programmes.map((p, i) => {
    const deg = -90 + i * 60
    const pos = polar(NODE_R, deg)
    const ctrl = polar(150, deg + 42)
    const end = polar(58, deg + 70)
    return { p, deg, pos, path: `M ${pos.x} ${pos.y} Q ${ctrl.x} ${ctrl.y} ${end.x} ${end.y}` }
  })

  // Small settlement dots on the outer ring
  const settlements = Array.from({ length: 28 }, (_, i) => {
    const deg = i * (360 / 28) + (i % 3) * 3.5
    const r = 268 + ((i * 37) % 3) * 6
    return { ...polar(r, deg), size: i % 4 === 0 ? 2.6 : 1.6 }
  })

  const rain = [
    { x: 92, y: 44, l: 26 },
    { x: 118, y: 74, l: 18 },
    { x: 70, y: 96, l: 14 },
    { x: 146, y: 30, l: 20 },
    { x: 488, y: 470, l: 16 },
    { x: 512, y: 500, l: 24 },
  ]

  return (
    <svg viewBox="0 0 600 600" className={cn('h-auto w-full', className)} role="img" aria-labelledby="confluence-title">
      <title id="confluence-title">
        Six programme areas — skill development, water, agriculture, health, women and livelihoods — flowing together into community prosperity
      </title>
      <defs>
        <radialGradient id="pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8EDF4" stopOpacity="1" />
          <stop offset="70%" stopColor="#E8EDF4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E8EDF4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="core" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#2A63B5" />
          <stop offset="100%" stopColor="#0E2F5E" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r={290} fill="url(#pool)" />

      {/* Ripple rings */}
      {[70, 118, 166, 214, 262].map((r, i) => (
        <motion.circle
          key={r}
          cx={C}
          cy={C}
          r={r}
          fill="none"
          stroke="#164A91"
          strokeOpacity={0.32 - i * 0.05}
          strokeWidth={1}
          strokeDasharray={i === 3 ? '2 6' : undefined}
          {...(reduce
            ? {}
            : {
                initial: { scale: 0.85, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
              })}
          style={{ transformOrigin: '300px 300px' }}
        />
      ))}

      {/* Warm accent arcs */}
      <motion.path
        d={describeArc(166, 200, 268)}
        fill="none"
        stroke="#C9572B"
        strokeWidth={5}
        strokeLinecap="round"
        {...draw(0.5)}
      />
      <motion.path
        d={describeArc(262, -20, 14)}
        fill="none"
        stroke="#FDBB19"
        strokeWidth={4}
        strokeLinecap="round"
        {...draw(0.9)}
      />

      {/* Settlements */}
      {settlements.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.size} fill="#17191D" fillOpacity={0.28} />
      ))}

      {/* Rain */}
      {rain.map((r, i) => (
        <motion.line
          key={i}
          x1={r.x}
          y1={r.y}
          x2={r.x - r.l * 0.35}
          y2={r.y + r.l}
          stroke="#C9572B"
          strokeWidth={2}
          strokeLinecap="round"
          strokeOpacity={0.7}
          {...draw(0.2 + i * 0.06)}
        />
      ))}

      {/* Streams */}
      {nodes.map(({ p, path }, i) => (
        <motion.path
          key={p.slug}
          d={path}
          fill="none"
          stroke={p.accentColour}
          strokeWidth={2.25}
          strokeLinecap="round"
          {...draw(0.45 + i * 0.08)}
        />
      ))}

      {/* Programme nodes */}
      {nodes.map(({ p, pos }, i) => (
        <motion.g key={p.slug} style={{ transformOrigin: `${pos.x}px ${pos.y}px` }} {...pop(0.3 + i * 0.07)}>
          <circle cx={pos.x} cy={pos.y} r={22} fill="#F8F7F3" stroke={p.accentColour} strokeWidth={1.5} />
          <circle cx={pos.x} cy={pos.y} r={9} fill={p.accentColour} />
        </motion.g>
      ))}

      {/* Pool */}
      <motion.g style={{ transformOrigin: '300px 300px' }} {...pop(1.3)}>
        <circle cx={C} cy={C} r={50} fill="url(#core)" />
        <circle cx={C} cy={C} r={50} fill="none" stroke="#FDBB19" strokeOpacity={0.6} strokeWidth={1} strokeDasharray="1 5" transform="rotate(10 300 300)" />
        <circle cx={C} cy={C} r={14} fill="#FDBB19" />
      </motion.g>
    </svg>
  )
}

function describeArc(r: number, startDeg: number, endDeg: number) {
  const s = polar(r, startDeg)
  const e = polar(r, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

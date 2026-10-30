import type { ProgrammeSlug } from '@/data/types'
import { programmeBySlug } from '@/data/programmes'
import { cn } from '@/lib/utils'

/**
 * Programme-specific abstract identity. Each programme has its own
 * generative motif in its accent colour, used in place of photography:
 *  water — ripples · agriculture — furrows · skills — rising blocks
 *  health — pulse · women — interlocking circles · livelihoods — growth
 */
export function ProgrammeGlyph({
  slug,
  className,
  variant = 'light',
}: {
  slug: ProgrammeSlug
  className?: string
  variant?: 'light' | 'dark'
}) {
  const c = programmeBySlug[slug].accentColour
  const ink = variant === 'dark' ? '#FFFFFF' : c
  // Anchor each motif so cropping in wide/short frames keeps its focal point.
  const anchor: Record<ProgrammeSlug, string> = {
    water: 'xMinYMax slice',
    agriculture: 'xMidYMid slice',
    skills: 'xMidYMax slice',
    health: 'xMidYMid slice',
    women: 'xMidYMid slice',
    livelihoods: 'xMidYMax slice',
  }
  return (
    <svg viewBox="0 0 200 200" className={cn('h-full w-full', className)} aria-hidden preserveAspectRatio={anchor[slug]}>
      {slug === 'water' && (
        <g fill="none" stroke={ink}>
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={52} cy={150} r={18 + i * 20} strokeOpacity={0.55 - i * 0.05} strokeWidth={i === 2 ? 3 : 1.2} />
          ))}
          <circle cx={52} cy={150} r={8} fill={ink} stroke="none" />
          <path d="M150 28 q 8 14 0 22 q -8 -8 0 -22z" fill="#FDBB19" stroke="none" />
        </g>
      )}
      {slug === 'agriculture' && (
        <g fill="none" stroke={ink} strokeLinecap="round">
          {Array.from({ length: 10 }, (_, i) => (
            <path
              key={i}
              d={`M -10 ${70 + i * 14} C 60 ${50 + i * 14}, 130 ${92 + i * 14}, 210 ${64 + i * 14}`}
              strokeOpacity={0.25 + (i % 3) * 0.15}
              strokeWidth={i === 4 ? 3 : 1.3}
            />
          ))}
          <circle cx={150} cy={44} r={16} fill="#FDBB19" stroke="none" />
        </g>
      )}
      {slug === 'skills' && (
        <g>
          {Array.from({ length: 5 }, (_, i) =>
            Array.from({ length: i + 1 }, (_, j) => (
              <rect
                key={`${i}-${j}`}
                x={28 + i * 30}
                y={160 - (j + 1) * 26}
                width={24}
                height={20}
                rx={3}
                fill={ink}
                fillOpacity={j === i ? 0.9 : 0.14 + j * 0.06}
              />
            )),
          )}
          <circle cx={40} cy={44} r={10} fill="#FDBB19" />
        </g>
      )}
      {slug === 'health' && (
        <g fill="none" stroke={ink}>
          {[30, 52, 74, 96].map((r, i) => (
            <circle key={r} cx={100} cy={100} r={r} strokeOpacity={0.5 - i * 0.1} strokeWidth={1.2} />
          ))}
          <path d="M100 82 v36 M82 100 h36" strokeWidth={6} strokeLinecap="round" />
          <path
            d="M-5 150 H60 l10 -22 l12 40 l10 -30 l8 12 H205"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="#FDBB19"
          />
        </g>
      )}
      {slug === 'women' && (
        <g fill={ink} stroke={ink}>
          <circle cx={78} cy={88} r={46} fillOpacity={0.14} strokeOpacity={0.6} strokeWidth={1.4} />
          <circle cx={122} cy={88} r={46} fillOpacity={0.14} strokeOpacity={0.6} strokeWidth={1.4} />
          <circle cx={100} cy={126} r={46} fillOpacity={0.14} strokeOpacity={0.6} strokeWidth={1.4} />
          <circle cx={100} cy={102} r={10} fill="#FDBB19" stroke="none" />
        </g>
      )}
      {slug === 'livelihoods' && (
        <g>
          {[40, 62, 84, 108, 132, 158].map((h, i) => (
            <rect key={i} x={20 + i * 28} y={170 - h} width={16} height={h} rx={3} fill={ink} fillOpacity={0.18 + i * 0.12} />
          ))}
          <path d="M20 128 C 70 120, 110 82, 182 30" fill="none" stroke="#FDBB19" strokeWidth={3} strokeLinecap="round" />
          <circle cx={182} cy={30} r={6} fill="#FDBB19" />
        </g>
      )}
    </svg>
  )
}

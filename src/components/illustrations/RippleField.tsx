import { cn } from '@/lib/utils'

/** Quiet concentric ripples for dark sections — the confluence motif at rest. */
export function RippleField({ className, rings = 9 }: { className?: string; rings?: number }) {
  return (
    <svg viewBox="0 0 600 600" className={cn('pointer-events-none', className)} aria-hidden>
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx={300}
          cy={300}
          r={40 + i * 32}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.16 - i * 0.012}
          strokeWidth={1}
          strokeDasharray={i % 3 === 2 ? '2 6' : undefined}
        />
      ))}
      <path d="M 300 44 A 256 256 0 0 1 512 162" fill="none" stroke="#FDBB19" strokeWidth={3} strokeLinecap="round" />
      <circle cx={300} cy={300} r={10} fill="#FDBB19" />
    </svg>
  )
}

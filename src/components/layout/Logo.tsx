import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * LOGO SLOT — the official RAINVOUS logo must be retained in production.
 * The supplied logo file was not available for this prototype, so a
 * wordmark stand-in is rendered. Replace the contents of <Link> with:
 *   <img src="/brand/rainvous-logo.svg" alt="RAINVOUS" className="h-8 w-auto" />
 */
export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label="RAINVOUS home" data-logo-slot>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="15" fill={onDark ? '#FFFFFF' : '#164A91'} />
        <circle cx="16" cy="16" r="10" fill="none" stroke={onDark ? '#164A91' : '#FFFFFF'} strokeOpacity=".45" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="5.5" fill="none" stroke={onDark ? '#164A91' : '#FFFFFF'} strokeOpacity=".7" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="2.6" fill="#FDBB19" />
      </svg>
      <span className={cn('font-display text-[1.2rem] font-extrabold tracking-[0.06em]', onDark ? 'text-white' : 'text-blue')}>
        RAINVOUS
      </span>
    </Link>
  )
}

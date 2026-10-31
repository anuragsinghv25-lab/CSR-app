import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { organisation } from '@/data/organisation'

/**
 * LOGO SLOT — the official Rainvows logo must be retained in production.
 * The trademark name is "Rainvows". Until the official updated logo is
 * supplied, a clean text wordmark (no raster asset) is rendered. Replace the contents of <Link> with:
 *   <img src="/brand/rainvows-logo.svg" alt="Rainvows" className="h-8 w-auto" />
 */
export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label={`${organisation.name} home`} data-logo-slot>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="15" fill={onDark ? '#FFFFFF' : '#164A91'} />
        <circle cx="16" cy="16" r="10" fill="none" stroke={onDark ? '#164A91' : '#FFFFFF'} strokeOpacity=".45" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="5.5" fill="none" stroke={onDark ? '#164A91' : '#FFFFFF'} strokeOpacity=".7" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="2.6" fill="#FDBB19" />
      </svg>
      <span className={cn('font-display text-[1.3rem] font-extrabold tracking-[-0.01em]', onDark ? 'text-white' : 'text-blue')}>
        {organisation.name}
      </span>
    </Link>
  )
}

import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { organisation, brandLogo } from '@/data/organisation'

/**
 * Header logo: brand emblem + "Rainvows" wordmark.
 * Swap the emblem via `brandLogo` in src/data/organisation.ts.
 */
export function Logo({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label={`${organisation.name} home`} data-logo-slot>
      <img
        src={brandLogo.src}
        alt=""
        aria-hidden
        width={brandLogo.width}
        height={brandLogo.height}
        className="size-12 shrink-0 object-contain"
        decoding="async"
      />
      <span className={cn('font-display text-[1.3rem] font-extrabold tracking-[-0.01em]', onDark ? 'text-white' : 'text-blue')}>
        {organisation.name}
      </span>
    </Link>
  )
}

import { Link, useLocation } from 'react-router-dom'
import { HandHeart, Mail, MapPin } from 'lucide-react'
import { activeSocialLinks, organisation } from '@/data/organisation'
import { SocialLinks } from '@/components/common/SocialLinks'
import { cn } from '@/lib/utils'

/**
 * Slim utility bar above the main navigation, on every screen size.
 * LEFT: social channels (only those with a valid configured URL); contact
 * details fill the space on wider screens or while all channels are pending.
 * RIGHT: Donate / Sponsor.
 */
export function UtilityBar() {
  const { pathname } = useLocation()
  const hasSocial = activeSocialLinks.length > 0
  return (
    <div className="border-b border-line bg-sand" role="region" aria-label="Quick links">
      <div className="container-rv flex h-11 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <SocialLinks tone="light" className="-ml-2 gap-0.5" />
          <div className={cn('min-w-0 items-center gap-5 text-xs text-muted', hasSocial ? 'hidden lg:flex lg:border-l lg:border-line lg:pl-4' : 'flex')}>
            <a href={`mailto:${organisation.email}`} className="hidden items-center gap-1.5 hover:text-blue md:inline-flex">
              <Mail className="size-3.5 text-blue" aria-hidden />
              {organisation.email}
            </a>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-blue" aria-hidden />
              <span className="truncate">{organisation.location}</span>
            </span>
          </div>
        </div>
        <Link
          to="/donate"
          aria-current={pathname === '/donate' ? 'page' : undefined}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-yellow px-3 font-display text-[0.85rem] font-semibold text-charcoal transition-colors hover:bg-[#f0ac00] aria-[current=page]:ring-2 aria-[current=page]:ring-blue aria-[current=page]:ring-offset-1 aria-[current=page]:ring-offset-sand"
        >
          <HandHeart className="size-4" aria-hidden />
          Donate / Sponsor
        </Link>
      </div>
    </div>
  )
}

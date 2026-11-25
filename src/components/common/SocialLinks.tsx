import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { activeSocialLinks, organisation, type SocialId } from '@/data/organisation'
import { cn } from '@/lib/utils'

/** Official brand marks from Font Awesome Brands (Simple Icons no longer ships LinkedIn). */
const icons: Record<SocialId, IconDefinition> = {
  facebook: faFacebook,
  x: faXTwitter,
  youtube: faYoutube,
  linkedin: faLinkedin,
  instagram: faInstagram,
}

function BrandIcon({ icon, className }: { icon: IconDefinition; className?: string }) {
  const [w, h, , , path] = icon.icon
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="currentColor" aria-hidden focusable="false">
      {(Array.isArray(path) ? path : [path]).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

/**
 * Renders only channels with a valid, configured profile URL (see
 * `socialLinks` in src/data/organisation.ts). Renders nothing while all are pending.
 */
export function SocialLinks({
  className,
  size = 'sm',
  tone = 'dark',
}: {
  className?: string
  size?: 'sm' | 'md'
  /** `dark` = on navy surfaces, `light` = on ivory/sand surfaces. */
  tone?: 'dark' | 'light'
}) {
  if (!activeSocialLinks.length) return null
  return (
    <ul className={cn('flex items-center gap-1', className)} aria-label={`${organisation.name} on social media`}>
      {activeSocialLinks.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${organisation.name} on ${s.label} (opens in a new tab)`}
            className={cn(
              'grid place-items-center rounded-md transition-colors',
              size === 'sm' ? 'size-9' : 'size-10 border',
              tone === 'dark'
                ? 'border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                : 'border-line text-blue hover:bg-soft-blue hover:text-navy',
            )}
          >
            <BrandIcon icon={icons[s.id]} className={size === 'sm' ? 'size-4' : 'size-[18px]'} />
          </a>
        </li>
      ))}
    </ul>
  )
}

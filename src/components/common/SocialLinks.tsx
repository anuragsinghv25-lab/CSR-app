import { siFacebook, siInstagram, siX, siYoutube } from 'simple-icons'
import { Link2 } from 'lucide-react'
import { socialLinks } from '@/data/organisation'
import { cn } from '@/lib/utils'

const paths: Partial<Record<(typeof socialLinks)[number]['id'], string>> = {
  facebook: siFacebook.path,
  x: siX.path,
  youtube: siYoutube.path,
  instagram: siInstagram.path,
}

/** Only channels with a configured URL are rendered. Returns nothing until at least one exists. */
export function SocialLinks({ className, size = 'sm', onDark = true }: { className?: string; size?: 'sm' | 'md'; onDark?: boolean }) {
  const active = socialLinks.filter((s) => s.url.trim())
  if (!active.length) return null
  return (
    <ul className={cn('flex items-center gap-1', className)} aria-label="Rainvows on social media">
      {active.map((s) => {
        const d = paths[s.id]
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in a new tab)`}
              className={cn(
                'grid place-items-center rounded-md transition-colors',
                size === 'sm' ? 'size-8' : 'size-10 border',
                onDark ? 'border-white/15 text-white/70 hover:bg-white/10 hover:text-white' : 'border-line text-muted hover:bg-sand hover:text-charcoal',
              )}
            >
              {d ? (
                <svg viewBox="0 0 24 24" className={size === 'sm' ? 'size-3.5' : 'size-4'} fill="currentColor" aria-hidden>
                  <path d={d} />
                </svg>
              ) : (
                <Link2 className={size === 'sm' ? 'size-3.5' : 'size-4'} aria-hidden />
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

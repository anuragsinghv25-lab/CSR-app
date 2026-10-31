import { cn } from '@/lib/utils'

/**
 * IMAGE SLOT — reserved for official Rainvows photography.
 * ------------------------------------------------------------------
 * Until photographs are supplied, pass `src` as undefined and the slot
 * renders its `fallback` (an abstract illustration) — never an empty box.
 * When photography arrives, set `src` and `alt`; the fallback is skipped.
 *
 * Planned slots: home-hero, programme-hero-{slug}, impact-story-{id},
 * about-history, partner-story-{id}.
 */
export function ImageSlot({
  slot,
  src,
  alt = '',
  fallback,
  className,
}: {
  slot: string
  src?: string
  alt?: string
  fallback: React.ReactNode
  className?: string
}) {
  return (
    <div data-image-slot={slot} className={cn('relative overflow-hidden', className)}>
      {src ? <img src={src} alt={alt} className="size-full object-cover" loading="lazy" /> : fallback}
    </div>
  )
}

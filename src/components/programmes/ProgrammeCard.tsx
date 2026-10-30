import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Programme } from '@/data/types'
import { ProgrammeGlyph } from '@/components/illustrations/ProgrammeGlyph'
import { cn } from '@/lib/utils'

/**
 * Programme navigation card. Layout varies by `variant` so a grid of six
 * reads as an editorial composition rather than six identical tiles.
 */
export function ProgrammeCard({
  programme: p,
  variant = 'standard',
  className,
}: {
  programme: Programme
  variant?: 'feature' | 'standard' | 'wide'
  className?: string
}) {
  const Icon = p.icon
  return (
    <Link
      to={`/programs/${p.slug}`}
      className={cn(
        'group relative flex overflow-hidden rounded-lg border border-line bg-white transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_20px_44px_-28px_rgb(10_35_72/0.45)]',
        variant === 'wide' ? 'flex-col sm:flex-row' : 'flex-col',
        className,
      )}
      style={{ ['--accent' as string]: p.accentColour }}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
      <div
        className={cn(
          'relative overflow-hidden',
          variant === 'feature' && 'h-52 md:h-64',
          variant === 'standard' && 'h-36',
          variant === 'wide' && 'h-36 sm:h-auto sm:min-h-52 sm:w-[38%] sm:shrink-0',
        )}
        style={{ background: `color-mix(in srgb, ${p.accentColour} 7%, #F8F7F3)` }}
      >
        <ProgrammeGlyph slug={p.slug} className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className={cn('flex flex-1 flex-col p-6', variant === 'feature' && 'md:p-8')}>
        <div className="flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-md" style={{ background: `color-mix(in srgb, ${p.accentColour} 12%, white)`, color: p.accentColour }}>
            <Icon className="size-[18px]" aria-hidden />
          </span>
          <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" aria-hidden />
        </div>
        <h3 className={cn('mt-5 font-display font-bold text-charcoal', variant === 'feature' ? 'text-h3' : 'text-xl')}>{p.title}</h3>
        <p className="mt-2 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">{variant === 'standard' ? p.tagline : p.description}</p>
        {variant === 'wide' && (
          <p className="mt-5 max-w-[60ch] border-t border-line pt-5 text-sm text-muted">
            Draws the other five programme areas together into income that lasts.
          </p>
        )}
      </div>
    </Link>
  )
}

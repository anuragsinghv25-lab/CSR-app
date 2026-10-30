import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Programme } from '@/data/types'
import { ProgrammeGlyph } from '@/components/illustrations/ProgrammeGlyph'
import { cn } from '@/lib/utils'

/** Full editorial row for the programmes index: challenge, interventions, outcomes. */
export function ProgrammePillarCard({ programme: p, flip }: { programme: Programme; flip?: boolean }) {
  const Icon = p.icon
  return (
    <article id={p.slug} className="grid gap-8 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-12" aria-labelledby={`${p.slug}-title`}>
      <div className={cn('lg:col-span-4', flip && 'lg:order-2 lg:col-start-9')}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg lg:aspect-[4/5]" style={{ background: `color-mix(in srgb, ${p.accentColour} 8%, #F8F7F3)` }}>
          <ProgrammeGlyph slug={p.slug} />
        </div>
      </div>
      <div className={cn('lg:col-span-7', flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-6')}>
        <p className="flex items-center gap-2 font-display text-sm font-semibold" style={{ color: p.accentColour }}>
          <Icon className="size-4" aria-hidden /> {p.tagline}
        </p>
        <h2 id={`${p.slug}-title`} className="mt-3 font-display text-h2 font-bold text-charcoal">{p.title}</h2>
        <p className="mt-4 max-w-[60ch] text-lead text-muted">{p.description}</p>

        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-semibold text-charcoal">Development challenge</dt>
            <dd className="mt-1.5 max-w-[62ch] text-muted">{p.developmentChallenge}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-charcoal">Intervention categories</dt>
            <dd className="mt-2">
              <ul className="grid gap-1.5 text-[0.95rem] text-muted">
                {p.interventions.map((iv) => <li key={iv.title}>{iv.title}</li>)}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-charcoal">Potential outcomes</dt>
            <dd className="mt-2">
              <ul className="grid gap-1.5 text-[0.95rem] text-muted">
                {p.expectedOutcomes.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </dd>
          </div>
        </dl>
        <Link
          to={`/programs/${p.slug}`}
          className="group mt-10 inline-flex items-center gap-2 rounded-md border border-[var(--accent)] px-5 py-3 font-display font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:bg-[var(--accent)] focus-visible:text-white"
          style={{ ['--accent' as string]: p.accentColour }}
        >
          Explore {p.title.toLowerCase()} programme
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

import type { Programme } from '@/data/types'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { ImageSlot } from '@/components/common/ImageSlot'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { ProgrammeGlyph } from '@/components/illustrations/ProgrammeGlyph'

export function ProgrammeHero({ programme: p }: { programme: Programme }) {
  const Icon = p.icon
  return (
    <header className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-14" style={{ background: `color-mix(in srgb, ${p.accentColour} 6%, #F8F7F3)` }}>
      <div className="container-rv">
        <Breadcrumb items={[{ label: 'Our Programs', to: '/programs' }, { label: p.title }]} />
        <div className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-display text-sm font-semibold" style={{ color: p.accentColour }}>
              <Icon className="size-5" aria-hidden /> Programme area
            </p>
            <h1 className="mt-5 font-display text-display font-extrabold text-charcoal">{p.title}</h1>
            <p className="mt-4 max-w-[30ch] font-display text-h3 font-medium text-charcoal/80">{p.tagline}</p>
            <p className="mt-6 max-w-[56ch] text-lead text-muted">{p.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton to="/partnerships/csr#enquiry" arrow>Partner on {p.title.toLowerCase()}</PrimaryButton>
              <SecondaryButton to={`/donate?programme=${p.slug}`}>Donate to this programme</SecondaryButton>
            </div>
            <StatusBadge
              status="pending"
              label="Programme theme"
              help="Programme themes come from the organisation’s prototype. Specific interventions are described as programme scope, not confirmed active projects."
              className="mt-6"
            />
          </div>
          <div className="lg:col-span-5">
            <ImageSlot
              slot={`programme-hero-${p.slug}`}
              className="aspect-[4/3] rounded-xl border border-white/60 bg-white/50 lg:aspect-square"
              fallback={<ProgrammeGlyph slug={p.slug} />}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

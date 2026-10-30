import type { Programme } from '@/data/types'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'

export function InterventionGrid({ programme: p }: { programme: Programme }) {
  return (
    <SectionContainer tone="white" labelledBy="interventions-title">
      <SectionHeading
        title={<span id="interventions-title">Intervention categories</span>}
        description="The kinds of work this programme area covers. Specific projects are designed with each community and partner."
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {p.interventions.map((iv) => (
          <div key={iv.title} className="bg-white p-6 md:p-8">
            <span aria-hidden className="block h-[3px] w-8 rounded-full" style={{ background: p.accentColour }} />
            <h3 className="mt-5 font-display text-xl font-bold text-charcoal">{iv.title}</h3>
            <p className="mt-2 max-w-[44ch] leading-relaxed text-muted">{iv.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}

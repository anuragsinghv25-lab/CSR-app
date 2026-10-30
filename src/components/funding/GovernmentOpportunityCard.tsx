import type { GovernmentOpportunity } from '@/data/types'
import { programmeBySlug } from '@/data/programmes'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function GovernmentOpportunityCard({ opportunity: o }: { opportunity: GovernmentOpportunity }) {
  const p = programmeBySlug[o.programme]
  const Icon = p.icon
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-muted">{o.fundingCategory}</span>
        <StatusBadge status="illustrative" label="Sample content" help="A sample collaboration format. Not a real tender, scheme approval, empanelment or funding call." />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-charcoal">{o.title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-muted">Programme</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1.5 font-semibold" style={{ color: p.accentColour }}>
            <Icon className="size-3.5" aria-hidden /> {p.title}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Status</dt>
          <dd className="mt-0.5 font-semibold text-charcoal">{o.status}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Geography</dt>
          <dd className="mt-0.5 text-charcoal">{o.geography}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Indicative duration</dt>
          <dd className="mt-0.5 text-charcoal">{o.duration}</dd>
        </div>
      </dl>
      <Accordion type="single" collapsible className="mt-auto pt-2">
        <AccordionItem value="d" className="border-b-0 border-t">
          <AccordionTrigger className="py-3 text-sm">Details</AccordionTrigger>
          <AccordionContent className="pb-2 text-sm">{o.details}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  )
}

import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { programmes } from '@/data/programmes'
import { governmentOpportunities, fundingCategories, collaborationModels } from '@/data/governmentOpportunities'
import { monitoringApproach } from '@/data/content'
import { credentialCategories } from '@/data/resources'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TextLink } from '@/components/common/TextLink'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeographicImpactMap, MapLegend } from '@/components/impact/GeographicImpactMap'
import { PartnershipProcessTimeline } from '@/components/funding/PartnershipProcessTimeline'
import { GovernmentOpportunityCard } from '@/components/funding/GovernmentOpportunityCard'
import { PartnershipEnquiryForm } from '@/components/funding/PartnershipEnquiryForm'
import { cn } from '@/lib/utils'

const govLifecycle = [
  { title: 'Scoping', description: 'Understand the institution’s mandate, programme, geography and expected results.', output: 'Scoping note' },
  { title: 'Joint design', description: 'Agree the collaboration model, roles, indicators and implementation plan.', output: 'Agreed work plan and indicators' },
  { title: 'Implementation', description: 'Field delivery or support through community institutions, aligned with public systems.', output: 'Progress reports' },
  { title: 'Review', description: 'Periodic joint reviews of progress, challenges and course corrections.', output: 'Review minutes and actions' },
  { title: 'Reporting and handover', description: 'Outcome reporting, documentation of learning and sustainability planning.', output: 'Completion and outcome report' },
]

export default function GovernmentPartnerships() {
  useDocumentTitle('Government Partnerships')
  const [category, setCategory] = useState<string>('all')
  const list = governmentOpportunities.filter((o) => category === 'all' || o.fundingCategory === category)

  return (
    <>
      <PageHero
        tone="soft"
        crumbs={[{ label: 'Partner With Us' }, { label: 'Government Partnerships' }]}
        eyebrow="For public institutions and development agencies"
        title="Collaborating with institutions to create sustainable community development."
        description="We work alongside government departments, public institutions, development agencies and funding bodies on programmes that serve communities."
        actions={
          <>
            <PrimaryButton to="#opportunities" size="lg">See collaboration formats</PrimaryButton>
            <SecondaryButton to="#enquiry" size="lg">Institutional enquiry</SecondaryButton>
          </>
        }
      />

      {/* Intro + alignment */}
      <SectionContainer tone="white" labelledBy="intro-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id="intro-title">Institutional collaboration</span>} />
            <p className="mt-5 text-lead text-muted">
              Public programmes reach at scale; community institutions make them stick. Collaboration brings the two together — with clear roles, shared indicators and transparent reporting.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-sm font-semibold text-charcoal">Programme alignment</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {programmes.map((p) => {
                const Icon = p.icon
                return (
                  <li key={p.slug} className="flex items-center gap-4 py-4">
                    <Icon className="size-5 shrink-0" style={{ color: p.accentColour }} aria-hidden />
                    <span className="flex-1 font-display text-lg font-semibold text-charcoal">{p.governmentThemes}</span>
                    <TextLink to={`/programs/${p.slug}`} className="text-sm">Programme</TextLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* Geography */}
      <SectionContainer tone="ivory" labelledBy="geo-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id="geo-title">Geographical presence</span>} description="Reference sources state presence in 14–15 states. The specific states shown here are illustrative until confirmed." />
            <div className="mt-6 flex gap-2">
              <StatusBadge status="unverified" />
              <StatusBadge status="illustrative" label="Illustrative map" />
            </div>
            <TextLink to="/impact#explorer" className="mt-8">Open the interactive explorer</TextLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <GeographicImpactMap interactive={false} className="mx-auto max-w-[480px]" />
            <MapLegend className="mx-auto mt-4 max-w-[480px]" />
          </div>
        </div>
      </SectionContainer>

      {/* Models */}
      <SectionContainer tone="white" labelledBy="models-title" bordered>
        <SectionHeading eyebrow="How we can work together" title={<span id="models-title">Potential collaboration models</span>} />
        <Tabs defaultValue={collaborationModels[0].id} className="mt-10">
          <TabsList aria-label="Collaboration models">
            {collaborationModels.map((m) => (
              <TabsTrigger key={m.id} value={m.id}>{m.title}</TabsTrigger>
            ))}
          </TabsList>
          {collaborationModels.map((m) => (
            <TabsContent key={m.id} value={m.id}>
              <div className="grid gap-8 md:grid-cols-2">
                <p className="font-display text-h3 font-semibold leading-snug text-charcoal">{m.summary}</p>
                <div className="border-l-2 border-yellow pl-6">
                  <p className="text-sm font-semibold text-charcoal">Suits</p>
                  <p className="mt-2 text-muted">{m.suits}</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionContainer>

      {/* Lifecycle */}
      <SectionContainer tone="navy" labelledBy="gl-title">
        <SectionHeading onDark eyebrow="Implementation lifecycle" title={<span id="gl-title">A shared, documented process</span>} />
        <div className="mt-14">
          <PartnershipProcessTimeline steps={govLifecycle} onDark />
        </div>
      </SectionContainer>

      {/* Monitoring + documentation */}
      <SectionContainer tone="ivory" labelledBy="mon-title">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 id="mon-title" className="font-display text-h3 font-bold">Monitoring and reporting</h2>
            <ol className="mt-8 grid gap-6">
              {monitoringApproach.map((m, i) => (
                <li key={m.title} className="flex gap-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-blue/40 font-display text-sm font-bold text-blue">{i + 1}</span>
                  <div>
                    <p className="font-display font-semibold text-charcoal">{m.title}</p>
                    <p className="mt-1 text-muted">{m.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-h3 font-bold">Institutional documentation</h2>
            <p className="mt-3 text-muted">To be published once supplied and verified. No registration or empanelment is claimed.</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {credentialCategories.map((c) => (
                <li key={c.title} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-charcoal">{c.title}</span>
                  <StatusBadge status="pending" label="Pending" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* Opportunity explorer */}
      <SectionContainer tone="white" id="opportunities" labelledBy="gopp-title" bordered>
        <SectionHeading
          eyebrow="Opportunity explorer"
          title={<span id="gopp-title">Sample collaboration opportunities</span>}
          description="Examples of how collaboration could be structured, grouped by funding category."
        />
        <div className="mt-6 flex gap-3 rounded-lg border border-[#e9c46a] bg-yellow-soft p-4 text-sm text-[#5c4100]">
          <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>Sample prototype content. These are not real tenders, scheme approvals, empanelments or funding calls, and no government system is connected.</p>
        </div>
        <div role="radiogroup" aria-label="Funding category" className="mt-8 flex flex-wrap gap-2">
          {['all', ...fundingCategories].map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'h-10 rounded-md border px-3.5 font-display text-sm font-semibold transition-colors',
                category === c ? 'border-charcoal bg-charcoal text-white' : 'border-line-strong bg-white text-charcoal hover:border-charcoal',
              )}
            >
              {c === 'all' ? 'All categories' : c}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted" aria-live="polite">{list.length} sample {list.length === 1 ? 'opportunity' : 'opportunities'}</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => (
            <GovernmentOpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      </SectionContainer>

      {/* Enquiry */}
      <SectionContainer tone="sand" id="enquiry" labelledBy="genq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Get in touch" title={<span id="genq-title">Institutional enquiry</span>} />
            <p className="mt-5 text-muted">Share the programme and geography you have in mind. Our team will follow up to scope the collaboration.</p>
          </div>
          <div className="rounded-xl border border-line bg-white p-6 md:p-10 lg:col-span-8">
            <PartnershipEnquiryForm variant="government" />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

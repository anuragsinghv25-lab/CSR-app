import { useSearchParams } from 'react-router-dom'
import { FileCheck2, Mail } from 'lucide-react'
import { programmes } from '@/data/programmes'
import { whyPartner } from '@/data/content'
import { credentialCategories } from '@/data/resources'
import { organisation } from '@/data/organisation'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TextLink } from '@/components/common/TextLink'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgrammeGlyph } from '@/components/illustrations/ProgrammeGlyph'
import { PartnershipProcessTimeline } from '@/components/funding/PartnershipProcessTimeline'
import { OpportunityExplorer } from '@/components/funding/OpportunityExplorer'
import { PartnershipEnquiryForm } from '@/components/funding/PartnershipEnquiryForm'

const alignmentLabel: Record<string, string> = {
  skills: 'Education and skills development',
  women: 'Women’s empowerment',
}

export default function CSRPartnerships() {
  useDocumentTitle('Corporate CSR Partnerships')
  const [params] = useSearchParams()
  const programmeParam = params.get('programme') ?? undefined

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Partner With Us' }, { label: 'Corporate CSR' }]}
        eyebrow="For CSR teams, foundations and ESG leaders"
        title="Turn your CSR vision into measurable community impact."
        description="Build meaningful partnerships with RAINVOUS to support sustainable development initiatives across communities."
        actions={
          <>
            <PrimaryButton to="#opportunities" size="lg">Explore Partnership Opportunities</PrimaryButton>
            <SecondaryButton to="#enquiry" size="lg">Start an Enquiry</SecondaryButton>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {[
              ['6', 'programme areas'],
              ['5', 'step partnership lifecycle'],
              ['30+', 'years of work'],
              ['100+', 'partners'],
            ].map(([n, l]) => (
              <div key={l} className="bg-white p-6">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-display text-4xl font-extrabold tracking-[-0.03em] text-blue">{n}</span>
                  <span className="mt-1 block text-sm text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Why partner */}
      <SectionContainer tone="white" labelledBy="why-title" bordered>
        <SectionHeading eyebrow="Why RAINVOUS" title={<span id="why-title">Why partner with RAINVOUS?</span>} />
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {whyPartner.map((w) => (
            <div key={w.title} className="border-t border-charcoal/15 pt-6">
              <h3 className="font-display text-xl font-bold text-charcoal">{w.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{w.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Alignment */}
      <SectionContainer tone="ivory" labelledBy="align-title">
        <SectionHeading
          eyebrow="Programme alignment"
          title={<span id="align-title">Find where your CSR priorities fit</span>}
          description="Each programme area maps to common CSR focus themes. Final alignment with your policy and applicable regulations is confirmed during discovery."
        />
        <Tabs defaultValue={programmeParam && programmes.some((p) => p.slug === programmeParam) ? programmeParam : 'water'} className="mt-10">
          <TabsList aria-label="Programme areas">
            {programmes.map((p) => (
              <TabsTrigger key={p.slug} value={p.slug}>{alignmentLabel[p.slug] ?? p.title}</TabsTrigger>
            ))}
          </TabsList>
          {programmes.map((p) => (
            <TabsContent key={p.slug} value={p.slug}>
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="hidden overflow-hidden rounded-lg md:block lg:col-span-3" style={{ background: `color-mix(in srgb, ${p.accentColour} 8%, #F8F7F3)` }}>
                  <ProgrammeGlyph slug={p.slug} className="aspect-square" />
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-display text-h3 font-bold text-charcoal">{alignmentLabel[p.slug] ?? p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-6 text-sm font-semibold text-charcoal">Typical CSR focus themes</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.csrThemes.map((t) => (
                      <li key={t} className="rounded-sm bg-soft-blue px-2.5 py-1 text-sm text-blue">{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-sm font-semibold text-charcoal">What a partnership could include</p>
                  <ul className="mt-3 divide-y divide-line border-y border-line">
                    {p.interventions.map((iv) => (
                      <li key={iv.title} className="py-3">
                        <p className="font-display font-semibold text-charcoal">{iv.title}</p>
                        <p className="text-sm text-muted">{iv.description}</p>
                      </li>
                    ))}
                  </ul>
                  <TextLink to={`/programs/${p.slug}`} className="mt-5">Programme details</TextLink>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionContainer>

      {/* Lifecycle */}
      <SectionContainer tone="navy" labelledBy="lifecycle-title">
        <SectionHeading
          onDark
          eyebrow="Partnership lifecycle"
          title={<span id="lifecycle-title">From first conversation to impact report</span>}
          description="A clear, five-step process with defined outputs at every stage."
        />
        <div className="mt-14">
          <PartnershipProcessTimeline onDark />
        </div>
      </SectionContainer>

      {/* Opportunities */}
      <SectionContainer tone="ivory" id="opportunities" labelledBy="opp-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Opportunity explorer"
            title={<span id="opp-title">Partnership opportunities</span>}
            description="Sample project concepts to show how opportunities will be presented. Real opportunities are shaped with each partner."
          />
          <StatusBadge status="illustrative" label="Illustrative prototype data" />
        </div>
        <div className="mt-10">
          <OpportunityExplorer />
        </div>
      </SectionContainer>

      {/* Credentials */}
      <SectionContainer tone="white" labelledBy="cred-title" bordered>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={<span id="cred-title">Institutional credentials</span>} />
            <p className="mt-5 text-muted">
              The documents CSR teams typically need for due diligence. None are published yet; each will be added once supplied and verified.
            </p>
            <TextLink to="/resources" className="mt-6">Resource library</TextLink>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {credentialCategories.map((c) => (
              <li key={c.title} className="flex items-start gap-4 bg-white p-5">
                <FileCheck2 className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden />
                <div className="flex-1">
                  <p className="font-display font-semibold text-charcoal">{c.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{c.note}</p>
                  <StatusBadge status="pending" label="Not yet confirmed" className="mt-3" help="Existence and status of this document have not been confirmed. No download is offered." />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>

      {/* Enquiry */}
      <SectionContainer tone="sand" id="enquiry" labelledBy="enquiry-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Start a conversation" title={<span id="enquiry-title">Partnership enquiry</span>} />
            <p className="mt-5 text-muted">Tell us about your CSR priorities. It takes about three minutes, and you can review everything before sending.</p>
            <p className="mt-8 flex items-start gap-2 text-sm text-muted">
              <Mail className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
              <span>
                Prefer email? <a className="font-semibold text-blue hover:underline" href={`mailto:${organisation.email}`}>{organisation.email}</a>
                <span className="block text-xs">Address to be confirmed before launch</span>
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-line bg-white p-6 md:p-10 lg:col-span-8">
            <PartnershipEnquiryForm variant="csr" defaultProgramme={programmeParam} />
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

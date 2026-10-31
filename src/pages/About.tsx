import { Award, BadgeCheck } from 'lucide-react'
import { organisation, milestones, recognitions, governance } from '@/data/organisation'
import { partners } from '@/data/partners'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TextLink } from '@/components/common/TextLink'
import { PartnerLogoCard } from '@/components/common/PartnerLogoCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ImpactOverview } from '@/components/impact/ImpactOverview'
import { ImpactTimeline } from '@/components/impact/ImpactTimeline'
import { GeographicImpactMap } from '@/components/impact/GeographicImpactMap'
import { ProgrammeCTA } from '@/components/programmes/ProgrammeCTA'
import { RippleField } from '@/components/illustrations/RippleField'

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About Rainvows"
        title="Building lasting prosperity with communities."
        description={organisation.summary}
        aside={
          <div className="relative mx-auto aspect-square max-w-[360px] rounded-full bg-navy">
            <RippleField className="absolute inset-0 size-full" rings={8} />
          </div>
        }
      />

      {/* Who we are */}
      <SectionContainer tone="white" labelledBy="who-title" bordered>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id="who-title">Who we are</span>} />
          </div>
          <div className="grid gap-5 text-lead text-muted lg:col-span-7">
            <p className="font-display text-h3 font-semibold leading-snug text-charcoal">
              A social development organisation working towards sustainable livelihoods and community prosperity.
            </p>
            <p>
              We work across six connected programme areas — skill development, water, agriculture, health, women’s empowerment and
              livelihoods — because lasting prosperity rarely comes from a single intervention. Skill development comes first:
              we work with Self-Help Groups under Skill India schemes.
            </p>
            <p>
              We partner with corporate CSR teams, individual donors, government institutions and development organisations
              to design, deliver and measure programmes with the communities they serve.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Mission & vision */}
      <section className="grid md:grid-cols-2" aria-label="Mission and vision">
        <div className="bg-blue px-5 py-16 text-white md:px-12 md:py-24 lg:pl-[max(40px,calc((100vw-1280px)/2+40px))]">
          <p className="font-display text-sm font-semibold text-yellow">Mission</p>
          <p className="mt-4 max-w-[30ch] font-display text-h3 font-semibold leading-snug">{organisation.mission}</p>
        </div>
        <div className="bg-terracotta-soft px-5 py-16 md:px-12 md:py-24">
          <p className="font-display text-sm font-semibold text-terracotta-ink">Vision</p>
          <p className="mt-4 max-w-[22ch] font-display text-h2 font-bold leading-tight text-charcoal">{organisation.vision}</p>
        </div>
      </section>

      {/* History + timeline */}
      <SectionContainer tone="navy" labelledBy="history-title">
        <SectionHeading
          onDark
          eyebrow="Organisational history"
          title={<span id="history-title">How the approach took shape</span>}
          description="The founding year and milestone details have not yet been supplied. Each milestone below is marked until the organisation confirms it."
        />
        <div className="mt-14">
          <ImpactTimeline milestones={milestones} />
        </div>
      </SectionContainer>

      {/* Leadership & governance */}
      <SectionContainer tone="ivory" labelledBy="gov-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title={<span id="gov-title">Leadership and governance</span>} />
            <p className="mt-5 text-muted">Names and profiles of leadership and Board members will be published once confirmed by the organisation.</p>
            <StatusBadge status="pending" className="mt-5" />
          </div>
          <Accordion type="single" collapsible defaultValue="Board" className="border-t border-line lg:col-span-7 lg:col-start-6">
            {governance.map((g) => (
              <AccordionItem key={g.role} value={g.role}>
                <AccordionTrigger>{g.role}</AccordionTrigger>
                <AccordionContent>{g.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      {/* Numbers + geography */}
      <SectionContainer tone="white" labelledBy="reach-title" bordered>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading title={<span id="reach-title">Geographic presence</span>} description="Reference figures from the organisation’s existing website. State-level presence is shown illustratively." />
            <ImpactOverview className="mt-10 lg:grid-cols-2" />
            <TextLink to="/impact#explorer" className="mt-10">Explore by state</TextLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <GeographicImpactMap interactive={false} />
          </div>
        </div>
      </SectionContainer>

      {/* Recognition */}
      <SectionContainer tone="sand" labelledBy="recog-title">
        <SectionHeading title={<span id="recog-title">Recognition and certifications</span>} description="Displayed on the organisation’s existing website. Both await documentary verification; no claim of current validity is made." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {recognitions.map((r, i) => {
            const Icon = i === 0 ? BadgeCheck : Award
            return (
              <article key={r.id} className="flex gap-6 rounded-xl border border-line bg-white p-7">
                <Icon className="size-10 shrink-0 text-blue" strokeWidth={1.4} aria-hidden />
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal">{r.title}</h3>
                  <p className="mt-1 font-display text-3xl font-extrabold tracking-[-0.02em] text-blue">{r.value}</p>
                  <p className="mt-3 text-sm text-muted">{r.description}</p>
                  <StatusBadge status="pending" help={r.note} label="Awaiting documentary verification" className="mt-4" />
                </div>
              </article>
            )
          })}
        </div>
      </SectionContainer>

      {/* Institutional partners */}
      <SectionContainer tone="ivory" labelledBy="ip-title">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="ip-title" className="font-display text-h3 font-bold">Institutional partners</h2>
            <p className="mt-3 text-sm text-muted">Named on the existing website. Further partners will be listed once confirmed.</p>
          </div>
          <div className="flex flex-wrap border-r border-line lg:col-span-8">
            {partners.map((p) => (
              <PartnerLogoCard key={p.id} partner={p} />
            ))}
          </div>
        </div>
      </SectionContainer>

      <ProgrammeCTA />
    </>
  )
}

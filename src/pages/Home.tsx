import { Building2, HandHeart, Landmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { programmeBySlug, programmes } from '@/data/programmes'
import { organisationMetrics } from '@/data/organisation'
import { impactProcess } from '@/data/content'
import { partners } from '@/data/partners'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { AnnouncementBadge } from '@/components/common/AnnouncementBadge'
import { ImageSlot } from '@/components/common/ImageSlot'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TextLink } from '@/components/common/TextLink'
import { Timeline } from '@/components/common/Timeline'
import { PartnerLogoCard } from '@/components/common/PartnerLogoCard'
import { HeroConfluence } from '@/components/illustrations/HeroConfluence'
import { PillarDiagram } from '@/components/illustrations/PillarDiagram'
import { ProgrammeCard } from '@/components/programmes/ProgrammeCard'
import { ProgrammeCTA } from '@/components/programmes/ProgrammeCTA'
import { FundingPathwayCard } from '@/components/funding/FundingPathwayCard'
import { ImpactOverview } from '@/components/impact/ImpactOverview'
import { GeographicImpactMap, MapLegend } from '@/components/impact/GeographicImpactMap'
import { StatCounter } from '@/components/common/StatCounter'

export default function Home() {
  useDocumentTitle('')
  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="container-rv grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <AnnouncementBadge>Figures and documents pending verification</AnnouncementBadge>
              <h1 className="mt-7 max-w-[17ch] font-display text-display font-extrabold text-charcoal">
                Together, we can build a future where prosperity reaches everyone.
              </h1>
              <p className="mt-7 max-w-[48ch] text-lead text-muted">
                Connecting corporate responsibility, individual generosity and institutional partnerships to create sustainable community impact.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <PrimaryButton to="/impact" size="lg" arrow>Explore Our Impact</PrimaryButton>
                <SecondaryButton to="/#pathways" size="lg">Partner With Us</SecondaryButton>
              </div>
            </motion.div>
          </div>
          <div className="relative lg:col-span-6">
            <ImageSlot
              slot="home-hero"
              className="mx-auto w-full max-w-[420px] sm:max-w-[520px] lg:max-w-none"
              fallback={<HeroConfluence />}
            />
            <ul className="mx-auto mt-4 flex max-w-[520px] flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted lg:max-w-none" aria-label="Programme areas in the illustration">
              {programmes.map((p) => (
                <li key={p.slug} className="flex items-center gap-1.5">
                  <span aria-hidden className="size-2 rounded-full" style={{ background: p.accentColour }} />
                  {p.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Impact at a glance */}
      <SectionContainer tone="white" labelledBy="glance-title" className="border-y border-line">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="glance-title" className="max-w-[24ch] font-display text-h3 font-bold text-charcoal">Our work, in four numbers</h2>
          <StatusBadge status="reference" label="Reference figures" />
        </div>
        <ImpactOverview className="mt-12" />
      </SectionContainer>

      {/* Philosophy */}
      <SectionContainer tone="navy" labelledBy="philosophy-title" className="overflow-hidden">
        <div aria-hidden className="rv-grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
        <div className="relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              onDark
              eyebrow="Our philosophy"
              title={<span id="philosophy-title">Change doesn’t happen in isolation.</span>}
            />
            <div className="mt-6 grid gap-4 text-lead text-white/75">
              <p>A training course changes little if there is no work nearby. A new well means little if the harvest still fails, or if illness keeps someone at home.</p>
              <p>Our 360-degree approach connects six programme areas so that each one strengthens the others — and together they add up to lasting community prosperity.</p>
            </div>
            <TextLink to="/approach" onDark className="mt-8">See how the approach works</TextLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <PillarDiagram mode="link" onDark />
          </div>
        </div>
      </SectionContainer>

      {/* Programmes */}
      <SectionContainer tone="ivory" labelledBy="programmes-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our programmes"
            title={<span id="programmes-title">Six areas of work, designed to connect</span>}
            description="Led by skill development with Self-Help Groups under Skill India schemes. Each area addresses a distinct need; together they form one approach to community prosperity."
          />
          <TextLink to="/programs">All programmes</TextLink>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-6 lg:grid-cols-12">
          <ProgrammeCard programme={programmeBySlug.skills} variant="feature" className="md:col-span-6 lg:col-span-7" />
          <ProgrammeCard programme={programmeBySlug.water} variant="feature" className="md:col-span-6 lg:col-span-5" />
          <ProgrammeCard programme={programmeBySlug.agriculture} className="md:col-span-2 lg:col-span-4" />
          <ProgrammeCard programme={programmeBySlug.health} className="md:col-span-2 lg:col-span-4" />
          <ProgrammeCard programme={programmeBySlug.women} className="md:col-span-2 lg:col-span-4" />
          <ProgrammeCard programme={programmeBySlug.livelihoods} variant="wide" className="md:col-span-6 lg:col-span-12" />
        </div>
      </SectionContainer>

      {/* How we create impact */}
      <SectionContainer tone="white" labelledBy="process-title" bordered>
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="How we work"
            title={<span id="process-title">How we create impact</span>}
          />
          <p className="text-lead text-muted lg:col-span-6 lg:col-start-7 lg:pt-10">
            Every programme follows the same cycle: listen, design, deliver, measure — and feed what we learn back into the next round.
          </p>
        </div>
        <Timeline steps={impactProcess} className="mt-14" />
      </SectionContainer>

      {/* Partnership pathways */}
      <SectionContainer tone="ivory" id="pathways" labelledBy="pathways-title">
        <SectionHeading
          eyebrow="Partner with us"
          title={<span id="pathways-title">One mission. Multiple ways to create change.</span>}
          description="Choose the route that fits you. Each has its own process, team and reporting."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <FundingPathwayCard
            className="lg:col-span-6 lg:row-span-2"
            tone="navy"
            icon={Building2}
            audience="For CSR teams and foundations"
            title="Corporate CSR"
            description="Build strategic partnerships that translate corporate responsibility into measurable community impact."
            cta="Explore CSR Partnerships"
            to="/partnerships/csr"
            points={['Programmes aligned to your CSR policy', 'Defined indicators and reporting', 'A five-step partnership lifecycle']}
          />
          <FundingPathwayCard
            className="lg:col-span-6"
            tone="warm"
            icon={HandHeart}
            audience="For individuals"
            title="Individual Donations"
            description="Support sustainable development and contribute towards stronger, more resilient communities."
            cta="Explore Giving"
            to="/donate"
          />
          <FundingPathwayCard
            className="lg:col-span-6"
            tone="soft"
            icon={Landmark}
            audience="For public institutions"
            title="Government Partnerships"
            description="Collaborate on institutional development initiatives and public-interest programmes."
            cta="Explore Government Partnerships"
            to="/partnerships/government"
          />
        </div>
      </SectionContainer>

      {/* Geographic presence */}
      <SectionContainer tone="soft" labelledBy="presence-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Where we work" title={<span id="presence-title">Present across India</span>} />
            <p className="mt-8 font-display text-[clamp(4rem,3rem+4vw,7rem)] font-extrabold leading-none tracking-[-0.05em] text-blue">
              <StatCounter value={organisationMetrics.statesCovered.value} />
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-charcoal">states of geographical presence</p>
            <p className="mt-4 max-w-[44ch] text-muted">
              Source material shows both 14 and 15 states, and the specific states have not yet been confirmed. The map shows an illustrative distribution.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge status="unverified" help={organisationMetrics.statesCovered.note} />
              <StatusBadge status="illustrative" label="Illustrative map" />
            </div>
            <TextLink to="/impact#explorer" className="mt-8">Explore the impact map</TextLink>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <GeographicImpactMap interactive={false} className="mx-auto max-w-[520px]" />
            <MapLegend className="mx-auto mt-4 max-w-[520px]" />
          </div>
        </div>
      </SectionContainer>

      {/* Partners */}
      <section className="border-b border-line bg-ivory py-14 md:py-16" aria-labelledby="partners-title">
        <div className="container-rv grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="partners-title" className="font-display text-xl font-bold text-charcoal">Partners</h2>
            <p className="mt-2 max-w-[38ch] text-sm text-muted">
              Organisations named on the existing website. Logos and partnership details will be added once confirmed.
            </p>
          </div>
          <div className="flex flex-wrap border-r border-line lg:col-span-8">
            {partners.map((p) => (
              <PartnerLogoCard key={p.id} partner={p} />
            ))}
            <div className="flex h-24 flex-col justify-center border-l border-line px-6 text-sm text-muted sm:px-8">
              <span className="font-display font-semibold text-charcoal">100+ partners</span>
              <span className="text-xs">Reference figure, list pending</span>
            </div>
          </div>
        </div>
      </section>

      <ProgrammeCTA />
    </>
  )
}

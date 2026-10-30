import { useSearchParams } from 'react-router-dom'
import { programmes } from '@/data/programmes'
import { contributionUses, donationFaqs } from '@/data/content'
import type { ProgrammeSlug } from '@/data/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { TextLink } from '@/components/common/TextLink'
import { PrimaryButton } from '@/components/common/Buttons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DonationCalculator } from '@/components/funding/DonationCalculator'

export default function Donations() {
  useDocumentTitle('Donate')
  const [params] = useSearchParams()
  const p = params.get('programme')
  const initial = (programmes.some((x) => x.slug === p) ? p : 'any') as ProgrammeSlug | 'any'

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Partner With Us' }, { label: 'Individual Donations' }]}
        eyebrow="Give as an individual"
        title="Your contribution can help create lasting change."
        description="Donations support sustainable development initiatives across water, agriculture, skills, health, women’s empowerment and livelihoods. Choose a programme, or let us direct your gift where it’s needed most."
      />

      <SectionContainer tone="white" id="give" labelledBy="give-title" bordered>
        <h2 id="give-title" className="sr-only">Make a donation</h2>
        <DonationCalculator key={initial} initialProgramme={initial} />
      </SectionContainer>

      <SectionContainer tone="ivory" labelledBy="uses-title">
        <SectionHeading
          eyebrow="Where it goes"
          title={<span id="uses-title">How contributions support programmes</span>}
          description="Gifts are pooled within programme budgets rather than tied to a fixed per-rupee outcome. That lets each programme fund what communities need most."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {contributionUses.map((u, i) => (
            <div key={u.title}>
              <span aria-hidden className="block h-1 w-10 rounded-full" style={{ background: ['#164A91', '#C9572B', '#FDBB19'][i] }} />
              <h3 className="mt-5 font-display text-xl font-bold text-charcoal">{u.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{u.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer tone="navy" labelledBy="trust-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            onDark
            className="lg:col-span-5"
            eyebrow="Transparency"
            title={<span id="trust-title">Accountable for every contribution</span>}
          />
          <div className="grid gap-5 text-lead text-white/75 lg:col-span-6 lg:col-start-7">
            <p>Annual reports and audited financial statements will be published in the resource library once supplied and verified.</p>
            <p>Tax-exemption status, including any 80G registration, is pending verification and will be confirmed before donations go live.</p>
            <TextLink to="/resources" onDark>Reports and documents</TextLink>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer tone="white" labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" title={<span id="faq-title">Donation questions</span>} />
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line lg:col-span-8">
            {donationFaqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      <section className="bg-terracotta-soft py-16 md:py-20" aria-labelledby="donate-cta">
        <div className="container-rv flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 id="donate-cta" className="max-w-[24ch] font-display text-h2 font-bold text-charcoal">Every lasting change starts with someone choosing to help.</h2>
          <PrimaryButton to="#give" variant="accent" size="lg">Choose an amount</PrimaryButton>
        </div>
      </section>
    </>
  )
}

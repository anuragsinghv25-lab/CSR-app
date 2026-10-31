import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { programmes, programmeBySlug } from '@/data/programmes'
import type { Programme, ProgrammeSlug } from '@/data/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PrimaryButton } from '@/components/common/Buttons'
import { PillarDiagram } from '@/components/illustrations/PillarDiagram'
import { cn } from '@/lib/utils'

function PillarDetail({ p }: { p: Programme }) {
  return (
    <div>
      <p className="text-sm font-semibold" style={{ color: p.accentColour }}>{p.tagline}</p>
      <h3 className="mt-2 font-display text-h2 font-bold text-charcoal">{p.title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
      <dl className="mt-6 grid gap-5">
        <div>
          <dt className="text-sm font-semibold text-charcoal">Development challenge</dt>
          <dd className="mt-1 text-muted">{p.developmentChallenge}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-charcoal">Possible interventions</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {p.interventions.map((iv) => (
              <span key={iv.title} className="rounded-sm border border-line-strong bg-white px-2.5 py-1 text-sm text-charcoal">{iv.title}</span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-charcoal">Expected outcomes</dt>
          <dd>
            <ul className="mt-2 grid gap-1.5 text-muted">
              {p.expectedOutcomes.map((o) => (
                <li key={o} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: p.accentColour }} />
                  {o}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <Link to={`/programs/${p.slug}`} className="group mt-7 inline-flex items-center gap-1.5 font-display font-semibold text-blue hover:underline">
        Explore the {p.title.toLowerCase()} programme
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </div>
  )
}

const reasons = [
  {
    title: 'Needs are connected',
    body: 'A family’s income depends on water for crops, health to work and skills to diversify. Fixing one link leaves the others to break.',
  },
  {
    title: 'Gains erode without support',
    body: 'A training course or a new structure can fade without the institutions, markets and services that let people use it.',
  },
  {
    title: 'Communities decide what matters',
    body: 'An integrated plan, made with the community, lets each programme area reinforce the next instead of competing for attention.',
  },
]

export default function Approach() {
  useDocumentTitle('Our Approach')
  const [selected, setSelected] = useState<ProgrammeSlug>('skills')
  const [openMobile, setOpenMobile] = useState<ProgrammeSlug | null>('skills')

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Our Approach' }]}
        eyebrow="The 360-degree approach"
        title="Prosperity is built through interconnected opportunities."
        description="Six programme areas, planned together around one outcome: community prosperity. Select a pillar to see how it contributes."
      />

      <SectionContainer tone="white" labelledBy="model-title" bordered>
        <h2 id="model-title" className="sr-only">Interactive model</h2>
        {/* Desktop: diagram + detail */}
        <div className="hidden items-center gap-12 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <PillarDiagram mode="select" selected={selected} onSelect={setSelected} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={selected} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
                <PillarDetail p={programmeBySlug[selected]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: vertical interactive sequence */}
        <div className="lg:hidden">
          <div className="relative mx-auto mb-8 grid size-36 place-items-center rounded-full bg-navy text-center">
            <p className="font-display text-xs font-extrabold uppercase leading-tight tracking-[0.08em] text-white">
              Community
              <br />
              prosperity
            </p>
          </div>
          <ol className="relative border-l border-line-strong pl-6">
            {programmes.map((p) => {
              const Icon = p.icon
              const open = openMobile === p.slug
              return (
                <li key={p.slug} className="relative pb-3">
                  <span aria-hidden className="absolute -left-[31px] top-4 size-3 rounded-full border-2 border-white" style={{ background: p.accentColour }} />
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`pillar-${p.slug}`}
                    onClick={() => setOpenMobile(open ? null : p.slug)}
                    className={cn('flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors', open ? 'border-transparent bg-ivory' : 'border-line bg-white')}
                  >
                    <Icon className="size-5" style={{ color: p.accentColour }} aria-hidden />
                    <span className="flex-1 font-display font-semibold text-charcoal">{p.title}</span>
                    <ChevronDown className={cn('size-4 text-muted transition-transform', open && 'rotate-180')} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`pillar-${p.slug}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-1 pb-6 pt-5">
                          <PillarDetail p={p} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ol>
        </div>
      </SectionContainer>

      <SectionContainer tone="sand" labelledBy="why-title">
        <SectionHeading
          eyebrow="Why integrate"
          title={<span id="why-title">Why isolated interventions are rarely enough</span>}
          description="Single-issue projects can deliver outputs. Lasting prosperity needs the connections between them."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="border-t-2 border-charcoal pt-6">
              <h3 className="font-display text-xl font-bold text-charcoal">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer tone="ivory" labelledBy="invite-title">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading title={<span id="invite-title">See each programme in depth</span>} description="Challenges, interventions, outcomes and how each programme area is measured." />
          <PrimaryButton to="/programs" size="lg" arrow>Explore programmes</PrimaryButton>
        </div>
      </SectionContainer>
    </>
  )
}

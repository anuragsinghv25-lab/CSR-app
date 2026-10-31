import { Link } from 'react-router-dom'
import { ArrowRight, ShieldAlert } from 'lucide-react'
import type { Programme } from '@/data/types'
import { programmeBySlug } from '@/data/programmes'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Timeline } from '@/components/common/Timeline'
import { TextLink } from '@/components/common/TextLink'
import { GeographicImpactMap, MapLegend } from '@/components/impact/GeographicImpactMap'

/**
 * Programme deep-dive, rendered only for programmes that define `spotlight`
 * (currently Skill Development). Every organisation-specific fact that has
 * not been supplied is shown as an explicit "to be confirmed" placeholder.
 */
export function ProgrammeSpotlight({ programme: p }: { programme: Programme }) {
  const s = p.spotlight
  if (!s) return null
  const related = [programmeBySlug.livelihoods, programmeBySlug.women]

  return (
    <>
      {/* Positioning */}
      <section className="on-dark bg-navy text-white" aria-labelledby="positioning-title">
        <div className="container-rv section-y">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="positioning-title" className="font-display text-sm font-semibold text-yellow">Our focus: Self-Help Groups under Skill India schemes</h2>
            {s.positioningStatus === 'draft' && (
              <StatusBadge
                status="pending"
                label="Draft — for approval"
                help="Draft positioning written for review. Rainvows should approve or edit this wording before launch."
                onDark
              />
            )}
          </div>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <p className="max-w-[28ch] font-display text-h2 font-semibold leading-tight text-white lg:col-span-8">{s.positioning}</p>
            {s.schemeLogo && (
              <figure className="lg:col-span-4 lg:col-start-9">
                <div className="max-w-[260px] rounded-xl bg-white p-5 lg:max-w-none lg:p-6">
                  <img src={s.schemeLogo.src} alt={s.schemeLogo.alt} width={640} height={532} className="mx-auto h-auto w-full max-w-[260px]" loading="lazy" />
                </div>
                <figcaption className="mt-3 text-sm text-white/70">{s.schemeLogo.caption}</figcaption>
              </figure>
            )}
          </div>
          <div className="mt-14 grid gap-8 border-t border-white/15 pt-10 md:grid-cols-3">
            {s.context.map((c) => (
              <p key={c.slice(0, 24)} className="leading-relaxed text-white/75">{c}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway */}
      <SectionContainer tone="white" labelledBy="pathway-title">
        <SectionHeading
          eyebrow="How it works"
          title={<span id="pathway-title">From Self-Help Group to sustainable livelihood</span>}
          description="The intended pathway for skill development work with SHGs. Specific activities are designed with each group and partner."
        />
        <Timeline steps={s.pathway} className="mt-14" />
      </SectionContainer>

      {/* Scheme alignment + facts to confirm */}
      <SectionContainer tone="sand" labelledBy="schemes-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id="schemes-title">Skill India scheme alignment</span>} />
            <p className="mt-5 leading-relaxed text-muted">{s.schemeAlignment.summary}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              For context, schemes in the wider Skill India ecosystem include {s.schemeAlignment.ecosystemExamples.join(' and ')}.
              They are named here as examples only and do not indicate Rainvows’ participation.
            </p>
            <div className="mt-8 flex gap-3 rounded-lg border border-[#e9c46a] bg-yellow-soft p-4 text-sm text-[#5c4100]">
              <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              <p>
                The Skill India logo is shown because Rainvows works under Skill India schemes. Its use follows Skill India’s branding
                guidelines; scheme names, Rainvows’ role and any accreditation will be published once documentation is confirmed.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-charcoal">Details to be confirmed by Rainvows</h3>
              <StatusBadge status="pending" />
            </div>
            <dl className="mt-5 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
              {s.placeholders.map((ph) => (
                <div key={ph.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                  <dt>
                    <span className="block font-display font-semibold text-charcoal">{ph.label}</span>
                    <span className="block text-sm text-muted">{ph.note}</span>
                  </dt>
                  <dd className="text-sm font-medium text-terracotta-ink">To be confirmed</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionContainer>

      {/* Link to livelihoods + where it works */}
      <SectionContainer tone="ivory" labelledBy="connects-title">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id="connects-title">Where skills lead</span>} />
            <p className="mt-5 text-lead text-muted">{s.livelihoodLink}</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {related.map((r) => {
                const Icon = r.icon
                return (
                  <li key={r.slug}>
                    <Link to={`/programs/${r.slug}`} className="group flex items-center gap-4 py-4">
                      <Icon className="size-5 shrink-0" style={{ color: r.accentColour }} aria-hidden />
                      <span className="flex-1">
                        <span className="block font-display font-semibold text-charcoal group-hover:text-blue">{r.title}</span>
                        <span className="block text-sm text-muted">{r.tagline}</span>
                      </span>
                      <ArrowRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-charcoal">Where this programme could work</h3>
              <StatusBadge status="illustrative" label="Illustrative map" help="Sample states for demonstration. Actual training locations are to be confirmed." />
            </div>
            <GeographicImpactMap filter={p.slug} interactive={false} className="mx-auto mt-5 max-w-[440px]" />
            <div className="mx-auto mt-4 flex max-w-[440px] flex-wrap items-end justify-between gap-4">
              <MapLegend />
              <TextLink to={`/impact?programme=${p.slug}#explorer`} className="text-sm">Explore by state</TextLink>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

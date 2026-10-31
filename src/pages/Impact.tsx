import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { caseStudies, stateImpact, ILLUSTRATIVE_NOTE } from '@/data/impact'
import { programmeBySlug, programmeSlugs } from '@/data/programmes'
import type { ProgrammeSlug } from '@/data/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { SectionHeading } from '@/components/common/SectionHeading'
import { StatusBadge } from '@/components/common/StatusBadge'
import { PrimaryButton } from '@/components/common/Buttons'
import { SelectField } from '@/components/forms/Field'
import { ImpactOverview } from '@/components/impact/ImpactOverview'
import { ImpactFilterBar, type ProgrammeFilter } from '@/components/impact/ImpactFilterBar'
import { GeographicImpactMap, MapLegend } from '@/components/impact/GeographicImpactMap'
import { StateDetailPanel } from '@/components/impact/StateDetailPanel'
import { ImpactMetricGrid } from '@/components/impact/ImpactMetricGrid'
import { ImpactStoryCard } from '@/components/impact/ImpactStoryCard'
import {
  GeographyChart,
  OutcomeComparison,
  ProgrammeDistributionChart,
  YearlyTrendChart,
} from '@/components/impact/ProgrammeImpactChart'

export default function Impact() {
  useDocumentTitle('Our Impact')
  const [params] = useSearchParams()
  const param = params.get('programme')
  const initialFilter: ProgrammeFilter = programmeSlugs.includes(param as ProgrammeSlug) ? (param as ProgrammeSlug) : 'all'
  const [mapFilter, setMapFilter] = useState<ProgrammeFilter>(initialFilter)
  const [selectedState, setSelectedState] = useState<string | null>('mh')
  const [filter, setFilter] = useState<ProgrammeFilter>(initialFilter)

  return (
    <>
      <PageHero
        tone="navy"
        crumbs={[{ label: 'Our Impact' }]}
        eyebrow="Impact report"
        title="What connected work adds up to."
        description="Organisation-level reference figures, followed by an interactive explorer that shows how programme and state-level results will be reported."
      >
        <div className="mt-14 border-t border-white/15 pt-12">
          <ImpactOverview includeProgrammes onDark />
          <p className="mt-10 max-w-[70ch] text-sm text-white/60">
            Headline figures are taken from the organisation’s existing website and await documentary confirmation. Everything
            below the headline — states, indicators, charts and stories — is illustrative prototype data.
          </p>
        </div>
      </PageHero>

      {/* Geographic explorer */}
      <SectionContainer tone="ivory" id="explorer" labelledBy="explorer-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Geographic explorer"
            title={<span id="explorer-title">Explore by state</span>}
            description="Select a highlighted state to see its programme areas and sample indicators. Filter to see where each programme is active."
          />
          <StatusBadge status="illustrative" help={`${ILLUSTRATIVE_NOTE} The states shown are not the organisation’s confirmed presence.`} />
        </div>
        <div className="mt-8">
          <ImpactFilterBar value={mapFilter} onChange={setMapFilter} label="Filter map by programme" />
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <GeographicImpactMap filter={mapFilter} selected={selectedState} onSelect={setSelectedState} className="mx-auto max-w-[600px]" />
            <div className="mx-auto mt-4 flex max-w-[600px] flex-wrap items-end justify-between gap-4">
              <MapLegend />
              <SelectField
                id="state-select"
                label="Or choose a state"
                className="w-full sm:w-60"
                value={selectedState ?? ''}
                placeholder="Choose a state"
                onChange={(e) => setSelectedState(e.target.value || null)}
                options={stateImpact
                  .filter((s) => mapFilter === 'all' || s.programmes.includes(mapFilter))
                  .map((s) => ({ value: s.id, label: s.name }))}
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <StateDetailPanel stateId={selectedState} filter={mapFilter} />
          </div>
        </div>
      </SectionContainer>

      {/* Programme explorer + charts */}
      <SectionContainer tone="white" id="programmes" labelledBy="pe-title" bordered>
        <SectionHeading
          eyebrow="Programme explorer"
          title={<span id="pe-title">Results by programme</span>}
          description="Choose a programme to update the indicators and charts below. All values are illustrative."
        />
        <div className="sticky top-[var(--rv-nav-h)] z-20 -mx-5 mt-8 border-b border-line bg-white/95 px-5 py-3 backdrop-blur md:-mx-8 md:px-8">
          <ImpactFilterBar value={filter} onChange={setFilter} />
        </div>
        <div className="mt-8">
          <ImpactMetricGrid filter={filter} />
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <YearlyTrendChart filter={filter} />
          <ProgrammeDistributionChart filter={filter} />
          <OutcomeComparison filter={filter} />
          <GeographyChart filter={filter} />
        </div>
      </SectionContainer>

      {/* Stories */}
      <SectionContainer tone="sand" labelledBy="stories-title">
        <SectionHeading
          eyebrow="Stories of change"
          title={<span id="stories-title">How change could unfold</span>}
          description="Sample case studies showing how stories will be told. They do not describe real people or places. Real stories and photographs will replace them once supplied."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[...caseStudies]
            .sort((a, b) => Number(b.programme === filter) - Number(a.programme === filter))
            .map((c) => (
              <ImpactStoryCard key={c.id} story={c} />
            ))}
        </div>
        {filter !== 'all' && !caseStudies.some((c) => c.programme === filter) && (
          <p className="mt-6 text-sm text-muted">No sample story yet for {programmeBySlug[filter].title.toLowerCase()}; showing all sample stories.</p>
        )}
      </SectionContainer>

      {/* Transparency */}
      <SectionContainer tone="ivory" labelledBy="transparency-title">
        <div className="grid items-center gap-10 rounded-xl border border-line bg-white p-8 md:p-12 lg:grid-cols-12">
          <FileText className="size-12 text-blue lg:col-span-1" strokeWidth={1.3} aria-hidden />
          <div className="lg:col-span-7">
            <h2 id="transparency-title" className="font-display text-h3 font-bold text-charcoal">Reports and transparency</h2>
            <p className="mt-3 max-w-[60ch] text-muted">
              Annual reports, audited financial statements and impact assessments will be published in the resource library once supplied and verified.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <PrimaryButton to="/resources" arrow>Go to resources</PrimaryButton>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

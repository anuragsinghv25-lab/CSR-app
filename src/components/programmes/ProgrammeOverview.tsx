import type { Programme } from '@/data/types'
import { SectionContainer } from '@/components/layout/SectionContainer'

export function ProgrammeOverview({ programme: p }: { programme: Programme }) {
  return (
    <SectionContainer tone="ivory" labelledBy="overview-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="overview-title" className="font-display text-h2 font-bold">Overview</h2>
          <div className="mt-6 grid gap-5 text-lead text-muted">
            {p.overview.map((para) => (
              <p key={para.slice(0, 20)} className="max-w-[62ch]">{para}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="challenge-title">
          <div className="border-l-[3px] pl-6" style={{ borderColor: p.accentColour }}>
            <h2 id="challenge-title" className="font-display text-sm font-semibold" style={{ color: p.accentColour }}>
              The development challenge
            </h2>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-charcoal">{p.developmentChallenge}</p>
          </div>
          <ul className="mt-8 grid gap-3">
            {p.challenges.map((c) => (
              <li key={c} className="flex gap-3 text-[0.95rem] text-muted">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: p.accentColour }} />
                {c}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SectionContainer>
  )
}

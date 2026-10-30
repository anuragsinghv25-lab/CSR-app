import { Check } from 'lucide-react'
import type { Programme } from '@/data/types'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { StatusBadge } from '@/components/common/StatusBadge'

/** Activities, expected outcomes and impact measurement indicators. */
export function ProgrammeOutcomeSection({ programme: p }: { programme: Programme }) {
  return (
    <SectionContainer tone="ivory" labelledBy="outcomes-title">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h3 font-bold">Programme activities</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {p.activities.map((a) => (
              <li key={a} className="py-4 text-[1.02rem] text-charcoal">{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 id="outcomes-title" className="font-display text-h3 font-bold">Expected outcomes</h2>
          <ul className="mt-6 grid gap-4">
            {p.expectedOutcomes.map((o) => (
              <li key={o} className="flex gap-3 text-[1.02rem] text-charcoal">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white" style={{ background: p.accentColour }}>
                  <Check className="size-3.5" aria-hidden />
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-h3 font-bold">How we measure it</h2>
            <p className="mt-2 max-w-[60ch] text-muted">Indicators tracked against a baseline. Values will be published once monitoring data is supplied.</p>
          </div>
          <StatusBadge status="pending" label="Values pending" help="Indicator definitions only. No results are shown until verified monitoring data is available." />
        </div>
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[520px] text-left">
            <caption className="sr-only">Impact measurement indicators for {p.title}</caption>
            <thead>
              <tr className="border-b border-line text-xs text-muted">
                <th scope="col" className="px-5 py-3 font-semibold">Indicator</th>
                <th scope="col" className="px-5 py-3 font-semibold">Unit</th>
                <th scope="col" className="px-5 py-3 font-semibold">Latest value</th>
              </tr>
            </thead>
            <tbody>
              {p.impactIndicators.map((ind) => (
                <tr key={ind.name} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 font-display font-semibold text-charcoal">{ind.name}</th>
                  <td className="px-5 py-4 text-sm text-muted">{ind.unit}</td>
                  <td className="px-5 py-4 text-sm text-muted">Awaiting data</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionContainer>
  )
}

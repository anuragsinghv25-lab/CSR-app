import { programmeBySlug } from '@/data/programmes'
import type { ProgrammeSlug } from '@/data/types'

/**
 * Qualitative preview of what a gift supports. Deliberately avoids any
 * rupee-to-outcome equivalence (e.g. "₹500 = 1 child"), per the brief.
 */
export function FundingImpactPreview({ programme }: { programme: ProgrammeSlug | 'any' }) {
  const p = programme === 'any' ? null : programmeBySlug[programme]
  const items = p ? p.activities.slice(0, 3) : ['Programme delivery across all six areas', 'Community institutions that sustain change', 'Monitoring and learning']
  return (
    <div className="mt-8 border-t border-white/15 pt-6">
      <p className="text-sm font-semibold text-white">Contributions like yours can help support</p>
      <ul className="mt-3 grid gap-2 text-sm text-white/75">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-yellow" />
            {i}
          </li>
        ))}
      </ul>
      <p className="mt-5 rounded-md bg-white/[0.06] p-3 text-xs leading-relaxed text-white/70">
        The impact examples shown in this prototype are illustrative. Actual fund utilisation and outcomes depend on approved programme budgets.
      </p>
    </div>
  )
}

import { programmeBySlug } from '@/data/programmes'
import type { ProgrammeSlug } from '@/data/types'
import { formatINR } from '@/lib/utils'

export function DonationSummary({
  amount,
  frequency,
  programme,
}: {
  amount: number
  frequency: 'once' | 'monthly'
  programme: ProgrammeSlug | 'any'
}) {
  const p = programme === 'any' ? null : programmeBySlug[programme]
  return (
    <div aria-live="polite">
      <p className="text-sm text-white/65">Your contribution</p>
      <p className="tabular mt-1 font-display text-5xl font-extrabold tracking-[-0.03em] text-white">
        {amount > 0 ? formatINR(amount) : '₹—'}
        {frequency === 'monthly' && <span className="ml-1 text-xl font-semibold text-white/70">/month</span>}
      </p>
      <dl className="mt-6 grid gap-3 border-t border-white/15 pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-white/65">Frequency</dt>
          <dd className="font-semibold text-white">{frequency === 'monthly' ? 'Monthly' : 'One-time'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/65">Programme</dt>
          <dd className="font-semibold text-white">{p ? p.title : 'Where it’s needed most'}</dd>
        </div>
        {frequency === 'monthly' && amount > 0 && (
          <div className="flex justify-between gap-4">
            <dt className="text-white/65">Over 12 months</dt>
            <dd className="tabular font-semibold text-white">{formatINR(amount * 12)}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}

import { donationAmounts } from '@/data/content'
import { cn, formatINR } from '@/lib/utils'

/** Suggested amounts plus a "Custom" option, as an accessible radio group. */
export function DonationAmountSelector({
  amount,
  custom,
  onSelect,
  onCustom,
}: {
  amount: number | null
  custom: boolean
  onSelect: (v: number) => void
  onCustom: () => void
}) {
  const base = 'flex h-14 items-center justify-center rounded-md border font-display text-lg font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue/40 cursor-pointer'
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-charcoal">Amount</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {donationAmounts.map((a) => {
          const checked = !custom && amount === a
          return (
            <label key={a} className={cn(base, checked ? 'border-blue bg-blue text-white' : 'border-line-strong bg-white text-charcoal hover:border-charcoal')}>
              <input type="radio" name="amount" className="sr-only" checked={checked} onChange={() => onSelect(a)} />
              <span className="tabular">{formatINR(a)}</span>
            </label>
          )
        })}
        <label className={cn(base, 'col-span-2 text-base sm:col-span-1', custom ? 'border-blue bg-blue text-white' : 'border-line-strong bg-white text-charcoal hover:border-charcoal')}>
          <input type="radio" name="amount" className="sr-only" checked={custom} onChange={onCustom} />
          Custom
        </label>
      </div>
    </fieldset>
  )
}

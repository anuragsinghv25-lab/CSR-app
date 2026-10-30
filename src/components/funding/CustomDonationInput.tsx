export const MIN_DONATION = 100
export const MAX_DONATION = 1000000

export function CustomDonationInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="mt-4">
      <label htmlFor="custom-amount" className="text-sm font-medium text-charcoal">Enter an amount</label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg font-bold text-muted" aria-hidden>₹</span>
        <input
          id="custom-amount"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, '').slice(0, 7))}
          placeholder="e.g. 1500"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'custom-amount-error' : 'custom-amount-hint'}
          className={`tabular h-14 w-full rounded-md border bg-white pl-9 pr-4 font-display text-lg font-bold text-charcoal focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15 ${error ? 'border-error' : 'border-line-strong'}`}
        />
      </div>
      {error ? (
        <p id="custom-amount-error" role="alert" className="mt-1.5 text-xs font-medium text-error">{error}</p>
      ) : (
        <p id="custom-amount-hint" className="mt-1.5 text-xs text-muted">Minimum ₹{MIN_DONATION}.</p>
      )}
    </div>
  )
}

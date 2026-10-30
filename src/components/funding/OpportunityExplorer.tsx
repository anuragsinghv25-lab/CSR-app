import { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { csrProjects, budgetBands, durationBands, regions } from '@/data/projects'
import { programmes } from '@/data/programmes'
import { SelectField } from '@/components/forms/Field'
import { CSRPartnershipCard } from './CSRPartnershipCard'

/** Filterable catalogue of sample CSR project opportunities. */
export function OpportunityExplorer() {
  const [programme, setProgramme] = useState('all')
  const [region, setRegion] = useState('all')
  const [budget, setBudget] = useState('all')
  const [duration, setDuration] = useState('all')

  const results = useMemo(() => {
    const b = budgetBands.find((x) => x.id === budget)!
    const d = durationBands.find((x) => x.id === duration)!
    return csrProjects.filter(
      (p) =>
        (programme === 'all' || p.programme === programme) &&
        (region === 'all' || p.region === region) &&
        p.indicativeBudget >= b.min &&
        p.indicativeBudget <= b.max &&
        p.duration >= d.min &&
        p.duration <= d.max,
    )
  }, [programme, region, budget, duration])

  const reset = () => {
    setProgramme('all')
    setRegion('all')
    setBudget('all')
    setDuration('all')
  }
  const filtered = programme !== 'all' || region !== 'all' || budget !== 'all' || duration !== 'all'

  return (
    <div>
      <div className="grid gap-4 rounded-xl border border-line bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          id="f-programme"
          label="Programme"
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
          options={[{ value: 'all', label: 'All programmes' }, ...programmes.map((p) => ({ value: p.slug, label: p.title }))]}
        />
        <SelectField
          id="f-region"
          label="Geography"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          options={[{ value: 'all', label: 'All regions' }, ...regions.map((r) => ({ value: r, label: `${r} India` }))]}
        />
        <SelectField id="f-budget" label="Indicative budget" value={budget} onChange={(e) => setBudget(e.target.value)} options={budgetBands.map((b) => ({ value: b.id, label: b.label }))} />
        <SelectField id="f-duration" label="Project duration" value={duration} onChange={(e) => setDuration(e.target.value)} options={durationBands.map((d) => ({ value: d.id, label: d.label }))} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          Showing <strong className="font-semibold text-charcoal">{results.length}</strong> of {csrProjects.length} sample opportunities
        </p>
        {filtered && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline">
            <RotateCcw className="size-3.5" aria-hidden /> Clear filters
          </button>
        )}
      </div>

      {results.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((p) => (
            <CSRPartnershipCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-display text-lg font-semibold text-charcoal">No sample opportunities match these filters</p>
          <p className="mt-2 text-muted">Widen the budget or duration, or tell us what you have in mind — programmes are designed with partners.</p>
          <button type="button" onClick={reset} className="mt-5 font-display font-semibold text-blue hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  )
}

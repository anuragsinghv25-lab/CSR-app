import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { resources, resourceCategories } from '@/data/resources'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { DocumentCard } from '@/components/common/DocumentCard'
import { SelectField } from '@/components/forms/Field'
import { cn } from '@/lib/utils'

export default function Resources() {
  useDocumentTitle('Resources & Reports')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [year, setYear] = useState('all')
  const years = useMemo(() => [...new Set(resources.map((r) => r.year))].sort((a, b) => b - a), [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(
      (r) =>
        (category === 'all' || r.category === category) &&
        (year === 'all' || String(r.year) === year) &&
        (!q || `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(q)),
    )
  }, [query, category, year])

  const counts = useMemo(() => Object.fromEntries(resourceCategories.map((c) => [c, resources.filter((r) => r.category === c).length])), [])

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources' }]}
        eyebrow="Resources & reports"
        title="Reports, finances and the documents behind our work."
        description="Annual reports, audited statements, impact assessments, programme documents and certifications. Entries below are placeholders until the organisation supplies and verifies each document."
      />
      <SectionContainer tone="white" labelledBy="library-title" bordered>
        <h2 id="library-title" className="sr-only">Document library</h2>
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-3" aria-label="Filters">
            <div className="lg:sticky lg:top-24">
              <label htmlFor="doc-search" className="text-sm font-medium text-charcoal">Search</label>
              <div className="relative mt-1.5">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
                <input
                  id="doc-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Title or keyword"
                  className="h-11 w-full rounded-md border border-line-strong bg-white pl-9 pr-9 text-sm focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-muted hover:text-charcoal">
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <fieldset className="mt-8">
                <legend className="text-sm font-medium text-charcoal">Category</legend>
                <div className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:grid lg:overflow-visible lg:px-0">
                  {['all', ...resourceCategories].map((c) => {
                    const active = category === c
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCategory(c)}
                        className={cn(
                          'flex shrink-0 items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
                          active ? 'bg-blue font-semibold text-white' : 'bg-ivory text-charcoal hover:bg-soft-blue lg:bg-transparent',
                        )}
                      >
                        {c === 'all' ? 'All documents' : c}
                        <span className={cn('tabular text-xs', active ? 'text-white/80' : 'text-muted')}>{c === 'all' ? resources.length : counts[c]}</span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <SelectField
                id="doc-year"
                label="Year"
                className="mt-8"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                options={[{ value: 'all', label: 'All years' }, ...years.map((y) => ({ value: String(y), label: String(y) }))]}
              />
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-9">
            <p className="text-sm text-muted" aria-live="polite">
              <strong className="font-semibold text-charcoal">{results.length}</strong> {results.length === 1 ? 'document' : 'documents'}
              {category !== 'all' && <> in {category.toLowerCase()}</>}
              {query && <> matching “{query}”</>}
            </p>
            {results.length ? (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {results.map((r) => (
                  <DocumentCard key={r.id} doc={r} />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-line-strong p-10 text-center">
                <p className="font-display text-lg font-semibold text-charcoal">No documents match your search</p>
                <p className="mt-2 text-muted">Try a different keyword, or clear the filters.</p>
                <button
                  type="button"
                  className="mt-4 font-display font-semibold text-blue hover:underline"
                  onClick={() => { setQuery(''); setCategory('all'); setYear('all') }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

import type { Programme } from '@/data/types'
import { programmes } from '@/data/programmes'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { ProgrammeCard } from './ProgrammeCard'

/** Three neighbouring programmes in the 360-degree model. */
export function ProgrammeRelatedContent({ programme: p }: { programme: Programme }) {
  const i = programmes.findIndex((x) => x.slug === p.slug)
  const related = [1, 2, 5].map((o) => programmes[(i + o) % programmes.length])
  return (
    <SectionContainer tone="white" labelledBy="related-title" bordered>
      <h2 id="related-title" className="font-display text-h2 font-bold">Works hand in hand with</h2>
      <p className="mt-4 max-w-[58ch] text-lead text-muted">
        No programme area works alone. {p.title} outcomes are strongest when they connect with these.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {related.map((r) => (
          <ProgrammeCard key={r.slug} programme={r} />
        ))}
      </div>
    </SectionContainer>
  )
}

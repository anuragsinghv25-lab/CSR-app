import type { CaseStudy } from '@/data/types'
import { programmeBySlug } from '@/data/programmes'
import { ProgrammeGlyph } from '@/components/illustrations/ProgrammeGlyph'
import { ImageSlot } from '@/components/common/ImageSlot'
import { StatusBadge } from '@/components/common/StatusBadge'

/** Editorial case-study card. Sample content only — no real beneficiaries or quotes. */
export function ImpactStoryCard({ story }: { story: CaseStudy }) {
  const p = programmeBySlug[story.programme]
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white">
      <ImageSlot
        slot={`impact-story-${story.id}`}
        className="h-40"
        fallback={
          <div className="size-full" style={{ background: `color-mix(in srgb, ${p.accentColour} 8%, #F8F7F3)` }}>
            <ProgrammeGlyph slug={story.programme} />
          </div>
        }
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold" style={{ color: p.accentColour }}>{p.title}</p>
          <StatusBadge status="illustrative" label="Sample case study" help="A sample scenario written for this prototype. It does not describe real people, places or results." />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold leading-snug text-charcoal">{story.title}</h3>
        <p className="mt-1 text-xs text-muted">{story.setting}</p>
        <p className="mt-4 leading-relaxed text-muted">{story.summary}</p>
        <ul className="mt-5 grid gap-1.5 border-t border-line pt-5 text-sm text-charcoal">
          {story.approach.map((a) => (
            <li key={a} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: p.accentColour }} />
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-5 text-sm italic text-muted">{story.observedChange}</p>
      </div>
    </article>
  )
}

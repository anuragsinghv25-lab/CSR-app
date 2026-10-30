import { MapPin, Clock } from 'lucide-react'
import type { CSRProject } from '@/data/types'
import { programmeBySlug } from '@/data/programmes'
import { formatLakh, cn } from '@/lib/utils'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const statusTone: Record<CSRProject['status'], string> = {
  'Open for partnership': 'bg-[#e6f0e3] text-success',
  'In design': 'bg-soft-blue text-blue',
  'Partially supported': 'bg-yellow-soft text-[#7a5600]',
}

/** Sample CSR project opportunity. Every card carries the illustrative indicator. */
export function CSRPartnershipCard({ project: pr }: { project: CSRProject }) {
  const p = programmeBySlug[pr.programme]
  const Icon = p.icon
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-line-strong">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.accentColour }}>
          <Icon className="size-4" aria-hidden /> {p.title}
        </span>
        <span className={cn('rounded-sm px-2 py-1 text-xs font-semibold', statusTone[pr.status])}>{pr.status}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-charcoal">{pr.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{pr.objective}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4 text-sm">
        <div>
          <dt className="text-xs text-muted">Indicative budget</dt>
          <dd className="mt-1 font-display font-bold text-charcoal">{formatLakh(pr.indicativeBudget)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Duration</dt>
          <dd className="mt-1 font-display font-bold text-charcoal">{pr.duration} months</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Geography</dt>
          <dd className="mt-1 font-display font-bold text-charcoal">{pr.geography}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-1 items-end justify-between gap-3">
        <StatusBadge status="illustrative" label="Illustrative prototype data" />
        <Dialog>
          <DialogTrigger className="shrink-0 font-display text-sm font-semibold text-blue hover:underline">Details</DialogTrigger>
          <DialogContent title={pr.title} description="Illustrative prototype data — not a live project.">
            <dl className="grid gap-5">
              <div>
                <dt className="text-sm font-semibold text-charcoal">Development objective</dt>
                <dd className="mt-1 text-muted">{pr.objective}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ['Programme', p.title],
                  ['Budget', formatLakh(pr.indicativeBudget)],
                  ['Duration', `${pr.duration} months`],
                  ['Status', pr.status],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-muted">{k}</dt>
                    <dd className="mt-1 font-display font-semibold text-charcoal">{v}</dd>
                  </div>
                ))}
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm font-semibold text-charcoal"><MapPin className="size-4" aria-hidden /> Geography</dt>
                <dd className="mt-1 text-muted">{pr.geography} ({pr.region})</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm font-semibold text-charcoal"><Clock className="size-4" aria-hidden /> Expected outcomes</dt>
                <dd>
                  <ul className="mt-2 grid gap-1.5 text-muted">
                    {pr.expectedOutcomes.map((o) => <li key={o}>• {o}</li>)}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <DialogClose asChild>
                <Button asChild>
                  <Link to={`/partnerships/csr?programme=${pr.programme}#enquiry`}>Enquire about a project like this</Link>
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  )
}

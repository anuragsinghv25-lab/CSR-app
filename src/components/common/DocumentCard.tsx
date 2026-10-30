import { FileText, FileSpreadsheet, Lock } from 'lucide-react'
import type { Resource } from '@/data/types'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { StatusBadge } from './StatusBadge'

const typeIcon = { PDF: FileText, DOCX: FileText, XLSX: FileSpreadsheet }

/** Document metadata card. Never offers a download — files are not yet supplied. */
export function DocumentCard({ doc }: { doc: Resource }) {
  const Icon = typeIcon[doc.fileType]
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted">
          <Icon className="size-4 text-blue" aria-hidden />
          <span>{doc.fileType}</span>
          <span aria-hidden className="text-line-strong">/</span>
          <span>{doc.year}</span>
        </div>
        <StatusBadge status="pending" label={doc.documentStatus} help="This document has not been supplied yet. No download is available." />
      </div>
      <h3 className="mt-4 font-display text-[1.05rem] font-semibold leading-snug text-charcoal">{doc.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{doc.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-xs text-muted">{doc.category}</span>
        <Dialog>
          <DialogTrigger className="font-display text-sm font-semibold text-blue hover:underline">View details</DialogTrigger>
          <DialogContent title={doc.title} description={`${doc.category} · ${doc.year} · ${doc.fileType}`}>
            <p className="leading-relaxed text-muted">{doc.description}</p>
            <div className="mt-6 flex gap-3 rounded-lg bg-sand p-4 text-sm text-charcoal">
              <Lock className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden />
              <p>
                <strong className="font-semibold">Not yet available.</strong> This is a prototype entry. The document will be
                published here once the organisation supplies and verifies it. No file is attached.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  )
}

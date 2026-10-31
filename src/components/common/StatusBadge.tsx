import { Info } from 'lucide-react'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { DataStatus } from '@/data/types'

const copy: Record<DataStatus, { label: string; help: string }> = {
  reference: {
    label: 'Reference figure',
    help: 'Shown on the organisation’s existing prototype website. Awaiting documentary confirmation.',
  },
  unverified: {
    label: 'Unverified',
    help: 'Sources disagree on this figure. It will be confirmed before production.',
  },
  illustrative: {
    label: 'Illustrative data',
    help: 'Invented for this prototype to demonstrate the interface. Not a Rainvows result.',
  },
  pending: {
    label: 'Pending verification',
    help: 'Placeholder awaiting information or documents from the organisation.',
  },
}

/**
 * Marks the trust level of a figure, record or document. Always pair
 * unverified or invented data with one of these.
 */
export function StatusBadge({
  status,
  label,
  help,
  onDark,
  className,
}: {
  status: DataStatus
  label?: string
  help?: string
  onDark?: boolean
  className?: string
}) {
  const c = copy[status]
  const tone =
    status === 'illustrative'
      ? onDark ? 'border-yellow/40 text-yellow' : 'border-[#e9c46a] bg-yellow-soft text-[#7a5600]'
      : status === 'reference'
        ? onDark ? 'border-white/25 text-white/80' : 'border-line-strong bg-white text-muted'
        : onDark ? 'border-white/25 text-white/80' : 'border-terracotta/30 bg-terracotta-soft text-[#8a3517]'
  return (
    <Tooltip content={help ?? c.help}>
      <button
        type="button"
        className={cn(
          'inline-flex h-6 shrink-0 cursor-help items-center gap-1 rounded-sm border px-2 text-[0.7rem] font-semibold leading-none tracking-[0.01em]',
          tone,
          className,
        )}
        aria-label={`${label ?? c.label}: ${help ?? c.help}`}
      >
        <Info className="size-3" aria-hidden />
        {label ?? c.label}
      </button>
    </Tooltip>
  )
}

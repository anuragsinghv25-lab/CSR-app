import type { Partner } from '@/data/types'
import { Tooltip } from '@/components/ui/tooltip'

/**
 * Text-based partner mark. Swap the name for an official logo
 * (<img src=... alt={partner.name}>) once assets and permission are supplied.
 */
export function PartnerLogoCard({ partner }: { partner: Partner }) {
  return (
    <Tooltip content={partner.note}>
      <div
        tabIndex={0}
        className="group flex h-24 flex-col justify-center border-l border-line px-6 transition-colors hover:bg-white focus-visible:bg-white sm:px-8"
      >
        <p className="font-display text-lg font-bold tracking-[-0.02em] text-charcoal/80 transition-colors group-hover:text-blue">{partner.name}</p>
        <p className="mt-1 text-xs text-muted">{partner.type}</p>
      </div>
    </Tooltip>
  )
}

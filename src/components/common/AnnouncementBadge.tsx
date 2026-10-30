import { cn } from '@/lib/utils'

/** Inline announcement pill for hero areas. */
export function AnnouncementBadge({ children, className, onDark }: { children: React.ReactNode; className?: string; onDark?: boolean }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border py-1 pl-1.5 pr-3 text-xs font-medium',
        onDark ? 'border-white/20 bg-white/5 text-white/80' : 'border-line-strong bg-white/70 text-muted',
        className,
      )}
    >
      <span className="rounded-full bg-yellow px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-charcoal">Prototype</span>
      {children}
    </p>
  )
}

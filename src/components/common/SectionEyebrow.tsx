import { cn } from '@/lib/utils'

/** Small uppercase section label. Use sparingly — only where it orients the reader. */
export function SectionEyebrow({ children, className, onDark }: { children: React.ReactNode; className?: string; onDark?: boolean }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', onDark ? 'text-yellow' : 'text-terracotta-ink', className)}>
      <span aria-hidden className={cn('h-px w-6', onDark ? 'bg-yellow/70' : 'bg-terracotta/60')} />
      {children}
    </p>
  )
}

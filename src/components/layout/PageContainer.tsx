import { cn } from '@/lib/utils'

/** Max-width content wrapper with responsive gutters (1280px). */
export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('container-rv', className)}>{children}</div>
}

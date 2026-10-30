import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TextLink({ to, children, className, onDark }: { to: string; children: React.ReactNode; className?: string; onDark?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 font-display text-[0.95rem] font-semibold underline-offset-4 hover:underline',
        onDark ? 'text-white' : 'text-blue',
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}

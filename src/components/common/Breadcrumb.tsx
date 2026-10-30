import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items, onDark }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', onDark ? 'text-white/65' : 'text-muted')}>
        <li>
          <Link to="/" className={cn('hover:underline', onDark ? 'hover:text-white' : 'hover:text-charcoal')}>Home</Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            {c.to ? (
              <Link to={c.to} className={cn('hover:underline', onDark ? 'hover:text-white' : 'hover:text-charcoal')}>{c.label}</Link>
            ) : (
              <span aria-current="page" className={onDark ? 'text-white' : 'text-charcoal'}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

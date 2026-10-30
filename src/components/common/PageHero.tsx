import { cn } from '@/lib/utils'
import { Breadcrumb, type Crumb } from './Breadcrumb'
import { SectionEyebrow } from './SectionEyebrow'

/** Editorial hero used by inner pages. `aside` holds an illustration or key facts. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  actions,
  aside,
  tone = 'ivory',
  children,
}: {
  crumbs: Crumb[]
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  aside?: React.ReactNode
  tone?: 'ivory' | 'navy' | 'soft'
  children?: React.ReactNode
}) {
  const dark = tone === 'navy'
  return (
    <header
      className={cn(
        'relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-14',
        tone === 'navy' && 'on-dark bg-navy text-white',
        tone === 'soft' && 'bg-soft-blue',
      )}
    >
      <div className="container-rv relative">
        <Breadcrumb items={crumbs} onDark={dark} />
        <div className={cn('mt-10 grid items-end gap-10 md:mt-14', aside && 'lg:grid-cols-12')}>
          <div className={cn(aside && 'lg:col-span-7')}>
            {eyebrow && <SectionEyebrow onDark={dark} className="mb-5">{eyebrow}</SectionEyebrow>}
            <h1 className={cn('max-w-[18ch] font-display text-h1 font-bold', dark ? 'text-white' : 'text-charcoal')}>{title}</h1>
            {description && (
              <p className={cn('mt-6 max-w-[58ch] text-lead', dark ? 'text-white/75' : 'text-muted')}>{description}</p>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
        {children}
      </div>
    </header>
  )
}

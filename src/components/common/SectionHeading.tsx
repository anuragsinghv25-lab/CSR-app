import { cn } from '@/lib/utils'
import { SectionEyebrow } from './SectionEyebrow'

interface Props {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
  size?: 'h1' | 'h2' | 'h3'
  onDark?: boolean
  className?: string
  children?: React.ReactNode
}

export function SectionHeading({ eyebrow, title, description, as = 'h2', size = 'h2', onDark, className, children }: Props) {
  const Tag = as
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && <SectionEyebrow onDark={onDark} className="mb-5">{eyebrow}</SectionEyebrow>}
      <Tag
        className={cn(
          'font-display font-bold',
          size === 'h1' && 'text-h1',
          size === 'h2' && 'text-h2',
          size === 'h3' && 'text-h3',
          onDark ? 'text-white' : 'text-charcoal',
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn('mt-5 max-w-[62ch] text-lead', onDark ? 'text-white/75' : 'text-muted')}>{description}</p>
      )}
      {children}
    </div>
  )
}

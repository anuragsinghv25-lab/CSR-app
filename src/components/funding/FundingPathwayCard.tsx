import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'navy' | 'warm' | 'soft'

const tones: Record<Tone, { box: string; icon: string; title: string; body: string; cta: string; mark: string }> = {
  navy: {
    box: 'on-dark bg-navy text-white border-navy',
    icon: 'bg-white/10 text-yellow',
    title: 'text-white',
    body: 'text-white/75',
    cta: 'bg-yellow text-charcoal group-hover:bg-[#f0ac00]',
    mark: 'text-white/[0.06]',
  },
  warm: {
    box: 'bg-terracotta-soft border-[#efd0bf]',
    icon: 'bg-white text-terracotta',
    title: 'text-charcoal',
    body: 'text-[#5a4a42]',
    cta: 'bg-terracotta text-white group-hover:bg-[#b04a22]',
    mark: 'text-terracotta/[0.09]',
  },
  soft: {
    box: 'bg-soft-blue border-[#d6deea]',
    icon: 'bg-white text-blue',
    title: 'text-charcoal',
    body: 'text-muted',
    cta: 'bg-blue text-white group-hover:bg-navy',
    mark: 'text-blue/[0.07]',
  },
}

/** One of three partnership journeys. Each tone and layout is deliberately distinct. */
export function FundingPathwayCard({
  to,
  icon: Icon,
  audience,
  title,
  description,
  cta,
  tone,
  points,
  className,
}: {
  to: string
  icon: LucideIcon
  audience: string
  title: string
  description: string
  cta: string
  tone: Tone
  points?: string[]
  className?: string
}) {
  const t = tones[tone]
  return (
    <Link
      to={to}
      className={cn('group relative flex flex-col overflow-hidden rounded-xl border p-7 transition-transform duration-300 hover:-translate-y-1 md:p-9', t.box, className)}
    >
      <Icon className={cn('pointer-events-none absolute -bottom-8 -right-8 size-48 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105', t.mark)} strokeWidth={1} aria-hidden />
      <span className={cn('grid size-12 place-items-center rounded-lg', t.icon)}>
        <Icon className="size-6" aria-hidden />
      </span>
      <p className={cn('mt-8 text-sm font-medium', t.body)}>{audience}</p>
      <h3 className={cn('mt-1 font-display text-h3 font-bold', t.title)}>{title}</h3>
      <p className={cn('mt-3 max-w-[40ch] leading-relaxed', t.body)}>{description}</p>
      <span aria-hidden className="block h-8" />
      {points && (
        <ul className={cn('mt-6 grid gap-2 text-sm', t.body)}>
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-current" />
              {p}
            </li>
          ))}
        </ul>
      )}
      <span className={cn('relative mt-auto inline-flex w-fit items-center gap-2 rounded-md px-4 py-2.5 font-display text-sm font-semibold transition-colors', t.cta)}>
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  )
}

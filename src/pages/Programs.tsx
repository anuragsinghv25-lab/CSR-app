import { programmes } from '@/data/programmes'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { ProgrammePillarCard } from '@/components/programmes/ProgrammePillarCard'
import { ProgrammeCTA } from '@/components/programmes/ProgrammeCTA'
import { StatusBadge } from '@/components/common/StatusBadge'

export default function Programs() {
  useDocumentTitle('Our Programs')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Our Programs' }]}
        eyebrow="Our programmes"
        title="Six programme areas. One approach."
        description="Each area addresses a distinct development challenge. Planned together, they reinforce one another."
      >
        <nav aria-label="Jump to programme" className="mt-10 flex flex-wrap gap-2">
          {programmes.map((p) => {
            const Icon = p.icon
            return (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(p.slug)?.scrollIntoView({ behavior: 'smooth' })
                  history.replaceState(null, '', `#${p.slug}`)
                }}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-white px-3.5 py-2 font-display text-sm font-semibold text-charcoal transition-colors hover:border-charcoal"
              >
                <Icon className="size-4" style={{ color: p.accentColour }} aria-hidden />
                {p.title}
              </a>
            )
          })}
        </nav>
        <StatusBadge
          status="pending"
          label="Programme themes"
          help="Themes come from the organisation’s prototype. Interventions describe programme scope, not confirmed active projects."
          className="mt-6"
        />
      </PageHero>
      <div className="container-rv pb-16 md:pb-24">
        {programmes.map((p, i) => (
          <ProgrammePillarCard key={p.slug} programme={p} flip={i % 2 === 1} />
        ))}
      </div>
      <ProgrammeCTA />
    </>
  )
}

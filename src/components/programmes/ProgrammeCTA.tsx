import type { Programme } from '@/data/types'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { RippleField } from '@/components/illustrations/RippleField'

export function ProgrammeCTA({ programme: p }: { programme?: Programme }) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white" aria-labelledby="cta-title">
      <RippleField className="absolute -right-40 top-1/2 w-[640px] -translate-y-1/2 opacity-80 md:-right-24" />
      <div className="container-rv section-y relative">
        <h2 id="cta-title" className="max-w-[20ch] font-display text-h2 font-bold">
          {p ? `Support ${p.title.toLowerCase()} work that lasts.` : 'Let’s create something that lasts.'}
        </h2>
        <p className="mt-5 max-w-[52ch] text-lead text-white/75">
          {p
            ? 'Whether you are a CSR team, an institution or an individual, there is a way to help.'
            : 'Partner with us on programmes built with communities, measured honestly and designed to outlast the project.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton to="/partnerships/csr" variant="accent" arrow>Start a Partnership</PrimaryButton>
          {p ? (
            <SecondaryButton to={`/donate?programme=${p.slug}`} variant="onDark">Give as an individual</SecondaryButton>
          ) : (
            <SecondaryButton to="/impact" variant="onDark">Explore Our Impact</SecondaryButton>
          )}
        </div>
      </div>
    </section>
  )
}

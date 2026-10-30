import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons'
import { RippleField } from '@/components/illustrations/RippleField'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      <RippleField className="absolute -right-32 top-1/2 w-[620px] -translate-y-1/2 opacity-70" />
      <div className="container-rv relative py-28 md:py-40">
        <p className="font-display text-sm font-semibold text-yellow">404</p>
        <h1 className="mt-4 max-w-[16ch] font-display text-h1 font-bold">This page doesn’t exist.</h1>
        <p className="mt-5 max-w-[48ch] text-lead text-white/75">The link may be out of date. Start from the homepage or explore our programmes.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton to="/" variant="accent">Go to homepage</PrimaryButton>
          <SecondaryButton to="/programs" variant="onDark">Our programmes</SecondaryButton>
        </div>
      </div>
    </section>
  )
}

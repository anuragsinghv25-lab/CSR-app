import { Link } from 'react-router-dom'
import { Mail, MapPin, Globe, AtSign, Share2 } from 'lucide-react'
import { footerNav } from '@/data/navigation'
import { organisation } from '@/data/organisation'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { Tooltip } from '@/components/ui/tooltip'
import { Logo } from './Logo'

function Column({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-white/65 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Social channels not yet supplied — rendered as labelled, non-interactive placeholders. */
const socialPlaceholders = [
  { icon: Globe, label: 'Website channel' },
  { icon: AtSign, label: 'Social channel' },
  { icon: Share2, label: 'Social channel' },
]

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-deep text-white">
      <div className="container-rv py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-white/65">{organisation.summary}</p>
            <ul className="mt-6 grid gap-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/80">
                <Mail className="mt-0.5 size-4 shrink-0 text-yellow" aria-hidden />
                <span>
                  <a href={`mailto:${organisation.email}`} className="hover:underline">
                    {organisation.email}
                  </a>
                  <span className="block text-xs text-white/50">To be confirmed before launch</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-yellow" aria-hidden />
                {organisation.location}
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <Column title="Organisation" links={footerNav.organisation} />
            <Column title="Programmes" links={footerNav.programmes} />
            <Column title="Partner with us" links={footerNav.partner} />
          </div>
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold text-white">Updates from the field</h2>
            <p className="mt-2 text-sm text-white/65">Occasional news on programmes, reports and partnerships.</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <div className="mt-8 flex items-center gap-2">
              {socialPlaceholders.map(({ icon: Icon, label }, i) => (
                <Tooltip key={i} content={`${label} — account details to be confirmed`}>
                  <span
                    tabIndex={0}
                    className="grid size-9 place-items-center rounded-md border border-white/15 text-white/50"
                    aria-label={`${label} — to be confirmed`}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {organisation.name}. All rights reserved.</p>
          <p>Prototype for review. Figures marked as reference, illustrative or pending are not yet verified.</p>
        </div>
      </div>
    </footer>
  )
}

import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, Building2, HandHeart, Landmark, MessageSquare } from 'lucide-react'
import { organisation } from '@/data/organisation'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageHero } from '@/components/common/PageHero'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { StatusBadge } from '@/components/common/StatusBadge'
import { ContactForm, enquiryCategories } from '@/components/forms/ContactForm'
import { Link } from 'react-router-dom'

const routes = [
  { icon: MessageSquare, title: 'General enquiries', body: 'Questions about Rainvows and our work.', to: '/contact?topic=general', label: 'Use the form' },
  { icon: Building2, title: 'CSR enquiries', body: 'Corporate and foundation partnerships.', to: '/partnerships/csr#enquiry', label: 'CSR enquiry form' },
  { icon: HandHeart, title: 'Donation enquiries', body: 'Giving, receipts and recurring support.', to: '/contact?topic=donation', label: 'Use the form' },
  { icon: Landmark, title: 'Government partnerships', body: 'Public institutions and development agencies.', to: '/partnerships/government#enquiry', label: 'Institutional enquiry' },
]

export default function Contact() {
  useDocumentTitle('Contact')
  const [params] = useSearchParams()
  const topic = params.get('topic') ?? ''
  const defaultCategory = enquiryCategories.some((c) => c.value === topic) ? topic : ''

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title="Let’s talk about what we could build together."
        description="Write to us with a question, an idea or a partnership in mind. We read every message."
      />
      <SectionContainer tone="white" labelledBy="contact-title" bordered>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="font-display text-h3 font-bold">Contact details</h2>
            <dl className="mt-8 grid gap-8">
              <div className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-blue" aria-hidden />
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${organisation.email}`} className="font-display text-lg font-semibold text-charcoal hover:text-blue hover:underline">{organisation.email}</a>
                    <StatusBadge status="pending" label="To be confirmed" help={organisation.emailNote} className="mt-2 flex w-fit" />
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-blue" aria-hidden />
                <div>
                  <dt className="text-sm text-muted">Location</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-charcoal">{organisation.location}</dd>
                  <dd className="mt-1 text-sm text-muted">{organisation.locationNote}</dd>
                </div>
              </div>
            </dl>

            <h3 className="mt-14 font-display text-lg font-bold text-charcoal">Find the right team</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {routes.map((r) => {
                const Icon = r.icon
                return (
                  <li key={r.title}>
                    <Link to={r.to} className="group flex items-start gap-4 py-4">
                      <Icon className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden />
                      <span className="flex-1">
                        <span className="block font-display font-semibold text-charcoal group-hover:text-blue">{r.title}</span>
                        <span className="block text-sm text-muted">{r.body}</span>
                      </span>
                      <span className="shrink-0 pt-0.5 text-sm font-semibold text-blue group-hover:underline">{r.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-xl border border-line bg-ivory p-6 md:p-10">
              <h2 className="font-display text-h3 font-bold">Send a message</h2>
              <p className="mb-8 mt-2 text-muted">Choose a category so your message reaches the right team.</p>
              <ContactForm key={defaultCategory} defaultCategory={defaultCategory} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}

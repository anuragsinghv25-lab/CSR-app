import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { organisation } from '@/data/organisation'
import { SocialLinks } from '@/components/common/SocialLinks'

/** Slim bar above the main navigation: contact, sponsorship shortcut and social channels. Desktop/tablet only. */
export function UtilityBar() {
  return (
    <div className="on-dark hidden bg-navy-deep text-white/75 md:block">
      <div className="container-rv flex h-10 items-center justify-between gap-6 text-xs">
        <div className="flex items-center gap-5">
          <a href={`mailto:${organisation.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <Mail className="size-3.5 text-yellow" aria-hidden />
            {organisation.email}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-yellow" aria-hidden />
            {organisation.location}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/partnerships/csr" className="font-medium hover:text-white hover:underline">
            Sponsor a programme
          </Link>
          <SocialLinks className="-mr-1.5 border-l border-white/15 pl-3" />
        </div>
      </div>
    </div>
  )
}

import { Building2, HandHeart, Landmark, type LucideIcon } from 'lucide-react'
import { programmes } from './programmes'

export interface NavItem {
  label: string
  to: string
}

export interface PartnerNavItem extends NavItem {
  description: string
  icon: LucideIcon
}

export const mainNav: NavItem[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Approach', to: '/approach' },
  { label: 'Our Programs', to: '/programs' },
  { label: 'Our Impact', to: '/impact' },
  { label: 'Resources', to: '/resources' },
]

export const partnerNav: PartnerNavItem[] = [
  {
    label: 'CSR Partnerships',
    to: '/partnerships/csr',
    description: 'Strategic programmes for corporate CSR and foundations.',
    icon: Building2,
  },
  {
    label: 'Government Partnerships',
    to: '/partnerships/government',
    description: 'Collaboration with public institutions and agencies.',
    icon: Landmark,
  },
  {
    label: 'Individual Donations',
    to: '/donate',
    description: 'Give once or monthly to a programme you care about.',
    icon: HandHeart,
  },
]

export const footerNav = {
  organisation: [...mainNav, { label: 'Contact', to: '/contact' }],
  programmes: programmes.map((p) => ({ label: p.title, to: `/programs/${p.slug}` })),
  partner: partnerNav.map(({ label, to }) => ({ label, to })),
}

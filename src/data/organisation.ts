import type { Milestone, OrganisationMetric, OrganisationMetrics } from './types'

/**
 * Organisation facts. Anything marked `reference` comes from the
 * organisation's existing prototype website and still needs documentary
 * confirmation before production.
 */
export const organisation = {
  /** Trademark name — use this constant everywhere rather than hard-coding it. */
  name: 'Rainvows',
  descriptor: 'Social development organisation',
  summary:
    'Rainvows is a social development organisation working towards sustainable livelihoods and community prosperity through skill development, water, agriculture, health, women’s empowerment and livelihoods.',
  mission:
    'To build sustainable livelihoods and lasting community prosperity through interconnected development interventions designed with communities.',
  vision: 'A future where prosperity reaches everyone.',
  email: 'ceooffice@rainvows.org',
  emailNote: 'Contact address shown on the supplied prototype — confirm before production.',
  location: 'Noida – 201301, India',
  locationNote: 'Street address not published. Confirm with the organisation before adding one.',
} as const

export const organisationMetrics: OrganisationMetrics = {
  yearsOfExperience: {
    id: 'years',
    value: 30,
    suffix: '+',
    label: 'Years of work',
    description: 'in community development',
    status: 'reference',
  },
  livesTouched: {
    id: 'lives',
    value: 5,
    suffix: 'M+',
    label: 'Lives touched',
    description: 'across programme areas',
    status: 'reference',
  },
  partners: {
    id: 'partners',
    value: 100,
    suffix: '+',
    label: 'Partners',
    description: 'corporate, institutional and community',
    status: 'reference',
  },
  statesCovered: {
    id: 'states',
    value: 15,
    label: 'States',
    description: 'of geographical presence',
    status: 'unverified',
    note: 'Source material shows both 14 and 15 states. Treated as unverified until confirmed.',
  },
}

export const headlineMetrics: OrganisationMetric[] = [
  organisationMetrics.yearsOfExperience,
  organisationMetrics.livesTouched,
  organisationMetrics.partners,
  organisationMetrics.statesCovered,
]

export const programmeCountMetric: OrganisationMetric = {
  id: 'programmes',
  value: 6,
  label: 'Programme areas',
  description: 'working as one approach',
  status: 'reference',
}

/**
 * Organisational history. The founding year and milestone details have
 * not been supplied, so each entry uses a neutral label. Replace `year`,
 * `title` and `description` once the organisation confirms them.
 */
export const milestones: Milestone[] = [
  {
    id: 'm1',
    phase: 'Beginnings',
    year: null,
    title: 'Organisational milestone — details pending verification',
    description: 'Founding of the organisation and its first community engagements. Year and details to be confirmed.',
    status: 'pending',
  },
  {
    id: 'm2',
    phase: 'First programme area',
    year: null,
    title: 'Organisational milestone — details pending verification',
    description: 'Establishment of the first sustained programme area. Details to be confirmed.',
    status: 'pending',
  },
  {
    id: 'm3',
    phase: 'Multi-sector approach',
    year: null,
    title: 'Organisational milestone — details pending verification',
    description: 'Expansion into interconnected programme areas that became the 360-degree approach.',
    status: 'pending',
  },
  {
    id: 'm4',
    phase: 'Partnerships at scale',
    year: null,
    title: 'Organisational milestone — details pending verification',
    description: 'Growth of corporate CSR and institutional partnerships. Details to be confirmed.',
    status: 'pending',
  },
  {
    id: 'm5',
    phase: 'Today',
    year: null,
    title: 'Six programme areas, one approach',
    description:
      'Work across skill development, water, agriculture, health, women and livelihoods. Reference figures: 30+ years, 5M+ lives touched, 100+ partners.',
    status: 'reference',
  },
]

export const recognitions = [
  {
    id: 'crisil',
    title: 'CRISIL rating',
    value: '9.27/10',
    description: 'Rating displayed on the organisation’s existing prototype website.',
    status: 'pending' as const,
    note: 'Awaiting documentary verification. Rating date, scope and current validity not yet confirmed.',
  },
  {
    id: 'gptw',
    title: 'Great Place to Work',
    value: 'Certification',
    description: 'Certification displayed on the organisation’s existing prototype website.',
    status: 'pending' as const,
    note: 'Awaiting documentary verification. Certification period and current validity not yet confirmed.',
  },
]

/** Governance structure by role only — no names are published until confirmed. */
export const governance = [
  {
    role: 'Board',
    description: 'Provides strategic oversight and fiduciary governance. Composition to be published once confirmed.',
  },
  {
    role: 'Chief Executive’s office',
    description: 'Leads the organisation, its partnerships and overall programme direction.',
  },
  {
    role: 'Programme leadership',
    description: 'Designs and oversees implementation across the six programme areas.',
  },
  {
    role: 'Finance, compliance & monitoring',
    description: 'Manages fund utilisation, statutory compliance and monitoring and evaluation.',
  },
]

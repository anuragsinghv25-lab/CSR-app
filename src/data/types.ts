import type { LucideIcon } from 'lucide-react'

/**
 * How trustworthy a figure or record is. Every number shown in the UI
 * carries one of these so unverified data can never pass as fact.
 *  - reference:    taken from the organisation's existing prototype website
 *  - unverified:   reference figure with a known inconsistency in sources
 *  - illustrative: invented for this prototype to demonstrate the interface
 *  - pending:      placeholder awaiting information from the organisation
 */
export type DataStatus = 'reference' | 'unverified' | 'illustrative' | 'pending'

export type ProgrammeSlug = 'water' | 'agriculture' | 'skills' | 'health' | 'women' | 'livelihoods'

export interface OrganisationMetric {
  id: 'years' | 'lives' | 'partners' | 'states' | 'programmes'
  value: number
  suffix?: string
  label: string
  description: string
  status: DataStatus
  note?: string
}

export interface OrganisationMetrics {
  yearsOfExperience: OrganisationMetric
  livesTouched: OrganisationMetric
  partners: OrganisationMetric
  statesCovered: OrganisationMetric
}

export interface Intervention {
  title: string
  description: string
}

export interface ImpactIndicator {
  name: string
  unit: string
}

export interface Programme {
  id: string
  slug: ProgrammeSlug
  title: string
  shortTitle: string
  tagline: string
  description: string
  overview: string[]
  developmentChallenge: string
  challenges: string[]
  interventions: Intervention[]
  activities: string[]
  expectedOutcomes: string[]
  impactIndicators: ImpactIndicator[]
  csrThemes: string[]
  governmentThemes: string
  icon: LucideIcon
  accentColour: string
  accentVar: string
  /** Optional programme-specific deep-dive (used by Skill Development). */
  spotlight?: ProgrammeSpotlight
}

/** A value the organisation must supply before production. Rendered with a visible "to be confirmed" marker. */
export interface Placeholder {
  label: string
  note: string
}

export interface ProgrammeSpotlight {
  /** Draft positioning statement — shown with a "draft for approval" marker until approved. */
  positioning: string
  positioningStatus: 'draft' | 'approved'
  context: string[]
  pathway: { title: string; description: string }[]
  schemeAlignment: {
    summary: string
    /** Example schemes in the wider Skill India ecosystem. Not claims of Rainvows' participation. */
    ecosystemExamples: string[]
  }
  placeholders: Placeholder[]
  livelihoodLink: string
  /** Logo of the scheme ecosystem the programme works under (shown with a usage note). */
  schemeLogo?: { src: string; alt: string; caption: string }
}

export interface ImpactRecord {
  id: string
  programmeId: ProgrammeSlug
  geography: string
  metricName: string
  metricValue: number
  unit: string
  reportingPeriod: string
  dataStatus: DataStatus
}

export interface StateImpact {
  id: string
  name: string
  programmes: ProgrammeSlug[]
  projects: number
  records: ImpactRecord[]
  dataStatus: DataStatus
}

export type ProjectStatus = 'Open for partnership' | 'In design' | 'Partially supported'

export interface CSRProject {
  id: string
  title: string
  programme: ProgrammeSlug
  geography: string
  region: 'North' | 'West' | 'East' | 'South' | 'Central'
  objective: string
  indicativeBudget: number // in ₹ lakh
  duration: number // months
  expectedOutcomes: string[]
  status: ProjectStatus
  isIllustrative: true
}

export interface GovernmentOpportunity {
  id: string
  title: string
  programme: ProgrammeSlug
  geography: string
  fundingCategory: 'Grant-in-aid collaboration' | 'Programme convergence' | 'Technical support' | 'Capacity building'
  duration: string
  status: 'Concept stage' | 'Open for discussion'
  details: string
  isIllustrative: true
}

export type ResourceCategory =
  | 'Annual reports'
  | 'Financial reports'
  | 'Impact assessments'
  | 'Programme documents'
  | 'Certifications'
  | 'Organisational information'

export interface Resource {
  id: string
  title: string
  category: ResourceCategory
  year: number
  fileType: 'PDF' | 'XLSX' | 'DOCX'
  description: string
  documentStatus: 'Awaiting upload' | 'Pending verification'
}

export interface Partner {
  id: string
  name: string
  type: string
  status: DataStatus
  note: string
}

export interface Milestone {
  id: string
  phase: string
  year: string | null
  title: string
  description: string
  status: DataStatus
}

export interface CaseStudy {
  id: string
  programme: ProgrammeSlug
  title: string
  setting: string
  summary: string
  approach: string[]
  observedChange: string
  isIllustrative: true
}

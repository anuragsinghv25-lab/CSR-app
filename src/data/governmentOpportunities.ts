import type { GovernmentOpportunity } from './types'
import { byProgrammeOrder } from './programmes'

/**
 * SAMPLE PROTOTYPE CONTENT — these are example collaboration formats,
 * not real tenders, scheme approvals, empanelments or funding calls.
 */
const opportunityList: GovernmentOpportunity[] = [
  {
    id: 'gov-01',
    title: 'District water-security convergence',
    programme: 'water',
    geography: 'District level (sample)',
    fundingCategory: 'Programme convergence',
    duration: '24–36 months',
    status: 'Concept stage',
    details:
      'An example of how community water planning could be aligned with an existing public water programme at district level, with Rainvows supporting community mobilisation and monitoring.',
    isIllustrative: true,
  },
  {
    id: 'gov-02',
    title: 'Farmer capacity-building partnership',
    programme: 'agriculture',
    geography: 'Block level (sample)',
    fundingCategory: 'Capacity building',
    duration: '12–24 months',
    status: 'Open for discussion',
    details:
      'An example format in which Rainvows supports extension services with farmer field schools and demonstration plots.',
    isIllustrative: true,
  },
  {
    id: 'gov-03',
    title: 'SHG skilling implementation support',
    programme: 'skills',
    geography: 'State level (sample)',
    fundingCategory: 'Grant-in-aid collaboration',
    duration: '24 months',
    status: 'Concept stage',
    details:
      'An example of how Rainvows could support the implementation of skill training for Self-Help Group members within an applicable Skill India scheme, with outcome tracking.',
    isIllustrative: true,
  },
  {
    id: 'gov-04',
    title: 'Community health volunteer strengthening',
    programme: 'health',
    geography: 'District level (sample)',
    fundingCategory: 'Technical support',
    duration: '18 months',
    status: 'Open for discussion',
    details:
      'An example of technical support to strengthen community health outreach and referrals to public health facilities.',
    isIllustrative: true,
  },
  {
    id: 'gov-05',
    title: 'Women’s collectives and financial inclusion',
    programme: 'women',
    geography: 'Block level (sample)',
    fundingCategory: 'Programme convergence',
    duration: '24 months',
    status: 'Concept stage',
    details:
      'An example of aligning women’s group strengthening with existing public livelihood and financial-inclusion efforts.',
    isIllustrative: true,
  },
  {
    id: 'gov-06',
    title: 'Rural livelihood diversification pilot',
    programme: 'livelihoods',
    geography: 'District level (sample)',
    fundingCategory: 'Grant-in-aid collaboration',
    duration: '36 months',
    status: 'Open for discussion',
    details:
      'An example of an integrated pilot combining agriculture, enterprise and scheme linkages for vulnerable households.',
    isIllustrative: true,
  },
]

/** Listed in programme order — Skill Development first. */
export const governmentOpportunities = byProgrammeOrder(opportunityList, (o) => o.programme)

export const fundingCategories = [
  'Grant-in-aid collaboration',
  'Programme convergence',
  'Technical support',
  'Capacity building',
] as const

export const collaborationModels = [
  {
    id: 'implementation',
    title: 'Implementation partner',
    summary: 'Rainvows implements a defined programme in agreed geographies, with reporting to the institution.',
    suits: 'Departments and agencies with an approved programme and budget seeking field implementation.',
  },
  {
    id: 'convergence',
    title: 'Convergence partner',
    summary: 'Rainvows aligns its community work with an existing public programme so both reach further.',
    suits: 'Districts and blocks looking to improve uptake and community participation in existing schemes.',
  },
  {
    id: 'technical',
    title: 'Technical support',
    summary: 'Rainvows provides design, training or monitoring expertise to a programme run by the institution.',
    suits: 'Institutions that run programmes directly but want specialist community-development input.',
  },
  {
    id: 'research',
    title: 'Pilot and learning partner',
    summary: 'A time-bound pilot that tests an integrated approach and documents what works.',
    suits: 'Funding bodies and development agencies exploring new models before scale-up.',
  },
]

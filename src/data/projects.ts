import type { CSRProject } from './types'
import { byProgrammeOrder } from './programmes'

/**
 * ILLUSTRATIVE PROTOTYPE DATA — sample CSR project opportunities created
 * to demonstrate the opportunity explorer. These are not live projects.
 * Budgets are in ₹ lakh; durations in months.
 */
const projectList: CSRProject[] = [
  {
    id: 'csr-01',
    title: 'Watershed rejuvenation for a drought-prone block',
    programme: 'water',
    geography: 'Maharashtra',
    region: 'West',
    objective: 'Restore groundwater recharge and extend water availability through the dry season.',
    indicativeBudget: 120,
    duration: 36,
    expectedOutcomes: ['Recharge structures built or revived', 'Water user committees trained', 'Longer water availability'],
    status: 'Open for partnership',
    isIllustrative: true,
  },
  {
    id: 'csr-02',
    title: 'Farmer field schools for sustainable cropping',
    programme: 'agriculture',
    geography: 'Madhya Pradesh',
    region: 'Central',
    objective: 'Help smallholder farmers adopt low-cost, soil-conserving practices.',
    indicativeBudget: 65,
    duration: 24,
    expectedOutcomes: ['Farmers trained in field schools', 'Demonstration plots', 'Lower input costs'],
    status: 'Open for partnership',
    isIllustrative: true,
  },
  {
    id: 'csr-03',
    title: 'Skill training for Self-Help Group members',
    programme: 'skills',
    geography: 'Uttar Pradesh',
    region: 'North',
    objective: 'Train SHG members in market-relevant trades, aligned with an applicable Skill India scheme.',
    indicativeBudget: 85,
    duration: 24,
    expectedOutcomes: ['SHG members trained', 'Certification where the scheme provides it', 'Enterprise or work linkages'],
    status: 'In design',
    isIllustrative: true,
  },
  {
    id: 'csr-04',
    title: 'Maternal and child health outreach',
    programme: 'health',
    geography: 'Bihar',
    region: 'East',
    objective: 'Strengthen community health volunteers and links to public health services.',
    indicativeBudget: 45,
    duration: 18,
    expectedOutcomes: ['Health volunteers trained', 'Antenatal check-up uptake', 'Completed referrals'],
    status: 'Open for partnership',
    isIllustrative: true,
  },
  {
    id: 'csr-05',
    title: 'Women’s enterprise collectives',
    programme: 'women',
    geography: 'Rajasthan',
    region: 'North',
    objective: 'Support women’s groups to start and run collective micro-enterprises.',
    indicativeBudget: 38,
    duration: 24,
    expectedOutcomes: ['Women-led enterprises', 'Bank linkages', 'Leadership training'],
    status: 'Partially supported',
    isIllustrative: true,
  },
  {
    id: 'csr-06',
    title: 'Integrated livelihoods for tribal households',
    programme: 'livelihoods',
    geography: 'Jharkhand',
    region: 'East',
    objective: 'Diversify household income through farm and non-farm livelihoods.',
    indicativeBudget: 150,
    duration: 36,
    expectedOutcomes: ['Household livelihood plans', 'Producer groups', 'Diversified income'],
    status: 'In design',
    isIllustrative: true,
  },
  {
    id: 'csr-07',
    title: 'School WASH and hygiene programme',
    programme: 'health',
    geography: 'Odisha',
    region: 'East',
    objective: 'Improve water, sanitation and hygiene facilities and practice in schools.',
    indicativeBudget: 28,
    duration: 12,
    expectedOutcomes: ['WASH facilities upgraded', 'Hygiene promotion', 'School health committees'],
    status: 'Open for partnership',
    isIllustrative: true,
  },
  {
    id: 'csr-08',
    title: 'Drinking water access in remote hamlets',
    programme: 'water',
    geography: 'Karnataka',
    region: 'South',
    objective: 'Provide safe, reliable drinking water for under-served hamlets.',
    indicativeBudget: 55,
    duration: 18,
    expectedOutcomes: ['Household water access', 'Water-quality testing', 'Community maintenance plans'],
    status: 'Open for partnership',
    isIllustrative: true,
  },
  {
    id: 'csr-09',
    title: 'Digital and work-readiness skills for young women',
    programme: 'skills',
    geography: 'Tamil Nadu',
    region: 'South',
    objective: 'Equip young women with digital, communication and workplace skills.',
    indicativeBudget: 32,
    duration: 12,
    expectedOutcomes: ['Women trained', 'Internship and placement links', 'Mentoring circles'],
    status: 'Open for partnership',
    isIllustrative: true,
  },
]

/** Listed in programme order — Skill Development first. */
export const csrProjects = byProgrammeOrder(projectList, (p) => p.programme)

export const budgetBands = [
  { id: 'all', label: 'Any budget', min: 0, max: Infinity },
  { id: 'under-50', label: 'Under ₹50 lakh', min: 0, max: 49.99 },
  { id: '50-100', label: '₹50 lakh – ₹1 crore', min: 50, max: 100 },
  { id: 'over-100', label: 'Above ₹1 crore', min: 100.01, max: Infinity },
] as const

export const durationBands = [
  { id: 'all', label: 'Any duration', min: 0, max: Infinity },
  { id: 'short', label: 'Up to 12 months', min: 0, max: 12 },
  { id: 'medium', label: '13–24 months', min: 13, max: 24 },
  { id: 'long', label: 'Over 24 months', min: 25, max: Infinity },
] as const

export const regions = ['North', 'West', 'East', 'South', 'Central'] as const

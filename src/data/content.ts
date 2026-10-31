/** Shared editorial content used across pages. */

export const impactProcess = [
  {
    title: 'Understand community needs',
    description: 'Listen first. Participatory assessments map what communities have, what they lack and what they want to change.',
  },
  {
    title: 'Design targeted interventions',
    description: 'Combine programme areas into a plan built for that place, with clear indicators agreed up front.',
  },
  {
    title: 'Implement programmes',
    description: 'Deliver with local teams and community institutions, so capability stays when the project ends.',
  },
  {
    title: 'Measure and evaluate outcomes',
    description: 'Track indicators against a baseline, report transparently and feed what we learn into the next cycle.',
  },
]

export const csrLifecycle = [
  {
    title: 'Discovery and requirements',
    description: 'We understand your CSR policy, focus areas, geographies, budget and reporting needs.',
    output: 'Shared brief and alignment note',
  },
  {
    title: 'Programme design',
    description: 'A programme proposal with objectives, activities, budget, indicators and timelines.',
    output: 'Programme proposal and budget',
  },
  {
    title: 'Implementation',
    description: 'Field delivery with community institutions, with regular updates and site visits on request.',
    output: 'Implementation plan and progress updates',
  },
  {
    title: 'Monitoring and evaluation',
    description: 'Indicators tracked against baseline; course corrections agreed with you as the work unfolds.',
    output: 'Monitoring dashboard and review meetings',
  },
  {
    title: 'Reporting and impact assessment',
    description: 'Utilisation and outcome reporting aligned to your CSR compliance and disclosure needs.',
    output: 'Utilisation report and impact assessment',
  },
]

export const whyPartner = [
  {
    title: 'Programme expertise',
    description: 'Six programme areas — led by skill development with Self-Help Groups, alongside water, agriculture, health, women and livelihoods — designed to work together.',
  },
  {
    title: 'Community-oriented implementation',
    description: 'Work is planned with communities and delivered through local institutions that remain after the project.',
  },
  {
    title: 'Multi-sector approach',
    description: 'A 360-degree model that lets a single partnership address connected causes, not one symptom.',
  },
  {
    title: 'Geographical reach',
    description: 'Presence across multiple Indian states (14–15 per reference sources, pending confirmation).',
  },
  {
    title: 'Impact monitoring',
    description: 'Baselines, indicators and periodic reviews so you can see what your partnership is changing.',
  },
  {
    title: 'Institutional collaboration',
    description: 'Experience aligning with public programmes and institutions to extend reach and sustainability.',
  },
]

export const monitoringApproach = [
  { title: 'Baseline', description: 'Agreed indicators measured before work begins.' },
  { title: 'Routine monitoring', description: 'Activity and output tracking throughout implementation.' },
  { title: 'Periodic review', description: 'Joint reviews with partners to adjust course.' },
  { title: 'Endline & assessment', description: 'Outcome measurement against the baseline, with documented learning.' },
]

export const donationAmounts = [500, 1000, 2500, 5000] as const

/**
 * How a contribution is used — described qualitatively on purpose.
 * The brief forbids implying a fixed rupee-to-outcome relationship.
 */
export const contributionUses = [
  {
    title: 'Programme delivery',
    description: 'Field activities such as trainings, community meetings, demonstrations and outreach.',
  },
  {
    title: 'Community institutions',
    description: 'Strengthening the local groups and committees that sustain change after a project ends.',
  },
  {
    title: 'Monitoring and learning',
    description: 'Measuring outcomes so programmes improve and supporters can see results.',
  },
]

export const donationFaqs = [
  {
    q: 'Is this page taking real donations?',
    a: 'No. This is a prototype. The donation flow is simulated end to end: no payment is requested, and no money is transferred.',
  },
  {
    q: 'Will I receive a tax-exemption receipt?',
    a: 'Tax-exemption eligibility, such as under Section 80G, depends on the organisation’s registrations, which are pending verification. This will be confirmed before donations go live.',
  },
  {
    q: 'Can I choose which programme my donation supports?',
    a: 'In this prototype you can indicate a programme preference. In production, how preferences are honoured will be set out in the donation policy.',
  },
  {
    q: 'How will I know how my contribution was used?',
    a: 'The organisation intends to publish annual reports and audited financial statements on the Resources page once they are supplied and verified.',
  },
  {
    q: 'Can I set up a monthly contribution?',
    a: 'Yes — choose “Monthly” in the donation form. In this prototype it is recorded as a preference only; no mandate is created.',
  },
]

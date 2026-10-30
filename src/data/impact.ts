import type { CaseStudy, ImpactRecord, ProgrammeSlug, StateImpact } from './types'
import { programmes } from './programmes'

/**
 * ILLUSTRATIVE PROTOTYPE DATA
 * ------------------------------------------------------------------
 * Everything in this file is invented to demonstrate the impact
 * explorer and charts. None of it represents verified RAINVOUS results.
 * The selection of states is also illustrative: the organisation reports
 * presence in 14–15 states but has not yet supplied which ones.
 * Replace with the organisation's monitoring data in Phase 2.
 */

export const ILLUSTRATIVE_NOTE =
  'Illustrative prototype data — not verified RAINVOUS results.'

/** State ids match the @svg-maps/india asset. */
const stateSeeds: { id: string; name: string; programmes: ProgrammeSlug[] }[] = [
  { id: 'mh', name: 'Maharashtra', programmes: ['water', 'agriculture', 'skills', 'health', 'women', 'livelihoods'] },
  { id: 'gj', name: 'Gujarat', programmes: ['water', 'agriculture', 'livelihoods'] },
  { id: 'rj', name: 'Rajasthan', programmes: ['water', 'health', 'women'] },
  { id: 'mp', name: 'Madhya Pradesh', programmes: ['agriculture', 'water', 'livelihoods', 'women'] },
  { id: 'up', name: 'Uttar Pradesh', programmes: ['skills', 'health', 'women'] },
  { id: 'br', name: 'Bihar', programmes: ['health', 'skills', 'livelihoods'] },
  { id: 'jh', name: 'Jharkhand', programmes: ['agriculture', 'women', 'livelihoods'] },
  { id: 'or', name: 'Odisha', programmes: ['water', 'health', 'livelihoods'] },
  { id: 'wb', name: 'West Bengal', programmes: ['skills', 'women'] },
  { id: 'ct', name: 'Chhattisgarh', programmes: ['agriculture', 'health'] },
  { id: 'tg', name: 'Telangana', programmes: ['water', 'skills'] },
  { id: 'ap', name: 'Andhra Pradesh', programmes: ['agriculture', 'livelihoods'] },
  { id: 'ka', name: 'Karnataka', programmes: ['water', 'skills', 'health'] },
  { id: 'tn', name: 'Tamil Nadu', programmes: ['skills', 'women', 'health'] },
  { id: 'as', name: 'Assam', programmes: ['health', 'livelihoods'] },
]

// Deterministic pseudo-random so the prototype renders identically every time.
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const headlineMetric: Record<ProgrammeSlug, { name: string; unit: string; base: number }> = {
  water: { name: 'Households with improved water access', unit: 'households', base: 2400 },
  agriculture: { name: 'Farmers trained', unit: 'farmers', base: 1800 },
  skills: { name: 'Trainees completing courses', unit: 'people', base: 900 },
  health: { name: 'People screened', unit: 'people', base: 5200 },
  women: { name: 'Women’s groups supported', unit: 'groups', base: 140 },
  livelihoods: { name: 'Households with diversified income', unit: 'households', base: 1300 },
}

export const stateImpact: StateImpact[] = stateSeeds.map((s, si) => {
  const records: ImpactRecord[] = s.programmes.map((slug, pi) => {
    const m = headlineMetric[slug]
    const v = Math.round((m.base * (0.4 + seeded(si * 7 + pi) * 1.4)) / 10) * 10
    return {
      id: `${s.id}-${slug}`,
      programmeId: slug,
      geography: s.name,
      metricName: m.name,
      metricValue: v,
      unit: m.unit,
      reportingPeriod: 'Sample period',
      dataStatus: 'illustrative',
    }
  })
  return {
    id: s.id,
    name: s.name,
    programmes: s.programmes,
    projects: s.programmes.length + Math.round(seeded(si + 3) * 4),
    records,
    dataStatus: 'illustrative',
  }
})

export const stateById = Object.fromEntries(stateImpact.map((s) => [s.id, s])) as Record<string, StateImpact>

/** Number of illustrative projects per programme (derived from state data). */
export const programmeDistribution = programmes.map((p) => ({
  slug: p.slug,
  programme: p.title,
  colour: p.accentColour,
  projects: stateImpact.filter((s) => s.programmes.includes(p.slug)).reduce((n, s) => n + Math.ceil(s.projects / s.programmes.length), 0),
  states: stateImpact.filter((s) => s.programmes.includes(p.slug)).length,
}))

/** Illustrative yearly participation trend, in thousands of people reached. */
export const yearlyTrend = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((year, yi) => {
  const row: Record<string, string | number> = { year }
  programmes.forEach((p, pi) => {
    const base = [32, 26, 14, 48, 18, 22][pi]
    const dip = year === '2020' ? 0.72 : 1
    row[p.slug] = Math.round(base * (1 + yi * 0.16 + seeded(yi * 11 + pi) * 0.12) * dip)
  })
  return row
})

/** Illustrative baseline vs. endline outcome indicators (percent). */
export const outcomeComparison: { slug: ProgrammeSlug; indicator: string; baseline: number; endline: number }[] = [
  { slug: 'water', indicator: 'Households with year-round water', baseline: 38, endline: 71 },
  { slug: 'agriculture', indicator: 'Farmers using sustainable practices', baseline: 22, endline: 58 },
  { slug: 'skills', indicator: 'Trainees in work after 6 months', baseline: 0, endline: 64 },
  { slug: 'health', indicator: 'Institutional deliveries', baseline: 61, endline: 84 },
  { slug: 'women', indicator: 'Women with own bank account', baseline: 44, endline: 79 },
  { slug: 'livelihoods', indicator: 'Households with 2+ income sources', baseline: 31, endline: 56 },
]

/** Sample case studies. No real beneficiaries, places or quotes. */
export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-water',
    programme: 'water',
    title: 'A village water plan, written by the village',
    setting: 'Sample setting: a rain-dependent village cluster',
    summary:
      'A sample scenario showing how participatory water budgeting can help a community decide where to invest in recharge and storage.',
    approach: ['Community water-resource mapping', 'Prioritised recharge structures', 'User committee for upkeep'],
    observedChange: 'In this illustration, water availability extends further into the dry season.',
    isIllustrative: true,
  },
  {
    id: 'cs-women',
    programme: 'women',
    title: 'From savings group to enterprise collective',
    setting: 'Sample setting: a women’s self-help federation',
    summary:
      'A sample scenario tracing how a savings group could grow into a collective running a small processing enterprise.',
    approach: ['Financial literacy and bank linkage', 'Enterprise skills', 'Market linkage support'],
    observedChange: 'In this illustration, members gain a second, independent source of income.',
    isIllustrative: true,
  },
  {
    id: 'cs-skills',
    programme: 'skills',
    title: 'Training designed around the jobs nearby',
    setting: 'Sample setting: a peri-urban youth cohort',
    summary:
      'A sample scenario showing how a labour-market scan can shape which trades are offered, so training leads to placement.',
    approach: ['Local labour-market scan', 'Demand-led trade selection', 'Post-placement mentoring'],
    observedChange: 'In this illustration, most of the cohort is in work six months after training.',
    isIllustrative: true,
  },
]

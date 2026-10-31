import { Droplets, Sprout, GraduationCap, HeartPulse, UsersRound, Coins } from 'lucide-react'
import type { Programme, ProgrammeSlug } from './types'

/**
 * ORDER MATTERS: this array defines programme order everywhere on the site
 * (cards, filters, selectors, diagrams). Skill Development is first at the
 * founder's request.
 *
 * Programme themes are taken from the organisation's existing prototype.
 * Interventions, activities and indicators below describe the *kind* of
 * work each programme area covers. They are not claims that a specific
 * intervention is currently active — confirm with the organisation.
 */
export const programmes: Programme[] = [
  {
    id: 'prog-skills',
    slug: 'skills',
    title: 'Skill Development',
    shortTitle: 'Skills',
    tagline: 'Skills that strengthen Self-Help Groups.',
    description:
      'Skill development and capacity building with Self-Help Groups (SHGs), aligned with Skill India schemes, creating pathways to sustainable livelihoods.',
    overview: [
      'Rainvows works with Self-Help Groups (SHGs) under Skill India schemes. SHGs bring people — very often women — together around savings, mutual support and shared enterprise. Skill development turns that collective strength into income.',
      'This programme area focuses on building practical, market-relevant skills within SHGs, strengthening the groups themselves, and connecting what members learn to employment, enterprise and wider livelihood opportunities.',
    ],
    developmentChallenge:
      'Self-Help Group members often have the will and the collective structure to earn more, but lack market-relevant skills, training access and a route from training to income.',
    challenges: [
      'Limited access to quality, market-relevant training close to home',
      'Training that ends without a clear path to work or enterprise',
      'Uneven group capacity in planning, bookkeeping and collective enterprise',
      'Low awareness of the skilling schemes members may be eligible for',
    ],
    interventions: [
      { title: 'SHG mobilisation & strengthening', description: 'Supporting groups to organise, plan and govern themselves well.' },
      { title: 'Skill training', description: 'Practical, market-relevant skills delivered in line with applicable Skill India schemes.' },
      { title: 'Capacity building', description: 'Group management, financial literacy, digital and work-readiness skills.' },
      { title: 'Livelihood & enterprise pathways', description: 'Linking trained members to employment, self-employment or collective enterprise.' },
    ],
    activities: [
      'Identifying and engaging Self-Help Groups',
      'Assessing skill needs against local market demand',
      'Mobilising members into training aligned with Skill India schemes',
      'Post-training support towards work or enterprise',
    ],
    expectedOutcomes: [
      'Members with recognised, market-relevant skills',
      'Stronger, better-managed Self-Help Groups',
      'New or higher income from employment or enterprise',
      'Wider community participation in skilling opportunities',
    ],
    impactIndicators: [
      { name: 'Self-Help Groups engaged', unit: 'groups' },
      { name: 'Members trained', unit: 'people' },
      { name: 'Members completing certification, where applicable', unit: 'people' },
      { name: 'Members in employment or enterprise after training', unit: '%' },
    ],
    csrThemes: ['Vocational skills', 'Livelihood enhancement', 'Empowering women', 'Education'],
    governmentThemes: 'Skill development',
    icon: GraduationCap,
    accentColour: '#B54A20',
    accentVar: 'var(--rv-skills)',
    spotlight: {
      positioning:
        'Strengthening Self-Help Groups through skill development initiatives aligned with Skill India schemes, creating pathways towards sustainable livelihoods and economic participation.',
      positioningStatus: 'draft',
      context: [
        'Self-Help Groups are small community groups — often of women — who save together, lend to one another and increasingly run shared enterprises.',
        'Skill India is the Government of India’s national skilling mission. Its schemes fund and standardise training so that skills are recognised and portable.',
        'Working through SHGs means training reaches people inside an existing support network, which helps skills turn into lasting income.',
      ],
      pathway: [
        { title: 'Engage Self-Help Groups', description: 'Identify groups and members interested in building new skills.' },
        { title: 'Map skills to demand', description: 'Match members’ interests with skills that local markets and employers need.' },
        { title: 'Train and certify', description: 'Deliver training aligned with applicable Skill India schemes, with certification where the scheme provides it.' },
        { title: 'Build livelihood pathways', description: 'Support employment, self-employment or collective SHG enterprise after training.' },
        { title: 'Measure outcomes', description: 'Track participation, completion and income change against a baseline.' },
      ],
      schemeAlignment: {
        summary:
          'Rainvows works with SHGs under Skill India schemes. The specific schemes, implementation roles and any registrations are to be confirmed by the organisation before they are published.',
        ecosystemExamples: ['PMKVY', 'Jan Shikshan Sansthan (JSS)'],
      },
      placeholders: [
        { label: 'Skill India schemes Rainvows works under', note: 'Scheme names and Rainvows’ role in each' },
        { label: 'Number of SHGs supported', note: 'With reporting period and source' },
        { label: 'Number of members trained', note: 'With reporting period and source' },
        { label: 'Trades and training offered', note: 'Courses currently delivered' },
        { label: 'Training locations', note: 'States, districts or centres' },
        { label: 'Certification and outcomes', note: 'Certification, placement or enterprise figures, if tracked' },
      ],
      schemeLogo: {
        src: '/brand/skill-india-logo.png',
        alt: 'Skill India — Kaushal Bharat, Kushal Bharat',
        caption: 'Rainvows works with Self-Help Groups under Skill India schemes.',
      },
      livelihoodLink:
        'Skill development is the first step in the Rainvows approach. Skills create the capability; the livelihoods, women’s empowerment and agriculture programmes help turn that capability into stable household income.',
    },
  },
  {
    id: 'prog-water',
    slug: 'water',
    title: 'Water',
    shortTitle: 'Water',
    tagline: 'Reliable water for homes, fields and futures.',
    description:
      'Water access, conservation and resource management that help communities build sustainable water systems of their own.',
    overview: [
      'Water sits upstream of almost every other development outcome. When a household spends hours each day collecting it, or a harvest depends on a single unreliable season, progress in health, education and income stalls.',
      'The water programme area focuses on access, conservation and the local institutions that look after shared water resources over the long term.',
    ],
    developmentChallenge:
      'Seasonal scarcity, depleting groundwater and limited local capacity to manage shared water resources.',
    challenges: [
      'Seasonal scarcity and dependence on erratic rainfall',
      'Declining groundwater tables in agricultural regions',
      'Limited community ownership of water infrastructure',
      'Time burden of water collection, which falls largely on women and girls',
    ],
    interventions: [
      { title: 'Water access', description: 'Improving the availability of safe water for household and community use.' },
      { title: 'Conservation & recharge', description: 'Rainwater harvesting and recharge structures that restore local water balance.' },
      { title: 'Resource management', description: 'Water budgeting and planning tools that communities can maintain themselves.' },
      { title: 'Community water institutions', description: 'Strengthening user groups to operate and maintain shared systems.' },
    ],
    activities: [
      'Participatory water-resource mapping',
      'Construction or rejuvenation of harvesting structures',
      'Training of local water user committees',
      'Water-quality awareness sessions',
    ],
    expectedOutcomes: [
      'More reliable year-round water availability',
      'Reduced time spent collecting water',
      'Improved groundwater recharge',
      'Locally owned operation and maintenance',
    ],
    impactIndicators: [
      { name: 'Households with improved water access', unit: 'households' },
      { name: 'Water storage capacity created', unit: 'cubic metres' },
      { name: 'Active water user committees', unit: 'committees' },
      { name: 'Change in pre-monsoon water level', unit: 'metres' },
    ],
    csrThemes: ['Safe drinking water', 'Sanitation', 'Environmental sustainability', 'Rural development'],
    governmentThemes: 'Water and sanitation',
    icon: Droplets,
    accentColour: '#164A91',
    accentVar: 'var(--rv-water)',
  },
  {
    id: 'prog-agriculture',
    slug: 'agriculture',
    title: 'Agriculture',
    shortTitle: 'Agriculture',
    tagline: 'Stronger farms built on sustainable practice.',
    description:
      'Agricultural development, sustainable farming practices and stronger farmer capabilities that raise productivity.',
    overview: [
      'For most rural households, agriculture is both livelihood and food security. Small landholdings, rising input costs and climate variability make farm incomes fragile.',
      'This programme area centres on practical, sustainable farming methods and the knowledge and collective strength farmers need to adopt them.',
    ],
    developmentChallenge:
      'Low productivity on small landholdings, rising input costs and growing climate risk.',
    challenges: [
      'Fragmented, rain-dependent smallholdings',
      'Soil health decline and high input costs',
      'Limited access to extension services and market information',
      'Exposure to climate variability',
    ],
    interventions: [
      { title: 'Sustainable practices', description: 'Soil and water conserving methods suited to local conditions.' },
      { title: 'Farmer capability', description: 'Field-based learning so farmers can test and adopt new techniques.' },
      { title: 'Productivity support', description: 'Improved seed, crop planning and diversification approaches.' },
      { title: 'Collective action', description: 'Farmer groups that pool knowledge, inputs and bargaining power.' },
    ],
    activities: [
      'Farmer field schools and demonstration plots',
      'Soil-health testing and advisory',
      'Crop diversification planning',
      'Formation and support of farmer groups',
    ],
    expectedOutcomes: [
      'Higher, more stable yields',
      'Reduced input costs per acre',
      'Wider adoption of sustainable practices',
      'Stronger farmer collectives',
    ],
    impactIndicators: [
      { name: 'Farmers trained', unit: 'farmers' },
      { name: 'Area under sustainable practices', unit: 'acres' },
      { name: 'Change in yield per acre', unit: '%' },
      { name: 'Farmer groups supported', unit: 'groups' },
    ],
    csrThemes: ['Rural development', 'Environmental sustainability', 'Eradicating hunger and poverty'],
    governmentThemes: 'Agriculture',
    icon: Sprout,
    accentColour: '#4F7A35',
    accentVar: 'var(--rv-agriculture)',
  },
  {
    id: 'prog-health',
    slug: 'health',
    title: 'Health',
    shortTitle: 'Health',
    tagline: 'Care that reaches every stage of life.',
    description:
      'Maternal, child and adolescent health, communicable and non-communicable diseases, curative health and WASH.',
    overview: [
      'Good health is the foundation for learning, work and resilience. Gaps in maternal and child care, and the growing burden of both communicable and non-communicable disease, hit the poorest households hardest.',
      'The health programme area spans the life cycle — from mothers and infants to adolescents and adults — and connects curative care with water, sanitation and hygiene (WASH).',
    ],
    developmentChallenge:
      'Gaps in preventive and curative care across the life cycle, compounded by poor water, sanitation and hygiene.',
    challenges: [
      'Maternal, newborn and child health gaps',
      'Adolescent nutrition and health awareness',
      'Rising burden of non-communicable disease',
      'Inadequate water, sanitation and hygiene facilities',
    ],
    interventions: [
      { title: 'Maternal, child & adolescent health', description: 'Support across pregnancy, early childhood and adolescence.' },
      { title: 'Communicable disease', description: 'Prevention, awareness and early detection.' },
      { title: 'Non-communicable disease', description: 'Screening and lifestyle risk reduction for chronic conditions.' },
      { title: 'Curative health & WASH', description: 'Access to treatment alongside water, sanitation and hygiene.' },
    ],
    activities: [
      'Community health camps and screenings',
      'Health worker and volunteer training',
      'Adolescent health sessions',
      'WASH facility improvement and hygiene promotion',
    ],
    expectedOutcomes: [
      'Better maternal and child health practices',
      'Earlier detection of disease',
      'Improved hygiene behaviour',
      'Stronger links to public health services',
    ],
    impactIndicators: [
      { name: 'People screened', unit: 'people' },
      { name: 'Health volunteers trained', unit: 'people' },
      { name: 'Households with improved sanitation', unit: 'households' },
      { name: 'Referrals completed', unit: '%' },
    ],
    csrThemes: ['Preventive healthcare', 'Sanitation', 'Safe drinking water'],
    governmentThemes: 'Health',
    icon: HeartPulse,
    accentColour: '#1F7A80',
    accentVar: 'var(--rv-health)',
  },
  {
    id: 'prog-women',
    slug: 'women',
    title: 'Women',
    shortTitle: 'Women',
    tagline: 'Women leading change in their communities.',
    description:
      "Women's empowerment, participation, economic opportunity and leadership in community decision-making.",
    overview: [
      'When women have income, voice and access to institutions, the benefits extend to their families and communities. Yet women remain under-represented in economic activity and local leadership.',
      "This programme area works on women's collective organisation, economic opportunity and participation in the decisions that shape their communities.",
    ],
    developmentChallenge:
      'Limited access to income, finance and decision-making spaces for women, particularly in rural areas.',
    challenges: [
      'Low participation in paid and skilled work',
      'Limited access to credit and financial services',
      'Under-representation in local governance',
      'Social norms that restrict mobility and choice',
    ],
    interventions: [
      { title: 'Collective organisation', description: 'Women’s groups as platforms for savings, learning and voice.' },
      { title: 'Economic opportunity', description: 'Enterprise, skills and market access designed with women.' },
      { title: 'Financial inclusion', description: 'Literacy and linkages to formal financial services.' },
      { title: 'Leadership & participation', description: 'Support for women taking roles in community institutions.' },
    ],
    activities: [
      'Formation and strengthening of women’s groups',
      'Enterprise development support',
      'Financial literacy sessions',
      'Leadership development programmes',
    ],
    expectedOutcomes: [
      'More women earning independent income',
      'Greater access to formal finance',
      'Increased participation in local institutions',
      'Stronger women-led collectives',
    ],
    impactIndicators: [
      { name: 'Women’s groups supported', unit: 'groups' },
      { name: 'Women-led enterprises', unit: 'enterprises' },
      { name: 'Women with bank linkages', unit: 'women' },
      { name: 'Women in leadership roles', unit: 'women' },
    ],
    csrThemes: ['Gender equality', 'Empowering women', 'Livelihood enhancement'],
    governmentThemes: "Women's empowerment",
    icon: UsersRound,
    accentColour: '#9C3F63',
    accentVar: 'var(--rv-women)',
  },
  {
    id: 'prog-livelihoods',
    slug: 'livelihoods',
    title: 'Livelihoods',
    shortTitle: 'Livelihoods',
    tagline: 'Income that holds up through hard seasons.',
    description:
      'Income opportunities, economic resilience and sustainable livelihoods that strengthen family prosperity.',
    overview: [
      'A single source of income leaves families exposed to one bad season, one illness or one market shock. Durable prosperity depends on diverse, resilient livelihoods.',
      'The livelihoods programme area draws the other five together — skill development, water, agriculture, health and women’s leadership — into income that lasts.',
    ],
    developmentChallenge:
      'Income that is low, irregular and concentrated in a single source, leaving families vulnerable to shocks.',
    challenges: [
      'Dependence on a single, seasonal income source',
      'Limited access to markets and value chains',
      'Low household savings and resilience',
      'Distress migration in lean seasons',
    ],
    interventions: [
      { title: 'Income diversification', description: 'New farm and non-farm income streams for households.' },
      { title: 'Enterprise & market access', description: 'Linking producers to buyers, value chains and services.' },
      { title: 'Economic resilience', description: 'Savings, insurance awareness and risk planning.' },
      { title: 'Integrated household planning', description: 'Combining support across programme areas for each family.' },
    ],
    activities: [
      'Household livelihood planning',
      'Producer group and value-chain support',
      'Micro-enterprise incubation',
      'Linkages to social protection schemes',
    ],
    expectedOutcomes: [
      'Higher and more diversified household income',
      'Greater resilience to shocks',
      'Reduced distress migration',
      'Improved household prosperity',
    ],
    impactIndicators: [
      { name: 'Households with diversified income', unit: 'households' },
      { name: 'Enterprises supported', unit: 'enterprises' },
      { name: 'Change in household income', unit: '%' },
      { name: 'Scheme linkages facilitated', unit: 'linkages' },
    ],
    csrThemes: ['Eradicating poverty', 'Livelihood enhancement', 'Rural development'],
    governmentThemes: 'Rural livelihoods',
    icon: Coins,
    accentColour: '#8F6209',
    accentVar: 'var(--rv-livelihoods)',
  },
]

export const programmeBySlug = Object.fromEntries(programmes.map((p) => [p.slug, p])) as Record<ProgrammeSlug, Programme>

export const programmeSlugs = programmes.map((p) => p.slug)

/** Sort any list of items by the site-wide programme order (Skill Development first). */
export function byProgrammeOrder<T>(items: T[], slugOf: (item: T) => ProgrammeSlug): T[] {
  return [...items].sort((a, b) => programmeSlugs.indexOf(slugOf(a)) - programmeSlugs.indexOf(slugOf(b)))
}

export function getProgramme(slug: string | undefined): Programme | undefined {
  return programmes.find((p) => p.slug === slug)
}

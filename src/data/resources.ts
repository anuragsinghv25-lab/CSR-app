import type { Resource, ResourceCategory } from './types'

/**
 * PROTOTYPE DOCUMENT ENTRIES — metadata only. No files exist yet, so the
 * UI never offers a download. Replace `documentStatus` with an actual
 * file URL in Phase 2 once documents are supplied and verified.
 */
export const resourceCategories: ResourceCategory[] = [
  'Annual reports',
  'Financial reports',
  'Impact assessments',
  'Programme documents',
  'Certifications',
  'Organisational information',
]

export const resources: Resource[] = [
  { id: 'r01', title: 'Annual Report 2024–25', category: 'Annual reports', year: 2025, fileType: 'PDF', description: 'Overview of the year’s programmes, partnerships and organisational developments.', documentStatus: 'Awaiting upload' },
  { id: 'r02', title: 'Annual Report 2023–24', category: 'Annual reports', year: 2024, fileType: 'PDF', description: 'Overview of the year’s programmes, partnerships and organisational developments.', documentStatus: 'Awaiting upload' },
  { id: 'r03', title: 'Annual Report 2022–23', category: 'Annual reports', year: 2023, fileType: 'PDF', description: 'Overview of the year’s programmes, partnerships and organisational developments.', documentStatus: 'Awaiting upload' },
  { id: 'r04', title: 'Audited Financial Statements 2024–25', category: 'Financial reports', year: 2025, fileType: 'PDF', description: 'Audited balance sheet, income and expenditure account and auditor’s report.', documentStatus: 'Awaiting upload' },
  { id: 'r05', title: 'Audited Financial Statements 2023–24', category: 'Financial reports', year: 2024, fileType: 'PDF', description: 'Audited balance sheet, income and expenditure account and auditor’s report.', documentStatus: 'Awaiting upload' },
  { id: 'r06', title: 'Fund Utilisation Summary 2024–25', category: 'Financial reports', year: 2025, fileType: 'XLSX', description: 'Programme-wise summary of fund utilisation.', documentStatus: 'Awaiting upload' },
  { id: 'r07', title: 'Water Programme Impact Assessment', category: 'Impact assessments', year: 2024, fileType: 'PDF', description: 'Assessment of outcomes in the water programme area.', documentStatus: 'Awaiting upload' },
  { id: 'r08', title: 'Livelihoods Programme Impact Assessment', category: 'Impact assessments', year: 2023, fileType: 'PDF', description: 'Assessment of household income and resilience outcomes.', documentStatus: 'Awaiting upload' },
  { id: 'r09', title: 'Programme Framework: 360-Degree Approach', category: 'Programme documents', year: 2025, fileType: 'PDF', description: 'How the six programme areas connect to community prosperity.', documentStatus: 'Awaiting upload' },
  { id: 'r10', title: 'Monitoring & Evaluation Framework', category: 'Programme documents', year: 2024, fileType: 'DOCX', description: 'Indicators, data collection and reporting approach.', documentStatus: 'Awaiting upload' },
  { id: 'r11', title: 'CSR-1 Registration', category: 'Certifications', year: 2025, fileType: 'PDF', description: 'Registration for undertaking CSR activities, if applicable.', documentStatus: 'Pending verification' },
  { id: 'r12', title: '12A and 80G Registration', category: 'Certifications', year: 2025, fileType: 'PDF', description: 'Income-tax registrations, where applicable.', documentStatus: 'Pending verification' },
  { id: 'r13', title: 'CRISIL Rating Report', category: 'Certifications', year: 2024, fileType: 'PDF', description: 'Rating shown on the supplied prototype as 9.27/10.', documentStatus: 'Pending verification' },
  { id: 'r14', title: 'Legal Registration Certificate', category: 'Organisational information', year: 2025, fileType: 'PDF', description: 'Certificate of the organisation’s legal registration.', documentStatus: 'Pending verification' },
  { id: 'r15', title: 'Organisation Profile', category: 'Organisational information', year: 2025, fileType: 'PDF', description: 'Summary of history, governance, programmes and geography.', documentStatus: 'Awaiting upload' },
]

/** Credential categories shown on partnership pages. Existence not yet confirmed. */
export const credentialCategories = [
  { title: 'CSR-1 registration', note: 'Required for receiving CSR funds, if applicable' },
  { title: '12A and 80G', note: 'Income-tax registrations, where applicable' },
  { title: 'Legal registration', note: 'Registration certificate and constitution' },
  { title: 'Annual reports', note: 'Programme and organisational reporting' },
  { title: 'Audited financial statements', note: 'Independent audit of accounts' },
  { title: 'Impact assessment reports', note: 'Programme outcome assessments' },
  { title: 'Programme documentation', note: 'Frameworks, designs and M&E approach' },
]

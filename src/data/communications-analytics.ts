/** Mock analytics and supporting data for the Communications Hub. */

export const responseRateTrends = [
  { month: 'Oct', email: 32, sms: 44, whatsapp: 58 },
  { month: 'Nov', email: 34, sms: 45, whatsapp: 60 },
  { month: 'Dec', email: 30, sms: 42, whatsapp: 55 },
  { month: 'Jan', email: 36, sms: 48, whatsapp: 64 },
  { month: 'Feb', email: 38, sms: 47, whatsapp: 62 },
  { month: 'Mar', email: 35, sms: 46, whatsapp: 65 },
]

export const bestTimesHeatmap = [
  { x: 'Mon', y: '9am', value: 12 }, { x: 'Tue', y: '9am', value: 15 },
  { x: 'Wed', y: '9am', value: 18 }, { x: 'Thu', y: '9am', value: 14 },
  { x: 'Fri', y: '9am', value: 10 },
  { x: 'Mon', y: '10am', value: 14 }, { x: 'Tue', y: '10am', value: 22 },
  { x: 'Wed', y: '10am', value: 16 }, { x: 'Thu', y: '10am', value: 13 },
  { x: 'Fri', y: '10am', value: 11 },
  { x: 'Mon', y: '11am', value: 10 }, { x: 'Tue', y: '11am', value: 18 },
  { x: 'Wed', y: '11am', value: 14 }, { x: 'Thu', y: '11am', value: 11 },
  { x: 'Fri', y: '11am', value: 9 },
  { x: 'Mon', y: '12pm', value: 8 }, { x: 'Tue', y: '12pm', value: 10 },
  { x: 'Wed', y: '12pm', value: 12 }, { x: 'Thu', y: '12pm', value: 9 },
  { x: 'Fri', y: '12pm', value: 7 },
  { x: 'Mon', y: '2pm', value: 11 }, { x: 'Tue', y: '2pm', value: 13 },
  { x: 'Wed', y: '2pm', value: 15 }, { x: 'Thu', y: '2pm', value: 12 },
  { x: 'Fri', y: '2pm', value: 8 },
  { x: 'Mon', y: '3pm', value: 14 }, { x: 'Tue', y: '3pm', value: 16 },
  { x: 'Wed', y: '3pm', value: 20 }, { x: 'Thu', y: '3pm', value: 15 },
  { x: 'Fri', y: '3pm', value: 11 },
]

export const segmentEffectiveness = [
  { segment: 'BA (Email)', rate: 42 },
  { segment: 'BA (SMS)', rate: 48 },
  { segment: 'BA (WhatsApp)', rate: 55 },
  { segment: 'ICT (Email)', rate: 38 },
  { segment: 'ICT (SMS)', rate: 52 },
  { segment: 'ICT (WhatsApp)', rate: 68 },
  { segment: 'DM (Email)', rate: 40 },
  { segment: 'DM (SMS)', rate: 50 },
  { segment: 'DM (WhatsApp)', rate: 60 },
]

export const sequenceFunnelData: Record<string, { name: string; value: number }[]> = {
  'seq-001': [
    { name: 'Step 1: Email (Day 1)', value: 14 },
    { name: 'Step 2: SMS (Day 5)', value: 9 },
    { name: 'Step 3: WhatsApp (Day 10)', value: 6 },
    { name: 'Step 4: Email (Day 15)', value: 4 },
    { name: 'Step 5: Escalate (Day 20)', value: 2 },
  ],
  'seq-002': [
    { name: 'Step 1: Email (Day 0)', value: 8 },
    { name: 'Step 2: SMS (Day -3)', value: 7 },
  ],
  'seq-003': [
    { name: 'Step 1: Email (Day 3)', value: 5 },
    { name: 'Step 2: Email (Day 7)', value: 3 },
    { name: 'Step 3: Escalate (Day 10)', value: 1 },
  ],
}

/** Per-step response rates for automated sequence cards. */
export const stepResponseRates: Record<string, number[]> = {
  'seq-001': [85, 62, 45, 30, 0],
  'seq-002': [95, 92],
  'seq-003': [60, 48, 0],
}

/** Per-recipient delivery status for expanded campaign rows. */
export const campaignRecipientStatus: Record<string, { name: string; status: string }[]> = {
  'camp-mar-placement': [
    { name: 'Priya Sharma', status: 'opened' },
    { name: 'Chris Loh', status: 'delivered' },
    { name: 'Wei Ming', status: 'responded' },
    { name: 'Kumar S.', status: 'opened' },
    { name: 'Raj Patel', status: 'opened' },
    { name: 'Fiona Cheng', status: 'responded' },
  ],
  'camp-doc-reminder': [
    { name: 'Wei Ming', status: 'responded' },
    { name: 'Priya Sharma', status: 'delivered' },
    { name: 'David Ng', status: 'responded' },
    { name: 'Lisa Koh', status: 'delivered' },
  ],
  'camp-q1-employer': [
    { name: 'TechCorp Pte Ltd', status: 'responded' },
    { name: 'DataInsights Pte Ltd', status: 'opened' },
    { name: 'FinanceFirst Pte Ltd', status: 'opened' },
  ],
}

/** Sample merge-field values for the template preview renderer. */
export const templateSampleData: Record<string, string> = {
  trainee_name: 'Marcus Lee',
  programme_name: 'Business Analyst Certification',
  start_date: '3 Mar 2026',
  venue: 'NTUC LearningHub, Level 5',
  coordinator_name: 'Sarah Tan',
  application_ref: 'APP-2026-0142',
  module_name: 'Module 1: Business Fundamentals',
  new_date: '10 Mar 2026',
  score: '82',
  grade: 'Merit',
  additional_feedback: 'Strong analytical skills demonstrated in case study.',
  document_deadline: '31 Mar 2026',
  employer_name: 'TechCorp Pte Ltd',
  contact_name: 'Jennifer Loh',
  role_title: 'Junior Business Analyst',
  match_score: '87',
  available_date: '1 Apr 2026',
  submission_date: '10 Mar 2026',
  additional_count: '3',
  interview_date: '18 Mar 2026',
  status_change: 'Placed',
  new_status: 'Placed - Verified',
  reason: 'Employment verification documents confirmed.',
  deadline_description: 'Employment document submission',
  deadline_date: '31 Mar 2026',
  pending_item: 'employment documents',
  cohort_date: 'January 2026',
}

import { DataCompletenessCheck, MonthlyMetric, ProgrammeMetrics, ReportHistoryEntry, ReportTemplate } from '@/types'

export const monthlyMetrics: MonthlyMetric[] = [
  {
    month: 'Oct 2025',
    enrolments: 18,
    completions: 12,
    placements: 8,
    verifications: 6,
    placementRate: 67,
  },
  {
    month: 'Nov 2025',
    enrolments: 15,
    completions: 14,
    placements: 9,
    verifications: 7,
    placementRate: 64,
  },
  {
    month: 'Dec 2025',
    enrolments: 10,
    completions: 13,
    placements: 10,
    verifications: 8,
    placementRate: 77,
  },
  {
    month: 'Jan 2026',
    enrolments: 22,
    completions: 15,
    placements: 12,
    verifications: 10,
    placementRate: 80,
  },
  {
    month: 'Feb 2026',
    enrolments: 20,
    completions: 16,
    placements: 13,
    verifications: 11,
    placementRate: 81,
  },
  {
    month: 'Mar 2026',
    enrolments: 25,
    completions: 14,
    placements: 11,
    verifications: 9,
    placementRate: 79,
  },
  {
    month: 'Apr 2026 (projected)',
    enrolments: 18,
    completions: 17,
    placements: 14,
    verifications: 12,
    placementRate: 82,
  },
  {
    month: 'May 2026 (projected)',
    enrolments: 20,
    completions: 18,
    placements: 15,
    verifications: 13,
    placementRate: 83,
  },
  {
    month: 'Jun 2026 (projected)',
    enrolments: 28,
    completions: 15,
    placements: 12,
    verifications: 10,
    placementRate: 80,
  },
  {
    month: 'Jul 2026 (projected)',
    enrolments: 22,
    completions: 20,
    placements: 16,
    verifications: 14,
    placementRate: 80,
  },
  {
    month: 'Aug 2026 (projected)',
    enrolments: 20,
    completions: 19,
    placements: 16,
    verifications: 14,
    placementRate: 84,
  },
  {
    month: 'Sep 2026 (projected)',
    enrolments: 18,
    completions: 20,
    placements: 17,
    verifications: 15,
    placementRate: 85,
  },
]

export const programmeMetrics: ProgrammeMetrics[] = [
  {
    programmeId: 'ict',
    completionRate: 83,
    placementRate: 75,
    avgTimeToPlacement: 38,
    enrolmentConversion: 78,
  },
  {
    programmeId: 'ba',
    completionRate: 85,
    placementRate: 70,
    avgTimeToPlacement: 45,
    enrolmentConversion: 75,
  },
  {
    programmeId: 'dm',
    completionRate: 80,
    placementRate: 68,
    avgTimeToPlacement: 42,
    enrolmentConversion: 70,
  },
]

export const pipelineCounts = {
  applied: 6,
  enrolled: 25,
  training: 18,
  completed: 33,
  placed: 21,
  verified: 14,
}

export const dashboardKpis = {
  totalActiveTrainees: {
    value: 76,
    trend: 8,
    trendDirection: 'up' as const,
  },
  overallPlacementRate: {
    value: 72,
    target: 80,
    trend: 4,
    trendDirection: 'up' as const,
  },
  pendingVerifications: {
    value: 14,
    trend: -3,
    trendDirection: 'down' as const,
  },
  atRiskPlacements: {
    value: 5,
    trend: 2,
    trendDirection: 'up' as const,
  },
}

export const placementFunnel = [
  { stage: 'Applications Received', count: 156, conversionRate: 100 },
  { stage: 'Enrolled', count: 118, conversionRate: 76 },
  { stage: 'Completed Training', count: 98, conversionRate: 83 },
  { stage: 'Employment Verified', count: 71, conversionRate: 72 },
  { stage: '6-Month Retention', count: 52, conversionRate: 73 },
]

export const sectorBreakdown = [
  { sector: 'Technology', percentage: 42 },
  { sector: 'Financial Services', percentage: 23 },
  { sector: 'Professional Services', percentage: 18 },
  { sector: 'Retail & Commerce', percentage: 12 },
  { sector: 'Other', percentage: 5 },
]

export const reportHistory: ReportHistoryEntry[] = [
  { name: 'SSG Training Grant Claim', generated: '2026-03-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'WSG Monthly Placement Return', generated: '2026-03-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'SSG Training Grant Claim', generated: '2026-02-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'WSG Monthly Placement Return', generated: '2026-02-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'IMDA Performance Summary', generated: '2026-01-01', by: 'James Lim', status: 'submitted' },
]

export const dataCompletenessChecks: DataCompletenessCheck[] = [
  { label: 'Trainee Records', status: 'complete', count: '25/25' },
  { label: 'Employment Verified', status: 'partial', count: '14/21' },
  { label: 'Document Archive', status: 'complete', count: '30/30' },
  { label: 'Employer Confirmations', status: 'partial', count: '6/8' },
]

export const reportTemplates: ReportTemplate[] = [
  {
    id: 'ssg-training-grant',
    name: 'SSG Training Grant Claim Submission',
    lastGenerated: '2026-03-01',
    nextDue: '2026-04-01',
    status: 'ready',
  },
  {
    id: 'wsg-monthly',
    name: 'WSG Monthly Placement Outcome Return',
    lastGenerated: '2026-03-01',
    nextDue: '2026-04-01',
    status: 'ready',
  },
  {
    id: 'imda-performance',
    name: 'IMDA Programme Performance Summary',
    lastGenerated: '2026-01-01',
    nextDue: '2026-04-01',
    status: 'pending_data',
  },
  {
    id: 'internal-quarterly',
    name: 'Internal Quarterly Review',
    lastGenerated: undefined,
    nextDue: '2026-04-01',
    status: 'overdue',
  },
]

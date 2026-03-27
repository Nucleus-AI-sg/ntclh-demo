export interface MonthlyMetric {
  month: string
  enrolments: number
  completions: number
  placements: number
  verifications: number
  placementRate: number
}

export interface ProgrammeMetrics {
  programmeId: string
  completionRate: number
  placementRate: number
  avgTimeToPlacement: number
  enrolmentConversion: number
}

export interface AiPerformanceSnapshot {
  month: string
  assessmentAccuracy: number
  matchingAccuracy: number
  verificationAccuracy: number
  overallAccuracy: number
  overrideRate: number
}

export interface ModelVersion {
  version: string
  date: string
  keyChanges: string
  accuracyImprovement: string
}

export interface IntegrationConfig {
  id: string
  name: string
  status: 'connected' | 'planned'
  lastSync?: string
  recordsSynced?: string
  purpose: string
  plannedDate?: string
}

export interface ReportTemplate {
  id: string
  name: string
  lastGenerated?: string
  nextDue: string
  status: 'ready' | 'pending_data' | 'overdue'
}

export interface ReportHistoryEntry {
  name: string
  generated: string
  by: string
  status: string
}

export interface DataCompletenessCheck {
  label: string
  status: 'complete' | 'partial'
  count: string
}

export interface FeatureImportance {
  feature: string
  weight: number
}

export interface OverridePattern {
  type: string
  count: number
  aiWasRight: number
  aiWasWrong: number
}

export interface StrategicInsight {
  category: 'enrolment' | 'training' | 'placement' | 'labour_market'
  insight: string
  supportingData?: string
}

export interface MatchingPerformanceMetrics {
  totalMatchesGenerated: number
  matchAcceptanceRate: number
  avgMatchScore: number
  avgTimeToPlacement: number
  topSkillGaps: { skill: string; demandCount: number; supplyCount: number }[]
  matchesByProgramme: { programmeId: string; matches: number; acceptanceRate: number }[]
}

export interface EmployerPerformanceEntry {
  employerId: string
  employerName: string
  sector: string
  placements: number
  avgRetentionMonths: number
  avgSatisfaction: number
  avgTimeToFill: number
}

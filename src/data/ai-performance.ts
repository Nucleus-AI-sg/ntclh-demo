import type {
  AiPerformanceSnapshot,
  MatchingPerformanceMetrics,
  ModelVersion,
  OverridePattern,
  StrategicInsight,
  FeatureImportance,
} from '@/types'

export const aiPerformanceHistory: AiPerformanceSnapshot[] = [
  {
    month: 'Oct 2025',
    assessmentAccuracy: 74,
    matchingAccuracy: 68,
    verificationAccuracy: 88,
    overallAccuracy: 71,
    overrideRate: 31,
  },
  {
    month: 'Nov 2025',
    assessmentAccuracy: 78,
    matchingAccuracy: 72,
    verificationAccuracy: 90,
    overallAccuracy: 75,
    overrideRate: 27,
  },
  {
    month: 'Dec 2025',
    assessmentAccuracy: 80,
    matchingAccuracy: 75,
    verificationAccuracy: 91,
    overallAccuracy: 78,
    overrideRate: 24,
  },
  {
    month: 'Jan 2026',
    assessmentAccuracy: 83,
    matchingAccuracy: 78,
    verificationAccuracy: 93,
    overallAccuracy: 82,
    overrideRate: 21,
  },
  {
    month: 'Feb 2026',
    assessmentAccuracy: 85,
    matchingAccuracy: 80,
    verificationAccuracy: 94,
    overallAccuracy: 83,
    overrideRate: 19,
  },
  {
    month: 'Mar 2026',
    assessmentAccuracy: 86,
    matchingAccuracy: 82,
    verificationAccuracy: 94,
    overallAccuracy: 84,
    overrideRate: 18,
  },
]

export const modelVersions: ModelVersion[] = [
  {
    version: 'v1.0',
    date: '2025-06-01',
    keyChanges: 'Initial model launch',
    accuracyImprovement: 'Baseline',
  },
  {
    version: 'v1.1',
    date: '2025-11-01',
    keyChanges: 'Initial coordinator feedback integration',
    accuracyImprovement: '+4% overall accuracy',
  },
  {
    version: 'v2.0',
    date: '2026-01-01',
    keyChanges: 'Retail-to-BA transfer learning added',
    accuracyImprovement: '+8% for retail backgrounds',
  },
  {
    version: 'v2.1',
    date: '2026-03-15',
    keyChanges: 'Incorporated Jan 2026 cohort outcomes',
    accuracyImprovement: '+3% assessment, +5% matching',
  },
]

export const overridePatterns: OverridePattern[] = [
  {
    type: 'Changed from ICT to BA',
    count: 8,
    aiWasRight: 3,
    aiWasWrong: 5,
  },
  {
    type: 'Changed from BA to DM',
    count: 3,
    aiWasRight: 1,
    aiWasWrong: 2,
  },
  {
    type: 'Approved despite low score',
    count: 6,
    aiWasRight: 2,
    aiWasWrong: 4,
  },
  {
    type: 'Rejected despite high score',
    count: 4,
    aiWasRight: 3,
    aiWasWrong: 1,
  },
]

export const strategicInsights: StrategicInsight[] = [
  {
    category: 'enrolment',
    insight:
      'Trainees who complete SingPass-verified applications have 12% higher completion rates',
  },
  {
    category: 'enrolment',
    insight:
      'Career goal clarity (assessed by AI) correlates with completion: clear goals = 88% completion vs vague goals = 64%',
  },
  {
    category: 'enrolment',
    insight:
      'Prior industry experience >5 years in any sector predicts 15% higher placement rates',
  },
  {
    category: 'enrolment',
    insight:
      'Applications submitted via mobile have 8% lower completion rates than desktop submissions',
  },
  {
    category: 'training',
    insight:
      'Module 1 score >75% predicts 91% programme completion',
  },
  {
    category: 'training',
    insight:
      'Attendance below 80% in weeks 1-4 predicts 3x higher dropout risk',
  },
  {
    category: 'training',
    insight:
      'Trainees who engage with career roadmap materials have 22% faster time-to-placement',
  },
  {
    category: 'training',
    insight:
      'Group project performance is the strongest single predictor of employer interview success',
  },
  {
    category: 'placement',
    insight:
      'Employer preference profiles with >3 data points produce 28% better match acceptance',
  },
  {
    category: 'placement',
    insight:
      'Submitting 3 candidates per vacancy yields optimal hire rate (67%) - 2 candidates: 52%, 4+ candidates: 61%',
  },
  {
    category: 'placement',
    insight:
      'Fastest placements occur when vacancy is <14 days old at time of submission',
  },
  {
    category: 'placement',
    insight:
      'Candidates who complete mock interviews during Career Preparation have 34% higher offer rates',
  },
  {
    category: 'labour_market',
    insight:
      'BA roles demand increased 34% across employer network in Q1 2026',
  },
  {
    category: 'labour_market',
    insight:
      'Employers increasingly requesting data visualisation skills (mentioned in 45% of new JDs, up from 22%)',
  },
  {
    category: 'labour_market',
    insight:
      'Remote/hybrid work options now in 62% of vacancies (up from 41% in Q3 2025)',
  },
]

export const assessmentFeatureImportance: FeatureImportance[] = [
  { feature: 'Years of relevant industry experience', weight: 0.18 },
  { feature: 'Education-to-role alignment', weight: 0.14 },
  { feature: 'Career goal specificity', weight: 0.12 },
  { feature: 'Prior certification count', weight: 0.09 },
  { feature: 'Transferable skills match', weight: 0.08 },
  { feature: 'Age and career stage', weight: 0.07 },
  { feature: 'Employment stability', weight: 0.07 },
  { feature: 'Technical skill baseline', weight: 0.06 },
  { feature: 'Communication assessment', weight: 0.05 },
  { feature: 'Geographic flexibility', weight: 0.04 },
]

export const matchingFeatureImportance: FeatureImportance[] = [
  { feature: 'Skills overlap percentage', weight: 0.22 },
  { feature: 'Employer preference alignment', weight: 0.18 },
  { feature: 'Salary expectation match', weight: 0.15 },
  { feature: 'Location proximity', weight: 0.12 },
  { feature: 'Cultural fit indicators', weight: 0.10 },
  { feature: 'Programme track relevance', weight: 0.09 },
  { feature: 'Availability timing', weight: 0.08 },
  { feature: 'Prior industry experience', weight: 0.06 },
]

export const overrideAnalysis = {
  overrideRate: 18,
  previousOverrideRate: 31,
  breakdown: {
    approvedAsIs: 82,
    overrodeToDifferentCourse: 12,
    overrodeScore: 4,
    rejectedRecommendation: 2,
  },
  topContributors: [
    {
      name: 'Sarah Tan',
      feedbackSignals: 45,
      overrides: 28,
      confirmations: 17,
    },
    {
      name: 'James Lim',
      feedbackSignals: 32,
      overrides: 12,
      confirmations: 20,
    },
  ],
}

export const predictionMatrix: { x: string; y: string; value: number }[] = [
  { x: 'ICT', y: 'Predicted High', value: 85 },
  { x: 'BA', y: 'Predicted High', value: 82 },
  { x: 'DM', y: 'Predicted High', value: 78 },
  { x: 'ICT', y: 'Predicted Medium', value: 72 },
  { x: 'BA', y: 'Predicted Medium', value: 68 },
  { x: 'DM', y: 'Predicted Medium', value: 65 },
  { x: 'ICT', y: 'Predicted Low', value: 45 },
  { x: 'BA', y: 'Predicted Low', value: 42 },
  { x: 'DM', y: 'Predicted Low', value: 38 },
]

export const feedbackImpactTimeline = [
  { date: 'Nov 2025', event: 'Coordinator feedback on retail-to-BA transitions integrated', impact: '+4% accuracy for retail backgrounds' },
  { date: 'Jan 2026', event: 'Retail-to-BA transfer learning model deployed (v2.0)', impact: '+8% accuracy for retail backgrounds' },
  { date: 'Mar 2026', event: 'Jan 2026 cohort outcomes incorporated (v2.1)', impact: '+3% assessment, +5% matching accuracy' },
]

export const matchingPerformanceMetrics: MatchingPerformanceMetrics = {
  totalMatchesGenerated: 342,
  matchAcceptanceRate: 67,
  avgMatchScore: 78,
  avgTimeToPlacement: 42,
  topSkillGaps: [
    { skill: 'Cloud Architecture', demandCount: 18, supplyCount: 6 },
    { skill: 'Data Visualisation', demandCount: 15, supplyCount: 9 },
    { skill: 'Agile/Scrum', demandCount: 12, supplyCount: 8 },
    { skill: 'Machine Learning', demandCount: 10, supplyCount: 3 },
    { skill: 'DevOps', demandCount: 8, supplyCount: 4 },
  ],
  matchesByProgramme: [
    { programmeId: 'ict', matches: 156, acceptanceRate: 72 },
    { programmeId: 'ba', matches: 128, acceptanceRate: 65 },
    { programmeId: 'dm', matches: 58, acceptanceRate: 60 },
  ],
}

export const matchScoreCalibration: { x: number; y: number; label: string }[] = [
  { x: 92, y: 4.8, label: 'TechCorp - Software Eng' },
  { x: 88, y: 4.5, label: 'DataViz Co - Analyst' },
  { x: 85, y: 4.2, label: 'CloudFirst - DevOps' },
  { x: 82, y: 4.0, label: 'FinServ - BA Consultant' },
  { x: 78, y: 3.8, label: 'RetailPlus - Digital Mktg' },
  { x: 76, y: 4.1, label: 'MediTech - Data Analyst' },
  { x: 73, y: 3.5, label: 'LogiStar - Ops Manager' },
  { x: 70, y: 3.2, label: 'EduTech - Trainer' },
  { x: 68, y: 3.6, label: 'GreenEnergy - PM' },
  { x: 65, y: 3.0, label: 'SmartBuild - QA' },
  { x: 62, y: 2.8, label: 'FoodCo - Admin' },
  { x: 58, y: 2.5, label: 'TravelHub - Support' },
  { x: 55, y: 3.1, label: 'AutoDrive - Technician' },
  { x: 50, y: 2.2, label: 'PrintMedia - Designer' },
  { x: 45, y: 2.0, label: 'OldTech - Helpdesk' },
]

export const matchQualityMetrics = [
  { metric: 'Candidates submitted that were hired', current: '62%', previous: '48%', improvement: '+14%' },
  { metric: 'Employer satisfaction (avg rating)', current: '4.2/5', previous: '3.8/5', improvement: '+0.4' },
  { metric: 'Time to fill (avg days)', current: '28', previous: '42', improvement: '-14 days' },
  { metric: '6-month retention rate', current: '73%', previous: '65%', improvement: '+8%' },
]

export const matchingPatternsDiscovered = [
  { pattern: 'Retail management to BA roles', successRate: 82, status: 'discovered' as const },
  { pattern: 'Hospitality to Digital Marketing', successRate: 74, status: 'emerging' as const },
  { pattern: 'Engineering to ICT', successRate: 91, status: 'established' as const },
  { pattern: 'Finance to Data Analytics', successRate: 78, status: 'discovered' as const },
  { pattern: 'Healthcare to Project Management', successRate: 68, status: 'emerging' as const },
]

export const employerFeedbackRanking = [
  { employer: 'TechCorp Pte Ltd', feedbackCount: 24, matchImprovement: '+18%' },
  { employer: 'DataViz Analytics', feedbackCount: 18, matchImprovement: '+12%' },
  { employer: 'CloudFirst Solutions', feedbackCount: 15, matchImprovement: '+9%' },
  { employer: 'FinServ Partners', feedbackCount: 11, matchImprovement: '+7%' },
  { employer: 'MediTech Systems', feedbackCount: 8, matchImprovement: '+5%' },
]

export const recommendationStats = {
  totalRecommendations: 847,
  acceptanceRate: 67,
  placementConversion: 42,
  avgConfidenceScore: 78,
  highConfidencePlacement: 84,
  lowConfidencePlacement: 38,
}

export const feedbackTimeline = [
  {
    date: '2025-10-15',
    event:
      '5 coordinators overrode ICT recommendations for retail managers. Model flagged pattern.',
  },
  {
    date: '2025-11-01',
    event:
      'Retraining incorporated retail-to-BA transfer data. BA recommendation rate for retail backgrounds increased 23%.',
  },
  {
    date: '2026-01-15',
    event:
      'Post-retrain accuracy for retail-background assessments improved from 68% to 84%.',
  },
  {
    date: '2026-02-01',
    event:
      'Coordinator override rate dropped from 27% to 19% following v2.0 deployment.',
  },
  {
    date: '2026-03-15',
    event:
      'v2.1 deployed with Jan 2026 cohort outcome data. Assessment accuracy now 86%.',
  },
]

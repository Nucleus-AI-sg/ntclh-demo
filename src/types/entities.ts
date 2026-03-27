import {
  CohortStatus,
  EmploymentStatus,
  EngagementLevel,
  EmploymentType,
  LifecycleStage,
  PipelineHealth,
  PlacementSource,
  PlacementStatus,
  RiskLevel,
  VacancyStatus,
} from './enums'

export interface Staff {
  id: string
  name: string
  role: 'coordinator' | 'account_manager' | 'programme_lead'
  email: string
  avatarInitials: string
}

export interface ModuleDefinition {
  id: string
  name: string
  durationWeeks: number
  instructor: string
  assessmentType: string
  order: number
  learningObjectives?: string[]
  prerequisites?: string[]
  averageScore?: number
}

export interface Programme {
  id: string
  name: string
  shortName: string
  durationWeeks: number
  cohortCapacity: number
  modules: ModuleDefinition[]
  description: string
  trainingProvider: string
  programmeLeadId: string
  ssgCourseCode: string
  wsgClassification: string
  placementRate: number
}

export interface Cohort {
  id: string
  programmeId: string
  name: string
  startDate: string
  endDate: string
  capacity: number
  enrolledCount: number
  status: CohortStatus
  completionRate?: number
  placementRate?: number
}

export interface Trainee {
  id: string
  name: string
  age: number
  gender: string
  nricMasked: string
  email: string
  phone: string
  address: string
  highestQualification: string
  institution: string
  graduationYear: number
  currentEmployer: string
  currentRole: string
  yearsExperience: number
  programmeId: string
  cohortId: string
  lifecycleStage: LifecycleStage
  riskLevel: RiskLevel
  singpassVerified: boolean
  applicationDate: string
  enrolmentDate?: string
  trainingStartDate?: string
  completionDate?: string
  careerGoals: string
  daysInStage: number
  lastActivity: string
  employmentType?: EmploymentType
  placementSource?: PlacementSource
  placedEmployerId?: string
  placedRole?: string
  placedSalary?: number
  placedStartDate?: string
  employmentStatus?: EmploymentStatus
  docVerificationScore?: number
  riskAssessment?: {
    level: 'low' | 'medium' | 'high'
    factors: string[]
  }
  milestones?: TraineeMilestone[]
}

export interface TraineeMilestone {
  label: string
  date?: string
  completed: boolean
}

export interface EmployerContact {
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
}

export interface HiringPreferences {
  preferredBackgrounds: string[]
  technicalSkills: string[]
  softSkills: string[]
  culturalFit: string
  dealBreakers: string[]
  salaryRange: { min: number; max: number }
}

export interface Employer {
  id: string
  name: string
  sector: string
  size: string
  location: string
  uen: string
  accountManagerId: string
  engagementLevel: EngagementLevel
  pipelineHealth: PipelineHealth
  partnerSince: string
  totalPlacements: number
  lastContactDate: string
  contacts: EmployerContact[]
  hiringPreferences: HiringPreferences
  notes: string
  companyAddress?: string
}

export interface Vacancy {
  id: string
  employerId: string
  title: string
  salaryMin: number
  salaryMax: number
  location: string
  description: string
  requirements: string[]
  status: VacancyStatus
  postedDate: string
  hiringTimeline: string
  candidatesSubmitted: number
  programmeIds: string[]
}

export interface Placement {
  id: string
  traineeId: string
  employerId: string
  vacancyId?: string
  matchScore: number
  status: PlacementStatus
  submittedDate: string
  source: PlacementSource
  retentionMonths?: number
  satisfactionRating?: number
}

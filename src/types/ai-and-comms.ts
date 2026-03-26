import {
  ApplicationStatus,
  Channel,
  DocumentStatus,
  DocumentType,
  MessageStatus,
  ModuleStatus,
  OutreachTrigger,
  Priority,
} from './enums'

export interface AlternativeCourse {
  programmeId: string
  programmeName: string
  matchScore: number
}

export interface Assessment {
  id: string
  traineeId: string
  overallScore: number
  recommendedProgrammeId: string
  requestedProgrammeId: string
  reasoning: string[]
  transferableSkills: string[]
  confidence: 'high' | 'medium' | 'low'
  comparableAssessments: number
  alternatives: AlternativeCourse[]
  status: ApplicationStatus
  processedBy?: string
}

export interface SkillAxis {
  skill: string
  candidateScore: number
  requirementScore: number
}

export interface MatchResult {
  id: string
  traineeId: string
  vacancyId: string
  score: number
  reasoning: string[]
  strengths: string[]
  concerns: string[]
  skillsComparison: SkillAxis[]
}

export interface Communication {
  id: string
  recipientId: string
  recipientType: 'trainee' | 'employer'
  recipientName: string
  channel: Channel
  subject: string
  preview: string
  status: MessageStatus
  trigger: OutreachTrigger
  timestamp: string
  content?: string
  campaignId?: string
}

export interface OcrField {
  fieldName: string
  extractedValue: string
  confidence: number
  crossReferenceResult: 'match' | 'mismatch' | 'unable_to_verify'
  crossReferenceNote?: string
}

export interface OcrExtraction {
  fields: OcrField[]
}

export interface Document {
  id: string
  traineeId: string
  traineeName: string
  type: DocumentType
  status: DocumentStatus
  submittedDate: string
  ocrConfidence: number
  priority: Priority
  ocrExtraction?: OcrExtraction
  verifiedBy?: string
  verifiedDate?: string
  discrepancies?: string[]
  suggestedResolution?: string
}

export interface OutreachStep {
  day: number
  channel: Channel
  templateSubject: string
  templateBody: string
}

export interface OutreachSequence {
  id: string
  name: string
  trigger: string
  steps: OutreachStep[]
  activeCount: number
  completionRate: number
  isActive: boolean
}

export interface Alert {
  id: string
  message: string
  priority: Priority
  link: string
  linkLabel: string
  dismissible: boolean
}

export interface ActivityEvent {
  id: string
  description: string
  timestamp: string
  type: 'enrolment' | 'document' | 'placement' | 'communication' | 'training'
  traineeId?: string
}

export interface ModuleProgress {
  moduleId: string
  moduleName: string
  status: ModuleStatus
  score?: number
  completedDate?: string
  instructor: string
}

export interface AuditEntry {
  id: string
  action: string
  actor: string
  timestamp: string
  details?: string
}

export interface CoordinatorNote {
  id: string
  text: string
  author: string
  timestamp: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatScript {
  id: string
  prompt: string
  response: string
  followUps: { prompt: string; response: string }[]
}

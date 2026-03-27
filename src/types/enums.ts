export enum LifecycleStage {
  Applied = 'applied',
  Enrolled = 'enrolled',
  Training = 'training',
  Completed = 'completed',
  Placed = 'placed',
  Verified = 'verified',
}

export enum EmploymentType {
  FullTime = 'full_time',
  PartTime = 'part_time',
  Freelance = 'freelance',
  AlreadyEmployed = 'already_employed',
}

export enum PlacementSource {
  LhubMatched = 'lhub_matched',
  SelfSourced = 'self_sourced',
}

export enum DocumentType {
  PaySlip = 'pay_slip',
  CpfStatement = 'cpf_statement',
  EmploymentLetter = 'employment_letter',
}

export enum DocumentStatus {
  NotSubmitted = 'not_submitted',
  Submitted = 'submitted',
  AutoVerified = 'auto_verified',
  Flagged = 'flagged',
  ManuallyVerified = 'manually_verified',
  Rejected = 'rejected',
}

export enum Channel {
  Email = 'email',
  Sms = 'sms',
  WhatsApp = 'whatsapp',
  Phone = 'phone',
}

export enum MessageStatus {
  Sent = 'sent',
  Delivered = 'delivered',
  Opened = 'opened',
  Responded = 'responded',
  Bounced = 'bounced',
  Failed = 'failed',
}

export enum OutreachTrigger {
  Automated = 'automated',
  Manual = 'manual',
  BulkCampaign = 'bulk_campaign',
}

export enum EngagementLevel {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export enum RiskLevel {
  OnTrack = 'on_track',
  AtRisk = 'at_risk',
}

export enum PipelineHealth {
  Green = 'green',
  Amber = 'amber',
  Red = 'red',
}

export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export enum CohortStatus {
  Completed = 'completed',
  Active = 'active',
  Enrolling = 'enrolling',
  Planned = 'planned',
}

export enum VacancyStatus {
  Open = 'open',
  Screening = 'screening',
  Interviewing = 'interviewing',
  Filled = 'filled',
  Cancelled = 'cancelled',
}

export enum ModuleStatus {
  Completed = 'completed',
  InProgress = 'in_progress',
  Upcoming = 'upcoming',
}

export enum ApplicationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
  Waitlisted = 'waitlisted',
}

export enum EmploymentStatus {
  Employed = 'employed',
  Unemployed = 'unemployed',
  SelfEmployed = 'self_employed',
  Freelancing = 'freelancing',
  InTransition = 'in_transition',
}

export enum PlacementStatus {
  Available = 'available',
  Submitted = 'submitted',
  Shortlisted = 'shortlisted',
  Interviewed = 'interviewed',
  Offered = 'offered',
  Hired = 'hired',
  Declined = 'declined',
  Passed = 'passed',
}

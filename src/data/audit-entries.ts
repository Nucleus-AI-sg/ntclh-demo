import { AuditEntry } from '@/types'

/** Audit entries keyed by traineeId */
export const auditEntries: Record<string, AuditEntry[]> = {
  'marcus-lee': [
    { id: 'aud-ml-01', action: 'Application submitted via FormSG', actor: 'System', timestamp: '2026-02-01T14:32:00Z' },
    { id: 'aud-ml-02', action: 'SingPass Myinfo verification completed', actor: 'System', timestamp: '2026-02-01T14:32:15Z' },
    { id: 'aud-ml-03', action: 'AI assessment generated: 82% suitability for BA Cert', actor: 'Nucleus AI', timestamp: '2026-02-01T14:33:00Z', details: 'Recommended: Business Analyst Certification. Requested: ICT Career Conversion' },
    { id: 'aud-ml-04', action: 'Application reviewed by coordinator', actor: 'Sarah Tan', timestamp: '2026-02-15T09:10:00Z' },
    { id: 'aud-ml-05', action: 'Enrolled in Business Analyst Certification (AI recommendation accepted)', actor: 'Sarah Tan', timestamp: '2026-02-15T09:15:00Z' },
    { id: 'aud-ml-06', action: 'Assigned to Mar 2026 cohort (BA-Mar-2026)', actor: 'Sarah Tan', timestamp: '2026-02-15T09:16:00Z' },
    { id: 'aud-ml-07', action: 'Welcome email sent', actor: 'System', timestamp: '2026-02-15T09:20:00Z' },
    { id: 'aud-ml-08', action: 'Training commenced - Mar 2026 cohort', actor: 'System', timestamp: '2026-03-03T09:00:00Z' },
    { id: 'aud-ml-09', action: 'Module 1 completed: Business Analysis Fundamentals (82%)', actor: 'System', timestamp: '2026-03-21T16:00:00Z' },
    { id: 'aud-ml-10', action: 'Module 2 completed: SQL & Data Tools (78%)', actor: 'System', timestamp: '2026-03-28T16:00:00Z' },
    { id: 'aud-ml-11', action: 'Matched to TechCorp Pte Ltd - Junior BA (91% match)', actor: 'Nucleus AI', timestamp: '2026-03-10T11:00:00Z' },
    { id: 'aud-ml-12', action: 'Application submitted to TechCorp Pte Ltd', actor: 'Sarah Tan', timestamp: '2026-03-10T14:00:00Z' },
    { id: 'aud-ml-13', action: 'Module reminder email sent', actor: 'System', timestamp: '2026-03-24T08:00:00Z' },
    { id: 'aud-ml-14', action: 'Training progress review: on track', actor: 'Sarah Tan', timestamp: '2026-03-25T10:30:00Z' },
    { id: 'aud-ml-15', action: 'Coordinator note added', actor: 'Sarah Tan', timestamp: '2026-03-25T10:35:00Z', details: 'Marcus progressing well. Discussed placement timeline.' },
  ],
  'amy-chen': [
    { id: 'aud-ac-01', action: 'Application submitted via FormSG', actor: 'System', timestamp: '2025-12-15T10:00:00Z' },
    { id: 'aud-ac-02', action: 'AI assessment generated: 85% suitability for ICT SCTP', actor: 'Nucleus AI', timestamp: '2025-12-15T10:01:00Z' },
    { id: 'aud-ac-03', action: 'Enrolled in ICT Career Conversion (SCTP)', actor: 'Sarah Tan', timestamp: '2025-12-20T09:00:00Z' },
    { id: 'aud-ac-04', action: 'Training commenced - Jan 2026 cohort', actor: 'System', timestamp: '2026-01-05T09:00:00Z' },
    { id: 'aud-ac-05', action: 'Training completed - all modules passed', actor: 'System', timestamp: '2026-04-26T16:00:00Z' },
    { id: 'aud-ac-06', action: 'Placed at TechCorp Pte Ltd as Junior Software Developer', actor: 'Sarah Tan', timestamp: '2026-05-01T09:00:00Z' },
    { id: 'aud-ac-07', action: 'Employment verified - pay slip and CPF auto-verified', actor: 'System', timestamp: '2026-06-01T14:00:00Z' },
  ],
  'david-ng': [
    { id: 'aud-dn-01', action: 'Application submitted via FormSG', actor: 'System', timestamp: '2025-12-10T11:00:00Z' },
    { id: 'aud-dn-02', action: 'Enrolled in ICT Career Conversion (SCTP)', actor: 'Sarah Tan', timestamp: '2025-12-18T09:00:00Z' },
    { id: 'aud-dn-03', action: 'Training completed', actor: 'System', timestamp: '2026-04-26T16:00:00Z' },
    { id: 'aud-dn-04', action: 'Pay slip uploaded', actor: 'David Ng', timestamp: '2026-05-15T16:45:00Z' },
    { id: 'aud-dn-05', action: 'OCR verification flagged: employer name discrepancy', actor: 'System', timestamp: '2026-05-15T16:46:00Z', details: 'Extracted: "DataVentures" vs expected: "DataInsights Pte Ltd"' },
    { id: 'aud-dn-06', action: 'Manual review required', actor: 'System', timestamp: '2026-05-15T16:46:00Z' },
  ],
}

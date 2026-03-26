import { ActivityEvent } from '@/types'

export const activityEvents: ActivityEvent[] = [
  {
    id: 'evt-1',
    description: 'Marcus Lee submitted enrolment application',
    timestamp: '2026-03-26T07:30:00Z',
    type: 'enrolment',
    traineeId: 'marcus-lee',
  },
  {
    id: 'evt-2',
    description: 'Pay slip uploaded by Amy Chen',
    timestamp: '2026-03-26T06:15:00Z',
    type: 'document',
    traineeId: 'amy-chen',
  },
  {
    id: 'evt-3',
    description: 'TechCorp Pte Ltd confirmed interview for David Ng',
    timestamp: '2026-03-26T04:45:00Z',
    type: 'placement',
    traineeId: 'david-ng',
  },
  {
    id: 'evt-4',
    description: 'New employer verified: DBS Group Holdings',
    timestamp: '2026-03-26T04:00:00Z',
    type: 'placement',
  },
  {
    id: 'evt-5',
    description: 'Sarah Chen completed Module 3 assessment',
    timestamp: '2026-03-26T03:30:00Z',
    type: 'training',
    traineeId: 'sarah-chen',
  },
  {
    id: 'evt-6',
    description: 'Bulk email sent to ICT Mar 2026 cohort (18 recipients)',
    timestamp: '2026-03-26T02:00:00Z',
    type: 'communication',
  },
  {
    id: 'evt-7',
    description: 'Lisa Koh escalation reminder triggered',
    timestamp: '2026-03-25T23:00:00Z',
    type: 'communication',
    traineeId: 'lisa-koh',
  },
  {
    id: 'evt-8',
    description: 'CPF statement auto-verified for Rachel Tan',
    timestamp: '2026-03-25T21:30:00Z',
    type: 'document',
    traineeId: 'rachel-tan',
  },
  {
    id: 'evt-9',
    description: 'David Ng matched to InnoTech Solutions (92% score)',
    timestamp: '2026-03-25T20:00:00Z',
    type: 'placement',
    traineeId: 'david-ng',
  },
  {
    id: 'evt-10',
    description: 'BA Mar 2026 cohort training commenced',
    timestamp: '2026-03-25T18:00:00Z',
    type: 'training',
  },
]

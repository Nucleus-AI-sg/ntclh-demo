import { CoordinatorNote } from '@/types'

/** Coordinator notes keyed by traineeId */
export const coordinatorNotes: Record<string, CoordinatorNote[]> = {
  'marcus-lee': [
    {
      id: 'note-ml-01',
      text: 'Marcus called on 15 Mar to ask about programme timeline. Confirmed he is on track. Very motivated and asking good questions about placement opportunities.',
      author: 'Sarah Tan',
      timestamp: '2026-03-15T14:30:00Z',
    },
    {
      id: 'note-ml-02',
      text: 'Discussed potential placement with TechCorp. Marcus is interested in the Junior BA role. Scheduled mock interview for next week.',
      author: 'Sarah Tan',
      timestamp: '2026-03-25T10:35:00Z',
    },
  ],
  'david-ng': [
    {
      id: 'note-dn-01',
      text: 'David submitted pay slip but employer name on document does not match the employer we have on record. Following up with David to clarify.',
      author: 'Sarah Tan',
      timestamp: '2026-05-16T09:00:00Z',
    },
  ],
  'lisa-koh': [
    {
      id: 'note-lk-01',
      text: 'Lisa has not responded to 3 email attempts and 2 SMS messages over 4 months. Escalation recommended. Will attempt phone call this week.',
      author: 'Sarah Tan',
      timestamp: '2026-03-20T11:00:00Z',
    },
  ],
}

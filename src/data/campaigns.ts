import { Campaign, Channel } from '@/types'

export const campaigns: Campaign[] = [
  {
    id: 'camp-mar-placement',
    name: 'Mar placement opportunities',
    recipientCount: 22,
    recipientType: 'trainee',
    channel: Channel.Email,
    sent: 22,
    opened: 14,
    responded: 6,
    date: '2026-03-18',
  },
  {
    id: 'camp-doc-reminder',
    name: 'Document deadline reminder',
    recipientCount: 14,
    recipientType: 'trainee',
    channel: Channel.Sms,
    sent: 14,
    opened: null,
    responded: 8,
    date: '2026-03-15',
  },
  {
    id: 'camp-q1-employer',
    name: 'Q1 employer update',
    recipientCount: 8,
    recipientType: 'employer',
    channel: Channel.Email,
    sent: 8,
    opened: 6,
    responded: 3,
    date: '2026-03-01',
  },
]

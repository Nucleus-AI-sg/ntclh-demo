import { Alert, Priority } from '@/types'

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    message:
      '5 trainees approaching documentation deadline (due in 3 days)',
    priority: Priority.High,
    link: '/tracking',
    linkLabel: 'View Trainees',
    dismissible: true,
  },
  {
    id: 'alert-2',
    message: '2 employers awaiting candidate submissions',
    priority: Priority.Medium,
    link: '/matching',
    linkLabel: 'View Matches',
    dismissible: true,
  },
  {
    id: 'alert-3',
    message: 'ICT Mar 2026 cohort: 3 unfilled employer slots',
    priority: Priority.Medium,
    link: '/matching',
    linkLabel: 'View Vacancies',
    dismissible: true,
  },
  {
    id: 'alert-4',
    message:
      'Document verification queue: 3 flagged items require review',
    priority: Priority.High,
    link: '/documents',
    linkLabel: 'Review Documents',
    dismissible: true,
  },
  {
    id: 'alert-5',
    message:
      'Lisa Koh: non-responsive for 115 days, escalation recommended',
    priority: Priority.High,
    link: '/trainee/lisa-koh',
    linkLabel: 'View Profile',
    dismissible: true,
  },
]

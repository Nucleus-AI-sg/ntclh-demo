import { CheckCircle, Clock, FileText, Bot, UserCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Assessment, Trainee } from '@/types'
import { ApplicationStatus } from '@/types'

interface ApplicationTimelineProps {
  assessment: Assessment
  trainee: Trainee
}

interface TimelineEvent {
  label: string
  date: string
  icon: React.ReactNode
  completed: boolean
}

function buildTimeline(assessment: Assessment, trainee: Trainee): TimelineEvent[] {
  const events: TimelineEvent[] = [
    {
      label: 'Application Submitted',
      date: trainee.applicationDate,
      icon: <FileText className="h-3.5 w-3.5" />,
      completed: true,
    },
    {
      label: 'AI Assessment Complete',
      date: trainee.applicationDate,
      icon: <Bot className="h-3.5 w-3.5" />,
      completed: assessment.overallScore > 0,
    },
    {
      label: 'Under Coordinator Review',
      date: assessment.status === ApplicationStatus.Pending ? 'In progress' : trainee.applicationDate,
      icon: <UserCheck className="h-3.5 w-3.5" />,
      completed: assessment.status !== ApplicationStatus.Pending,
    },
    {
      label: assessment.status === ApplicationStatus.Rejected ? 'Application Rejected' : 'Enrolment Confirmed',
      date: assessment.status === ApplicationStatus.Pending ? 'Pending' : 'Today',
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      completed: assessment.status === ApplicationStatus.Approved || assessment.status === ApplicationStatus.Rejected,
    },
  ]
  return events
}

export function ApplicationTimeline({ assessment, trainee }: ApplicationTimelineProps) {
  const events = buildTimeline(assessment, trainee)

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center">
        <Clock className="h-4 w-4 mr-2 text-blue-600" />
        Application Timeline
      </h3>
      <div className="relative">
        {events.map((event, i) => {
          const isLast = i === events.length - 1
          return (
            <div key={i} className="flex items-start mb-0 last:mb-0">
              <div className="flex flex-col items-center mr-3">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center',
                    event.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-400',
                  )}
                >
                  {event.icon}
                </div>
                {!isLast && (
                  <div className={cn('w-0.5 h-6 my-1', event.completed ? 'bg-green-200' : 'bg-slate-200')} />
                )}
              </div>
              <div className="pt-1">
                <p className={cn('text-sm font-semibold', event.completed ? 'text-slate-800' : 'text-slate-400')}>
                  {event.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">{event.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

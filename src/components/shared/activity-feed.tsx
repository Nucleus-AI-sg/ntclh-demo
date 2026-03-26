import {
  UserPlus,
  FileText,
  Handshake,
  MessageSquare,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ActivityEvent } from '@/types'

const eventConfig: Record<
  ActivityEvent['type'],
  { icon: LucideIcon; bg: string; text: string }
> = {
  enrolment: { icon: UserPlus, bg: 'bg-blue-50', text: 'text-blue-600' },
  document: { icon: FileText, bg: 'bg-teal-50', text: 'text-teal-600' },
  placement: { icon: Handshake, bg: 'bg-green-50', text: 'text-green-600' },
  communication: { icon: MessageSquare, bg: 'bg-amber-50', text: 'text-amber-600' },
  training: { icon: GraduationCap, bg: 'bg-indigo-50', text: 'text-indigo-600' },
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

interface ActivityFeedProps {
  events: ActivityEvent[]
  maxItems?: number
  showViewAll?: boolean
  onViewAll?: () => void
  className?: string
}

export function ActivityFeed({
  events,
  maxItems = 5,
  showViewAll = false,
  onViewAll,
  className,
}: ActivityFeedProps) {
  const visible = events.slice(0, maxItems)

  return (
    <div className={cn('space-y-4', className)}>
      {visible.map((event) => {
        const config = eventConfig[event.type]
        const Icon = config.icon
        return (
          <div key={event.id} className="flex gap-3">
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center',
                config.bg,
                config.text,
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-700 leading-snug">
                {event.description}
              </p>
              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
                {relativeTime(event.timestamp)}
              </p>
            </div>
          </div>
        )
      })}
      {showViewAll && events.length > maxItems && (
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-blue-600 hover:underline"
        >
          View all logs
        </button>
      )}
    </div>
  )
}

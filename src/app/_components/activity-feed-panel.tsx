import { activityEvents } from '@/data'

const iconMap: Record<string, { icon: string; bg: string; text: string }> = {
  enrolment: { icon: 'person_add', bg: 'bg-blue-50', text: 'text-blue-600' },
  document: { icon: 'description', bg: 'bg-blue-50', text: 'text-blue-600' },
  placement: { icon: 'verified_user', bg: 'bg-teal-50', text: 'text-teal-600' },
  communication: { icon: 'mail', bg: 'bg-amber-50', text: 'text-amber-600' },
  training: { icon: 'school', bg: 'bg-indigo-50', text: 'text-indigo-600' },
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} mins ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

export function ActivityFeedPanel() {
  const events = activityEvents.slice(0, 3)

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
          Live Activity
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </span>
      </div>
      <div className="space-y-3">
        {events.map((event) => {
          const config = iconMap[event.type] ?? iconMap.enrolment
          return (
            <div key={event.id} className="flex gap-3">
              <div className={`w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center ${config.bg} ${config.text}`}>
                <span className="material-symbols-outlined text-sm">{config.icon}</span>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-900 leading-snug">{event.description}</p>
                <p className="text-[8px] font-bold text-slate-300 mt-0.5 uppercase">
                  {relativeTime(event.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <button className="w-full mt-4 py-1.5 rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors">
        View All Logs
      </button>
    </div>
  )
}

import { Clock } from 'lucide-react'
import type { AuditEntry } from '@/types'

interface AuditTabProps {
  entries: AuditEntry[]
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function AuditTab({ entries }: AuditTabProps) {
  const sorted = [...entries].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
      {sorted.length === 0 && <p className="px-5 py-8 text-sm text-slate-400 text-center">No audit entries</p>}
      {sorted.map((entry) => (
        <div key={entry.id} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
            <Clock className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900">{entry.action}</p>
            {entry.details && <p className="text-[10px] text-slate-500 mt-0.5">{entry.details}</p>}
            <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">{entry.actor} - {formatTimestamp(entry.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

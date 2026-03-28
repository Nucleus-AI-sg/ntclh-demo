import { Mail, MessageSquare, Phone, Clock } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import type { Communication, AuditEntry, CoordinatorNote } from '@/types'
import { Channel } from '@/types'

interface CommsAuditTabProps {
  communications: Communication[]
  auditEntries: AuditEntry[]
  notes: CoordinatorNote[]
}

const channelIcon: Record<string, React.ReactNode> = {
  [Channel.Email]: <Mail className="h-3.5 w-3.5" />,
  [Channel.Sms]: <MessageSquare className="h-3.5 w-3.5" />,
  [Channel.WhatsApp]: <MessageSquare className="h-3.5 w-3.5" />,
  [Channel.Phone]: <Phone className="h-3.5 w-3.5" />,
}

export function CommsAuditTab({ communications, auditEntries, notes }: CommsAuditTabProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Communication Log</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {communications.length === 0 && <p className="px-5 py-8 text-sm text-slate-400 text-center">No communications</p>}
          {communications.map((comm) => (
            <div key={comm.id} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                {channelIcon[comm.channel] ?? <Mail className="h-3.5 w-3.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-900 truncate">{comm.subject}</p>
                  <StatusBadge status={comm.status} />
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">{comm.preview}</p>
                <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">{comm.timestamp}</p>
              </div>
              <span className="text-[9px] font-bold text-slate-300 uppercase flex-shrink-0">{comm.trigger.replace(/_/g, ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Audit Trail</h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {auditEntries.map((entry) => (
              <div key={entry.id} className="px-5 py-3">
                <div className="flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{entry.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-bold text-slate-300 uppercase">{entry.timestamp}</span>
                      <span className="text-[9px] text-slate-400">by {entry.actor}</span>
                    </div>
                    {entry.details && <p className="text-[10px] text-slate-400 mt-1">{entry.details}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Coordinator Notes</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {notes.length === 0 && <p className="px-5 py-8 text-sm text-slate-400 text-center">No notes</p>}
            {notes.map((note) => (
              <div key={note.id} className="px-5 py-3">
                <p className="text-xs text-slate-700 leading-relaxed">{note.text}</p>
                <p className="text-[9px] font-bold text-slate-300 uppercase mt-2">{note.author} - {note.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

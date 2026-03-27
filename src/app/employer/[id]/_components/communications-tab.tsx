'use client'

import { useState, useMemo } from 'react'
import { Mail, Phone, Calendar, Search, MessageSquare } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { Input } from '@/components/ui/input'
import type { Communication } from '@/types'
import { cn } from '@/lib/utils'

interface CommunicationsTabProps {
  communications: Communication[]
  onCompose: () => void
}

export function CommunicationsTab({ communications, onCompose }: CommunicationsTabProps) {
  const [search, setSearch] = useState('')
  const [channelFilter, setChannelFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let result = communications
    if (channelFilter !== 'all') result = result.filter((c) => c.channel === channelFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((c) => c.subject.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))
    }
    return result
  }, [communications, channelFilter, search])

  const channels = ['all', ...new Set(communications.map((c) => c.channel))]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input placeholder="Search communications..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 text-xs h-8" />
        </div>
        <div className="flex gap-1">
          {channels.map((ch) => (
            <button key={ch} onClick={() => setChannelFilter(ch)} className={cn('px-2.5 py-1 rounded text-[10px] font-bold uppercase', channelFilter === ch ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>
              {ch}
            </button>
          ))}
        </div>
        <button onClick={onCompose} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <MessageSquare className="h-3.5 w-3.5" /> Reply
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
        {filtered.length === 0 && <p className="px-5 py-8 text-sm text-slate-400 text-center">No communications found</p>}
        {filtered.map((comm) => (
          <div key={comm.id} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', comm.channel === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600')}>
              {comm.channel === 'email' ? <Mail className="h-3.5 w-3.5" /> : <Phone className="h-3.5 w-3.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-900 truncate">{comm.subject}</p>
                <StatusBadge status={comm.status} />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{comm.preview}</p>
              <p className="text-[9px] font-bold text-slate-300 uppercase mt-1"><Calendar className="h-2.5 w-2.5 inline mr-1" />{comm.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

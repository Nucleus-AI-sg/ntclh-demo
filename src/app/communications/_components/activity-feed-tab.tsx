'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { StatusBadge, FilterBar } from '@/components/shared'
import { getChannelIcon } from '@/lib/channel-icons'
import type { Communication } from '@/types'

const triggerLabel: Record<string, string> = {
  automated: 'Automated',
  manual: 'Manual',
  bulk_campaign: 'Bulk Campaign',
}

const dateRangeOptions = [
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 90 days', value: '90' },
]

const programmeOptions = [
  { label: 'Business Analyst', value: 'ba' },
  { label: 'ICT Career Conversion', value: 'ict' },
  { label: 'Digital Marketing', value: 'dm' },
]

/** Maps recipientId prefix to programme track for filtering. */
const recipientProgramme: Record<string, string> = {
  'marcus-lee': 'ba', 'john-tan': 'ba', 'vincent-chua': 'ba',
  'amy-chen': 'ict', 'ahmad-ibrahim': 'ict', 'wei-ming': 'ict', 'rachel-goh': 'ict',
  'lisa-koh': 'dm', 'michelle-tan': 'dm', 'mei-ling': 'dm',
  'david-ng': 'ba', 'priya-sharma': 'ba', 'kumar-s': 'ba',
  'raj-patel': 'ict', 'fiona-cheng': 'ict', 'chris-loh': 'ict',
  'henry-koh': 'ba', 'diana-lee': 'dm', 'sarah-lim': 'ba',
}

function formatTimestamp(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

interface ActivityFeedTabProps {
  communications: Communication[]
}

export function ActivityFeedTab({ communications }: ActivityFeedTabProps) {
  const [channelFilter, setChannelFilter] = useState('__all__')
  const [statusFilter, setStatusFilter] = useState('__all__')
  const [recipientFilter, setRecipientFilter] = useState('__all__')
  const [triggerFilter, setTriggerFilter] = useState('__all__')
  const [dateRange, setDateRange] = useState('__all__')
  const [programmeFilter, setProgrammeFilter] = useState('__all__')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = communications
    if (channelFilter !== '__all__') result = result.filter((c) => c.channel === channelFilter)
    if (statusFilter !== '__all__') result = result.filter((c) => c.status === statusFilter)
    if (recipientFilter !== '__all__') result = result.filter((c) => c.recipientType === recipientFilter)
    if (triggerFilter !== '__all__') result = result.filter((c) => c.trigger === triggerFilter)
    if (dateRange !== '__all__') {
      const days = Number(dateRange)
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - days)
      result = result.filter((c) => new Date(c.timestamp) >= cutoff)
    }
    if (programmeFilter !== '__all__') {
      result = result.filter((c) => recipientProgramme[c.recipientId] === programmeFilter)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((c) => c.recipientName.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q))
    }
    return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [communications, channelFilter, statusFilter, recipientFilter, triggerFilter, dateRange, programmeFilter, search])

  const filters = [
    { id: 'channel', label: 'All Channels', options: [{ label: 'Email', value: 'email' }, { label: 'SMS', value: 'sms' }, { label: 'WhatsApp', value: 'whatsapp' }, { label: 'Phone', value: 'phone' }], value: channelFilter, onChange: setChannelFilter },
    { id: 'status', label: 'All Statuses', options: [{ label: 'Sent', value: 'sent' }, { label: 'Delivered', value: 'delivered' }, { label: 'Opened', value: 'opened' }, { label: 'Responded', value: 'responded' }, { label: 'Failed', value: 'failed' }], value: statusFilter, onChange: setStatusFilter },
    { id: 'recipient', label: 'All Recipients', options: [{ label: 'Trainee', value: 'trainee' }, { label: 'Employer', value: 'employer' }], value: recipientFilter, onChange: setRecipientFilter },
    { id: 'trigger', label: 'All Triggers', options: [{ label: 'Automated', value: 'automated' }, { label: 'Manual', value: 'manual' }, { label: 'Bulk Campaign', value: 'bulk_campaign' }], value: triggerFilter, onChange: setTriggerFilter },
    { id: 'dateRange', label: 'All Dates', options: dateRangeOptions, value: dateRange, onChange: setDateRange },
    { id: 'programme', label: 'All Programmes', options: programmeOptions, value: programmeFilter, onChange: setProgrammeFilter },
  ]

  return (
    <div className="space-y-4">
      <FilterBar filters={filters} searchPlaceholder="Search by name or subject..." searchValue={search} onSearchChange={setSearch} />
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-12">No communications match your filters.</p>
        )}
        {filtered.slice(0, 20).map((comm) => (
          <div key={comm.id}>
            <button
              onClick={() => setExpanded(expanded === comm.id ? null : comm.id)}
              className="w-full px-5 py-3 flex items-start gap-3 hover:bg-slate-50 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                {getChannelIcon(comm.channel)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold text-slate-900 truncate">{comm.subject}</p>
                  <StatusBadge status={comm.status} />
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {comm.recipientName}
                  <span className="mx-1 text-slate-300">|</span>
                  <span className="text-slate-400">{triggerLabel[comm.trigger] ?? comm.trigger}</span>
                </p>
                <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">{formatTimestamp(comm.timestamp)}</p>
              </div>
              <div className="flex-shrink-0 text-slate-400 mt-1">
                {expanded === comm.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </div>
            </button>
            {expanded === comm.id && (
              <div className="px-5 pb-4 ml-11">
                <div className="bg-slate-50 rounded-lg border border-slate-100 p-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Message Preview</p>
                    <p className="text-sm text-slate-700">{comm.preview}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery Timeline</p>
                    <div className="flex items-center gap-4 text-[10px]">
                      <span className="text-blue-600 font-bold">Sent</span>
                      <span className="text-slate-300">-</span>
                      <span className={comm.status === 'sent' ? 'text-slate-300' : 'text-teal-600 font-bold'}>
                        {comm.status === 'sent' ? 'Pending' : 'Delivered'}
                      </span>
                      <span className="text-slate-300">-</span>
                      <span className={['opened', 'responded'].includes(comm.status) ? 'text-green-600 font-bold' : 'text-slate-300'}>
                        {['opened', 'responded'].includes(comm.status) ? 'Opened' : 'Not opened'}
                      </span>
                      <span className="text-slate-300">-</span>
                      <span className={comm.status === 'responded' ? 'text-green-600 font-bold' : 'text-slate-300'}>
                        {comm.status === 'responded' ? 'Responded' : 'No response'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filtered.length > 20 && (
        <p className="text-xs text-slate-400 text-center">Showing 20 of {filtered.length} communications</p>
      )}
    </div>
  )
}

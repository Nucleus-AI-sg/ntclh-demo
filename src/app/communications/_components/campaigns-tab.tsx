'use client'

import { useState } from 'react'
import { Mail, MessageSquare, ChevronDown, ChevronUp, Megaphone } from 'lucide-react'
import { StatusBadge, DataTable, type Column } from '@/components/shared'
import type { Campaign, Communication } from '@/types'

const channelIcon: Record<string, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  sms: <MessageSquare className="h-3.5 w-3.5" />,
}

/** Simulated per-recipient data for expanded campaign view. */
const recipientStatus: Record<string, { name: string; status: string }[]> = {
  'camp-mar-placement': [
    { name: 'Priya Sharma', status: 'opened' },
    { name: 'Chris Loh', status: 'delivered' },
    { name: 'Wei Ming', status: 'responded' },
    { name: 'Kumar S.', status: 'opened' },
    { name: 'Raj Patel', status: 'opened' },
    { name: 'Fiona Cheng', status: 'responded' },
  ],
  'camp-doc-reminder': [
    { name: 'Wei Ming', status: 'responded' },
    { name: 'Priya Sharma', status: 'delivered' },
    { name: 'David Ng', status: 'responded' },
    { name: 'Lisa Koh', status: 'delivered' },
  ],
  'camp-q1-employer': [
    { name: 'TechCorp Pte Ltd', status: 'responded' },
    { name: 'DataInsights Pte Ltd', status: 'opened' },
    { name: 'FinanceFirst Pte Ltd', status: 'opened' },
  ],
}

function pct(n: number | null, total: number) {
  if (n === null) return '-'
  return `${n} (${Math.round((n / total) * 100)}%)`
}

interface CampaignsTabProps {
  campaigns: Campaign[]
  communications: Communication[]
}

export function CampaignsTab({ campaigns }: CampaignsTabProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const columns: Column<Campaign>[] = [
    {
      key: 'name',
      header: 'Campaign',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
            {channelIcon[row.channel] ?? <Megaphone className="h-3.5 w-3.5" />}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{row.name}</p>
            <p className="text-[10px] text-slate-400">{row.recipientCount} {row.recipientType}s</p>
          </div>
        </div>
      ),
    },
    { key: 'channel', header: 'Channel', render: (row) => <span className="text-xs capitalize">{row.channel}</span> },
    { key: 'sent', header: 'Sent', render: (row) => <span className="text-xs font-bold">{row.sent}</span> },
    { key: 'opened', header: 'Opened', render: (row) => <span className="text-xs">{pct(row.opened, row.sent)}</span> },
    { key: 'responded', header: 'Responded', render: (row) => <span className="text-xs">{pct(row.responded, row.sent)}</span> },
    { key: 'date', header: 'Date', render: (row) => <span className="text-xs text-slate-500">{row.date}</span> },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(expanded === row.id ? null : row.id) }}
          className="text-slate-400 hover:text-slate-600"
        >
          {expanded === row.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors">
          <Megaphone className="h-3.5 w-3.5" /> Create Campaign
        </button>
      </div>

      <DataTable columns={columns} data={campaigns} pageSize={10} onRowClick={(row) => setExpanded(expanded === row.id ? null : row.id)} />

      {/* Expanded detail panel */}
      {expanded && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Per-Recipient Status</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(recipientStatus[expanded] ?? []).map((r, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-slate-700">{r.name}</span>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

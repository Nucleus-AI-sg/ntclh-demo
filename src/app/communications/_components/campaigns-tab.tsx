'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Megaphone, Users, Clock, Pencil, X } from 'lucide-react'
import { StatusBadge, DataTable, useActionToast, ActionToast, ConfirmationModal, type Column } from '@/components/shared'
import { getChannelIcon } from '@/lib/channel-icons'
import { campaignRecipientStatus } from '@/data'
import type { Campaign } from '@/types'
import { CampaignWizard } from './campaign-wizard'

function pct(n: number | null, total: number) {
  if (n === null) return '-'
  return `${n} (${Math.round((n / total) * 100)}%)`
}

const scheduledMessages = [
  { id: 'sched-1', name: 'April placement opportunities', audience: 'BA Certification - Jan 2026', channel: 'email', recipientCount: 18, scheduledFor: '1 Apr 2026, 10:00' },
  { id: 'sched-2', name: 'Document deadline final reminder', audience: 'Pending document submission', channel: 'sms', recipientCount: 6, scheduledFor: '2 Apr 2026, 14:00' },
  { id: 'sched-3', name: 'Q2 employer newsletter', audience: 'Active employers', channel: 'email', recipientCount: 12, scheduledFor: '7 Apr 2026, 09:00' },
]

interface CampaignsTabProps {
  campaigns: Campaign[]
}

export function CampaignsTab({ campaigns }: CampaignsTabProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [cancelled, setCancelled] = useState<string[]>([])
  const [toast, showToast] = useActionToast()

  const activeScheduled = scheduledMessages.filter((s) => !cancelled.includes(s.id))

  const columns: Column<Campaign>[] = [
    {
      key: 'name',
      header: 'Campaign',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
            {getChannelIcon(row.channel) ?? <Megaphone className="h-3.5 w-3.5" />}
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
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setWizardOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
        >
          <Users className="h-3.5 w-3.5" /> Send to Cohort
        </button>
        <button
          onClick={() => setWizardOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors"
        >
          <Megaphone className="h-3.5 w-3.5" /> Create Campaign
        </button>
      </div>

      <DataTable columns={columns} data={campaigns} pageSize={10} onRowClick={(row) => setExpanded(expanded === row.id ? null : row.id)} />

      {/* Expanded detail panel */}
      {expanded && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Per-Recipient Status</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(campaignRecipientStatus[expanded] ?? []).map((r, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-slate-700">{r.name}</span>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Messages */}
      {activeScheduled.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="px-5 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold text-slate-900">Scheduled Messages</p>
              <span className="text-[10px] text-slate-400">{activeScheduled.length} pending</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {activeScheduled.map((msg) => (
              <div key={msg.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    {getChannelIcon(msg.channel)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{msg.name}</p>
                    <p className="text-[10px] text-slate-500">
                      {msg.audience} - {msg.recipientCount} recipients
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-amber-600 font-bold">{msg.scheduledFor}</span>
                  <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded" title="Edit">
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setCancelId(msg.id)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Cancel"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {wizardOpen && <CampaignWizard onClose={() => setWizardOpen(false)} />}

      <ConfirmationModal
        open={!!cancelId}
        title="Cancel scheduled message"
        description="Are you sure you want to cancel this scheduled message? This action cannot be undone."
        confirmLabel="Cancel Message"
        variant="destructive"
        onConfirm={() => {
          if (cancelId) setCancelled((prev) => [...prev, cancelId])
          setCancelId(null)
          showToast('Scheduled message cancelled')
        }}
        onCancel={() => setCancelId(null)}
      />
      <ActionToast message={toast} />
    </div>
  )
}

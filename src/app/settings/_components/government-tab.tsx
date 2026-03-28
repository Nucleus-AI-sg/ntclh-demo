'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { Button } from '@/components/ui/button'

interface GovernmentTabProps {
  showToast: (msg: string) => void
}

const govPortals = [
  { id: 'ssg', name: 'SSG Training Grant Portal', lastSync: '2026-03-01', reports: 12, format: 'SSG-2026-v3', nextDue: '1 Apr 2026', autoSubmission: 'Enabled (with pre-review)' },
  { id: 'wsg', name: 'WSG Placement Reporting', lastSync: '2026-03-01', reports: 8, format: 'WSG-Monthly-v2', nextDue: '1 Apr 2026', autoSubmission: 'Enabled (with pre-review)' },
  { id: 'imda', name: 'IMDA Programme Dashboard', lastSync: '2026-03-01', reports: 4, format: 'IMDA-Quarterly-v1', nextDue: '1 Apr 2026', autoSubmission: 'Disabled' },
]

export function GovernmentTab({ showToast }: GovernmentTabProps) {
  const [testingId, setTestingId] = useState<string | null>(null)

  const handleTest = (portal: typeof govPortals[number]) => {
    setTestingId(portal.id)
    setTimeout(() => {
      showToast(`${portal.name} connection verified`)
      setTestingId(null)
    }, 1500)
  }

  return (
    <div className="space-y-3">
      {govPortals.map((p) => (
        <div key={p.id} className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-bold text-slate-900">{p.name}</p>
              <p className="text-[10px] text-slate-500">Last sync: {p.lastSync} - {p.reports} reports submitted</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={testingId === p.id ? 'pending' : 'connected'} label={testingId === p.id ? 'Testing...' : 'Connected'} />
              <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-blue-600 px-2" disabled={testingId === p.id} onClick={() => handleTest(p)}>
                {testingId === p.id ? <><Loader2 className="h-3 w-3 animate-spin mr-1" /> Testing</> : 'Test Connection'}
              </Button>
            </div>
          </div>
          <div className="flex gap-4 text-[10px] text-slate-400">
            <span>Format: {p.format}</span>
            <span>Next due: {p.nextDue}</span>
            <span>Auto-submission: {p.autoSubmission}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

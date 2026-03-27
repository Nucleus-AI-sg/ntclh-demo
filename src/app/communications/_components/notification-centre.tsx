'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Bell, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { getChannelIcon } from '@/lib/channel-icons'
import type { Communication } from '@/types'

interface NotificationCentreProps {
  communications: Communication[]
  failedCount: number
}

function formatTimestamp(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export function NotificationCentre({ communications, failedCount }: NotificationCentreProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const alerts = useMemo(() =>
    communications
      .filter((c) => c.status === 'failed' || c.status === 'bounced')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10),
    [communications],
  )

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
      >
        <Bell className="h-3.5 w-3.5" />
        Alerts
        {failedCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {failedCount}
          </span>
        )}
        {open ? <ChevronUp className="h-3 w-3 ml-0.5" /> : <ChevronDown className="h-3 w-3 ml-0.5" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-900">Delivery Alerts</p>
            <p className="text-[10px] text-slate-500">
              {failedCount} failed or bounced message{failedCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {alerts.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No delivery issues</p>
            ) : (
              alerts.map((comm) => (
                <div key={comm.id} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50">
                  <div className="flex-shrink-0 mt-0.5">
                    {comm.status === 'failed' ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 truncate">{comm.recipientName}</p>
                      <StatusBadge status={comm.status} />
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{comm.subject}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-slate-400">{getChannelIcon(comm.channel, 'sm')}</span>
                      <span className="text-[9px] text-slate-400">{formatTimestamp(comm.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

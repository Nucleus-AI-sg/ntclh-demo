'use client'

import { useState, useMemo } from 'react'
import { ActivityFeed } from '@/components/shared'
import type { ActivityEvent } from '@/types'

const filterOptions: { label: string; value: string }[] = [
  { label: 'All Activity', value: 'all' },
  { label: 'Enrolment', value: 'enrolment' },
  { label: 'Documents', value: 'document' },
  { label: 'Placements', value: 'placement' },
]

interface ActivityFeedPanelProps {
  events: ActivityEvent[]
}

export function ActivityFeedPanel({ events }: ActivityFeedPanelProps) {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? events : events.filter((e) => e.type === filter)),
    [events, filter],
  )

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
          Live Activity
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
        </div>
      </div>
      <ActivityFeed events={filtered} maxItems={5} showViewAll />
    </div>
  )
}

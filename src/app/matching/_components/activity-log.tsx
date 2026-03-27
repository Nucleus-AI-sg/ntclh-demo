'use client'

import { Clock } from 'lucide-react'

interface ActivityLogProps {
  entries: { time: string; entry: string }[]
}

export function ActivityLog({ entries }: ActivityLogProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sticky top-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Activity Log</h4>
        </div>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {entries.map((e, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="text-slate-400 font-mono flex-shrink-0">{e.time}</span>
              <span className="text-slate-600">{e.entry}</span>
            </div>
          ))}
          {entries.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

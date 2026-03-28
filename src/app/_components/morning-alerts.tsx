'use client'

import { useState } from 'react'
import { alerts as allAlerts } from '@/data'

export function MorningAlerts() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 px-3 py-2 rounded flex items-center gap-3">
      <span className="material-symbols-outlined text-amber-600 text-lg">warning</span>
      <div className="flex flex-wrap gap-x-6 gap-y-0.5 text-[11px] font-medium text-amber-800">
        {allAlerts.slice(0, 3).map((alert) => (
          <div key={alert.id} className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-amber-600" />
            {alert.message}
          </div>
        ))}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-auto text-amber-900 hover:underline text-[9px] uppercase tracking-wider font-bold flex-shrink-0"
      >
        Dismiss All
      </button>
    </div>
  )
}

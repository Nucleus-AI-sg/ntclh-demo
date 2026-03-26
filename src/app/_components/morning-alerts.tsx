'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, X } from 'lucide-react'
import type { Alert } from '@/types'

interface MorningAlertsProps {
  alerts: Alert[]
}

export function MorningAlerts({ alerts: initialAlerts }: MorningAlertsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = initialAlerts.filter((a) => !dismissed.has(a.id))
  if (visible.length === 0) return null

  const dismissAll = () => setDismissed(new Set(initialAlerts.map((a) => a.id)))
  const dismissOne = (id: string) => setDismissed((prev) => new Set([...prev, id]))

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          {visible.map((alert) => (
            <div key={alert.id} className="flex items-center gap-2 text-xs font-medium text-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
              <Link href={alert.link} className="hover:underline flex-1">
                {alert.message}
              </Link>
              {alert.dismissible && (
                <button onClick={() => dismissOne(alert.id)} className="text-amber-400 hover:text-amber-700">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={dismissAll}
          className="text-amber-900 hover:underline text-[10px] uppercase tracking-wider font-bold flex-shrink-0"
        >
          Dismiss All
        </button>
      </div>
    </div>
  )
}

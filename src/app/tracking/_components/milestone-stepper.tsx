'use client'

import { CheckCircle2, Circle } from 'lucide-react'
import type { TraineeMilestone } from '@/types'

interface MilestoneStepperProps {
  milestones: TraineeMilestone[]
}

export function MilestoneStepper({ milestones }: MilestoneStepperProps) {
  if (milestones.length === 0) {
    return (
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Milestone Tracking</h4>
        <p className="text-xs text-slate-400">No milestones recorded</p>
      </div>
    )
  }

  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Milestone Tracking</h4>
      <div className="space-y-0">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1
          return (
            <div key={m.label} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                {m.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                )}
                {!isLast && <div className={`w-px flex-1 min-h-[16px] ${m.completed ? 'bg-green-300' : 'bg-slate-200'}`} />}
              </div>
              <div className="pb-2 min-w-0">
                <p className={`text-[10px] font-bold leading-tight ${m.completed ? 'text-slate-700' : 'text-slate-400'}`}>{m.label}</p>
                {m.date && <p className="text-[9px] text-slate-400">{m.date}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

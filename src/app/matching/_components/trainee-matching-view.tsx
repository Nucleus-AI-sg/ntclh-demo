'use client'

import Link from 'next/link'
import { StatusBadge } from '@/components/shared'
import type { Trainee, Vacancy, Programme } from '@/types'
import { LifecycleStage } from '@/types'

interface TraineeMatchingViewProps {
  trainees: Trainee[]
  vacancies: Vacancy[]
  programmes: Programme[]
}

export function TraineeMatchingView({ trainees, vacancies, programmes }: TraineeMatchingViewProps) {
  const unmatched = trainees.filter((t) => t.lifecycleStage === LifecycleStage.Completed && !t.placedEmployerId)
  const progMap = Object.fromEntries(programmes.map((p) => [p.id, p.shortName]))

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Unmatched Trainees ({unmatched.length})
      </h3>
      <div className="space-y-3">
        {unmatched.map((trainee) => {
          const matched = vacancies.filter((v) => v.programmeIds.includes(trainee.programmeId)).slice(0, 3)
          return (
            <div key={trainee.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Link href={`/trainee/${trainee.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600">
                    {trainee.name}
                  </Link>
                  <p className="text-[10px] text-slate-500">{progMap[trainee.programmeId]} - Completed {trainee.completionDate ?? 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">{trainee.daysInStage} days</span>
                  <StatusBadge status={trainee.riskLevel === 'at_risk' ? 'at_risk' : 'active'} label={trainee.riskLevel === 'at_risk' ? 'At Risk' : 'Active'} />
                </div>
              </div>
              {matched.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">Recommended Vacancies</p>
                  <div className="space-y-1.5">
                    {matched.map((v) => (
                      <div key={v.id} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded">
                        <span className="text-slate-700">{v.title} at {v.location}</span>
                        <span className="text-slate-500">${v.salaryMin.toLocaleString()}-${v.salaryMax.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {unmatched.length === 0 && <p className="text-sm text-slate-400 text-center py-8">All trainees have been matched</p>}
      </div>
    </div>
  )
}

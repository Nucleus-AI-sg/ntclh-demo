'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import type { Trainee, Vacancy, Programme } from '@/types'
import { LifecycleStage } from '@/types'

interface TraineeMatchingViewProps {
  trainees: Trainee[]
  vacancies: Vacancy[]
  programmes: Programme[]
}

export function TraineeMatchingView({ trainees, vacancies, programmes }: TraineeMatchingViewProps) {
  const [search, setSearch] = useState('')
  const [programmeFilter, setProgrammeFilter] = useState('all')

  const progMap = Object.fromEntries(programmes.map((p) => [p.id, p.shortName]))

  const unmatched = useMemo(() => {
    let result = trainees.filter((t) => t.lifecycleStage === LifecycleStage.Completed && !t.placedEmployerId)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((t) => t.name.toLowerCase().includes(q) || t.currentRole.toLowerCase().includes(q))
    }
    if (programmeFilter !== 'all') {
      result = result.filter((t) => t.programmeId === programmeFilter)
    }
    return result
  }, [trainees, search, programmeFilter])

  const uniqueProgIds = useMemo(() => [...new Set(trainees.filter((t) => t.lifecycleStage === LifecycleStage.Completed && !t.placedEmployerId).map((t) => t.programmeId))], [trainees])

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={programmeFilter}
          onChange={(e) => setProgrammeFilter(e.target.value)}
          className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Programmes</option>
          {uniqueProgIds.map((id) => (
            <option key={id} value={id}>{progMap[id] ?? id.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
        Unmatched Trainees ({unmatched.length})
      </h3>
      <div className="space-y-3">
        {unmatched.map((trainee) => {
          const matched = vacancies.filter((v) => v.programmeIds.includes(trainee.programmeId)).slice(0, 3)
          return (
            <div key={trainee.id} className="bg-white rounded-xl p-4">
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
                  <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">Recommended Vacancies ({matched.length})</p>
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
        {unmatched.length === 0 && <p className="text-sm text-slate-400 text-center py-8">{search.trim() || programmeFilter !== 'all' ? 'No trainees match your filters' : 'All trainees have been matched'}</p>}
      </div>
    </div>
  )
}

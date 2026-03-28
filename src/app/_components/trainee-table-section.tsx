'use client'

import { useState, useMemo } from 'react'
import { trainees, programmes } from '@/data'
import { LifecycleStage, RiskLevel } from '@/types'

const PAGE_SIZE = 4
const progMap = Object.fromEntries(programmes.map((p) => [p.id, p.shortName]))

const stageBadge: Record<string, string> = {
  [LifecycleStage.Applied]: 'bg-slate-100 text-slate-600',
  [LifecycleStage.Enrolled]: 'bg-blue-50 text-blue-700',
  [LifecycleStage.Training]: 'bg-blue-50 text-blue-700',
  [LifecycleStage.Completed]: 'bg-slate-100 text-slate-600',
  [LifecycleStage.Placed]: 'bg-amber-50 text-amber-700',
  [LifecycleStage.Verified]: 'bg-green-50 text-green-700',
}

function stageLabel(s: LifecycleStage) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function TraineeTableSection() {
  const [progFilter, setProgFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    let result = trainees
    if (progFilter !== 'all') result = result.filter((t) => t.programmeId === progFilter)
    if (stageFilter !== 'all') result = result.filter((t) => t.lifecycleStage === stageFilter)
    return result
  }, [progFilter, stageFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages - 1)
  const visible = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Active Trainee Monitoring
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={progFilter}
            onChange={(e) => { setProgFilter(e.target.value); setPage(0) }}
            className="text-[11px] border-slate-200 rounded-md focus:ring-blue-500 pr-7 py-1"
          >
            <option value="all">All Programmes</option>
            {programmes.map((p) => (
              <option key={p.id} value={p.id}>{p.shortName}</option>
            ))}
          </select>
          <select
            value={stageFilter}
            onChange={(e) => { setStageFilter(e.target.value); setPage(0) }}
            className="text-[11px] border-slate-200 rounded-md focus:ring-blue-500 pr-7 py-1"
          >
            <option value="all">All Stages</option>
            {Object.values(LifecycleStage).map((s) => (
              <option key={s} value={s}>{stageLabel(s)}</option>
            ))}
          </select>
          <button className="p-1.5 text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-lg">filter_list</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
              <th className="px-4 py-2.5">Trainee Name</th>
              <th className="px-4 py-2.5">Programme</th>
              <th className="px-4 py-2.5">Stage</th>
              <th className="px-4 py-2.5 text-center">Days in Stage</th>
              <th className="px-4 py-2.5">Last Activity</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {visible.map((t) => {
              const isRisk = t.riskLevel === RiskLevel.AtRisk
              const initials = t.name.split(' ').map((n) => n[0]).join('')
              return (
                <tr
                  key={t.id}
                  className={isRisk ? 'bg-red-50/30 hover:bg-red-50 transition-colors' : 'hover:bg-slate-50 transition-colors'}
                >
                  <td className={`px-4 py-2.5${isRisk ? ' border-l-4 border-red-500' : ''}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-[10px]">
                        {initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none text-xs">{t.name}</p>
                        {isRisk ? (
                          <p className="text-[9px] text-red-500 mt-0.5 font-bold">Documentation Risk</p>
                        ) : (
                          <p className="text-[9px] text-slate-400 mt-0.5">{t.cohortId}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] font-medium text-slate-600">
                    {progMap[t.programmeId] ?? t.programmeId}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`${stageBadge[t.lifecycleStage] ?? 'bg-slate-100 text-slate-600'} text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider`}>
                      {stageLabel(t.lifecycleStage)}
                    </span>
                  </td>
                  <td className={`px-4 py-2.5 text-center text-[11px] font-bold ${isRisk ? 'text-red-600' : 'text-slate-700'}`}>
                    {t.daysInStage}
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-slate-500">{t.lastActivity}</td>
                  <td className="px-4 py-2.5 text-right">
                    {isRisk ? (
                      <button className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded uppercase tracking-wider shadow-sm hover:bg-red-700">
                        Intervene
                      </button>
                    ) : (
                      <button className="p-0.5 hover:bg-slate-200 rounded text-slate-400 transition-colors">
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Showing {visible.length} of {filtered.length} active trainees
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="p-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

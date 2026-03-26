'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { Employer, Vacancy, Placement, Trainee } from '@/types'
import { PlacementStatus } from '@/types'

interface EmployerPortalProps {
  employer: Employer | undefined
  vacancies: Vacancy[]
  placements: Placement[]
  trainees: Trainee[]
  onAction: (msg: string) => void
}

const kanbanCols = [
  { key: PlacementStatus.Submitted, label: 'Submitted' },
  { key: PlacementStatus.Shortlisted, label: 'Shortlisted' },
  { key: PlacementStatus.Interviewed, label: 'Interviewed' },
  { key: PlacementStatus.Offered, label: 'Offered' },
  { key: PlacementStatus.Hired, label: 'Hired' },
] as const

export function EmployerPortal({ employer, vacancies, placements: initialPlacements, trainees, onAction }: EmployerPortalProps) {
  const [placementState, setPlacementState] = useState(initialPlacements)
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null)
  const [ratings, setRatings] = useState({ technical: 0, communication: 0, cultural: 0 })

  if (!employer) return <p className="text-sm text-slate-400 text-center py-8">Select an employer from the By Employer tab first</p>

  const traineeMap = Object.fromEntries(trainees.map((t) => [t.id, t]))
  const empPlacements = placementState.filter((p) => p.employerId === employer.id)
  const hiredPlacements = empPlacements.filter((p) => p.status === PlacementStatus.Hired)

  const moveTo = (placementId: string, status: PlacementStatus, label: string) => {
    setPlacementState((prev) => prev.map((p) => p.id === placementId ? { ...p, status } : p))
    onAction(`Candidate moved to ${label}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-blue-900">{employer.name}</p>
          <p className="text-xs text-blue-600">{vacancies.length} active vacancies - {employer.totalPlacements} total placements</p>
        </div>
        <span className="text-[10px] font-bold text-blue-600 uppercase">Employer Portal Preview</span>
      </div>

      {/* Kanban Pipeline */}
      <div className="overflow-x-auto">
        <div className="flex gap-3 min-w-[800px]">
          {kanbanCols.map((col) => {
            const items = empPlacements.filter((p) => p.status === col.key)
            return (
              <div key={col.key} className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-3 min-w-[150px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{col.label}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-1.5 rounded">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((p) => {
                    const trainee = traineeMap[p.traineeId]
                    if (!trainee) return null
                    return (
                      <div key={p.id} className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
                        <p className="text-xs font-bold text-slate-900">{trainee.name}</p>
                        <p className="text-[10px] text-slate-500">{trainee.programmeId.toUpperCase()}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[10px] font-bold text-green-600">{p.matchScore}% match</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {col.key === PlacementStatus.Submitted && (
                            <>
                              <button onClick={() => moveTo(p.id, PlacementStatus.Shortlisted, 'Shortlisted')} className="px-2 py-1 text-[9px] font-bold text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Shortlist</button>
                              <button onClick={() => moveTo(p.id, PlacementStatus.Passed, 'Passed')} className="px-2 py-1 text-[9px] font-bold text-slate-500 border border-slate-200 rounded hover:bg-slate-50">Pass</button>
                            </>
                          )}
                          {col.key === PlacementStatus.Shortlisted && (
                            <button onClick={() => { moveTo(p.id, PlacementStatus.Interviewed, 'Interviewed'); setFeedbackOpen(p.id) }} className="px-2 py-1 text-[9px] font-bold text-teal-600 border border-teal-200 rounded hover:bg-teal-50">Interview</button>
                          )}
                          {col.key === PlacementStatus.Interviewed && (
                            <button onClick={() => moveTo(p.id, PlacementStatus.Hired, 'Hired')} className="px-2 py-1 text-[9px] font-bold text-green-600 border border-green-200 rounded hover:bg-green-50">Hire</button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interview Feedback Form */}
      {feedbackOpen && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Interview Feedback</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {(['technical', 'communication', 'cultural'] as const).map((key) => (
              <div key={key}>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 capitalize">{key} Skills</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setRatings((r) => ({ ...r, [key]: n }))} className={cn('p-1', n <= ratings[key] ? 'text-amber-400' : 'text-slate-200')}>
                      <Star className="h-5 w-5" fill={n <= ratings[key] ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { setFeedbackOpen(null); onAction('Feedback submitted') }} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">
            Submit Feedback
          </button>
        </div>
      )}

      {/* Hiring History */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Hiring History</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Candidate</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3 text-center">Score</th>
              <th className="px-5 py-3">Retention</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hiredPlacements.length === 0 && <tr><td colSpan={5} className="px-5 py-6 text-center text-slate-400">No hiring history</td></tr>}
            {hiredPlacements.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900">{traineeMap[p.traineeId]?.name ?? p.traineeId}</td>
                <td className="px-5 py-3 text-slate-600">{traineeMap[p.traineeId]?.placedRole ?? '-'}</td>
                <td className="px-5 py-3 text-center font-bold">{p.matchScore}%</td>
                <td className="px-5 py-3 text-slate-500">{p.retentionMonths ? `${p.retentionMonths} months` : '-'}</td>
                <td className="px-5 py-3"><StatusBadge status="hired" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import type { Vacancy } from '@/types'

interface VacanciesTabProps {
  vacancies: Vacancy[]
}

export function VacanciesTab({ vacancies }: VacanciesTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showClosed, setShowClosed] = useState(false)

  const active = vacancies.filter((v) => v.status !== 'filled' && v.status !== 'cancelled')
  const closed = vacancies.filter((v) => v.status === 'filled' || v.status === 'cancelled')

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id))

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Vacancies ({active.length})</h3>
      {active.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No active vacancies</p>}
      {active.map((v) => (
        <div key={v.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <button onClick={() => toggle(v.id)} className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50">
            <div>
              <p className="text-sm font-bold text-slate-900">{v.title}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span>${v.salaryMin.toLocaleString()}-${v.salaryMax.toLocaleString()}</span><span>-</span>
                <span>{v.location}</span><span>-</span>
                <span>{v.candidatesSubmitted} candidates</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={v.status} />
              <span className="text-[10px] text-slate-400">{v.postedDate}</span>
              {expandedId === v.id ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </div>
          </button>
          {expandedId === v.id && (
            <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
              <p className="text-xs text-slate-600">{v.description}</p>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Requirements</p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                  {v.requirements.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
              <p className="text-[10px] text-slate-500"><span className="font-bold uppercase">Timeline:</span> {v.hiringTimeline}</p>
            </div>
          )}
        </div>
      ))}

      {closed.length > 0 && (
        <div>
          <button onClick={() => setShowClosed(!showClosed)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">
            {showClosed ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            Closed/Filled Vacancies ({closed.length})
          </button>
          {showClosed && (
            <div className="mt-2 space-y-2">
              {closed.map((v) => (
                <div key={v.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{v.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{v.location} - Posted {v.postedDate}</p>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

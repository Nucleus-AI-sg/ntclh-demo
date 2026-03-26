'use client'

import { useState } from 'react'
import { Calendar, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { scoreColour } from '@/lib/colours'
import type { Assessment, Trainee } from '@/types'
import { ApplicationStatus } from '@/types'

type SortKey = 'date' | 'score' | 'priority'

interface ApplicationQueueProps {
  assessments: Assessment[]
  trainees: Trainee[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ApplicationQueue({ assessments, trainees, selectedId, onSelect }: ApplicationQueueProps) {
  const [sortBy, setSortBy] = useState<SortKey>('date')

  const traineeMap = Object.fromEntries(trainees.map((t) => [t.id, t]))
  const pending = assessments.filter((a) => a.status === ApplicationStatus.Pending)

  const sorted = [...pending].sort((a, b) => {
    if (sortBy === 'score') return b.overallScore - a.overallScore
    if (sortBy === 'priority') return (a.overallScore === 0 ? -1 : 0) - (b.overallScore === 0 ? -1 : 0)
    const dateA = traineeMap[a.traineeId]?.applicationDate ?? ''
    const dateB = traineeMap[b.traineeId]?.applicationDate ?? ''
    return dateB.localeCompare(dateA)
  })

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application Queue</h2>
        <span className="text-xs font-medium text-slate-400">{pending.length} Pending</span>
      </div>
      <div className="px-4 py-2 border-b border-slate-200 bg-white flex gap-1">
        {(['date', 'score', 'priority'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors',
              sortBy === key ? 'bg-blue-50 text-blue-700' : 'text-slate-400 hover:text-slate-600',
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
        {sorted.map((assessment) => {
          const trainee = traineeMap[assessment.traineeId]
          if (!trainee) return null
          const isSelected = selectedId === assessment.id
          const colour = scoreColour(assessment.overallScore)
          const isIncomplete = assessment.overallScore === 0

          return (
            <div
              key={assessment.id}
              onClick={() => onSelect(assessment.id)}
              className={cn(
                'p-4 cursor-pointer transition-colors',
                isSelected ? 'bg-white border-l-4 border-blue-600 shadow-sm' : 'hover:bg-white border-l-4 border-transparent',
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={cn('font-bold', isSelected ? 'text-slate-900' : 'text-slate-700')}>
                  {trainee.name}
                </h3>
                {isIncomplete ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">
                    Follow-up
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                    New
                  </span>
                )}
              </div>
              <div className="flex items-center text-xs text-slate-500 mb-3">
                <Calendar className="h-3 w-3 mr-1" />
                {trainee.applicationDate}
                <span className="mx-2">-</span>
                {trainee.currentRole}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={cn('text-sm font-black px-2 py-1 rounded', colour.text, assessment.overallScore >= 80 ? 'bg-green-50' : assessment.overallScore >= 60 ? 'bg-amber-50' : 'bg-red-50')}>
                    {assessment.overallScore || '—'}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2 uppercase font-bold">AI Score</span>
                </div>
                {isSelected && <ChevronRight className="h-4 w-4 text-blue-600" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

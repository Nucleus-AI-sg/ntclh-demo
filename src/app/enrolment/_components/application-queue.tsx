'use client'

import { useState, useMemo } from 'react'
import { Calendar, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { scoreColour } from '@/lib/colours'
import type { Assessment, Trainee } from '@/types'
import { ApplicationStatus } from '@/types'
import { Input } from '@/components/ui/input'

type SortKey = 'date' | 'score' | 'priority'
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected'

interface ApplicationQueueProps {
  assessments: Assessment[]
  trainees: Trainee[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ApplicationQueue({ assessments, trainees, selectedId, onSelect }: ApplicationQueueProps) {
  const [sortBy, setSortBy] = useState<SortKey>('date')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const traineeMap = useMemo(() => Object.fromEntries(trainees.map((t) => [t.id, t])), [trainees])

  const filtered = useMemo(() => {
    let result = assessments

    if (statusFilter === 'pending') result = result.filter((a) => a.status === ApplicationStatus.Pending)
    else if (statusFilter === 'approved') result = result.filter((a) => a.status === ApplicationStatus.Approved)
    else if (statusFilter === 'rejected') result = result.filter((a) => a.status === ApplicationStatus.Rejected)

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((a) => {
        const t = traineeMap[a.traineeId]
        return t?.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)
      })
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'score') return b.overallScore - a.overallScore
      if (sortBy === 'priority') return (a.overallScore === 0 ? -1 : 0) - (b.overallScore === 0 ? -1 : 0)
      const dateA = traineeMap[a.traineeId]?.applicationDate ?? ''
      const dateB = traineeMap[b.traineeId]?.applicationDate ?? ''
      return dateB.localeCompare(dateA)
    })
  }, [assessments, traineeMap, search, statusFilter, sortBy])

  const statusLabel = (status: ApplicationStatus) => {
    if (status === ApplicationStatus.Approved) return { text: 'Approved', cls: 'bg-green-100 text-green-700' }
    if (status === ApplicationStatus.Rejected) return { text: 'Rejected', cls: 'bg-red-100 text-red-700' }
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application Queue</h2>
          <span className="text-xs font-medium text-slate-400">{filtered.length} shown</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>
      <div className="px-4 py-2 border-b border-slate-200 bg-white flex gap-1 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors',
              statusFilter === key ? 'bg-blue-50 text-blue-700' : 'text-slate-400 hover:text-slate-600',
            )}
          >
            {key}
          </button>
        ))}
        <span className="mx-1 border-r border-slate-200" />
        {(['date', 'score', 'priority'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors',
              sortBy === key ? 'bg-teal-50 text-teal-700' : 'text-slate-400 hover:text-slate-600',
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
        {filtered.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">No applications match your filters.</div>
        )}
        {filtered.map((assessment) => {
          const trainee = traineeMap[assessment.traineeId]
          if (!trainee) return null
          const isSelected = selectedId === assessment.id
          const colour = scoreColour(assessment.overallScore)
          const isIncomplete = assessment.overallScore === 0
          const processed = statusLabel(assessment.status)

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
                {processed ? (
                  <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase', processed.cls)}>
                    {processed.text}
                  </span>
                ) : isIncomplete ? (
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
                    {assessment.overallScore || '-'}
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

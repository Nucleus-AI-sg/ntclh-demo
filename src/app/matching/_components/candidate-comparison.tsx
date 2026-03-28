'use client'

import { useState, useMemo } from 'react'
import { GitCompareArrows } from 'lucide-react'
import { AppRadarChart, ConfirmationModal } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { MatchResult, Trainee, Vacancy } from '@/types'
import { ComparisonTable } from './comparison-table'

interface CandidateComparisonProps {
  matches: MatchResult[]
  trainees: Trainee[]
  vacancies: Vacancy[]
  onSubmit: (traineeName: string, employerName: string) => void
}

const skillLabels = ['Technical Skills', 'Domain Knowledge', 'Communication', 'Problem Solving', 'Leadership', 'Industry Experience']
const radarColours = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6']

export function CandidateComparison({ matches, trainees, vacancies, onSubmit }: CandidateComparisonProps) {
  const [selectedVacancyId, setSelectedVacancyId] = useState(vacancies[0]?.id ?? '')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [submitModal, setSubmitModal] = useState<{ traineeName: string; vacancyTitle: string } | null>(null)

  const traineeMap = useMemo(() => Object.fromEntries(trainees.map((t) => [t.id, t])), [trainees])
  const vacancy = vacancies.find((v) => v.id === selectedVacancyId)
  const vacancyMatches = matches.filter((m) => m.vacancyId === selectedVacancyId).sort((a, b) => b.score - a.score)
  const comparedMatches = vacancyMatches.filter((m) => selectedIds.includes(m.id))

  const toggleCandidate = (matchId: string) => {
    setSelectedIds((prev) => prev.includes(matchId) ? prev.filter((id) => id !== matchId) : prev.length < 4 ? [...prev, matchId] : prev)
  }

  // Build overlay radar data
  const radarData = skillLabels.map((skill) => {
    const entry: Record<string, string | number> = { skill }
    const firstMatch = vacancyMatches[0]
    if (firstMatch) entry.requirement = firstMatch.skillsComparison.find((s) => s.skill === skill)?.requirementScore ?? 0
    comparedMatches.forEach((m) => {
      const trainee = traineeMap[m.traineeId]
      entry[trainee?.name ?? m.id] = m.skillsComparison.find((s) => s.skill === skill)?.candidateScore ?? 0
    })
    return entry
  })

  const radars = [
    { key: 'requirement', label: 'Required', colour: '#94a3b8', fillOpacity: 0.05 },
    ...comparedMatches.map((m, i) => ({
      key: traineeMap[m.traineeId]?.name ?? m.id,
      label: traineeMap[m.traineeId]?.name ?? 'Unknown',
      colour: radarColours[i % radarColours.length],
    })),
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <GitCompareArrows className="h-4 w-4 text-blue-600" />
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Candidate Comparison</h3>
        <select value={selectedVacancyId} onChange={(e) => { setSelectedVacancyId(e.target.value); setSelectedIds([]) }} className="ml-auto px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {vacancies.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
        </select>
      </div>

      {/* Candidate selector */}
      <div className="flex flex-wrap gap-2">
        {vacancyMatches.map((m) => {
          const trainee = traineeMap[m.traineeId]
          if (!trainee) return null
          return (
            <button key={m.id} onClick={() => toggleCandidate(m.id)} className={cn('px-3 py-1.5 text-xs font-bold rounded-lg border transition-all', selectedIds.includes(m.id) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')}>
              {trainee.name} ({m.score}%)
            </button>
          )
        })}
      </div>
      <p className="text-[10px] text-slate-400">Select up to 4 candidates to compare. {selectedIds.length}/4 selected.</p>

      {comparedMatches.length >= 2 ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Skills Comparison</p>
              <AppRadarChart data={radarData} radars={radars} angleKey="skill" height={280} showLegend />
            </div>
            <ComparisonTable matches={comparedMatches} traineeMap={traineeMap} skillLabels={skillLabels} />
          </div>
          <div className="flex gap-2">
            {comparedMatches.map((m) => {
              const trainee = traineeMap[m.traineeId]
              if (!trainee) return null
              return (
                <button key={m.id} onClick={() => setSubmitModal({ traineeName: trainee.name, vacancyTitle: vacancy?.title ?? '' })} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">
                  Submit {trainee.name}
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-sm text-slate-400">Select at least 2 candidates above to see a side-by-side comparison</div>
      )}

      <ConfirmationModal open={!!submitModal} onConfirm={() => { if (submitModal) onSubmit(submitModal.traineeName, submitModal.vacancyTitle); setSubmitModal(null) }} onCancel={() => setSubmitModal(null)} title="Submit Candidate" description={submitModal ? `Submit ${submitModal.traineeName} for ${submitModal.vacancyTitle}?` : ''} confirmLabel="Submit" />
    </div>
  )
}

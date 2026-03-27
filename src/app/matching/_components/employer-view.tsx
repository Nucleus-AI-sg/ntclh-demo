'use client'

import { useState, useMemo } from 'react'
import { MapPin, Search } from 'lucide-react'
import { StatusBadge, ConfirmationModal } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { Employer, Vacancy, MatchResult, Trainee } from '@/types'
import { CandidateMatchCard } from './candidate-match-card'

interface EmployerViewProps {
  employers: Employer[]
  vacancies: Vacancy[]
  matches: MatchResult[]
  trainees: Trainee[]
  selectedEmployerId: string
  onSelectEmployer: (id: string) => void
  onSubmit: (traineeName: string, employerName: string) => void
  onLogActivity: (entry: string) => void
}

type SortKey = 'score' | 'name'

export function EmployerView({ employers, vacancies, matches, trainees, selectedEmployerId, onSelectEmployer, onSubmit, onLogActivity }: EmployerViewProps) {
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null)
  const [sidebarSearch, setSidebarSearch] = useState('')
  const [candidateSort, setCandidateSort] = useState<SortKey>('score')
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())
  const [submitModal, setSubmitModal] = useState<{ traineeName: string; employerName: string } | null>(null)

  const filteredEmployers = useMemo(() => {
    if (!sidebarSearch.trim()) return employers
    const q = sidebarSearch.toLowerCase()
    return employers.filter((e) => e.name.toLowerCase().includes(q))
  }, [employers, sidebarSearch])

  const employer = employers.find((e) => e.id === selectedEmployerId)
  const employerVacancies = vacancies.filter((v) => v.employerId === selectedEmployerId)
  const selectedVacancy = employerVacancies.find((v) => v.id === selectedVacancyId) ?? employerVacancies[0]
  const traineeMap = useMemo(() => Object.fromEntries(trainees.map((t) => [t.id, t])), [trainees])

  const vacancyMatches = useMemo(() => {
    if (!selectedVacancy) return []
    const filtered = matches.filter((m) => m.vacancyId === selectedVacancy.id && !dismissedIds.has(m.id))
    if (candidateSort === 'name') return [...filtered].sort((a, b) => (traineeMap[a.traineeId]?.name ?? '').localeCompare(traineeMap[b.traineeId]?.name ?? ''))
    return [...filtered].sort((a, b) => b.score - a.score)
  }, [selectedVacancy, matches, dismissedIds, candidateSort, traineeMap])

  const handleDismiss = (matchId: string, traineeName: string) => {
    setDismissedIds((prev) => new Set(prev).add(matchId))
    onLogActivity(`Dismissed ${traineeName} from ${selectedVacancy?.title}`)
  }

  const handleBookmark = (matchId: string, traineeName: string) => {
    const wasBookmarked = bookmarkedIds.has(matchId)
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      wasBookmarked ? next.delete(matchId) : next.add(matchId)
      return next
    })
    onLogActivity(wasBookmarked ? `Removed bookmark for ${traineeName}` : `Bookmarked ${traineeName} for ${selectedVacancy?.title}`)
  }

  const confirmSubmit = () => {
    if (!submitModal) return
    onSubmit(submitModal.traineeName, submitModal.employerName)
    onLogActivity(`Submitted ${submitModal.traineeName} to ${submitModal.employerName}`)
    setSubmitModal(null)
  }

  return (
    <>
      <div className="flex gap-6 min-h-[500px]">
        {/* Employer Sidebar */}
        <div className="w-72 flex-shrink-0 space-y-2 overflow-y-auto">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input type="text" placeholder="Search employers..." value={sidebarSearch} onChange={(e) => setSidebarSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {filteredEmployers.map((emp) => {
            const vCount = vacancies.filter((v) => v.employerId === emp.id).length
            return (
              <button key={emp.id} onClick={() => { onSelectEmployer(emp.id); setSelectedVacancyId(null) }} className={cn('w-full text-left p-3 rounded-xl border transition-all', emp.id === selectedEmployerId ? 'bg-white border-blue-500 ring-1 ring-blue-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-white')}>
                <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-500">{vCount} vacancies</span>
                  <StatusBadge status={emp.pipelineHealth} />
                </div>
              </button>
            )
          })}
          {filteredEmployers.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No employers match your search</p>}
        </div>

        {/* Vacancy Detail + Candidates */}
        <div className="flex-1 space-y-4">
          {selectedVacancy && employer && (
            <>
              {employerVacancies.length > 1 && (
                <div className="flex gap-2">
                  {employerVacancies.map((v) => (
                    <button key={v.id} onClick={() => setSelectedVacancyId(v.id)} className={cn('px-3 py-1.5 text-xs font-bold rounded-lg border transition-all', v.id === selectedVacancy.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50')}>{v.title}</button>
                  ))}
                </div>
              )}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedVacancy.title}</h3>
                    <p className="text-sm text-slate-500">{employer.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span>${selectedVacancy.salaryMin.toLocaleString()}-${selectedVacancy.salaryMax.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{selectedVacancy.location}</span>
                      <StatusBadge status={selectedVacancy.status} />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Posted {selectedVacancy.postedDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI-Ranked Candidates</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Sort by</span>
                  {(['score', 'name'] as const).map((key) => (
                    <button key={key} onClick={() => setCandidateSort(key)} className={cn('px-2 py-1 text-[10px] font-bold rounded border transition-all', candidateSort === key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50')}>{key === 'score' ? 'Match Score' : 'Name'}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {vacancyMatches.map((match, rank) => {
                  const trainee = traineeMap[match.traineeId]
                  if (!trainee) return null
                  return (
                    <CandidateMatchCard key={match.id} match={match} trainee={trainee} rank={rank + 1} isExpanded={expandedMatch === match.id} isBookmarked={bookmarkedIds.has(match.id)} onToggle={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)} onSubmit={() => setSubmitModal({ traineeName: trainee.name, employerName: employer.name })} onBookmark={() => handleBookmark(match.id, trainee.name)} onDismiss={() => handleDismiss(match.id, trainee.name)} />
                  )
                })}
                {vacancyMatches.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No matches for this vacancy</p>}
              </div>
            </>
          )}
        </div>
      </div>
      <ConfirmationModal open={!!submitModal} onConfirm={confirmSubmit} onCancel={() => setSubmitModal(null)} title="Submit Candidate" description={submitModal ? `Submit ${submitModal.traineeName} to ${submitModal.employerName}? An employer-facing profile will be generated and sent for review.` : ''} confirmLabel="Submit" />
    </>
  )
}

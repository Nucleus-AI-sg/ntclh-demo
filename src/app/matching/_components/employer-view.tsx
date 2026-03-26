'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Send } from 'lucide-react'
import { StatusBadge, AppRadarChart } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { Employer, Vacancy, MatchResult, Trainee } from '@/types'

interface EmployerViewProps {
  employers: Employer[]
  vacancies: Vacancy[]
  matches: MatchResult[]
  trainees: Trainee[]
  selectedEmployerId: string
  onSelectEmployer: (id: string) => void
  onSubmit: (traineeName: string, employerName: string) => void
}

export function EmployerView({ employers, vacancies, matches, trainees, selectedEmployerId, onSelectEmployer, onSubmit }: EmployerViewProps) {
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null)

  const employer = employers.find((e) => e.id === selectedEmployerId)
  const employerVacancies = vacancies.filter((v) => v.employerId === selectedEmployerId)
  const selectedVacancy = employerVacancies.find((v) => v.id === selectedVacancyId) ?? employerVacancies[0]
  const vacancyMatches = selectedVacancy ? matches.filter((m) => m.vacancyId === selectedVacancy.id) : []
  const traineeMap = Object.fromEntries(trainees.map((t) => [t.id, t]))

  return (
    <div className="flex gap-6 min-h-[500px]">
      {/* Employer Sidebar */}
      <div className="w-72 flex-shrink-0 space-y-2 overflow-y-auto">
        {employers.map((emp) => {
          const vCount = vacancies.filter((v) => v.employerId === emp.id).length
          const isSelected = emp.id === selectedEmployerId
          return (
            <button
              key={emp.id}
              onClick={() => { onSelectEmployer(emp.id); setSelectedVacancyId(null) }}
              className={cn(
                'w-full text-left p-3 rounded-xl border transition-all',
                isSelected ? 'bg-white border-blue-500 ring-1 ring-blue-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-white',
              )}
            >
              <p className="text-sm font-bold text-slate-900">{emp.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-slate-500">{vCount} vacancies</span>
                <StatusBadge status={emp.pipelineHealth} />
              </div>
            </button>
          )
        })}
      </div>

      {/* Vacancy Detail + Candidates */}
      <div className="flex-1 space-y-4">
        {selectedVacancy && employer && (
          <>
            {employerVacancies.length > 1 && (
              <div className="flex gap-2">
                {employerVacancies.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVacancyId(v.id)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold rounded-lg border transition-all',
                      v.id === selectedVacancy.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
                    )}
                  >
                    {v.title}
                  </button>
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

            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI-Ranked Candidates</h4>
            <div className="space-y-2">
              {vacancyMatches.map((match, rank) => {
                const trainee = traineeMap[match.traineeId]
                if (!trainee) return null
                const isExpanded = expandedMatch === match.id
                const radarData = match.skillsComparison.map((s) => ({ skill: s.skill, candidate: s.candidateScore, requirement: s.requirementScore }))

                return (
                  <div key={match.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50" onClick={() => setExpandedMatch(isExpanded ? null : match.id)}>
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black">#{rank + 1}</span>
                        <div>
                          <Link href={`/trainee/${trainee.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600">{trainee.name}</Link>
                          <p className="text-[10px] text-slate-500">{trainee.programmeId.toUpperCase()} - {trainee.currentRole}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-green-600">{match.score}%</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-slate-100 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">Match Reasoning</p>
                            <ul className="space-y-1.5">
                              {match.reasoning.map((r, i) => <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">- {r}</li>)}
                            </ul>
                            {match.concerns.length > 0 && (
                              <div className="mt-3">
                                <p className="text-[10px] font-bold text-amber-700 uppercase mb-1">Concerns</p>
                                {match.concerns.map((c, i) => <p key={i} className="text-xs text-amber-600">- {c}</p>)}
                              </div>
                            )}
                          </div>
                          <AppRadarChart data={radarData} radars={[{ key: 'candidate', label: 'Candidate', colour: '#2563eb' }, { key: 'requirement', label: 'Required', colour: '#94a3b8', fillOpacity: 0.05 }]} angleKey="skill" height={220} showLegend />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => onSubmit(trainee.name, employer.name)} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">
                            <Send className="h-3.5 w-3.5" /> Submit to Employer
                          </button>
                          <button className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50">Bookmark</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              {vacancyMatches.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No matches for this vacancy</p>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

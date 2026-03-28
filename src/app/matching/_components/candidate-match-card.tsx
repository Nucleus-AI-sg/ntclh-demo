'use client'

import Link from 'next/link'
import { ChevronDown, ChevronUp, Send, Bookmark, X } from 'lucide-react'
import { AppRadarChart } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { MatchResult, Trainee } from '@/types'

interface CandidateMatchCardProps {
  match: MatchResult
  trainee: Trainee
  rank: number
  isExpanded: boolean
  isBookmarked: boolean
  onToggle: () => void
  onSubmit: () => void
  onBookmark: () => void
  onDismiss: () => void
}

export function CandidateMatchCard({ match, trainee, rank, isExpanded, isBookmarked, onToggle, onSubmit, onBookmark, onDismiss }: CandidateMatchCardProps) {
  const radarData = match.skillsComparison.map((s) => ({ skill: s.skill, candidate: s.candidateScore, requirement: s.requirementScore }))

  return (
    <div className={cn('bg-white rounded-xl overflow-hidden', isBookmarked ? 'ring-1 ring-amber-300' : '')}>
      <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50" onClick={onToggle}>
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black">#{rank}</span>
          <div>
            <Link href={`/trainee/${trainee.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600" onClick={(e) => e.stopPropagation()}>{trainee.name}</Link>
            <p className="text-[10px] text-slate-500">{trainee.programmeId.toUpperCase()} - {trainee.currentRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isBookmarked && <Bookmark className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
          <span className={cn('text-lg font-black', match.score >= 80 ? 'text-green-600' : match.score >= 60 ? 'text-amber-600' : 'text-red-500')}>{match.score}%</span>
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
            <button onClick={onSubmit} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">
              <Send className="h-3.5 w-3.5" /> Submit to Employer
            </button>
            <button onClick={onBookmark} className={cn('flex items-center gap-1.5 px-4 py-2 border text-xs font-bold rounded-lg', isBookmarked ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50')}>
              <Bookmark className="h-3.5 w-3.5" /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button onClick={onDismiss} className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50">
              <X className="h-3.5 w-3.5" /> Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

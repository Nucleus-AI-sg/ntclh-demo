'use client'

import { cn } from '@/lib/utils'
import type { MatchResult, Trainee } from '@/types'

interface ComparisonTableProps {
  matches: MatchResult[]
  traineeMap: Record<string, Trainee>
  skillLabels: string[]
}

export function ComparisonTable({ matches, traineeMap, skillLabels }: ComparisonTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <th className="px-4 py-3">Attribute</th>
            {matches.map((m) => (
              <th key={m.id} className="px-4 py-3">{traineeMap[m.traineeId]?.name ?? 'Unknown'}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="px-4 py-2.5 font-bold text-slate-600">Match Score</td>
            {matches.map((m) => (
              <td key={m.id} className={cn('px-4 py-2.5 font-black', m.score >= 80 ? 'text-green-600' : m.score >= 60 ? 'text-amber-600' : 'text-red-500')}>{m.score}%</td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2.5 font-bold text-slate-600">Programme</td>
            {matches.map((m) => (
              <td key={m.id} className="px-4 py-2.5 text-slate-700">{traineeMap[m.traineeId]?.programmeId.toUpperCase()}</td>
            ))}
          </tr>
          {skillLabels.map((skill) => (
            <tr key={skill}>
              <td className="px-4 py-2.5 font-bold text-slate-600">{skill}</td>
              {matches.map((m) => {
                const sc = m.skillsComparison.find((s) => s.skill === skill)
                const diff = sc ? sc.candidateScore - sc.requirementScore : 0
                return (
                  <td key={m.id} className="px-4 py-2.5">
                    <span className="text-slate-700">{sc?.candidateScore ?? '-'}</span>
                    <span className={cn('ml-1 text-[10px] font-bold', diff >= 0 ? 'text-green-500' : 'text-red-400')}>{diff >= 0 ? `+${diff}` : diff}</span>
                  </td>
                )
              })}
            </tr>
          ))}
          <tr>
            <td className="px-4 py-2.5 font-bold text-slate-600">Strengths</td>
            {matches.map((m) => (
              <td key={m.id} className="px-4 py-2.5 text-slate-700">{m.strengths.join(', ')}</td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2.5 font-bold text-slate-600">Concerns</td>
            {matches.map((m) => (
              <td key={m.id} className="px-4 py-2.5 text-amber-600">{m.concerns.length > 0 ? m.concerns.join(', ') : 'None'}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

import Link from 'next/link'
import { StatusBadge } from '@/components/shared'
import type { Placement, Trainee, Vacancy } from '@/types'
import { cn } from '@/lib/utils'

interface PlacementsTabProps {
  placements: Placement[]
  trainees: Trainee[]
  vacancies: Vacancy[]
}

function retentionColour(months?: number): string {
  if (!months) return 'text-slate-400'
  if (months >= 6) return 'text-green-600'
  if (months >= 3) return 'text-amber-600'
  return 'text-red-600'
}

export function PlacementsTab({ placements, trainees, vacancies }: PlacementsTabProps) {
  const traineeMap = Object.fromEntries(trainees.map((t) => [t.id, t]))
  const vacancyMap = Object.fromEntries(vacancies.map((v) => [v.id, v]))

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <th className="px-5 py-3">Trainee</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3">Start Date</th>
            <th className="px-5 py-3">Programme</th>
            <th className="px-5 py-3 text-center">Score</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Retention</th>
            <th className="px-5 py-3 text-center">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {placements.length === 0 && (
            <tr><td colSpan={8} className="px-5 py-8 text-center text-slate-400">No placements</td></tr>
          )}
          {placements.map((p) => {
            const trainee = traineeMap[p.traineeId]
            const vacancy = p.vacancyId ? vacancyMap[p.vacancyId] : undefined
            return (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  {trainee ? (
                    <Link href={`/trainee/${trainee.id}`} className="font-bold text-slate-900 hover:text-blue-600">{trainee.name}</Link>
                  ) : (
                    <span className="font-bold text-slate-900">{p.traineeId}</span>
                  )}
                </td>
                <td className="px-5 py-3 text-xs text-slate-600">{vacancy?.title ?? trainee?.placedRole ?? '-'}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{trainee?.placedStartDate ?? p.submittedDate}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{trainee?.programmeId === 'ict' ? 'ICT SCTP' : trainee?.programmeId === 'ba' ? 'BA Cert' : trainee?.programmeId ?? '-'}</td>
                <td className="px-5 py-3 text-center font-bold">{p.matchScore}%</td>
                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-3">
                  <span className={cn('font-semibold text-xs', retentionColour(p.retentionMonths))}>
                    {p.retentionMonths ? `${p.retentionMonths} months` : '-'}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">{p.satisfactionRating ? `${p.satisfactionRating}/5` : '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

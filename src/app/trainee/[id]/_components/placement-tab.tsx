import { StatusBadge, AppRadarChart } from '@/components/shared'
import type { Trainee, Placement, MatchResult } from '@/types'

interface PlacementTabProps {
  trainee: Trainee
  placements: Placement[]
  matches: MatchResult[]
  employerNames: Record<string, string>
  vacancyTitles: Record<string, string>
}

export function PlacementTab({ trainee, placements, matches, employerNames, vacancyTitles }: PlacementTabProps) {
  const radarData = matches[0]?.skillsComparison.map((s) => ({
    skill: s.skill,
    candidate: s.candidateScore,
    requirement: s.requirementScore,
  })) ?? []

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Employment Status</h3>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Status</dt>
            <dd className="font-semibold text-slate-800 capitalize">{trainee.employmentType?.replace(/_/g, ' ') ?? 'Job-seeking'}</dd>
          </div>
          {trainee.placedEmployerId && (
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase">Employer</dt>
              <dd className="font-semibold text-slate-800">{employerNames[trainee.placedEmployerId] ?? trainee.placedEmployerId}</dd>
            </div>
          )}
          {trainee.placedRole && (
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase">Role</dt>
              <dd className="font-semibold text-slate-800">{trainee.placedRole}</dd>
            </div>
          )}
          {trainee.placedSalary && (
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase">Salary</dt>
              <dd className="font-semibold text-slate-800">${trainee.placedSalary.toLocaleString()}/month</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Placement Match History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-5 py-3">Employer</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3 text-center">Score</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placements.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">No placements yet</td></tr>
                )}
                {placements.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-slate-900">{employerNames[p.employerId] ?? p.employerId}</td>
                    <td className="px-5 py-3 text-slate-600">{vacancyTitles[p.vacancyId ?? ''] ?? '-'}</td>
                    <td className="px-5 py-3 text-center font-bold">{p.matchScore}%</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Competency Profile</h3>
          {radarData.length > 0 ? (
            <AppRadarChart
              data={radarData}
              radars={[
                { key: 'candidate', label: 'Candidate', colour: '#2563eb' },
                { key: 'requirement', label: 'Requirement', colour: '#94a3b8', fillOpacity: 0.05 },
              ]}
              angleKey="skill"
              height={280}
              showLegend
            />
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">No skills comparison data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

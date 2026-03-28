import { cn } from '@/lib/utils'
import type { EmployerPerformanceEntry } from '@/types'

interface EmployerHeatmapProps {
  data: EmployerPerformanceEntry[]
}

function heatColour(value: number, max: number): string {
  const ratio = max > 0 ? value / max : 0
  if (ratio >= 0.75) return 'bg-blue-600 text-white'
  if (ratio >= 0.5) return 'bg-blue-400 text-white'
  if (ratio >= 0.25) return 'bg-blue-200 text-blue-900'
  return 'bg-blue-50 text-blue-700'
}

function satisfactionColour(score: number): string {
  if (score >= 4.5) return 'text-green-600'
  if (score >= 4.0) return 'text-blue-600'
  return 'text-amber-600'
}

export function EmployerHeatmap({ data }: EmployerHeatmapProps) {
  const maxPlacements = Math.max(...data.map((d) => d.placements))
  const maxRetention = Math.max(...data.map((d) => d.avgRetentionMonths))

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Employer Engagement Heatmap</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Employer</th>
              <th className="px-5 py-3">Sector</th>
              <th className="px-5 py-3 text-center">Placements</th>
              <th className="px-5 py-3 text-center">Retention (mo)</th>
              <th className="px-5 py-3 text-center">Satisfaction</th>
              <th className="px-5 py-3 text-center">Avg Fill (days)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((emp) => (
              <tr key={emp.employerId} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900 text-xs">{emp.employerName}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{emp.sector}</td>
                <td className="px-5 py-3 text-center">
                  <span className={cn('inline-block w-8 py-0.5 rounded text-xs font-bold text-center', heatColour(emp.placements, maxPlacements))}>
                    {emp.placements}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">
                  <span className={cn('inline-block w-8 py-0.5 rounded text-xs font-bold text-center', heatColour(emp.avgRetentionMonths, maxRetention))}>
                    {emp.avgRetentionMonths}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">
                  <span className={cn('text-xs font-bold', satisfactionColour(emp.avgSatisfaction))}>
                    {emp.avgSatisfaction.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-3 text-center text-xs font-bold text-slate-700">{emp.avgTimeToFill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'

import { useMemo } from 'react'
import { AppBarChart, AppPieChart } from '@/components/shared'
import type { Cohort, ProgrammeMetrics, Trainee, Employer } from '@/types'

interface PerformanceTabProps {
  cohorts: Cohort[]
  metrics: ProgrammeMetrics | undefined
  trainees: Trainee[]
  employers: Employer[]
}

export function PerformanceTab({ cohorts, metrics, trainees, employers }: PerformanceTabProps) {
  const cohortData = cohorts.map((c) => ({
    name: c.name,
    enrolled: c.enrolledCount,
    completion: c.completionRate ?? 0,
    placement: c.placementRate ?? 0,
  }))

  const employmentTypeData = useMemo(() => {
    const counts: Record<string, number> = {}
    trainees.forEach((t) => {
      if (t.employmentType) {
        const label = t.employmentType.replace(/([A-Z])/g, ' $1').trim()
        counts[label] = (counts[label] || 0) + 1
      }
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [trainees])

  const sectorData = useMemo(() => {
    const counts: Record<string, number> = {}
    trainees.forEach((t) => {
      if (t.placedEmployerId) {
        const emp = employers.find((e) => e.id === t.placedEmployerId)
        const sector = emp?.sector ?? 'Unknown'
        counts[sector] = (counts[sector] || 0) + 1
      }
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [trainees, employers])

  const topEmployers = useMemo(() => {
    const counts: Record<string, number> = {}
    trainees.forEach((t) => {
      if (t.placedEmployerId) {
        counts[t.placedEmployerId] = (counts[t.placedEmployerId] || 0) + 1
      }
    })
    return Object.entries(counts)
      .map(([empId, count]) => {
        const emp = employers.find((e) => e.id === empId)
        return { name: emp?.name ?? empId, sector: emp?.sector ?? '-', count }
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [trainees, employers])

  return (
    <div className="space-y-6">
      {/* Cohort Comparison */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cohort Comparison</h3>
        <AppBarChart
          data={cohortData}
          bars={[
            { key: 'enrolled', label: 'Enrolled', colour: '#2563eb' },
            { key: 'completion', label: 'Completion %', colour: '#0d9488' },
            { key: 'placement', label: 'Placement %', colour: '#6366f1' },
          ]}
          xKey="name"
          height={250}
          showLegend
        />
      </div>

      {/* Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Completion', value: `${metrics.completionRate}%` },
            { label: 'Placement', value: `${metrics.placementRate}%` },
            { label: 'Avg Time to Place', value: `${metrics.avgTimeToPlacement}d` },
            { label: 'Conversion', value: `${metrics.enrolmentConversion}%` },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Outcome Breakdown */}
      {(employmentTypeData.length > 0 || sectorData.length > 0) && (
        <div className="grid grid-cols-2 gap-6">
          {employmentTypeData.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Employment Type</h3>
              <AppPieChart data={employmentTypeData} height={220} />
            </div>
          )}
          {sectorData.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sector Distribution</h3>
              <AppPieChart data={sectorData} height={220} />
            </div>
          )}
        </div>
      )}

      {/* Top Employers */}
      {topEmployers.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Top Placement Employers</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                <th className="text-left py-2">#</th>
                <th className="text-left py-2">Employer</th>
                <th className="text-left py-2">Sector</th>
                <th className="text-right py-2">Placements</th>
              </tr>
            </thead>
            <tbody>
              {topEmployers.map((emp, i) => (
                <tr key={emp.name} className="border-b border-slate-50">
                  <td className="py-2 text-slate-400 font-bold">{i + 1}</td>
                  <td className="py-2 font-medium text-slate-900">{emp.name}</td>
                  <td className="py-2 text-slate-500">{emp.sector}</td>
                  <td className="py-2 text-right font-black text-slate-900">{emp.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

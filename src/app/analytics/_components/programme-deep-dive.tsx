'use client'

import { useState } from 'react'
import { AppBarChart, AppPieChart, FilterBar, ExportButton, useActionToast, ActionToast } from '@/components/shared'
import type { Programme, Cohort, ProgrammeMetrics, EmployerPerformanceEntry, SectorEntry } from '@/types'
import { EmployerHeatmap } from './employer-heatmap'

interface ProgrammeDeepDiveProps {
  programmes: Programme[]
  cohorts: Cohort[]
  programmeMetrics: ProgrammeMetrics[]
  sectorBreakdown: SectorEntry[]
  employerPerformance: EmployerPerformanceEntry[]
}

export function ProgrammeDeepDive({ programmes, cohorts, programmeMetrics, sectorBreakdown, employerPerformance }: ProgrammeDeepDiveProps) {
  const [selectedProg, setSelectedProg] = useState(programmes[0]?.id ?? '')
  const [toast, showToast] = useActionToast()

  const prog = programmes.find((p) => p.id === selectedProg)
  const metrics = programmeMetrics.find((m) => m.programmeId === selectedProg)
  const progCohorts = cohorts.filter((c) => c.programmeId === selectedProg)
  const programmeOptions = programmes.map((p) => ({ label: p.shortName, value: p.id }))

  const cohortData = progCohorts.map((c) => ({
    name: c.name,
    enrolled: c.enrolledCount,
    completion: c.completionRate ?? 0,
    placement: c.placementRate ?? 0,
  }))

  const sectorData = sectorBreakdown.map((s) => ({ name: s.sector, value: s.percentage }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FilterBar
          filters={[{ id: 'programme', label: 'Select Programme', options: programmeOptions, value: selectedProg, onChange: setSelectedProg }]}
        />
        <ExportButton label="Export Deep Dive" showToast={showToast} />
      </div>

      {prog && metrics && (
        <>
          {/* Programme Summary */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">{prog.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{prog.description}</p>
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase">Duration</dt>
                <dd className="font-black text-slate-900 text-lg">{prog.durationWeeks} weeks</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase">Completion Rate</dt>
                <dd className="font-black text-slate-900 text-lg">{metrics.completionRate}%</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase">Placement Rate</dt>
                <dd className="font-black text-slate-900 text-lg">{metrics.placementRate}%</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase">Avg Time to Place</dt>
                <dd className="font-black text-slate-900 text-lg">{metrics.avgTimeToPlacement} days</dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Cohort Performance */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cohort Performance</h3>
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

            {/* Sector Breakdown */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Placement by Sector</h3>
              <AppPieChart data={sectorData} innerRadius={60} height={250} />
            </div>
          </div>

          {/* Cohort Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-5 py-3">Cohort</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-center">Enrolled</th><th className="px-5 py-3 text-center">Capacity</th><th className="px-5 py-3 text-center">Completion</th><th className="px-5 py-3 text-center">Placement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progCohorts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-slate-900">{c.name}</td>
                    <td className="px-5 py-3 text-xs capitalize text-slate-600">{c.status}</td>
                    <td className="px-5 py-3 text-center font-bold">{c.enrolledCount}</td>
                    <td className="px-5 py-3 text-center text-slate-500">{c.capacity}</td>
                    <td className="px-5 py-3 text-center font-bold">{c.completionRate ? `${c.completionRate}%` : '-'}</td>
                    <td className="px-5 py-3 text-center font-bold">{c.placementRate ? `${c.placementRate}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Employer Engagement Heatmap */}
          <EmployerHeatmap data={employerPerformance} />
        </>
      )}

      <ActionToast message={toast} />
    </div>
  )
}

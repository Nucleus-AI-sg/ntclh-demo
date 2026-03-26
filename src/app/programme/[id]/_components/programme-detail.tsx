'use client'

import { useState } from 'react'
import { BookOpen, Settings, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, AppBarChart, AppFunnelChart } from '@/components/shared'
import type { Programme, Cohort, ProgrammeMetrics } from '@/types'

interface ProgrammeDetailProps {
  programme: Programme
  cohorts: Cohort[]
  metrics: ProgrammeMetrics | undefined
}

const tabs = [
  { id: 'cohorts', label: 'Cohort Management' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'pipeline', label: 'Enrolment Pipeline' },
  { id: 'performance', label: 'Performance' },
  { id: 'settings', label: 'Settings' },
] as const

export function ProgrammeDetail({ programme, cohorts, metrics }: ProgrammeDetailProps) {
  const [expandedCohort, setExpandedCohort] = useState<string | null>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const cohortData = cohorts.map((c) => ({ name: c.name, enrolled: c.enrolledCount, completion: c.completionRate ?? 0, placement: c.placementRate ?? 0 }))
  const funnelData = [
    { name: 'Applications', value: 45 }, { name: 'Assessed', value: 38 },
    { name: 'Enrolled', value: 30 }, { name: 'Completed', value: 25 }, { name: 'Placed', value: 18 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">{programme.name}</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">{programme.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span>{programme.durationWeeks} weeks</span><span>-</span>
            <span>{programme.trainingProvider}</span><span>-</span>
            <span>SSG: {programme.ssgCourseCode}</span><span>-</span>
            <span>WSG: {programme.wsgClassification}</span>
          </div>
        </div>
        <button onClick={() => { setToast('New cohort form opened'); setTimeout(() => setToast(null), 2000) }} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" /> New Cohort
        </button>
      </div>

      <Tabs defaultValue="cohorts" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* Cohort Management */}
        <TabsContent value="cohorts" className="mt-6 space-y-3">
          {cohorts.map((cohort) => (
            <div key={cohort.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50" onClick={() => setExpandedCohort(expandedCohort === cohort.id ? null : cohort.id)}>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-slate-900">{cohort.name}</p>
                  <StatusBadge status={cohort.status} />
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{cohort.enrolledCount}/{cohort.capacity} enrolled</span>
                  <span>{cohort.startDate} - {cohort.endDate}</span>
                  {expandedCohort === cohort.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              {expandedCohort === cohort.id && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                  <dl className="grid grid-cols-4 gap-4 text-sm">
                    <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Completion Rate</dt><dd className="font-black text-slate-900">{cohort.completionRate ?? 'N/A'}%</dd></div>
                    <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Placement Rate</dt><dd className="font-black text-slate-900">{cohort.placementRate ?? 'N/A'}%</dd></div>
                    <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Capacity</dt><dd className="font-black text-slate-900">{cohort.capacity}</dd></div>
                    <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Enrolled</dt><dd className="font-black text-slate-900">{cohort.enrolledCount}</dd></div>
                  </dl>
                </div>
              )}
            </div>
          ))}
        </TabsContent>

        {/* Curriculum */}
        <TabsContent value="curriculum" className="mt-6 space-y-3">
          {programme.modules.map((mod) => (
            <div key={mod.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50" onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black">{mod.order}</span>
                  <p className="text-sm font-bold text-slate-900">{mod.name}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{mod.durationWeeks} weeks</span>
                  <span>{mod.instructor}</span>
                  {expandedModule === mod.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              {expandedModule === mod.id && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <p><span className="font-bold text-slate-700">Assessment:</span> {mod.assessmentType}</p>
                  <p className="mt-1"><span className="font-bold text-slate-700">Instructor:</span> {mod.instructor}</p>
                </div>
              )}
            </div>
          ))}
        </TabsContent>

        {/* Enrolment Pipeline */}
        <TabsContent value="pipeline" className="mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Enrolment Funnel</h3>
            <AppFunnelChart data={funnelData} height={250} />
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cohort Comparison</h3>
            <AppBarChart data={cohortData} bars={[{ key: 'enrolled', label: 'Enrolled', colour: '#2563eb' }, { key: 'completion', label: 'Completion %', colour: '#0d9488' }, { key: 'placement', label: 'Placement %', colour: '#6366f1' }]} xKey="name" height={250} showLegend />
          </div>
          {metrics && (
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center"><p className="text-[10px] font-bold text-slate-400 uppercase">Completion</p><p className="text-2xl font-black text-slate-900 mt-1">{metrics.completionRate}%</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center"><p className="text-[10px] font-bold text-slate-400 uppercase">Placement</p><p className="text-2xl font-black text-slate-900 mt-1">{metrics.placementRate}%</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center"><p className="text-[10px] font-bold text-slate-400 uppercase">Avg Time to Place</p><p className="text-2xl font-black text-slate-900 mt-1">{metrics.avgTimeToPlacement}d</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center"><p className="text-[10px] font-bold text-slate-400 uppercase">Conversion</p><p className="text-2xl font-black text-slate-900 mt-1">{metrics.enrolmentConversion}%</p></div>
            </div>
          )}
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Programme Configuration</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Programme Name</dt><dd className="font-semibold text-slate-800">{programme.name}</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Duration</dt><dd className="font-semibold text-slate-800">{programme.durationWeeks} weeks</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Training Provider</dt><dd className="font-semibold text-slate-800">{programme.trainingProvider}</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Cohort Capacity</dt><dd className="font-semibold text-slate-800">{programme.cohortCapacity}</dd></div>
            </dl>
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><Settings className="h-3 w-3" /> Government Scheme Mapping</h4>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-[10px] font-bold text-slate-400 uppercase">SSG Course Code</dt><dd className="font-mono font-semibold text-slate-800">{programme.ssgCourseCode}</dd></div>
                <div><dt className="text-[10px] font-bold text-slate-400 uppercase">WSG Classification</dt><dd className="font-semibold text-slate-800">{programme.wsgClassification}</dd></div>
              </dl>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">{toast}</div>}
    </div>
  )
}

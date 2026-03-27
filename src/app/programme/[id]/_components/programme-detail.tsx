'use client'

import { useState } from 'react'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExportButton, useActionToast, ActionToast } from '@/components/shared'
import type { Programme, Cohort, ProgrammeMetrics, Trainee, Employer } from '@/types'
import { CohortManagementTab } from './cohort-management-tab'
import { CurriculumTab } from './curriculum-tab'
import { EnrolmentPipelineTab } from './enrolment-pipeline-tab'
import { PerformanceTab } from './performance-tab'
import { SettingsTab } from './settings-tab'
import { CohortFormModal } from './cohort-form-modal'

interface ProgrammeDetailProps {
  programme: Programme
  cohorts: Cohort[]
  metrics: ProgrammeMetrics | undefined
  trainees: Trainee[]
  employers: Employer[]
}

const tabs = [
  { id: 'cohorts', label: 'Cohort Management' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'pipeline', label: 'Enrolment Pipeline' },
  { id: 'performance', label: 'Performance' },
  { id: 'settings', label: 'Settings' },
] as const

export function ProgrammeDetail({ programme, cohorts, metrics, trainees, employers }: ProgrammeDetailProps) {
  const [showCohortModal, setShowCohortModal] = useState(false)
  const [editCohort, setEditCohort] = useState<Cohort | null>(null)
  const [toast, showToast] = useActionToast()

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
        <div className="flex items-center gap-2">
          <ExportButton label="Export Report" showToast={showToast} />
          <Button size="sm" className="text-xs font-bold" onClick={() => setShowCohortModal(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" /> New Cohort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cohorts" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="cohorts" className="mt-6">
          <CohortManagementTab cohorts={cohorts} trainees={trainees} onEditCohort={(c) => { setEditCohort(c); setShowCohortModal(true) }} />
        </TabsContent>
        <TabsContent value="curriculum" className="mt-6">
          <CurriculumTab modules={programme.modules} />
        </TabsContent>
        <TabsContent value="pipeline" className="mt-6">
          <EnrolmentPipelineTab programmeId={programme.id} trainees={trainees} />
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <PerformanceTab cohorts={cohorts} metrics={metrics} trainees={trainees} employers={employers} />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsTab programme={programme} />
        </TabsContent>
      </Tabs>

      <CohortFormModal
        open={showCohortModal}
        onClose={() => { setShowCohortModal(false); setEditCohort(null) }}
        onSave={(name: string) => showToast(`Cohort "${name}" ${editCohort ? 'updated' : 'created'}`)}
        programme={programme}
        cohort={editCohort}
      />

      <ActionToast message={toast} />
    </div>
  )
}

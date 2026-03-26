'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Trainee, Programme, Communication, Vacancy } from '@/types'
import type { Document } from '@/types'
import { LifecycleStage } from '@/types'
import { StatusOverview } from './status-overview'
import { CaseTable } from './case-table'
import { TrackingSlideOver } from './tracking-slide-over'
import { TraineeView } from './trainee-view'

interface TrackingPageProps {
  trainees: Trainee[]
  programmes: Programme[]
  documents: Document[]
  communications: Communication[]
  vacancies: Vacancy[]
}

export function TrackingPage({ trainees, programmes, documents, communications, vacancies }: TrackingPageProps) {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const programme = selectedTrainee ? programmes.find((p) => p.id === selectedTrainee.programmeId) : undefined
  const traineeComms = selectedTrainee ? communications.filter((c) => c.recipientId === selectedTrainee.id) : []
  const traineeDocs = selectedTrainee ? documents.filter((d) => d.traineeId === selectedTrainee.id) : []

  const handleApprove = useCallback(() => {
    if (!selectedTrainee) return
    setToast(`${selectedTrainee.name} verification approved`)
    setSelectedTrainee((prev) => prev ? { ...prev, lifecycleStage: LifecycleStage.Verified } : null)
    setTimeout(() => setToast(null), 3000)
  }, [selectedTrainee])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="case" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          <TabsTrigger value="case" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">
            Case Management
          </TabsTrigger>
          <TabsTrigger value="trainee-view" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">
            Trainee View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="case" className="mt-6 space-y-6">
          <StatusOverview trainees={trainees} documents={documents} activeFilter={statusFilter} onFilter={setStatusFilter} />
          <CaseTable
            trainees={trainees}
            programmes={programmes}
            documents={documents}
            statusFilter={statusFilter}
            onSelectTrainee={setSelectedTrainee}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        </TabsContent>

        <TabsContent value="trainee-view" className="mt-6">
          <TraineeView
            trainee={selectedTrainee}
            programme={programme}
            documents={traineeDocs}
            vacancies={vacancies}
          />
        </TabsContent>
      </Tabs>

      <TrackingSlideOver
        trainee={selectedTrainee}
        programme={programme}
        communications={traineeComms}
        documents={traineeDocs}
        open={selectedTrainee !== null}
        onClose={() => setSelectedTrainee(null)}
        onApprove={handleApprove}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">
          {toast}
        </div>
      )}
    </div>
  )
}

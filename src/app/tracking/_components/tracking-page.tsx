'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ActionToast, useActionToast, ExportButton } from '@/components/shared'
import type { Trainee, Programme, Communication, Vacancy } from '@/types'
import type { Document } from '@/types'
import { LifecycleStage } from '@/types'
import { StatusOverview } from './status-overview'
import { CaseTable } from './case-table'
import { TrackingSlideOver } from './tracking-slide-over'
import { TraineeView } from './trainee-view'
import { BulkReminderModal } from './bulk-reminder-modal'
import { BulkStatusModal } from './bulk-status-modal'

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
  const [toast, showToast] = useActionToast()
  const [reminderOpen, setReminderOpen] = useState(false)
  const [statusModalOpen, setStatusModalOpen] = useState(false)

  const programme = selectedTrainee ? programmes.find((p) => p.id === selectedTrainee.programmeId) : undefined
  const traineeComms = selectedTrainee ? communications.filter((c) => c.recipientId === selectedTrainee.id) : []
  const traineeDocs = selectedTrainee ? documents.filter((d) => d.traineeId === selectedTrainee.id) : []

  const handleAction = useCallback((action: string, detail?: string) => {
    if (!selectedTrainee) return
    const labels: Record<string, string> = {
      approve: 'Verification approved',
      override: 'Override approved',
      resubmit: 'Resubmission requested',
      record: 'Manual outcome recorded',
      non_responsive: 'Marked as non-responsive',
      flag: 'Flagged for review',
    }
    const msg = `${selectedTrainee.name}: ${labels[action] ?? action}${detail ? ` - ${detail}` : ''}`
    showToast(msg)
    if (action === 'approve' || action === 'override') {
      setSelectedTrainee((prev) => prev ? { ...prev, lifecycleStage: LifecycleStage.Verified } : null)
    }
  }, [selectedTrainee, showToast])

  const handleBulkReminder = useCallback((data: { channel: string; template: string; body: string }) => {
    showToast(`Reminder sent via ${data.channel} to ${selectedIds.length} trainee${selectedIds.length !== 1 ? 's' : ''}`)
    setSelectedIds([])
  }, [selectedIds.length, showToast])

  const handleBulkStatus = useCallback((status: string) => {
    showToast(`Status updated to "${status.replace(/_/g, ' ')}" for ${selectedIds.length} trainee${selectedIds.length !== 1 ? 's' : ''}`)
    setSelectedIds([])
  }, [selectedIds.length, showToast])

  const tabTriggerClass = 'rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div />
        <ExportButton label="Export" formats={['CSV', 'Excel']} showToast={showToast} />
      </div>

      <Tabs defaultValue="case" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          <TabsTrigger value="case" className={tabTriggerClass}>Case Management</TabsTrigger>
          <TabsTrigger value="trainee-view" className={tabTriggerClass}>Trainee View</TabsTrigger>
        </TabsList>

        <TabsContent value="case" className="mt-4 space-y-4">
          <StatusOverview trainees={trainees} documents={documents} activeFilter={statusFilter} onFilter={setStatusFilter} />
          <CaseTable
            trainees={trainees}
            programmes={programmes}
            documents={documents}
            statusFilter={statusFilter}
            onSelectTrainee={setSelectedTrainee}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onBulkReminder={() => setReminderOpen(true)}
            onBulkStatus={() => setStatusModalOpen(true)}
          />
        </TabsContent>

        <TabsContent value="trainee-view" className="mt-4">
          <TraineeView trainee={selectedTrainee} programme={programme} documents={traineeDocs} vacancies={vacancies} />
        </TabsContent>
      </Tabs>

      <TrackingSlideOver
        trainee={selectedTrainee}
        programme={programme}
        communications={traineeComms}
        documents={traineeDocs}
        open={selectedTrainee !== null}
        onClose={() => setSelectedTrainee(null)}
        onAction={handleAction}
      />

      <BulkReminderModal
        open={reminderOpen}
        onClose={() => setReminderOpen(false)}
        selectedCount={selectedIds.length}
        onSend={handleBulkReminder}
      />

      <BulkStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        selectedCount={selectedIds.length}
        onConfirm={handleBulkStatus}
      />

      <ActionToast message={toast} />
    </div>
  )
}

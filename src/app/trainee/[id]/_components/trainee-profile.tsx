'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ActionToast, useActionToast, ComposeMessageModal, ConfirmationModal,
} from '@/components/shared'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { LifecycleStage } from '@/types'
import type {
  Trainee, Programme, Cohort, Assessment,
  ActivityEvent, ModuleProgress, Communication,
  AuditEntry, CoordinatorNote, Placement, MatchResult,
} from '@/types'
import type { Document } from '@/types'
import { ProfileHeader } from './profile-header'
import { OverviewTab } from './overview-tab'
import { EnrolmentTab } from './enrolment-tab'
import { TrainingTab } from './training-tab'
import { DocumentsTab } from './documents-tab'
import { PlacementTab } from './placement-tab'
import { CommsAuditTab } from './comms-audit-tab'

interface TraineeProfileProps {
  trainee: Trainee
  programme: Programme | undefined
  cohort: Cohort | undefined
  programmes: Programme[]
  assessment: Assessment | undefined
  events: ActivityEvent[]
  modules: ModuleProgress[]
  documents: Document[]
  communications: Communication[]
  placements: Placement[]
  matches: MatchResult[]
  auditEntries: AuditEntry[]
  notes: CoordinatorNote[]
  employerNames: Record<string, string>
  vacancyTitles: Record<string, string>
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'enrolment', label: 'Enrolment' },
  { id: 'training', label: 'Training' },
  { id: 'documents', label: 'Documents' },
  { id: 'placement', label: 'Placement' },
  { id: 'comms', label: 'Comms & Audit' },
] as const

const stageLabels: Record<string, string> = {
  [LifecycleStage.Applied]: 'Applied',
  [LifecycleStage.Enrolled]: 'Enrolled',
  [LifecycleStage.Training]: 'Training',
  [LifecycleStage.Completed]: 'Completed',
  [LifecycleStage.Placed]: 'Placed',
  [LifecycleStage.Verified]: 'Verified',
}

export function TraineeProfile(props: TraineeProfileProps) {
  const [toast, showToast] = useActionToast()
  const [composeOpen, setComposeOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [newStage, setNewStage] = useState(props.trainee.lifecycleStage)

  return (
    <div className="space-y-4">
      <ProfileHeader
        trainee={props.trainee}
        programme={props.programme}
        cohort={props.cohort}
        onSendMessage={() => setComposeOpen(true)}
        onUpdateStatus={() => { setNewStage(props.trainee.lifecycleStage); setStatusOpen(true) }}
        showToast={showToast}
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <OverviewTab trainee={props.trainee} programme={props.programme} assessment={props.assessment} events={props.events} modules={props.modules} placements={props.placements} />
        </TabsContent>
        <TabsContent value="enrolment" className="mt-4">
          <EnrolmentTab assessment={props.assessment} trainee={props.trainee} programmes={props.programmes} />
        </TabsContent>
        <TabsContent value="training" className="mt-4">
          <TrainingTab modules={props.modules} />
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <DocumentsTab documents={props.documents} showToast={showToast} />
        </TabsContent>
        <TabsContent value="placement" className="mt-4">
          <PlacementTab trainee={props.trainee} placements={props.placements} matches={props.matches} employerNames={props.employerNames} vacancyTitles={props.vacancyTitles} />
        </TabsContent>
        <TabsContent value="comms" className="mt-4">
          <CommsAuditTab communications={props.communications} auditEntries={props.auditEntries} notes={props.notes} />
        </TabsContent>
      </Tabs>

      {/* Compose Message Modal */}
      <ComposeMessageModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        recipient={props.trainee.name}
        onSend={() => showToast(`Message sent to ${props.trainee.name}`)}
      />

      {/* Update Status Modal */}
      <ConfirmationModal
        open={statusOpen}
        onCancel={() => setStatusOpen(false)}
        onConfirm={() => {
          setStatusOpen(false)
          showToast(`Status updated to "${stageLabels[newStage]}"`)
        }}
        title="Update Lifecycle Status"
        description={`Change ${props.trainee.name}'s lifecycle stage.`}
        confirmLabel="Update Status"
      >
        <Select value={newStage} onValueChange={(v) => setNewStage(v as LifecycleStage)}>
          <SelectTrigger className="w-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(stageLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ConfirmationModal>

      <ActionToast message={toast} />
    </div>
  )
}

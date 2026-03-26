'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

export function TraineeProfile(props: TraineeProfileProps) {
  return (
    <div className="space-y-6">
      <ProfileHeader trainee={props.trainee} programme={props.programme} cohort={props.cohort} />

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

        <TabsContent value="overview" className="mt-6">
          <OverviewTab trainee={props.trainee} programme={props.programme} assessment={props.assessment} events={props.events} />
        </TabsContent>
        <TabsContent value="enrolment" className="mt-6">
          <EnrolmentTab assessment={props.assessment} trainee={props.trainee} programmes={props.programmes} />
        </TabsContent>
        <TabsContent value="training" className="mt-6">
          <TrainingTab modules={props.modules} />
        </TabsContent>
        <TabsContent value="documents" className="mt-6">
          <DocumentsTab documents={props.documents} />
        </TabsContent>
        <TabsContent value="placement" className="mt-6">
          <PlacementTab trainee={props.trainee} placements={props.placements} matches={props.matches} employerNames={props.employerNames} vacancyTitles={props.vacancyTitles} />
        </TabsContent>
        <TabsContent value="comms" className="mt-6">
          <CommsAuditTab communications={props.communications} auditEntries={props.auditEntries} notes={props.notes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

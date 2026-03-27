'use client'

import { useState } from 'react'
import { Building2, Mail, MapPin, Plus, CalendarPlus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, ActionToast, useActionToast, ComposeMessageModal, ExportButton } from '@/components/shared'
import type { Employer, Vacancy, Placement, Communication, Trainee, AuditEntry } from '@/types'
import { OverviewTab } from './overview-tab'
import { PlacementsTab } from './placements-tab'
import { CommunicationsTab } from './communications-tab'
import { AuditTab } from './audit-tab'
import { VacanciesTab } from './vacancies-tab'
import { PreferencesTab } from './preferences-tab'

interface EmployerProfileProps {
  employer: Employer
  vacancies: Vacancy[]
  placements: Placement[]
  communications: Communication[]
  trainees: Trainee[]
  auditEntries: AuditEntry[]
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'vacancies', label: 'Vacancies' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'placements', label: 'Placements' },
  { id: 'communications', label: 'Communications' },
  { id: 'audit', label: 'Audit Trail' },
] as const

export function EmployerProfile({ employer, vacancies, placements, communications, trainees, auditEntries }: EmployerProfileProps) {
  const [toast, showToast, clearToast] = useActionToast()
  const [showMessageModal, setShowMessageModal] = useState(false)

  const primaryContact = employer.contacts.find((c) => c.isPrimary)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{employer.name}</h1>
              <StatusBadge status={employer.engagementLevel} />
              <StatusBadge status={employer.pipelineHealth} label={`Pipeline: ${employer.pipelineHealth}`} />
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
              <span>{employer.sector}</span><span>-</span>
              <span>{employer.size}</span><span>-</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{employer.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMessageModal(true)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"><Mail className="h-3.5 w-3.5" /> Send Message</button>
          <button onClick={() => showToast('Meeting scheduled')} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"><CalendarPlus className="h-3.5 w-3.5" /> Schedule Meeting</button>
          <ExportButton label="Export" formats={['PDF']} showToast={showToast} />
          <button onClick={() => showToast('Vacancy form opening...')} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"><Plus className="h-3.5 w-3.5" /> Add Vacancy</button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6"><OverviewTab employer={employer} /></TabsContent>
        <TabsContent value="vacancies" className="mt-6"><VacanciesTab vacancies={vacancies} /></TabsContent>
        <TabsContent value="preferences" className="mt-6"><PreferencesTab employer={employer} showToast={showToast} /></TabsContent>
        <TabsContent value="placements" className="mt-6"><PlacementsTab placements={placements} trainees={trainees} vacancies={vacancies} /></TabsContent>
        <TabsContent value="communications" className="mt-6"><CommunicationsTab communications={communications} onCompose={() => setShowMessageModal(true)} /></TabsContent>
        <TabsContent value="audit" className="mt-6"><AuditTab entries={auditEntries} /></TabsContent>
      </Tabs>

      <ComposeMessageModal open={showMessageModal} onClose={() => setShowMessageModal(false)} onSend={() => showToast('Message sent')} recipient={primaryContact?.name ?? employer.name} />
      <ActionToast message={toast} onDismiss={clearToast} />
    </div>
  )
}

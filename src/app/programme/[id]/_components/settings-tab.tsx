'use client'

import { Settings } from 'lucide-react'
import { EditableForm, useActionToast, ActionToast } from '@/components/shared'
import type { EditableField } from '@/components/shared'
import type { Programme } from '@/types'

interface SettingsTabProps {
  programme: Programme
}

export function SettingsTab({ programme }: SettingsTabProps) {
  const [toast, showToast] = useActionToast()

  const configFields: EditableField[] = [
    { label: 'Programme Name', value: programme.name, type: 'text' },
    { label: 'Description', value: programme.description, type: 'text' },
    { label: 'Duration (weeks)', value: programme.durationWeeks, type: 'number' },
    { label: 'Cohort Capacity', value: programme.cohortCapacity, type: 'number' },
    { label: 'Training Provider', value: programme.trainingProvider, type: 'text' },
  ]

  const schemeFields: EditableField[] = [
    { label: 'SSG Course Code', value: programme.ssgCourseCode, type: 'text' },
    { label: 'WSG Classification', value: programme.wsgClassification, type: 'text' },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
          Programme Configuration
        </h3>
        <EditableForm fields={configFields} onSave={() => showToast('Programme settings saved')} />
      </div>

      <div className="bg-white rounded-xl p-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Settings className="h-3.5 w-3.5" />
          Government Scheme Mapping
        </h4>
        <EditableForm fields={schemeFields} onSave={() => showToast('Scheme mapping saved')} />
      </div>

      <ActionToast message={toast} />
    </div>
  )
}

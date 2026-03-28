'use client'

import { StatusBadge } from '@/components/shared'
import { EditableForm } from '@/components/shared/editable-form'

interface CrmTabProps {
  showToast: (msg: string) => void
}

const syncConfigFields = [
  { label: 'Direction', value: 'Bidirectional', type: 'text' as const },
  { label: 'Frequency', value: 'Every 5 minutes', type: 'text' as const },
  { label: 'Entities Synced', value: 'Trainees, Employers, Programmes, Placements', type: 'text' as const },
  { label: 'Conflict Resolution', value: 'Nucleus AI is master for programme data, CRM is master for contact details', type: 'text' as const },
]

const syncLog = [
  { message: 'Synced 3 new trainee records from Salesforce', time: '5 min ago' },
  { message: 'Updated employer contact for TechCorp in Salesforce', time: '12 min ago' },
  { message: 'Sync conflict resolved: trainee phone number updated in both systems', time: '1 hr ago' },
  { message: 'Synced 1 new employer record from Salesforce', time: '2 hr ago' },
  { message: 'Updated programme status for 5 trainees in Salesforce', time: '3 hr ago' },
  { message: 'Synced placement record for Marcus Lee', time: '4 hr ago' },
]

const fieldMappings = [
  { nucleusField: 'Trainee Name', crmField: 'Contact.Name', direction: 'Bidirectional' },
  { nucleusField: 'Email', crmField: 'Contact.Email', direction: 'CRM \u2192 Nucleus' },
  { nucleusField: 'Programme Status', crmField: 'Contact.Programme_Status__c', direction: 'Nucleus \u2192 CRM' },
  { nucleusField: 'Placement Employer', crmField: 'Opportunity.Account', direction: 'Nucleus \u2192 CRM' },
  { nucleusField: 'Phone Number', crmField: 'Contact.Phone', direction: 'CRM \u2192 Nucleus' },
  { nucleusField: 'Placement Date', crmField: 'Opportunity.CloseDate', direction: 'Nucleus \u2192 CRM' },
]

export function CrmTab({ showToast }: CrmTabProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sync Configuration</h3>
        <EditableForm fields={syncConfigFields} onSave={() => showToast('Sync configuration saved')} />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Field Mapping</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Nucleus AI Field</th>
              <th className="px-5 py-3">CRM Field</th>
              <th className="px-5 py-3">Direction</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fieldMappings.map((fm) => (
              <tr key={fm.nucleusField} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900">{fm.nucleusField}</td>
                <td className="px-5 py-3 text-slate-600 font-mono text-xs">{fm.crmField}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{fm.direction}</td>
                <td className="px-5 py-3"><StatusBadge status="active" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Sync Activity</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {syncLog.map((entry, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between">
              <p className="text-sm text-slate-700">{entry.message}</p>
              <span className="text-[10px] text-slate-400 whitespace-nowrap ml-4">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

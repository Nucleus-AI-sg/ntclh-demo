'use client'

import { useState } from 'react'
import { Wifi, WifiOff, Database, Mail, MessageSquare, Download } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/shared'
import { channelConfigs } from '@/data'
import type { IntegrationConfig } from '@/types'
import { CrmTab } from './crm-tab'
import { PlatformTab } from './platform-tab'

interface SettingsPageProps {
  integrations: IntegrationConfig[]
  users: { name: string; role: string; status: string; lastActive: string }[]
}

const tabs = [
  { id: 'crm', label: 'CRM Integration' },
  { id: 'import', label: 'Data Import' },
  { id: 'government', label: 'Government Portals' },
  { id: 'channels', label: 'Channels' },
  { id: 'platform', label: 'Platform' },
] as const

const importHistory = [
  { date: '2026-02-15', file: 'master_trainee_list_2025.xlsx', rows: 847, status: 'success', importedBy: 'Sarah Tan' },
  { date: '2026-02-15', file: 'employer_database.xlsx', rows: 52, status: 'success', importedBy: 'Rachel Wong' },
  { date: '2026-02-20', file: 'placement_history_2024.csv', rows: 234, status: 'partial', importedBy: 'Sarah Tan' },
]

const govPortals = [
  { name: 'SSG Training Grant Portal', lastSync: '2026-03-01', reports: 12, format: 'SSG-2026-v3', nextDue: '1 Apr 2026' },
  { name: 'WSG Placement Reporting', lastSync: '2026-03-01', reports: 8, format: 'WSG-Monthly-v2', nextDue: '1 Apr 2026' },
  { name: 'IMDA Programme Dashboard', lastSync: '2026-03-01', reports: 4, format: 'IMDA-Quarterly-v1', nextDue: '1 Apr 2026' },
]

const email = channelConfigs.email
const sms = channelConfigs.sms
const whatsapp = channelConfigs.whatsapp

const channels = [
  { name: 'Email (SMTP)', icon: 'mail' as const, detail: `${email.senderAddress} - ${email.usedToday}/${email.dailySendLimit} daily - ${email.bounceRate}% bounce rate` },
  { name: 'SMS (Twilio)', icon: 'sms' as const, detail: `Sender: ${sms.senderId} - ${sms.used}/${sms.monthlyAllocation} monthly - ${sms.deliveryRate}% delivery` },
  { name: 'WhatsApp Business', icon: 'sms' as const, detail: `${whatsapp.businessAccount} - ${whatsapp.used}/${whatsapp.monthlyAllocation} monthly - Templates: ${whatsapp.templateApprovalStatus}` },
]

export function SettingsPage({ integrations, users }: SettingsPageProps) {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Integration Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {integrations.map((intg) => (
            <div key={intg.id} className={`p-3 rounded-lg border ${intg.status === 'connected' ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
              <div className="flex items-center gap-2 mb-1">
                {intg.status === 'connected' ? <Wifi className="h-3.5 w-3.5 text-green-500" /> : <WifiOff className="h-3.5 w-3.5 text-slate-400" />}
                <span className="text-xs font-bold text-slate-900">{intg.name}</span>
              </div>
              <StatusBadge status={intg.status} label={intg.status === 'connected' ? 'Connected' : 'Planned'} />
              {intg.lastSync && <p className="text-[9px] text-slate-400 mt-1">Last sync: {intg.lastSync}</p>}
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="crm" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="crm" className="mt-6"><CrmTab /></TabsContent>

        <TabsContent value="import" className="mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-600" /> Excel Import Tool
            </h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <p className="text-sm text-slate-500 mb-4">Drag and drop an Excel file here, or click to browse</p>
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Choose File</button>
            </div>
            <div className="flex gap-2 mt-4">
              {['Trainee', 'Employer', 'Placement'].map((t) => (
                <button key={t} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
                  <Download className="h-3 w-3" /> {t} Template
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Import History</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-5 py-3">Date</th><th className="px-5 py-3">File</th>
                  <th className="px-5 py-3 text-center">Records</th><th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Imported By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {importHistory.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-slate-500">{h.date}</td>
                    <td className="px-5 py-3 font-bold text-slate-900">{h.file}</td>
                    <td className="px-5 py-3 text-center font-bold">{h.rows}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={h.status === 'success' ? 'verified' : 'pending'} label={h.status === 'success' ? 'Completed' : 'Completed (12 warnings)'} />
                    </td>
                    <td className="px-5 py-3 text-slate-600">{h.importedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="government" className="mt-6 space-y-3">
          {govPortals.map((p) => (
            <div key={p.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <p className="text-[10px] text-slate-500">Last sync: {p.lastSync} - {p.reports} reports submitted</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="connected" />
                  <button onClick={() => showToast(`${p.name} synced`)} className="text-[10px] font-bold text-blue-600 hover:underline">Sync Now</button>
                </div>
              </div>
              <div className="flex gap-4 text-[10px] text-slate-400">
                <span>Format: {p.format}</span><span>Next due: {p.nextDue}</span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="channels" className="mt-6 space-y-3">
          {channels.map((ch) => (
            <div key={ch.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                {ch.icon === 'mail' ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                <div>
                  <p className="text-sm font-bold text-slate-900">{ch.name}</p>
                  <p className="text-[10px] text-slate-500">{ch.detail}</p>
                </div>
              </div>
              <StatusBadge status="active" />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="platform" className="mt-6"><PlatformTab users={users} /></TabsContent>
      </Tabs>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">{toast}</div>}
    </div>
  )
}

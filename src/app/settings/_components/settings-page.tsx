'use client'

import { useState } from 'react'
import { CheckCircle, Clock, Wifi, WifiOff, Database, Mail, MessageSquare, Shield, Users, Download } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/shared'
import type { IntegrationConfig } from '@/types'

interface SettingsPageProps {
  integrations: IntegrationConfig[]
  users: { name: string; role: string; status: string; lastActive: string }[]
}

const tabs = [
  { id: 'integrations', label: 'Integrations' },
  { id: 'import', label: 'Data Import' },
  { id: 'government', label: 'Government Portals' },
  { id: 'channels', label: 'Channels' },
  { id: 'platform', label: 'Platform' },
] as const

const importHistory = [
  { date: '2026-03-15', file: 'trainee_records_mar.xlsx', rows: 25, status: 'success' },
  { date: '2026-02-28', file: 'employer_contacts_feb.xlsx', rows: 12, status: 'success' },
  { date: '2026-02-01', file: 'legacy_placements.xlsx', rows: 156, status: 'partial' },
]

const govPortals = [
  { name: 'SSG Training Grant Portal', status: 'connected', lastSync: '2026-03-25', reports: 12 },
  { name: 'WSG Placement Reporting', status: 'connected', lastSync: '2026-03-20', reports: 8 },
  { name: 'IMDA Programme Dashboard', status: 'connected', lastSync: '2026-03-01', reports: 4 },
]

export function SettingsPage({ integrations, users }: SettingsPageProps) {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const connected = integrations.filter((i) => i.status === 'connected')
  const planned = integrations.filter((i) => i.status === 'planned')

  return (
    <div className="space-y-6">
      {/* Integration Health Dashboard */}
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

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="integrations" className="mt-6 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {connected.map((intg) => (
              <div key={intg.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm font-bold text-slate-900">{intg.name}</span></div>
                  <button onClick={() => showToast(`${intg.name} connection test: OK`)} className="text-[10px] font-bold text-blue-600 hover:underline">Test Connection</button>
                </div>
                <p className="text-xs text-slate-500">{intg.purpose}</p>
                {intg.recordsSynced && <p className="text-[10px] text-slate-400 mt-1">{intg.recordsSynced} records synced</p>}
              </div>
            ))}
          </div>
          {planned.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">Planned Integrations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {planned.map((intg) => (
                  <div key={intg.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 opacity-70">
                    <div className="flex items-center gap-2 mb-2"><Clock className="h-4 w-4 text-slate-400" /><span className="text-sm font-bold text-slate-700">{intg.name}</span><StatusBadge status="planned" /></div>
                    <p className="text-xs text-slate-500">{intg.purpose}</p>
                    {intg.plannedDate && <p className="text-[10px] text-slate-400 mt-1">Target: {intg.plannedDate}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="import" className="mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Database className="h-4 w-4 text-blue-600" /> Excel Import Tool</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <p className="text-sm text-slate-500 mb-4">Drag and drop an Excel file here, or click to browse</p>
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Choose File</button>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"><Download className="h-3 w-3" /> Trainee Template</button>
              <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"><Download className="h-3 w-3" /> Employer Template</button>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100"><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Import History</h3></div>
            <table className="w-full text-left text-sm"><thead><tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest"><th className="px-5 py-3">Date</th><th className="px-5 py-3">File</th><th className="px-5 py-3 text-center">Rows</th><th className="px-5 py-3">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{importHistory.map((h, i) => (<tr key={i} className="hover:bg-slate-50"><td className="px-5 py-3 text-slate-500">{h.date}</td><td className="px-5 py-3 font-bold text-slate-900">{h.file}</td><td className="px-5 py-3 text-center font-bold">{h.rows}</td><td className="px-5 py-3"><StatusBadge status={h.status === 'success' ? 'verified' : 'pending'} label={h.status} /></td></tr>))}</tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="government" className="mt-6 space-y-3">
          {govPortals.map((p) => (
            <div key={p.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div><p className="text-sm font-bold text-slate-900">{p.name}</p><p className="text-[10px] text-slate-500">Last sync: {p.lastSync} - {p.reports} reports submitted</p></div>
              <div className="flex items-center gap-2"><StatusBadge status="connected" /><button onClick={() => showToast(`${p.name} synced`)} className="text-[10px] font-bold text-blue-600 hover:underline">Sync Now</button></div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="channels" className="mt-6 space-y-3">
          {[
            { name: 'Email (SendGrid)', icon: <Mail className="h-4 w-4" />, status: 'active', usage: '1,234 sent this month' },
            { name: 'SMS (Twilio)', icon: <MessageSquare className="h-4 w-4" />, status: 'active', usage: '456 sent this month' },
            { name: 'WhatsApp Business', icon: <MessageSquare className="h-4 w-4" />, status: 'active', usage: '234 sent this month' },
          ].map((ch) => (
            <div key={ch.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">{ch.icon}<div><p className="text-sm font-bold text-slate-900">{ch.name}</p><p className="text-[10px] text-slate-500">{ch.usage}</p></div></div>
              <StatusBadge status="active" />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="platform" className="mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-blue-600" /> Data Retention</h3>
            <dl className="grid grid-cols-3 gap-4 text-sm">
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Trainee Records</dt><dd className="font-black text-slate-900">7 years</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Documents</dt><dd className="font-black text-slate-900">5 years</dd></div>
              <div><dt className="text-[10px] font-bold text-slate-400 uppercase">Audit Logs</dt><dd className="font-black text-slate-900">10 years</dd></div>
            </dl>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100"><h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Users className="h-4 w-4 text-blue-600" /> System Users</h3></div>
            <table className="w-full text-left text-sm"><thead><tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest"><th className="px-5 py-3">Name</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Last Active</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{users.map((u) => (<tr key={u.name} className="hover:bg-slate-50"><td className="px-5 py-3 font-bold text-slate-900">{u.name}</td><td className="px-5 py-3 text-slate-600">{u.role}</td><td className="px-5 py-3"><StatusBadge status="active" label={u.status} /></td><td className="px-5 py-3 text-slate-500">{u.lastActive}</td></tr>))}</tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">{toast}</div>}
    </div>
  )
}

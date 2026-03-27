'use client'

import { useState, useMemo } from 'react'
import { Mail, MessageSquare, Phone, Smartphone, Send, Play, Pause, Eye } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard, StatusBadge, FilterBar, AppLineChart, AppHeatmapChart } from '@/components/shared'
import type { Communication, OutreachSequence } from '@/types'

interface CommunicationsPageProps {
  communications: Communication[]
  sequences: OutreachSequence[]
}

const channelIcon: Record<string, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  sms: <MessageSquare className="h-3.5 w-3.5" />,
  whatsapp: <Smartphone className="h-3.5 w-3.5" />,
  phone: <Phone className="h-3.5 w-3.5" />,
}

const tabs = [
  { id: 'activity', label: 'Activity Feed' },
  { id: 'sequences', label: 'Automated Sequences' },
  { id: 'templates', label: 'Templates' },
  { id: 'analytics', label: 'Analytics' },
] as const

const responseData = [
  { month: 'Oct', email: 32, sms: 44, whatsapp: 58 },
  { month: 'Nov', email: 34, sms: 45, whatsapp: 60 },
  { month: 'Dec', email: 30, sms: 42, whatsapp: 55 },
  { month: 'Jan', email: 36, sms: 48, whatsapp: 64 },
  { month: 'Feb', email: 38, sms: 47, whatsapp: 62 },
  { month: 'Mar', email: 35, sms: 46, whatsapp: 65 },
]

const heatmapData = [
  { x: 'Mon', y: '9am', value: 12 }, { x: 'Tue', y: '9am', value: 15 }, { x: 'Wed', y: '9am', value: 18 },
  { x: 'Thu', y: '9am', value: 14 }, { x: 'Fri', y: '9am', value: 10 },
  { x: 'Mon', y: '12pm', value: 8 }, { x: 'Tue', y: '12pm', value: 10 }, { x: 'Wed', y: '12pm', value: 12 },
  { x: 'Thu', y: '12pm', value: 9 }, { x: 'Fri', y: '12pm', value: 7 },
  { x: 'Mon', y: '3pm', value: 14 }, { x: 'Tue', y: '3pm', value: 16 }, { x: 'Wed', y: '3pm', value: 20 },
  { x: 'Thu', y: '3pm', value: 15 }, { x: 'Fri', y: '3pm', value: 11 },
]

const templates = [
  { id: 't1', name: 'Welcome Email', category: 'Onboarding', channel: 'email' },
  { id: 't2', name: 'Document Reminder', category: 'Verification', channel: 'sms' },
  { id: 't3', name: 'Interview Scheduled', category: 'Placement', channel: 'email' },
  { id: 't4', name: 'Final Reminder', category: 'Verification', channel: 'whatsapp' },
  { id: 't5', name: 'Placement Confirmation', category: 'Placement', channel: 'email' },
]

function responseRate(comms: Communication[], channel: string): string {
  const byChannel = comms.filter((c) => c.channel === channel)
  if (byChannel.length === 0) return '0%'
  const responded = byChannel.filter((c) => c.status === 'responded').length
  return `${Math.round((responded / byChannel.length) * 100)}%`
}

export function CommunicationsPage({ communications, sequences }: CommunicationsPageProps) {
  const [channelFilter, setChannelFilter] = useState('__all__')
  const [preview, setPreview] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (channelFilter === '__all__') return communications
    return communications.filter((c) => c.channel === channelFilter)
  }, [communications, channelFilter])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Email" value={responseRate(communications, 'email')} icon={Mail} iconColour="blue" subtitle="Response rate" />
        <StatCard label="SMS" value={responseRate(communications, 'sms')} icon={MessageSquare} iconColour="teal" subtitle="Response rate" />
        <StatCard label="WhatsApp" value={responseRate(communications, 'whatsapp')} icon={Smartphone} iconColour="green" subtitle="Response rate" />
        <StatCard label="Total Sent (30d)" value={communications.length} icon={Send} iconColour="indigo" />
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="activity" className="mt-6 space-y-4">
          <FilterBar filters={[{ id: 'channel', label: 'All Channels', options: [{ label: 'Email', value: 'email' }, { label: 'SMS', value: 'sms' }, { label: 'WhatsApp', value: 'whatsapp' }], value: channelFilter, onChange: setChannelFilter }]} />
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
            {filtered.slice(0, 15).map((comm) => (
              <div key={comm.id} className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">{channelIcon[comm.channel]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900 truncate">{comm.subject}</p>
                    <StatusBadge status={comm.status} />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{comm.recipientName} - {comm.preview}</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">{comm.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sequences" className="mt-6 space-y-3">
          {sequences.map((seq) => (
            <div key={seq.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{seq.name}</p>
                  <p className="text-[10px] text-slate-500">{seq.activeCount} active - {seq.completionRate}% completion</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={seq.isActive ? 'active' : 'pending'} label={seq.isActive ? 'Active' : 'Paused'} />
                  <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50">{seq.isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {seq.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <div className="w-6 h-0.5 bg-slate-200" />}
                    <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-600">
                      Day {step.day}: {step.channel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="mt-6 space-y-3">
          {templates.map((t) => (
            <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">{channelIcon[t.channel]}</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-[10px] text-slate-500">{t.category} - {t.channel}</p>
                </div>
              </div>
              <button onClick={() => setPreview(preview === t.id ? null : t.id)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"><Eye className="h-3 w-3" /> Preview</button>
            </div>
          ))}
          {preview && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="text-xs text-slate-500 mb-2">Template Preview (with sample data)</p>
              <div className="bg-white rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                <p>Dear <span className="font-bold text-blue-600">{'{{trainee_name}}'}</span>,</p>
                <p className="mt-2">This is a reminder regarding your <span className="font-bold text-blue-600">{'{{programme_name}}'}</span> documentation...</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Response Rate Trends</h3>
            <AppLineChart data={responseData} lines={[{ key: 'email', label: 'Email', colour: '#2563eb' }, { key: 'sms', label: 'SMS', colour: '#0d9488' }, { key: 'whatsapp', label: 'WhatsApp', colour: '#22c55e' }]} xKey="month" height={250} showLegend />
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Best Response Times</h3>
            <AppHeatmapChart data={heatmapData} xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']} yLabels={['9am', '12pm', '3pm']} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

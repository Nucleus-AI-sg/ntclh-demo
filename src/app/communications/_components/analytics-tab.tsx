'use client'

import { AppLineChart, AppBarChart, AppHeatmapChart, AppFunnelChart } from '@/components/shared'
import type { OutreachSequence } from '@/types'

const responseData = [
  { month: 'Oct', email: 32, sms: 44, whatsapp: 58 },
  { month: 'Nov', email: 34, sms: 45, whatsapp: 60 },
  { month: 'Dec', email: 30, sms: 42, whatsapp: 55 },
  { month: 'Jan', email: 36, sms: 48, whatsapp: 64 },
  { month: 'Feb', email: 38, sms: 47, whatsapp: 62 },
  { month: 'Mar', email: 35, sms: 46, whatsapp: 65 },
]

const heatmapData = [
  { x: 'Mon', y: '9am', value: 12 }, { x: 'Tue', y: '9am', value: 15 },
  { x: 'Wed', y: '9am', value: 18 }, { x: 'Thu', y: '9am', value: 14 },
  { x: 'Fri', y: '9am', value: 10 },
  { x: 'Mon', y: '10am', value: 14 }, { x: 'Tue', y: '10am', value: 22 },
  { x: 'Wed', y: '10am', value: 16 }, { x: 'Thu', y: '10am', value: 13 },
  { x: 'Fri', y: '10am', value: 11 },
  { x: 'Mon', y: '11am', value: 10 }, { x: 'Tue', y: '11am', value: 18 },
  { x: 'Wed', y: '11am', value: 14 }, { x: 'Thu', y: '11am', value: 11 },
  { x: 'Fri', y: '11am', value: 9 },
  { x: 'Mon', y: '12pm', value: 8 }, { x: 'Tue', y: '12pm', value: 10 },
  { x: 'Wed', y: '12pm', value: 12 }, { x: 'Thu', y: '12pm', value: 9 },
  { x: 'Fri', y: '12pm', value: 7 },
  { x: 'Mon', y: '2pm', value: 11 }, { x: 'Tue', y: '2pm', value: 13 },
  { x: 'Wed', y: '2pm', value: 15 }, { x: 'Thu', y: '2pm', value: 12 },
  { x: 'Fri', y: '2pm', value: 8 },
  { x: 'Mon', y: '3pm', value: 14 }, { x: 'Tue', y: '3pm', value: 16 },
  { x: 'Wed', y: '3pm', value: 20 }, { x: 'Thu', y: '3pm', value: 15 },
  { x: 'Fri', y: '3pm', value: 11 },
]

const segmentData = [
  { segment: 'BA (Email)', rate: 42 },
  { segment: 'BA (SMS)', rate: 48 },
  { segment: 'BA (WhatsApp)', rate: 55 },
  { segment: 'ICT (Email)', rate: 38 },
  { segment: 'ICT (SMS)', rate: 52 },
  { segment: 'ICT (WhatsApp)', rate: 68 },
  { segment: 'DM (Email)', rate: 40 },
  { segment: 'DM (SMS)', rate: 50 },
  { segment: 'DM (WhatsApp)', rate: 60 },
]

const sequenceFunnelData: Record<string, { name: string; value: number }[]> = {
  'seq-001': [
    { name: 'Step 1: Email (Day 1)', value: 14 },
    { name: 'Step 2: SMS (Day 5)', value: 9 },
    { name: 'Step 3: WhatsApp (Day 10)', value: 6 },
    { name: 'Step 4: Email (Day 15)', value: 4 },
    { name: 'Step 5: Escalate (Day 20)', value: 2 },
  ],
  'seq-002': [
    { name: 'Step 1: Email (Day 0)', value: 8 },
    { name: 'Step 2: SMS (Day -3)', value: 7 },
  ],
  'seq-003': [
    { name: 'Step 1: Email (Day 3)', value: 5 },
    { name: 'Step 2: Email (Day 7)', value: 3 },
    { name: 'Step 3: Escalate (Day 10)', value: 1 },
  ],
}

interface AnalyticsTabProps {
  sequences: OutreachSequence[]
}

export function AnalyticsTab({ sequences }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Response Rate Trends */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Response Rate Trends (6 months)</h3>
        <AppLineChart
          data={responseData}
          lines={[
            { key: 'email', label: 'Email', colour: '#2563eb' },
            { key: 'sms', label: 'SMS', colour: '#0d9488' },
            { key: 'whatsapp', label: 'WhatsApp', colour: '#22c55e' },
          ]}
          xKey="month"
          height={250}
          showLegend
        />
      </div>

      {/* Best Performing Times */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Best Performing Times</h3>
        <p className="text-[10px] text-slate-500 mb-4">
          Recommendation: Best time to send email is <span className="font-bold text-green-600">Tuesday 10:00-11:00</span>
        </p>
        <AppHeatmapChart
          data={heatmapData}
          xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
          yLabels={['9am', '10am', '11am', '12pm', '2pm', '3pm']}
        />
      </div>

      {/* Outreach Effectiveness by Segment */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Outreach Effectiveness by Segment</h3>
        <p className="text-[10px] text-slate-500 mb-4">
          ICT trainees respond best to WhatsApp (68%), BA trainees prefer email (42%)
        </p>
        <AppBarChart
          data={segmentData}
          bars={[{ key: 'rate', label: 'Response Rate %', colour: '#2563eb' }]}
          xKey="segment"
          height={250}
          showGrid
        />
      </div>

      {/* Sequence Funnel Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sequence Funnel Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {sequences.map((seq) => {
            const funnelData = sequenceFunnelData[seq.id]
            if (!funnelData) return null
            return (
              <div key={seq.id}>
                <p className="text-sm font-bold text-slate-700 mb-2">{seq.name}</p>
                <AppFunnelChart data={funnelData} height={200} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

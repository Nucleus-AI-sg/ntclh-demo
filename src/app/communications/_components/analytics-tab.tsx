'use client'

import { AppLineChart, AppBarChart, AppHeatmapChart, AppFunnelChart } from '@/components/shared'
import {
  responseRateTrends,
  bestTimesHeatmap,
  segmentEffectiveness,
  sequenceFunnelData,
} from '@/data'
import type { OutreachSequence } from '@/types'

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
          data={responseRateTrends}
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
          data={bestTimesHeatmap}
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
          data={segmentEffectiveness}
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

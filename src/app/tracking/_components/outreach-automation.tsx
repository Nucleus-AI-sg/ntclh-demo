'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Pause, Play } from 'lucide-react'

interface OutreachAutomationProps {
  traineeId: string
  onPauseToggle?: (paused: boolean) => void
}

const sequence = [
  { day: 1, channel: 'Email', label: 'Initial employment status request' },
  { day: 5, channel: 'SMS', label: 'Reminder to upload documents' },
  { day: 10, channel: 'WhatsApp', label: 'Follow-up with direct link' },
  { day: 15, channel: 'Email', label: 'Final reminder before escalation' },
]

const channelRates = [
  { channel: 'Email', rate: 34, icon: Mail },
  { channel: 'SMS', rate: 45, icon: MessageSquare },
  { channel: 'WhatsApp', rate: 62, icon: MessageSquare },
]

export function OutreachAutomation({ onPauseToggle }: OutreachAutomationProps) {
  const [paused, setPaused] = useState(false)

  const handleToggle = () => {
    const next = !paused
    setPaused(next)
    onPauseToggle?.(next)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Outreach Automation</h4>
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-colors ${paused ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
        >
          {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          {paused ? 'Resume' : 'Active'}
        </button>
      </div>

      {/* Sequence */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2 mb-3">
        <p className="text-[9px] font-bold text-slate-400 uppercase">Outreach Sequence</p>
        {sequence.map((step) => (
          <div key={step.day} className="flex items-center gap-2 text-[10px]">
            <span className="w-10 text-slate-400 font-bold">Day {step.day}</span>
            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold">{step.channel}</span>
            <span className="text-slate-600 truncate">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Response rates */}
      <div className="space-y-1.5">
        <p className="text-[9px] font-bold text-slate-400 uppercase">Response Rates by Channel</p>
        {channelRates.map(({ channel, rate, icon: Icon }) => (
          <div key={channel} className="flex items-center gap-2 text-[10px]">
            <Icon className="h-3 w-3 text-slate-400" />
            <span className="w-16 text-slate-600">{channel}</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${rate}%` }} />
            </div>
            <span className="font-bold text-slate-700 w-8 text-right">{rate}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

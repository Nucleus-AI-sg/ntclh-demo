'use client'

import { useState } from 'react'
import { Play, Pause, ArrowRight, Plus } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { getChannelIcon, channelColour } from '@/lib/channel-icons'
import { stepResponseRates } from '@/data'
import type { OutreachSequence } from '@/types'

interface SequencesTabProps {
  sequences: OutreachSequence[]
}

export function SequencesTab({ sequences }: SequencesTabProps) {
  const [paused, setPaused] = useState<Record<string, boolean>>({})

  const isActive = (seq: OutreachSequence) => paused[seq.id] !== undefined ? !paused[seq.id] : seq.isActive

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors">
          <Plus className="h-3.5 w-3.5" /> New Sequence
        </button>
      </div>

      {sequences.map((seq) => {
        const active = isActive(seq)
        const rates = stepResponseRates[seq.id] ?? []

        return (
          <div key={seq.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">{seq.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Trigger: {seq.trigger}
                  <span className="mx-1.5 text-slate-300">|</span>
                  {seq.activeCount} active
                  <span className="mx-1.5 text-slate-300">|</span>
                  {seq.completionRate}% completion
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={active ? 'active' : 'pending'} label={active ? 'Active' : 'Paused'} />
                <button
                  onClick={() => setPaused((p) => ({ ...p, [seq.id]: active }))}
                  className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 transition-colors"
                  title={active ? 'Pause sequence' : 'Resume sequence'}
                >
                  {active ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Flow diagram */}
            <div className="px-5 pb-4">
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {seq.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-1 flex-shrink-0">
                    {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />}
                    <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[10px] font-bold ${channelColour[step.channel] ?? 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                      {getChannelIcon(step.channel, 'sm')}
                      <span>Day {step.day}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Per-step metrics */}
            <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Step Performance</p>
              <div className="flex items-center gap-3">
                {seq.steps.map((step, i) => {
                  const rate = rates[i]
                  const isEscalation = rate === 0
                  return (
                    <div key={i} className="text-center min-w-[60px]">
                      <p className="text-[9px] text-slate-400 mb-0.5">Step {i + 1}</p>
                      <p className={`text-xs font-bold ${isEscalation ? 'text-amber-600' : rate >= 60 ? 'text-green-600' : rate >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                        {isEscalation ? 'Escalate' : `${rate}%`}
                      </p>
                      <p className="text-[9px] text-slate-400">{step.channel}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

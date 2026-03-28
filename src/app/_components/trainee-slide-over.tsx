'use client'

import Link from 'next/link'
import { ExternalLink, Mail, Phone } from 'lucide-react'
import { SlideOverPanel, StatusBadge } from '@/components/shared'
import type { Trainee, Programme } from '@/types'

interface TraineeSlideOverProps {
  trainee: Trainee | null
  programmes: Programme[]
  open: boolean
  onClose: () => void
}

export function TraineeSlideOver({ trainee, programmes, open, onClose }: TraineeSlideOverProps) {
  if (!trainee) return null

  const programme = programmes.find((p) => p.id === trainee.programmeId)
  const initials = trainee.name.split(' ').map((n) => n[0]).join('')

  return (
    <SlideOverPanel
      open={open}
      onClose={onClose}
      title={trainee.name}
      subtitle={programme?.shortName ?? trainee.programmeId}
      avatarInitials={initials}
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <StatusBadge status={trainee.lifecycleStage} />
            <StatusBadge status={trainee.riskLevel === 'at_risk' ? 'at_risk' : 'on_track'} label={trainee.riskLevel === 'at_risk' ? 'At Risk' : 'On Track'} />
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact</h4>
          <div className="space-y-1.5 text-xs text-slate-600">
            <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> {trainee.email}</p>
            <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> {trainee.phone}</p>
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Details</h4>
          <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
            <dt className="text-slate-400 font-medium">Age</dt>
            <dd className="text-slate-700 font-bold">{trainee.age}</dd>
            <dt className="text-slate-400 font-medium">Experience</dt>
            <dd className="text-slate-700 font-bold">{trainee.yearsExperience} years</dd>
            <dt className="text-slate-400 font-medium">Days in Stage</dt>
            <dd className="text-slate-700 font-bold">{trainee.daysInStage}</dd>
            <dt className="text-slate-400 font-medium">Qualification</dt>
            <dd className="text-slate-700 font-bold">{trainee.highestQualification}</dd>
          </dl>
        </div>
        {trainee.careerGoals && (
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Career Goals</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{trainee.careerGoals}</p>
          </div>
        )}
        <Link
          href={`/trainee/${trainee.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Full Profile <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </SlideOverPanel>
  )
}

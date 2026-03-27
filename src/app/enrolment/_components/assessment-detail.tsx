'use client'

import { ShieldCheck, GraduationCap, Target } from 'lucide-react'
import type { Assessment, Trainee, Programme } from '@/types'
import { CareerRoadmap } from './career-roadmap'
import { AIAssessmentPanel } from './ai-assessment-panel'
import { ApplicationTimeline } from './application-timeline'
import { CoordinatorNotes } from './coordinator-notes'

interface AssessmentDetailProps {
  assessment: Assessment
  trainee: Trainee
  programmes: Programme[]
  onApprove: () => void
  onOverride: () => void
  onReject: () => void
  onRequestInfo: () => void
}

export function AssessmentDetail({
  assessment, trainee, programmes, onApprove, onOverride, onReject, onRequestInfo,
}: AssessmentDetailProps) {
  const recProg = programmes.find((p) => p.id === assessment.recommendedProgrammeId)
  const confidenceLabel = assessment.confidence === 'high' ? 'HIGH CONFIDENCE' : assessment.confidence === 'medium' ? 'MEDIUM CONFIDENCE' : 'LOW CONFIDENCE'
  const isProcessed = assessment.status !== 'pending'

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-500 shadow-md">
            {trainee.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="ml-5">
            <div className="flex items-center">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{trainee.name}</h2>
              {trainee.singpassVerified && (
                <span className="ml-3 flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> SingPass Verified
                </span>
              )}
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-500 font-medium gap-2">
              <span>Age {trainee.age}</span>
              <span>-</span>
              <span>{trainee.phone}</span>
              <span>-</span>
              <span>{trainee.address?.split(',')[0]}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Application ID</p>
          <p className="font-mono text-sm font-bold text-slate-900">#{assessment.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Background + Timeline + Notes (left column) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <BackgroundCard trainee={trainee} />
          <ApplicationTimeline assessment={assessment} trainee={trainee} />
          <CoordinatorNotes assessmentId={assessment.id} />
        </div>

        {/* AI Assessment Panel (right column) */}
        <div className="col-span-12 lg:col-span-8">
          <AIAssessmentPanel assessment={assessment} recProg={recProg} confidenceLabel={confidenceLabel} />
        </div>

        {/* Career Roadmap */}
        <div className="col-span-12">
          <CareerRoadmap trainee={trainee} programme={recProg} />
        </div>

        {/* Action Buttons */}
        {!isProcessed && (
          <div className="col-span-12 mt-4 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-end space-x-4">
              <button onClick={onReject} className="px-6 py-2.5 text-sm font-bold text-red-600 border-2 border-red-600 rounded hover:bg-red-50 transition-colors">
                Reject
              </button>
              <button onClick={onRequestInfo} className="px-6 py-2.5 text-sm font-bold text-slate-500 bg-slate-100 rounded hover:bg-slate-200 transition-colors">
                Request More Info
              </button>
              <button onClick={onOverride} className="px-6 py-2.5 text-sm font-bold text-blue-600 border-2 border-blue-600 rounded hover:bg-blue-50 transition-colors">
                Approve with Override
              </button>
              <button onClick={onApprove} className="px-10 py-2.5 text-sm font-bold text-white bg-green-600 rounded shadow-md hover:bg-green-700 transition-colors flex items-center">
                <Target className="h-4 w-4 mr-2" /> Approve Enrolment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BackgroundCard({ trainee }: { trainee: Trainee }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
        <GraduationCap className="h-4 w-4 mr-2 text-blue-600" /> Background
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Education</p>
          <p className="text-sm font-semibold text-slate-800">{trainee.institution} ({trainee.graduationYear})</p>
          <p className="text-xs text-slate-500">{trainee.highestQualification}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Experience</p>
          <p className="text-sm font-semibold text-slate-800">{trainee.currentRole}</p>
          <p className="text-xs text-slate-500">{trainee.currentEmployer} - {trainee.yearsExperience} years</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Transition Goals</p>
          <p className="text-sm font-medium text-slate-700 leading-relaxed italic">&ldquo;{trainee.careerGoals}&rdquo;</p>
        </div>
      </div>
    </div>
  )
}

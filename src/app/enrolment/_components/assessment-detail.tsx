'use client'

import { ShieldCheck, CheckCircle, GraduationCap, Briefcase, Target } from 'lucide-react'
import { ScoreGauge } from '@/components/shared'
import type { Assessment, Trainee, Programme } from '@/types'
import { CareerRoadmap } from './career-roadmap'

interface AssessmentDetailProps {
  assessment: Assessment
  trainee: Trainee
  programmes: Programme[]
  onApprove: () => void
  onOverride: () => void
}

export function AssessmentDetail({ assessment, trainee, programmes, onApprove, onOverride }: AssessmentDetailProps) {
  const recProg = programmes.find((p) => p.id === assessment.recommendedProgrammeId)
  const confidenceLabel = assessment.confidence === 'high' ? 'HIGH CONFIDENCE' : assessment.confidence === 'medium' ? 'MEDIUM CONFIDENCE' : 'LOW CONFIDENCE'

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
        {/* Background Summary (left column) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
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
        </div>

        {/* AI Assessment Panel (right column) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h3 className="text-xs font-black text-blue-700 uppercase tracking-widest mb-4 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" /> AI Assessment Detail
                </h3>
                <p className="text-sm font-bold text-slate-900 mb-1">Recommended Track:</p>
                <p className="text-2xl font-black text-blue-800">{recProg?.name ?? 'N/A'}</p>
              </div>
              <div className="flex flex-col items-center">
                <ScoreGauge score={assessment.overallScore} size="md" />
                <span className="mt-2 text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded shadow-sm">
                  {confidenceLabel}
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">AI Reasoning</p>
                <ul className="space-y-2">
                  {assessment.reasoning.map((r, i) => (
                    <li key={i} className="flex items-start text-xs text-slate-700">
                      <CheckCircle className="h-3.5 w-3.5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">Transferable Skills</p>
                <div className="flex flex-wrap gap-2">
                  {assessment.transferableSkills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-white border border-blue-100 rounded text-[10px] font-semibold text-blue-700 uppercase tracking-tight">
                      {skill}
                    </span>
                  ))}
                </div>
                {assessment.alternatives.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">Alternative Courses</p>
                    <div className="space-y-1.5">
                      {assessment.alternatives.map((alt) => (
                        <div key={alt.programmeId} className="flex items-center justify-between text-xs">
                          <span className="text-slate-700">{alt.programmeName}</span>
                          <span className="font-bold text-slate-900">{alt.matchScore}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {assessment.comparableAssessments > 0 && (
                  <p className="mt-3 text-[10px] text-slate-400">
                    Based on {assessment.comparableAssessments.toLocaleString()} comparable assessments
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Career Roadmap */}
        <div className="col-span-12">
          <CareerRoadmap trainee={trainee} programme={recProg} />
        </div>

        {/* Action Buttons */}
        <div className="col-span-12 mt-4 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-end space-x-4">
            <button className="px-6 py-2.5 text-sm font-bold text-red-600 border-2 border-red-600 rounded hover:bg-red-50 transition-colors">
              Reject
            </button>
            <button className="px-6 py-2.5 text-sm font-bold text-slate-500 bg-slate-100 rounded hover:bg-slate-200 transition-colors">
              Request More Info
            </button>
            <button
              onClick={onOverride}
              className="px-6 py-2.5 text-sm font-bold text-blue-600 border-2 border-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              Approve with Override
            </button>
            <button
              onClick={onApprove}
              className="px-10 py-2.5 text-sm font-bold text-white bg-green-600 rounded shadow-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Target className="h-4 w-4 mr-2" /> Approve Enrolment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

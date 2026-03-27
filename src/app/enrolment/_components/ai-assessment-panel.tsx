import { CheckCircle, Briefcase } from 'lucide-react'
import { ScoreGauge } from '@/components/shared'
import type { Assessment, Programme } from '@/types'

interface AIAssessmentPanelProps {
  assessment: Assessment
  recProg: Programme | undefined
  confidenceLabel: string
}

export function AIAssessmentPanel({ assessment, recProg, confidenceLabel }: AIAssessmentPanelProps) {
  return (
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
  )
}

'use client'

import { CheckCircle, XCircle, Minus } from 'lucide-react'
import type { Trainee } from '@/types'

interface EmploymentVerificationProps {
  trainee: Trainee
}

function CheckRow({ label, value, match }: { label: string; value: string; match: boolean | null }) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="text-slate-500">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-slate-700">{value}</span>
        {match === true && <CheckCircle className="h-3 w-3 text-green-500" />}
        {match === false && <XCircle className="h-3 w-3 text-red-500" />}
        {match === null && <Minus className="h-3 w-3 text-slate-300" />}
      </div>
    </div>
  )
}

export function EmploymentVerification({ trainee }: EmploymentVerificationProps) {
  const hasPlacement = !!trainee.placedEmployerId

  if (!hasPlacement) {
    return (
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Employment Verification</h4>
        <p className="text-xs text-slate-400">No employment declared</p>
      </div>
    )
  }

  const salaryInRange = trainee.placedSalary ? trainee.placedSalary >= 3000 && trainee.placedSalary <= 8000 : null
  const hasDiscrepancy = trainee.riskAssessment?.factors.some((f) => f.toLowerCase().includes('mismatch')) ?? false

  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Employment Verification</h4>
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
        <CheckRow label="Employer" value={trainee.currentEmployer || 'Not declared'} match={hasDiscrepancy ? false : true} />
        <CheckRow label="Role" value={trainee.placedRole ?? '-'} match={trainee.placedRole ? true : null} />
        <CheckRow label="Start Date" value={trainee.placedStartDate ?? '-'} match={trainee.placedStartDate ? true : null} />
        <CheckRow label="Salary" value={trainee.placedSalary ? `$${trainee.placedSalary.toLocaleString()}/mo` : '-'} match={salaryInRange} />
        <CheckRow label="Employment Type" value={trainee.employmentType?.replace(/_/g, ' ') ?? '-'} match={trainee.employmentType ? true : null} />
        <CheckRow label="Source" value={trainee.placementSource?.replace(/_/g, ' ') ?? '-'} match={null} />
        {trainee.docVerificationScore != null && (
          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200">
            <span className="text-slate-500 font-bold">Doc Verification Score</span>
            <span className={`font-black ${trainee.docVerificationScore >= 80 ? 'text-green-600' : trainee.docVerificationScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
              {trainee.docVerificationScore}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

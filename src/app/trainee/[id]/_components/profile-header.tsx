import { ShieldCheck, Mail, RefreshCw } from 'lucide-react'
import { StatusBadge, ExportButton } from '@/components/shared'
import { LifecycleStepper } from '@/components/shared'
import type { Trainee, Programme, Cohort } from '@/types'

interface ProfileHeaderProps {
  trainee: Trainee
  programme: Programme | undefined
  cohort: Cohort | undefined
  onSendMessage: () => void
  onUpdateStatus: () => void
  showToast: (msg: string) => void
}

export function ProfileHeader({ trainee, programme, cohort, onSendMessage, onUpdateStatus, showToast }: ProfileHeaderProps) {
  const initials = trainee.name.split(' ').map((n) => n[0]).join('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-500 shadow-md flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{trainee.name}</h1>
              {trainee.singpassVerified && (
                <span className="flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> SingPass Verified
                </span>
              )}
              <StatusBadge status={trainee.lifecycleStage} />
            </div>
            <div className="flex items-center mt-1.5 text-sm text-slate-500 font-medium gap-3">
              <span>NRIC: {trainee.nricMasked}</span>
              <span>-</span>
              <span>Age {trainee.age}</span>
              <span>-</span>
              <span>{programme?.shortName ?? trainee.programmeId}</span>
              {cohort && <span className="text-slate-400">({cohort.name} cohort)</span>}
              <span>-</span>
              <span>Coordinator: Sarah Tan</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSendMessage}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" /> Send Message
          </button>
          <button
            onClick={onUpdateStatus}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Update Status
          </button>
          <ExportButton label="Export" formats={['PDF']} showToast={showToast} />
        </div>
      </div>

      {/* Lifecycle Stepper */}
      <LifecycleStepper currentStage={trainee.lifecycleStage} />
    </div>
  )
}

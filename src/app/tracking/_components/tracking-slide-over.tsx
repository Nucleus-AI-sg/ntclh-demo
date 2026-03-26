'use client'

import { Mail, MessageSquare, Phone, CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react'
import { SlideOverPanel, StatusBadge } from '@/components/shared'
import type { Trainee, Programme, Communication, Document } from '@/types'
import { Channel } from '@/types'

interface TrackingSlideOverProps {
  trainee: Trainee | null
  programme: Programme | undefined
  communications: Communication[]
  documents: Document[]
  open: boolean
  onClose: () => void
  onApprove: () => void
}

const channelIcon: Record<string, React.ReactNode> = {
  [Channel.Email]: <Mail className="h-3.5 w-3.5" />,
  [Channel.Sms]: <MessageSquare className="h-3.5 w-3.5" />,
  [Channel.WhatsApp]: <MessageSquare className="h-3.5 w-3.5" />,
  [Channel.Phone]: <Phone className="h-3.5 w-3.5" />,
}

export function TrackingSlideOver({ trainee, programme, communications, documents, open, onClose, onApprove }: TrackingSlideOverProps) {
  if (!trainee) return null
  const initials = trainee.name.split(' ').map((n) => n[0]).join('')

  return (
    <SlideOverPanel open={open} onClose={onClose} title={trainee.name} subtitle={programme?.shortName} avatarInitials={initials}>
      <div className="space-y-6">
        {/* Profile Summary */}
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Profile</h4>
          <div className="text-xs text-slate-600 space-y-1">
            <p><span className="font-bold text-slate-700">Stage:</span> <StatusBadge status={trainee.lifecycleStage} /></p>
            <p><span className="font-bold text-slate-700">Completed:</span> {trainee.completionDate ?? 'N/A'}</p>
            <p><span className="font-bold text-slate-700">Employer:</span> {trainee.placedEmployerId ? trainee.placedRole : 'Not declared'}</p>
            <p><span className="font-bold text-slate-700">Days in stage:</span> {trainee.daysInStage}</p>
          </div>
        </div>

        {/* Outreach Timeline */}
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Outreach Timeline</h4>
          {communications.length === 0 && <p className="text-xs text-slate-400">No outreach history</p>}
          <div className="space-y-3">
            {communications.map((comm) => (
              <div key={comm.id} className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                  {channelIcon[comm.channel] ?? <Mail className="h-3 w-3" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-700 truncate">{comm.subject}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StatusBadge status={comm.status} />
                    <span className="text-[9px] text-slate-300">{comm.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents & OCR */}
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Documents</h4>
          {documents.length === 0 && <p className="text-xs text-slate-400">No documents submitted</p>}
          {documents.map((doc) => (
            <div key={doc.id} className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">{doc.type.replace(/_/g, ' ')}</span>
                </div>
                <StatusBadge status={doc.status} />
              </div>
              {doc.ocrExtraction && (
                <div className="space-y-1.5 mt-2">
                  {doc.ocrExtraction.fields.map((field) => (
                    <div key={field.fieldName} className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">{field.fieldName}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">{field.extractedValue}</span>
                        {field.crossReferenceResult === 'match' ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : field.crossReferenceResult === 'mismatch' ? (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        ) : (
                          <Clock className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {doc.discrepancies && doc.discrepancies.length > 0 && (
                <div className="mt-2 p-2 bg-red-50 rounded text-[10px] text-red-600">
                  {doc.discrepancies.map((d, i) => <p key={i}>{d}</p>)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <button onClick={onApprove} className="w-full py-2.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors">
            Approve Verification
          </button>
          <button className="w-full py-2.5 border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
            Override & Approve
          </button>
          <button className="w-full py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
            Request Resubmission
          </button>
        </div>
      </div>
    </SlideOverPanel>
  )
}

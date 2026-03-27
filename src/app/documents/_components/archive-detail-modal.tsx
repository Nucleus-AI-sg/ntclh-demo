'use client'

import { CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { StatusBadge } from '@/components/shared'
import { scoreColour } from '@/lib/colours'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

interface ArchiveDetailModalProps {
  document: Document
  onClose: () => void
}

function CrossRefIcon({ result }: { result?: string }) {
  if (result === 'match') return <CheckCircle className="h-3 w-3 text-green-500" />
  if (result === 'mismatch') return <AlertTriangle className="h-3 w-3 text-red-500" />
  return <Clock className="h-3 w-3 text-amber-500" />
}

export function ArchiveDetailModal({ document, onClose }: ArchiveDetailModalProps) {
  const fields = document.ocrExtraction?.fields ?? []
  const verifier = document.verifiedBy === 'system' ? 'System (Auto-Verified)' : 'Sarah Tan (Coordinator)'

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            {document.traineeName} - {document.type.replace(/_/g, ' ')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Document Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Status</span>
              <div className="mt-1"><StatusBadge status={document.status} /></div>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">OCR Confidence</span>
              <p className={cn('mt-1 font-bold', scoreColour(document.ocrConfidence).text)}>{document.ocrConfidence}%</p>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Submitted</span>
              <p className="mt-1 text-slate-700">{document.submittedDate}</p>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Programme</span>
              <p className="mt-1 text-slate-700">{document.programmeTrack ?? 'N/A'}</p>
            </div>
          </div>

          {/* OCR Extraction Results */}
          {fields.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Extraction Results</h4>
              <div className="space-y-1.5">
                {fields.map((field) => {
                  const colour = scoreColour(field.confidence)
                  return (
                    <div key={field.fieldName} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500">{field.fieldName}</span>
                        <p className="text-xs font-semibold text-slate-800">{field.extractedValue}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn('text-[10px] font-bold', colour.text)}>{field.confidence}%</span>
                        <CrossRefIcon result={field.crossReferenceResult} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Verification Audit Trail */}
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Verification Audit Trail</h4>
            <div className="space-y-2">
              <AuditEntry
                date={document.submittedDate}
                action="Document submitted"
                actor={document.traineeName}
              />
              {document.ocrExtraction && (
                <AuditEntry
                  date={document.submittedDate}
                  action={`OCR processing completed - ${document.ocrConfidence}% confidence`}
                  actor="System"
                />
              )}
              {document.verifiedDate && (
                <AuditEntry
                  date={document.verifiedDate}
                  action={document.status === 'rejected' ? 'Document rejected' : 'Document verified'}
                  actor={verifier}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AuditEntry({ date, action, actor }: { date: string; action: string; actor: string }) {
  return (
    <div className="flex items-start gap-3 pl-3 border-l-2 border-blue-200">
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-700">{action}</p>
        <p className="text-[10px] text-slate-400">{actor} - {date}</p>
      </div>
    </div>
  )
}

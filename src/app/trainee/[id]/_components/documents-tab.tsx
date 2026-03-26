import { FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { DocumentStatus } from '@/types'
import type { Document } from '@/types'

interface DocumentsTabProps {
  documents: Document[]
}

const statusIcon: Record<string, React.ReactNode> = {
  [DocumentStatus.AutoVerified]: <CheckCircle className="h-4 w-4 text-green-500" />,
  [DocumentStatus.ManuallyVerified]: <CheckCircle className="h-4 w-4 text-green-500" />,
  [DocumentStatus.Flagged]: <AlertTriangle className="h-4 w-4 text-red-500" />,
  [DocumentStatus.Submitted]: <Clock className="h-4 w-4 text-amber-500" />,
  [DocumentStatus.NotSubmitted]: <Clock className="h-4 w-4 text-slate-400" />,
  [DocumentStatus.Rejected]: <AlertTriangle className="h-4 w-4 text-red-500" />,
}

export function DocumentsTab({ documents }: DocumentsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Required Documents</h3>
        <div className="space-y-3">
          {documents.length === 0 && <p className="text-sm text-slate-400">No documents on record</p>}
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                {statusIcon[doc.status] ?? <Clock className="h-4 w-4 text-slate-400" />}
                <div>
                  <p className="text-sm font-bold text-slate-900">{doc.type.replace(/_/g, ' ')}</p>
                  <p className="text-[10px] text-slate-400">{doc.submittedDate ? `Submitted ${doc.submittedDate}` : 'Not yet submitted'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={doc.status} />
                {doc.ocrConfidence > 0 && <span className="text-[10px] font-bold text-slate-400">OCR: {doc.ocrConfidence}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {documents.filter((d) => d.ocrExtraction).map((doc) => (
        <div key={`ocr-${doc.id}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-blue-600" /> OCR Extraction: {doc.type.replace(/_/g, ' ')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="pb-2">Field</th>
                  <th className="pb-2">Extracted Value</th>
                  <th className="pb-2 text-center">Confidence</th>
                  <th className="pb-2">Cross-Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doc.ocrExtraction?.fields.map((field) => (
                  <tr key={field.fieldName}>
                    <td className="py-2 font-medium text-slate-700">{field.fieldName}</td>
                    <td className="py-2 text-slate-600">{field.extractedValue}</td>
                    <td className="py-2 text-center font-bold text-slate-700">{field.confidence}%</td>
                    <td className="py-2">
                      <StatusBadge
                        status={field.crossReferenceResult === 'match' ? 'verified' : field.crossReferenceResult === 'mismatch' ? 'flagged' : 'pending'}
                        label={field.crossReferenceResult.replace(/_/g, ' ')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {doc.discrepancies && doc.discrepancies.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <p className="text-[10px] font-bold text-red-700 uppercase mb-1">Discrepancies</p>
              {doc.discrepancies.map((d, i) => <p key={i} className="text-xs text-red-600">{d}</p>)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

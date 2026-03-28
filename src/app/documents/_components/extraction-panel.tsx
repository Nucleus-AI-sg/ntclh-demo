'use client'

import { CheckCircle, AlertTriangle, Clock, ShieldAlert } from 'lucide-react'
import { scoreColour } from '@/lib/colours'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

interface OcrField {
  fieldName: string
  extractedValue: string
  confidence: number
  crossReferenceResult?: string
  crossReferenceNote?: string
}

interface ExtractionPanelProps {
  fields: OcrField[]
  highlightedField: string | null
  onHighlight: (field: string) => void
  editingField: string | null
  onEditField: (field: string | null) => void
  document: Document
  onVerify: () => void
  onReject: () => void
  onEscalate: () => void
}

function CrossRefIcon({ result }: { result?: string }) {
  if (result === 'match') return <CheckCircle className="h-3 w-3 text-green-500" />
  if (result === 'mismatch') return <AlertTriangle className="h-3 w-3 text-red-500" />
  return <Clock className="h-3 w-3 text-amber-500" />
}

export function ExtractionPanel({
  fields,
  highlightedField,
  onHighlight,
  editingField,
  onEditField,
  document,
  onVerify,
  onReject,
  onEscalate,
}: ExtractionPanelProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">OCR Extraction Results</h3>
        <div className="space-y-2">
          {fields.map((field) => {
            const colour = scoreColour(field.confidence)
            const isEditing = editingField === field.fieldName
            return (
              <div
                key={field.fieldName}
                className={cn('p-2.5 rounded-lg border transition-all cursor-pointer', highlightedField === field.fieldName ? 'border-blue-300 bg-blue-50' : 'border-slate-100 bg-slate-50')}
                onClick={() => onHighlight(field.fieldName)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">{field.fieldName}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn('text-[10px] font-bold', colour.text)}>{field.confidence}%</span>
                    <CrossRefIcon result={field.crossReferenceResult} />
                  </div>
                </div>
                {isEditing ? (
                  <input defaultValue={field.extractedValue} className="mt-1 w-full text-xs border border-blue-300 rounded px-2 py-1" onBlur={() => onEditField(null)} autoFocus />
                ) : (
                  <p className="text-xs font-semibold text-slate-800 mt-0.5" onDoubleClick={() => onEditField(field.fieldName)}>{field.extractedValue}</p>
                )}
                {field.crossReferenceNote && <p className="text-[9px] text-slate-400 mt-0.5">{field.crossReferenceNote}</p>}
              </div>
            )
          })}
        </div>
      </div>

      {document.discrepancies && document.discrepancies.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-[10px] font-bold text-red-700 uppercase mb-2">Discrepancies Found</p>
          {document.discrepancies.map((d, i) => <p key={i} className="text-xs text-red-600 mb-1">{d}</p>)}
          {document.suggestedResolution && <p className="text-xs text-slate-600 mt-2 italic">{document.suggestedResolution}</p>}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={onVerify} className="flex-1 py-2.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700">
          Verify
        </button>
        <button onClick={() => onVerify()} className="flex-1 py-2.5 border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50">
          Edit & Verify
        </button>
        <button onClick={onReject} className="flex-1 py-2.5 border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50">
          Reject
        </button>
        <button onClick={onEscalate} className="flex-1 py-2.5 border border-amber-200 text-amber-600 text-xs font-bold rounded-lg hover:bg-amber-50 flex items-center justify-center gap-1">
          <ShieldAlert className="h-3 w-3" />
          Escalate
        </button>
      </div>
    </div>
  )
}

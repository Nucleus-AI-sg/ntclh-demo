'use client'

import { useState } from 'react'
import { Upload, MapPin, TrendingUp, Sparkles } from 'lucide-react'
import { LifecycleStepper, StatusBadge } from '@/components/shared'
import type { Trainee, Programme, Vacancy, Document } from '@/types'

interface TraineeViewProps {
  trainee: Trainee | null
  programme: Programme | undefined
  documents: Document[]
  vacancies: Vacancy[]
}

export function TraineeView({ trainee, programme, documents, vacancies }: TraineeViewProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  if (!trainee) {
    return <div className="flex items-center justify-center py-20 text-sm text-slate-400">Select a trainee from the Case Management tab to preview their self-service portal</div>
  }

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploadDone(true) }, 2000)
  }

  const matched = vacancies.filter((v) => v.programmeIds.includes(trainee.programmeId)).slice(0, 4)

  return (
    <div className="space-y-4 relative">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 font-medium">
        Previewing self-service portal for <span className="font-bold">{trainee.name}</span>
      </div>

      {/* Journey Progress */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Your Journey</h3>
        <LifecycleStepper currentStage={trainee.lifecycleStage} />
      </div>

      {/* Action Required Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded shadow-sm">
        <p className="text-sm font-bold text-amber-800">Action Required</p>
        <p className="text-xs text-amber-700 mt-1">
          {trainee.lifecycleStage === 'completed'
            ? 'Please upload your employment documents by 30 April to complete verification.'
            : trainee.lifecycleStage === 'placed'
              ? 'Congratulations on your placement! Upload your first pay slip to complete verification.'
              : 'Keep your profile up to date to receive the best placement matches.'}
        </p>
      </div>

      {/* Career Roadmap */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-teal-600" /> Your Career Roadmap
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Previous Role</p>
            <p className="text-sm font-bold text-slate-900 mt-1">{trainee.currentRole}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-[10px] font-bold text-blue-600 uppercase">Training</p>
            <p className="text-sm font-bold text-blue-900 mt-1">{programme?.shortName ?? 'Programme'}</p>
          </div>
          <div className="bg-teal-50 rounded-lg p-3">
            <p className="text-[10px] font-bold text-teal-600 uppercase">Target</p>
            <p className="text-sm font-bold text-teal-900 mt-1">$4,200 - $5,500/mo</p>
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Upload Documents</h3>
        <div className="space-y-2 mb-4">
          {['Pay Slip', 'CPF Statement', 'Employment Letter'].map((docType) => {
            const exists = documents.some((d) => d.type === docType.toLowerCase().replace(/ /g, '_'))
            return (
              <div key={docType} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded">
                <span className="text-slate-700">{docType}</span>
                <StatusBadge status={exists ? 'submitted' : 'not_submitted'} label={exists ? 'Uploaded' : 'Required'} />
              </div>
            )
          })}
        </div>
        {!uploadDone ? (
          <button onClick={handleUpload} disabled={uploading} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-xs font-bold text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            {uploading ? (
              <><div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> Processing OCR...</>
            ) : (
              <><Upload className="h-4 w-4" /> Click to upload document</>
            )}
          </button>
        ) : (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 font-bold">
            Document uploaded successfully. OCR verification: 95% confidence. Auto-verified.
          </div>
        )}
      </div>

      {/* Placement Opportunities */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-indigo-600" /> Matched Opportunities
        </h3>
        <div className="space-y-3">
          {matched.map((v) => (
            <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">{v.title}</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" /> {v.location} - ${v.salaryMin.toLocaleString()}-${v.salaryMax.toLocaleString()}
                </p>
              </div>
              <button onClick={() => { setToast(`Interest expressed for ${v.title}`); setTimeout(() => setToast(null), 2000) }} className="px-3 py-1.5 text-[10px] font-bold text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors">
                Express Interest
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-bold">
          {toast}
        </div>
      )}
    </div>
  )
}

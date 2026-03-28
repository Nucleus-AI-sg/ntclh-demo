'use client'

import { useRef, useState } from 'react'
import { Database, Download, Upload } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { ExportButton } from '@/components/shared/export-button'
import { ImportPreviewModal } from './import-preview-modal'

interface ImportTabProps {
  showToast: (msg: string) => void
}

const importHistory = [
  { date: '2026-02-15', file: 'master_trainee_list_2025.xlsx', rows: 847, status: 'success', importedBy: 'Sarah Tan' },
  { date: '2026-02-15', file: 'employer_database.xlsx', rows: 52, status: 'success', importedBy: 'Rachel Wong' },
  { date: '2026-02-20', file: 'placement_history_2024.csv', rows: 234, status: 'partial', importedBy: 'Sarah Tan' },
]

const templateHeaders: Record<string, string> = {
  Trainee: 'Trainee Name,Email,Phone,NRIC (last 4),Programme,Enrolment Date,Status',
  Employer: 'Company Name,UEN,Contact Person,Email,Phone,Industry,Vacancies',
  Placement: 'Trainee Name,Employer,Job Title,Start Date,Salary,Programme,Status',
}

function downloadTemplate(name: string) {
  const csv = templateHeaders[name] + '\n'
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name.toLowerCase()}_import_template.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function ImportTab({ showToast }: ImportTabProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file.name)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-600" /> Excel Import Tool
        </h3>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
          <Upload className="h-8 w-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 mb-4">Drag and drop an Excel file here, or click to browse</p>
          <input ref={fileRef} type="file" accept=".xlsx,.csv" className="hidden" onChange={handleFileSelect} />
          <button onClick={() => fileRef.current?.click()} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Choose File</button>
        </div>
        <div className="flex gap-4 mt-4">
          {['Trainee', 'Employer', 'Placement'].map((t) => (
            <button key={t} onClick={() => { downloadTemplate(t); showToast(`${t} template downloaded`) }} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
              <Download className="h-3 w-3" /> {t} Template
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Import History</h3>
          <ExportButton formats={['CSV']} label="Export History" showToast={showToast} />
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Date</th><th className="px-5 py-3">File</th>
              <th className="px-5 py-3 text-center">Records</th><th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Imported By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {importHistory.map((h, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-500">{h.date}</td>
                <td className="px-5 py-3 font-bold text-slate-900">{h.file}</td>
                <td className="px-5 py-3 text-center font-bold">{h.rows}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={h.status === 'success' ? 'verified' : 'pending'} label={h.status === 'success' ? 'Completed' : 'Completed (12 warnings)'} />
                </td>
                <td className="px-5 py-3 text-slate-600">{h.importedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImportPreviewModal
        open={!!selectedFile}
        fileName={selectedFile ?? ''}
        onImport={() => { setSelectedFile(null); showToast('Import completed successfully - 847 records imported') }}
        onCancel={() => setSelectedFile(null)}
      />
    </div>
  )
}

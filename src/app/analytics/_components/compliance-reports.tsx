'use client'

import { useState } from 'react'
import { FileText, Download, CheckCircle, Clock, AlertTriangle, Eye } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { ReportTemplate } from '@/types'

interface ComplianceReportsProps {
  reportTemplates: ReportTemplate[]
}

const statusIcon: Record<string, React.ReactNode> = {
  ready: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending_data: <Clock className="h-4 w-4 text-amber-500" />,
  overdue: <AlertTriangle className="h-4 w-4 text-red-500" />,
}

const reportHistory = [
  { name: 'SSG Training Grant Claim', generated: '2026-03-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'WSG Monthly Placement Return', generated: '2026-03-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'SSG Training Grant Claim', generated: '2026-02-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'WSG Monthly Placement Return', generated: '2026-02-01', by: 'Sarah Tan', status: 'submitted' },
  { name: 'IMDA Performance Summary', generated: '2026-01-01', by: 'James Lim', status: 'submitted' },
]

export function ComplianceReports({ reportTemplates }: ComplianceReportsProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const handleGenerate = (name: string) => {
    setPreview(name)
    setToast(`${name} generated successfully`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Report Templates */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Government Report Templates</h3>
        <div className="space-y-3">
          {reportTemplates.map((report) => (
            <div key={report.id} className={cn('p-4 rounded-lg border flex items-center justify-between', report.status === 'overdue' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100')}>
              <div className="flex items-center gap-3">
                {statusIcon[report.status]}
                <div>
                  <p className="text-sm font-bold text-slate-900">{report.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                    {report.lastGenerated && <span>Last: {report.lastGenerated}</span>}
                    <span>Next due: {report.nextDue}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={report.status === 'ready' ? 'active' : report.status === 'overdue' ? 'flagged' : 'pending'} label={report.status.replace(/_/g, ' ')} />
                <button onClick={() => handleGenerate(report.name)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                  <FileText className="h-3 w-3" /> Generate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Completeness Check */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pre-Generation Data Check</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Trainee Records', status: 'complete', count: '25/25' },
            { label: 'Employment Verified', status: 'partial', count: '14/21' },
            { label: 'Document Archive', status: 'complete', count: '30/30' },
            { label: 'Employer Confirmations', status: 'partial', count: '6/8' },
          ].map((check) => (
            <div key={check.label} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">{check.label}</p>
              <p className={cn('text-lg font-black mt-1', check.status === 'complete' ? 'text-green-600' : 'text-amber-600')}>{check.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Preview */}
      {preview && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
              <Eye className="h-4 w-4 mr-2 text-blue-600" /> Report Preview: {preview}
            </h3>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
              <Download className="h-3 w-3" /> Download PDF
            </button>
          </div>
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 text-center text-slate-400 min-h-[200px] flex items-center justify-center">
            <div>
              <p className="text-sm font-bold">Government Report Template</p>
              <p className="text-xs mt-1">{preview}</p>
              <p className="text-[10px] mt-2">Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Report History */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Report History</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead><tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <th className="px-5 py-3">Report</th><th className="px-5 py-3">Generated</th><th className="px-5 py-3">By</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {reportHistory.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900">{r.name}</td>
                <td className="px-5 py-3 text-slate-500">{r.generated}</td>
                <td className="px-5 py-3 text-slate-500">{r.by}</td>
                <td className="px-5 py-3"><StatusBadge status="verified" label={r.status} /></td>
                <td className="px-5 py-3"><button className="text-blue-600 hover:underline text-xs font-bold"><Download className="h-3 w-3 inline mr-1" />Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">{toast}</div>}
    </div>
  )
}

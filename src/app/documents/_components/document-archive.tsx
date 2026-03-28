'use client'

import { useState, useMemo } from 'react'
import { StatusBadge, FilterBar, DateRangePicker } from '@/components/shared'
import type { Document } from '@/types'
import { ArchiveDetailModal } from './archive-detail-modal'

interface DocumentArchiveProps {
  documents: Document[]
}

const typeOptions = [
  { label: 'Pay Slip', value: 'pay_slip' },
  { label: 'CPF Statement', value: 'cpf_statement' },
  { label: 'Employment Letter', value: 'employment_letter' },
]

const statusOptions = [
  { label: 'Auto-Verified', value: 'auto_verified' },
  { label: 'Manually Verified', value: 'manually_verified' },
  { label: 'Rejected', value: 'rejected' },
]

export function DocumentArchive({ documents }: DocumentArchiveProps) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('__all__')
  const [statusFilter, setStatusFilter] = useState('__all__')
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  const archived = useMemo(() => documents.filter((d) => d.verifiedBy), [documents])

  const filtered = useMemo(() => {
    let result = archived
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((d) =>
        d.traineeName.toLowerCase().includes(q) ||
        d.type.replace(/_/g, ' ').toLowerCase().includes(q),
      )
    }
    if (typeFilter !== '__all__') result = result.filter((d) => d.type === typeFilter)
    if (statusFilter !== '__all__') result = result.filter((d) => d.status === statusFilter)
    if (dateRange.from) result = result.filter((d) => d.submittedDate >= dateRange.from)
    if (dateRange.to) result = result.filter((d) => d.submittedDate <= dateRange.to)
    return result
  }, [archived, search, typeFilter, statusFilter, dateRange])

  const paySlips = archived.filter((d) => d.type === 'pay_slip').length
  const cpfStatements = archived.filter((d) => d.type === 'cpf_statement').length
  const empLetters = archived.filter((d) => d.type === 'employment_letter').length

  return (
    <div className="space-y-4">
      {/* Archive Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Documents</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{archived.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Pay Slips</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{paySlips}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase">CPF Statements</p>
          <p className="text-2xl font-black text-teal-600 mt-1">{cpfStatements}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Employment Letters</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">{empLetters}</p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={[
          { id: 'type', label: 'All Types', options: typeOptions, value: typeFilter, onChange: setTypeFilter },
          { id: 'status', label: 'All Statuses', options: statusOptions, value: statusFilter, onChange: setStatusFilter },
        ]}
        searchPlaceholder="Search by trainee, type..."
        searchValue={search}
        onSearchChange={setSearch}
      >
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </FilterBar>

      {/* Results count */}
      <p className="text-xs text-slate-500">{filtered.length} of {archived.length} documents</p>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-4 py-4">Trainee</th>
                <th className="px-4 py-4">Document Type</th>
                <th className="px-4 py-4">Submitted</th>
                <th className="px-4 py-4 text-center">OCR Confidence</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Verified By</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">No documents found</td></tr>
              )}
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                  <td className="px-4 py-4 font-bold text-slate-900">{doc.traineeName}</td>
                  <td className="px-4 py-4 text-xs text-slate-600 capitalize">{doc.type.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{doc.submittedDate}</td>
                  <td className="px-4 py-4 text-center text-xs font-bold text-slate-700">{doc.ocrConfidence}%</td>
                  <td className="px-4 py-4"><StatusBadge status={doc.status} /></td>
                  <td className="px-4 py-4 text-xs text-slate-500">{doc.verifiedBy === 'system' ? 'System (Auto)' : 'Sarah Tan'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDoc && (
        <ArchiveDetailModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  )
}

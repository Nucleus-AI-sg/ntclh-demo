'use client'

import { useState, useMemo } from 'react'
import { StatusBadge, FilterBar } from '@/components/shared'
import type { Document } from '@/types'

interface DocumentArchiveProps {
  documents: Document[]
}

export function DocumentArchive({ documents }: DocumentArchiveProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return documents
    const q = search.toLowerCase()
    return documents.filter((d) =>
      d.traineeName.toLowerCase().includes(q) ||
      d.type.replace(/_/g, ' ').toLowerCase().includes(q),
    )
  }, [documents, search])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          <span className="font-bold text-slate-900">{documents.length}</span> documents archived
        </div>
        <FilterBar
          searchPlaceholder="Search by trainee, type..."
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="px-6 py-4">Trainee</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4 text-center">OCR Confidence</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No documents found</td></tr>
              )}
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{doc.traineeName}</td>
                  <td className="px-6 py-4 text-xs text-slate-600 capitalize">{doc.type.replace(/_/g, ' ')}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{doc.submittedDate}</td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-slate-700">{doc.ocrConfidence}%</td>
                  <td className="px-6 py-4"><StatusBadge status={doc.status} /></td>
                  <td className="px-6 py-4"><StatusBadge status={doc.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

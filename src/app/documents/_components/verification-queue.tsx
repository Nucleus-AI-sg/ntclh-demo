'use client'

import { useState, useMemo } from 'react'
import { DataTable, FilterBar, StatusBadge } from '@/components/shared'
import type { Column } from '@/components/shared'
import type { Document } from '@/types'
import { scoreColour } from '@/lib/colours'
import { cn } from '@/lib/utils'

interface VerificationQueueProps {
  documents: Document[]
  onSelectDocument: (doc: Document) => void
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onBatchApprove: () => void
}

export function VerificationQueue({ documents, onSelectDocument, selectedIds, onSelectionChange, onBatchApprove }: VerificationQueueProps) {
  const [typeFilter, setTypeFilter] = useState('__all__')
  const [statusFilter, setStatusFilter] = useState('__all__')

  const active = documents.filter((d) => !['manually_verified', 'rejected'].includes(d.status) || d.status === 'auto_verified')

  const filtered = useMemo(() => {
    let result = active
    if (typeFilter !== '__all__') result = result.filter((d) => d.type === typeFilter)
    if (statusFilter !== '__all__') result = result.filter((d) => d.status === statusFilter)
    return result
  }, [active, typeFilter, statusFilter])

  const typeOptions = [
    { label: 'Pay Slip', value: 'pay_slip' },
    { label: 'CPF Statement', value: 'cpf_statement' },
    { label: 'Employment Letter', value: 'employment_letter' },
  ]
  const statusOptions = [
    { label: 'Pending', value: 'submitted' },
    { label: 'Auto-Verified', value: 'auto_verified' },
    { label: 'Flagged', value: 'flagged' },
  ]

  const columns: Column<Document>[] = [
    { key: 'traineeName', header: 'Trainee', sortable: true, render: (row) => <span className="font-bold text-slate-900">{row.traineeName}</span> },
    { key: 'type', header: 'Document Type', sortable: true, render: (row) => <span className="text-xs text-slate-600 capitalize">{row.type.replace(/_/g, ' ')}</span> },
    { key: 'submittedDate', header: 'Submitted', sortable: true, render: (row) => <span className="text-xs text-slate-500">{row.submittedDate}</span> },
    {
      key: 'ocrConfidence', header: 'OCR Confidence', sortable: true, className: 'text-center',
      render: (row) => {
        const colour = scoreColour(row.ocrConfidence)
        return <span className={cn('text-xs font-bold', colour.text)}>{row.ocrConfidence}%</span>
      },
    },
    { key: 'status', header: 'Status', sortable: true, render: (row) => <StatusBadge status={row.status} /> },
    { key: 'priority', header: 'Priority', sortable: true, render: (row) => <StatusBadge status={row.priority} /> },
  ]

  return (
    <div className="space-y-4">
      <FilterBar
        filters={[
          { id: 'type', label: 'All Types', options: typeOptions, value: typeFilter, onChange: setTypeFilter },
          { id: 'status', label: 'All Statuses', options: statusOptions, value: statusFilter, onChange: setStatusFilter },
        ]}
      />
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
          <span className="text-xs font-bold text-blue-700">{selectedIds.length} selected</span>
          <div className="flex gap-2">
            <button onClick={onBatchApprove} className="px-3 py-1.5 text-xs font-bold text-green-600 border border-green-300 rounded hover:bg-green-50">Approve Selected</button>
            <button className="px-3 py-1.5 text-xs font-bold text-red-600 border border-red-300 rounded hover:bg-red-50">Flag Selected</button>
          </div>
        </div>
      )}
      <DataTable
        columns={columns}
        data={filtered}
        keyField="id"
        onRowClick={onSelectDocument}
        isRowHighlighted={(row) => row.status === 'flagged'}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
        pageSize={10}
      />
    </div>
  )
}

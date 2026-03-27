'use client'

import { useState, useMemo } from 'react'
import {
  DataTable,
  FilterBar,
  StatusBadge,
  BulkActionBar,
  RangeSliderFilter,
  DateRangePicker,
} from '@/components/shared'
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
  onBatchFlag: () => void
  onBatchResubmit: () => void
}

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

const programmeOptions = [
  { label: 'ICT Career Conversion (SCTP)', value: 'ICT Career Conversion (SCTP)' },
  { label: 'Business Analyst Certification', value: 'Business Analyst Certification' },
  { label: 'Digital Marketing Bootcamp', value: 'Digital Marketing Bootcamp' },
]

export function VerificationQueue({
  documents,
  onSelectDocument,
  selectedIds,
  onSelectionChange,
  onBatchApprove,
  onBatchFlag,
  onBatchResubmit,
}: VerificationQueueProps) {
  const [typeFilter, setTypeFilter] = useState('__all__')
  const [statusFilter, setStatusFilter] = useState('__all__')
  const [programmeFilter, setProgrammeFilter] = useState('__all__')
  const [ocrRange, setOcrRange] = useState<[number, number]>([0, 100])
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })

  const filtered = useMemo(() => {
    let result = documents
    if (typeFilter !== '__all__') result = result.filter((d) => d.type === typeFilter)
    if (statusFilter !== '__all__') result = result.filter((d) => d.status === statusFilter)
    if (programmeFilter !== '__all__') result = result.filter((d) => d.programmeTrack === programmeFilter)
    if (ocrRange[0] > 0 || ocrRange[1] < 100) {
      result = result.filter((d) => d.ocrConfidence >= ocrRange[0] && d.ocrConfidence <= ocrRange[1])
    }
    if (dateRange.from) result = result.filter((d) => d.submittedDate >= dateRange.from)
    if (dateRange.to) result = result.filter((d) => d.submittedDate <= dateRange.to)
    return result
  }, [documents, typeFilter, statusFilter, programmeFilter, ocrRange, dateRange])

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
          { id: 'programme', label: 'All Programmes', options: programmeOptions, value: programmeFilter, onChange: setProgrammeFilter },
        ]}
      >
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </FilterBar>

      <RangeSliderFilter
        label="OCR Confidence Range"
        value={ocrRange}
        onChange={setOcrRange}
        className="max-w-sm"
      />

      <BulkActionBar
        selectedCount={selectedIds.length}
        onClear={() => onSelectionChange([])}
        actions={[
          { label: 'Approve Selected', onClick: onBatchApprove },
          { label: 'Flag Selected', variant: 'outline', onClick: onBatchFlag },
          { label: 'Request Resubmission', variant: 'destructive', onClick: onBatchResubmit },
        ]}
      />

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

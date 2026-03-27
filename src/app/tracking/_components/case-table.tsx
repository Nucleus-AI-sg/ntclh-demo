'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { DataTable, FilterBar, StatusBadge, BulkActionBar } from '@/components/shared'
import type { Column } from '@/components/shared'
import type { Trainee, Programme, Document } from '@/types'
import { LifecycleStage } from '@/types'

interface CaseTableProps {
  trainees: Trainee[]
  programmes: Programme[]
  documents: Document[]
  statusFilter: string | null
  onSelectTrainee: (trainee: Trainee) => void
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  onBulkReminder: () => void
  onBulkStatus: () => void
}

const postTrainingStages = new Set([
  LifecycleStage.Completed, LifecycleStage.Placed, LifecycleStage.Verified,
])

function getDocStatus(docs: Document[]): string {
  if (docs.length === 0) return 'none'
  if (docs.some((d) => d.status === 'flagged')) return 'flagged'
  if (docs.every((d) => d.status === 'auto_verified' || d.status === 'manually_verified')) return 'verified'
  return 'submitted'
}

function DocScoreBadge({ score }: { score: number | undefined }) {
  if (score == null) return <span className="text-xs text-slate-400">-</span>
  const colour = score >= 80 ? 'text-green-700 bg-green-50' : score >= 60 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50'
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colour}`}>{score}%</span>
}

function RiskBadge({ assessment }: { assessment: Trainee['riskAssessment'] }) {
  if (!assessment) return <span className="text-xs text-slate-400">-</span>
  const colours = { low: 'text-green-700 bg-green-50', medium: 'text-amber-700 bg-amber-50', high: 'text-red-700 bg-red-50' }
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded capitalize ${colours[assessment.level]}`}>{assessment.level}</span>
}

export function CaseTable({ trainees, programmes, documents, statusFilter, onSelectTrainee, selectedIds, onSelectionChange, onBulkReminder, onBulkStatus }: CaseTableProps) {
  const [progFilter, setProgFilter] = useState('__all__')
  const [search, setSearch] = useState('')

  const progMap = Object.fromEntries(programmes.map((p) => [p.id, p.shortName]))
  const docsByTrainee = useMemo(() => {
    const map: Record<string, Document[]> = {}
    for (const d of documents) { (map[d.traineeId] ??= []).push(d) }
    return map
  }, [documents])

  const postTraining = trainees.filter((t) => postTrainingStages.has(t.lifecycleStage))

  const filtered = useMemo(() => {
    let result = postTraining
    if (progFilter !== '__all__') result = result.filter((t) => t.programmeId === progFilter)
    if (search) { const q = search.toLowerCase(); result = result.filter((t) => t.name.toLowerCase().includes(q)) }
    if (statusFilter) {
      result = result.filter((t) => {
        const docStatus = getDocStatus(docsByTrainee[t.id] ?? [])
        if (statusFilter === 'awaiting') return docStatus === 'none'
        if (statusFilter === 'submitted') return docStatus === 'submitted'
        if (statusFilter === 'auto_verified') return docStatus === 'verified' && t.lifecycleStage !== LifecycleStage.Verified
        if (statusFilter === 'flagged') return docStatus === 'flagged'
        if (statusFilter === 'non_responsive') return t.riskLevel === 'at_risk' && t.daysInStage > 60
        if (statusFilter === 'verified') return t.lifecycleStage === LifecycleStage.Verified
        return true
      })
    }
    return result
  }, [postTraining, progFilter, search, statusFilter, docsByTrainee])

  const programmeOptions = programmes.map((p) => ({ label: p.shortName, value: p.id }))

  const columns: Column<Trainee>[] = [
    {
      key: 'name', header: 'Trainee', sortable: true,
      render: (row) => (
        <Link href={`/trainee/${row.id}`} className="font-bold text-slate-900 hover:text-blue-600">
          {row.name}
        </Link>
      ),
    },
    { key: 'programmeId', header: 'Programme', sortable: true, render: (row) => <span className="text-xs text-slate-600">{progMap[row.programmeId] ?? row.programmeId}</span> },
    { key: 'employmentStatus', header: 'Emp. Status', sortable: true, render: (row) => row.employmentStatus ? <StatusBadge status={row.employmentStatus} /> : <span className="text-xs text-slate-400">-</span> },
    {
      key: 'documents', header: 'Documents', render: (row) => {
        const status = getDocStatus(docsByTrainee[row.id] ?? [])
        return <StatusBadge status={status === 'none' ? 'not_submitted' : status} />
      },
    },
    { key: 'docVerificationScore', header: 'Doc Score', sortable: true, className: 'text-center', render: (row) => <DocScoreBadge score={row.docVerificationScore} /> },
    { key: 'riskAssessment', header: 'Risk', render: (row) => <RiskBadge assessment={row.riskAssessment} /> },
    { key: 'daysInStage', header: 'Days', sortable: true, className: 'text-center', render: (row) => <span className={`text-xs font-bold ${row.daysInStage > 60 ? 'text-red-600' : 'text-slate-700'}`}>{row.daysInStage}</span> },
    { key: 'lastActivity', header: 'Last Activity', sortable: true, render: (row) => <span className="text-xs text-slate-500 truncate max-w-[160px] block">{row.lastActivity}</span> },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Case Management</h3>
        <FilterBar
          filters={[{ id: 'programme', label: 'All Programmes', options: programmeOptions, value: progFilter, onChange: setProgFilter }]}
          searchPlaceholder="Search trainees..."
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>
      <BulkActionBar
        selectedCount={selectedIds.length}
        actions={[
          { label: 'Send Reminder', onClick: onBulkReminder },
          { label: 'Update Status', onClick: onBulkStatus },
        ]}
        onClear={() => onSelectionChange([])}
      />
      <DataTable
        columns={columns}
        data={filtered}
        keyField="id"
        onRowClick={onSelectTrainee}
        isRowHighlighted={(row) => row.riskLevel === 'at_risk'}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
        pageSize={10}
        emptyMessage="No trainees match the current filters"
      />
    </div>
  )
}

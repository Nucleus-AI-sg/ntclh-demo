'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  StatusBadge,
  DataTable,
  ConfirmationModal,
  useActionToast,
  ActionToast,
} from '@/components/shared'
import type { Column } from '@/components/shared'
import type { Cohort, Trainee } from '@/types'
import { CohortStatus } from '@/types'

interface CohortManagementTabProps {
  cohorts: Cohort[]
  trainees: Trainee[]
  onEditCohort?: (cohort: Cohort) => void
}

const rosterColumns: Column<Trainee>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (t) => (
      <Link href={`/trainee/${t.id}`} className="text-blue-600 hover:underline font-medium">
        {t.name}
      </Link>
    ),
  },
  {
    key: 'lifecycleStage',
    header: 'Stage',
    render: (t) => <StatusBadge status={t.lifecycleStage} />,
  },
  {
    key: 'riskLevel',
    header: 'Risk',
    render: (t) => <StatusBadge status={t.riskLevel} />,
  },
  {
    key: 'lastActivity',
    header: 'Last Activity',
    render: (t) => <span className="text-slate-500">{t.lastActivity ?? '-'}</span>,
  },
]

const statusOptions = [
  { value: CohortStatus.Enrolling, label: 'Enrolling' },
  { value: CohortStatus.Active, label: 'Active' },
  { value: CohortStatus.Completed, label: 'Completed' },
]

export function CohortManagementTab({ cohorts: initialCohorts, trainees, onEditCohort }: CohortManagementTabProps) {
  const [cohorts, setCohorts] = useState(initialCohorts)
  const [expandedCohort, setExpandedCohort] = useState<string | null>(null)
  const [statusChange, setStatusChange] = useState<{ cohortId: string; newStatus: CohortStatus } | null>(null)
  const [toast, showToast] = useActionToast()

  const confirmStatusChange = () => {
    if (!statusChange) return
    setCohorts((prev) =>
      prev.map((c) => (c.id === statusChange.cohortId ? { ...c, status: statusChange.newStatus } : c))
    )
    showToast(`Cohort status updated to ${statusChange.newStatus}`)
    setStatusChange(null)
  }

  return (
    <div className="space-y-3">
      {cohorts.map((cohort) => {
        const cohortTrainees = trainees.filter((t) => t.cohortId === cohort.id)
        return (
          <div key={cohort.id} className="bg-white rounded-xl overflow-hidden">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
              onClick={() => setExpandedCohort(expandedCohort === cohort.id ? null : cohort.id)}
            >
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-slate-900">{cohort.name}</p>
                <StatusBadge status={cohort.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{cohort.enrolledCount}/{cohort.capacity} enrolled</span>
                <span>{cohort.startDate} - {cohort.endDate}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={(e) => { e.stopPropagation(); onEditCohort?.(cohort) }}
                >
                  <Pencil className="h-3.5 w-3.5 text-slate-400" />
                </Button>
                <div onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={cohort.status}
                    onValueChange={(v) => setStatusChange({ cohortId: cohort.id, newStatus: v as CohortStatus })}
                  >
                    <SelectTrigger className="h-7 w-[110px] text-[10px] border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {expandedCohort === cohort.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>

            {expandedCohort === cohort.id && (
              <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-4">
                <dl className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold text-slate-400 uppercase">Completion Rate</dt>
                    <dd className="font-black text-slate-900">{cohort.completionRate != null ? `${cohort.completionRate}%` : 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold text-slate-400 uppercase">Placement Rate</dt>
                    <dd className="font-black text-slate-900">{cohort.placementRate != null ? `${cohort.placementRate}%` : 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold text-slate-400 uppercase">Capacity</dt>
                    <dd className="font-black text-slate-900">{cohort.capacity}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold text-slate-400 uppercase">Enrolled</dt>
                    <dd className="font-black text-slate-900">{cohort.enrolledCount}</dd>
                  </div>
                </dl>

                {cohortTrainees.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Trainee Roster ({cohortTrainees.length})
                    </h4>
                    <DataTable data={cohortTrainees} columns={rosterColumns} pageSize={5} />
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}

      <ConfirmationModal
        open={statusChange !== null}
        onConfirm={confirmStatusChange}
        onCancel={() => setStatusChange(null)}
        title="Change Cohort Status"
        description={`Are you sure you want to change the cohort status to "${statusChange?.newStatus}"?`}
        confirmLabel="Update Status"
      />

      <ActionToast message={toast} />
    </div>
  )
}

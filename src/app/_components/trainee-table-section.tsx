'use client'

import { useState, useMemo } from 'react'
import { DataTable, FilterBar, StatusBadge } from '@/components/shared'
import type { Column } from '@/components/shared'
import type { Trainee, Programme } from '@/types'
import { LifecycleStage, RiskLevel } from '@/types'
import { TraineeSlideOver } from './trainee-slide-over'

interface TraineeTableSectionProps {
  trainees: Trainee[]
  programmes: Programme[]
}

const stageOptions = Object.values(LifecycleStage).map((s) => ({
  label: s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  value: s,
}))

const riskOptions = [
  { label: 'On Track', value: 'on_track' },
  { label: 'At Risk', value: 'at_risk' },
]

export function TraineeTableSection({ trainees, programmes }: TraineeTableSectionProps) {
  const [progFilter, setProgFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Trainee | null>(null)

  const programmeOptions = programmes.map((p) => ({ label: p.shortName, value: p.id }))

  const filtered = useMemo(() => {
    let result = trainees
    if (progFilter !== 'all') result = result.filter((t) => t.programmeId === progFilter)
    if (stageFilter !== 'all') result = result.filter((t) => t.lifecycleStage === stageFilter)
    if (riskFilter !== 'all') result = result.filter((t) => t.riskLevel === riskFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) => t.name.toLowerCase().includes(q))
    }
    return result
  }, [trainees, progFilter, stageFilter, riskFilter, search])

  const progMap = Object.fromEntries(programmes.map((p) => [p.id, p.shortName]))

  const columns: Column<Trainee>[] = [
    {
      key: 'name',
      header: 'Trainee Name',
      sortable: true,
      render: (row) => {
        const initials = row.name.split(' ').map((n) => n[0]).join('')
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-none">{row.name}</p>
              <p className="text-[10px] text-slate-400 mt-1">{row.cohortId}</p>
            </div>
          </div>
        )
      },
    },
    {
      key: 'programmeId',
      header: 'Programme',
      sortable: true,
      render: (row) => (
        <span className="text-xs font-medium text-slate-600">{progMap[row.programmeId] ?? row.programmeId}</span>
      ),
    },
    {
      key: 'lifecycleStage',
      header: 'Stage',
      sortable: true,
      render: (row) => <StatusBadge status={row.lifecycleStage} />,
    },
    {
      key: 'daysInStage',
      header: 'Days in Stage',
      sortable: true,
      className: 'text-center',
      render: (row) => (
        <span className={`text-xs font-bold ${row.riskLevel === RiskLevel.AtRisk ? 'text-red-600' : 'text-slate-700'}`}>
          {row.daysInStage}
        </span>
      ),
    },
    {
      key: 'lastActivity',
      header: 'Last Activity',
      sortable: true,
      render: (row) => <span className="text-xs text-slate-500">{row.lastActivity}</span>,
    },
  ]

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Active Trainee Monitoring
          </h3>
          <FilterBar
            filters={[
              { id: 'programme', label: 'All Programmes', options: programmeOptions, value: progFilter, onChange: setProgFilter },
              { id: 'stage', label: 'All Stages', options: stageOptions, value: stageFilter, onChange: setStageFilter },
              { id: 'risk', label: 'All Risk Levels', options: riskOptions, value: riskFilter, onChange: setRiskFilter },
            ]}
            searchPlaceholder="Search trainees..."
            searchValue={search}
            onSearchChange={setSearch}
          />
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          keyField="id"
          onRowClick={setSelected}
          isRowHighlighted={(row) => row.riskLevel === RiskLevel.AtRisk}
          pageSize={8}
          emptyMessage="No trainees match the current filters"
        />
      </div>
      <TraineeSlideOver
        trainee={selected}
        programmes={programmes}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  )
}

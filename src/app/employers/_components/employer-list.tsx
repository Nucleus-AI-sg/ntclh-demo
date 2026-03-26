'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Building2, Users, Briefcase, TrendingUp, Handshake } from 'lucide-react'
import { StatCard, DataTable, FilterBar, StatusBadge } from '@/components/shared'
import type { Column } from '@/components/shared'
import type { Employer, Vacancy } from '@/types'

interface EmployerListProps {
  employers: Employer[]
  vacancies: Vacancy[]
}

export function EmployerList({ employers, vacancies }: EmployerListProps) {
  const [sectorFilter, setSectorFilter] = useState('__all__')
  const [engagementFilter, setEngagementFilter] = useState('__all__')
  const [search, setSearch] = useState('')

  const vacancyCount = Object.fromEntries(employers.map((e) => [e.id, vacancies.filter((v) => v.employerId === e.id).length]))
  const sectors = [...new Set(employers.map((e) => e.sector))].map((s) => ({ label: s, value: s }))
  const engagementOptions = [{ label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }]

  const filtered = useMemo(() => {
    let result = employers
    if (sectorFilter !== '__all__') result = result.filter((e) => e.sector === sectorFilter)
    if (engagementFilter !== '__all__') result = result.filter((e) => e.engagementLevel === engagementFilter)
    if (search) { const q = search.toLowerCase(); result = result.filter((e) => e.name.toLowerCase().includes(q)) }
    return result
  }, [employers, sectorFilter, engagementFilter, search])

  const totalVacancies = vacancies.filter((v) => v.status === 'open').length
  const totalPlacements = employers.reduce((sum, e) => sum + e.totalPlacements, 0)

  const columns: Column<Employer>[] = [
    { key: 'name', header: 'Company', sortable: true, render: (row) => (
      <Link href={`/employer/${row.id}`} className="font-bold text-slate-900 hover:text-blue-600">{row.name}</Link>
    )},
    { key: 'sector', header: 'Sector', sortable: true, render: (row) => <span className="text-xs text-slate-600">{row.sector}</span> },
    { key: 'engagementLevel', header: 'Engagement', sortable: true, render: (row) => <StatusBadge status={row.engagementLevel} /> },
    { key: 'pipelineHealth', header: 'Pipeline', sortable: true, render: (row) => <StatusBadge status={row.pipelineHealth} label={row.pipelineHealth} /> },
    { key: 'vacancies', header: 'Vacancies', className: 'text-center', render: (row) => <span className="text-xs font-bold text-slate-700">{vacancyCount[row.id] ?? 0}</span> },
    { key: 'totalPlacements', header: 'Placements', sortable: true, className: 'text-center', render: (row) => <span className="text-xs font-bold text-slate-700">{row.totalPlacements}</span> },
    { key: 'lastContactDate', header: 'Last Contact', sortable: true, render: (row) => <span className="text-xs text-slate-500">{row.lastContactDate}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Employers" value={employers.length} icon={Building2} iconColour="blue" />
        <StatCard label="Open Vacancies" value={totalVacancies} icon={Briefcase} iconColour="teal" />
        <StatCard label="Total Placements" value={totalPlacements} icon={Handshake} iconColour="green" />
        <StatCard label="High Engagement" value={employers.filter((e) => e.engagementLevel === 'high').length} icon={TrendingUp} iconColour="indigo" />
        <StatCard label="Active Candidates" value={18} icon={Users} iconColour="amber" />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Employer Network</h3>
          <FilterBar
            filters={[
              { id: 'sector', label: 'All Sectors', options: sectors, value: sectorFilter, onChange: setSectorFilter },
              { id: 'engagement', label: 'All Engagement', options: engagementOptions, value: engagementFilter, onChange: setEngagementFilter },
            ]}
            searchPlaceholder="Search employers..."
            searchValue={search}
            onSearchChange={setSearch}
          />
        </div>
        <DataTable columns={columns} data={filtered} keyField="id" pageSize={10} />
      </div>
    </div>
  )
}

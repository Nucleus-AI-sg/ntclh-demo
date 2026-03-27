'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Building2, Briefcase, Clock, AlertTriangle, Handshake, Plus } from 'lucide-react'
import { StatCard, DataTable, FilterBar, StatusBadge, ExportButton, ActionToast, useActionToast, ComposeMessageModal } from '@/components/shared'
import type { Column } from '@/components/shared'
import type { Employer, Vacancy, Staff, Placement } from '@/types'
import { AddEmployerModal } from './add-employer-modal'

interface EmployerListProps {
  employers: Employer[]
  vacancies: Vacancy[]
  placements: Placement[]
  staff: Staff[]
}

export function EmployerList({ employers, vacancies, placements, staff }: EmployerListProps) {
  const [sectorFilter, setSectorFilter] = useState('__all__')
  const [engagementFilter, setEngagementFilter] = useState('__all__')
  const [managerFilter, setManagerFilter] = useState('__all__')
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [toast, showToast, clearToast] = useActionToast()

  const staffMap = Object.fromEntries(staff.map((s) => [s.id, s.name]))
  const vacancyCount = Object.fromEntries(employers.map((e) => [e.id, vacancies.filter((v) => v.employerId === e.id).length]))
  const sectors = [...new Set(employers.map((e) => e.sector))].map((s) => ({ label: s, value: s }))
  const engagementOptions = [{ label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }]
  const managerOptions = [...new Set(employers.map((e) => e.accountManagerId))].map((id) => ({ label: staffMap[id] ?? id, value: id }))

  const filtered = useMemo(() => {
    let result = employers
    if (sectorFilter !== '__all__') result = result.filter((e) => e.sector === sectorFilter)
    if (engagementFilter !== '__all__') result = result.filter((e) => e.engagementLevel === engagementFilter)
    if (managerFilter !== '__all__') result = result.filter((e) => e.accountManagerId === managerFilter)
    if (search) { const q = search.toLowerCase(); result = result.filter((e) => e.name.toLowerCase().includes(q)) }
    return result
  }, [employers, sectorFilter, engagementFilter, managerFilter, search])

  const totalOpenVacancies = vacancies.filter((v) => v.status === 'open' || v.status === 'screening' || v.status === 'interviewing').length
  const placementsThisQuarter = placements.filter((p) => {
    const d = new Date(p.submittedDate)
    const now = new Date()
    return d.getFullYear() === now.getFullYear() && Math.floor(d.getMonth() / 3) === Math.floor(now.getMonth() / 3)
  }).length
  const filledVacancies = vacancies.filter((v) => v.status === 'filled')
  const avgTimeToFill = filledVacancies.length > 0
    ? Math.round(filledVacancies.reduce((sum, v) => {
        const posted = new Date(v.postedDate).getTime()
        const now = Date.now()
        return sum + Math.round((now - posted) / (1000 * 60 * 60 * 24))
      }, 0) / filledVacancies.length)
    : 0
  const atRiskCount = employers.filter((e) => e.engagementLevel === 'low').length

  const columns: Column<Employer>[] = [
    { key: 'name', header: 'Company', sortable: true, render: (row) => (
      <Link href={`/employer/${row.id}`} className="font-bold text-slate-900 hover:text-blue-600">{row.name}</Link>
    )},
    { key: 'sector', header: 'Sector', sortable: true, render: (row) => <span className="text-xs text-slate-600">{row.sector}</span> },
    { key: 'accountManagerId', header: 'Account Manager', sortable: true, render: (row) => <span className="text-xs text-slate-600">{staffMap[row.accountManagerId] ?? '-'}</span> },
    { key: 'engagementLevel', header: 'Engagement', sortable: true, render: (row) => <StatusBadge status={row.engagementLevel} /> },
    { key: 'vacancies', header: 'Vacancies', className: 'text-center', render: (row) => <span className="text-xs font-bold text-slate-700">{vacancyCount[row.id] ?? 0}</span> },
    { key: 'totalPlacements', header: 'Placements (YTD)', sortable: true, className: 'text-center', render: (row) => <span className="text-xs font-bold text-slate-700">{row.totalPlacements}</span> },
    { key: 'lastContactDate', header: 'Last Contact', sortable: true, render: (row) => <span className="text-xs text-slate-500">{row.lastContactDate}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Employers" value={employers.length} icon={Building2} iconColour="blue" />
        <StatCard label="Open Vacancies" value={totalOpenVacancies} icon={Briefcase} iconColour="teal" />
        <StatCard label="Placements This Quarter" value={placementsThisQuarter} icon={Handshake} iconColour="green" />
        <StatCard label="Avg Time to Fill" value={`${avgTimeToFill}d`} icon={Clock} iconColour="indigo" />
        <StatCard label="At-Risk Relationships" value={atRiskCount} icon={AlertTriangle} iconColour="red" />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Employer Network</h3>
          <div className="flex items-center gap-2">
            <FilterBar
              filters={[
                { id: 'sector', label: 'All Sectors', options: sectors, value: sectorFilter, onChange: setSectorFilter },
                { id: 'engagement', label: 'All Engagement', options: engagementOptions, value: engagementFilter, onChange: setEngagementFilter },
                { id: 'manager', label: 'All Managers', options: managerOptions, value: managerFilter, onChange: setManagerFilter },
              ]}
              searchPlaceholder="Search employers..."
              searchValue={search}
              onSearchChange={setSearch}
            />
          </div>
        </div>
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <button onClick={() => setShowMessageModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Send Message</button>
          <ExportButton label="Export Report" formats={['CSV', 'PDF']} showToast={showToast} />
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"><Plus className="h-3.5 w-3.5" />Add Employer</button>
        </div>
        <DataTable columns={columns} data={filtered} keyField="id" pageSize={10} />
      </div>

      <AddEmployerModal open={showAddModal} onClose={() => setShowAddModal(false)} onSave={() => { setShowAddModal(false); showToast('Employer added successfully') }} />
      <ComposeMessageModal open={showMessageModal} onClose={() => setShowMessageModal(false)} onSend={() => showToast('Message sent')} recipient="All Employers" />
      <ActionToast message={toast} onDismiss={clearToast} />
    </div>
  )
}

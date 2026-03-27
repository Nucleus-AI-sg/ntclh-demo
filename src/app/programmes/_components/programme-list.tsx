'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { StatusBadge, AppBarChart, FilterBar } from '@/components/shared'
import type { FilterConfig } from '@/components/shared'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Programme, Cohort, ProgrammeMetrics } from '@/types'

interface ProgrammeListProps {
  programmes: Programme[]
  cohorts: Cohort[]
  metrics: ProgrammeMetrics[]
}

const colours = ['bg-blue-500', 'bg-teal-500', 'bg-indigo-500']
type SortKey = 'name' | 'duration' | 'placement'

export function ProgrammeList({ programmes, cohorts, metrics }: ProgrammeListProps) {
  const [search, setSearch] = useState('')
  const [durationFilter, setDurationFilter] = useState('__all__')
  const [sortKey, setSortKey] = useState<SortKey>('name')

  const durationOptions = useMemo(() => {
    const durations = [...new Set(programmes.map((p) => p.durationWeeks))].sort((a, b) => a - b)
    return durations.map((d) => ({ label: `${d} weeks`, value: String(d) }))
  }, [programmes])

  const filters: FilterConfig[] = [
    { id: 'duration', label: 'All Durations', options: durationOptions, value: durationFilter, onChange: setDurationFilter },
  ]

  const filtered = useMemo(() => {
    let result = programmes
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q))
    }
    if (durationFilter !== '__all__') {
      result = result.filter((p) => p.durationWeeks === Number(durationFilter))
    }
    result = [...result].sort((a, b) => {
      if (sortKey === 'duration') return a.durationWeeks - b.durationWeeks
      if (sortKey === 'placement') return b.placementRate - a.placementRate
      return a.name.localeCompare(b.name)
    })
    return result
  }, [programmes, search, durationFilter, sortKey])

  const comparisonData = metrics.map((m) => {
    const prog = programmes.find((p) => p.id === m.programmeId)
    return { name: prog?.shortName ?? m.programmeId, completion: m.completionRate, placement: m.placementRate, conversion: m.enrolmentConversion }
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <FilterBar filters={filters} searchPlaceholder="Search programmes..." searchValue={search} onSearchChange={setSearch}>
        <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
          <SelectTrigger className="h-8 w-auto min-w-[160px] text-xs border-slate-200 rounded-lg">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort: Name</SelectItem>
            <SelectItem value="duration">Sort: Duration</SelectItem>
            <SelectItem value="placement">Sort: Placement Rate</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      {/* Programme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((prog) => {
          const i = programmes.indexOf(prog)
          const progCohorts = cohorts.filter((c) => c.programmeId === prog.id)
          const activeCohorts = progCohorts.filter((c) => c.status === 'active').length
          const m = metrics.find((pm) => pm.programmeId === prog.id)
          return (
            <Link key={prog.id} href={`/programme/${prog.id}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn('w-3 h-3 rounded-full', colours[i % colours.length])} />
                <h3 className="text-sm font-bold text-slate-900">{prog.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p><p className="font-black text-slate-900">{prog.durationWeeks} weeks</p></div>
                <div><p className="text-[10px] font-bold text-slate-400 uppercase">Active Cohorts</p><p className="font-black text-slate-900">{activeCohorts}</p></div>
                <div><p className="text-[10px] font-bold text-slate-400 uppercase">Placement Rate</p><p className="font-black text-slate-900">{m?.placementRate ?? prog.placementRate}%</p></div>
                <div><p className="text-[10px] font-bold text-slate-400 uppercase">Total Cohorts</p><p className="font-black text-slate-900">{progCohorts.length}</p></div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Cohort Timeline (Gantt-style) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cohort Timeline</h3>
        <div className="space-y-2">
          {cohorts.map((cohort) => {
            const prog = programmes.find((p) => p.id === cohort.programmeId)
            const progIdx = programmes.findIndex((p) => p.id === cohort.programmeId)
            return (
              <div key={cohort.id} className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 w-20 truncate">{prog?.shortName}</span>
                <span className="text-[10px] text-slate-400 w-16">{cohort.name}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 relative">
                  <div className={cn('h-full rounded-full flex items-center justify-center text-[9px] font-bold text-white', colours[progIdx % colours.length])} style={{ width: `${Math.min(100, (cohort.enrolledCount / cohort.capacity) * 100)}%`, minWidth: '60px' }}>
                    {cohort.enrolledCount}/{cohort.capacity}
                  </div>
                </div>
                <StatusBadge status={cohort.status} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Cross-Programme Comparison */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cross-Programme Comparison</h3>
        <AppBarChart
          data={comparisonData}
          bars={[
            { key: 'completion', label: 'Completion %', colour: '#2563eb' },
            { key: 'placement', label: 'Placement %', colour: '#0d9488' },
            { key: 'conversion', label: 'Conversion %', colour: '#6366f1' },
          ]}
          xKey="name"
          height={250}
          showLegend
        />
      </div>
    </div>
  )
}

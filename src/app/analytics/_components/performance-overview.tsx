'use client'

import { useState, useMemo } from 'react'
import { Users, TrendingUp, Target, Clock, AlertTriangle } from 'lucide-react'
import { StatCard, AppBarChart, AppLineChart, AppFunnelChart, ExportButton, DateRangePicker, useActionToast, ActionToast } from '@/components/shared'
import type { MonthlyMetric, ProgrammeMetrics, Trainee } from '@/types'
import { LifecycleStage } from '@/types'
import { programmeNames } from '@/data'
import { FunnelDrillDownModal } from './funnel-drill-down-modal'

interface DashboardKpi { value: number; trend?: number; trendDirection?: 'up' | 'down' }

interface PerformanceOverviewProps {
  monthlyMetrics: MonthlyMetric[]
  programmeMetrics: ProgrammeMetrics[]
  placementFunnel: { stage: string; count: number; conversionRate: number }[]
  trainees: Trainee[]
  kpis: {
    totalActiveTrainees: DashboardKpi
    overallPlacementRate: DashboardKpi & { target: number }
    atRiskPlacements: DashboardKpi
  }
}

const funnelStageMap: Record<string, LifecycleStage[]> = {
  'Applications Received': Object.values(LifecycleStage),
  'Enrolled': [LifecycleStage.Enrolled, LifecycleStage.Training, LifecycleStage.Completed, LifecycleStage.Placed, LifecycleStage.Verified],
  'Completed Training': [LifecycleStage.Completed, LifecycleStage.Placed, LifecycleStage.Verified],
  'Employment Verified': [LifecycleStage.Placed, LifecycleStage.Verified],
  '6-Month Retention': [LifecycleStage.Verified],
}

function deriveAlerts(metrics: ProgrammeMetrics[]): { risk: string; action: string }[] {
  const alerts: { risk: string; action: string }[] = []
  for (const m of metrics) {
    const name = programmeNames[m.programmeId] ?? m.programmeId
    if (m.placementRate < 70) {
      alerts.push({ risk: `${name} placement rate (${m.placementRate}%) trending below 70% target`, action: `Review employer engagement for ${name} roles` })
    }
    if (m.avgTimeToPlacement > 40) {
      alerts.push({ risk: `${name} average time to placement is ${m.avgTimeToPlacement} days (above 40-day threshold)`, action: `Accelerate matching for ${name} trainees` })
    }
    if (m.completionRate < 82) {
      alerts.push({ risk: `${name} completion rate (${m.completionRate}%) below 82% benchmark`, action: `Investigate dropout patterns and add learner support for ${name}` })
    }
  }
  return alerts.slice(0, 4)
}

export function PerformanceOverview({ monthlyMetrics, programmeMetrics, placementFunnel, trainees, kpis }: PerformanceOverviewProps) {
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })
  const [funnelStage, setFunnelStage] = useState<string | null>(null)
  const [toast, showToast] = useActionToast()

  const barData = programmeMetrics.map((pm) => ({
    name: programmeNames[pm.programmeId] ?? pm.programmeId,
    rate: pm.placementRate,
    target: 80,
  }))
  const avgCompletion = programmeMetrics.length > 0 ? Math.round(programmeMetrics.reduce((s, m) => s + m.completionRate, 0) / programmeMetrics.length) : 0
  const avgTimeToPlace = programmeMetrics.length > 0 ? Math.round(programmeMetrics.reduce((s, m) => s + m.avgTimeToPlacement, 0) / programmeMetrics.length) : 0
  const atRiskAlerts = useMemo(() => deriveAlerts(programmeMetrics), [programmeMetrics])

  const funnelTrainees = useMemo(() => {
    if (!funnelStage) return []
    const stages = funnelStageMap[funnelStage]
    if (!stages) return []
    return trainees.filter((t) => stages.includes(t.lifecycleStage))
  }, [funnelStage, trainees])

  const handleFunnelClick = (entry: { name: string }) => {
    const stageName = entry.name.replace(/\s*\(\d+%\)/, '')
    setFunnelStage(stageName)
  }

  return (
    <div className="space-y-4">
      {/* Header with DateRangePicker and Export */}
      <div className="flex items-center justify-between">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <ExportButton label="Export Overview" showToast={showToast} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Active Trainees" value={kpis.totalActiveTrainees.value} icon={Users} iconColour="blue" trend={{ value: `+${kpis.totalActiveTrainees.trend}`, direction: 'up' }} />
        <StatCard label="Placement Rate" value={`${kpis.overallPlacementRate.value}%`} icon={TrendingUp} iconColour="teal" trend={{ value: `+${kpis.overallPlacementRate.trend}%`, direction: 'up' }} />
        <StatCard label="Completion Rate" value={`${avgCompletion}%`} icon={Target} iconColour="green" />
        <StatCard label="Avg Time to Place" value={`${avgTimeToPlace} days`} icon={Clock} iconColour="amber" />
        <StatCard label="At-Risk Count" value={kpis.atRiskPlacements.value} icon={AlertTriangle} iconColour="red" valueClassName="text-red-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Placement Rate by Programme</h3>
          <AppBarChart
            data={barData}
            bars={[
              { key: 'rate', label: 'Placement Rate', colour: '#2563eb' },
              { key: 'target', label: 'Target (80%)', colour: '#e2e8f0' },
            ]}
            xKey="name"
            height={250}
            showLegend
          />
        </div>
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Placement Funnel</h3>
          <AppFunnelChart
            data={placementFunnel.map((s) => ({ name: `${s.stage} (${s.conversionRate}%)`, value: s.count }))}
            height={250}
            onClick={handleFunnelClick}
          />
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Monthly Trends (12 Months)</h3>
        <AppLineChart
          data={monthlyMetrics}
          lines={[
            { key: 'enrolments', label: 'Enrolments', colour: '#2563eb' },
            { key: 'completions', label: 'Completions', colour: '#0d9488' },
            { key: 'placements', label: 'Placements', colour: '#6366f1' },
            { key: 'verifications', label: 'Verifications', colour: '#f59e0b' },
          ]}
          xKey="month"
          height={280}
          showLegend
        />
      </div>

      {/* At-Risk Alerts */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" /> AI-Identified Risks
        </h3>
        <div className="space-y-3">
          {atRiskAlerts.map((alert, i) => (
            <div key={i} className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-xs font-bold text-red-700">{alert.risk}</p>
              <p className="text-[10px] text-red-600 mt-1">Suggested: {alert.action}</p>
            </div>
          ))}
        </div>
      </div>

      <FunnelDrillDownModal open={!!funnelStage} onClose={() => setFunnelStage(null)} stageName={funnelStage ?? ''} trainees={funnelTrainees} />
      <ActionToast message={toast} />
    </div>
  )
}

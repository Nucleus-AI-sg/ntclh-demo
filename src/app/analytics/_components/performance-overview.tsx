import { Users, TrendingUp, Target, Clock, AlertTriangle } from 'lucide-react'
import { StatCard, AppBarChart, AppLineChart, AppFunnelChart } from '@/components/shared'
import type { MonthlyMetric, ProgrammeMetrics } from '@/types'

interface PerformanceOverviewProps {
  monthlyMetrics: MonthlyMetric[]
  programmeMetrics: ProgrammeMetrics[]
  placementFunnel: { stage: string; count: number; conversionRate: number }[]
}

const programmeNames: Record<string, string> = { ict: 'ICT SCTP', ba: 'BA Cert', dm: 'DM Bootcamp' }

export function PerformanceOverview({ monthlyMetrics, programmeMetrics, placementFunnel }: PerformanceOverviewProps) {
  const barData = programmeMetrics.map((pm) => ({
    name: programmeNames[pm.programmeId] ?? pm.programmeId,
    rate: pm.placementRate,
    target: 80,
  }))

  const atRiskAlerts = [
    { risk: 'DM Bootcamp placement rate (68%) trending below 70% target', action: 'Review employer engagement for digital marketing roles' },
    { risk: '4 non-responsive trainees exceeding 90-day threshold', action: 'Escalate to manual outreach with phone calls' },
    { risk: 'ICT Jun 2026 cohort under-enrolled (8/25 capacity)', action: 'Boost recruitment campaign for ICT programme' },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Active Trainees" value={76} icon={Users} iconColour="blue" trend={{ value: '+8', direction: 'up' }} />
        <StatCard label="Placement Rate" value="72%" icon={TrendingUp} iconColour="teal" trend={{ value: '+4%', direction: 'up' }} />
        <StatCard label="Completion Rate" value="83%" icon={Target} iconColour="green" />
        <StatCard label="Avg Time to Place" value="38 days" icon={Clock} iconColour="amber" />
        <StatCard label="At-Risk Count" value={5} icon={AlertTriangle} iconColour="red" valueClassName="text-red-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Rate by Programme */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
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

        {/* Placement Funnel */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Placement Funnel</h3>
          <AppFunnelChart data={placementFunnel.map((s) => ({ name: `${s.stage} (${s.conversionRate}%)`, value: s.count }))} height={250} />
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
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
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
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
    </div>
  )
}

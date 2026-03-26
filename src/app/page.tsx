import { Users, Handshake, ClipboardCheck, AlertTriangle } from 'lucide-react'
import {
  alerts,
  trainees,
  programmes,
  dashboardKpis,
  pipelineCounts,
  activityEvents,
} from '@/data'
import { LifecycleStage } from '@/types'
import { StatCard, PipelineBar, ScoreGauge, ActivityFeed } from '@/components/shared'
import { MorningAlerts } from './_components/morning-alerts'
import { ProgrammeCards } from './_components/programme-cards'
import { TraineeTableSection } from './_components/trainee-table-section'
import { QuickActions } from './_components/quick-actions'

const kpis = dashboardKpis
const pipeline: Partial<Record<LifecycleStage, number>> = {
  [LifecycleStage.Applied]: pipelineCounts.applied,
  [LifecycleStage.Enrolled]: pipelineCounts.enrolled,
  [LifecycleStage.Training]: pipelineCounts.training,
  [LifecycleStage.Completed]: pipelineCounts.completed,
  [LifecycleStage.Placed]: pipelineCounts.placed,
  [LifecycleStage.Verified]: pipelineCounts.verified,
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Morning Alerts */}
      <MorningAlerts alerts={alerts} />

      {/* Programme Summary Cards */}
      <ProgrammeCards />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Active Trainees"
          value={kpis.totalActiveTrainees.value}
          icon={Users}
          iconColour="blue"
          trend={{ value: `+${kpis.totalActiveTrainees.trend}`, direction: kpis.totalActiveTrainees.trendDirection }}
        />
        <StatCard
          label="Placement Rate"
          value={`${kpis.overallPlacementRate.value}%`}
          icon={Handshake}
          iconColour="teal"
          subtitle="Global Avg"
        />
        <StatCard
          label="Pending Verification"
          value={kpis.pendingVerifications.value}
          icon={ClipboardCheck}
          iconColour="amber"
          subtitle="Review Required"
        />
        <StatCard
          label="At-Risk Placements"
          value={kpis.atRiskPlacements.value}
          icon={AlertTriangle}
          iconColour="red"
          valueClassName="text-red-600"
          subtitle="Immediate Action"
        />
      </div>

      {/* Placement Pipeline */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Placement Pipeline Overview
          </h3>
        </div>
        <PipelineBar counts={pipeline} />
      </div>

      {/* Main Content: Table + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Trainee Table (2/3 width) */}
        <div className="xl:col-span-2">
          <TraineeTableSection trainees={trainees} programmes={programmes} />
        </div>

        {/* Right Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Placement Target Gauge */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">
              Placement Target Goal
            </h3>
            <div className="flex justify-center">
              <ScoreGauge score={kpis.overallPlacementRate.value} size="lg" label="Efficiency" />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> Successful
                </span>
                <span className="font-bold text-slate-900">142</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-slate-200" /> Target Gap
                </span>
                <span className="font-bold text-slate-900">58</span>
              </div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                Live Activity
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
            </div>
            <ActivityFeed events={activityEvents} maxItems={5} showViewAll />
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

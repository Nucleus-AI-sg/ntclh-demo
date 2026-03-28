import { MorningAlerts } from './_components/morning-alerts'
import { ProgrammeCards } from './_components/programme-cards'
import { KeyMetrics } from './_components/key-metrics'
import { PipelineOverview } from './_components/pipeline-overview'
import { TraineeTableSection } from './_components/trainee-table-section'
import { PlacementGauge } from './_components/placement-gauge'
import { ActivityFeedPanel } from './_components/activity-feed-panel'
import { QuickActions } from './_components/quick-actions'

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <MorningAlerts />
      <ProgrammeCards />
      <KeyMetrics />
      <PipelineOverview />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 pb-4">
        <div className="xl:col-span-2">
          <TraineeTableSection />
        </div>
        <div className="space-y-4">
          <PlacementGauge />
          <ActivityFeedPanel />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

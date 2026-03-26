import { monthlyMetrics, programmeMetrics, placementFunnel, reportTemplates, programmes, cohorts } from '@/data'
import { AnalyticsPage } from './_components/analytics-page'

export default function AnalyticsRoute() {
  return (
    <AnalyticsPage
      monthlyMetrics={monthlyMetrics}
      programmeMetrics={programmeMetrics}
      placementFunnel={placementFunnel}
      reportTemplates={reportTemplates}
      programmes={programmes}
      cohorts={cohorts}
    />
  )
}

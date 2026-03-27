import { monthlyMetrics, programmeMetrics, placementFunnel, reportTemplates, reportHistory, dataCompletenessChecks, programmes, cohorts, dashboardKpis, trainees, sectorBreakdown, employerPerformanceData } from '@/data'
import { AnalyticsPage } from './_components/analytics-page'

export default function AnalyticsRoute() {
  return (
    <AnalyticsPage
      monthlyMetrics={monthlyMetrics}
      programmeMetrics={programmeMetrics}
      placementFunnel={placementFunnel}
      reportTemplates={reportTemplates}
      reportHistory={reportHistory}
      dataCompletenessChecks={dataCompletenessChecks}
      programmes={programmes}
      cohorts={cohorts}
      trainees={trainees}
      sectorBreakdown={sectorBreakdown}
      employerPerformance={employerPerformanceData}
      kpis={dashboardKpis}
    />
  )
}

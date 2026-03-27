'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { MonthlyMetric, ProgrammeMetrics, ReportTemplate, ReportHistoryEntry, DataCompletenessCheck, Programme, Cohort, Trainee, EmployerPerformanceEntry, SectorEntry } from '@/types'
import { PerformanceOverview } from './performance-overview'
import { ProgrammeDeepDive } from './programme-deep-dive'
import { ComplianceReports } from './compliance-reports'

interface DashboardKpi { value: number; trend?: number; trendDirection?: 'up' | 'down' }

interface AnalyticsPageProps {
  monthlyMetrics: MonthlyMetric[]
  programmeMetrics: ProgrammeMetrics[]
  placementFunnel: { stage: string; count: number; conversionRate: number }[]
  reportTemplates: ReportTemplate[]
  reportHistory: ReportHistoryEntry[]
  dataCompletenessChecks: DataCompletenessCheck[]
  programmes: Programme[]
  cohorts: Cohort[]
  trainees: Trainee[]
  sectorBreakdown: SectorEntry[]
  employerPerformance: EmployerPerformanceEntry[]
  kpis: {
    totalActiveTrainees: DashboardKpi
    overallPlacementRate: DashboardKpi & { target: number }
    atRiskPlacements: DashboardKpi
  }
}

const tabs = [
  { id: 'performance', label: 'Performance Overview' },
  { id: 'programme', label: 'Programme Deep Dive' },
  { id: 'compliance', label: 'Compliance Reports' },
] as const

export function AnalyticsPage(props: AnalyticsPageProps) {
  return (
    <Tabs defaultValue="performance" className="w-full">
      <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="performance" className="mt-6">
        <PerformanceOverview monthlyMetrics={props.monthlyMetrics} programmeMetrics={props.programmeMetrics} placementFunnel={props.placementFunnel} trainees={props.trainees} kpis={props.kpis} />
      </TabsContent>
      <TabsContent value="programme" className="mt-6">
        <ProgrammeDeepDive programmes={props.programmes} cohorts={props.cohorts} programmeMetrics={props.programmeMetrics} sectorBreakdown={props.sectorBreakdown} employerPerformance={props.employerPerformance} />
      </TabsContent>
      <TabsContent value="compliance" className="mt-6">
        <ComplianceReports reportTemplates={props.reportTemplates} reportHistory={props.reportHistory} dataCompletenessChecks={props.dataCompletenessChecks} />
      </TabsContent>
    </Tabs>
  )
}

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { AiPerformanceSnapshot, ModelVersion, OverridePattern, StrategicInsight, FeatureImportance } from '@/types'
import { AssessmentPerformance } from './assessment-performance'
import { FeedbackOverrides } from './feedback-overrides'
import { StrategicInsights } from './strategic-insights'
import { ModelTransparency } from './model-transparency'

interface AiInsightsPageProps {
  history: AiPerformanceSnapshot[]
  modelVersions: ModelVersion[]
  overridePatterns: OverridePattern[]
  strategicInsights: StrategicInsight[]
  assessmentFeatures: FeatureImportance[]
  matchingFeatures: FeatureImportance[]
}

const tabs = [
  { id: 'assessment', label: 'Assessment Performance' },
  { id: 'feedback', label: 'Coordinator Feedback' },
  { id: 'strategic', label: 'Strategic Intelligence' },
  { id: 'transparency', label: 'Model Transparency' },
] as const

export function AiInsightsPage(props: AiInsightsPageProps) {
  return (
    <Tabs defaultValue="assessment" className="w-full">
      <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="assessment" className="mt-6">
        <AssessmentPerformance history={props.history} />
      </TabsContent>
      <TabsContent value="feedback" className="mt-6">
        <FeedbackOverrides overridePatterns={props.overridePatterns} history={props.history} />
      </TabsContent>
      <TabsContent value="strategic" className="mt-6">
        <StrategicInsights insights={props.strategicInsights} />
      </TabsContent>
      <TabsContent value="transparency" className="mt-6">
        <ModelTransparency assessmentFeatures={props.assessmentFeatures} matchingFeatures={props.matchingFeatures} modelVersions={props.modelVersions} />
      </TabsContent>
    </Tabs>
  )
}

import {
  aiPerformanceHistory, modelVersions, overridePatterns,
  strategicInsights, assessmentFeatureImportance, matchingFeatureImportance,
} from '@/data'
import { AiInsightsPage } from './_components/ai-insights-page'

export default function AiInsightsRoute() {
  return (
    <AiInsightsPage
      history={aiPerformanceHistory}
      modelVersions={modelVersions}
      overridePatterns={overridePatterns}
      strategicInsights={strategicInsights}
      assessmentFeatures={assessmentFeatureImportance}
      matchingFeatures={matchingFeatureImportance}
    />
  )
}

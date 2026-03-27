import { AppLineChart, AppHeatmapChart, ScoreGauge } from '@/components/shared'
import { predictionMatrix, recommendationStats } from '@/data'
import type { AiPerformanceSnapshot } from '@/types'

function StatBox({ label, value, colour = 'text-slate-900' }: { label: string; value: string; colour?: string }) {
  return (
    <div className="border border-slate-200 rounded-lg p-3 text-center">
      <p className={`text-xl font-black ${colour}`}>{value}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
    </div>
  )
}

interface AssessmentPerformanceProps {
  history: AiPerformanceSnapshot[]
}

export function AssessmentPerformance({ history }: AssessmentPerformanceProps) {
  const latest = history[history.length - 1]

  return (
    <div className="space-y-6">
      {/* Health Score */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-6">
        <ScoreGauge score={latest?.overallAccuracy ?? 0} size="lg" label="AI Health" />
        <div>
          <h3 className="text-lg font-bold text-slate-900">Overall AI Accuracy: {latest?.overallAccuracy}%</h3>
          <p className="text-xs text-slate-500 mt-1">Assessment: {latest?.assessmentAccuracy}% | Matching: {latest?.matchingAccuracy}% | Verification: {latest?.verificationAccuracy}%</p>
          <p className="text-xs text-green-600 font-bold mt-1">+13% improvement since launch (Oct 2025)</p>
        </div>
      </div>

      {/* Accuracy Over Time */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Accuracy Over Time</h3>
        <AppLineChart
          data={history}
          lines={[
            { key: 'assessmentAccuracy', label: 'Assessment', colour: '#2563eb' },
            { key: 'matchingAccuracy', label: 'Matching', colour: '#0d9488' },
            { key: 'verificationAccuracy', label: 'Verification', colour: '#6366f1' },
            { key: 'overallAccuracy', label: 'Overall', colour: '#f59e0b', dashed: true },
          ]}
          xKey="month"
          height={280}
          showLegend
        />
      </div>

      {/* Prediction vs Outcome Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Prediction vs Outcome Accuracy (%)</h3>
        <AppHeatmapChart
          data={predictionMatrix}
          xLabels={['ICT', 'BA', 'DM']}
          yLabels={['Predicted High', 'Predicted Medium', 'Predicted Low']}
        />
      </div>

      {/* Recommendation Engine Stats */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Recommendation Engine Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatBox label="Total Recommendations" value={recommendationStats.totalRecommendations.toLocaleString()} />
          <StatBox label="Acceptance Rate" value={`${recommendationStats.acceptanceRate}%`} colour="text-blue-600" />
          <StatBox label="Recommendation to Placement" value={`${recommendationStats.placementConversion}%`} colour="text-teal-600" />
          <StatBox label="Avg Confidence Score" value={`${recommendationStats.avgConfidenceScore}%`} colour="text-indigo-600" />
          <StatBox label="High Confidence Placement" value={`${recommendationStats.highConfidencePlacement}%`} colour="text-green-600" />
          <StatBox label="Low Confidence Placement" value={`${recommendationStats.lowConfidencePlacement}%`} colour="text-amber-600" />
        </div>
        <p className="text-xs text-slate-500 mt-3">
          High-confidence recommendations (score &gt;80%) convert to placements at {recommendationStats.highConfidencePlacement}%, compared to {recommendationStats.lowConfidencePlacement}% for low-confidence (score &lt;60%).
        </p>
      </div>
    </div>
  )
}

import { AppBarChart } from '@/components/shared'
import type { FeatureImportance, ModelVersion } from '@/types'

interface ModelTransparencyProps {
  assessmentFeatures: FeatureImportance[]
  matchingFeatures: FeatureImportance[]
  modelVersions: ModelVersion[]
}

export function ModelTransparency({ assessmentFeatures, matchingFeatures, modelVersions }: ModelTransparencyProps) {
  const assessData = assessmentFeatures.map((f) => ({ name: f.feature, weight: Math.round(f.weight * 100) }))
  const matchData = matchingFeatures.map((f) => ({ name: f.feature, weight: Math.round(f.weight * 100) }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Assessment Feature Importance */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Assessment Model - Feature Importance</h3>
          <AppBarChart data={assessData} bars={[{ key: 'weight', label: 'Weight (%)', colour: '#2563eb' }]} xKey="name" height={250} />
        </div>

        {/* Matching Feature Importance */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Matching Model - Feature Importance</h3>
          <AppBarChart data={matchData} bars={[{ key: 'weight', label: 'Weight (%)', colour: '#0d9488' }]} xKey="name" height={250} />
        </div>
      </div>

      {/* Model Version History */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Model Version History</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead><tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <th className="px-5 py-3">Version</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Key Changes</th><th className="px-5 py-3">Improvement</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {modelVersions.map((v) => (
              <tr key={v.version} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-black text-blue-600">{v.version}</td>
                <td className="px-5 py-3 text-slate-500">{v.date}</td>
                <td className="px-5 py-3 font-bold text-slate-900">{v.keyChanges}</td>
                <td className="px-5 py-3 text-green-600 font-bold">{v.accuracyImprovement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

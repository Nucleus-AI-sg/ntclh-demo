import { Lightbulb, TrendingUp, GraduationCap, Briefcase, BarChart3 } from 'lucide-react'
import type { StrategicInsight } from '@/types'
import { cn } from '@/lib/utils'

interface StrategicInsightsProps {
  insights: StrategicInsight[]
}

const categoryConfig: Record<string, { icon: React.ReactNode; colour: string; label: string }> = {
  enrolment: { icon: <GraduationCap className="h-4 w-4" />, colour: 'bg-blue-50 text-blue-700 border-blue-100', label: 'Enrolment' },
  training: { icon: <BarChart3 className="h-4 w-4" />, colour: 'bg-teal-50 text-teal-700 border-teal-100', label: 'Training' },
  placement: { icon: <Briefcase className="h-4 w-4" />, colour: 'bg-indigo-50 text-indigo-700 border-indigo-100', label: 'Placement' },
  labour_market: { icon: <TrendingUp className="h-4 w-4" />, colour: 'bg-amber-50 text-amber-700 border-amber-100', label: 'Labour Market' },
}

export function StrategicInsights({ insights }: StrategicInsightsProps) {
  const grouped: Partial<Record<StrategicInsight['category'], StrategicInsight[]>> = {}
  for (const insight of insights) {
    ;(grouped[insight.category] ??= []).push(insight)
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
        <Lightbulb className="h-5 w-5 text-blue-600" />
        <p className="text-sm font-medium text-blue-800">
          These insights are derived from pattern analysis across {insights.length} data points, covering enrolment, training, placement, and labour market trends.
        </p>
      </div>

      {Object.entries(categoryConfig).map(([key, config]) => {
        const items = grouped[key as StrategicInsight['category']] ?? []
        if (items.length === 0) return null
        return (
          <div key={key} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className={cn('text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 px-2 py-1 rounded-md border w-fit', config.colour)}>
              {config.icon} {config.label} Insights
            </h3>
            <div className="space-y-2.5">
              {items.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">-</span>
                  <div>
                    <p className="text-xs text-slate-700 leading-relaxed">{insight.insight}</p>
                    {insight.supportingData && (
                      <p className="text-[10px] text-slate-400 mt-1">{insight.supportingData}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

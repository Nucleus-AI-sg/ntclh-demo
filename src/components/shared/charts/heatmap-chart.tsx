import { cn } from '@/lib/utils'

interface HeatmapDataItem {
  x: string
  y: string
  value: number
}

interface AppHeatmapChartProps {
  data: HeatmapDataItem[]
  xLabels: string[]
  yLabels: string[]
  maxValue?: number
  height?: number
  className?: string
}

function interpolateColour(value: number, max: number): string {
  const ratio = Math.min(value / Math.max(max, 1), 1)
  if (ratio < 0.25) return 'bg-blue-50 text-blue-600'
  if (ratio < 0.5) return 'bg-blue-100 text-blue-700'
  if (ratio < 0.75) return 'bg-blue-200 text-blue-800'
  return 'bg-blue-400 text-white'
}

export function AppHeatmapChart({
  data,
  xLabels,
  yLabels,
  maxValue,
  className,
}: AppHeatmapChartProps) {
  const resolvedMax = maxValue ?? Math.max(...data.map((d) => d.value), 1)
  const lookup = new Map(data.map((d) => [`${d.y}-${d.x}`, d.value]))

  return (
    <div className={cn('overflow-x-auto', className)}>
      <div className="inline-grid" style={{ gridTemplateColumns: `80px repeat(${xLabels.length}, 1fr)` }}>
        {/* Header row */}
        <div />
        {xLabels.map((label) => (
          <div
            key={label}
            className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center px-2 py-2"
          >
            {label}
          </div>
        ))}
        {/* Data rows */}
        {yLabels.map((yLabel) => (
          <div key={yLabel} className="contents">
            <div className="text-[10px] font-bold text-slate-500 truncate pr-2 flex items-center">
              {yLabel}
            </div>
            {xLabels.map((xLabel) => {
              const val = lookup.get(`${yLabel}-${xLabel}`) ?? 0
              return (
                <div
                  key={`${yLabel}-${xLabel}`}
                  className={cn(
                    'flex items-center justify-center m-0.5 rounded text-[10px] font-bold min-w-[40px] h-8',
                    interpolateColour(val, resolvedMax),
                  )}
                >
                  {val > 0 ? val : ''}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

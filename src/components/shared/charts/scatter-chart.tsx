'use client'

import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ZAxis,
} from 'recharts'
import { chartColours, axisStyle, gridStyle } from './chart-colours'

interface AppScatterChartProps {
  data: { x: number; y: number; label?: string }[]
  xLabel?: string
  yLabel?: string
  xSuffix?: string
  ySuffix?: string
  height?: number
  colour?: string
  className?: string
}

export function AppScatterChart({
  data,
  xLabel = 'X',
  yLabel = 'Y',
  xSuffix = '',
  ySuffix = '',
  height = 300,
  colour,
  className,
}: AppScatterChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart margin={{ top: 8, right: 8, bottom: 4, left: -16 }}>
          <CartesianGrid {...gridStyle} />
          <XAxis type="number" dataKey="x" name={xLabel} {...axisStyle} />
          <YAxis type="number" dataKey="y" name={yLabel} {...axisStyle} />
          <ZAxis range={[40, 40]} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ payload }) => {
              if (!payload?.length) return null
              const d = payload[0].payload as { x: number; y: number; label?: string }
              return (
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
                  {d.label && <p className="font-bold text-slate-900 mb-1">{d.label}</p>}
                  <p className="text-slate-600">{xLabel}: {d.x}{xSuffix}</p>
                  <p className="text-slate-600">{yLabel}: {d.y}{ySuffix}</p>
                </div>
              )
            }}
          />
          <Scatter
            data={data}
            fill={colour ?? chartColours.palette[0]}
            fillOpacity={0.7}
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

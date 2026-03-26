'use client'

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { chartColours, tooltipStyle } from './chart-colours'

interface RadarConfig {
  key: string
  colour?: string
  label?: string
  fillOpacity?: number
}

interface AppRadarChartProps {
  data: Record<string, unknown>[]
  radars: RadarConfig[]
  angleKey?: string
  height?: number
  showLegend?: boolean
  className?: string
}

export function AppRadarChart({
  data,
  radars,
  angleKey = 'skill',
  height = 300,
  showLegend = false,
  className,
}: AppRadarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey={angleKey}
            tick={{ fontSize: 10, fill: '#64748b' }}
          />
          <PolarRadiusAxis
            tick={{ fontSize: 9, fill: '#94a3b8' }}
            axisLine={false}
          />
          <Tooltip {...tooltipStyle} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 11 }} />}
          {radars.map((radar, i) => (
            <Radar
              key={radar.key}
              dataKey={radar.key}
              name={radar.label ?? radar.key}
              stroke={radar.colour ?? chartColours.palette[i % chartColours.palette.length]}
              fill={radar.colour ?? chartColours.palette[i % chartColours.palette.length]}
              fillOpacity={radar.fillOpacity ?? 0.15}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}

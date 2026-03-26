'use client'

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { chartColours, tooltipStyle, axisStyle, gridStyle } from './chart-colours'

interface BarConfig {
  key: string
  colour?: string
  label?: string
  stackId?: string
}

interface AppBarChartProps {
  data: Record<string, unknown>[]
  bars: BarConfig[]
  xKey?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  className?: string
}

export function AppBarChart({
  data,
  bars,
  xKey = 'name',
  height = 300,
  showLegend = false,
  showGrid = true,
  className,
}: AppBarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          {showGrid && <CartesianGrid {...gridStyle} />}
          <XAxis dataKey={xKey} {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 11 }} />}
          {bars.map((bar, i) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label ?? bar.key}
              fill={bar.colour ?? chartColours.palette[i % chartColours.palette.length]}
              radius={[4, 4, 0, 0]}
              stackId={bar.stackId}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

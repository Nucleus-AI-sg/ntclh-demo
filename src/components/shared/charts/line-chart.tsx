'use client'

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { chartColours, tooltipStyle, axisStyle, gridStyle } from './chart-colours'

interface LineConfig {
  key: string
  colour?: string
  label?: string
  dashed?: boolean
}

interface AppLineChartProps {
  data: object[]
  lines: LineConfig[]
  xKey?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  className?: string
}

export function AppLineChart({
  data,
  lines,
  xKey = 'name',
  height = 300,
  showLegend = false,
  showGrid = true,
  className,
}: AppLineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          {showGrid && <CartesianGrid {...gridStyle} />}
          <XAxis dataKey={xKey} {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 11 }} />}
          {lines.map((line, i) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label ?? line.key}
              stroke={line.colour ?? chartColours.palette[i % chartColours.palette.length]}
              strokeWidth={2}
              strokeDasharray={line.dashed ? '5 5' : undefined}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

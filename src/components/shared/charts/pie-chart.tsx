'use client'

import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { chartColours, tooltipStyle } from './chart-colours'

interface PieDataItem {
  name: string
  value: number
  colour?: string
}

interface AppPieChartProps {
  data: PieDataItem[]
  innerRadius?: number
  height?: number
  showLegend?: boolean
  className?: string
}

export function AppPieChart({
  data,
  innerRadius = 0,
  height = 300,
  showLegend = true,
  className,
}: AppPieChartProps) {
  const coloured = data.map((d, i) => ({
    ...d,
    fill: d.colour ?? chartColours.palette[i % chartColours.palette.length],
  }))

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={coloured}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            paddingAngle={innerRadius > 0 ? 2 : 0}
          />
          <Tooltip {...tooltipStyle} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 11 }} />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

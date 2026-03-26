'use client'

import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { chartColours, tooltipStyle } from './chart-colours'

interface FunnelDataItem {
  name: string
  value: number
  colour?: string
}

interface AppFunnelChartProps {
  data: FunnelDataItem[]
  height?: number
  className?: string
}

export function AppFunnelChart({
  data,
  height = 300,
  className,
}: AppFunnelChartProps) {
  const coloured = data.map((d, i) => ({
    ...d,
    fill: d.colour ?? chartColours.palette[i % chartColours.palette.length],
  }))

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsFunnelChart>
          <Tooltip {...tooltipStyle} />
          <Funnel dataKey="value" data={coloured} isAnimationActive>
            <LabelList
              dataKey="name"
              position="right"
              style={{ fontSize: 11, fill: '#334155' }}
            />
            <LabelList
              dataKey="value"
              position="center"
              style={{ fontSize: 12, fontWeight: 700, fill: '#fff' }}
            />
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  )
}

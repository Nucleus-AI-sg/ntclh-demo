import { chartColours } from '@/lib/colours'

export { chartColours }

export const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    fontSize: '12px',
    padding: '8px 12px',
  },
} as const

export const axisStyle = {
  tick: { fontSize: 10, fill: '#94a3b8' },
  axisLine: { stroke: '#e2e8f0' },
  tickLine: false as const,
} as const

export const gridStyle = {
  strokeDasharray: '3 3',
  stroke: '#f1f5f9',
} as const

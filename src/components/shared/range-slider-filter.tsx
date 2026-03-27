'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RangeSliderFilterProps {
  label: string
  min?: number
  max?: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  formatValue?: (v: number) => string
  className?: string
}

export function RangeSliderFilter({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  formatValue = (v) => `${v}%`,
  className,
}: RangeSliderFilterProps) {
  const [localMin, setLocalMin] = useState(value[0])
  const [localMax, setLocalMax] = useState(value[1])

  const handleMinChange = (v: number) => {
    const clamped = Math.min(v, localMax)
    setLocalMin(clamped)
    onChange([clamped, localMax])
  }

  const handleMaxChange = (v: number) => {
    const clamped = Math.max(v, localMin)
    setLocalMax(clamped)
    onChange([localMin, clamped])
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-xs text-slate-500">
          {formatValue(localMin)} - {formatValue(localMax)}
        </span>
      </div>
      <div className="relative h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow"
        />
        <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full rounded bg-slate-200" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded bg-blue-500"
          style={{
            left: `${((localMin - min) / (max - min)) * 100}%`,
            width: `${((localMax - localMin) / (max - min)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

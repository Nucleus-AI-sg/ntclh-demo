'use client'

import { Search, ListFilter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  id: string
  label: string
  options: FilterOption[]
  value?: string
  onChange: (value: string) => void
}

interface FilterBarProps {
  filters?: FilterConfig[]
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  onFilterToggle?: () => void
  children?: React.ReactNode
  className?: string
}

export function FilterBar({
  filters = [],
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  onFilterToggle,
  children,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {filters.map((filter) => (
        <Select
          key={filter.id}
          value={filter.value}
          onValueChange={filter.onChange}
        >
          <SelectTrigger className="h-8 w-auto min-w-[140px] text-xs border-slate-200 rounded-lg">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{filter.label}</SelectItem>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue ?? ''}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 w-48 pl-8 text-xs border-slate-200 rounded-lg"
          />
        </div>
      )}
      {onFilterToggle && (
        <button
          onClick={onFilterToggle}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ListFilter className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>
  )
}

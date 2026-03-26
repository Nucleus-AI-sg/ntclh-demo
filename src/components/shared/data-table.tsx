'use client'

import { useState, useMemo, useCallback } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  isRowHighlighted?: (row: T) => boolean
  selectable?: boolean
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  keyField?: string
  pageSize?: number
  emptyMessage?: string
  className?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  isRowHighlighted,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  keyField = 'id',
  pageSize = 10,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
    setPage(0)
  }, [sortKey])

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null || bVal == null) return 0
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

  const allPageSelected =
    selectable && paged.length > 0 && paged.every((r) => selectedIds.includes(String(r[keyField])))

  const toggleAll = () => {
    if (!onSelectionChange) return
    const pageIds = paged.map((r) => String(r[keyField]))
    if (allPageSelected) {
      onSelectionChange(selectedIds.filter((id) => !pageIds.includes(id)))
    } else {
      onSelectionChange([...new Set([...selectedIds, ...pageIds])])
    }
  }

  const toggleRow = (id: string) => {
    if (!onSelectionChange) return
    onSelectionChange(
      selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id],
    )
  }

  return (
    <div className={cn('bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              {selectable && (
                <TableHead className="w-10 px-4">
                  <Checkbox checked={allPageSelected} onCheckedChange={toggleAll} />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    'text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4',
                    col.sortable && 'cursor-pointer select-none hover:text-slate-700',
                    col.className,
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc'
                        ? <ChevronUp className="h-3 w-3" />
                        : <ChevronDown className="h-3 w-3" />
                    )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm divide-y divide-slate-100">
            {paged.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center text-slate-400 py-12"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
            {paged.map((row) => {
              const id = String(row[keyField])
              const highlighted = isRowHighlighted?.(row) ?? false
              return (
                <TableRow
                  key={id}
                  className={cn(
                    'transition-colors',
                    highlighted ? 'bg-red-50/30 hover:bg-red-50' : 'hover:bg-slate-50',
                    onRowClick && 'cursor-pointer',
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {selectable && (
                    <TableCell className="w-10 px-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.includes(id)}
                        onCheckedChange={() => toggleRow(id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col, ci) => (
                    <TableCell
                      key={col.key}
                      className={cn(
                        'px-6 py-4',
                        highlighted && ci === 0 && 'border-l-4 border-red-500',
                        col.className,
                      )}
                    >
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {sorted.length > pageSize && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex gap-2">
            {[
              { icon: ChevronLeft, disabled: page === 0, go: () => setPage((p) => Math.max(0, p - 1)) },
              { icon: ChevronRight, disabled: page >= totalPages - 1, go: () => setPage((p) => Math.min(totalPages - 1, p + 1)) },
            ].map(({ icon: Icon, disabled, go }, i) => (
              <button key={i} onClick={go} disabled={disabled} className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 disabled:opacity-30">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

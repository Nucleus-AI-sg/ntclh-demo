'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface EditableField {
  label: string
  value: string | number | boolean
  type?: 'text' | 'number' | 'email' | 'date' | 'toggle'
  options?: string[]
}

interface EditableFormProps {
  fields: EditableField[]
  onSave: (values: Record<string, string | number | boolean>) => void
  className?: string
}

export function EditableForm({ fields, onSave, className }: EditableFormProps) {
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState<Record<string, string | number | boolean>>(
    Object.fromEntries(fields.map((f) => [f.label, f.value]))
  )

  const handleSave = () => {
    onSave(values)
    setEditing(false)
  }

  const handleCancel = () => {
    setValues(Object.fromEntries(fields.map((f) => [f.label, f.value])))
    setEditing(false)
  }

  const updateValue = (label: string, v: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [label]: v }))
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>Save</Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1">
            <label className="text-xs font-medium text-slate-500">{field.label}</label>
            {editing ? (
              field.type === 'toggle' ? (
                <Switch
                  checked={Boolean(values[field.label])}
                  onCheckedChange={(v) => updateValue(field.label, v)}
                />
              ) : (
                <Input
                  type={field.type ?? 'text'}
                  value={String(values[field.label] ?? '')}
                  onChange={(e) => updateValue(field.label, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                  className="h-8 text-sm"
                />
              )
            ) : (
              <div className="text-sm text-slate-900">
                {field.type === 'toggle' ? (values[field.label] ? 'Enabled' : 'Disabled') : String(values[field.label])}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

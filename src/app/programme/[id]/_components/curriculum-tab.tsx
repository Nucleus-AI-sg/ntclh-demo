'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useActionToast, ActionToast } from '@/components/shared'
import type { ModuleDefinition } from '@/types'

interface CurriculumTabProps {
  modules: ModuleDefinition[]
}

function scoreColour(score: number) {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-600'
}

export function CurriculumTab({ modules }: CurriculumTabProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [toast, showToast] = useActionToast()

  return (
    <div className="space-y-3">
      {modules.map((mod) => (
        <div key={mod.id} className="bg-white rounded-xl overflow-hidden">
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
            onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black">
                {mod.order}
              </span>
              <p className="text-sm font-bold text-slate-900">{mod.name}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>{mod.durationWeeks} weeks</span>
              <span>{mod.instructor}</span>
              {expandedModule === mod.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>

          {expandedModule === mod.id && (
            <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div>
                  <p className="font-bold text-slate-700 mb-1">Assessment</p>
                  <p>{mod.assessmentType}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-700 mb-1">Instructor</p>
                  <p>{mod.instructor}</p>
                </div>
              </div>

              {mod.learningObjectives && mod.learningObjectives.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">Learning Objectives</p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                    {mod.learningObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {mod.prerequisites && mod.prerequisites.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">Prerequisites</p>
                  <p className="text-xs text-slate-600">{mod.prerequisites.join(', ')}</p>
                </div>
              )}

              {mod.averageScore != null && (
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">Average Historical Score</p>
                  <p className={`text-sm font-black ${scoreColour(mod.averageScore)}`}>{mod.averageScore}%</p>
                </div>
              )}

              <div className="pt-1">
                <Button variant="outline" size="sm" className="text-xs" onClick={(e) => { e.stopPropagation(); showToast('Module editor opened') }}>
                  <Pencil className="h-3 w-3 mr-1" /> Edit Module
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => showToast('New module form opened')}>
        <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Module
      </Button>

      <ActionToast message={toast} />
    </div>
  )
}

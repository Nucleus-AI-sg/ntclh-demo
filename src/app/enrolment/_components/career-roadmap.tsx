import { TrendingUp } from 'lucide-react'
import type { Trainee, Programme } from '@/types'

interface CareerRoadmapProps {
  trainee: Trainee
  programme: Programme | undefined
}

export function CareerRoadmap({ trainee, programme }: CareerRoadmapProps) {
  const steps = [
    { label: 'Current', value: trainee.currentRole, colour: 'bg-blue-600 text-white shadow-lg' },
    { label: '6-Month Goal', value: programme?.shortName ?? 'Programme', colour: 'bg-teal-500 text-white shadow-lg' },
    { label: 'Target Role', value: `Junior ${programme?.shortName?.split(' ')[0] ?? 'Analyst'}`, colour: 'bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400' },
  ]

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center">
        <TrendingUp className="h-4 w-4 mr-2 text-teal-600" />
        Projected Career Roadmap
      </h3>
      <div className="relative px-4">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100" />
        <div className="relative flex justify-between">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-[120px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 mb-3 ${step.colour}`}>
                {i + 1}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{step.label}</p>
              <p className="text-xs font-bold text-slate-800">{step.value}</p>
            </div>
          ))}
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 self-center flex items-center">
            <div className="mr-4">
              <p className="text-[10px] font-black text-teal-700 uppercase tracking-tighter">Salary Target</p>
              <p className="text-xl font-black text-teal-800">$4,200 - $5,500</p>
            </div>
            <TrendingUp className="h-5 w-5 text-teal-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

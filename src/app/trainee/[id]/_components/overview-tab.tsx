import { User, GraduationCap, Briefcase, Mail, Phone, MapPin } from 'lucide-react'
import { StatCard, ActivityFeed } from '@/components/shared'
import { ModuleStatus } from '@/types'
import type { Trainee, Programme, Assessment, ActivityEvent, ModuleProgress, Placement } from '@/types'

interface OverviewTabProps {
  trainee: Trainee
  programme: Programme | undefined
  assessment: Assessment | undefined
  events: ActivityEvent[]
  modules: ModuleProgress[]
  placements: Placement[]
}

export function OverviewTab({ trainee, programme, assessment, events, modules, placements }: OverviewTabProps) {
  const modulesCompleted = modules.filter((m) => m.status === ModuleStatus.Completed).length
  const totalModules = modules.length || (programme?.modules.length ?? 0)
  const activePlacements = placements.filter((p) => p.status === 'available' || p.status === 'submitted').length

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Days in Programme" value={trainee.daysInStage} icon={User} iconColour="blue" />
        <StatCard label="Training Progress" value={`${modulesCompleted}/${totalModules}`} icon={GraduationCap} iconColour="teal" subtitle={`${totalModules > 0 ? Math.round((modulesCompleted / totalModules) * 100) : 0}%`} />
        <StatCard label="AI Suitability" value={assessment ? `${assessment.overallScore}%` : 'N/A'} icon={Briefcase} iconColour="indigo" />
        <StatCard label="Placement Matches" value={activePlacements} icon={User} iconColour="green" subtitle="Active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Personal Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" /> {trainee.email}
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" /> {trainee.phone}
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400" /> {trainee.address}
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <GraduationCap className="h-4 w-4 text-slate-400" /> {trainee.highestQualification}, {trainee.institution} ({trainee.graduationYear})
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Briefcase className="h-4 w-4 text-slate-400" /> {trainee.currentRole} at {trainee.currentEmployer} ({trainee.yearsExperience} years)
            </div>
          </div>
        </div>

        {/* Career Goals & Activity */}
        <div className="space-y-6">
          {trainee.careerGoals && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Career Goals</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{trainee.careerGoals}</p>
            </div>
          )}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Recent Activity</h3>
            <ActivityFeed events={events} maxItems={5} />
          </div>
        </div>
      </div>
    </div>
  )
}

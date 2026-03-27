'use client'

import { useState, useCallback } from 'react'
import { Users, Briefcase, Send, TrendingUp, MessageSquare } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard, ExportButton, useActionToast, ActionToast } from '@/components/shared'
import type { Employer, Vacancy, Trainee, Programme, MatchResult, Placement } from '@/types'
import { EmployerView } from './employer-view'
import { TraineeMatchingView } from './trainee-matching-view'
import { EmployerPortal } from './employer-portal'
import { CandidateComparison } from './candidate-comparison'
import { ActivityLog } from './activity-log'

interface MatchingPageProps {
  employers: Employer[]
  vacancies: Vacancy[]
  trainees: Trainee[]
  programmes: Programme[]
  matches: MatchResult[]
  placements: Placement[]
}

export function MatchingPage({ employers, vacancies, trainees, programmes, matches, placements }: MatchingPageProps) {
  const [toast, showToast] = useActionToast()
  const [selectedEmployerId, setSelectedEmployerId] = useState(employers[0]?.id ?? '')
  const [activityLog, setActivityLog] = useState<{ time: string; entry: string }[]>([
    { time: '10:32', entry: 'Marcus Lee submitted to TechCorp Pte Ltd' },
    { time: '10:15', entry: 'Priya Sharma bookmarked for Junior BA' },
    { time: '09:48', entry: 'Wei Ming moved to Shortlisted at TechCorp' },
  ])

  const logActivity = useCallback((entry: string) => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    setActivityLog((prev) => [{ time, entry }, ...prev].slice(0, 20))
  }, [])

  return (
    <div className="space-y-6">
      {/* Dashboard Metrics */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
          <StatCard label="Open Vacancies" value={vacancies.filter((v) => v.status === 'open' || v.status === 'screening' || v.status === 'interviewing').length} icon={Briefcase} iconColour="blue" subtitle={`${employers.length} employers`} />
          <StatCard label="Available Trainees" value={18} icon={Users} iconColour="teal" subtitle="Seeking placement" />
          <StatCard label="Submitted (Month)" value={8} icon={Send} iconColour="green" />
          <StatCard label="Interview Rate" value="62%" icon={TrendingUp} iconColour="amber" />
          <StatCard label="Active Discussions" value={5} icon={MessageSquare} iconColour="indigo" />
        </div>
        <div className="ml-4 flex-shrink-0">
          <ExportButton label="Export" showToast={showToast} />
        </div>
      </div>

      {/* 4-View Tabs */}
      <Tabs defaultValue="employer" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {[
            { id: 'employer', label: 'By Employer' },
            { id: 'trainee', label: 'By Trainee' },
            { id: 'compare', label: 'Compare' },
            { id: 'portal', label: 'Employer Portal' },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="employer" className="mt-6">
          <div className="flex gap-6">
            <div className="flex-1 min-w-0">
              <EmployerView
                employers={employers}
                vacancies={vacancies}
                matches={matches}
                trainees={trainees}
                selectedEmployerId={selectedEmployerId}
                onSelectEmployer={setSelectedEmployerId}
                onSubmit={(t, e) => showToast(`${t} submitted to ${e}`)}
                onLogActivity={logActivity}
              />
            </div>
            <ActivityLog entries={activityLog} />
          </div>
        </TabsContent>
        <TabsContent value="trainee" className="mt-6">
          <TraineeMatchingView trainees={trainees} vacancies={vacancies} programmes={programmes} />
        </TabsContent>
        <TabsContent value="compare" className="mt-6">
          <CandidateComparison matches={matches} trainees={trainees} vacancies={vacancies} onSubmit={(t, v) => showToast(`${t} submitted for ${v}`)} />
        </TabsContent>
        <TabsContent value="portal" className="mt-6">
          <EmployerPortal employer={employers.find((e) => e.id === selectedEmployerId)} vacancies={vacancies.filter((v) => v.employerId === selectedEmployerId)} placements={placements} trainees={trainees} onAction={showToast} />
        </TabsContent>
      </Tabs>

      <ActionToast message={toast} />
    </div>
  )
}

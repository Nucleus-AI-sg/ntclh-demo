'use client'

import { useState, useCallback } from 'react'
import { Users, Briefcase, Send, TrendingUp, MessageSquare } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/shared'
import type { Employer, Vacancy, Trainee, Programme, MatchResult, Placement } from '@/types'
import { EmployerView } from './employer-view'
import { TraineeMatchingView } from './trainee-matching-view'
import { EmployerPortal } from './employer-portal'

interface MatchingPageProps {
  employers: Employer[]
  vacancies: Vacancy[]
  trainees: Trainee[]
  programmes: Programme[]
  matches: MatchResult[]
  placements: Placement[]
}

export function MatchingPage({ employers, vacancies, trainees, programmes, matches, placements }: MatchingPageProps) {
  const [toast, setToast] = useState<string | null>(null)
  const [selectedEmployerId, setSelectedEmployerId] = useState(employers[0]?.id ?? '')

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  return (
    <div className="space-y-6">
      {/* Dashboard Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Open Vacancies" value={vacancies.filter((v) => v.status === 'open').length} icon={Briefcase} iconColour="blue" subtitle={`${employers.length} employers`} />
        <StatCard label="Available Trainees" value={18} icon={Users} iconColour="teal" subtitle="Seeking placement" />
        <StatCard label="Submitted (Month)" value={8} icon={Send} iconColour="green" />
        <StatCard label="Interview Rate" value="62%" icon={TrendingUp} iconColour="amber" />
        <StatCard label="Active Discussions" value={5} icon={MessageSquare} iconColour="indigo" />
      </div>

      {/* 3-View Tabs */}
      <Tabs defaultValue="employer" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {[
            { id: 'employer', label: 'By Employer' },
            { id: 'trainee', label: 'By Trainee' },
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
          <EmployerView employers={employers} vacancies={vacancies} matches={matches} trainees={trainees} selectedEmployerId={selectedEmployerId} onSelectEmployer={setSelectedEmployerId} onSubmit={(t, e) => showToast(`${t} submitted to ${e}`)} />
        </TabsContent>
        <TabsContent value="trainee" className="mt-6">
          <TraineeMatchingView trainees={trainees} vacancies={vacancies} programmes={programmes} />
        </TabsContent>
        <TabsContent value="portal" className="mt-6">
          <EmployerPortal employer={employers.find((e) => e.id === selectedEmployerId)} vacancies={vacancies.filter((v) => v.employerId === selectedEmployerId)} placements={placements} trainees={trainees} onAction={showToast} />
        </TabsContent>
      </Tabs>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-bold">
          {toast}
        </div>
      )}
    </div>
  )
}

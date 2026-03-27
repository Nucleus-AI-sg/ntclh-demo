'use client'

import { useMemo } from 'react'
import { Mail, MessageSquare, Phone, Smartphone } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/shared'
import type { Communication, OutreachSequence, MessageTemplate, Campaign } from '@/types'
import { ActivityFeedTab } from './activity-feed-tab'
import { SequencesTab } from './sequences-tab'
import { TemplatesTab } from './templates-tab'
import { CampaignsTab } from './campaigns-tab'
import { AnalyticsTab } from './analytics-tab'

interface CommunicationsPageProps {
  communications: Communication[]
  sequences: OutreachSequence[]
  templates: MessageTemplate[]
  campaigns: Campaign[]
}

const tabs = [
  { id: 'activity', label: 'Activity Feed' },
  { id: 'sequences', label: 'Automated Sequences' },
  { id: 'templates', label: 'Templates' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'analytics', label: 'Analytics' },
] as const

export function CommunicationsPage({ communications, sequences, templates, campaigns }: CommunicationsPageProps) {
  const channelStats = useMemo(() => {
    const stats = {
      email: { sent: 0, delivered: 0, opened: 0, responded: 0 },
      sms: { sent: 0, delivered: 0, opened: 0, responded: 0 },
      whatsapp: { sent: 0, delivered: 0, opened: 0, responded: 0 },
      phone: { sent: 0, delivered: 0, opened: 0, responded: 0 },
    }
    for (const c of communications) {
      const ch = stats[c.channel as keyof typeof stats]
      if (!ch) continue
      ch.sent++
      if (c.status !== 'sent' && c.status !== 'failed') ch.delivered++
      if (c.status === 'opened' || c.status === 'responded') ch.opened++
      if (c.status === 'responded') ch.responded++
    }
    return stats
  }, [communications])

  function responseRate(ch: keyof typeof channelStats) {
    const s = channelStats[ch]
    return s.sent > 0 ? Math.round((s.responded / s.sent) * 100) : 0
  }

  return (
    <div className="space-y-6">
      {/* Channel Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Email" value={`${channelStats.email.sent} sent`} icon={Mail} iconColour="blue" trend={{ value: `${responseRate('email')}% response`, direction: 'up' }} subtitle={`${channelStats.email.delivered} dlvd, ${channelStats.email.opened} opened`} />
        <StatCard label="SMS" value={`${channelStats.sms.sent} sent`} icon={MessageSquare} iconColour="teal" trend={{ value: `${responseRate('sms')}% response`, direction: 'up' }} subtitle={`${channelStats.sms.delivered} delivered`} />
        <StatCard label="WhatsApp" value={`${channelStats.whatsapp.sent} sent`} icon={Smartphone} iconColour="green" trend={{ value: `${responseRate('whatsapp')}% response`, direction: 'up' }} subtitle={`${channelStats.whatsapp.delivered} dlvd, ${channelStats.whatsapp.opened} opened`} />
        <StatCard label="Phone" value={`${channelStats.phone.sent} calls`} icon={Phone} iconColour="amber" trend={{ value: `${responseRate('phone')}% response`, direction: 'flat' }} subtitle="Manual outreach" />
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <ActivityFeedTab communications={communications} />
        </TabsContent>
        <TabsContent value="sequences" className="mt-6">
          <SequencesTab sequences={sequences} />
        </TabsContent>
        <TabsContent value="templates" className="mt-6">
          <TemplatesTab templates={templates} />
        </TabsContent>
        <TabsContent value="campaigns" className="mt-6">
          <CampaignsTab campaigns={campaigns} communications={communications} />
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab sequences={sequences} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

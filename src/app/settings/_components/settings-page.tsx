'use client'

import { useState } from 'react'
import { Wifi, WifiOff, Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, ActionToast, useActionToast } from '@/components/shared'
import { Button } from '@/components/ui/button'
import type { IntegrationConfig } from '@/types'
import { CrmTab } from './crm-tab'
import { ImportTab } from './import-tab'
import { GovernmentTab } from './government-tab'
import { ChannelsTab } from './channels-tab'
import { PlatformTab } from './platform-tab'

interface SettingsPageProps {
  integrations: IntegrationConfig[]
  users: { name: string; role: string; status: string; lastActive: string }[]
}

const tabs = [
  { id: 'crm', label: 'CRM Integration' },
  { id: 'import', label: 'Data Import' },
  { id: 'government', label: 'Government Portals' },
  { id: 'channels', label: 'Channels' },
  { id: 'platform', label: 'Platform' },
] as const

export function SettingsPage({ integrations, users }: SettingsPageProps) {
  const [toast, showToast] = useActionToast()
  const [testingId, setTestingId] = useState<string | null>(null)

  const handleTestConnection = (intg: IntegrationConfig) => {
    setTestingId(intg.id)
    setTimeout(() => {
      showToast(`Connection to ${intg.name} successful`)
      setTestingId(null)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Integration Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {integrations.map((intg) => (
            <div key={intg.id} className={`p-3 rounded-lg border ${intg.status === 'connected' ? 'bg-green-50 border-green-100' : 'border-dashed border-slate-300 bg-slate-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                {intg.status === 'connected' ? <Wifi className="h-3.5 w-3.5 text-green-500" /> : <WifiOff className="h-3.5 w-3.5 text-slate-400" />}
                <span className={`text-xs font-bold ${intg.status === 'connected' ? 'text-slate-900' : 'text-slate-500'}`}>{intg.name}</span>
              </div>
              <StatusBadge
                status={intg.status === 'connected' ? 'connected' : 'pending'}
                label={intg.status === 'connected' ? 'Connected' : `Planned ${intg.plannedDate ?? ''}`}
              />
              {intg.status === 'planned' && intg.purpose && (
                <p className="text-[9px] text-slate-400 mt-1">{intg.purpose}</p>
              )}
              {intg.lastSync && <p className="text-[9px] text-slate-400 mt-1">Last sync: {intg.lastSync}</p>}
              {intg.status === 'connected' && (
                <Button variant="ghost" size="sm" className="mt-2 h-6 text-[10px] font-bold text-blue-600 px-2" disabled={testingId === intg.id} onClick={() => handleTestConnection(intg)}>
                  {testingId === intg.id ? <><Loader2 className="h-3 w-3 animate-spin mr-1" /> Testing...</> : 'Test Connection'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="crm" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent rounded-none h-auto p-0 gap-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs font-bold uppercase tracking-wider px-4 py-3 text-slate-500 hover:text-slate-700">{tab.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="crm" className="mt-4"><CrmTab showToast={showToast} /></TabsContent>
        <TabsContent value="import" className="mt-4"><ImportTab showToast={showToast} /></TabsContent>
        <TabsContent value="government" className="mt-4"><GovernmentTab showToast={showToast} /></TabsContent>
        <TabsContent value="channels" className="mt-4"><ChannelsTab showToast={showToast} /></TabsContent>
        <TabsContent value="platform" className="mt-4"><PlatformTab users={users} showToast={showToast} /></TabsContent>
      </Tabs>

      <ActionToast message={toast} />
    </div>
  )
}

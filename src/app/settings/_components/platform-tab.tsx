'use client'

import { useState } from 'react'
import { Shield, Users, Bell, Settings, UserPlus } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { EditableForm } from '@/components/shared/editable-form'
import { ConfirmationModal } from '@/components/shared/confirmation-modal'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { platformSettings, notificationPreferences } from '@/data'
import { InviteUserModal } from './invite-user-modal'

interface PlatformTabProps {
  users: { name: string; role: string; status: string; lastActive: string }[]
  showToast: (msg: string) => void
}

const retentionFields = [
  { label: 'Active Trainee Data', value: platformSettings.dataRetention.activeTraineeData, type: 'text' as const },
  { label: 'Completed Programmes', value: platformSettings.dataRetention.completedProgrammeData, type: 'text' as const },
  { label: 'Communication Logs', value: platformSettings.dataRetention.communicationLogs, type: 'text' as const },
  { label: 'Document Storage', value: platformSettings.dataRetention.documentStorage, type: 'text' as const },
  { label: 'Auto-archival', value: platformSettings.dataRetention.autoArchival, type: 'toggle' as const },
]

export function PlatformTab({ users: initialUsers, showToast }: PlatformTabProps) {
  const [notifications, setNotifications] = useState({
    morningAlerts: notificationPreferences.morningAlertsEmail.enabled,
    realTime: notificationPreferences.realTimeAlerts.enabled,
    weeklySummary: notificationPreferences.weeklySummary.enabled,
  })
  const [usersList, setUsersList] = useState(initialUsers)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [deactivateUser, setDeactivateUser] = useState<string | null>(null)

  const toggleNotification = (key: keyof typeof notifications, label: string) => {
    setNotifications((prev) => {
      const next = !prev[key]
      showToast(`${label} ${next ? 'enabled' : 'disabled'}`)
      return { ...prev, [key]: next }
    })
  }

  const handleInvite = (user: { name: string; email: string; role: string }) => {
    setUsersList((prev) => [...prev, { ...user, status: 'Invited', lastActive: '-' }])
    setInviteOpen(false)
    showToast(`Invitation sent to ${user.email}`)
  }

  const handleDeactivate = () => {
    if (!deactivateUser) return
    setUsersList((prev) => prev.map((u) => u.name === deactivateUser ? { ...u, status: 'Deactivated' } : u))
    showToast(`${deactivateUser} deactivated`)
    setDeactivateUser(null)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-blue-600" /> General
        </h3>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            ['Platform Name', platformSettings.name],
            ['Organisation', platformSettings.organisation],
            ['Timezone', platformSettings.timezone],
            ['Date Format', platformSettings.dateFormat],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[10px] font-bold text-slate-400 uppercase">{label}</dt>
              <dd className="font-black text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" /> Data Retention
        </h3>
        <EditableForm fields={retentionFields} onSave={() => showToast('Retention settings saved')} />
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-600" /> Notification Preferences
        </h3>
        <div className="space-y-3">
          {([
            { key: 'morningAlerts' as const, label: 'Morning Alerts Email', detail: notificationPreferences.morningAlertsEmail.time },
            { key: 'realTime' as const, label: 'Real-time Alerts', detail: notificationPreferences.realTimeAlerts.type },
            { key: 'weeklySummary' as const, label: 'Weekly Summary to Leadership', detail: notificationPreferences.weeklySummary.schedule },
          ]).map(({ key, label, detail }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div>
                <span className="text-sm font-bold text-slate-700">{label}</span>
                <span className="text-xs text-slate-400 ml-2">({detail})</span>
              </div>
              <Switch checked={notifications[key]} onCheckedChange={() => toggleNotification(key, label)} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" /> System Users
          </h3>
          <Button size="sm" className="h-7 text-xs" onClick={() => setInviteOpen(true)}>
            <UserPlus className="h-3.5 w-3.5 mr-1" /> Invite User
          </Button>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Active</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usersList.map((u) => (
              <tr key={u.name} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900">{u.name}</td>
                <td className="px-5 py-3 text-slate-600">{u.role}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={u.status === 'Active' ? 'active' : u.status === 'Invited' ? 'pending' : 'inactive'} label={u.status} />
                </td>
                <td className="px-5 py-3 text-slate-500">{u.lastActive}</td>
                <td className="px-5 py-3 text-right">
                  {u.status === 'Active' && u.name !== 'Sarah Tan' && (
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-red-600 px-2" onClick={() => setDeactivateUser(u.name)}>Deactivate</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InviteUserModal open={inviteOpen} onInvite={handleInvite} onCancel={() => setInviteOpen(false)} />
      <ConfirmationModal
        open={!!deactivateUser}
        title={`Deactivate ${deactivateUser}?`}
        description="This user will lose access to Nucleus AI. You can reactivate them later."
        confirmLabel="Deactivate"
        variant="destructive"
        onConfirm={handleDeactivate}
        onCancel={() => setDeactivateUser(null)}
      />
    </div>
  )
}

import { Shield, Users, Bell, Settings } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { platformSettings, notificationPreferences } from '@/data'

interface PlatformTabProps {
  users: { name: string; role: string; status: string; lastActive: string }[]
}

export function PlatformTab({ users }: PlatformTabProps) {
  const retention = platformSettings.dataRetention

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-blue-600" /> General
        </h3>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Platform Name</dt>
            <dd className="font-black text-slate-900">{platformSettings.name}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Organisation</dt>
            <dd className="font-black text-slate-900">{platformSettings.organisation}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Timezone</dt>
            <dd className="font-black text-slate-900">{platformSettings.timezone}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Date Format</dt>
            <dd className="font-black text-slate-900">{platformSettings.dateFormat}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" /> Data Retention
        </h3>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Active Trainee Data</dt>
            <dd className="font-black text-slate-900">{retention.activeTraineeData}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Completed Programmes</dt>
            <dd className="font-black text-slate-900">{retention.completedProgrammeData}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Communication Logs</dt>
            <dd className="font-black text-slate-900">{retention.communicationLogs}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold text-slate-400 uppercase">Document Storage</dt>
            <dd className="font-black text-slate-900">{retention.documentStorage}</dd>
          </div>
        </dl>
        <p className="text-[10px] text-slate-400 mt-3">
          Auto-archival: {retention.autoArchival ? 'Enabled' : 'Disabled'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-600" /> Notification Preferences
        </h3>
        <div className="space-y-3">
          {([
            ['Morning Alerts Email', `Enabled (${notificationPreferences.morningAlertsEmail.time})`],
            ['Real-time Alerts', `Enabled (${notificationPreferences.realTimeAlerts.type})`],
            ['Weekly Summary to Leadership', `Enabled (${notificationPreferences.weeklySummary.schedule})`],
          ] as const).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <span className="text-sm font-bold text-slate-700">{label}</span>
              <span className="text-sm text-slate-500">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" /> System Users
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.name} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-bold text-slate-900">{u.name}</td>
                <td className="px-5 py-3 text-slate-600">{u.role}</td>
                <td className="px-5 py-3"><StatusBadge status="active" label={u.status} /></td>
                <td className="px-5 py-3 text-slate-500">{u.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

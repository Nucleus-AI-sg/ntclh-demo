'use client'

import { Mail, MessageSquare } from 'lucide-react'
import { StatusBadge } from '@/components/shared'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { channelConfigs } from '@/data'

interface ChannelsTabProps {
  showToast: (msg: string) => void
}

const email = channelConfigs.email
const sms = channelConfigs.sms
const whatsapp = channelConfigs.whatsapp

const channels = [
  {
    name: 'Email (SMTP)',
    icon: 'mail' as const,
    detail: `Sender: ${email.senderAddress} - Bounce rate: ${email.bounceRate}%`,
    used: email.usedToday,
    limit: email.dailySendLimit,
    limitLabel: 'daily limit',
  },
  {
    name: 'SMS (Twilio)',
    icon: 'sms' as const,
    detail: `Sender ID: ${sms.senderId} - Delivery rate: ${sms.deliveryRate}%`,
    used: sms.used,
    limit: sms.monthlyAllocation,
    limitLabel: 'monthly allocation',
  },
  {
    name: 'WhatsApp Business',
    icon: 'sms' as const,
    detail: `Account: ${whatsapp.businessAccount} - Templates: ${whatsapp.templateApprovalStatus}`,
    used: whatsapp.used,
    limit: whatsapp.monthlyAllocation,
    limitLabel: 'monthly allocation',
  },
]

export function ChannelsTab({ showToast }: ChannelsTabProps) {
  return (
    <div className="space-y-3">
      {channels.map((ch) => {
        const pct = Math.round((ch.used / ch.limit) * 100)
        return (
          <div key={ch.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {ch.icon === 'mail' ? <Mail className="h-4 w-4 text-blue-600" /> : <MessageSquare className="h-4 w-4 text-blue-600" />}
                <div>
                  <p className="text-sm font-bold text-slate-900">{ch.name}</p>
                  <p className="text-[10px] text-slate-500">{ch.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status="active" />
                <Button variant="outline" size="sm" className="h-6 text-[10px] font-bold px-2" onClick={() => showToast(`${ch.name} configuration panel opening...`)}>Configure</Button>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>{ch.used} / {ch.limit} used</span>
                <span>{pct}% of {ch.limitLabel}</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

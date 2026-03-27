import { Mail, MessageSquare, Phone, Smartphone } from 'lucide-react'

type IconSize = 'sm' | 'md'

const sizeClass: Record<IconSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
}

export function getChannelIcon(channel: string, size: IconSize = 'md') {
  const cls = sizeClass[size]
  const icons: Record<string, React.ReactNode> = {
    email: <Mail className={cls} />,
    sms: <MessageSquare className={cls} />,
    whatsapp: <Smartphone className={cls} />,
    phone: <Phone className={cls} />,
  }
  return icons[channel] ?? null
}

export const channelColour: Record<string, string> = {
  email: 'bg-blue-50 text-blue-600 border-blue-100',
  sms: 'bg-teal-50 text-teal-600 border-teal-100',
  whatsapp: 'bg-green-50 text-green-600 border-green-100',
}

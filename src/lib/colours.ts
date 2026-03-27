/** Centralised colour mappings for status badges, score gauges, and charts. */

export type StatusVariant =
  | 'verified'
  | 'active'
  | 'high'
  | 'connected'
  | 'approved'
  | 'hired'
  | 'open'
  | 'pending'
  | 'medium'
  | 'submitted'
  | 'screening'
  | 'interviewing'
  | 'waitlisted'
  | 'flagged'
  | 'low'
  | 'at_risk'
  | 'rejected'
  | 'failed'
  | 'overdue'
  | 'cancelled'
  | 'info'
  | 'training'
  | 'enrolled'
  | 'in_progress'
  | 'applied'
  | 'completed'
  | 'placed'
  | 'planned'
  | 'not_submitted'
  | 'on_track'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'responded'
  | 'bounced'
  | 'inactive'

interface ColourSet {
  bg: string
  text: string
  dot: string
}

const green: ColourSet = { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' }
const amber: ColourSet = { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' }
const red: ColourSet = { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' }
const blue: ColourSet = { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' }
const slate: ColourSet = { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-500' }
const teal: ColourSet = { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' }

export const statusColours: Record<StatusVariant, ColourSet> = {
  // Green - success/positive
  verified: green,
  active: green,
  high: green,
  connected: green,
  approved: green,
  hired: green,
  open: green,
  on_track: green,
  // Amber - pending/warning
  pending: amber,
  medium: amber,
  submitted: amber,
  screening: amber,
  interviewing: amber,
  waitlisted: amber,
  // Red - danger/flagged
  flagged: red,
  low: red,
  at_risk: red,
  rejected: red,
  failed: red,
  overdue: red,
  cancelled: red,
  // Blue - info/in-progress
  info: blue,
  training: blue,
  enrolled: blue,
  in_progress: blue,
  sent: blue,
  delivered: teal,
  opened: green,
  responded: green,
  bounced: red,
  // Teal - completed
  completed: teal,
  // Slate - neutral
  applied: slate,
  inactive: slate,
  not_submitted: slate,
  // Teal - placed/special
  placed: teal,
  planned: teal,
}

export const fallbackColour: ColourSet = blue

export function getStatusColour(status: string): ColourSet {
  const normalised = status.toLowerCase().replace(/[\s-]/g, '_') as StatusVariant
  return statusColours[normalised] ?? fallbackColour
}

export function scoreColour(score: number) {
  if (score >= 80) return { text: 'text-green-600', bg: 'bg-green-500', stroke: '#22c55e' }
  if (score >= 60) return { text: 'text-amber-600', bg: 'bg-amber-500', stroke: '#f59e0b' }
  return { text: 'text-red-600', bg: 'bg-red-500', stroke: '#ef4444' }
}

export const chartColours = {
  primary: '#2563eb',
  secondary: '#0d9488',
  tertiary: '#6366f1',
  quaternary: '#f59e0b',
  success: '#22c55e',
  danger: '#ef4444',
  neutral: '#64748b',
  palette: [
    '#2563eb',
    '#0d9488',
    '#6366f1',
    '#f59e0b',
    '#22c55e',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
  ],
} as const

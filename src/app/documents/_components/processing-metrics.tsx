import { FileText, CheckCircle, Clock, AlertTriangle, Timer, Target } from 'lucide-react'
import { StatCard } from '@/components/shared'

export function ProcessingMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard label="Received (30d)" value={47} icon={FileText} iconColour="blue" />
      <StatCard label="Auto-Verified" value="31 (66%)" icon={CheckCircle} iconColour="green" />
      <StatCard label="Pending Review" value={8} icon={Clock} iconColour="amber" />
      <StatCard label="Flagged" value={5} icon={AlertTriangle} iconColour="red" />
      <StatCard label="Avg Process Time" value="4.2 min" icon={Timer} iconColour="teal" />
      <StatCard label="OCR Accuracy" value="94%" icon={Target} iconColour="indigo" />
    </div>
  )
}

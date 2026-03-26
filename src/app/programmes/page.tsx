import { programmes, cohorts, programmeMetrics } from '@/data'
import { ProgrammeList } from './_components/programme-list'

export default function ProgrammesRoute() {
  return <ProgrammeList programmes={programmes} cohorts={cohorts} metrics={programmeMetrics} />
}

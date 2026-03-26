import { assessments, trainees, programmes } from '@/data'
import { EnrolmentPage } from './_components/enrolment-page'

export default function EnrolmentRoute() {
  return (
    <EnrolmentPage
      assessments={assessments}
      trainees={trainees}
      programmes={programmes}
    />
  )
}

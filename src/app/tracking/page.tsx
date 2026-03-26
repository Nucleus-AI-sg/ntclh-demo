import { trainees, programmes, documents, communications, vacancies } from '@/data'
import { TrackingPage } from './_components/tracking-page'

export default function TrackingRoute() {
  return (
    <TrackingPage
      trainees={trainees}
      programmes={programmes}
      documents={documents}
      communications={communications}
      vacancies={vacancies}
    />
  )
}

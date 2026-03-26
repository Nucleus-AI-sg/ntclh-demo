import { employers, vacancies, trainees, programmes, matchResults, placements } from '@/data'
import { MatchingPage } from './_components/matching-page'

export default function MatchingRoute() {
  return (
    <MatchingPage
      employers={employers}
      vacancies={vacancies}
      trainees={trainees}
      programmes={programmes}
      matches={matchResults}
      placements={placements}
    />
  )
}

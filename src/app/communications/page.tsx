import { communications, outreachSequences } from '@/data'
import { CommunicationsPage } from './_components/communications-page'

export default function CommunicationsRoute() {
  return <CommunicationsPage communications={communications} sequences={outreachSequences} />
}

import { communications, outreachSequences, messageTemplates, campaigns } from '@/data'
import { CommunicationsPage } from './_components/communications-page'

export default function CommunicationsRoute() {
  return (
    <CommunicationsPage
      communications={communications}
      sequences={outreachSequences}
      templates={messageTemplates}
      campaigns={campaigns}
    />
  )
}

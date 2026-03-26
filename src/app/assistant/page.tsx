import { chatScripts, fallbackResponse } from '@/data'
import { ChatInterface } from './_components/chat-interface'

export default function AssistantRoute() {
  return <ChatInterface scripts={chatScripts} fallback={fallbackResponse} />
}

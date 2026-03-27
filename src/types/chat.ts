export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  context?: ChatContext
  actions?: ChatAction[]
}

export interface ChatContext {
  trainees?: { name: string; id: string }[]
  dataSources?: string[]
  confidence?: { level: 'High' | 'Medium' | 'Low'; label: string }
}

export interface ChatAction {
  label: string
  href: string
  variant?: 'link' | 'outline'
}

export interface ChatFollowUp {
  prompt: string
  response: string
  context?: ChatContext
  actions?: ChatAction[]
}

export interface ChatScript {
  id: string
  prompt: string
  response: string
  context?: ChatContext
  actions?: ChatAction[]
  followUps: ChatFollowUp[]
}

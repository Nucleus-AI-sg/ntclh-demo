import { OutreachSequence, Channel } from '@/types'

export const outreachSequences: OutreachSequence[] = [
  {
    id: 'seq-001',
    name: 'Post-Training Document Collection',
    trigger: 'Trainee completes training',
    steps: [
      {
        day: 1,
        channel: Channel.Email,
        templateSubject:
          'Congratulations! Next steps for employment verification',
        templateBody:
          'Well done on completing your programme! To finalise your placement record, please upload your employment letter, latest pay slip, and CPF statement via the trainee portal. These documents are required for SSG verification.',
      },
      {
        day: 5,
        channel: Channel.Sms,
        templateSubject: 'Reminder: Upload your employment documents',
        templateBody:
          'Hi {{trainee_name}}, a quick reminder to upload your employment documents. Log in to the trainee portal to submit them.',
      },
      {
        day: 10,
        channel: Channel.WhatsApp,
        templateSubject: 'Document upload follow-up',
        templateBody:
          "Hi {{trainee_name}}, we haven't received your employment documents yet. If you're having trouble uploading them, reply to this message and we'll help you through the process.",
      },
      {
        day: 15,
        channel: Channel.Email,
        templateSubject: 'Final reminder before manual follow-up',
        templateBody:
          'This is your final automated reminder to submit your employment verification documents. If we do not receive them within the next 5 days, your case will be escalated to a programme coordinator for manual follow-up.',
      },
      {
        day: 20,
        channel: Channel.Email,
        templateSubject: 'Your case has been escalated to a coordinator',
        templateBody:
          'As we have not received your employment documents, your case has been assigned to a programme coordinator who will be reaching out to you directly. Please respond to their call or message at your earliest convenience.',
      },
    ],
    activeCount: 14,
    completionRate: 68,
    isActive: true,
  },
  {
    id: 'seq-002',
    name: 'Pre-Training Onboarding',
    trigger: 'Trainee enrolled',
    steps: [
      {
        day: 0,
        channel: Channel.Email,
        templateSubject:
          "Welcome to {{programme_name}}! Here's what to expect",
        templateBody:
          "Welcome to {{programme_name}}! We're excited to have you on board. Your training begins on {{start_date}} at {{venue}}. Attached is your programme schedule, pre-course reading list, and venue details. Please review them before your first session.",
      },
      {
        day: -3,
        channel: Channel.Sms,
        templateSubject: 'Training starts soon',
        templateBody:
          'Your training starts on {{start_date}}. See you at {{venue}}! Please arrive 15 minutes early for registration.',
      },
    ],
    activeCount: 8,
    completionRate: 95,
    isActive: true,
  },
  {
    id: 'seq-003',
    name: 'Employer Follow-Up',
    trigger: 'Candidates submitted to employer',
    steps: [
      {
        day: 3,
        channel: Channel.Email,
        templateSubject: 'Following up on the candidates we submitted',
        templateBody:
          'Hi {{contact_name}}, just checking in on the candidate profiles we submitted last week. Please let us know if you need any additional information or would like to schedule interviews.',
      },
      {
        day: 7,
        channel: Channel.Email,
        templateSubject:
          'Gentle reminder - please provide feedback on submitted candidates',
        templateBody:
          'Hi {{contact_name}}, a friendly reminder to share your feedback on the candidates we submitted. Early feedback helps us refine future matches and ensures the best candidates remain available.',
      },
      {
        day: 10,
        channel: Channel.Email,
        templateSubject: 'Escalating to account manager for follow-up',
        templateBody:
          'Hi {{contact_name}}, as we have not received feedback on the submitted candidates, your account manager will reach out directly to discuss next steps and address any concerns.',
      },
    ],
    activeCount: 5,
    completionRate: 72,
    isActive: true,
  },
]

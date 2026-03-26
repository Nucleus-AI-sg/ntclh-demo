export const platformSettings = {
  name: 'Nucleus AI',
  organisation: 'NTUC LearningHub',
  timezone: 'SGT (UTC+8)',
  dateFormat: 'DD MMM YYYY',
  dataRetention: {
    activeTraineeData: 'Indefinite',
    completedProgrammeData: '7 years (PDPA compliance)',
    communicationLogs: '3 years',
    documentStorage: '7 years',
    autoArchival: true,
  },
}

export const channelConfigs = {
  email: {
    smtpServer: 'Configured',
    senderAddress: 'programmes@ntuc-lhub.sg',
    dailySendLimit: 500,
    usedToday: 312,
    bounceRate: 2.1,
  },
  sms: {
    provider: 'Twilio',
    senderId: 'NTUC LHub',
    monthlyAllocation: 1000,
    used: 380,
    deliveryRate: 98,
  },
  whatsapp: {
    businessAccount: 'NTUC LearningHub',
    templateApprovalStatus: '8/8 approved',
    monthlyAllocation: 500,
    used: 290,
  },
}

export const notificationPreferences = {
  morningAlertsEmail: {
    enabled: true,
    time: '07:00 SGT',
  },
  realTimeAlerts: {
    enabled: true,
    type: 'in-app',
  },
  weeklySummary: {
    enabled: true,
    schedule: 'Mondays 08:00',
    recipients: 'Leadership team',
  },
}

export const users = [
  {
    name: 'Sarah Tan',
    role: 'Programme Coordinator',
    status: 'Active',
    lastActive: 'Today',
  },
  {
    name: 'James Lim',
    role: 'Programme Coordinator',
    status: 'Active',
    lastActive: 'Yesterday',
  },
  {
    name: 'Rachel Wong',
    role: 'Account Manager',
    status: 'Active',
    lastActive: 'Today',
  },
  {
    name: 'David Chen',
    role: 'Programme Lead',
    status: 'Active',
    lastActive: '3 days ago',
  },
]

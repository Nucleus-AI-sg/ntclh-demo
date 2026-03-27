import { ChatScript } from '@/types'

export const chatScripts: ChatScript[] = [
  {
    id: 'document-chasers',
    prompt:
      "Which ICT trainees completed training last month but haven't submitted documents?",
    response: `I found **4 ICT trainees** who completed training in February 2026 but have outstanding document submissions:

| Trainee | Completion Date | Outreach Status | Last Contact |
|---------|----------------|-----------------|--------------|
| David Ng | 14 Feb 2026 | 3 emails sent, no response | 10 Mar 2026 |
| Lisa Koh | 14 Feb 2026 | 2 emails sent, no response | 8 Mar 2026 |
| Mei Ling | 14 Feb 2026 | 3 emails, 1 SMS sent, no response | 12 Mar 2026 |
| Wei Ming | 14 Feb 2026 | 1 email sent, opened but no action | 5 Mar 2026 |

3 of these trainees have not responded to any automated outreach. Would you like me to generate a priority follow-up list or draft personalised outreach messages?`,
    context: {
      trainees: [
        { name: 'David Ng', id: 'david-ng' },
        { name: 'Lisa Koh', id: 'lisa-koh' },
        { name: 'Mei Ling', id: 'mei-ling' },
        { name: 'Wei Ming', id: 'wei-ming' },
      ],
      dataSources: [
        'Trainee Database',
        'Outreach & CRM Log',
        'ICT Programme Records',
      ],
      confidence: { level: 'High', label: 'Based on verified programme data' },
    },
    actions: [
      { label: 'View in Tracking', href: '/tracking', variant: 'link' },
      {
        label: 'Draft Outreach Messages',
        href: '/communications',
        variant: 'outline',
      },
    ],
    followUps: [
      {
        prompt: 'Yes, draft outreach messages for the non-responsive ones',
        response: `Here are personalised outreach drafts for the 3 non-responsive trainees:

---

**1. David Ng** (via WhatsApp - preferred channel)

> Hi David, congratulations on completing the ICT Professional programme! We noticed your employment verification documents are still pending. Submitting your pay slip and CPF statement helps us confirm your placement and ensures you receive your full training grant. Could you upload these through the trainee portal? Happy to help if you have any questions. - Sarah, NTUC LHub

---

**2. Lisa Koh** (via SMS - email unresponsive)

> Hi Lisa, this is Sarah from NTUC LHub. Your ICT programme completion documents are pending. Please upload your employment letter and pay slip via the trainee portal or reply to arrange a call. We are here to help!

---

**3. Mei Ling** (via Phone call - all digital channels unresponsive)

> **Suggested call script:** Introduce yourself, congratulate on completion, explain the importance of document submission for grant processing, offer to walk through the upload process, and schedule a follow-up if documents are not immediately available.

All three messages have been saved as drafts in the Communications Hub. Would you like me to send them now or schedule them for tomorrow morning?`,
        context: {
          trainees: [
            { name: 'David Ng', id: 'david-ng' },
            { name: 'Lisa Koh', id: 'lisa-koh' },
            { name: 'Mei Ling', id: 'mei-ling' },
          ],
          dataSources: [
            'Trainee Database',
            'Outreach & CRM Log',
            'Communication Preferences',
          ],
          confidence: {
            level: 'High',
            label: 'Drafts based on channel preferences',
          },
        },
        actions: [
          {
            label: 'View in Communications',
            href: '/communications',
            variant: 'link',
          },
        ],
      },
    ],
  },
  {
    id: 'ai-reasoning',
    prompt:
      'Why was Marcus Lee recommended for Business Analyst instead of ICT?',
    response: `Marcus Lee was assessed on 15 Jan 2026. The AI recommendation engine scored him **82% match for Business Analytics** versus **45% match for ICT Professional**.

### Strengths for Business Analytics track

- **Strong analytical foundation**: 5 years in logistics operations with demonstrable data-driven decision making
- **Domain expertise**: Supply chain optimisation experience directly transfers to business process analysis
- **Communication skills**: Track record of presenting insights to senior management, a core BA competency
- **Tool proficiency**: Advanced Excel, SQL basics, and experience with Tableau dashboards

### Concerns for ICT track

- **Limited programming background**: No formal coding experience beyond basic scripting
- **Technical gap**: ICT Professional curriculum assumes familiarity with software development lifecycle
- **Career trajectory**: Marcus's stated goal of "bridging business and technology" aligns more closely with BA than hands-on development

The recommendation was made with **high confidence** based on 47 comparable career switcher assessments from previous cohorts.

Would you like me to show comparable cases from previous cohorts?`,
    context: {
      trainees: [{ name: 'Marcus Lee', id: 'marcus-lee' }],
      dataSources: [
        'Assessment Records',
        'AI Recommendation Engine',
        'Historical Cohort Data',
      ],
      confidence: {
        level: 'High',
        label: 'Based on 47 comparable assessments',
      },
    },
    actions: [
      {
        label: 'View Marcus Lee Profile',
        href: '/trainee/marcus-lee',
        variant: 'link',
      },
      {
        label: 'View in AI Insights',
        href: '/ai-insights',
        variant: 'outline',
      },
    ],
    followUps: [
      {
        prompt: 'Show me comparable cases',
        response: `Here are 3 comparable career switcher cases from previous cohorts with similar profiles to Marcus Lee:

---

**1. Jenny Huang** (Cohort BA-2025-Q2)
- **Background**: 6 years in retail operations management
- **AI recommendation**: Business Analytics (79% match)
- **Outcome**: Completed programme, placed at Deloitte as Junior Business Analyst within 4 weeks
- **Current status**: Retained after 8 months, promoted to Business Analyst

**2. Kumar Patel** (Cohort BA-2025-Q1)
- **Background**: 4 years in warehouse logistics, basic SQL knowledge
- **AI recommendation**: Business Analytics (81% match)
- **Outcome**: Completed programme, placed at Accenture in a process improvement role
- **Current status**: Retained after 10 months

**3. Siti Rahman** (Cohort ICT-2025-Q1)
- **Background**: 5 years in admin, recommended for BA but enrolled in ICT (coordinator override)
- **AI recommendation**: Business Analytics (76% match), ICT (42% match)
- **Outcome**: Struggled with programming modules, withdrew in week 8
- **Lesson learned**: This case contributed to the model's improved accuracy for career switcher assessments

These cases show a **91% positive outcome rate** when trainees followed the AI recommendation for the BA track. The model has since been refined to better weight transferable soft skills alongside technical aptitude.`,
        context: {
          trainees: [{ name: 'Marcus Lee', id: 'marcus-lee' }],
          dataSources: [
            'Historical Cohort Data',
            'Placement Outcomes Database',
            'AI Model Training Logs',
          ],
          confidence: {
            level: 'High',
            label: 'Verified placement outcomes',
          },
        },
      },
    ],
  },
  {
    id: 'placement-summary',
    prompt:
      'Give me a summary of placement rates across all programmes this quarter',
    response: `Here is the Q1 2026 placement rate summary across all active programmes:

| Programme | Completions | Placed | Placement Rate | vs Last Quarter |
|-----------|------------|--------|---------------|-----------------|
| ICT Professional | 28 | 21 | **75%** | +5% |
| Business Analytics | 20 | 14 | **70%** | +3% |
| Digital Marketing | 22 | 15 | **68%** | -2% |
| **Overall** | **70** | **50** | **71%** | **+2%** |

### Key trends

- **ICT Professional** continues to lead, driven by strong employer demand in cloud and cybersecurity roles
- **Business Analytics** is improving steadily with new employer partnerships contributing 4 additional placements
- **Digital Marketing** dipped slightly due to seasonal hiring slowdowns in the media sector
- **Average time to placement**: 3.2 weeks (down from 4.1 weeks last quarter)

Would you like a detailed breakdown by cohort?`,
    context: {
      dataSources: [
        'Programme Database',
        'Placement Records',
        'Q4 2025 Comparison Data',
      ],
      confidence: {
        level: 'High',
        label: 'Aggregated from verified records',
      },
    },
    actions: [
      { label: 'View in Analytics', href: '/analytics', variant: 'link' },
      {
        label: 'Generate Report',
        href: '/analytics',
        variant: 'outline',
      },
    ],
    followUps: [
      {
        prompt: 'Yes, break it down by cohort',
        response: `Here is the cohort-level breakdown for Q1 2026:

| Cohort | Programme | Start Date | Completions | Placed | Rate | Avg Days to Placement |
|--------|-----------|-----------|------------|--------|------|----------------------|
| ICT-2025-Q3 | ICT Professional | 1 Jul 2025 | 15 | 12 | **80%** | 18 days |
| ICT-2025-Q4 | ICT Professional | 1 Oct 2025 | 13 | 9 | **69%** | 24 days |
| BA-2025-Q3 | Business Analytics | 15 Jul 2025 | 12 | 9 | **75%** | 21 days |
| BA-2025-Q4 | Business Analytics | 15 Oct 2025 | 8 | 5 | **63%** | 28 days |
| DM-2025-Q3 | Digital Marketing | 1 Aug 2025 | 10 | 7 | **70%** | 19 days |
| DM-2025-Q4 | Digital Marketing | 1 Nov 2025 | 12 | 8 | **67%** | 32 days |

### Observations

- Earlier cohorts consistently outperform later ones, suggesting the value of a longer post-completion placement window
- ICT-2025-Q3 has the fastest average placement time at 18 days
- BA-2025-Q4 still has 3 trainees in active matching, so the rate is expected to improve over the next 2 weeks`,
        context: {
          dataSources: [
            'Programme Database',
            'Cohort Records',
            'Placement Tracking',
          ],
          confidence: {
            level: 'High',
            label: 'Aggregated from verified records',
          },
        },
      },
    ],
  },
  {
    id: 'employer-matches',
    prompt:
      'Which employers have open vacancies that match our available BA graduates?',
    response: `I found **4 employers** with open vacancies matching your available Business Analytics graduates:

| Employer | Vacancy | Open Positions | Matched Candidates | Urgency |
|----------|---------|---------------|-------------------|---------|
| TechCorp Pte Ltd | Junior Business Analyst | 2 | 5 matched | **High** - hiring by 15 Apr |
| DataFlow Solutions | Data Analyst | 1 | 3 matched | Medium - hiring by 30 Apr |
| Pinnacle Consulting | Process Analyst | 2 | 4 matched | Medium - hiring by 30 Apr |
| GreenTech Industries | BI Analyst | 1 | 2 matched | Low - ongoing recruitment |

There are currently **8 available BA graduates** who have completed training and are ready for placement. 6 of them match at least one vacancy with a score above 70%.

Would you like me to prepare candidate submissions for any of these vacancies?`,
    context: {
      trainees: [
        { name: 'Marcus Lee', id: 'marcus-lee' },
        { name: 'Priya Sharma', id: 'priya-sharma' },
      ],
      dataSources: [
        'Employer Vacancy Database',
        'AI Matching Engine',
        'Trainee Skills Profiles',
      ],
      confidence: {
        level: 'High',
        label: 'Real-time vacancy data',
      },
    },
    actions: [
      { label: 'View in Matching', href: '/matching', variant: 'link' },
    ],
    followUps: [
      {
        prompt: 'Prepare submissions for TechCorp',
        response: `Here are the top 3 candidates for TechCorp Pte Ltd's Junior Business Analyst vacancy:

---

**1. Marcus Lee** - Match Score: **82%**
- Background: 5 years logistics operations, strong analytical skills
- Key strengths: Data-driven decision making, Tableau proficiency, excellent communication
- Programme performance: Top 10% of cohort, distinction in Data Visualisation module
- Salary expectation: $4,200/month (within TechCorp's range of $3,800-$4,500)

**2. Priya Sharma** - Match Score: **78%**
- Background: 3 years in finance operations, CFA Level 1
- Key strengths: Financial modelling, SQL proficiency, attention to detail
- Programme performance: Strong across all modules, particularly in Statistical Analysis
- Salary expectation: $4,000/month

**3. Alex Toh** - Match Score: **74%**
- Background: 4 years in marketing analytics, Google Analytics certified
- Key strengths: Customer analytics, A/B testing experience, presentation skills
- Programme performance: Solid performance, excelled in Business Case Development module
- Salary expectation: $3,900/month

I have drafted submission packages for all three candidates. You can review and send them from the **Matching** page, or I can submit them directly to TechCorp's hiring manager, Jennifer Wu.`,
        context: {
          trainees: [
            { name: 'Marcus Lee', id: 'marcus-lee' },
            { name: 'Priya Sharma', id: 'priya-sharma' },
          ],
          dataSources: [
            'AI Matching Engine',
            'Trainee Performance Records',
            'Employer Requirements',
          ],
          confidence: {
            level: 'High',
            label: 'Match scores from verified profiles',
          },
        },
        actions: [
          { label: 'View in Matching', href: '/matching', variant: 'link' },
          {
            label: 'View TechCorp Profile',
            href: '/employer/techcorp',
            variant: 'outline',
          },
        ],
      },
    ],
  },
  {
    id: 'outreach-response-rate',
    prompt:
      "What's the outreach response rate for the Jan 2026 cohort?",
    response: `Here is the outreach response rate analysis for the January 2026 cohort (across all programmes):

### Channel breakdown

| Channel | Messages Sent | Responses | Response Rate | Avg Response Time |
|---------|--------------|-----------|--------------|------------------|
| Email | 156 | 53 | **34%** | 2.3 days |
| SMS | 89 | 43 | **48%** | 4.2 hours |
| WhatsApp | 72 | 47 | **65%** | 1.8 hours |

### Key insights

- **WhatsApp** significantly outperforms other channels with a 65% response rate and the fastest response time
- **Best performing time slot**: Messages sent between 10:00-11:00 SGT receive 40% more responses than other times
- **Tuesday and Thursday** show the highest engagement across all channels
- Trainees who received multi-channel outreach (email + WhatsApp) had an **82% overall response rate**

### Recommendations

1. Prioritise WhatsApp as the primary outreach channel for time-sensitive communications
2. Schedule batch outreach for Tuesday/Thursday mornings
3. Implement a multi-channel sequence starting with WhatsApp, then SMS, then email

Should I adjust the outreach sequence timing based on these insights?`,
    context: {
      dataSources: [
        'Outreach & CRM Log',
        'Communication Analytics',
        'Channel Performance Data',
      ],
      confidence: {
        level: 'High',
        label: 'Based on 317 outreach messages',
      },
    },
    actions: [
      {
        label: 'View in Communications',
        href: '/communications',
        variant: 'link',
      },
    ],
    followUps: [
      {
        prompt: 'Yes, adjust the timing',
        response: `I have prepared an optimised outreach sequence based on the response rate data. Here is the proposed adjustment:

### Current sequence vs Optimised sequence

| Step | Current | Optimised |
|------|---------|-----------|
| Day 1 | Email (Mon 09:00) | WhatsApp (Tue 10:00) |
| Day 3 | SMS (Wed 14:00) | SMS (Thu 10:30) |
| Day 5 | Email reminder (Fri 09:00) | Email with summary (Tue 10:00) |
| Day 7 | WhatsApp (Mon 10:00) | WhatsApp follow-up (Thu 10:00) |
| Day 10 | Phone call | Phone call (Tue 11:00) |

### Expected impact

- **Projected response rate increase**: from 49% average to an estimated 68%
- **Projected average response time**: reduced from 1.4 days to under 6 hours
- **Multi-channel coverage**: every trainee receives outreach on at least 2 channels within the first week

The updated sequence has been saved as a draft. Would you like me to apply it to all active outreach campaigns, or test it with a pilot group first?`,
        context: {
          dataSources: [
            'Communication Analytics',
            'Outreach Sequence Config',
          ],
          confidence: {
            level: 'Medium',
            label: 'Projected estimates based on historical data',
          },
        },
      },
    ],
  },
  {
    id: 'leadership-briefing',
    prompt:
      'Generate a briefing summary for leadership on Q1 programme performance',
    response: `# Q1 2026 Programme Performance Briefing
**Prepared by**: Nucleus AI | **Date**: 26 Mar 2026 | **Prepared for**: Leadership Team

---

## Key Metrics

| Metric | Q1 2026 | Q4 2025 | Change |
|--------|---------|---------|--------|
| Total enrolments | 85 | 72 | **+18%** |
| Programme completions | 70 | 65 | **+8%** |
| Successful placements | 50 | 44 | **+14%** |
| Overall placement rate | 71% | 68% | **+3pp** |
| Avg time to placement | 3.2 weeks | 4.1 weeks | **-22%** |
| Employer satisfaction | 4.3/5 | 4.1/5 | **+0.2** |

## Highlights

- **AI-powered matching** reduced average time to placement by 22%, from 4.1 to 3.2 weeks
- **3 new employer partnerships** established, adding 7 new vacancy positions
- **Document verification automation** processed 89% of submissions without manual intervention
- **Trainee satisfaction** score rose to 4.5/5 across all programmes

## Risks

- **Digital Marketing placement rate** declined 2pp to 68%, driven by seasonal hiring slowdowns
- **3 trainees** from the ICT cohort remain unresponsive to outreach after 30+ days
- **SSG grant processing** backlog affecting 12 trainees awaiting reimbursement confirmation

## Recommended Actions

1. **Expand employer network** in media and marketing sectors to support Digital Marketing placements
2. **Escalate non-responsive trainees** to phone-based outreach and coordinator follow-up
3. **Engage SSG liaison** to expedite outstanding grant claims before Q2 reporting deadline
4. **Scale BA programme** capacity by 20% for Q2 based on strong demand and placement outcomes

Would you like me to add an employer engagement analysis section?`,
    context: {
      dataSources: [
        'Programme Database',
        'Placement Records',
        'Employer CRM',
        'SSG Grant Tracker',
      ],
      confidence: {
        level: 'High',
        label: 'Aggregated from all programme data',
      },
    },
    actions: [
      { label: 'View in Analytics', href: '/analytics', variant: 'link' },
      {
        label: 'Generate Report',
        href: '/analytics',
        variant: 'outline',
      },
    ],
    followUps: [
      {
        prompt: 'Add employer engagement analysis',
        response: `## Employer Engagement Analysis - Q1 2026

### Partnership health overview

| Employer | Engagement | Placements (Q1) | Vacancies Open | Retention Rate | Health |
|----------|-----------|-----------------|---------------|---------------|--------|
| TechCorp Pte Ltd | High | 6 | 3 | 92% | **Green** |
| DataFlow Solutions | High | 4 | 2 | 88% | **Green** |
| Pinnacle Consulting | Medium | 3 | 2 | 85% | **Amber** |
| GreenTech Industries | Medium | 2 | 1 | 90% | **Green** |
| MediaWorks Pte Ltd | Low | 1 | 0 | 75% | **Red** |

### Key observations

- **TechCorp** remains our strongest partner, accounting for 24% of all Q1 placements with the highest retention rate
- **Pinnacle Consulting** engagement has dropped from High to Medium. Their hiring manager has been unresponsive for 2 weeks. Recommend an account manager visit
- **MediaWorks** placed only 1 trainee this quarter (down from 4 in Q4). They cited budget constraints but remain open to Q2 hiring
- **New partnerships**: Preliminary discussions with 2 fintech companies showing strong interest in BA graduates

### Recommendations

1. Schedule a quarterly business review with TechCorp to explore expanding the partnership
2. Assign Rachel Wong to re-engage Pinnacle Consulting with a tailored candidate shortlist
3. Develop a fintech-focused training module to capitalise on emerging employer demand
4. Create an employer satisfaction survey to systematically track partnership health

This section has been appended to the briefing document. You can download the full report from the **Analytics** page.`,
        context: {
          dataSources: [
            'Employer CRM',
            'Placement Records',
            'Retention Tracking',
          ],
          confidence: {
            level: 'High',
            label: 'Verified employer partnership data',
          },
        },
        actions: [
          { label: 'View Employers', href: '/employers', variant: 'link' },
          {
            label: 'View in Analytics',
            href: '/analytics',
            variant: 'outline',
          },
        ],
      },
    ],
  },
]

export const fallbackResponse: string = `I can help with questions about trainees, programmes, placements, and AI assessments. Here are some things you can ask me about:

- **Trainee queries**: "Which trainees completed training but haven't submitted documents?"
- **AI reasoning**: "Why was a trainee recommended for a specific course?"
- **Analytics**: "What are the placement rates across programmes?"
- **Matching**: "Which employers have open vacancies?"
- **Communications**: "What's the outreach response rate?"
- **Reports**: "Generate a briefing summary for leadership"`

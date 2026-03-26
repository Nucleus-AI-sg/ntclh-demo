# PRD-11: Communications Hub

## Overview

The multi-channel outreach management centre for all trainee and employer communications. Coordinators manage outreach campaigns, customise message templates, monitor delivery and response analytics, and configure automated follow-up sequences. This replaces the manual process of sending individual emails and tracking responses in spreadsheets.

## Route

`/communications`

## Proposal Mapping

- Feature 3 subsection: Multi-Channel Outreach Automation
- Feature 1 subsection: Stakeholder Portals & Audit Trails

## User Stories

- As a **coordinator**, I want to see all outreach activity across channels in one place so I can monitor response rates and follow up on non-responders.
- As a **coordinator**, I want to configure automated outreach sequences so trainees receive timely reminders without manual effort.
- As a **coordinator**, I want to manage message templates so outreach is consistent and professional.
- As a **coordinator**, I want to run bulk communication campaigns for entire cohorts so I can handle high-volume operations efficiently.

## Layout & Components

### 1. Channel Summary Strip

4 cards showing performance by channel:

| Channel | Sent (30 days) | Delivered | Opened | Response Rate |
|---------|---------------|-----------|--------|--------------|
| Email | 156 | 148 (95%) | 89 (60%) | 34% |
| SMS | 82 | 80 (98%) | - | 45% |
| WhatsApp | 64 | 62 (97%) | 58 (94%) | 62% |
| Phone | 12 (manual) | - | - | 83% |

### 2. Tabbed Content

---

#### Tab 1: Activity Feed

**Communication Timeline** (reverse chronological):

Each entry shows:
- Channel icon (email/SMS/WhatsApp/phone)
- Recipient name and role (trainee/employer)
- Subject/preview
- Status badges: Sent, Delivered, Opened, Responded, Bounced, Failed
- Trigger: Automated / Manual / Bulk Campaign
- Timestamp

Filters:
- Channel (multi-select)
- Status (sent/delivered/opened/responded/failed)
- Recipient type (trainee/employer)
- Trigger type (automated/manual/bulk)
- Date range
- Programme track

**Example Entries**:
- Email to Marcus Lee: "Training schedule update - Module 3 starts Monday" - Delivered, Opened - Automated - 24 Mar 10:00
- SMS to Lisa Koh: "Reminder: Please submit your employment documents" - Delivered, No response - Automated sequence (attempt 3) - 22 Mar 14:00
- WhatsApp to David Ng: "Hi David, just checking in on your document submission..." - Delivered, Responded - Manual - 20 Mar 16:30
- Bulk email to Jan 2026 cohort (22 recipients): "Placement opportunities - March update" - 20 delivered, 14 opened - Bulk campaign - 18 Mar 09:00

---

#### Tab 2: Automated Sequences

**Active Sequences**:

Each sequence is a configured multi-step outreach workflow:

**Sequence 1: Post-Training Document Collection**
- Trigger: Trainee completes training
- Step 1: Day 1 - Email: "Congratulations! Next steps for employment verification"
- Step 2: Day 5 - SMS: "Reminder: Upload your employment documents"
- Step 3: Day 10 - WhatsApp: "Hi [name], we haven't received your documents yet..."
- Step 4: Day 15 - Email: "Final reminder before manual follow-up"
- Step 5: Day 20 - Escalate to coordinator queue for manual intervention
- Active trainees in this sequence: 14
- Sequence completion rate: 68% respond before escalation

**Sequence 2: Pre-Training Onboarding**
- Trigger: Trainee enrolled
- Step 1: Day 0 - Email: "Welcome to [programme]! Here's what to expect"
- Step 2: Day -3 (before start) - SMS: "Your training starts on [date]. See you at [venue]"
- Active trainees: 8

**Sequence 3: Employer Follow-Up**
- Trigger: Candidates submitted to employer
- Step 1: Day 3 - Email to employer: "Following up on the candidates we submitted"
- Step 2: Day 7 - Email: "Gentle reminder - please provide feedback on submitted candidates"
- Step 3: Day 10 - Escalate to account manager

Each sequence shows:
- Visual flow diagram (step 1 -> step 2 -> ... )
- Active count (how many recipients are currently in the sequence)
- Performance metrics (response rate per step, drop-off between steps)
- Pause/resume toggle per sequence
- Edit button to modify steps

**Create New Sequence** button: Opens a step builder interface.

---

#### Tab 3: Templates

**Message Template Library**:

Organised by category:
- **Enrolment**: Welcome email, SingPass form link, application received, enrolment confirmed
- **Training**: Schedule update, module reminder, assessment results, completion certificate
- **Post-Training**: Document request, upload reminder, verification confirmed, placement update
- **Employer**: Candidate submission, follow-up, feedback request, placement confirmation
- **Administrative**: Status change notification, deadline reminder, escalation notice

Each template shows:
- Template name
- Channel (email/SMS/WhatsApp)
- Subject line (for email)
- Message body with merge fields: `{{trainee_name}}`, `{{programme_name}}`, `{{cohort_date}}`, `{{document_deadline}}`, etc.
- Last used date
- Usage count

**Template Editor**:
- Rich text editor for email templates
- Plain text editor for SMS/WhatsApp
- Merge field insertion (dropdown of available fields)
- Preview mode (renders with sample data)
- Save as draft / Publish

---

#### Tab 4: Campaigns

**Campaign List** (bulk outreach runs):

| Campaign | Recipients | Channel | Sent | Opened | Responded | Date |
|----------|-----------|---------|------|--------|-----------|------|
| Mar placement opportunities | 22 trainees | Email | 22 | 14 (64%) | 6 (27%) | 18 Mar |
| Document deadline reminder | 14 trainees | SMS | 14 | - | 8 (57%) | 15 Mar |
| Q1 employer update | 8 employers | Email | 8 | 6 (75%) | 3 (38%) | 1 Mar |

**Create Campaign** workflow:
1. Select audience: Choose by programme, cohort, stage, or manual selection
2. Select template: Pick from template library or compose new
3. Select channel: Email, SMS, or WhatsApp
4. Schedule: Send now or schedule for a specific date/time
5. Preview: See merged message for first 3 recipients
6. Confirm and send

**Campaign Detail** (expandable):
- Recipient list with individual delivery/open/response status
- Response rate over time (line chart showing opens/responses over 7 days)
- Bounce/failure details

---

#### Tab 5: Analytics

**Response Rate Trends** (line chart):
- Monthly response rates by channel over 6 months
- Shows which channels are improving/declining

**Best Performing Times** (heatmap):
- Day of week x time of day heatmap showing when messages get the most responses
- Recommendation: "Best time to send email: Tuesday 10:00-11:00"

**Outreach Effectiveness by Trainee Segment**:
- Response rates broken down by programme, cohort age, employment status
- "ICT trainees respond best to WhatsApp (68%), BA trainees prefer email (42%)"

**Sequence Funnel Analysis**:
- For each automated sequence, a funnel showing drop-off at each step
- Identifies which steps need optimisation

## Interactions

1. **Activity feed filter**: Real-time filtering by channel, status, recipient type
2. **Activity entry click**: Expands to show full message content and delivery timeline
3. **Sequence flow diagram click**: Opens sequence editor
4. **Sequence pause/resume**: Toggle with confirmation
5. **Template edit**: Opens rich text/plain text editor with merge field support
6. **Template preview**: Renders template with sample trainee data
7. **Create Campaign wizard**: 5-step guided flow
8. **Campaign detail expand**: Shows per-recipient status
9. **Analytics chart hover**: Tooltips with exact values
10. **Best times heatmap hover**: Shows response count and rate for that time slot

## Mock Data

- 50 communication entries across 4 channels over 30 days
- 3 active automated sequences with step-level performance data
- 15 message templates across 5 categories
- 3 completed campaigns with per-recipient tracking
- 6 months of response rate trend data
- Heatmap data for best sending times

## Acceptance Criteria

- [ ] Channel summary strip shows 4 channels with delivery and response metrics
- [ ] Activity feed displays chronological communications with status badges and filters
- [ ] Automated sequences show visual flow diagrams with per-step metrics
- [ ] Sequence pause/resume toggle works
- [ ] Template library is organised by category with merge field support
- [ ] Template editor supports rich text (email) and plain text (SMS/WhatsApp)
- [ ] Template preview renders with sample data
- [ ] Create Campaign wizard walks through 5 steps (audience, template, channel, schedule, confirm)
- [ ] Campaign detail shows per-recipient delivery status
- [ ] Analytics tab shows response rate trends, best times heatmap, and segment analysis
- [ ] Sequence funnel analysis identifies drop-off points

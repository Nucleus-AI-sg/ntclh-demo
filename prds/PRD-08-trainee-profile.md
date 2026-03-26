# PRD-08: Trainee Profile

## Overview

A full 360-degree view of an individual trainee, serving as the "single canonical record" promised by the centralised data repository. This page consolidates everything about a trainee - personal details, enrolment assessment, training progress, documents, communications, placement activity, and audit trail - into one comprehensive view. Replaces the need to piece together information from CRM, SharePoint, email, and Excel.

## Route

`/trainee/:id` (accessed by clicking any trainee name across the platform)

## Proposal Mapping

- Feature 3 subsection: Centralised Data Repository ("one canonical record per trainee")
- Feature 1 subsection: Stakeholder Portals & Audit Trails
- Feature 2 subsection: Adaptive Assessment & Career Roadmaps

## User Stories

- As a **coordinator**, I want to see a trainee's complete history in one place so I can make informed decisions without switching between systems.
- As a **coordinator**, I want to review a trainee's AI assessment alongside their actual outcomes so I can evaluate recommendation quality.
- As an **account manager**, I want to see a trainee's full competency profile so I can pitch them to employers effectively.
- As a **coordinator**, I want a complete audit trail of every action taken on a trainee's record for compliance purposes.

## Layout & Components

### 1. Profile Header

Full-width header:
- **Name**: Marcus Lee
- **NRIC**: S****567A (masked)
- **Status badge**: "Training in Progress" (colour-coded by lifecycle stage)
- **Programme**: Business Analyst Certification (Mar 2026 cohort)
- **Coordinator**: Sarah Tan
- **Quick actions**: Send Message, Update Status, Generate Report, Export Record

### 2. Lifecycle Progress Bar

Horizontal stepper spanning the full width below the header:

```
Applied (1 Feb) -> Enrolled (15 Feb) -> Training (3 Mar) -> [Completed] -> [Placed] -> [Verified]
```

Active stage highlighted, future stages greyed. Each completed stage is clickable to jump to the relevant section below.

### 3. Tabbed Content Area

Six tabs organising the trainee's record:

---

#### Tab 1: Overview

**Personal Details Card**:
- Full name, age, gender
- Contact: email, mobile, address (partial)
- Highest qualification, institution, graduation year
- Current/most recent employer and role
- SingPass verified badge (if applicable)

**Key Metrics Strip**:
- Days in programme: 23
- Training progress: 6/12 modules (50%)
- Assessment score: 82% AI suitability
- Placement matches: 3 active

**Career Roadmap Card** (from enrolment assessment):
- Visual pathway: Retail Manager -> BA Certification (12 weeks) -> Junior Business Analyst
- Target salary: $4,200-$5,500
- Comparable cohort success rate: 78%
- Confidence: High

**Recent Activity Feed** (last 10 events):
- Timestamped list of latest actions, submissions, and communications

---

#### Tab 2: Enrolment & Assessment

**Application Summary**:
- Submission date, channel (FormSG), SingPass pre-fill status
- Requested course vs AI-recommended course
- Coordinator who processed the application
- Decision: Approved / Overridden / Waitlisted

**AI Suitability Assessment** (full detail):
- Overall score: 82/100 (circular gauge)
- Recommended course: Business Analyst Certification
- Assessment reasoning (4-5 detailed bullets)
- Transferable skills identified (tagged chips with evidence)
- Alternative courses considered (ranked with scores)
- Confidence indicator and basis ("847 comparable assessments")

**Background Submitted**:
- Education history (table)
- Work experience (reverse chronological, detailed entries with employer, role, duration, responsibilities)
- Certifications
- Career goals statement (free text)

**Enrolment Form** (expandable):
- Raw form data as submitted
- SingPass Myinfo fields highlighted
- Submission metadata (timestamp, IP, device)

---

#### Tab 3: Training Progress

**Module Progress Table**:

| Module | Status | Score | Date Completed | Instructor |
|--------|--------|-------|---------------|------------|
| Business Analysis Fundamentals | Completed | 82% | 21 Mar 2026 | Dr. Tan |
| SQL & Data Tools | Completed | 78% | 28 Mar 2026 | Ms. Lim |
| Agile Methodology | In Progress | - | - | Mr. Kumar |
| Requirements Engineering | Upcoming | - | - | Dr. Tan |
| ... | ... | ... | ... | ... |

**Attendance Record**:
- Calendar view or percentage (92% attendance)
- Missed sessions flagged

**Assessment Results**:
- Individual module scores with class average comparison
- Practical project outcomes
- Instructor feedback/comments per module

**Training Completion Certificate** (if completed):
- Certificate preview with completion date and grade

---

#### Tab 4: Documents & Verification

**Required Documents Checklist**:
- Employment letter: Not submitted
- Pay slip: Uploaded 22 Mar (verified / pending / flagged)
- CPF Transaction Statement: Uploaded 22 Mar (verified / pending / flagged)

**Document Viewer**:
- Inline PDF/image preview
- OCR extraction overlay with highlighted fields
- Cross-reference check results (green ticks / red flags)

**Verification History**:
- Timeline of document submissions, reviews, and decisions
- "Auto-verified on 23 Mar by OCR engine (confidence: 97%)"
- "Confirmed by Sarah Tan on 24 Mar"

**Upload Section** (for coordinator to upload on behalf):
- Drag-and-drop zone
- Document type selector

---

#### Tab 5: Placement & Employment

**Employment Status**:
- Current status: Employed / Job-seeking / Non-responsive / Already-employed
- Employment type: Full-time / Part-time / Freelance
- Employer: TechVentures Pte Ltd
- Role: Junior Software Developer
- Start date: 1 Feb 2026
- Salary: $4,500/month
- Source: LHub-matched / Self-sourced

**Placement Match History**:
- Table of all vacancies the trainee was matched to or submitted for:

| Employer | Role | Match Score | Status | Date |
|----------|------|-------------|--------|------|
| TechCorp Pte Ltd | Junior BA | 91% | Submitted | 10 Mar |
| DataInsights Pte Ltd | BA | 76% | Available | 12 Mar |
| FinanceFirst Pte Ltd | Analyst | 68% | Declined by employer | 5 Mar |

**Interview History**:
- Scheduled/completed interviews with employer feedback
- Structured ratings if feedback was submitted

**Competency Profile** (skills radar chart):
- Visual radar chart of assessed skills
- Based on training outcomes + prior experience + AI analysis

---

#### Tab 6: Communications & Audit

**Communication Log** (full outreach history):
- Chronological feed of all messages sent and received
- Channel icon (email / SMS / WhatsApp / phone call)
- Message preview (expandable to full content)
- Delivery status (sent / delivered / opened / responded)
- Trigger (automated sequence / manual / bulk campaign)

**Audit Trail**:
- Every status change, decision, and data modification logged:
  - "Application submitted via FormSG" - 1 Feb 2026, 14:32
  - "AI assessment generated: 82% suitability for BA Cert" - 1 Feb 2026, 14:33
  - "Enrolled by Sarah Tan (approved AI recommendation)" - 3 Feb 2026, 09:15
  - "Training started - Mar 2026 cohort" - 3 Mar 2026
  - "Module 1 completed - score: 82%" - 21 Mar 2026
  - "Pay slip uploaded" - 22 Mar 2026, 16:45
  - "OCR verification: auto-verified" - 22 Mar 2026, 16:46
  - "Verification confirmed by Sarah Tan" - 24 Mar 2026, 10:00

Each entry shows: timestamp, action, actor (system/user), and data changed.

**Notes** (coordinator notes):
- Free-text notes area for coordinators to add context
- "Marcus called on 15 Mar to ask about programme timeline. Confirmed he is on track."

## Interactions

1. **Tab navigation**: Switch between 6 content tabs
2. **Lifecycle stepper click**: Scrolls to relevant tab/section
3. **Document preview**: Inline viewer with zoom and OCR highlights
4. **Skills radar hover**: Tooltips on each axis with score details
5. **Communication expand**: Click to show full message content
6. **Audit trail filter**: Filter by date range, action type, or actor
7. **Quick action - Send Message**: Opens compose modal with channel selection
8. **Quick action - Update Status**: Dropdown for lifecycle stage change
9. **Quick action - Export**: Generates PDF summary of full trainee record
10. **Placement match click**: Opens employer/vacancy detail in context
11. **Notes save**: Auto-saves coordinator notes with timestamp

## Mock Data

### Primary: Marcus Lee (Full Lifecycle)

Complete data set showing Marcus at the "training in progress" stage:
- Full personal profile with SingPass-verified fields
- AI assessment at 82% with detailed reasoning
- 6/12 training modules with scores
- 3 placement matches (1 submitted, 2 available)
- 8 communication entries across email and SMS
- 15 audit trail entries from application through to current state
- 2 coordinator notes

### Secondary Profiles (Accessible via Links)

- Amy Chen: Completed and verified trainee (shows full lifecycle)
- David Ng: Flagged verification (shows discrepancy state)
- Lisa Koh: Non-responsive (shows escalation state)

## Acceptance Criteria

- [ ] Profile header shows trainee name, masked NRIC, status badge, and programme
- [ ] Lifecycle progress bar renders all 6 stages with correct active state
- [ ] All 6 tabs render with correct content
- [ ] Overview tab shows personal details, key metrics, career roadmap, and activity feed
- [ ] Enrolment tab shows full AI assessment with score gauge, reasoning, and transferable skills
- [ ] Training tab shows module progress table with scores and attendance
- [ ] Documents tab shows checklist, inline document viewer, and verification history
- [ ] Placement tab shows employment status, match history, and competency radar chart
- [ ] Communications tab shows full outreach log with channel icons and delivery status
- [ ] Audit trail shows timestamped chronological log of all actions
- [ ] Quick actions (Send Message, Update Status, Export) are functional
- [ ] Trainee profile is accessible from any trainee name link across the platform

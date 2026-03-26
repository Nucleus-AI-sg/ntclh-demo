# PRD-04: Trainee Tracking & Verification

## Overview

The post-training trainee management page covering the full lifecycle from course completion through to employment verification. This addresses the challenge brief's pain point of onerous tracking, low trainee response rates, and manual document verification. Demonstrates multi-channel outreach automation, OCR-powered document processing, and case management workflows.

## Route

`/tracking`

## Proposal Mapping

- Feature 3: End-to-End Trainee Tracking, Integration & Automated Verification
- Subsections: Centralised Data Repository, Multi-Channel Outreach Automation, Intelligent Document Verification
- Feature 1 subsection: Stakeholder Portals & Audit Trails (trainee-facing view)
- Feature 2 subsection: Adaptive Assessment & Career Roadmaps (trainee journey view)

## User Stories

- As a **coordinator**, I want to see all post-training trainees organised by verification status so I can prioritise my follow-up efforts.
- As a **coordinator**, I want the system to automatically chase trainees for employment documents so I spend less time on manual outreach.
- As a **coordinator**, I want submitted documents to be automatically verified so I only review flagged exceptions.
- As a **coordinator**, I want to handle edge cases (deferrals, non-responsive trainees, disputed verifications) through structured workflows.
- As a **coordinator**, I want to preview what trainees see in their self-service portal so I can guide them during support calls.

## Layout & Components

### 1. Status Overview Bar

Horizontal stat cards showing:
- **Awaiting Documents**: 14 trainees
- **Documents Submitted**: 8 trainees
- **Auto-Verified**: 5 trainees
- **Flagged for Review**: 3 trainees
- **Non-Responsive**: 4 trainees
- **Verified & Complete**: 14 trainees

Each card is clickable to filter the table below.

### 2. Case Management Table

The primary working view. Columns:
- Name
- Programme Track
- Completion Date
- Employment Status (employed / job-seeking / non-responsive / unknown)
- Employment Type (full-time / part-time / freelance / already-employed)
- Placement Source (LHub-matched / self-sourced) - tracks whether NTUC LHub facilitated the placement or the trainee found employment independently
- Document Status (colour-coded: none / submitted / verified / flagged)
- Outreach Status (auto-chasing / manual follow-up / escalated)
- Days Since Completion
- Last Contact
- Actions

Filters:
- Document status (multi-select)
- Employment type (multi-select)
- Placement source (LHub-matched / self-sourced / all)
- Programme track (dropdown)
- Days since completion range
- Outreach status

### 3. Trainee Detail Slide-Over

Clicking a row opens a detailed right panel:

#### 3a. Trainee Summary

- Profile header (name, programme, cohort, completion date)
- Employment declaration (what the trainee reported)
- Employer name (if declared)

#### 3b. Outreach Timeline

A chronological feed showing all automated and manual communications:
- "Email sent: Initial employment status request" - 15 Mar 2026
- "SMS sent: Reminder to upload documents" - 20 Mar 2026
- "Email opened (no action)" - 20 Mar 2026
- "WhatsApp sent: Final reminder before escalation" - 25 Mar 2026
- "Escalated to manual follow-up" - 26 Mar 2026

Each entry shows the channel icon (email/SMS/WhatsApp), message preview, and delivery/open status.

#### 3c. Document Verification Panel

When documents have been submitted:

**Uploaded Documents** (list):
- Pay slip - Mar 2026 (PDF, uploaded 22 Mar)
- CPF Transaction Statement - Feb 2026 (PDF, uploaded 22 Mar)

**OCR Extraction Results** (auto-populated):
- Employer Name: "TechVentures Pte Ltd"
- Employment Start Date: "1 February 2026"
- Monthly Salary: "$4,500"
- Employment Type: "Full-time"
- CPF Contribution Detected: Yes

**Cross-Reference Check**:
- Employer matches declared employer: Yes (green tick)
- Employment date aligns with programme completion: Yes (green tick)
- Salary within expected range for role: Yes (green tick)
- Overall: **Auto-Verified** (or **Flagged** with specific discrepancy highlighted in red)

**Document Preview**: Inline PDF/image viewer showing the uploaded document with OCR-highlighted fields

#### 3d. Coordinator Actions

- **Approve Verification**: Confirm auto-verified result
- **Override & Approve**: Manually approve despite flags
- **Request Resubmission**: Send automated message requesting clearer documents
- **Flag for Review**: Escalate to supervisor
- **Record Manual Outcome**: For phone-confirmed employment
- **Mark Non-Responsive**: After exhausting outreach

### 4. Outreach Automation Panel (Collapsible)

Shows the automated outreach configuration:
- Outreach sequence: Day 1 (email), Day 5 (SMS), Day 10 (WhatsApp), Day 15 (escalate)
- Response rates by channel: Email 34%, SMS 45%, WhatsApp 62%
- Toggle to pause automation for individual trainees

### 5. Bulk Operations Bar

Appears when multiple rows are selected:
- "Send Bulk Reminder" (select channel)
- "Update Status" (batch status change)
- "Export Selected" (CSV download)

### 6. Trainee Self-Service Preview (Tab)

A second top-level tab ("Trainee View") alongside the default "Case Management" tab. This shows what a trainee sees when they log in, previewed from the coordinator's perspective. Selecting a trainee from the case table and switching to this tab renders their self-service view.

#### 6a. Journey Progress Tracker

A horizontal stepper showing the selected trainee's lifecycle:

```
Application    Enrolled    Training    Completed    Placed    Verified
   [done]       [done]     [done]      [active]      [ ]       [ ]
```

Each completed step shows the date. The active step is highlighted.

#### 6b. Action Required Banner

Contextual message based on the trainee's current status:
- Post-training: "Please upload your employment documents by 30 April to complete verification."
- Placed: "Congratulations on your placement! Upload your first pay slip to complete verification."

#### 6c. Career Roadmap Card

The personalised roadmap generated during enrolment:
- Current state (prior role and experience)
- Training completed (programme, modules, scores)
- Target role with expected salary range and success rate

#### 6d. Document Upload Section

- Required documents checklist with status indicators (not uploaded / uploaded / verified)
- Drag-and-drop upload zone (simulated)
- Verification status message after upload

#### 6e. Placement Opportunities

AI-recommended vacancies visible to the trainee:
- Company, role, match level (High/Medium), location
- "Express Interest" button for each

#### 6f. Activity Timeline

Chronological feed of the trainee's key events (application, enrolment, training milestones, outreach received, documents uploaded).

## Interactions

1. **Status card click**: Filters case table by that status
2. **Table row click**: Opens trainee detail slide-over
3. **Document preview**: Inline viewer with zoom and OCR highlights
4. **Approve verification**: Success toast, moves trainee to "Verified" status
5. **Bulk selection**: Checkbox on each row, bulk action bar appears
6. **Outreach timeline expand**: Shows full message content on click
7. **OCR field highlight**: Hovering an extracted field highlights the corresponding region in the document preview
8. **Tab switch to Trainee View**: Renders selected trainee's self-service portal preview
9. **Simulated document upload**: Drag-and-drop with progress bar, then mock OCR result
10. **Express interest click**: Confirmation toast on vacancy in trainee view

## Mock Data

### Featured Verification: Amy Chen (Auto-Verified)

- Programme: ICT Career Conversion, completed 1 Feb 2026
- Employer: TechVentures Pte Ltd (full-time Software Developer)
- Documents: Pay slip and CPF statement uploaded
- OCR: All fields extracted and cross-referenced successfully
- Status: Auto-verified, pending coordinator confirmation

### Featured Flag: David Ng (Discrepancy)

- Programme: Business Analyst Certification, completed 15 Jan 2026
- Declared employer: DataInsights Pte Ltd
- Pay slip employer name: "DataInsights Solutions Pte Ltd" (slight mismatch)
- Status: Flagged for review - employer name discrepancy

### Featured Non-Responsive: Lisa Koh

- Programme: Digital Marketing Bootcamp, completed 1 Dec 2025
- 4 automated outreach attempts, 0 responses
- Status: Escalated to manual follow-up, 115 days since completion

### Featured Self-Sourced: Raj Patel (Self-Found Employment)

- Programme: ICT Career Conversion, completed 15 Feb 2026
- Found employment independently (not via NTUC LHub matching)
- Employer: StartupXYZ Pte Ltd (Junior Developer, full-time)
- Placement source: Self-sourced
- Documents: Pay slip uploaded, auto-verified
- Status: Verified - counted in placement outcomes regardless of source

This demonstrates the challenge brief's requirement to track "both assisted and self-sourced job placements."

### Additional Trainees (10-12)

Mix of statuses: awaiting documents, submitted, verified, flagged, non-responsive, already-employed (retention verification), and self-sourced placements.

## Acceptance Criteria

- [ ] Status overview bar shows 6 status categories with counts
- [ ] Case management table supports sorting and filtering by all columns
- [ ] Trainee detail slide-over displays profile, outreach timeline, and document panel
- [ ] OCR extraction results display with cross-reference checks (green ticks / red flags)
- [ ] Document preview renders inline with highlighted OCR fields
- [ ] Verification approve/override actions update trainee status
- [ ] Outreach timeline shows multi-channel communication history
- [ ] Bulk operations bar appears on multi-select with reminder and status update options
- [ ] Amy Chen demonstrates the happy-path auto-verification flow
- [ ] David Ng demonstrates the flagged-discrepancy review flow
- [ ] Lisa Koh demonstrates the non-responsive escalation flow
- [ ] "Trainee View" tab renders the self-service portal for the selected trainee
- [ ] Journey progress tracker shows correct lifecycle stage
- [ ] Career roadmap card displays personalised pathway
- [ ] Document upload simulation works with progress bar and mock OCR result
- [ ] Placement opportunities list shows matched vacancies with "Express Interest"

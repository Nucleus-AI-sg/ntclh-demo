# PRD-02: Coordinator Dashboard

## Overview

The primary command centre for programme coordinators, directly addressing the challenge brief's "Sarah" use case. This page provides real-time visibility across all active trainees and programmes, surfacing priority actions, at-risk placements, and key metrics in a single view. It replaces the current workflow of switching between CRM, SharePoint, email, and Excel.

## Route

`/` (home page)

## Proposal Mapping

- Feature 1: Cloud-Based Platform & Programme Management Dashboard
- Subsections: Unified Cloud Portal, Real-Time Coordinator Command Centre, Programme Operations Workbench

## User Stories

- As a **coordinator**, I want to see a morning summary of priority actions so I can address urgent items first.
- As a **coordinator**, I want to view all active trainees across programmes, organised by lifecycle stage, so I have end-to-end visibility.
- As a **coordinator**, I want to spot at-risk placements and supply-demand mismatches so I can intervene proactively.
- As a **coordinator**, I want quick access to enrolment, tracking, matching, and analytics from a single screen.

## Layout & Components

### 1. Morning Alerts Banner

A dismissible alert strip at the top showing priority items:
- "5 trainees approaching documentation deadline (due in 3 days)"
- "2 employers awaiting candidate submissions"
- "ICT Mar 2026 cohort: 3 unfilled employer slots"

Each alert is clickable and navigates to the relevant detail.

### 2. Programme Summary Cards (Row)

A horizontal row of 3 cards, one per programme track:

| Programme | Enrolled | In Training | Completed | Placed | Verified |
|-----------|----------|-------------|-----------|--------|----------|
| ICT Career Conversion (SCTP) | 12 | 8 | 15 | 10 | 7 |
| Business Analyst Certification | 8 | 6 | 10 | 6 | 4 |
| Digital Marketing Bootcamp | 5 | 4 | 8 | 5 | 3 |

Each card shows a mini progress bar and a placement rate percentage. Clicking a card filters the trainee table below.

### 3. Key Metrics Row

4 stat cards:
- **Total Active Trainees**: 76 (with trend arrow vs last month)
- **Overall Placement Rate**: 72% (with target indicator at 80%)
- **Pending Verifications**: 14
- **At-Risk Placements**: 5 (red highlight)

### 4. Trainee Lifecycle Pipeline

A Kanban-style horizontal pipeline showing trainee counts at each stage:

`Applied (6) -> Enrolled (25) -> In Training (18) -> Completed (33) -> Placed (21) -> Verified (14)`

Each column is clickable to filter the table below. Visual indicator shows bottlenecks (stages with unexpectedly high counts).

### 5. Trainee Table

A sortable, filterable data table with columns:
- Name
- Programme Track
- Cohort
- Current Stage (colour-coded badge)
- Days in Stage
- Risk Flag (icon)
- Last Activity
- Actions (view, contact, escalate)

Filters above the table:
- Programme track (dropdown)
- Stage (multi-select)
- Risk level (all / at-risk / on-track)
- Cohort (dropdown)
- Search by name

### 6. Recent Activity Feed

A compact timeline in a sidebar panel showing the latest 10 events:
- "Marcus Lee submitted enrolment application" - 2h ago
- "Pay slip uploaded by Amy Chen" - 3h ago
- "TechCorp Pte Ltd confirmed interview for David Ng" - 5h ago
- etc.

### 7. Quick Action Buttons

- "Process Enrolments" -> `/enrolment`
- "Review Documents" -> `/tracking`
- "View Matches" -> `/matching`
- "Generate Report" -> `/analytics`

## Interactions

1. **Alert dismiss**: Alerts can be dismissed individually; state persists in session
2. **Programme card click**: Filters trainee table by programme
3. **Pipeline column click**: Filters trainee table by stage
4. **Table row click**: Opens a trainee detail slide-over panel with full profile summary
5. **Table sort**: Click column headers to sort
6. **Filter changes**: Table updates immediately (client-side filtering)
7. **Activity feed auto-scroll**: Simulated new events appear periodically (optional animation)

## Mock Data

- 25 trainee records with varied lifecycle stages, risk levels, and activity histories
- 3 programme track summaries with aggregate metrics
- 10 recent activity events with timestamps
- 5 morning alert items

## Acceptance Criteria

- [ ] Morning alerts banner displays with clickable, dismissible items
- [ ] 3 programme summary cards render with correct aggregate counts
- [ ] 4 key metric stat cards display with trend indicators
- [ ] Kanban pipeline visualises trainee counts across 6 lifecycle stages
- [ ] Trainee table supports sorting by all columns
- [ ] Trainee table supports filtering by programme, stage, risk, cohort, and name search
- [ ] Clicking a trainee row opens a detail slide-over panel
- [ ] Recent activity feed shows timestamped events
- [ ] Quick action buttons navigate to the correct routes

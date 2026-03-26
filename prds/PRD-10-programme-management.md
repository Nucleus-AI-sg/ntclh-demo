# PRD-10: Programme Management

## Overview

The operational hub for managing programme tracks, cohorts, training schedules, and enrolment capacity. Coordinators use this page to set up new cohorts, configure programme parameters, monitor cohort health, and manage the training pipeline. This replaces the master Excel sheets and SharePoint documents currently used to track programme operations.

## Route

`/programmes` (list view)
`/programme/:id` (individual programme detail)

## Proposal Mapping

- Feature 1: Cloud-Based Platform & Programme Management Dashboard
- Subsections: Programme Operations Workbench, Unified Cloud Portal

## User Stories

- As a **coordinator**, I want to view all active programmes and cohorts in one place so I can manage my operational workload.
- As a **coordinator**, I want to configure cohort settings (capacity, schedule, modules) so new cohorts are properly set up.
- As a **programme leader**, I want to compare cohort performance across programmes so I can identify trends and allocate resources.
- As a **coordinator**, I want to manage the enrolment pipeline for each cohort so I know how many seats remain.

## Layout & Components

### Programme List View (`/programmes`)

#### 1. Programme Cards

One card per programme track, showing:

**ICT Career Conversion (SCTP)**
- Active cohorts: 2 (Mar 2026, Jun 2026)
- Total enrolled: 38
- Capacity utilisation: 76%
- Placement rate (completed cohorts): 75%
- Next cohort start: Jun 2026

**Business Analyst Certification**
- Active cohorts: 2 (Mar 2026, Jun 2026)
- Total enrolled: 30
- Capacity utilisation: 80%
- Placement rate: 70%
- Next cohort start: Jun 2026

**Digital Marketing Bootcamp**
- Active cohorts: 1 (Mar 2026)
- Total enrolled: 18
- Capacity utilisation: 72%
- Placement rate: 68%
- Next cohort start: Sep 2026

Each card links to the programme detail view.

#### 2. Cohort Timeline

A Gantt-style horizontal timeline showing all cohorts across programmes:

```
         Jan    Feb    Mar    Apr    May    Jun    Jul    Aug
ICT:     [===Jan 2026===]    [====Mar 2026====]   [==Jun 2026...
BA:      [===Jan 2026===]    [====Mar 2026====]   [==Jun 2026...
DM:                          [==Mar 2026==]
```

Colour-coded by programme. Hover shows cohort details. Active cohorts are bold.

#### 3. Cross-Programme Metrics

| Metric | ICT | BA | DM | Overall |
|--------|-----|----|----|---------|
| Avg Completion Rate | 83% | 85% | 80% | 83% |
| Avg Placement Rate | 75% | 70% | 68% | 72% |
| Avg Time to Placement | 38 days | 45 days | 42 days | 42 days |
| Enrolment Conversion | 78% | 75% | 70% | 76% |

---

### Programme Detail View (`/programme/:id`)

#### 1. Programme Header

- **Programme name**: ICT Career Conversion (SCTP)
- **Duration**: 16 weeks
- **Cohort capacity**: 25 per cohort
- **Training provider**: [Partner name]
- **Programme lead**: Sarah Tan
- **Status**: Active

Quick actions: Create New Cohort, Edit Programme Settings, Export Programme Report

#### 2. Tabbed Content

---

##### Tab 1: Cohort Management

**Active Cohorts Table**:

| Cohort | Start Date | End Date | Enrolled | Capacity | Status | Completion Rate |
|--------|-----------|----------|----------|----------|--------|----------------|
| Mar 2026 | 3 Mar | 22 Jun | 20/25 | 80% | In Training | - |
| Jun 2026 | 1 Jun | 20 Sep | 8/25 | 32% | Enrolling | - |

**Completed Cohorts** (collapsible):

| Cohort | Enrolled | Completed | Placed | Verified | Placement Rate |
|--------|----------|-----------|--------|----------|----------------|
| Jan 2026 | 22 | 18 | 15 | 12 | 83% |
| Oct 2025 | 20 | 17 | 12 | 10 | 71% |

**Cohort Detail** (expandable per cohort):
- Trainee roster with individual status
- Module schedule and progress
- Key dates (start, mid-point assessment, end, placement deadline)
- Cohort-specific metrics

**Create New Cohort** form:
- Start date, capacity, training location
- Module schedule template (auto-populated from programme)
- Instructor assignments
- Enrolment deadline

---

##### Tab 2: Curriculum & Modules

**Module List**:

| # | Module Name | Duration | Instructor | Assessment Type |
|---|------------|----------|------------|-----------------|
| 1 | Software Engineering Fundamentals | 2 weeks | Dr. Tan | Written + Practical |
| 2 | Web Development | 3 weeks | Ms. Lim | Project-based |
| 3 | Database Management | 2 weeks | Mr. Kumar | Written exam |
| 4 | Cloud Computing | 2 weeks | Ms. Chen | Practical assessment |
| 5 | Agile & DevOps | 2 weeks | Dr. Tan | Group project |
| 6 | Capstone Project | 3 weeks | All | Presentation + Demo |
| 7 | Career Preparation | 2 weeks | External | CV + Mock interview |

Each module expandable to show:
- Learning objectives
- Prerequisites
- Assessment criteria and weightings
- Average historical scores

---

##### Tab 3: Enrolment Pipeline

**Pipeline Funnel** for the active enrolling cohort:

```
Enquiries:        45
Applications:     32  (71% conversion)
AI Assessed:      32  (100% processed)
Approved:         18  (56% approval)
Enrolled:          8  (44% acceptance)
Remaining capacity: 17 seats
```

**Application Queue** (mini version of `/enrolment` filtered for this programme):
- Pending applications for this programme
- Quick approve/reject actions
- Link to full enrolment page

**Waitlist** (if over-subscribed):
- Ranked list of waitlisted applicants with AI scores

---

##### Tab 4: Performance & Outcomes

**Cohort Comparison Chart** (bar chart):
- Completion rates across all cohorts
- Placement rates across all cohorts
- Trend line showing improvement/decline

**Outcome Breakdown** (for completed cohorts):
- Employment type distribution (full-time, part-time, freelance, already-employed)
- Sector distribution (where trainees were placed)
- Average salary achieved vs target
- Time-to-placement distribution (histogram)

**Top Placement Employers** (for this programme):
- Ranked list of employers who hired the most trainees
- TechCorp Pte Ltd: 5 placements
- CloudServe Asia: 3 placements
- DataInsights Pte Ltd: 2 placements

---

##### Tab 5: Programme Settings

**Configuration** (editable form):
- Programme name and description
- Duration and module count
- Default cohort capacity
- Enrolment criteria and prerequisites
- Assessment weightings
- Post-training tracking period (e.g., 180 days)
- Document requirements for verification

**Training Partners**:
- Partner organisation details
- Instructor roster
- Training venue details

**Government Scheme Mapping**:
- SSG course code and funding tier
- WSG programme classification
- Reporting requirements and deadlines

## Interactions

1. **Programme card click**: Navigates to programme detail view
2. **Cohort timeline hover**: Shows cohort summary tooltip
3. **Cohort row expand**: Shows trainee roster and schedule
4. **Create New Cohort**: Form modal with validation and auto-populated defaults
5. **Module expand**: Shows detailed curriculum information
6. **Pipeline funnel click**: Drills down to applications at that stage
7. **Cohort comparison chart hover**: Tooltips with exact values
8. **Settings edit**: Inline editing with save/cancel
9. **Export Programme Report**: Generates PDF with programme summary and outcomes

## Mock Data

### 3 Programme Tracks

Each with:
- 2-3 cohorts (1 completed, 1 active, 1 upcoming)
- Full module/curriculum structure
- Enrolment pipeline data for upcoming cohort
- Historical outcome data for completed cohorts

### ICT Career Conversion (Primary)

- 4 cohorts: Oct 2025 (completed), Jan 2026 (completed), Mar 2026 (in training), Jun 2026 (enrolling)
- 7 modules with detailed curriculum
- Enrolment pipeline: 45 enquiries -> 8 enrolled for Jun cohort
- Outcome data: 75% placement rate across completed cohorts

## Acceptance Criteria

- [ ] Programme list shows 3 programme cards with key metrics
- [ ] Cohort timeline renders as a Gantt-style horizontal chart
- [ ] Cross-programme comparison table displays correctly
- [ ] Programme detail header shows programme info and quick actions
- [ ] Cohort Management tab shows active and completed cohorts with expandable detail
- [ ] Create New Cohort form opens with auto-populated defaults
- [ ] Curriculum tab shows module list with expandable detail
- [ ] Enrolment Pipeline tab shows funnel visualisation and application queue
- [ ] Performance tab shows cohort comparison charts and outcome breakdowns
- [ ] Settings tab shows editable programme configuration
- [ ] Government scheme mapping section displays SSG/WSG codes

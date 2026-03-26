# PRD-09: Employer Management

## Overview

A CRM-like employer relationship management page. Account managers and coordinators use this to manage the employer network, track engagement health, maintain vacancy pipelines, review hiring history, and build employer preference profiles that feed into the AI matching engine. This replaces scattered CRM records, email threads, and Excel sheets used to manage employer relationships.

## Route

`/employers` (list view)
`/employer/:id` (individual employer profile)

## Proposal Mapping

- Feature 4 subsection: Employer Pipeline & Smart Ranking, Placement Quality & Employer Retention
- Feature 3 subsection: Seamless CRM & External System Integration
- Feature 1 subsection: Stakeholder Portals & Audit Trails

## User Stories

- As an **account manager**, I want a single view of all my employer accounts with engagement health indicators so I can prioritise relationship management.
- As an **account manager**, I want to manage vacancies and track pipeline progress for each employer so I never miss a hiring window.
- As a **coordinator**, I want to see which employers have capacity for placements so I can direct trainees effectively.
- As an **account manager**, I want to build employer preference profiles so the AI matching engine makes better recommendations.

## Layout & Components

### Employer List View (`/employers`)

#### 1. Summary Metrics Bar

- **Total Employers**: 8 active
- **Open Vacancies**: 12 across all employers
- **Placements This Quarter**: 14
- **Avg Time to Fill**: 28 days
- **At-Risk Relationships**: 2 (engagement dropping)

#### 2. Employer Table

| Company | Sector | Account Manager | Open Vacancies | Placements (YTD) | Engagement | Last Contact |
|---------|--------|----------------|----------------|-------------------|------------|-------------|
| TechCorp Pte Ltd | Technology | Rachel Wong | 2 | 3 | High | 22 Mar |
| DataInsights Pte Ltd | Analytics | Rachel Wong | 2 | 1 | Medium | 15 Mar |
| GreenTech Solutions | Sustainability | Rachel Wong | 1 | 0 | Low | 2 Mar |
| ... | ... | ... | ... | ... | ... | ... |

**Engagement** column uses colour-coded badges:
- **High** (green): Active hiring, recent placements, responsive
- **Medium** (amber): Has vacancies but slower engagement
- **Low** (red): No recent activity, at-risk relationship

Filters: sector, engagement level, account manager, vacancy status

#### 3. Quick Actions

- "Add New Employer" (opens creation form)
- "Export Employer Report" (CSV/PDF)

---

### Employer Profile View (`/employer/:id`)

#### 1. Employer Header

- **Company name**: TechCorp Pte Ltd
- **Logo** (placeholder)
- **Sector**: Technology
- **Size**: 150-500 employees
- **Location**: Tanjong Pagar, Central
- **Account Manager**: Rachel Wong
- **Engagement badge**: High (green)
- **Partner since**: Jun 2025

Quick actions: Add Vacancy, Send Message, Schedule Meeting, Export Profile

#### 2. Tabbed Content

---

##### Tab 1: Overview

**Company Details Card**:
- Registered address
- Company registration number (UEN)
- Industry/sector
- Employee count
- Key contact: "Jennifer Loh, HR Manager" (email, phone)
- Secondary contact: "Alex Tan, Hiring Manager - Tech" (email, phone)

**Relationship Summary**:
- Total placements via NTUC LHub: 3
- Active vacancies: 2
- Average time to fill: 22 days
- Candidate acceptance rate: 67% (4 submitted, 3 hired, 1 declined)
- 6-month retention rate: 67% (2 of 3 retained)

**Engagement Timeline** (last 6 months):
- Mini bar chart showing monthly touchpoints (meetings, emails, placements)

**Account Manager Notes**:
- "TechCorp expanding their BA team in Q2. Jennifer mentioned 3-4 more hires expected by June. Strong preference for candidates with retail/finance analytics backgrounds."

---

##### Tab 2: Vacancies

**Active Vacancies Table**:

| Role | Salary Range | Posted | Days Open | Candidates Submitted | Status |
|------|-------------|--------|-----------|---------------------|--------|
| Junior Business Analyst | $4,000-$5,500 | 5 Mar | 21 | 3 | Interviewing |
| Data Analyst | $4,500-$6,000 | 10 Mar | 16 | 2 | Screening |

Each vacancy expandable to show:
- Full job description
- Required qualifications and skills
- AI-parsed competency requirements (extracted from JD)
- Submitted candidates with status (submitted / shortlisted / interviewed / offered / hired / rejected)
- Matching recommendations ("4 additional trainees match this vacancy")

**Closed/Filled Vacancies** (collapsible section):
- Historical vacancies with outcome (filled / cancelled / expired)
- Time-to-fill metrics per role

**Add Vacancy Button**: Opens a form for manual vacancy entry with fields for title, description, salary range, location, requirements, and hiring timeline.

---

##### Tab 3: Hiring Preferences

**AI Preference Profile** (built from hiring history and explicit inputs):

The preference profile that feeds the matching engine:

- **Preferred Backgrounds**: Business/Finance degrees, retail management experience
- **Technical Skills Valued**: SQL, data analysis, Excel advanced
- **Soft Skills Valued**: Structured thinking, attention to detail, stakeholder communication
- **Cultural Fit Indicators**: "Process-oriented, collaborative, comfortable with ambiguity"
- **Deal-Breakers**: None specified
- **Salary Benchmarks**: $4,000-$6,000 range for junior roles

**Preference Sources**:
- Derived from 3 successful placements (auto-learned)
- Explicit input from Jennifer Loh (12 Feb 2026)
- Interview feedback patterns (structured ratings analysis)

**Edit Preferences**: Account manager can manually adjust any field. Changes are flagged as "manually updated" vs "AI-derived".

---

##### Tab 4: Placement History

**Placements Table**:

| Trainee | Role | Start Date | Programme | Status | Retention |
|---------|------|-----------|-----------|--------|-----------|
| Alex Wong | Software Developer | Jan 2026 | ICT SCTP | Active | 3 months |
| Ben Chua | Business Analyst | Oct 2025 | BA Cert | Active | 6 months |
| Carol Teo | Data Analyst | Jul 2025 | ICT SCTP | Left | 4 months |

Each row expandable to show:
- Placement match score at time of submission
- Interview feedback (if captured)
- Employer satisfaction rating
- Retention notes ("Carol left for a senior role elsewhere - positive outcome")

**Placement Quality Metrics**:
- Placement satisfaction average: 4.2/5
- Retention rate: 67%
- Average match score of hired candidates: 84%

---

##### Tab 5: Communications & Meetings

**Communication Log**:
- Chronological feed of all communications with this employer
- Email threads, meeting notes, phone call summaries
- Channel icon, date, participants, summary

**Upcoming Meetings**:
- Scheduled meetings/calls with employer contacts

**Meeting Notes** (expandable entries):
- "15 Mar - Quarterly review with Jennifer. Discussed Q2 hiring plans. 3-4 BA roles expected. Prefer candidates who can start by May."

---

##### Tab 6: Audit Trail

Full log of employer record changes:
- "Employer profile created by Rachel Wong" - 15 Jun 2025
- "Vacancy added: Junior Business Analyst" - 5 Mar 2026
- "Marcus Lee submitted for Junior BA role" - 10 Mar 2026
- "Interview feedback received: Marcus Lee - 4.5/5" - 18 Mar 2026
- etc.

## Interactions

1. **Employer table row click**: Navigates to employer profile
2. **Engagement badge click**: Shows breakdown of engagement scoring factors
3. **Vacancy expand**: Shows full detail with submitted candidates
4. **Add Vacancy**: Form modal with validation
5. **Edit Preferences**: Inline editing of AI preference profile
6. **Placement row expand**: Shows match details and feedback
7. **Communication expand**: Full message/note content
8. **Quick action - Add Vacancy**: Opens vacancy creation form
9. **Quick action - Send Message**: Opens compose modal
10. **"View Matches" link**: Navigates to `/matching` filtered for this employer

## Mock Data

### Primary: TechCorp Pte Ltd

- 2 active vacancies, 3 historical placements
- Strong engagement profile
- Detailed preference profile
- 12 communication entries over 9 months
- Interview feedback for 4 candidates

### Additional Employers (7)

Each with varying levels of detail:
- DataInsights Pte Ltd: Medium engagement, 2 vacancies
- GreenTech Solutions: Low engagement, 1 vacancy (at-risk)
- FinanceFirst Pte Ltd: High engagement, 2 vacancies
- MediaWorks Agency: Medium engagement, 1 vacancy
- CloudServe Asia: High engagement, 2 vacancies
- RetailPro Holdings: Low engagement, 1 vacancy
- HealthTech SG: New relationship, 1 vacancy

## Acceptance Criteria

- [ ] Employer list view shows 8 employers with engagement badges and vacancy counts
- [ ] Summary metrics bar displays 5 aggregate stats
- [ ] Table supports sorting and filtering by sector, engagement, account manager
- [ ] Employer profile header shows company details and quick actions
- [ ] All 6 tabs render with correct content
- [ ] Overview shows relationship summary with engagement timeline chart
- [ ] Vacancies tab shows active and historical vacancies with candidate pipeline
- [ ] Hiring preferences tab shows AI-derived and manually-set preference profile
- [ ] Placement history shows all past placements with retention status
- [ ] Communications tab shows full interaction log
- [ ] Add Vacancy form creates a new vacancy entry
- [ ] Edit Preferences allows inline modification of the AI preference profile

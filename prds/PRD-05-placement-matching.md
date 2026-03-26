# PRD-05: Placement Matching

## Overview

The intelligent trainee-to-employer matching interface for account managers and coordinators. Demonstrates semantic skills analysis, real-time vacancy tracking, and AI-ranked placement recommendations. This directly addresses the challenge brief's pain point of laborious manual matching with outdated CVs and inconsistent quality.

## Route

`/matching`

## Proposal Mapping

- Feature 4: Intelligent Placement Matching & Recommendation Engine
- Subsections: Semantic Skills Analysis & Matching, Employer Pipeline & Smart Ranking, Placement Quality & Employer Retention
- Feature 1 subsection: Stakeholder Portals & Audit Trails (employer-facing view)

## User Stories

- As an **account manager**, I want to see AI-ranked trainee recommendations for each employer vacancy so I can submit the best candidates quickly.
- As an **account manager**, I want to understand why the AI ranked candidates in a specific order so I can justify recommendations to employers.
- As an **account manager**, I want to track vacancy pipelines across my employer portfolio so I never miss a placement window.
- As a **coordinator**, I want to see which trainees are unmatched so I can prioritise outreach for alternative opportunities.
- As an **account manager**, I want to preview the employer's candidate pipeline view so I can see what employers see when reviewing candidates.

## Layout & Components

### 1. View Toggle

Three primary views, toggled via tabs:
- **By Employer** (default): Vacancies grouped by employer, with ranked candidate lists
- **By Trainee**: Unmatched trainees with ranked vacancy recommendations
- **Employer Portal Preview**: What the employer sees when reviewing their candidate pipeline

### 2. Employer Pipeline View (Default)

#### 2a. Employer Cards (Left Sidebar)

Vertical list of employers with:
- Company name and logo
- Number of open vacancies
- Pipeline health indicator (green/amber/red)
- Last engagement date

#### 2b. Vacancy Detail (Main Panel)

When an employer is selected:

**Vacancy Header**:
- Job title: "Junior Business Analyst"
- Company: TechCorp Pte Ltd
- Salary range: $4,000-$5,500
- Location: Central (Tanjong Pagar)
- Hiring timeline: "Interviewing now, target start Apr 2026"
- Status: Open (posted 5 Mar 2026)

**Employer Preferences** (from employer profile):
- Preferred background: Business/Finance degree holders
- Cultural fit notes: "Structured, detail-oriented, comfortable with ambiguity"
- Past hiring: 3 placements via NTUC LHub (2 retained >6 months)

**AI-Ranked Candidates** (table):

| Rank | Name | Match Score | Programme | Key Strengths | Status |
|------|------|-------------|-----------|---------------|--------|
| 1 | Marcus Lee | 91% | BA Cert | Retail analytics, stakeholder mgmt, BA training complete | Available |
| 2 | Priya Sharma | 85% | BA Cert | Finance background, SQL certified | Available |
| 3 | Wei Ming | 78% | ICT SCTP | Data analysis, Python skills | In discussion with another employer |
| 4 | John Tan | 72% | BA Cert | Project management, BA training in progress | Available (completes Apr) |

Each candidate row expands to show:
- **Match Reasoning**: 3-4 bullets explaining why the AI ranked this candidate here
- **Skills Radar Chart**: Visual comparison of candidate skills vs vacancy requirements
- **Transferable Skills**: Tagged chips with relevance indicators
- **Potential Concerns**: Any gaps or risks flagged by the AI

#### 2c. Candidate Actions

For each candidate:
- **Submit to Employer**: Generates an employer-facing profile
- **Schedule Interview**: Opens a mock scheduling interface
- **Bookmark**: Save for later consideration
- **Dismiss**: Remove from this vacancy's recommendations with reason

### 3. Trainee Pipeline View

#### 3a. Unmatched Trainees List

Trainees who have completed training but are not yet placed:
- Name, programme, completion date
- Number of recommended vacancies
- Days since completion
- Engagement status (active job search / passive / already-employed)

#### 3b. Trainee Match Detail

When a trainee is selected:
- Trainee competency profile (skills radar chart)
- Ranked vacancy recommendations
- Application/interview history
- AI-suggested actions ("Consider submitting to TechCorp - strong match, hiring now")

### 4. Matching Dashboard (Top Strip)

Summary metrics:
- **Open Vacancies**: 12 across 8 employers
- **Available Trainees**: 18 (completed, seeking placement)
- **Matches Submitted This Month**: 8
- **Interview Conversion Rate**: 62%
- **Active Placement Discussions**: 5

### 5. Employer Portal Preview (Tab)

A third tab showing the employer-facing self-service view for the currently selected employer. This demonstrates what hiring managers see when they log in.

#### 5a. Employer Dashboard Header

- Company name and logo (e.g., "TechCorp Pte Ltd")
- Account manager: "Rachel Wong"
- Active vacancies count
- Total placements via NTUC LHub

#### 5b. Candidate Pipeline Kanban

Columns per vacancy:
- **Submitted** (new candidates from NTUC LHub)
- **Shortlisted** (employer expressed interest)
- **Interview Scheduled**
- **Offered**
- **Hired** / **Passed**

Each candidate card shows name, programme, suitability level (High/Medium), key skills tags, and submitted date.

#### 5c. Candidate Detail Modal

Clicking a candidate card opens:
- Candidate profile (name, qualification, programme, competencies) - no personal data shown (PDPA-compliant)
- AI match summary: "Why this candidate was recommended" - 3 bullets
- Employer actions: Shortlist, Schedule Interview, Pass (with reason), Submit Feedback (structured form with 1-5 ratings for technical skills, communication, cultural fit), Confirm Hire

#### 5d. Interview Feedback Form

Structured form for post-interview feedback:
- Overall impression (1-5 stars)
- Technical skills, communication, cultural fit (1-5 each)
- Free-text comments
- Decision: Proceed to offer / Hold / Decline

#### 5e. Hiring History

Table of past placements: hire date, role, candidate name, retention status, satisfaction rating.

### 6. Skills Radar Chart Component

A reusable radar/spider chart comparing:
- Candidate's skill levels (blue)
- Vacancy requirements (red outline)
- Overlap highlighted in purple

Axes include: Technical Skills, Domain Knowledge, Communication, Problem Solving, Leadership, Industry Experience.

## Interactions

1. **Employer card click**: Loads employer vacancies in main panel
2. **Candidate row expand**: Shows detailed match reasoning and skills chart
3. **Submit to employer**: Confirmation modal showing the profile that would be sent, then success toast
4. **View toggle**: Switches between employer-centric, trainee-centric, and employer portal views
5. **Skills radar hover**: Tooltips showing specific skill assessment details
6. **Dismiss candidate**: Prompts for reason (dropdown), removes from list
7. **Sort candidates**: By match score, availability date, or programme
8. **Employer portal - Shortlist/Pass**: Updates candidate card position in Kanban columns
9. **Employer portal - Submit feedback**: Form validation, success toast
10. **Employer portal - Confirm hire**: Celebration animation, updates pipeline status

## Mock Data

### Featured Employer: TechCorp Pte Ltd

- 2 open vacancies: Junior Business Analyst, Data Analyst
- 3 previous placements through NTUC LHub
- Preference profile: structured candidates, Business/Finance background preferred
- Pipeline health: Amber (1 vacancy open >30 days)

### Featured Match: Marcus Lee -> TechCorp Junior BA

- 91% match score
- Reasoning: BA certification completed with distinction, 10 years retail analytics experience, strong stakeholder management, cultural fit with TechCorp's structured environment
- Skills radar showing strong overlap in Domain Knowledge, Communication, Problem Solving

### Additional Employers (7)

- DataInsights Pte Ltd (2 vacancies)
- GreenTech Solutions (1 vacancy)
- FinanceFirst Pte Ltd (2 vacancies)
- MediaWorks Agency (1 vacancy)
- CloudServe Asia (2 vacancies)
- RetailPro Holdings (1 vacancy)
- HealthTech SG (1 vacancy)

### Unmatched Trainees (8-10)

Mix of available, in-discussion, and already-employed (passive monitoring).

## Acceptance Criteria

- [ ] View toggle switches between employer-centric, trainee-centric, and employer portal views
- [ ] Employer sidebar lists 8 employers with vacancy counts and pipeline health
- [ ] Selecting an employer shows vacancy details and AI-ranked candidates
- [ ] Candidate rows expand to show match reasoning and skills radar chart
- [ ] Skills radar chart renders with candidate vs vacancy comparison
- [ ] "Submit to Employer" action shows confirmation modal
- [ ] Trainee view shows unmatched trainees with ranked vacancy recommendations
- [ ] Matching dashboard strip displays 5 summary metrics
- [ ] Marcus Lee appears as top-ranked candidate for TechCorp's Junior BA vacancy
- [ ] Employer portal tab renders Kanban pipeline for the selected employer
- [ ] Candidate cards in employer portal show PDPA-compliant profiles (no personal data)
- [ ] Shortlist and Pass actions update Kanban columns
- [ ] Interview feedback form captures structured ratings
- [ ] Hiring history table shows past placements with retention status

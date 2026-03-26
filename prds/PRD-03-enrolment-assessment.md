# PRD-03: Enrolment & AI Assessment

## Overview

The AI-powered enrolment processing page, directly addressing the challenge brief's "Marcus" use case. Coordinators review incoming applications alongside AI-generated suitability assessments, course recommendations, and personalised career roadmaps. This demonstrates how the custom fine-tuned LLM replaces inconsistent manual assessments by salespeople.

## Route

`/enrolment`

## Proposal Mapping

- Feature 2: AI-Powered Intelligent Enrolment & Assessment Engine
- Subsections: Custom Fine-Tuned Workforce LLM, Evidence-Based Fine-Tuning Pipeline, Adaptive Assessment & Career Roadmaps
- Feature 1 subsection: Smart Enrolment Forms & SingPass

## User Stories

- As a **coordinator**, I want to review a queue of pending enrolment applications so I can process them efficiently.
- As a **coordinator**, I want to see the AI's suitability assessment for each applicant so I can make informed enrolment decisions.
- As a **coordinator**, I want to understand why the AI recommended a particular course so I can override with confidence when needed.
- As a **coordinator**, I want to view a personalised career roadmap generated for the applicant so I can discuss it during the enrolment conversation.

## Layout & Components

### 1. Application Queue (Left Panel)

A vertical list of pending applications, each showing:
- Applicant name
- Date submitted
- Requested course
- AI suitability score (colour-coded: green >80%, amber 60-80%, red <60%)
- Priority flag (new / follow-up required)

The queue is sortable by date, AI score, or priority.

### 2. Application Detail (Main Panel)

When an application is selected, the main panel shows:

#### 2a. Applicant Profile Header

- Name, age, NRIC (masked: S****567A)
- Contact details (email, phone)
- Current employment status
- Highest qualification
- "SingPass Verified" badge (simulated) or "Manual Submission" label

#### 2b. Background Summary

Structured display of the applicant's submitted data:
- **Education**: Degree/diploma details, institution, year
- **Work Experience**: Reverse chronological list with employer, role, duration, key responsibilities
- **Certifications**: Any existing qualifications
- **Career Goals**: Free-text statement from the application form

#### 2c. AI Assessment Panel (Highlighted Section)

This is the centrepiece of the page. A visually distinct card/section:

**Suitability Score**: Large circular gauge showing the AI's score (e.g., 82/100)

**Recommended Course**: "Business Analyst Certification" (may differ from the applicant's requested course)

**Assessment Reasoning** (3-4 bullet points):
- "10 years retail management experience demonstrates strong analytical and stakeholder management skills transferable to Business Analyst roles"
- "Degree in Business Administration provides foundational understanding of business processes and data interpretation"
- "Career goal alignment: expressed interest in data-driven decision-making roles"
- "Comparable cohort outcomes: 78% of career switchers with similar backgrounds completed the BA programme successfully"

**Transferable Skills Identified**:
Tags/chips: Stakeholder Management, Data Analysis (Basic), Process Optimisation, Team Leadership, Customer Insights

**Confidence Indicator**: "High confidence - based on 847 comparable historical assessments"

**Alternative Courses** (ranked):
1. Business Analyst Certification - 82% match
2. Digital Marketing Bootcamp - 61% match
3. ICT Career Conversion - 45% match

#### 2d. Career Roadmap

A visual timeline/pathway:

```
Current State          Training Phase         Post-Training Target
Retail Manager    ->   BA Certification   ->  Junior Business Analyst
                       (12 weeks)
Prerequisites:         Expected Outcomes:      Salary Range:
- None required        - BA fundamentals       $4,200-$5,500/month
                       - SQL & data tools
                       - Agile methodology     Timeline: 3-6 months
                                               to placement
```

With a "Comparable cohort success rate: 78%" indicator.

#### 2e. Coordinator Actions

A row of action buttons:
- **Approve** (enrol in recommended course)
- **Approve with Override** (select a different course from dropdown)
- **Request More Info** (generates a templated email)
- **Reject** (with reason dropdown)

### 3. Enrolment Form Preview (Expandable)

A collapsible section showing the raw form submission, demonstrating the FormSG integration:
- Form fields as submitted
- "SingPass Myinfo" pre-filled fields highlighted with a badge
- Submission timestamp and channel

## Interactions

1. **Queue item click**: Loads the selected application into the main panel
2. **Approve click**: Shows a confirmation modal with the enrolment details, then moves the application to "Enrolled" status with a success toast
3. **Override click**: Opens a course selection dropdown, then shows updated AI reasoning for the new course
4. **Career roadmap hover**: Tooltips on each stage with additional detail
5. **Alternative course click**: Swaps the assessment panel to show reasoning for the selected alternative
6. **Transferable skills hover**: Tooltip showing how the skill was identified from the applicant's background

## Mock Data

### Featured Application: Marcus Lee (Challenge Brief Use Case)

- **Age**: 35
- **Current Role**: Retail Manager at FairPrice (10 years)
- **Education**: Bachelor of Business Administration, SIM University (2013)
- **Requested Course**: ICT Career Conversion
- **AI Recommendation**: Business Analyst Certification (82% match)
- **AI Reasoning**: Retail management experience maps to BA competencies; ICT Career Conversion has lower success rate (45%) for applicants without technical background

### Additional Applications (5-7)

- A fresh graduate applying for Digital Marketing (high match)
- An experienced IT professional applying for ICT (high match, already-employed upskilling mode)
- A hospitality worker applying for BA (medium match)
- An applicant with incomplete information (flagged for follow-up)
- A strong multi-track candidate (high match across 2 courses)

## Acceptance Criteria

- [ ] Application queue displays 6+ pending applications with AI scores
- [ ] Queue is sortable by date, score, and priority
- [ ] Selecting an application loads the full detail panel
- [ ] AI assessment panel shows score gauge, reasoning bullets, transferable skills, and alternatives
- [ ] Career roadmap renders as a visual timeline
- [ ] "SingPass Verified" badge appears on Marcus's application
- [ ] Approve action shows confirmation and moves application to enrolled
- [ ] Override action allows course selection and updates reasoning
- [ ] Marcus Lee's application demonstrates the full "career switcher" use case from the challenge brief

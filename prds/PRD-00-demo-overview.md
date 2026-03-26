# PRD-00: Nucleus AI Demo Overview

## Purpose

A frontend-only interactive prototype of Nucleus AI, demonstrating the end-to-end career placement programme management platform proposed for NTUC LearningHub. The demo uses mock data and simulated AI responses to showcase all 6 key features without any backend infrastructure.

## Demo Objectives

1. Demonstrate **Solution Fit** against the IMDA challenge brief's problem statement
2. Walk through the 3 use cases from the challenge brief (Sarah the coordinator, Marcus the career switcher, automated compliance reporting)
3. Showcase the full trainee lifecycle: enrolment, training, post-training tracking, placement, and reporting
4. Prove the platform's ability to consolidate fragmented systems (CRM, SharePoint, email, Excel) into a single interface

## Tech Stack (Recommended)

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui component library
- **Charts**: Recharts for analytics dashboards
- **Data**: Static JSON fixtures for all mock data
- **AI simulation**: Pre-scripted responses with typing animation
- **Deployment**: Vercel (static export)

## Page Map

### Core Workflow Pages

| Route | PRD | Page | Description |
|-------|-----|------|-------------|
| `/` | PRD-02 | Dashboard | Coordinator command centre with programme overview and alerts |
| `/enrolment` | PRD-03 | Enrolment & AI Assessment | AI-powered application processing and career roadmaps |
| `/tracking` | PRD-04 | Trainee Tracking & Verification | Post-training lifecycle, document verification, and trainee self-service view |
| `/matching` | PRD-05 | Placement Matching | Trainee-to-employer matching with employer pipeline view |
| `/analytics` | PRD-06 | Analytics & Reporting | KPI dashboards and compliance report generation |
| `/assistant` | PRD-07 | AI Chat Assistant | Natural language queries against programme data |

### Entity & Detail Pages

| Route | PRD | Page | Description |
|-------|-----|------|-------------|
| `/trainee/:id` | PRD-08 | Trainee Profile | 360-degree view of an individual trainee's complete record |
| `/employers` | PRD-09 | Employer Management | CRM-like employer list, relationship health, and preference profiles |
| `/employer/:id` | PRD-09 | Employer Profile | Individual employer detail with vacancies, history, and preferences |

### Operational Pages

| Route | PRD | Page | Description |
|-------|-----|------|-------------|
| `/programmes` | PRD-10 | Programme Management | Programme tracks, cohort setup, curriculum, and enrolment pipelines |
| `/programme/:id` | PRD-10 | Programme Detail | Individual programme with cohorts, modules, and outcomes |
| `/communications` | PRD-11 | Communications Hub | Multi-channel outreach campaigns, templates, and automation sequences |
| `/documents` | PRD-12 | Document Centre | OCR verification queue, document archive, and processing analytics |
| `/ai-insights` | PRD-13 | AI Insights & Model Performance | Model accuracy, coordinator feedback loops, and strategic intelligence |
| `/settings` | PRD-14 | Integrations & Settings | CRM sync status, data import/export, government portal connections, channel config |

## Shared Layout

- **Sidebar navigation**: Persistent left sidebar with grouped links:
  - **Operations**: Dashboard, Enrolment, Tracking, Matching
  - **Management**: Programmes, Employers, Communications, Documents
  - **Intelligence**: Analytics, AI Insights, Assistant
  - **System**: Integrations & Settings
- **Top bar**: Nucleus AI logo, current user name ("Sarah Tan, Programme Coordinator"), notification bell icon
- **Breadcrumbs**: Page context trail below the top bar
- **Cross-linking**: Trainee names across all pages link to `/trainee/:id`. Employer names link to `/employer/:id`. Programme names link to `/programme/:id`.
- **Responsive**: Desktop-first but functional on tablet

## Mock Data Universe

All pages share a consistent set of mock entities:

- **3 programme tracks**: ICT Career Conversion (SCTP), Business Analyst Certification, Digital Marketing Bootcamp
- **~25 trainees**: Spread across lifecycle stages (applied, enrolled, training, completed, placed, verified)
- **8 employers**: Mix of SMEs and MNCs across sectors with varying engagement levels
- **12 open vacancies**: Across all employers
- **2 coordinators**: Sarah Tan (primary demo persona), James Lim
- **1 account manager**: Rachel Wong
- **4 cohorts**: Oct 2025 (completed), Jan 2026 (completed), Mar 2026 (active), Jun 2026 (enrolling)
- **~50 communication records**: Across email, SMS, and WhatsApp
- **~30 documents**: Pay slips, CPF statements, and employment letters in various verification states
- **6 months of historical data**: For trends, analytics, and AI performance tracking

## Demo Flow (Recommended Walkthrough)

### Primary Flow (15-20 minutes)

1. **Dashboard** (`/`) - Review morning alerts, at-risk placements, programme stats
2. **Enrolment** (`/enrolment`) - Process Marcus's application, view AI assessment and career roadmap
3. **Trainee Profile** (`/trainee/marcus-lee`) - See the full 360-degree trainee record
4. **Tracking** (`/tracking`) - Review post-training trainees, verify Amy's pay slip, preview trainee self-service view
5. **Document Centre** (`/documents`) - Process the verification queue, see OCR in action on David's flagged document
6. **Matching** (`/matching`) - View AI-ranked matches for TechCorp, review employer portal preview
7. **Employer Profile** (`/employer/techcorp`) - See TechCorp's hiring preferences and placement history
8. **Analytics** (`/analytics`) - Review placement rates, generate a mock SSG compliance report
9. **AI Insights** (`/ai-insights`) - Show how the model improves with coordinator feedback
10. **Assistant** (`/assistant`) - Ask natural language questions, demonstrate the conversational interface

### Deep Dive Options (5-10 minutes each)

- **Programme Operations**: `/programmes` -> `/programme/ict` - Show cohort management, curriculum, enrolment pipeline
- **Communications**: `/communications` - Show automated sequences, templates, campaign analytics
- **Model Transparency**: `/ai-insights` Tab 5 - Show feature importance, training data, version history

## Constraints

- No backend, database, or external API calls
- No real SingPass/Myinfo integration (simulated form pre-fill)
- No real OCR processing (simulated document verification results)
- AI chat responses are pre-scripted, not generated by a live LLM
- All trainee data is fictional
- Document viewer uses embedded mock PDFs/images

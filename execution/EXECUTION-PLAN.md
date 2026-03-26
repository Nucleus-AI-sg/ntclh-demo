# Nucleus AI Demo - Execution Plan

## Overview

This document defines the execution sequence for building the Nucleus AI demo prototype. All work is tracked in the Linear project `ntuclh demo` under parent issue **NAI-239**.

The demo is a frontend-only Next.js prototype with mock data, covering 14 routes across 13 page implementations. The skeleton app (layout, routing, placeholders) is already scaffolded.

## Dependency Structure

```
Phase 1 (Foundation)          Phase 2-3 (Pages)              Phase 4 (Integration)
========================      ==========================      ==========================
NAI-240 Mock Data Layer ----> NAI-242 Dashboard          -+
                         \--> NAI-243 Enrolment           |
                          \-> NAI-244 Tracking            |
NAI-241 UI Components ---+--> NAI-245 Matching            |
                         |--> NAI-246 Analytics           +--> NAI-255 Cross-Page
                         |--> NAI-247 Chat Assistant      |    Verification
                         |--> NAI-248 Trainee Profile     |
                         |--> NAI-249 Employer Mgmt       |
                         |--> NAI-250 Programme Mgmt      |
                         |--> NAI-251 Communications      |
                         |--> NAI-252 Document Centre     |
                         |--> NAI-253 AI Insights         |
                         +--> NAI-254 Settings           -+
```

Hard blockers: Phase 1 must complete before any page work. Phase 4 requires all pages complete.

Soft ordering within phases 2-3: sequential build order below optimises for pattern reuse and demo coherence, but pages can be parallelised if multiple agents are available.

---

## Phase 1: Foundation (parallel)

Both issues have no blockers and can be built simultaneously.

| Order | Issue | Title | Priority | What it Delivers |
|-------|-------|-------|----------|------------------|
| 1a | NAI-240 | Create shared mock data layer | Urgent | TypeScript types in `src/types/`, data fixtures in `src/data/` covering ~25 trainees, 8 employers, 3 programmes, 4 cohorts, 12 vacancies, comms, documents, analytics history |
| 1b | NAI-241 | Build shared UI component library | Urgent | StatCard, StatusBadge, DataTable, ScoreGauge, ActivityFeed, chart wrappers, LifecycleProgressBar, SlideOverPanel, FilterBar |

**Exit criteria:** All fixtures importable without errors, all shared components render in isolation.

---

## Phase 2: Primary Demo Flow (recommended sequential order)

Build in the order a demo evaluator would navigate. Each page establishes UI patterns reused by later pages.

### Step 2: Coordinator Dashboard

| Field | Value |
|-------|-------|
| Issue | NAI-242 |
| Route | `/` |
| PRD | PRD-02 |
| Stitch | `c3a1b1689a2848bc94d2e04dea46b465` |
| Design | `stitch-html/01-coordinator-dashboard.html` |
| Why this order | Landing page. Establishes the visual language: stat cards, Kanban pipeline, data table with filters, activity feed, alert banners. Every subsequent page reuses these patterns. |
| Key patterns introduced | Morning alerts, programme summary cards, lifecycle pipeline, sortable/filterable trainee table, slide-over panel, activity feed |

### Step 3: Enrolment & AI Assessment

| Field | Value |
|-------|-------|
| Issue | NAI-243 |
| Route | `/enrolment` |
| PRD | PRD-03 |
| Stitch | `c790c28bb2604d75bfe45ba6c041f821` |
| Design | `stitch-html/02-enrolment-assessment.html` |
| Why this order | Marcus use case - the challenge brief centrepiece. Introduces the AI assessment panel, circular score gauge, career roadmap timeline, and transferable skills chips. |
| Key patterns introduced | Application queue (list-detail), AI assessment card, score gauge, career roadmap, SingPass badge, approve/override actions |

### Step 4: Trainee Profile (360-degree view)

| Field | Value |
|-------|-------|
| Issue | NAI-248 |
| Route | `/trainee/[id]` |
| PRD | PRD-08 |
| Stitch | `683d0b6b36e9472bbd6904e2595b901b` |
| Design | `stitch-html/07-trainee-profile.html` |
| Why this order | Linked immediately from dashboard and enrolment (clicking any trainee name). Introduces the 6-tab detail view pattern and lifecycle progress bar used across entity pages. |
| Key patterns introduced | Profile header with status badge, lifecycle stepper, 6-tab content layout, audit trail, radar chart |

### Step 5: Trainee Tracking & Verification

| Field | Value |
|-------|-------|
| Issue | NAI-244 |
| Route | `/tracking` |
| PRD | PRD-04 |
| Stitch | `e917d129bab44d96b819827af80505f6` |
| Design | `stitch-html/03-trainee-tracking.html` |
| Why this order | Post-training flow featuring Amy (auto-verified), David (flagged), Lisa (non-responsive). Introduces the case management table, outreach timeline, document verification panel, and trainee self-service preview. Heaviest page in the demo. |
| Key patterns introduced | Case management workflow, outreach timeline with channel icons, OCR extraction panel, document viewer, bulk operations bar, trainee self-service view tab |

### Step 6: Document Centre

| Field | Value |
|-------|-------|
| Issue | NAI-252 |
| Route | `/documents` |
| PRD | PRD-12 |
| Stitch | `4b20af98fc8748e8bc57b7fa617b4a70` |
| Design | `stitch-html/11-document-centre.html` |
| Why this order | Closely related to tracking's verification flow. Reuses OCR panel and document viewer components built in step 5. Adds the split-panel reviewer, verification queue, and archive search. |
| Key patterns introduced | Split-panel document reviewer, verification queue with batch actions, searchable archive, OCR performance charts |

### Step 7: Placement Matching

| Field | Value |
|-------|-------|
| Issue | NAI-245 |
| Route | `/matching` |
| PRD | PRD-05 |
| Stitch | `90009953dda54665a597e743d78a4889` |
| Design | `stitch-html/04-placement-matching.html` |
| Why this order | Trainee-to-employer matching with Marcus as top candidate for TechCorp. Introduces radar/spider chart, Kanban pipeline (employer portal), and the 3-view toggle pattern. |
| Key patterns introduced | Skills radar chart, employer pipeline sidebar, Kanban columns, employer portal preview, interview feedback form |

### Step 8: Employer Management

| Field | Value |
|-------|-------|
| Issue | NAI-249 |
| Route | `/employers`, `/employer/[id]` |
| PRD | PRD-09 |
| Stitch | `47e7cc58b6e4447aae14a70b4341879a` |
| Design | `stitch-html/08-employer-management.html` |
| Why this order | Linked from matching page (clicking employer names). Reuses the tabbed detail view, timeline, and table patterns already established. |
| Key patterns introduced | Employer list with engagement badges, hiring preferences editor, vacancy management, placement history with retention tracking |

### Step 9: Analytics & Reporting

| Field | Value |
|-------|-------|
| Issue | NAI-246 |
| Route | `/analytics` |
| PRD | PRD-06 |
| Stitch | `139a986ccab14139bfd3e6a0d6163976` |
| Design | `stitch-html/05-analytics-reporting.html` |
| Why this order | Compliance reporting use case (challenge brief's third key use case). Chart-heavy page that builds on all Recharts wrapper components. Introduces report generation and download flows. |
| Key patterns introduced | KPI cards with sparklines, placement funnel, cohort comparison, employer heatmap, report generator with pre-checks, mock file download |

---

## Phase 3: Supporting Pages (flexible order)

These pages support deep-dive demos but are not in the primary walkthrough. Order is less critical.

### Step 10: AI Insights & Model Performance

| Field | Value |
|-------|-------|
| Issue | NAI-253 |
| Route | `/ai-insights` |
| PRD | PRD-13 |
| Stitch | `5c1d85b50fb64e3da3ad4d9956d11b60` |
| Design | `stitch-html/12-ai-insights.html` |
| Why this order | Showcases Feature 6 (self-improving AI). Benefits from Recharts patterns established in analytics. |

### Step 11: AI Chat Assistant

| Field | Value |
|-------|-------|
| Issue | NAI-247 |
| Route | `/assistant` |
| PRD | PRD-07 |
| Stitch | `a52c918a91d44426b3f8a6e3d209d952` |
| Design | `stitch-html/06-ai-chat-assistant.html` |
| Why this order | Standalone chat interface with unique component set. Minimal dependencies on other page patterns. |

### Step 12: Programme Management

| Field | Value |
|-------|-------|
| Issue | NAI-250 |
| Route | `/programmes`, `/programme/[id]` |
| PRD | PRD-10 |
| Stitch | `ca55199e071e4e87ab6bd9e9ad96d151` |
| Design | `stitch-html/09-programme-management.html` |
| Why this order | Gantt timeline and cohort management. Reuses table, chart, and tab patterns. |

### Step 13: Communications Hub

| Field | Value |
|-------|-------|
| Issue | NAI-251 |
| Route | `/communications` |
| PRD | PRD-11 |
| Stitch | `787202950c97470b8163542e0ba250fe` |
| Design | `stitch-html/10-communications-hub.html` |
| Why this order | Template editor, sequence builder, campaign wizard. Most self-contained page with the most unique UI patterns. |

### Step 14: Integrations & Settings

| Field | Value |
|-------|-------|
| Issue | NAI-254 |
| Route | `/settings` |
| PRD | PRD-14 |
| Stitch | `64c39889865c4c89b43835f717ecbdf2` |
| Design | `stitch-html/13-integrations-settings.html` |
| Why this order | Simplest page. Mostly static integration cards, config displays, and status indicators. |

---

## Phase 4: Integration

### Step 15: Cross-Page Linking & Demo Walkthrough Verification

| Field | Value |
|-------|-------|
| Issue | NAI-255 |
| Blocked by | All page issues (NAI-242 through NAI-254) |

Final integration pass:
- Verify all cross-page links (trainee, employer, programme names)
- Walk through the primary demo flow (PRD-00, 10 steps)
- Verify all 3 challenge brief use cases are demonstrable
- Ensure `npm run build` succeeds with no errors
- Remove any remaining placeholder content

---

## Parallelisation Notes

- **Phase 1:** NAI-240 and NAI-241 are fully independent. Run in parallel.
- **Phases 2-3:** All page issues are independent of each other (only blocked by phase 1). If multiple agents are available, pages can be built in parallel. The sequential order above is the recommended solo-developer path.
- **Optimal parallel grouping** (if 3 agents available after phase 1):
  - Agent A: Dashboard -> Enrolment -> Trainee Profile -> Tracking -> Document Centre
  - Agent B: Matching -> Employer Mgmt -> Analytics -> AI Insights
  - Agent C: Chat Assistant -> Programme Mgmt -> Communications -> Settings
- **Phase 4:** Must wait for all pages. Single pass.

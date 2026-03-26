# PRD-07: AI Chat Assistant

## Overview

The conversational programme assistant, demonstrating how the fine-tuned workforce LLM can be queried in natural language. Coordinators ask questions about trainees, programmes, placements, and AI reasoning without navigating structured menus. The demo uses pre-scripted responses with typing animations to simulate a live LLM.

## Route

`/assistant`

## Proposal Mapping

- Feature 1 subsection: Conversational Programme Assistant
- Feature 6: Continuous Learning & Enterprise Knowledge System

## User Stories

- As a **coordinator**, I want to ask questions about my programme data in plain English so I can get answers without navigating multiple screens.
- As a **coordinator**, I want to understand why the AI made a specific recommendation so I can decide whether to override it.
- As a **new coordinator**, I want to ask operational questions about programme rules and workflows so I can onboard faster.
- As a **programme leader**, I want to request ad-hoc summaries for leadership briefings without compiling data manually.

## Layout & Components

### 1. Chat Interface (Full Page)

A clean chat interface occupying the main content area.

#### 1a. Message Thread

Standard chat layout:
- **User messages**: Right-aligned, blue background
- **AI responses**: Left-aligned, white/light background, with Nucleus AI avatar
- AI responses include formatted elements: tables, lists, bold text, and inline data references
- Typing indicator animation before each AI response (simulated 1-2 second delay)

#### 1b. Input Bar

- Text input field with placeholder: "Ask anything about your programmes, trainees, or placements..."
- Send button
- Microphone icon (decorative, non-functional)
- Suggested prompts chips above the input (disappear after first message)

### 2. Suggested Prompts (Pre-First Message)

Displayed as clickable chips when the chat is empty:

- "Which ICT trainees completed training last month but haven't submitted documents?"
- "Why was Marcus Lee recommended for Business Analyst instead of ICT?"
- "Give me a summary of placement rates across all programmes this quarter"
- "Which employers have open vacancies that match our available BA graduates?"
- "What's the outreach response rate for the Jan 2026 cohort?"
- "Generate a briefing summary for leadership on Q1 programme performance"

### 3. Pre-Scripted Conversations

Each suggested prompt maps to a detailed pre-scripted response. The demo supports these 6 conversations plus 2-3 follow-up turns each.

#### Conversation 1: Document Chasers

**User**: "Which ICT trainees completed training last month but haven't submitted documents?"

**AI**: "I found **6 ICT Career Conversion trainees** who completed training in February 2026 and have not yet submitted employment documents:

| Name | Completion Date | Outreach Status | Last Contact |
|------|----------------|-----------------|--------------|
| David Ng | 15 Feb | 3 reminders sent | 20 Mar (no response) |
| Lisa Koh | 1 Feb | Escalated to manual | 25 Mar |
| ... | ... | ... | ... |

3 of these trainees have not responded to any automated outreach. Would you like me to generate a priority follow-up list or draft personalised outreach messages?"

**User**: "Yes, draft outreach messages for the non-responsive ones"

**AI**: (Provides 3 personalised message drafts)

#### Conversation 2: AI Reasoning

**User**: "Why was Marcus Lee recommended for Business Analyst instead of ICT?"

**AI**: "Marcus Lee was recommended for the **Business Analyst Certification** (82% match) over the **ICT Career Conversion** (45% match) for the following reasons:

**Strengths for BA track:**
- 10 years of retail management with demonstrated analytical decision-making
- Bachelor of Business Administration provides domain foundation
- Stakeholder management and process optimisation skills transfer directly
- 78% of comparable career switchers (retail management -> BA) completed successfully

**Concerns for ICT track:**
- No technical programming background or certifications
- ICT programme requires foundational coding skills from Day 1
- Historical completion rate for non-technical backgrounds in ICT: 34%

Marcus originally requested the ICT track. This is a common pattern - career switchers often equate 'tech careers' with coding roles. The BA track leverages his existing strengths whilst still moving him into the technology sector.

Would you like me to show comparable cases from previous cohorts?"

#### Conversation 3: Leadership Briefing

**User**: "Generate a briefing summary for leadership on Q1 programme performance"

**AI**: (Provides a formatted executive summary with key metrics, highlights, risks, and recommended actions)

### 4. Context Panel (Right Sidebar, Collapsible)

When the AI references specific data, a sidebar shows:
- **Referenced Trainees**: Clickable links to their profiles
- **Data Sources**: "Queried from: Trainee Database, Outreach Log, Assessment Records"
- **Confidence**: "High - based on verified programme data"

### 5. Action Suggestions

AI responses may include actionable buttons:
- "View in Tracking" -> navigates to `/tracking` with filters applied
- "Generate Report" -> navigates to `/analytics` with report type pre-selected
- "Send Outreach" -> navigates to `/tracking` with bulk selection

## Interactions

1. **Suggested prompt click**: Populates input and auto-sends
2. **Send message**: Adds user message to thread, shows typing indicator, then renders pre-scripted response
3. **Follow-up messages**: Within a conversation thread, subsequent messages map to pre-scripted follow-ups
4. **Unrecognised input**: Graceful fallback: "I can help with questions about trainees, programmes, placements, and AI assessments. Try one of these topics..." with prompt suggestions
5. **Action button click**: Navigates to the relevant page
6. **Context sidebar link click**: Opens the referenced trainee/entity detail
7. **New conversation**: Clear button resets the thread

## Mock Data

- 6 primary conversation scripts with 2-3 follow-up turns each
- Response data consistent with mock data from other pages
- Fallback responses for unrecognised inputs
- Context references linking to trainee profiles from PRD-02 and PRD-04

## Acceptance Criteria

- [ ] Chat interface renders with suggested prompt chips on empty state
- [ ] Clicking a suggested prompt sends the message and triggers a response
- [ ] AI responses render with formatted tables, lists, and bold text
- [ ] Typing indicator animates for 1-2 seconds before each response
- [ ] All 6 pre-scripted conversations produce detailed, data-rich responses
- [ ] Follow-up messages within a conversation produce relevant continuations
- [ ] Unrecognised inputs show a graceful fallback with suggestions
- [ ] Action buttons in AI responses navigate to the correct pages
- [ ] Context sidebar shows referenced entities when applicable
- [ ] "New conversation" clears the thread and restores suggested prompts

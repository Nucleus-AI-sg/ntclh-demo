# PRD-14: Integrations & Settings

## Overview

A system administration page showing how Nucleus AI connects to NTUC LHub's existing infrastructure. Displays live integration status with CRM systems, FormSG, government reporting portals, and communication channels. Also provides data import/export tools for migrating from Excel-based workflows. This directly addresses the challenge brief's performance requirement for "seamless integration with existing CRM systems and excel-based workflows."

## Route

`/settings`

## Proposal Mapping

- Feature 3 subsections: Seamless CRM & External System Integration, Future-Proof Third-Party Integration
- Feature 1 subsection: Smart Enrolment Forms & SingPass
- Performance requirement: System Integration and Scalability

## User Stories

- As a **programme leader**, I want to see all system integrations and their health status so I have confidence the platform is reliably connected to our existing tools.
- As a **coordinator**, I want to import data from our existing Excel tracking sheets so we can transition without losing historical records.
- As a **coordinator**, I want to see when data was last synced with CRM so I know the information is current.
- As an **administrator**, I want to configure notification preferences and outreach channel settings so the platform works with our communication infrastructure.

## Layout & Components

### 1. Integration Health Dashboard

A grid of integration cards, each showing connection status:

#### Active Integrations

| Integration | Status | Last Sync | Records Synced |
|------------|--------|-----------|----------------|
| **Salesforce CRM** | Connected (green) | 5 min ago | 2,847 trainee records, 312 employer records |
| **FormSG** | Connected (green) | Real-time webhook | 156 form submissions received |
| **SingPass Myinfo** | Connected (green) | On-demand | 89 verified profiles |
| **SSG Reporting Portal** | Connected (green) | Last report: 1 Mar 2026 | 4 reports submitted |
| **WSG Reporting Portal** | Connected (green) | Last report: 1 Mar 2026 | 3 reports submitted |
| **Email (SMTP)** | Connected (green) | Active | 1,240 emails sent (30 days) |
| **SMS Gateway (Twilio)** | Connected (green) | Active | 380 SMS sent (30 days) |
| **WhatsApp Business API** | Connected (green) | Active | 290 messages sent (30 days) |

#### Planned Integrations (Greyed/Coming Soon)

| Integration | Purpose | Status |
|------------|---------|--------|
| SharePoint | Document migration | Planned Q3 2026 |
| Power BI | Advanced analytics export | Planned Q3 2026 |
| JobStreet / MyCareersFuture | Vacancy feed import | Planned Q4 2026 |
| Employer ATS (various) | Bidirectional placement tracking | Planned Q4 2026 |

Each card shows:
- Integration name and logo
- Connection status indicator (green dot / amber warning / red error)
- Last successful sync timestamp
- Data volume (records synced)
- "View Details" link (expands to show sync log)

### 2. Tabbed Content

---

#### Tab 1: CRM Integration

**Sync Configuration**:
- Sync direction: Bidirectional
- Sync frequency: Every 5 minutes
- Entities synced: Trainees, Employers, Programmes, Placements
- Conflict resolution: "Nucleus AI is master for programme data, CRM is master for contact details"

**Sync Log** (last 20 entries):
- "Synced 3 new trainee records from Salesforce" - 5 min ago
- "Updated employer contact for TechCorp in Salesforce" - 12 min ago
- "Sync conflict resolved: trainee phone number updated in both systems" - 1 hr ago

**Field Mapping Table**:

| Nucleus AI Field | CRM Field | Direction | Status |
|-----------------|-----------|-----------|--------|
| Trainee Name | Contact.Name | Bidirectional | Active |
| Email | Contact.Email | CRM -> Nucleus | Active |
| Programme Status | Contact.Programme_Status__c | Nucleus -> CRM | Active |
| Placement Employer | Opportunity.Account | Nucleus -> CRM | Active |
| ... | ... | ... | ... |

---

#### Tab 2: Data Import & Migration

**Excel Import Tool**:
- "Import from Excel" button
- Supported formats: .xlsx, .csv
- Template downloads: "Trainee Import Template", "Employer Import Template", "Placement History Template"

**Import History**:

| Date | File | Records | Status | Imported By |
|------|------|---------|--------|-------------|
| 15 Feb 2026 | master_trainee_list_2025.xlsx | 847 trainees | Completed | Sarah Tan |
| 15 Feb 2026 | employer_database.xlsx | 52 employers | Completed | Rachel Wong |
| 20 Feb 2026 | placement_history_2024.csv | 234 placements | Completed (12 warnings) | Sarah Tan |

**Import Preview** (when a file is selected):
- Column mapping interface: map Excel columns to Nucleus AI fields
- Data validation: "847 rows parsed, 3 duplicates detected, 2 missing required fields"
- Preview of first 5 rows as they will be imported
- "Import" and "Cancel" buttons

**Export Options**:
- Export trainee data (CSV/Excel)
- Export employer data (CSV/Excel)
- Export placement history (CSV/Excel)
- Full data export (for backup/migration)

---

#### Tab 3: Government Portal Connections

**SSG Training Portal**:
- API connection status: Connected
- Report format version: SSG-2026-v3
- Last report submitted: "Feb 2026 Placement Outcomes" on 1 Mar 2026
- Next report due: 1 Apr 2026
- Auto-submission: Enabled (with pre-review)

**WSG Reporting Portal**:
- API connection status: Connected
- Report format version: WSG-Monthly-v2
- Last report submitted: "Feb 2026 Monthly Return" on 1 Mar 2026

**IMDA Programme Dashboard**:
- API connection status: Connected
- Quarterly summary due: 1 Apr 2026

Each portal shows: connection test button, format version, submission history, and upcoming deadlines.

---

#### Tab 4: Communication Channels

**Email Configuration**:
- SMTP server: configured
- Sender address: programmes@ntuc-lhub.sg
- Daily send limit: 500 (312 used today)
- Bounce rate (30 days): 2.1%

**SMS Configuration**:
- Provider: Twilio
- Sender ID: "NTUC LHub"
- Monthly allocation: 1,000 (380 used)
- Delivery rate: 98%

**WhatsApp Business**:
- Business account: NTUC LearningHub
- Template approval status: 8/8 approved
- Monthly allocation: 500 (290 used)

---

#### Tab 5: Platform Settings

**General**:
- Platform name: Nucleus AI
- Organisation: NTUC LearningHub
- Default timezone: SGT (UTC+8)
- Date format: DD MMM YYYY

**Data Retention**:
- Active trainee data: Indefinite
- Completed programme data: 7 years (PDPA compliance)
- Communication logs: 3 years
- Document storage: 7 years
- Auto-archival: Enabled

**Notification Preferences**:
- Morning alerts email: Enabled (07:00 SGT)
- Real-time alerts: Enabled (in-app)
- Weekly summary to leadership: Enabled (Mondays 08:00)

**User Management** (read-only in demo):

| User | Role | Status | Last Active |
|------|------|--------|-------------|
| Sarah Tan | Programme Coordinator | Active | Today |
| James Lim | Programme Coordinator | Active | Yesterday |
| Rachel Wong | Account Manager | Active | Today |
| David Chen | Programme Lead | Active | 3 days ago |

## Interactions

1. **Integration card click**: Expands to show sync log and configuration details
2. **Connection test button**: Simulates a connectivity check with success animation
3. **Import file select**: Opens column mapping interface with data validation preview
4. **Template download**: Triggers browser download of mock Excel template
5. **Export buttons**: Triggers browser download of mock CSV/Excel
6. **Tab navigation**: Switches between 5 settings tabs
7. **Sync log scroll**: Loads more historical entries
8. **Notification toggle**: Enables/disables notification types with confirmation

## Mock Data

- 8 active integration cards with health status and sync timestamps
- 4 planned integration cards
- 20 CRM sync log entries
- 3 historical import records
- 3 government portal connections with submission history
- Channel usage stats for email, SMS, WhatsApp
- 4 user accounts with roles

## Acceptance Criteria

- [ ] Integration health dashboard shows 8 connected integrations with green status indicators
- [ ] Planned integrations appear greyed out with "Planned" badges
- [ ] CRM tab shows sync configuration, field mapping, and sync log
- [ ] Data Import tab shows Excel import tool with column mapping preview
- [ ] Import history table shows 3 past imports with status
- [ ] Template download buttons trigger file downloads
- [ ] Government portal tab shows 3 portal connections with report history
- [ ] Communication channels tab shows email, SMS, WhatsApp configuration and usage
- [ ] Platform settings tab shows retention policies, notification preferences, and user list
- [ ] Connection test button simulates a health check

# PRD-12: Document Centre

## Overview

A dedicated document processing and management hub. Coordinators use this page to process incoming document submissions at scale, review OCR extraction results, manage the verification queue, and maintain a searchable document archive. This addresses the challenge brief's pain point of manual document verification being "unscalable and prone to human error."

## Route

`/documents`

## Proposal Mapping

- Feature 3 subsection: Intelligent Document Verification
- Feature 3 subsection: Centralised Data Repository

## User Stories

- As a **coordinator**, I want a dedicated queue for incoming document submissions so I can process verifications efficiently in batch.
- As a **coordinator**, I want to see OCR confidence scores so I can focus my attention on documents that need human review.
- As a **coordinator**, I want to search and retrieve any trainee's documents quickly for audit or compliance purposes.
- As a **coordinator**, I want to see verification throughput metrics so I can demonstrate efficiency gains to leadership.

## Layout & Components

### 1. Processing Metrics Bar

| Metric | Value |
|--------|-------|
| Documents Received (30 days) | 47 |
| Auto-Verified | 31 (66%) |
| Pending Review | 8 |
| Flagged | 5 |
| Avg Processing Time | 4.2 minutes |
| OCR Accuracy Rate | 94% |

### 2. Tabbed Content

---

#### Tab 1: Verification Queue

The primary working view for processing incoming documents.

**Queue Table**:

| # | Trainee | Document Type | Submitted | OCR Confidence | Status | Priority |
|---|---------|--------------|-----------|---------------|--------|----------|
| 1 | David Ng | Pay Slip | 22 Mar | 72% (Low) | Flagged | High |
| 2 | Mei Ling | CPF Statement | 23 Mar | 88% (Medium) | Pending | Medium |
| 3 | Kumar S. | Pay Slip | 23 Mar | 96% (High) | Auto-Verified | Low |
| 4 | Amy Chen | Employment Letter | 24 Mar | 91% (High) | Auto-Verified | Low |
| 5 | John Tan | Pay Slip | 24 Mar | 45% (Low) | Flagged | High |

**Filters**:
- Document type (pay slip / CPF statement / employment letter)
- Status (pending / auto-verified / flagged / manually verified / rejected)
- OCR confidence range
- Date range
- Programme track

**Batch Actions** (on multi-select):
- Approve Selected
- Flag Selected for Review
- Request Resubmission

---

#### Tab 2: Document Reviewer

Split-panel document review interface (the core verification workflow):

**Left Panel - Document Viewer**:
- Full-size inline PDF/image viewer
- Zoom, pan, rotate controls
- OCR extraction overlay toggle (highlights detected fields with coloured boxes)
- Page navigation for multi-page documents

**Right Panel - Extraction Results**:

**OCR Extracted Fields**:
| Field | Extracted Value | Confidence | Cross-Reference |
|-------|----------------|------------|-----------------|
| Employer Name | TechVentures Pte Ltd | 97% | Matches declared employer |
| Employee Name | Amy Chen | 99% | Matches trainee record |
| Pay Period | March 2026 | 95% | Within valid range |
| Gross Salary | $4,500.00 | 93% | Within expected range |
| Net Salary | $3,825.00 | 91% | - |
| CPF Employee | $450.00 | 94% | Consistent with gross |
| CPF Employer | $765.00 | 92% | Consistent with gross |

Each field shows:
- Extracted value (editable if coordinator needs to correct)
- Confidence score (colour-coded: green >90%, amber 70-90%, red <70%)
- Cross-reference result against trainee record (match / mismatch / unable to verify)
- Clickable to highlight the corresponding region in the document viewer

**Verification Decision**:
- **Auto-Verified**: All fields >90% confidence and cross-references pass
- **Needs Review**: Any field 70-90% confidence or minor cross-reference mismatch
- **Flagged**: Any field <70% confidence or major cross-reference failure

**Coordinator Actions**:
- Verify (confirm extraction is correct)
- Edit & Verify (correct any extraction errors, then verify)
- Reject (document is invalid/unreadable, request resubmission)
- Escalate (flag for supervisor review)

**Discrepancy Panel** (when flagged):
- Specific discrepancies highlighted in red:
  - "Employer name: 'DataInsights Solutions Pte Ltd' does not exactly match declared employer 'DataInsights Pte Ltd'"
  - "Employment start date: '15 January 2026' is 2 weeks before training completion date '1 February 2026'"
- Suggested resolution: "Minor name variation - likely the same employer. Verify with trainee."

---

#### Tab 3: Document Archive

**Searchable Archive**:
- Search by trainee name, employer name, document type, or date range
- All verified and processed documents accessible
- Each entry shows: trainee, document type, submission date, verification status, verified by

**Document Detail** (on click):
- Full document viewer
- OCR extraction results (as verified)
- Verification audit trail: who verified, when, any corrections made

**Archive Stats**:
- Total documents stored: 234
- By type: Pay Slips (102), CPF Statements (89), Employment Letters (43)
- Storage used: 1.2 GB

---

#### Tab 4: OCR Performance

**Accuracy Metrics** (line chart):
- OCR accuracy rate over time (6 months)
- Breakdown by document type
- Breakdown by confidence threshold

**Field-Level Accuracy**:

| Field | Accuracy | Most Common Error |
|-------|----------|-------------------|
| Employer Name | 96% | Abbreviations and Pte/Ltd variations |
| Employee Name | 99% | Rare - usually name order differences |
| Salary Amount | 93% | Decimal point misread on poor scans |
| Pay Period | 91% | Date format variations |
| CPF Amounts | 94% | Handwritten annotations cause misreads |

**Common Issues Panel**:
- "Poor scan quality accounts for 60% of low-confidence extractions"
- "Recommendation: Add upload guidelines for trainees (min 300 DPI, no photos of screens)"

**Processing Time Distribution** (histogram):
- Most documents verified in <2 minutes (auto-verified)
- Flagged documents average 8 minutes (manual review)

## Interactions

1. **Queue row click**: Opens document in the Document Reviewer tab
2. **Document viewer zoom/pan**: Standard viewer controls
3. **OCR overlay toggle**: Shows/hides extraction highlight boxes on the document
4. **Extraction field click**: Highlights the corresponding region in the viewer
5. **Field edit**: Inline editing of extracted values (for corrections)
6. **Verify/Reject actions**: Updates status with confirmation toast
7. **Batch selection**: Multi-select with bulk approve/flag actions
8. **Archive search**: Real-time search with results filtering
9. **OCR performance charts hover**: Tooltips with exact values
10. **Next/Previous document**: Navigate through the queue without returning to the table

## Mock Data

### Verification Queue (8 Documents)

1. David Ng - Pay Slip: Flagged (employer name mismatch, 72% confidence)
2. Mei Ling - CPF Statement: Pending review (88% confidence, minor date format issue)
3. Kumar S. - Pay Slip: Auto-verified (96% confidence, all cross-refs pass)
4. Amy Chen - Pay Slip: Auto-verified (97% confidence)
5. Amy Chen - CPF Statement: Auto-verified (95% confidence)
6. John Tan - Pay Slip: Flagged (very poor scan quality, 45% confidence)
7. Priya Sharma - Employment Letter: Pending (91% confidence, new employer not in system)
8. Wei Ming - CPF Statement: Auto-verified (94% confidence)

### Document Archive

- 30 historical documents across 15 trainees for archive search demo

### OCR Performance Data

- 6 months of accuracy metrics by document type and field

## Acceptance Criteria

- [ ] Processing metrics bar shows 6 key metrics including auto-verification rate
- [ ] Verification queue table shows 8 documents with confidence scores and statuses
- [ ] Queue supports filtering by document type, status, confidence range, date
- [ ] Document Reviewer shows split-panel layout with viewer and extraction results
- [ ] OCR overlay toggle highlights extracted fields on the document
- [ ] Extraction field click highlights the corresponding region in the document
- [ ] Confidence scores are colour-coded (green/amber/red)
- [ ] Cross-reference checks show match/mismatch against trainee records
- [ ] Discrepancy panel explains specific issues for flagged documents
- [ ] Coordinator can edit extracted values and verify
- [ ] Batch actions work on multi-selected queue items
- [ ] Document archive is searchable by trainee, employer, type, and date
- [ ] OCR Performance tab shows accuracy trends and field-level breakdown
- [ ] Next/Previous navigation works within the queue

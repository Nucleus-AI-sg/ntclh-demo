# PRD-13: AI Insights & Model Performance

## Overview

A transparency and continuous improvement dashboard showing how the Nucleus AI models learn, adapt, and perform over time. Displays assessment accuracy, matching quality, coordinator override patterns, and the feedback loop that drives self-improvement. This is the primary showcase for Feature 6 (Continuous Learning & Enterprise Knowledge System), demonstrating that Nucleus AI is not a static tool but a self-improving platform.

## Route

`/ai-insights`

## Proposal Mapping

- Feature 6: Continuous Learning & Enterprise Knowledge System
- Subsections: Enterprise Knowledge Extraction, Self-Improving AI Models, Strategic Intelligence & Best Practice
- Feature 2 subsection: Evidence-Based Fine-Tuning Pipeline

## User Stories

- As a **programme leader**, I want to see how the AI's accuracy improves over time so I can justify the investment in a custom model.
- As a **coordinator**, I want to understand how my overrides and feedback influence future AI recommendations so I feel ownership over the system's improvement.
- As a **programme leader**, I want to see strategic insights about which programme approaches yield the best outcomes so I can make data-driven decisions.
- As a **coordinator**, I want to see where the AI is most and least confident so I know when to trust it and when to apply extra scrutiny.

## Layout & Components

### 1. AI Health Score

A prominent top-level indicator:
- **Overall AI Accuracy**: 84% (up from 71% at launch)
- Breakdown: Assessment accuracy 86%, Matching accuracy 82%, Verification accuracy 94%
- Trend sparkline showing improvement over 6 months

### 2. Tabbed Content

---

#### Tab 1: Assessment Model Performance

**Accuracy Over Time** (line chart):
- X-axis: months (6-month window)
- Y-axis: accuracy percentage
- Lines: overall accuracy, by programme track
- Key milestone markers: "Model v1 launched", "Retrained on Jan cohort data", "v2 deployed"

**Prediction vs Outcome Matrix** (confusion-style table):

Shows how well the AI's suitability predictions aligned with actual outcomes:

| AI Predicted | Actually Completed | Actually Dropped | Accuracy |
|-------------|-------------------|------------------|----------|
| High Suitability (>80%) | 142 | 18 | 89% |
| Medium Suitability (60-80%) | 67 | 28 | 71% |
| Low Suitability (<60%) | 12 | 31 | 72% |

**Key Insight**: "The model is strongest at identifying high-suitability candidates (89% accuracy). Medium-suitability predictions show the most room for improvement."

**Programme-Specific Accuracy**:

| Programme | Assessment Accuracy | Sample Size | Trend |
|-----------|-------------------|-------------|-------|
| ICT Career Conversion | 87% | 156 assessments | Improving |
| Business Analyst Certification | 84% | 112 assessments | Stable |
| Digital Marketing Bootcamp | 81% | 78 assessments | Improving |

---

#### Tab 2: Coordinator Feedback Loop

**Override Analysis**:

Shows how coordinators interact with AI recommendations:

**Override Rate**: 18% of AI recommendations are overridden (down from 31% at launch)

**Override Breakdown** (pie chart):
- Approved AI recommendation as-is: 82%
- Overrode to different course: 12%
- Overrode AI score (manual adjustment): 4%
- Rejected AI recommendation entirely: 2%

**Override Patterns** (table):

| Override Type | Count | AI Was Right (Post-Hoc) | AI Was Wrong |
|---------------|-------|------------------------|--------------|
| Changed from ICT to BA | 8 | 3 (38%) | 5 (62%) |
| Changed from BA to DM | 3 | 1 (33%) | 2 (67%) |
| Approved despite low score | 6 | 2 (33%) | 4 (67%) |
| Rejected despite high score | 4 | 3 (75%) | 1 (25%) |

**Key Insight**: "Coordinator overrides from ICT to BA tracks are correct 62% of the time - the model has been retrained to better weight retail/service industry backgrounds for BA suitability."

**Feedback Impact Timeline**:
- "Oct 2025: 5 coordinators overrode ICT recommendations for retail managers. Model flagged pattern."
- "Nov 2025: Retraining incorporated retail-to-BA transfer data. BA recommendation rate for retail backgrounds increased 23%."
- "Jan 2026: Post-retrain accuracy for retail-background assessments improved from 68% to 84%."

**Top Coordinator Contributors**:
- Sarah Tan: 45 feedback signals (28 overrides, 17 confirmations)
- James Lim: 32 feedback signals (12 overrides, 20 confirmations)

---

#### Tab 3: Matching Model Performance

**Match Quality Metrics**:

| Metric | Current | 3 Months Ago | Improvement |
|--------|---------|-------------|-------------|
| Candidates submitted that were hired | 62% | 48% | +14% |
| Employer satisfaction (avg rating) | 4.2/5 | 3.8/5 | +0.4 |
| Time to fill (avg days) | 28 | 42 | -14 days |
| 6-month retention rate | 73% | 65% | +8% |

**Match Score Calibration** (scatter plot):
- X-axis: AI match score at time of submission
- Y-axis: Actual employer rating after interview/hire
- Shows correlation between predicted match quality and actual outcome
- Ideal: strong positive correlation along the diagonal

**Employer Feedback Integration**:
- "Employers who provide structured interview feedback see 15% better match quality on subsequent rounds"
- Employers ranked by feedback contribution

**Matching Patterns Discovered**:
- "Retail management -> BA roles: 82% placement success rate (discovered pattern)"
- "Hospitality -> Digital Marketing: 74% success rate (emerging pattern)"
- "Engineering -> ICT: 91% success rate (strong established pattern)"

---

#### Tab 4: Strategic Intelligence

**What Works Best** (evidence-based insights from cross-programme analysis):

**Enrolment Insights**:
- "Trainees who complete SingPass-verified applications have 12% higher completion rates"
- "Career goal clarity (assessed by AI) correlates with completion: clear goals = 88% completion vs vague goals = 64%"
- "Prior industry experience >5 years in any sector predicts 15% higher placement rates"

**Training Insights**:
- "Module 1 score >75% predicts 91% programme completion"
- "Attendance below 80% in weeks 1-4 predicts 3x higher dropout risk"
- "Trainees who engage with career roadmap materials have 22% faster time-to-placement"

**Placement Insights**:
- "Employer preference profiles with >3 data points produce 28% better match acceptance"
- "Submitting 3 candidates per vacancy yields optimal hire rate (67%) - 2 candidates: 52%, 4+ candidates: 61%"
- "Fastest placements occur when vacancy is <14 days old at time of submission"

**Labour Market Trends** (from pattern analysis):
- "BA roles demand increased 34% across employer network in Q1 2026"
- "Employers increasingly requesting data visualisation skills (mentioned in 45% of new JDs, up from 22%)"
- "Remote/hybrid work options now in 62% of vacancies (up from 41% in Q3 2025)"

---

#### Tab 5: Model Transparency

**How the AI Makes Decisions** (educational section):

**Assessment Model**:
- "The model evaluates 47 features including education, work history, skills, certifications, and career goals"
- "Top 10 most influential features" (horizontal bar chart showing feature importance):
  1. Years of relevant industry experience (weight: 0.18)
  2. Education-to-role alignment (0.14)
  3. Career goal specificity (0.12)
  4. Prior certification count (0.09)
  5. Transferable skills match (0.08)
  6. etc.

**Matching Model**:
- "The matching model considers 32 signals including skills overlap, location, salary alignment, employer preferences, and cultural indicators"
- Feature importance chart for matching

**Data Foundation**:
- Total training samples: 2,847 historical assessments
- Last retrained: 15 Mar 2026
- Data coverage: ICT (1,200), BA (890), DM (757)
- PDPA compliance: "All training data anonymised and stored within secure infrastructure"

**Model Version History**:
| Version | Date | Key Changes | Accuracy Improvement |
|---------|------|-------------|---------------------|
| v2.1 | 15 Mar 2026 | Incorporated Jan 2026 cohort outcomes | +3% assessment, +5% matching |
| v2.0 | 1 Jan 2026 | Retail-to-BA transfer learning added | +8% for retail backgrounds |
| v1.1 | 1 Nov 2025 | Initial coordinator feedback integration | +4% overall |
| v1.0 | 1 Jun 2025 | Initial model launch | Baseline |

## Interactions

1. **AI Health Score click**: Expands to show detailed breakdown
2. **Chart hover**: Tooltips with exact values and dates
3. **Override pattern row click**: Shows specific cases that contributed to the pattern
4. **Feedback timeline entry click**: Shows the specific override cases and their outcomes
5. **Scatter plot point hover**: Shows individual match details (trainee, employer, scores)
6. **Strategic insight click**: Shows supporting data and sample size
7. **Feature importance bar click**: Shows explanation of how the feature is measured
8. **Model version click**: Shows detailed changelog with before/after metrics
9. **Tab navigation**: Switches between 5 content tabs

## Mock Data

- 6 months of model accuracy data with improvement trend
- Prediction vs outcome matrix for 300 historical assessments
- 45 coordinator override records with post-hoc analysis
- Matching quality metrics with 3-month comparison
- 15 strategic insights with supporting evidence
- Model version history (4 versions)
- Feature importance rankings for assessment and matching models

## Acceptance Criteria

- [ ] AI Health Score displays overall accuracy with trend sparkline
- [ ] Assessment performance tab shows accuracy over time chart with programme breakdown
- [ ] Prediction vs outcome matrix renders with accuracy percentages
- [ ] Coordinator feedback tab shows override rate, breakdown pie chart, and patterns table
- [ ] Feedback impact timeline shows how overrides led to model improvements
- [ ] Matching performance tab shows quality metrics with 3-month comparison
- [ ] Match score calibration scatter plot shows correlation between prediction and outcome
- [ ] Strategic intelligence tab shows categorised evidence-based insights
- [ ] Labour market trends section shows emerging patterns
- [ ] Model transparency tab shows feature importance charts and version history
- [ ] All charts support hover tooltips with exact values

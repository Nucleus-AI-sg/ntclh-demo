import { MatchResult } from '@/types'

export const matchResults: MatchResult[] = [
  // ─── TechCorp Junior BA (techcorp-jba) ────────────────────────────

  {
    id: 'match-marcus-techcorp-jba',
    traineeId: 'marcus-lee',
    vacancyId: 'techcorp-jba',
    score: 91,
    reasoning: [
      'BA certification completed with distinction, demonstrating strong grasp of business analysis fundamentals',
      '10 years retail management provides deep understanding of business operations and stakeholder needs',
      'Strong communication and presentation skills evidenced by management role',
      'Cultural fit: TechCorp values structured, detail-oriented candidates - aligns with Marcus\'s retail operations background',
    ],
    strengths: [
      'Retail analytics experience',
      'Stakeholder management',
      'BA training complete',
    ],
    concerns: [
      'No prior tech industry experience',
      'May need time to adjust to tech company pace',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 65, requirementScore: 80 },
      { skill: 'Domain Knowledge', candidateScore: 85, requirementScore: 70 },
      { skill: 'Communication', candidateScore: 90, requirementScore: 75 },
      { skill: 'Problem Solving', candidateScore: 80, requirementScore: 85 },
      { skill: 'Leadership', candidateScore: 85, requirementScore: 60 },
      { skill: 'Industry Experience', candidateScore: 40, requirementScore: 70 },
    ],
  },
  {
    id: 'match-priya-techcorp-jba',
    traineeId: 'priya-sharma',
    vacancyId: 'techcorp-jba',
    score: 85,
    reasoning: [
      'Finance background provides strong quantitative and analytical reasoning relevant to business analysis',
      'SQL certified through BA programme, enabling immediate contribution to data-driven tasks',
      '9 years of professional experience demonstrates workplace maturity and reliability',
      'Finance-to-BA career path is well established with strong historical placement outcomes',
    ],
    strengths: [
      'Finance background',
      'SQL certified',
      'Quantitative skills',
    ],
    concerns: [
      'Limited stakeholder-facing experience',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 75, requirementScore: 80 },
      { skill: 'Domain Knowledge', candidateScore: 80, requirementScore: 70 },
      { skill: 'Communication', candidateScore: 70, requirementScore: 75 },
      { skill: 'Problem Solving', candidateScore: 85, requirementScore: 85 },
      { skill: 'Leadership', candidateScore: 55, requirementScore: 60 },
      { skill: 'Industry Experience', candidateScore: 60, requirementScore: 70 },
    ],
  },
  {
    id: 'match-weiming-techcorp-jba',
    traineeId: 'wei-ming',
    vacancyId: 'techcorp-jba',
    score: 78,
    reasoning: [
      'Data analytics degree and Python proficiency provide a solid technical base for business analysis tasks',
      'ICT programme training complements BA requirements with data engineering and automation skills',
      'Young professional with a growth mindset and strong academic performance',
      'Cross-programme candidates can bring a broader perspective to BA roles',
    ],
    strengths: [
      'Data analysis',
      'Python proficiency',
    ],
    concerns: [
      'Different programme track',
      'In discussion with another employer',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 82, requirementScore: 80 },
      { skill: 'Domain Knowledge', candidateScore: 60, requirementScore: 70 },
      { skill: 'Communication', candidateScore: 65, requirementScore: 75 },
      { skill: 'Problem Solving', candidateScore: 80, requirementScore: 85 },
      { skill: 'Leadership', candidateScore: 40, requirementScore: 60 },
      { skill: 'Industry Experience', candidateScore: 35, requirementScore: 70 },
    ],
  },
  {
    id: 'match-john-techcorp-jba',
    traineeId: 'john-tan',
    vacancyId: 'techcorp-jba',
    score: 72,
    reasoning: [
      'Extensive project management experience translates well to requirements gathering and stakeholder coordination',
      '12 years of professional experience brings strong organisational and leadership capabilities',
      'BA programme in progress with solid module results to date',
      'Construction sector background offers a different but valuable perspective on process improvement',
    ],
    strengths: [
      'Project management experience',
    ],
    concerns: [
      'Still in training, completes April 2026',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 55, requirementScore: 80 },
      { skill: 'Domain Knowledge', candidateScore: 70, requirementScore: 70 },
      { skill: 'Communication', candidateScore: 80, requirementScore: 75 },
      { skill: 'Problem Solving', candidateScore: 75, requirementScore: 85 },
      { skill: 'Leadership', candidateScore: 90, requirementScore: 60 },
      { skill: 'Industry Experience', candidateScore: 30, requirementScore: 70 },
    ],
  },

  // ─── TechCorp Data Analyst (techcorp-da) ──────────────────────────

  {
    id: 'match-weiming-techcorp-da',
    traineeId: 'wei-ming',
    vacancyId: 'techcorp-da',
    score: 88,
    reasoning: [
      'Data analytics degree directly aligns with the Data Analyst role requirements',
      'Python proficiency and statistical modelling experience match TechCorp\'s technical stack',
      'ICT programme training in database management strengthens SQL capabilities',
      'Strong academic foundation in quantitative methods and data visualisation',
    ],
    strengths: [
      'Python and SQL proficiency',
      'Data analytics degree',
      'Statistical modelling',
    ],
    concerns: [
      'In discussion with CloudServe Asia',
      'Limited professional experience (3 years)',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 85, requirementScore: 85 },
      { skill: 'Domain Knowledge', candidateScore: 65, requirementScore: 75 },
      { skill: 'Communication', candidateScore: 65, requirementScore: 70 },
      { skill: 'Problem Solving', candidateScore: 82, requirementScore: 80 },
      { skill: 'Leadership', candidateScore: 40, requirementScore: 50 },
      { skill: 'Industry Experience', candidateScore: 35, requirementScore: 65 },
    ],
  },
  {
    id: 'match-priya-techcorp-da',
    traineeId: 'priya-sharma',
    vacancyId: 'techcorp-da',
    score: 76,
    reasoning: [
      'Finance operations background brings strong quantitative analysis and attention to detail',
      'SQL certification from BA programme provides a good foundation for data querying',
      'Experience with financial reporting translates to BI dashboard creation',
      'May require upskilling in Python and statistical tools for the Data Analyst role',
    ],
    strengths: [
      'Quantitative analysis',
      'Financial reporting experience',
      'SQL certified',
    ],
    concerns: [
      'Limited Python experience',
      'BA programme track rather than ICT',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 65, requirementScore: 85 },
      { skill: 'Domain Knowledge', candidateScore: 78, requirementScore: 75 },
      { skill: 'Communication', candidateScore: 72, requirementScore: 70 },
      { skill: 'Problem Solving', candidateScore: 80, requirementScore: 80 },
      { skill: 'Leadership', candidateScore: 55, requirementScore: 50 },
      { skill: 'Industry Experience', candidateScore: 55, requirementScore: 65 },
    ],
  },
  {
    id: 'match-fiona-techcorp-da',
    traineeId: 'fiona-cheng',
    vacancyId: 'techcorp-da',
    score: 70,
    reasoning: [
      'Life sciences research background provides laboratory data analysis and statistical reasoning skills',
      'ICT programme training has added programming and database capabilities',
      'Methodical research approach aligns with data analysis discipline',
      'Career switch from research to tech data analysis is a viable but less direct path',
    ],
    strengths: [
      'Research methodology',
      'Statistical reasoning',
      'ICT programme completed',
    ],
    concerns: [
      'No prior business data analysis experience',
      'Career switch from life sciences may require additional orientation',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 70, requirementScore: 85 },
      { skill: 'Domain Knowledge', candidateScore: 45, requirementScore: 75 },
      { skill: 'Communication', candidateScore: 68, requirementScore: 70 },
      { skill: 'Problem Solving', candidateScore: 78, requirementScore: 80 },
      { skill: 'Leadership', candidateScore: 35, requirementScore: 50 },
      { skill: 'Industry Experience', candidateScore: 25, requirementScore: 65 },
    ],
  },

  // ─── DataInsights Business Analyst (datainsights-ba) ──────────────

  {
    id: 'match-marcus-datainsights-ba',
    traineeId: 'marcus-lee',
    vacancyId: 'datainsights-ba',
    score: 84,
    reasoning: [
      'BA certification and retail management background provide a strong foundation for process improvement analysis',
      'Stakeholder management skills are directly applicable to requirements gathering at DataInsights',
      'Experience managing large teams demonstrates facilitation and interpersonal capabilities',
      'DataInsights values structured thinkers, which aligns with Marcus\'s operational management style',
    ],
    strengths: [
      'Process improvement mindset',
      'Stakeholder management',
      'BA certification complete',
    ],
    concerns: [
      'No prior experience in a data-focused company',
      'Salary expectations may exceed range for junior role',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 60, requirementScore: 75 },
      { skill: 'Domain Knowledge', candidateScore: 80, requirementScore: 80 },
      { skill: 'Communication', candidateScore: 88, requirementScore: 80 },
      { skill: 'Problem Solving', candidateScore: 78, requirementScore: 85 },
      { skill: 'Leadership', candidateScore: 85, requirementScore: 55 },
      { skill: 'Industry Experience', candidateScore: 35, requirementScore: 60 },
    ],
  },
  {
    id: 'match-chris-datainsights-ba',
    traineeId: 'chris-loh',
    vacancyId: 'datainsights-ba',
    score: 79,
    reasoning: [
      'Civil engineering background demonstrates strong analytical thinking and structured problem-solving',
      'BA programme completed with focus on process modelling and requirements engineering',
      '11 years of professional experience brings maturity and reliability to a junior BA position',
      'Engineering-to-BA transition is well supported by transferable quantitative skills',
    ],
    strengths: [
      'Analytical thinking',
      'Process modelling skills',
      'Extensive professional experience',
    ],
    concerns: [
      'May be overqualified for a junior position',
      'Limited exposure to Agile working environments',
    ],
    skillsComparison: [
      { skill: 'Technical Skills', candidateScore: 65, requirementScore: 75 },
      { skill: 'Domain Knowledge', candidateScore: 70, requirementScore: 80 },
      { skill: 'Communication', candidateScore: 75, requirementScore: 80 },
      { skill: 'Problem Solving', candidateScore: 82, requirementScore: 85 },
      { skill: 'Leadership', candidateScore: 78, requirementScore: 55 },
      { skill: 'Industry Experience', candidateScore: 30, requirementScore: 60 },
    ],
  },
]

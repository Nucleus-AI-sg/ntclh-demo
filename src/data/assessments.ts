import { Assessment } from '@/types'
import { ApplicationStatus } from '@/types'

export const assessments: Assessment[] = [
  // 1. Marcus Lee - career switcher, the challenge brief's main use case
  {
    id: 'asmt-marcus-lee',
    traineeId: 'marcus-lee',
    overallScore: 82,
    recommendedProgrammeId: 'ba',
    requestedProgrammeId: 'ict',
    reasoning: [
      '10 years retail management experience demonstrates strong analytical and stakeholder management skills transferable to Business Analyst roles',
      'Bachelor of Business Administration provides foundational understanding of business processes and data interpretation',
      'Career goal alignment: expressed interest in data-driven decision-making roles',
      'Comparable cohort outcomes: 78% of career switchers with similar backgrounds completed the BA programme successfully',
    ],
    transferableSkills: [
      'Stakeholder Management',
      'Data Analysis (Basic)',
      'Process Optimisation',
      'Team Leadership',
      'Customer Insights',
      'Budget Management',
    ],
    confidence: 'high',
    comparableAssessments: 847,
    alternatives: [
      {
        programmeId: 'ba',
        programmeName: 'Business Analyst Certification',
        matchScore: 82,
      },
      {
        programmeId: 'dm',
        programmeName: 'Digital Marketing Bootcamp',
        matchScore: 61,
      },
      {
        programmeId: 'ict',
        programmeName: 'ICT Career Conversion (SCTP)',
        matchScore: 45,
      },
    ],
    status: ApplicationStatus.Pending,
  },

  // 2. Emily Toh - fresh graduate, strong DM fit
  {
    id: 'asmt-emily-toh',
    traineeId: 'emily-toh',
    overallScore: 88,
    recommendedProgrammeId: 'dm',
    requestedProgrammeId: 'dm',
    reasoning: [
      'Bachelor of Communications degree aligns directly with digital marketing competencies and audience engagement strategies',
      'Strong social media presence with demonstrable content creation skills across multiple platforms',
      'Creative portfolio showcases copywriting, visual design, and campaign ideation ability',
      'Fresh graduates with communications backgrounds show 82% completion rate in the DM Bootcamp',
    ],
    transferableSkills: [
      'Content Creation',
      'Social Media Management',
      'Copywriting',
      'Audience Analysis',
      'Visual Communication',
    ],
    confidence: 'high',
    comparableAssessments: 312,
    alternatives: [
      {
        programmeId: 'dm',
        programmeName: 'Digital Marketing Bootcamp',
        matchScore: 88,
      },
      {
        programmeId: 'ba',
        programmeName: 'Business Analyst Certification',
        matchScore: 52,
      },
    ],
    status: ApplicationStatus.Pending,
  },

  // 3. Benjamin Tan - experienced IT professional, upskilling
  {
    id: 'asmt-benjamin-tan',
    traineeId: 'benjamin-tan',
    overallScore: 92,
    recommendedProgrammeId: 'ict',
    requestedProgrammeId: 'ict',
    reasoning: [
      '8 years of software development experience provides a strong technical foundation for advanced ICT upskilling',
      'Already employed in the technology sector, demonstrating sustained industry commitment and practical knowledge',
      'Existing proficiency in programming languages and development workflows reduces onboarding friction',
      'Upskilling candidates with prior ICT experience achieve 91% programme completion rate',
    ],
    transferableSkills: [
      'Software Development',
      'System Design',
      'Agile Practices',
      'Technical Documentation',
      'Code Review',
    ],
    confidence: 'high',
    comparableAssessments: 534,
    alternatives: [
      {
        programmeId: 'ict',
        programmeName: 'ICT Career Conversion (SCTP)',
        matchScore: 92,
      },
      {
        programmeId: 'ba',
        programmeName: 'Business Analyst Certification',
        matchScore: 58,
      },
    ],
    status: ApplicationStatus.Pending,
  },

  // 4. Aisyah Rahman - hospitality worker, medium match for BA
  {
    id: 'asmt-aisyah-rahman',
    traineeId: 'aisyah-rahman',
    overallScore: 65,
    recommendedProgrammeId: 'ba',
    requestedProgrammeId: 'ba',
    reasoning: [
      'Customer service background provides transferable skills in stakeholder communication and problem resolution',
      'Some gaps identified in analytical and quantitative reasoning, which are core to the BA programme',
      'Hospitality management experience offers process awareness but limited exposure to data-driven workflows',
      'Comparable candidates from service-sector backgrounds show a 64% completion rate, suggesting medium suitability',
    ],
    transferableSkills: [
      'Customer Service',
      'Conflict Resolution',
      'Team Coordination',
      'Scheduling & Planning',
    ],
    confidence: 'medium',
    comparableAssessments: 289,
    alternatives: [
      {
        programmeId: 'ba',
        programmeName: 'Business Analyst Certification',
        matchScore: 65,
      },
      {
        programmeId: 'dm',
        programmeName: 'Digital Marketing Bootcamp',
        matchScore: 59,
      },
    ],
    status: ApplicationStatus.Pending,
  },

  // 5. Thomas Goh - incomplete application
  {
    id: 'asmt-thomas-goh',
    traineeId: 'thomas-goh',
    overallScore: 0,
    recommendedProgrammeId: 'ict',
    requestedProgrammeId: 'ict',
    reasoning: [
      'Application incomplete - missing employment history and education details',
      'Unable to generate full assessment without required information',
      'Recommend requesting additional details before processing',
    ],
    transferableSkills: [],
    confidence: 'low',
    comparableAssessments: 0,
    alternatives: [],
    status: ApplicationStatus.Pending,
  },

  // 6. Natalie Sim - multi-track candidate, strong for BA and DM
  {
    id: 'asmt-natalie-sim',
    traineeId: 'natalie-sim',
    overallScore: 84,
    recommendedProgrammeId: 'ba',
    requestedProgrammeId: 'ba',
    reasoning: [
      'Business degree with a marketing minor creates a strong dual-track profile suited to both BA and DM programmes',
      'Demonstrated analytical aptitude through coursework in business statistics and market research',
      'Marketing minor provides supplementary skills in audience segmentation and campaign evaluation',
      'Multi-track candidates with similar academic backgrounds show high completion rates across both programmes',
    ],
    transferableSkills: [
      'Market Research',
      'Data Interpretation',
      'Campaign Analysis',
      'Business Writing',
      'Presentation Skills',
    ],
    confidence: 'high',
    comparableAssessments: 421,
    alternatives: [
      {
        programmeId: 'ba',
        programmeName: 'Business Analyst Certification',
        matchScore: 84,
      },
      {
        programmeId: 'dm',
        programmeName: 'Digital Marketing Bootcamp',
        matchScore: 81,
      },
      {
        programmeId: 'ict',
        programmeName: 'ICT Career Conversion (SCTP)',
        matchScore: 39,
      },
    ],
    status: ApplicationStatus.Pending,
  },

  // 7. Alex Wong - previously approved
  {
    id: 'asmt-alex-wong',
    traineeId: 'alex-wong',
    overallScore: 89,
    recommendedProgrammeId: 'ict',
    requestedProgrammeId: 'ict',
    reasoning: [
      'Strong engineering background with a Bachelor of Engineering (Electrical) provides excellent technical foundations',
      'Relevant industry certifications including AWS Cloud Practitioner and Certified Scrum Master',
      'Prior project experience in embedded systems demonstrates adaptability to new technology domains',
      'Engineering graduates transitioning to ICT roles show an 87% programme completion rate',
    ],
    transferableSkills: [
      'Systems Thinking',
      'Technical Problem Solving',
      'Project Management',
      'Technical Writing',
      'Quality Assurance',
    ],
    confidence: 'high',
    comparableAssessments: 503,
    alternatives: [
      {
        programmeId: 'ict',
        programmeName: 'ICT Career Conversion (SCTP)',
        matchScore: 89,
      },
      {
        programmeId: 'ba',
        programmeName: 'Business Analyst Certification',
        matchScore: 55,
      },
    ],
    status: ApplicationStatus.Approved,
    processedBy: 'sarah-tan',
  },
]

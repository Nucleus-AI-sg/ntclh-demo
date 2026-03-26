import { ModuleProgress, ModuleStatus } from '@/types'

/** Module progress keyed by traineeId */
export const moduleProgress: Record<string, ModuleProgress[]> = {
  'marcus-lee': [
    { moduleId: 'ba-mod-01', moduleName: 'Business Analysis Fundamentals', status: ModuleStatus.Completed, score: 82, completedDate: '2026-03-21', instructor: 'Dr. Tan' },
    { moduleId: 'ba-mod-02', moduleName: 'SQL & Data Tools', status: ModuleStatus.Completed, score: 78, completedDate: '2026-03-28', instructor: 'Ms. Lim' },
    { moduleId: 'ba-mod-03', moduleName: 'Agile Methodology', status: ModuleStatus.InProgress, instructor: 'Mr. Kumar' },
    { moduleId: 'ba-mod-04', moduleName: 'Requirements Engineering', status: ModuleStatus.Upcoming, instructor: 'Dr. Tan' },
    { moduleId: 'ba-mod-05', moduleName: 'Business Process Modelling', status: ModuleStatus.Upcoming, instructor: 'Ms. Chen' },
    { moduleId: 'ba-mod-06', moduleName: 'Capstone Project', status: ModuleStatus.Upcoming, instructor: 'All' },
  ],
  'amy-chen': [
    { moduleId: 'ict-mod-01', moduleName: 'Software Engineering Fundamentals', status: ModuleStatus.Completed, score: 90, completedDate: '2026-01-19', instructor: 'Dr. Tan' },
    { moduleId: 'ict-mod-02', moduleName: 'Web Development', status: ModuleStatus.Completed, score: 88, completedDate: '2026-02-09', instructor: 'Ms. Lim' },
    { moduleId: 'ict-mod-03', moduleName: 'Database Management', status: ModuleStatus.Completed, score: 85, completedDate: '2026-02-23', instructor: 'Mr. Kumar' },
    { moduleId: 'ict-mod-04', moduleName: 'Cloud Computing', status: ModuleStatus.Completed, score: 92, completedDate: '2026-03-09', instructor: 'Ms. Chen' },
    { moduleId: 'ict-mod-05', moduleName: 'Agile & DevOps', status: ModuleStatus.Completed, score: 87, completedDate: '2026-03-23', instructor: 'Dr. Tan' },
    { moduleId: 'ict-mod-06', moduleName: 'Capstone Project', status: ModuleStatus.Completed, score: 94, completedDate: '2026-04-13', instructor: 'All' },
    { moduleId: 'ict-mod-07', moduleName: 'Career Preparation', status: ModuleStatus.Completed, score: 91, completedDate: '2026-04-26', instructor: 'External' },
  ],
  'david-ng': [
    { moduleId: 'ict-mod-01', moduleName: 'Software Engineering Fundamentals', status: ModuleStatus.Completed, score: 75, completedDate: '2026-01-19', instructor: 'Dr. Tan' },
    { moduleId: 'ict-mod-02', moduleName: 'Web Development', status: ModuleStatus.Completed, score: 72, completedDate: '2026-02-09', instructor: 'Ms. Lim' },
    { moduleId: 'ict-mod-03', moduleName: 'Database Management', status: ModuleStatus.Completed, score: 68, completedDate: '2026-02-23', instructor: 'Mr. Kumar' },
    { moduleId: 'ict-mod-04', moduleName: 'Cloud Computing', status: ModuleStatus.Completed, score: 74, completedDate: '2026-03-09', instructor: 'Ms. Chen' },
    { moduleId: 'ict-mod-05', moduleName: 'Agile & DevOps', status: ModuleStatus.Completed, score: 70, completedDate: '2026-03-23', instructor: 'Dr. Tan' },
    { moduleId: 'ict-mod-06', moduleName: 'Capstone Project', status: ModuleStatus.Completed, score: 78, completedDate: '2026-04-13', instructor: 'All' },
    { moduleId: 'ict-mod-07', moduleName: 'Career Preparation', status: ModuleStatus.Completed, score: 80, completedDate: '2026-04-26', instructor: 'External' },
  ],
}

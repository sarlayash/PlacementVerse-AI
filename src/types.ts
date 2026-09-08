export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  explanation: string;
  companyTag?: string;
}

export interface LearningContent {
  summary: string;
  keyFormulas: { name: string; formula: string; note: string }[];
  workedExamples: { problem: string; solution: string; tip: string }[];
  industryCase: { company: string; context: string; keyTakeaway: string };
  animatedConceptKey: 'percentages' | 'time-work' | 'coding-decoding' | 'blood-relations' | 'comprehension' | 'email-etiquette' | 'star-framework' | 'default';
  infographicTakeaways: string[];
}

export interface Topic {
  id: string;
  name: string;
  moduleId: number;
  moduleName: string;
  order: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  learningContent: LearningContent;
  practiceQuestions: Question[];
  challengeQuestions: Question[];
  bossQuestions: Question[];
}

export interface Module {
  id: number;
  title: string;
  shortDesc: string;
  iconName: string;
  topics: Topic[];
}

export interface LearnerProfile {
  name: string;
  institute: string;
  department: string;
  classYear: string;
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  lastActiveDate: string;
  completedTopicIds: string[];
  unlockedTopicIds: string[];
  topicScores: Record<string, { practiceBest?: number; challengeBest?: number; bossPassed?: boolean }>;
  badgesEarned: string[];
  dailyMissions: {
    id: string;
    title: string;
    target: number;
    current: number;
    completed: boolean;
    rewardXp: number;
  }[];
  realWorldSubmissions: {
    email?: { score: number; date: string; feedback: string };
    gd?: { score: number; date: string; feedback: string };
    resume?: { atsScore: number; date: string };
    linkedin?: { score: number; date: string };
  };
  predictedPlacementScore: number;
  mockTestAttempts?: Record<string, MockTestAttempt>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'Aptitude' | 'Reasoning' | 'Verbal' | 'Communication' | 'Placement' | 'Milestone' | 'Streak' | 'Special';
  icon: string;
  xpBonus: number;
  requirement?: string;
  gradient?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  institute: string;
  department: string;
  classYear: string;
  xp: number;
  streak: number;
  badgesCount: number;
  isCurrentLearner?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  isUrgent?: boolean;
}

export interface IssuedCertificateRecord {
  id: string;
  studentName: string;
  institute: string;
  type: 'ultimate' | 'quantitative' | 'verbal' | 'corporate' | 'faang-google-meta' | 'faang-amazon-apple' | 'faang-netflix-uber';
  title: string;
  issueDate: string;
  readinessScore: number;
  grade: string;
  endorsedBy: string;
  verificationCode: string;
  status: 'Active' | 'Revoked' | 'Reissued';
}

export interface FaangQuestion {
  id: string;
  testId: string;
  section: 'Quantitative & Algorithmic' | 'Advanced Systems & Reasoning' | 'High-Bar Analytical & Architecture';
  companyTag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  shortcutOrInsight: string;
  difficulty: 'Very Hard';
}

export interface FaangMockTest {
  id: string;
  title: string;
  subtitle: string;
  companyTier: string;
  companies: string[];
  scheduledDate: string;
  durationMinutes: number;
  totalQuestions: number;
  marksPerQuestion: number;
  negativeMark: number;
  passingPercentage: number;
  badgeRewardId: string;
  badgeRewardName: string;
  badgeIcon: string;
  badgeGradient: string;
  certificateTitle: string;
  description: string;
  syllabusHighlights: string[];
  questions: FaangQuestion[];
}

export interface MockTestAttempt {
  testId: string;
  completedAt: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  timeSpentSeconds: number;
  passed: boolean;
  userAnswers: Record<string, number>;
  certificateCode?: string;
}

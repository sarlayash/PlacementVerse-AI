import { LearnerProfile, Module, Topic, Announcement } from '../types';
import { INITIAL_MODULES } from '../data/learningPathData';
import confetti from 'canvas-confetti';

const STORAGE_KEY_PROFILE = 'placementverse_profile';
const STORAGE_KEY_MODULES = 'placementverse_modules';
const STORAGE_KEY_ANNOUNCEMENTS = 'placementverse_announcements';
const STORAGE_KEY_JOURNEY_STARTED = 'placementverse_journey_started';

const DEFAULT_PROFILE: LearnerProfile = {
  name: 'Kapil',
  institute: 'National Institute of Technology',
  department: 'Computer Science & Engineering',
  classYear: 'Final Year 2025',
  xp: 150,
  level: 1,
  levelTitle: 'Level 1 Rookie',
  streakDays: 1,
  lastActiveDate: new Date().toISOString(),
  completedTopicIds: [],
  unlockedTopicIds: ['mod1-topic-1'], // First topic 'Percentage' unlocked
  topicScores: {},
  badgesEarned: ['streak-fire-1'],
  dailyMissions: [
    { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 0, completed: false, rewardXp: 40 },
    { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 0, completed: false, rewardXp: 30 },
    { id: 'm3', title: 'Complete 1 Real-World Task (Email / Resume / GD)', target: 1, current: 0, completed: false, rewardXp: 30 },
  ],
  realWorldSubmissions: {},
  predictedPlacementScore: 84,
};

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🚀 India-Wide Placement Mock Drive Starting Friday!',
    content: 'All placement candidates are requested to complete Quantitative Aptitude (Time & Work, Percentages) and run ATS Resume review before the weekend simulation.',
    date: 'Today',
    author: 'Kapil (Placement Director)',
    isUrgent: true,
  },
  {
    id: 'ann-2',
    title: '🏆 Top 5% Earn Direct Referral to Top MNC Hiring Desks',
    content: 'Learners crossing 5,000 XP with 80%+ Boss Battle clearance receive verified PlacementVerse Certificates of Excellence.',
    date: 'Yesterday',
    author: 'Placement Cell Lead',
  },
];

export function getLearnerProfile(): LearnerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveLearnerProfile(profile: LearnerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to persist profile:', e);
  }
}

export function hasStartedJourney(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_JOURNEY_STARTED) === 'true';
  } catch {
    return false;
  }
}

export function setJourneyStarted(started: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY_JOURNEY_STARTED, started ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to set journey started flag:', e);
  }
}

export function calculateLevel(xp: number): { level: number; title: string; nextThreshold: number; currentBase: number } {
  if (xp < 500) {
    return { level: 1, title: 'Level 1 Rookie', nextThreshold: 500, currentBase: 0 };
  } else if (xp < 1500) {
    return { level: 2, title: 'Level 2 Apprentice', nextThreshold: 1500, currentBase: 500 };
  } else if (xp < 3500) {
    return { level: 3, title: 'Level 3 Challenger', nextThreshold: 3500, currentBase: 1500 };
  } else if (xp < 7500) {
    return { level: 4, title: 'Level 4 Pro Achiever', nextThreshold: 7500, currentBase: 3500 };
  } else {
    return { level: 5, title: 'Level 5 Placement Legend', nextThreshold: 15000, currentBase: 7500 };
  }
}

export function fireCelebrationConfetti(): void {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
    });
  } catch {
    // Ignore if not supported in test environments
  }
}

export function getModulesWithTopics(): Module[] {
  return INITIAL_MODULES;
}

export function saveUnlockedTopic(topicId: string): LearnerProfile {
  const profile = getLearnerProfile();
  if (!profile.unlockedTopicIds.includes(topicId)) {
    profile.unlockedTopicIds.push(topicId);
    saveLearnerProfile(profile);
  }
  return profile;
}

export function getCustomModules(): Module[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MODULES);
    if (!raw) return INITIAL_MODULES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_MODULES;
  }
}

export function saveCustomModules(modules: Module[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(modules));
  } catch (e) {
    console.error('Failed to save modules:', e);
  }
}

export function getAnnouncements(): Announcement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS);
    if (!raw) return DEFAULT_ANNOUNCEMENTS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ANNOUNCEMENTS;
  }
}

export function saveAnnouncements(announcements: Announcement[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(announcements));
  } catch (e) {
    console.error('Failed to save announcements:', e);
  }
}

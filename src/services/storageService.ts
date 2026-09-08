import { LearnerProfile, Module, Topic, Announcement, IssuedCertificateRecord } from '../types';
import { INITIAL_MODULES } from '../data/learningPathData';
import { INITIAL_LEADERBOARD_POOL } from '../data/leaderboardData';
import confetti from 'canvas-confetti';

const STORAGE_KEY_PROFILE = 'placementverse_profile';
const STORAGE_KEY_MODULES = 'placementverse_modules';
const STORAGE_KEY_ANNOUNCEMENTS = 'placementverse_announcements';
const STORAGE_KEY_JOURNEY_STARTED = 'placementverse_journey_started';
const STORAGE_KEY_ADMIN_AUTH = 'placementverse_admin_auth';
const STORAGE_KEY_STUDENTS = 'placementverse_students';
const STORAGE_KEY_CERTIFICATES = 'placementverse_issued_certificates';

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

// Initial mock candidates pool to populate real-time student roster
function generateInitialStudents(currentProfile: LearnerProfile): LearnerProfile[] {
  const initialRoster: LearnerProfile[] = [currentProfile];

  INITIAL_LEADERBOARD_POOL.forEach((entry, idx) => {
    if (entry.name.toLowerCase() !== currentProfile.name.toLowerCase()) {
      const isTop = idx < 3;
      initialRoster.push({
        name: entry.name,
        institute: entry.institute,
        department: entry.department,
        classYear: entry.classYear,
        xp: entry.xp,
        level: isTop ? 5 : idx < 8 ? 4 : 3,
        levelTitle: isTop ? 'Level 5 Placement Legend' : idx < 8 ? 'Level 4 Pro Achiever' : 'Level 3 Challenger',
        streakDays: entry.streak,
        lastActiveDate: new Date(Date.now() - (idx * 3600000 * 4)).toISOString(),
        completedTopicIds: isTop 
          ? ['mod1-topic-1', 'mod1-topic-2', 'mod2-topic-1', 'mod2-topic-2', 'mod3-topic-1', 'mod4-topic-1', 'mod5-topic-1']
          : ['mod1-topic-1', 'mod1-topic-2', 'mod2-topic-1'],
        unlockedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod1-topic-3', 'mod2-topic-1', 'mod2-topic-2', 'mod3-topic-1'],
        topicScores: {
          'mod1-topic-1': { practiceBest: isTop ? 100 : 85, challengeBest: isTop ? 95 : 80, bossPassed: true },
          'mod1-topic-2': { practiceBest: isTop ? 90 : 75, challengeBest: isTop ? 85 : 70, bossPassed: isTop },
        },
        badgesEarned: isTop 
          ? ['bronze-starter', 'silver-explorer', 'gold-achiever', 'platinum-master', 'diamond-legend', 'aptitude-champ', 'speed-demon', 'boss-slayer-1']
          : ['bronze-starter', 'silver-explorer', 'aptitude-champ', 'streak-fire-1'],
        dailyMissions: [
          { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 },
          { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 1, completed: true, rewardXp: 30 },
          { id: 'm3', title: 'Complete 1 Real-World Task', target: 1, current: 1, completed: true, rewardXp: 30 },
        ],
        realWorldSubmissions: {
          email: { score: isTop ? 96 : 85, date: '2025-02-14', feedback: 'Excellent corporate tone & STAR framing.' },
          gd: { score: isTop ? 94 : 80, date: '2025-02-16', feedback: 'Clear articulation with strong data points.' },
          resume: { atsScore: isTop ? 92 : 82, date: '2025-02-18' },
        },
        predictedPlacementScore: isTop ? 96 : Math.max(72, 90 - (idx * 2)),
      });
    }
  });

  return initialRoster;
}

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
    // Keep in sync with students roster
    syncProfileToRoster(profile);
    // Background sync to server API
    syncStudentToServer(profile);
    // Cross-tab broadcast
    notifyStudentsUpdated(profile);
  } catch (e) {
    console.error('Failed to persist profile:', e);
  }
}

export function notifyStudentsUpdated(student?: LearnerProfile): void {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('placementverse_students_updated', { detail: student }));
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel('placementverse_sync');
        bc.postMessage({ type: 'STUDENTS_UPDATED', student, timestamp: Date.now() });
        bc.close();
      }
    }
  } catch (e) {
    // Silently ignore broadcast failures
  }
}

export async function syncStudentToServer(student: LearnerProfile): Promise<void> {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
    }
  } catch {
    // Offline / serverless fallback
  }
}

export async function fetchServerStudents(): Promise<LearnerProfile[] | null> {
  try {
    if (typeof fetch !== 'undefined') {
      const res = await fetch('/api/students');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.students) && data.students.length > 0) {
          saveAllStudents(data.students);
          return data.students;
        }
      }
    }
  } catch {
    // Fallback to local storage
  }
  return null;
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

// ---------------- Admin Authentication ----------------
export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true' || localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    }
  } catch (e) {
    console.error('Failed to set admin auth:', e);
  }
}

export function verifyAdminCredentials(loginId: string, pass: string): boolean {
  // Required credentials: id: kapiladmin, password: admin123
  if (loginId.trim() === 'kapiladmin' && pass === 'admin123') {
    setAdminAuthenticated(true);
    return true;
  }
  return false;
}

export function adminLogout(): void {
  setAdminAuthenticated(false);
}

export { adminLogout as logoutAdmin };

// ---------------- Real-time Students Management ----------------
export function getAllStudents(): LearnerProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (!raw) {
      const seeded = generateInitialStudents(getLearnerProfile());
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(seeded));
      return seeded;
    }
    const parsed: LearnerProfile[] = JSON.parse(raw);
    return parsed;
  } catch {
    return generateInitialStudents(getLearnerProfile());
  }
}

export function saveAllStudents(students: LearnerProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Failed to save students:', e);
  }
}

function syncProfileToRoster(profile: LearnerProfile): void {
  try {
    const students = getAllStudents();
    const idx = students.findIndex(s => s.name.toLowerCase() === profile.name.toLowerCase());
    if (idx >= 0) {
      students[idx] = { ...students[idx], ...profile };
    } else {
      students.unshift(profile);
    }
    saveAllStudents(students);
  } catch (e) {
    console.error('Error syncing profile to roster:', e);
  }
}

export function updateStudentInRoster(updatedStudent: LearnerProfile): void {
  const students = getAllStudents();
  const idx = students.findIndex(s => s.name.toLowerCase() === updatedStudent.name.toLowerCase());
  if (idx >= 0) {
    students[idx] = updatedStudent;
  } else {
    students.push(updatedStudent);
  }
  saveAllStudents(students);

  // If this student is the active learner profile, update it too
  const currentProfile = getLearnerProfile();
  if (currentProfile.name.toLowerCase() === updatedStudent.name.toLowerCase()) {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updatedStudent));
  }

  syncStudentToServer(updatedStudent);
  notifyStudentsUpdated(updatedStudent);
}

export function addStudentToRoster(newStudent: LearnerProfile): void {
  const students = getAllStudents();
  // Ensure unique name
  const existingIdx = students.findIndex(s => s.name.toLowerCase() === newStudent.name.toLowerCase());
  if (existingIdx >= 0) {
    students[existingIdx] = newStudent;
  } else {
    students.unshift(newStudent);
  }
  saveAllStudents(students);
  syncStudentToServer(newStudent);
  notifyStudentsUpdated(newStudent);
}

export function deleteStudentFromRoster(studentName: string): void {
  const students = getAllStudents().filter(s => s.name.toLowerCase() !== studentName.toLowerCase());
  saveAllStudents(students);
  notifyStudentsUpdated();

  try {
    if (typeof fetch !== 'undefined') {
      fetch(`/api/students/${encodeURIComponent(studentName)}`, { method: 'DELETE' }).catch(() => {});
    }
  } catch {}
}

export function reissueBadgeForStudent(studentName: string, badgeId: string, xpBonus = 150): LearnerProfile | null {
  const students = getAllStudents();
  const student = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());
  if (!student) return null;

  if (!student.badgesEarned.includes(badgeId)) {
    student.badgesEarned.push(badgeId);
  }
  student.xp += xpBonus;
  student.lastActiveDate = new Date().toISOString();

  // Recalculate level
  const lvl = calculateLevel(student.xp);
  student.level = lvl.level;
  student.levelTitle = lvl.title;

  updateStudentInRoster(student);
  return student;
}

export function revokeBadgeForStudent(studentName: string, badgeId: string): LearnerProfile | null {
  const students = getAllStudents();
  const student = students.find(s => s.name.toLowerCase() === studentName.toLowerCase());
  if (!student) return null;

  student.badgesEarned = student.badgesEarned.filter(id => id !== badgeId);
  updateStudentInRoster(student);
  return student;
}

export function setActiveStudent(student: LearnerProfile): void {
  localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(student));
  localStorage.setItem(STORAGE_KEY_JOURNEY_STARTED, 'true');
}

// ---------------- Modules & Topics Management ----------------
export function getModulesWithTopics(): Module[] {
  return getCustomModules();
}

export function getCustomModules(): Module[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MODULES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(INITIAL_MODULES));
      return INITIAL_MODULES;
    }
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

export function addNewTopicToModule(moduleId: number, newTopic: Topic): Module[] {
  const modules = getCustomModules();
  const moduleIndex = modules.findIndex(m => m.id === moduleId);

  if (moduleIndex >= 0) {
    modules[moduleIndex].topics.push(newTopic);
  } else {
    // If module not found, add to first module
    modules[0].topics.push(newTopic);
  }

  saveCustomModules(modules);
  return modules;
}

export function deleteTopicFromModule(moduleId: number, topicId: string): Module[] {
  const modules = getCustomModules();
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  if (moduleIndex >= 0) {
    modules[moduleIndex].topics = modules[moduleIndex].topics.filter(t => t.id !== topicId);
    saveCustomModules(modules);
  }
  return modules;
}

// ---------------- Certificates Governance ----------------
const DEFAULT_INITIAL_CERTIFICATES: IssuedCertificateRecord[] = [
  {
    id: 'PV-CERT-2025-001',
    studentName: 'Aarav Sharma',
    institute: 'IIT Delhi',
    type: 'ultimate',
    title: 'Ultimate Placement Readiness Certificate (Gold Tier)',
    issueDate: '2025-02-20',
    readinessScore: 98,
    grade: 'A+ Distinguished',
    endorsedBy: 'Kapil Narula (Placement Director)',
    verificationCode: 'PV-IND-9842-DEL',
    status: 'Active',
  },
  {
    id: 'PV-CERT-2025-002',
    studentName: 'Pooja Iyer',
    institute: 'BITS Pilani',
    type: 'ultimate',
    title: 'Ultimate Placement Readiness Certificate (Gold Tier)',
    issueDate: '2025-02-21',
    readinessScore: 95,
    grade: 'A+ Distinguished',
    endorsedBy: 'Kapil Narula (Placement Director)',
    verificationCode: 'PV-IND-8812-PIL',
    status: 'Active',
  },
  {
    id: 'PV-CERT-2025-003',
    studentName: 'Kapil',
    institute: 'National Institute of Technology',
    type: 'quantitative',
    title: 'Quantitative & Logical Problem Solving Specialist',
    issueDate: '2025-02-24',
    readinessScore: 88,
    grade: 'A Superior',
    endorsedBy: 'Kapil Narula (Placement Director)',
    verificationCode: 'PV-IND-8849-NIT',
    status: 'Active',
  },
];

export function getIssuedCertificates(): IssuedCertificateRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CERTIFICATES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CERTIFICATES, JSON.stringify(DEFAULT_INITIAL_CERTIFICATES));
      return DEFAULT_INITIAL_CERTIFICATES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INITIAL_CERTIFICATES;
  }
}

export function saveIssuedCertificates(certs: IssuedCertificateRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CERTIFICATES, JSON.stringify(certs));
  } catch (e) {
    console.error('Failed to save certificates:', e);
  }
}

export function issueOrReissueCertificate(cert: IssuedCertificateRecord): IssuedCertificateRecord[] {
  const certs = getIssuedCertificates();
  const existingIdx = certs.findIndex(c => c.id === cert.id || (c.studentName === cert.studentName && c.type === cert.type));
  
  if (existingIdx >= 0) {
    certs[existingIdx] = {
      ...cert,
      status: 'Reissued',
      issueDate: new Date().toISOString().split('T')[0],
      verificationCode: `PV-REISSUE-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
    };
  } else {
    certs.unshift(cert);
  }

  saveIssuedCertificates(certs);
  return certs;
}

export function revokeCertificate(certId: string): IssuedCertificateRecord[] {
  const certs = getIssuedCertificates().map(c => {
    if (c.id === certId) {
      return { ...c, status: 'Revoked' as const };
    }
    return c;
  });
  saveIssuedCertificates(certs);
  return certs;
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

export function saveUnlockedTopic(topicId: string): LearnerProfile {
  const profile = getLearnerProfile();
  if (!profile.unlockedTopicIds.includes(topicId)) {
    profile.unlockedTopicIds.push(topicId);
    saveLearnerProfile(profile);
  }
  return profile;
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

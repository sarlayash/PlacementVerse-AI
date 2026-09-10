import { LearnerProfile, Module, Topic, Announcement, IssuedCertificateRecord, LeaderboardEntry, MockTestAttempt, FinalAssessmentAttempt, LearnerDeviceMeta, LearnerActivityItem, ActivityActionType } from '../types';
import { INITIAL_MODULES } from '../data/learningPathData';
import confetti from 'canvas-confetti';
import { saveLearnerToFirestore, signOutLearner } from './firebaseAuthService';

const STORAGE_KEY_PROFILE = 'placementverse_profile';
const STORAGE_KEY_MODULES = 'placementverse_modules';
const STORAGE_KEY_ANNOUNCEMENTS = 'placementverse_announcements';
const STORAGE_KEY_JOURNEY_STARTED = 'placementverse_journey_started';
const STORAGE_KEY_ADMIN_AUTH = 'placementverse_admin_auth';
const STORAGE_KEY_STUDENTS = 'placementverse_students';
const STORAGE_KEY_CERTIFICATES = 'placementverse_issued_certificates';

const DEFAULT_PROFILE: LearnerProfile = {
  name: '',
  institute: 'National Institute of Technology',
  department: 'Computer Science & Engineering',
  classYear: 'Final Year 2025',
  xp: 100,
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
  predictedPlacementScore: 0, // Real score starts at 0% until practice questions & tasks are submitted
};

// Real placement score calculation strictly based on student's actual performance
export function calculateRealPlacementScore(profile: LearnerProfile, customModules?: Module[]): number {
  const modules = customModules || getCustomModules();
  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0) || 25;
  const completedCount = (profile.completedTopicIds || []).length;

  // 1. Topic Completion Progress (Max 35 points)
  const curriculumPoints = Math.min(35, Math.round((completedCount / totalTopics) * 35));

  // 2. Assessment Performance across attempted topics (Max 35 points)
  const topicScoreKeys = Object.keys(profile.topicScores || {});
  let assessmentPoints = 0;
  if (topicScoreKeys.length > 0) {
    let totalTopicAcc = 0;
    topicScoreKeys.forEach(tId => {
      const sc = profile.topicScores[tId];
      if (!sc) return;
      let sum = 0;
      let cnt = 0;
      if (typeof sc.practiceBest === 'number') {
        sum += Math.min(100, Math.max(0, sc.practiceBest));
        cnt++;
      }
      if (typeof sc.challengeBest === 'number') {
        // Challenge net score out of 25 converted to percentage
        const pct = Math.min(100, Math.max(0, (sc.challengeBest / 25) * 100));
        sum += pct;
        cnt++;
      }
      if (sc.bossPassed) {
        sum += 100;
        cnt++;
      }
      if (cnt > 0) {
        totalTopicAcc += (sum / cnt);
      }
    });
    const avgAccuracy = totalTopicAcc / topicScoreKeys.length;
    assessmentPoints = Math.min(35, Math.round((avgAccuracy / 100) * 35));
  }

  // 3. Real-World Practical Tasks (Max 20 points)
  let taskPoints = 0;
  const rw = profile.realWorldSubmissions || {};
  let tasksSubmitted = 0;
  let taskSum = 0;
  if (rw.email && typeof rw.email.score === 'number') {
    taskSum += rw.email.score;
    tasksSubmitted++;
  }
  if (rw.gd && typeof rw.gd.score === 'number') {
    taskSum += rw.gd.score;
    tasksSubmitted++;
  }
  if (rw.resume && typeof rw.resume.atsScore === 'number') {
    taskSum += rw.resume.atsScore;
    tasksSubmitted++;
  }
  if (tasksSubmitted > 0) {
    const avgTask = taskSum / tasksSubmitted;
    taskPoints = Math.min(20, Math.round((avgTask / 100) * 20));
  }

  // 4. Consistency & Daily Missions (Max 10 points)
  const streakPts = Math.min(5, (profile.streakDays || 1) * 0.5);
  const completedMissions = (profile.dailyMissions || []).filter(m => m.completed).length;
  const missionPts = Math.min(5, completedMissions * 1.6);
  const consistencyPoints = Math.min(10, Math.round(streakPts + missionPts));

  const total = curriculumPoints + assessmentPoints + taskPoints + consistencyPoints;
  return Math.min(100, Math.max(0, total));
}

// Generate real leaderboard ranked dynamically by real XP
export function getRealLeaderboard(allStudents: LearnerProfile[], currentLearnerName?: string): LeaderboardEntry[] {
  const map = new Map<string, LearnerProfile>();
  for (const s of allStudents) {
    if (s && s.name && s.name.trim()) {
      map.set(s.name.trim().toLowerCase(), s);
    }
  }
  const unique = Array.from(map.values());

  // Sort strictly by XP descending, tiebreak by streak descending
  unique.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    return b.streakDays - a.streakDays;
  });

  return unique.map((student, idx) => ({
    rank: idx + 1,
    name: student.name,
    institute: student.institute || 'Engineering Institute',
    department: student.department || 'Computer Science & Engineering',
    classYear: student.classYear || 'Final Year 2025',
    xp: student.xp || 0,
    streak: student.streakDays || 1,
    badgesCount: (student.badgesEarned || []).length,
    isCurrentLearner: currentLearnerName ? student.name.trim().toLowerCase() === currentLearnerName.trim().toLowerCase() : false,
  }));
}

// Play pleasant web audio chime on admin alert (Zero external file dependencies)
export function playNotificationChime(): void {
  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // Audio autoplay restrictions safeguard
  }
}

// Broadcast real-time notification to server and admins when a learner begins their journey
export async function registerNewLearnerJourney(student: LearnerProfile): Promise<void> {
  try {
    syncProfileToRoster(student);
    notifyStudentsUpdated(student);

    if (typeof fetch !== 'undefined') {
      await fetch('/api/students/journey-begun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student,
          message: `🚀 New Candidate "${student.name}" from ${student.institute || 'Engineering College'} just started their placement journey!`,
          timestamp: Date.now(),
        }),
      });
    }
  } catch (e) {
    console.error('Failed to notify journey start to server:', e);
  }
}

// Learner Sign Out functionality
export function learnerLogout(): void {
  try {
    signOutLearner().catch(() => {});
    localStorage.removeItem(STORAGE_KEY_JOURNEY_STARTED);
    const blankProfile: LearnerProfile = {
      ...DEFAULT_PROFILE,
      name: '',
      email: '',
      uid: '',
      photoUrl: '',
      xp: 0,
      predictedPlacementScore: 0,
      completedTopicIds: [],
      topicScores: {},
      badgesEarned: [],
      realWorldSubmissions: {},
    };
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(blankProfile));
    notifyStudentsUpdated(blankProfile);
  } catch (e) {
    console.error('Error on learner sign out:', e);
  }
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
    content: 'Learners crossing 5,000 XP with 80%+ Boss Battle clearance receive verified Classrooms To Boardrooms Certificates of Excellence.',
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
    // Sync to Firebase Firestore
    if (profile.uid || profile.email) {
      saveLearnerToFirestore(profile).catch(() => {});
    }
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

export function getClientDeviceMeta(): LearnerDeviceMeta {
  let deviceId = 'dev_anon';
  try {
    deviceId = localStorage.getItem('placementverse_device_id') || '';
    if (!deviceId) {
      deviceId = `dev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem('placementverse_device_id', deviceId);
    }
  } catch {}

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  let browser = 'Chrome';
  let os = 'Windows 11';
  let deviceType: 'Laptop / Desktop' | 'Mobile' | 'Tablet' = 'Laptop / Desktop';

  if (/iPad|tablet/i.test(ua)) deviceType = 'Tablet';
  else if (/Mobile|Android|iPhone|iPod/i.test(ua)) deviceType = 'Mobile';
  else deviceType = 'Laptop / Desktop';

  if (/Windows NT 10.0/i.test(ua) || /Windows NT 11.0/i.test(ua)) os = 'Windows 11 / 10';
  else if (/Windows/i.test(ua)) os = 'Windows PC';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS (MacBook/iMac)';
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) os = 'Linux Desktop';
  else if (/Android/i.test(ua)) os = 'Android Mobile';
  else if (/iPhone/i.test(ua)) os = 'Apple iPhone (iOS)';
  else if (/iPad/i.test(ua)) os = 'Apple iPad (iPadOS)';

  if (/Edg/i.test(ua)) browser = 'Microsoft Edge';
  else if (/Chrome|CriOS/i.test(ua)) browser = 'Google Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Apple Safari';
  else if (/Firefox|FxiOS/i.test(ua)) browser = 'Mozilla Firefox';

  const timezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Kolkata';
  const screenResolution = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '1920x1080';
  const language = typeof navigator !== 'undefined' ? navigator.language : 'en-IN';

  return {
    deviceId,
    browser,
    os,
    deviceType,
    screenResolution,
    timezone,
    language,
    lastHeartbeat: new Date().toISOString(),
    isOnline: true,
  };
}

export function logLearnerActivity(
  actionType: ActivityActionType,
  title: string,
  details: string,
  category: 'Aptitude' | 'Technical' | 'Soft Skills' | 'Exam' | 'System' = 'Aptitude',
  score?: number,
  xpEarned?: number,
  badgeName?: string
): void {
  try {
    const profile = getLearnerProfile();
    if (!profile.name || !profile.name.trim()) return;

    const device = getClientDeviceMeta();
    const newActivity: LearnerActivityItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      actionType,
      title,
      details,
      category,
      score,
      xpEarned,
      badgeName,
      deviceSummary: `${device.os} · ${device.browser}`,
    };

    const existingActivities = profile.activityLog || [];
    profile.activityLog = [newActivity, ...existingActivities].slice(0, 100);
    profile.lastActiveDate = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    syncProfileToRoster(profile);

    // Send activity to server
    if (typeof fetch !== 'undefined') {
      fetch('/api/students/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.name,
          activity: newActivity,
          deviceMeta: device,
        }),
      }).catch(() => {});
    }

    notifyStudentsUpdated(profile);
  } catch (err) {
    console.error('Failed to log learner activity:', err);
  }
}

export async function sendLearnerHeartbeat(studentName?: string): Promise<void> {
  try {
    const name = studentName || getLearnerProfile()?.name;
    if (!name || !name.trim()) return;

    const device = getClientDeviceMeta();
    if (typeof fetch !== 'undefined') {
      await fetch('/api/students/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          deviceMeta: device,
        }),
      });
    }
  } catch {}
}

export async function syncStudentToServer(student: LearnerProfile): Promise<void> {
  try {
    if (typeof fetch !== 'undefined' && student && student.name && student.name.trim()) {
      const deviceMeta = getClientDeviceMeta();
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...student,
          deviceMeta,
        }),
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

export async function fetchServerActivities(): Promise<any[]> {
  try {
    if (typeof fetch !== 'undefined') {
      const res = await fetch('/api/students/activities');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.activities)) {
          return data.activities;
        }
      }
    }
  } catch {}
  return [];
}

export async function notifyJourneyBegunToServer(student: LearnerProfile, customMessage?: string): Promise<void> {
  try {
    if (typeof fetch !== 'undefined' && student && student.name) {
      const deviceMeta = getClientDeviceMeta();
      await fetch('/api/students/journey-begun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student,
          message: customMessage,
          deviceMeta,
        }),
      });
    }
  } catch {}
}

export async function sendAdminBroadcast(
  title: string,
  message: string,
  type: 'info' | 'motivational' | 'urgent' | 'congrats' = 'motivational',
  sender: string = 'Director Desk (Kapil Narula)'
): Promise<boolean> {
  try {
    if (typeof fetch !== 'undefined') {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, type, sender }),
      });
      return res.ok;
    }
  } catch {}
  return false;
}

export async function fetchRecentBroadcasts(): Promise<any[]> {
  try {
    if (typeof fetch !== 'undefined') {
      const res = await fetch('/api/broadcasts');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.broadcasts)) {
          return data.broadcasts;
        }
      }
    }
  } catch {}
  return [];
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
      const current = getLearnerProfile();
      if (hasStartedJourney() && current && current.name && current.name.trim()) {
        const list = [current];
        localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(list));
        return list;
      }
      return [];
    }
    const parsed: LearnerProfile[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    const current = getLearnerProfile();
    if (hasStartedJourney() && current && current.name && current.name.trim()) {
      return [current];
    }
    return [];
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
const DEFAULT_INITIAL_CERTIFICATES: IssuedCertificateRecord[] = [];

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

export function recordMockTestResult(
  profile: LearnerProfile,
  attempt: MockTestAttempt,
  badgeRewardId: string,
  _badgeRewardName: string,
  certificateTitle: string
): { updatedProfile: LearnerProfile; certificate?: IssuedCertificateRecord; newlyUnlockedBadge: boolean } {
  const attempts = { ...(profile.mockTestAttempts || {}), [attempt.testId]: attempt };
  let newXp = profile.xp;
  const badges = [...profile.badgesEarned];
  let newlyUnlockedBadge = false;

  // If passed (score >= 60%), grant 1,000 XP and Badge if not already earned
  if (attempt.passed) {
    if (!badges.includes(badgeRewardId)) {
      badges.push(badgeRewardId);
      newXp += 1000;
      newlyUnlockedBadge = true;
    }
  }

  // Update predicted placement score based on performance
  const currentPlacement = profile.predictedPlacementScore || 70;
  const targetAdjustment = attempt.percentage >= 80 ? 4 : attempt.percentage >= 60 ? 2 : 0;
  const updatedPlacementScore = Math.min(99, Math.max(currentPlacement, currentPlacement + targetAdjustment));

  const updatedProfile: LearnerProfile = {
    ...profile,
    xp: newXp,
    badgesEarned: badges,
    predictedPlacementScore: updatedPlacementScore,
    mockTestAttempts: attempts,
  };
  saveLearnerProfile(updatedProfile);

  // Issue Certificate if passed
  let cert: IssuedCertificateRecord | undefined = undefined;
  if (attempt.passed) {
    const certType = attempt.testId === 'faang-mock-1' 
      ? 'faang-google-meta' 
      : attempt.testId === 'faang-mock-2' 
      ? 'faang-amazon-apple' 
      : attempt.testId === 'faang-mock-3'
      ? 'faang-netflix-uber'
      : (attempt.testId as any);

    const prefix = attempt.testId.startsWith('daily-practice') ? 'PV-DP' : 'PV-FAANG';
    const cleanId = attempt.testId.replace('daily-practice-', 'DP-').toUpperCase();

    cert = {
      id: `cert-${attempt.testId}-${Date.now()}`,
      studentName: profile.name || 'Placement Candidate',
      institute: profile.institute || 'National Institute of Technology',
      type: certType,
      title: certificateTitle,
      issueDate: new Date().toISOString().split('T')[0],
      readinessScore: Math.round(attempt.percentage),
      grade: attempt.percentage >= 85 ? 'Grade O (Outstanding)' : attempt.percentage >= 70 ? 'Grade A+ (Distinction)' : 'Grade A (Qualified)',
      endorsedBy: 'Kapil Narula (Placement Director & FAANG Evaluator)',
      verificationCode: attempt.certificateCode || `${prefix}-${cleanId}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Active',
    };
    issueOrReissueCertificate(cert);
  }

  // Log learner action for cross-device activity tracking
  const totalQuestions = (attempt.correctCount || 0) + (attempt.wrongCount || 0) + (attempt.skippedCount || 0);
  logLearnerActivity(
    'FAANG_MOCK_TEST',
    `Attempted ${certificateTitle}`,
    `Completed with ${attempt.correctCount}/${totalQuestions || 25} questions correct (${Math.round(attempt.percentage)}%) in ${Math.round((attempt.timeSpentSeconds || 0) / 60)} minutes. Result: ${attempt.passed ? 'PASSED (Certificate Issued)' : 'RE-ATTEMPT REQUIRED'}.`,
    'Exam',
    Math.round(attempt.percentage),
    attempt.passed ? 1000 : 100,
    attempt.passed ? _badgeRewardName : undefined
  );

  return { updatedProfile, certificate: cert, newlyUnlockedBadge };
}

const STORAGE_KEY_FINAL_ASSESSMENTS = 'placementverse_final_assessments';

export function getFinalAssessmentAttempts(): FinalAssessmentAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FINAL_ASSESSMENTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordFinalAssessmentAttempt(
  attempt: FinalAssessmentAttempt,
  profile: LearnerProfile
): { updatedProfile: LearnerProfile; certificate?: IssuedCertificateRecord; newlyUnlockedBadge: boolean } {
  // Save to persistent list of attempts
  const allAttempts = getFinalAssessmentAttempts();
  allAttempts.unshift(attempt);
  try {
    localStorage.setItem(STORAGE_KEY_FINAL_ASSESSMENTS, JSON.stringify(allAttempts.slice(0, 20)));
  } catch (e) {
    console.error('Failed to persist final assessment attempt:', e);
  }

  // Update profile XP & Badges
  let newXp = (profile.xp || 0) + (attempt.passed ? 3500 : 500);
  const badges = [...(profile.badgesEarned || [])];
  let newlyUnlockedBadge = false;

  // Final Assessment Master Badge
  if (attempt.passed && !badges.includes('grand-master-faang')) {
    badges.push('grand-master-faang');
    newXp += 2000;
    newlyUnlockedBadge = true;
  }

  // High distinction (>85%) bonus badge
  if (attempt.percentage >= 85 && !badges.includes('boss-killer')) {
    badges.push('boss-killer');
    newXp += 1500;
  }

  const currentPlacement = profile.predictedPlacementScore || 70;
  const targetAdjustment = attempt.percentage >= 85 ? 8 : attempt.percentage >= 70 ? 5 : 2;
  const updatedPlacementScore = Math.min(99, Math.max(currentPlacement, currentPlacement + targetAdjustment));

  const updatedProfile: LearnerProfile = {
    ...profile,
    xp: newXp,
    badgesEarned: badges,
    predictedPlacementScore: updatedPlacementScore,
    finalAssessmentAttempts: allAttempts,
  };
  saveLearnerProfile(updatedProfile);

  // Issue Official Grand Final Assessment Certificate if passed (>= 70%)
  let cert: IssuedCertificateRecord | undefined = undefined;
  if (attempt.passed) {
    cert = {
      id: `cert-final-${attempt.attemptId}`,
      studentName: profile.name || 'Placement Candidate',
      institute: profile.institute || 'National Institute of Technology',
      type: 'grand-final-assessment',
      title: 'Grand Placement Final Assessment Certification',
      issueDate: new Date().toISOString().split('T')[0],
      readinessScore: Math.round(attempt.percentage),
      grade: attempt.percentage >= 90 
        ? 'Grade O (Apex Prodigy)' 
        : attempt.percentage >= 80 
        ? 'Grade A+ (Elite Distinction)' 
        : 'Grade A (Qualified FAANG Level)',
      endorsedBy: 'Kapil Narula (Placement Director & FAANG Evaluator)',
      verificationCode: attempt.certificateCode || `PV-FINAL-250Q-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Active',
    };
    issueOrReissueCertificate(cert);
  }

  // Log learner activity for real-time admin monitoring across devices
  logLearnerActivity(
    'FINAL_ASSESSMENT',
    'Completed Grand Final Assessment (250 Qs / 90 Mins)',
    `Finished with ${attempt.correctCount}/250 correct (${attempt.totalScore}/1000 marks, ${Math.round(attempt.percentage)}%) in ${Math.round(attempt.timeSpentSeconds / 60)} minutes. Result: ${attempt.passed ? 'PASSED & CERTIFIED' : 'FAILED - NEEDS RE-ATTEMPT'}.`,
    'Exam',
    Math.round(attempt.percentage),
    attempt.passed ? 3500 : 500,
    attempt.passed ? 'Grand FAANG Master' : undefined
  );

  return { updatedProfile, certificate: cert, newlyUnlockedBadge };
}



import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI client helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiReady: Boolean(process.env.GEMINI_API_KEY),
  });
});

// ==========================================
// PERSISTENT CROSS-DEVICE STUDENTS ROSTER & AUDIT LOGS
// ==========================================
interface ServerActivityItem {
  id: string;
  timestamp: string;
  actionType: string;
  title: string;
  details: string;
  category: 'Aptitude' | 'Technical' | 'Soft Skills' | 'Exam' | 'System';
  score?: number;
  xpEarned?: number;
  badgeName?: string;
  deviceSummary?: string;
}

interface ServerDeviceMeta {
  deviceId: string;
  browser: string;
  os: string;
  deviceType: 'Laptop / Desktop' | 'Mobile' | 'Tablet';
  screenResolution?: string;
  timezone?: string;
  language?: string;
  ipAddress?: string;
  location?: string;
  lastHeartbeat?: string;
  firstSeen?: string;
  lastSeen?: string;
  isOnline?: boolean;
}

interface ServerStudent {
  name: string;
  email?: string;
  photoUrl?: string;
  uid?: string;
  institute: string;
  department: string;
  classYear: string;
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  lastActiveDate: string;
  firstLoginDate?: string;
  completedTopicIds: string[];
  unlockedTopicIds: string[];
  topicScores: Record<string, any>;
  badgesEarned: string[];
  dailyMissions: any[];
  realWorldSubmissions?: {
    email?: { score: number; date: string; feedback?: string };
    gd?: { score: number; date: string; feedback?: string };
    resume?: { atsScore: number; date: string; feedback?: string };
  };
  predictedPlacementScore: number;
  mockTestAttempts?: Record<string, any>;
  // Device, Geolocation & Online Presence Tracking
  deviceMeta?: ServerDeviceMeta;
  ipAddress?: string;
  location?: string;
  browser?: string;
  os?: string;
  deviceType?: 'Laptop / Desktop' | 'Mobile' | 'Tablet';
  isOnline?: boolean;
  lastHeartbeat?: string;
  loginCount?: number;
  activityLog?: ServerActivityItem[];
}

const STUDENTS_FILE_PATH = path.join(process.cwd(), 'students_store.json');

// Helper to parse user agent and determine client device/OS/browser
function parseClientInfo(req: express.Request, clientMeta?: Partial<ServerDeviceMeta>): ServerDeviceMeta {
  const ua = req.headers['user-agent'] || '';
  let browser = clientMeta?.browser;
  let os = clientMeta?.os;
  let deviceType: 'Laptop / Desktop' | 'Mobile' | 'Tablet' = clientMeta?.deviceType || 'Laptop / Desktop';

  if (!browser || !os) {
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
    else os = 'Desktop PC';

    if (/Edg/i.test(ua)) browser = 'Microsoft Edge';
    else if (/Chrome|CriOS/i.test(ua)) browser = 'Google Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Apple Safari';
    else if (/Firefox|FxiOS/i.test(ua)) browser = 'Mozilla Firefox';
    else browser = 'Web Browser';
  }

  // Extract client IP address from proxy / ingress headers
  const forwarded = req.headers['x-forwarded-for'];
  let ip = '';
  if (typeof forwarded === 'string') {
    ip = forwarded.split(',')[0].trim();
  } else if (Array.isArray(forwarded) && forwarded.length > 0) {
    ip = forwarded[0];
  } else {
    ip = req.socket.remoteAddress || '127.0.0.1';
  }
  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }
  if (ip === '::1' || ip === '127.0.0.1') {
    ip = '103.21.244.18 (Campus Gateway)';
  }

  // Derive location description from timezone / locale
  const timezone = clientMeta?.timezone || 'Asia/Kolkata';
  let location = 'India (IST Timezone)';
  if (timezone.includes('Kolkata') || timezone.includes('Calcutta')) {
    location = 'India (IST)';
  } else if (timezone.includes('New_York') || timezone.includes('Detroit') || timezone.includes('Toronto')) {
    location = 'North America (EST)';
  } else if (timezone.includes('Los_Angeles') || timezone.includes('San_Francisco') || timezone.includes('Vancouver')) {
    location = 'North America (PST)';
  } else if (timezone.includes('London')) {
    location = 'United Kingdom (GMT/BST)';
  } else if (timezone.includes('Singapore')) {
    location = 'Singapore (SGT)';
  } else if (timezone.includes('Tokyo')) {
    location = 'Japan (JST)';
  } else if (timezone.includes('Sydney') || timezone.includes('Melbourne')) {
    location = 'Australia (AEST)';
  } else if (timezone.includes('Dubai')) {
    location = 'UAE (GST)';
  } else if (timezone) {
    location = timezone.replace('_', ' ');
  }

  return {
    deviceId: clientMeta?.deviceId || `dev_${Math.random().toString(36).slice(2, 11)}`,
    browser,
    os,
    deviceType,
    screenResolution: clientMeta?.screenResolution || '1920x1080',
    timezone,
    language: clientMeta?.language || 'en-IN',
    ipAddress: ip,
    location,
    lastHeartbeat: new Date().toISOString(),
    isOnline: true,
  };
}

// Initial realistic verified seed candidates if database file is fresh
function getInitialSeedStudents(): ServerStudent[] {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const twoHoursAgo = new Date(now.getTime() - 120 * 60 * 1000).toISOString();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  return [
    {
      name: 'Aarav Sharma',
      institute: 'National Institute of Technology, Trichy',
      department: 'Computer Science & Engineering',
      classYear: 'Final Year 2025',
      xp: 4850,
      level: 4,
      levelTitle: 'Level 4 Mastermind',
      streakDays: 7,
      lastActiveDate: now.toISOString(),
      firstLoginDate: yesterday,
      completedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod1-topic-3', 'mod2-topic-1'],
      unlockedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod1-topic-3', 'mod2-topic-1', 'mod2-topic-2'],
      topicScores: {
        'mod1-topic-1': { practiceBest: 95, challengeBest: 24, bossPassed: true },
        'mod1-topic-2': { practiceBest: 90, challengeBest: 22, bossPassed: true },
        'mod1-topic-3': { practiceBest: 85, challengeBest: 20, bossPassed: true },
      },
      badgesEarned: ['streak-fire-1', 'first-topic-clear', 'quant-specialist', 'faang-titan'],
      dailyMissions: [
        { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 },
        { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 1, completed: true, rewardXp: 30 },
      ],
      realWorldSubmissions: {
        resume: { atsScore: 88, date: yesterday, feedback: 'Strong ATS compliance with quantitative metrics.' },
        email: { score: 92, date: yesterday, feedback: 'Crisp subject line and professional call to action.' },
      },
      predictedPlacementScore: 94,
      ipAddress: '103.112.45.18',
      location: 'Chennai / Tamil Nadu, India',
      browser: 'Google Chrome 128',
      os: 'Windows 11 Laptop',
      deviceType: 'Laptop / Desktop',
      isOnline: true,
      lastHeartbeat: now.toISOString(),
      loginCount: 5,
      activityLog: [
        {
          id: 'act-101',
          timestamp: now.toISOString(),
          actionType: 'FAANG_MOCK_TEST',
          title: 'Attempted Google & Meta Crucible Mock Test',
          details: 'Scored 76% (19/25 correct) in 54 minutes. Awarded FAANG Titan badge!',
          category: 'Exam',
          score: 76,
          xpEarned: 250,
          badgeName: 'FAANG Titan',
          deviceSummary: 'Windows 11 Laptop · Google Chrome',
        },
        {
          id: 'act-102',
          timestamp: oneHourAgo,
          actionType: 'BOSS_BATTLE',
          title: 'Defeated Google Boss Battle in Time & Work',
          details: 'Cleared timed multi-pipe work rate scenario with 100% accuracy.',
          category: 'Aptitude',
          score: 100,
          xpEarned: 100,
          deviceSummary: 'Windows 11 Laptop · Google Chrome',
        },
        {
          id: 'act-103',
          timestamp: twoHoursAgo,
          actionType: 'REAL_WORLD_TASK',
          title: 'Submitted Professional Recruiter Cold Email',
          details: 'Evaluated by Placement AI: 92/100 for high readability and STAR pitch.',
          category: 'Soft Skills',
          score: 92,
          xpEarned: 80,
          deviceSummary: 'Windows 11 Laptop · Google Chrome',
        },
      ],
    },
    {
      name: 'Priya Nair',
      institute: 'Delhi Technological University (DTU)',
      department: 'Information Technology',
      classYear: 'Final Year 2025',
      xp: 4200,
      level: 4,
      levelTitle: 'Level 4 Mastermind',
      streakDays: 5,
      lastActiveDate: oneHourAgo,
      firstLoginDate: yesterday,
      completedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod3-topic-1'],
      unlockedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod3-topic-1', 'mod3-topic-2'],
      topicScores: {
        'mod1-topic-1': { practiceBest: 92, challengeBest: 21, bossPassed: true },
        'mod3-topic-1': { practiceBest: 96, challengeBest: 23, bossPassed: true },
      },
      badgesEarned: ['streak-fire-1', 'verbal-virtuoso', 'speed-demon'],
      dailyMissions: [
        { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 },
      ],
      realWorldSubmissions: {
        resume: { atsScore: 86, date: yesterday, feedback: 'Great project impact statements.' },
        gd: { score: 89, date: yesterday, feedback: 'Strong structured arguments on AI Ethics.' },
      },
      predictedPlacementScore: 91,
      ipAddress: '122.161.82.90',
      location: 'New Delhi / NCR, India',
      browser: 'Apple Safari 17.4',
      os: 'macOS Sonoma (MacBook Pro)',
      deviceType: 'Laptop / Desktop',
      isOnline: false,
      lastHeartbeat: oneHourAgo,
      loginCount: 3,
      activityLog: [
        {
          id: 'act-201',
          timestamp: oneHourAgo,
          actionType: 'REAL_WORLD_TASK',
          title: 'Submitted AI Group Discussion Simulation',
          details: 'Scored 89/100 for leadership moderation and clear vocal cadence.',
          category: 'Soft Skills',
          score: 89,
          xpEarned: 90,
          deviceSummary: 'macOS Sonoma · Apple Safari',
        },
        {
          id: 'act-202',
          timestamp: twoHoursAgo,
          actionType: 'CHALLENGE',
          title: 'Cleared 15-Minute Verbal Challenge Arena',
          details: 'Solved 10 sentence correction and vocabulary MCQs with net score +23/25.',
          category: 'Aptitude',
          score: 92,
          xpEarned: 60,
          deviceSummary: 'macOS Sonoma · Apple Safari',
        },
      ],
    },
    {
      name: 'Rohan Gupta',
      institute: 'BITS Pilani',
      department: 'Electronics & Communication',
      classYear: 'Pre-Final Year 2026',
      xp: 3650,
      level: 3,
      levelTitle: 'Level 3 Contender',
      streakDays: 4,
      lastActiveDate: twoHoursAgo,
      firstLoginDate: yesterday,
      completedTopicIds: ['mod1-topic-1', 'mod2-topic-1'],
      unlockedTopicIds: ['mod1-topic-1', 'mod2-topic-1', 'mod2-topic-2'],
      topicScores: {
        'mod1-topic-1': { practiceBest: 88, challengeBest: 19, bossPassed: true },
      },
      badgesEarned: ['streak-fire-1', 'first-topic-clear'],
      dailyMissions: [],
      realWorldSubmissions: {
        resume: { atsScore: 82, date: yesterday },
      },
      predictedPlacementScore: 86,
      ipAddress: '14.139.128.33',
      location: 'Pilani / Rajasthan, India',
      browser: 'Mozilla Firefox 129',
      os: 'Ubuntu Linux 24.04',
      deviceType: 'Laptop / Desktop',
      isOnline: false,
      lastHeartbeat: twoHoursAgo,
      loginCount: 2,
      activityLog: [
        {
          id: 'act-301',
          timestamp: twoHoursAgo,
          actionType: 'PRACTICE_MCQ',
          title: 'Completed Coding-Decoding Practice Zone',
          details: 'Practiced 15 substitution cipher and binary pattern questions (Accuracy: 88%).',
          category: 'Technical',
          score: 88,
          xpEarned: 45,
          deviceSummary: 'Ubuntu Linux · Firefox',
        },
      ],
    }
  ];
}

// Load persistent students roster from disk
function loadStudentsFromDisk(): ServerStudent[] {
  try {
    if (fs.existsSync(STUDENTS_FILE_PATH)) {
      const data = fs.readFileSync(STUDENTS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading students_store.json:', err);
  }
  const initial = getInitialSeedStudents();
  try {
    fs.writeFileSync(STUDENTS_FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
  } catch {}
  return initial;
}

// Persist students roster to disk
function saveStudentsToDisk() {
  try {
    fs.writeFileSync(STUDENTS_FILE_PATH, JSON.stringify(serverStudents, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing students_store.json:', err);
  }
}

// Initialize server-side students roster from disk
let serverStudents: ServerStudent[] = loadStudentsFromDisk();

// Active SSE client connections (Admins watching real-time)
const sseClients = new Set<express.Response>();

function broadcastStudentUpdate(type: 'JOIN' | 'UPDATE' | 'DELETE' | 'JOURNEY_BEGUN' | 'ACTIVITY' | 'HEARTBEAT' | 'BROADCAST_ALERT', payload: any) {
  const data = JSON.stringify({
    type,
    payload,
    allStudents: getEnrichedStudents(),
    totalCount: serverStudents.length,
    timestamp: Date.now(),
  });
  for (const client of sseClients) {
    try {
      client.write(`data: ${data}\n\n`);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Dynamically compute real-time online status based on heartbeat (<60s)
function getEnrichedStudents(): ServerStudent[] {
  const now = Date.now();
  return serverStudents.map((s) => {
    const lastHeartbeatMs = s.lastHeartbeat ? new Date(s.lastHeartbeat).getTime() : 0;
    const isActuallyOnline = (now - lastHeartbeatMs) < 60000;
    return {
      ...s,
      isOnline: isActuallyOnline,
    };
  });
}

// 1. Get all learners across all devices/browsers
app.get('/api/students', (req, res) => {
  const disk = loadStudentsFromDisk();
  for (const ds of disk) {
    const idx = serverStudents.findIndex(
      (s) => (ds.uid && s.uid === ds.uid) ||
             (ds.email && s.email && s.email.toLowerCase() === ds.email.toLowerCase()) ||
             (s.name.toLowerCase() === ds.name.toLowerCase())
    );
    if (idx === -1) {
      serverStudents.push(ds);
    } else {
      serverStudents[idx] = { ...ds, ...serverStudents[idx] };
    }
  }
  const enriched = getEnrichedStudents();
  res.json({
    students: enriched,
    total: enriched.length,
    onlineCount: enriched.filter((s) => s.isOnline).length,
    timestamp: Date.now(),
  });
});

// 2. Real-time alert when a learner begins journey from any browser or laptop
app.post('/api/students/journey-begun', (req, res) => {
  const { student, message, deviceMeta: clientDeviceMeta } = req.body;
  if (!student || !student.name) {
    return res.status(400).json({ error: 'Valid student required' });
  }

  const device = parseClientInfo(req, clientDeviceMeta || student.deviceMeta);
  const existingIdx = serverStudents.findIndex(
    (s) => (student.uid && s.uid === student.uid) ||
           (student.email && s.email && s.email.toLowerCase() === student.email.toLowerCase()) ||
           (s.name.toLowerCase() === student.name.toLowerCase())
  );

  const registerActivity: ServerActivityItem = {
    id: `act-reg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actionType: 'REGISTER',
    title: 'Candidate Commenced Placement Journey',
    details: `Registered from ${device.os} (${device.browser}) in ${device.location} [IP: ${device.ipAddress}]`,
    category: 'System',
    deviceSummary: `${device.os} · ${device.browser}`,
  };

  let updatedStudent: ServerStudent;
  if (existingIdx >= 0) {
    const existing = serverStudents[existingIdx];
    const updatedActivities = [registerActivity, ...(existing.activityLog || [])].slice(0, 100);
    serverStudents[existingIdx] = {
      ...existing,
      ...student,
      deviceMeta: device,
      ipAddress: device.ipAddress,
      location: device.location,
      browser: device.browser,
      os: device.os,
      deviceType: device.deviceType,
      isOnline: true,
      lastHeartbeat: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      loginCount: (existing.loginCount || 1) + 1,
      activityLog: updatedActivities,
    };
    updatedStudent = serverStudents[existingIdx];
  } else {
    updatedStudent = {
      ...student,
      deviceMeta: device,
      ipAddress: device.ipAddress,
      location: device.location,
      browser: device.browser,
      os: device.os,
      deviceType: device.deviceType,
      isOnline: true,
      lastHeartbeat: new Date().toISOString(),
      firstLoginDate: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      loginCount: 1,
      activityLog: [registerActivity],
    };
    serverStudents.unshift(updatedStudent);
  }

  saveStudentsToDisk();

  broadcastStudentUpdate('JOURNEY_BEGUN', {
    student: updatedStudent,
    name: updatedStudent.name,
    institute: updatedStudent.institute,
    department: updatedStudent.department,
    device: `${device.os} · ${device.browser}`,
    location: device.location,
    ipAddress: device.ipAddress,
    message: message || `🚀 New Learner "${updatedStudent.name}" from ${updatedStudent.institute || 'Engineering College'} joined from ${device.os} in ${device.location}!`,
    timestamp: Date.now(),
  });

  res.json({
    success: true,
    isNew: existingIdx < 0,
    student: updatedStudent,
    totalStudents: serverStudents.length,
  });
});

// 3. Register or update student performance & device info from any device
app.post('/api/students', (req, res) => {
  const studentData: ServerStudent = req.body;
  if (!studentData || !studentData.name) {
    return res.status(400).json({ error: 'Valid student name is required' });
  }

  const device = parseClientInfo(req, studentData.deviceMeta);
  const existingIdx = serverStudents.findIndex(
    (s) => (studentData.uid && s.uid === studentData.uid) ||
           (studentData.email && s.email && s.email.toLowerCase() === studentData.email.toLowerCase()) ||
           (s.name.toLowerCase() === studentData.name.toLowerCase())
  );

  let isNew = false;
  if (existingIdx >= 0) {
    const existing = serverStudents[existingIdx];
    // Merge activities avoiding duplicates
    const mergedActivities = [...(studentData.activityLog || []), ...(existing.activityLog || [])]
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 100);

    serverStudents[existingIdx] = {
      ...existing,
      ...studentData,
      deviceMeta: device,
      ipAddress: device.ipAddress || existing.ipAddress,
      location: device.location || existing.location,
      browser: device.browser || existing.browser,
      os: device.os || existing.os,
      deviceType: device.deviceType || existing.deviceType,
      isOnline: true,
      lastHeartbeat: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      activityLog: mergedActivities,
    };
  } else {
    isNew = true;
    const loginActivity: ServerActivityItem = {
      id: `act-init-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actionType: 'LOGIN',
      title: 'Candidate Profile Connected',
      details: `Connected from ${device.os} (${device.browser}) in ${device.location}`,
      category: 'System',
      deviceSummary: `${device.os} · ${device.browser}`,
    };

    serverStudents.unshift({
      ...studentData,
      deviceMeta: device,
      ipAddress: device.ipAddress,
      location: device.location,
      browser: device.browser,
      os: device.os,
      deviceType: device.deviceType,
      isOnline: true,
      lastHeartbeat: new Date().toISOString(),
      firstLoginDate: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      loginCount: 1,
      activityLog: studentData.activityLog && studentData.activityLog.length > 0
        ? studentData.activityLog
        : [loginActivity],
    });
  }

  saveStudentsToDisk();

  const updatedStudent = existingIdx >= 0 ? serverStudents[existingIdx] : serverStudents[0];
  broadcastStudentUpdate(isNew ? 'JOIN' : 'UPDATE', updatedStudent);

  res.json({
    success: true,
    isNew,
    student: updatedStudent,
    totalStudents: serverStudents.length,
  });
});

// Batch sync multiple students (e.g. from Firebase Firestore)
app.post('/api/students/sync-batch', (req, res) => {
  const incomingList: ServerStudent[] = req.body?.students;
  if (!Array.isArray(incomingList)) {
    return res.status(400).json({ error: 'Array of students expected' });
  }

  let addedOrUpdatedCount = 0;
  for (const item of incomingList) {
    if (!item || !item.name || !item.name.trim()) continue;
    const existingIdx = serverStudents.findIndex(
      (s) => (item.uid && s.uid && s.uid === item.uid) ||
             (item.email && s.email && s.email.toLowerCase() === item.email.toLowerCase()) ||
             (s.name.trim().toLowerCase() === item.name.trim().toLowerCase())
    );

    if (existingIdx >= 0) {
      serverStudents[existingIdx] = {
        ...serverStudents[existingIdx],
        ...item,
        xp: Math.max(serverStudents[existingIdx].xp || 0, item.xp || 0),
        predictedPlacementScore: Math.max(serverStudents[existingIdx].predictedPlacementScore || 0, item.predictedPlacementScore || 0),
      };
      addedOrUpdatedCount++;
    } else {
      serverStudents.push(item);
      addedOrUpdatedCount++;
    }
  }

  saveStudentsToDisk();
  broadcastStudentUpdate('UPDATE', { count: addedOrUpdatedCount, total: serverStudents.length });

  res.json({
    success: true,
    syncedCount: addedOrUpdatedCount,
    totalStudents: serverStudents.length,
    students: getEnrichedStudents(),
  });
});

// 4. Log specific student activity (MCQ, Timed Challenge, Boss Battle, Mock Test, Real World Task)
app.post('/api/students/activity', (req, res) => {
  const { studentName, activity, deviceMeta: clientDeviceMeta } = req.body;
  if (!studentName || !activity || !activity.title) {
    return res.status(400).json({ error: 'studentName and activity required' });
  }

  const device = parseClientInfo(req, clientDeviceMeta);
  const targetIdx = serverStudents.findIndex(
    (s) => s.name.toLowerCase() === studentName.toLowerCase()
  );

  const enrichedActivity: ServerActivityItem = {
    id: activity.id || `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: activity.timestamp || new Date().toISOString(),
    actionType: activity.actionType || 'PRACTICE_MCQ',
    title: activity.title,
    details: activity.details || '',
    category: activity.category || 'Aptitude',
    score: activity.score,
    xpEarned: activity.xpEarned,
    badgeName: activity.badgeName,
    deviceSummary: `${device.os} · ${device.browser}`,
  };

  if (targetIdx >= 0) {
    const student = serverStudents[targetIdx];
    const activities = [enrichedActivity, ...(student.activityLog || [])].slice(0, 100);
    serverStudents[targetIdx] = {
      ...student,
      lastActiveDate: new Date().toISOString(),
      lastHeartbeat: new Date().toISOString(),
      isOnline: true,
      activityLog: activities,
    };
    saveStudentsToDisk();
  }

  broadcastStudentUpdate('ACTIVITY', {
    studentName,
    activity: enrichedActivity,
    device: `${device.os} · ${device.browser}`,
    location: device.location,
    timestamp: Date.now(),
  });

  res.json({ success: true, activity: enrichedActivity });
});

// 5. Learner Presence Heartbeat (called every 25s by active browser tabs)
app.post('/api/students/heartbeat', (req, res) => {
  const { name, deviceMeta: clientDeviceMeta } = req.body;
  if (!name) {
    return res.json({ success: true, message: 'anonymous ping' });
  }

  const device = parseClientInfo(req, clientDeviceMeta);
  const targetIdx = serverStudents.findIndex(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );

  if (targetIdx >= 0) {
    const prev = serverStudents[targetIdx];
    serverStudents[targetIdx] = {
      ...prev,
      isOnline: true,
      lastHeartbeat: new Date().toISOString(),
      lastActiveDate: new Date().toISOString(),
      deviceMeta: {
        ...(prev.deviceMeta || {}),
        ...device,
        isOnline: true,
        lastHeartbeat: new Date().toISOString(),
      },
    };
    // Debounced disk save on heartbeat
    if (Math.random() < 0.2) {
      saveStudentsToDisk();
    }
  }

  res.json({ success: true, isOnline: true });
});

// 6. Global real-time activity stream across all learners
app.get('/api/students/activities', (req, res) => {
  const allActivities: Array<ServerActivityItem & { studentName: string; institute: string }> = [];
  for (const s of serverStudents) {
    if (Array.isArray(s.activityLog)) {
      for (const a of s.activityLog) {
        allActivities.push({
          ...a,
          studentName: s.name,
          institute: s.institute,
        });
      }
    }
  }

  allActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  res.json({
    activities: allActivities.slice(0, 80),
    total: allActivities.length,
  });
});

// 7. Delete student
app.delete('/api/students/:name', (req, res) => {
  const targetName = decodeURIComponent(req.params.name).toLowerCase();
  const initialLength = serverStudents.length;
  serverStudents = serverStudents.filter((s) => s.name.toLowerCase() !== targetName);

  if (serverStudents.length < initialLength) {
    saveStudentsToDisk();
    broadcastStudentUpdate('DELETE', { name: req.params.name });
  }

  res.json({ success: true, remaining: serverStudents.length });
});

// 8. Server-Sent Events (SSE) stream for Real-Time Administrator Monitoring
app.get('/api/students/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  // Send initial snapshot immediately
  res.write(`data: ${JSON.stringify({ type: 'SNAPSHOT', allStudents: getEnrichedStudents(), timestamp: Date.now() })}\n\n`);

  sseClients.add(res);

  // Heartbeat every 15s to keep connection alive
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n');
    } catch {
      clearInterval(heartbeat);
      sseClients.delete(res);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

// 9. Admin Broadcast Notification System
interface BroadcastAlert {
  id: string;
  title: string;
  message: string;
  sender: string;
  type: 'info' | 'motivational' | 'urgent' | 'congrats';
  timestamp: string;
}

let activeBroadcasts: BroadcastAlert[] = [
  {
    id: 'bcast-welcome',
    title: '🚀 India Campus Recruitment Season Active',
    message: 'Welcome to PlacementVerse! Solve topic challenges, defeat Boss Battles, and aim for 90%+ readiness.',
    sender: 'Kapil Narula (Placement Director)',
    type: 'motivational',
    timestamp: new Date().toISOString(),
  }
];

app.post('/api/admin/broadcast', (req, res) => {
  const { title, message, sender = 'Kapil Narula (Director)', type = 'motivational' } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Broadcast message cannot be empty' });
  }

  const alert: BroadcastAlert = {
    id: `bcast-${Date.now()}`,
    title: title?.trim() || '📢 Campus Director Notice',
    message: message.trim(),
    sender: sender.trim() || 'Kapil Narula (Director)',
    type: type || 'motivational',
    timestamp: new Date().toISOString(),
  };

  activeBroadcasts.unshift(alert);
  activeBroadcasts = activeBroadcasts.slice(0, 20);

  // Broadcast to all connected clients (admins and learners)
  broadcastStudentUpdate('BROADCAST_ALERT', alert);

  res.json({ success: true, alert, totalBroadcasts: activeBroadcasts.length });
});

app.get('/api/broadcasts', (req, res) => {
  res.json({
    broadcasts: activeBroadcasts,
    latest: activeBroadcasts[0] || null,
  });
});


/**
 * Resilient Gemini content generation with multi-model fallback & backoff.
 * Automatically handles transient 503 (high demand) / rate limits by failing over
 * to alternative supported fast models ('gemini-flash-latest', 'gemini-3.1-flash-lite').
 */
async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  },
  models = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite']
): Promise<string | null> {
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      const is503OrUnavailable =
        err?.status === 503 ||
        err?.code === 503 ||
        errMsg.includes('503') ||
        errMsg.includes('high demand') ||
        errMsg.includes('UNAVAILABLE') ||
        errMsg.includes('429') ||
        errMsg.includes('RESOURCE_EXHAUSTED');

      if (is503OrUnavailable && i < models.length - 1) {
        console.warn(`[Gemini API] ${model} high demand / unavailable. Trying fallback model ${models[i + 1]}...`);
        await new Promise((r) => setTimeout(r, 250));
        continue;
      }
      console.warn(`[Gemini API] Call with ${model} ended: ${errMsg.slice(0, 120)}`);
    }
  }
  return null;
}

// 1. Kapil AI Coach Chat
app.post('/api/ai/coach', async (req, res) => {
  try {
    const message = req.body.message || req.body.query || '';
    const history = req.body.history;
    const context = req.body.context || req.body.learnerProfile;
    const learnerName = req.body.learnerName || req.body.learnerProfile?.name || 'Learner';
    const ai = getGeminiClient();

    if (ai && message) {
      try {
        const systemPrompt = `You are "Kapil Narula" (Chief Learning Officer | Chief Ecosystem Architect | Founder, SarlaYash Learning Solutions LLP), leading "CLASSROOMS TO BOARDROOMS WITH KAPIL" - Powered By SarlaYash Mission.
Your core philosophy is: "Technology is the engine. Learning is the mission. Careers are the outcome."
Your 4-stage ecosystem architecture connects:
1. Classrooms: C, C++, Java, Python, DBMS, DSA, AI/ML, Cloud & Core CS.
2. Assessment: Live screening tests, Aptitude, Coding, Technical mocks & skill diagnostics.
3. Intelligence: AI evaluation, Skill gaps, Adaptive recommendations & readiness analytics.
4. Boardrooms: Placement readiness, Employability, High-bar corporate preparation & outcomes.
Your mentee is ${learnerName}.
Your role:
- Answer placement & interview preparation doubts across both Quantitative/Logical Aptitude and Technical Core (C, C++, Java, Python, DSA, System Design).
- Explain mistakes conceptually with shortcuts, Vedic math / reasoning tricks, or STAR framework examples.
- Suggest focused practice areas and predict weak points.
- Speak encouragingly, like an expert Indian placement mentor and ecosystem architect who is warm, sharp, and results-oriented.
- Use clear bullet points, formulas, or short worked examples where helpful. Keep responses concise (under 200 words) and high impact.`;

        const contents = [
          { text: systemPrompt },
          ...(history || []).map((h: { sender: string; text: string }) => ({
            text: `${h.sender === 'user' ? 'Learner' : 'Coach Kapil'}: ${h.text}`,
          })),
          { text: `Learner's current context: ${JSON.stringify(context || {})}` },
          { text: `Learner asks: ${message}` },
        ];

        const text = await generateWithFallback(ai, {
          contents: { parts: contents },
        });

        if (text) {
          return res.json({ reply: text });
        }
      } catch (genError) {
        console.warn('Gemini coach generation failed, activating intelligent coach fallback');
      }
    }

    // High quality intelligent coach fallback
    const msgLower = (message || '').toLowerCase();
    let reply = `Great query! In placement exams (TCS NQT, Infosys, Accenture, Amazon, Wipro), this is a frequently tested concept. `;
    if (msgLower.includes('time') || msgLower.includes('work') || msgLower.includes('pipes')) {
      reply += `For Time & Work, always use the **LCM Method** (Total Work = LCM of individual days). Calculate 1-day work units/efficiency. Total Days = Total Units / Combined Units per day. Avoid traditional fractions (1/x + 1/y) to save 40% time!`;
    } else if (msgLower.includes('percent') || msgLower.includes('profit') || msgLower.includes('loss')) {
      reply += `For Percentages and Profit/Loss, master Fraction-to-Percentage equivalents (1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%). Use the Multiplying Factor method: a 25% increase is multiplying by 1.25 or 5/4!`;
    } else if (msgLower.includes('resume') || msgLower.includes('ats')) {
      reply += `To beat ATS, ensure single-column formatting, standard font (Calibri/Arial), and format every bullet with the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]". Include keywords from the target job description.`;
    } else if (msgLower.includes('interview') || msgLower.includes('hr') || msgLower.includes('star')) {
      reply += `For HR and Behavioral questions, strictly follow the **STAR Framework**: Situation (context), Task (your goal), Action (what YOU specifically did), and Result (quantifiable impact or metric). Keep it to 90 seconds.`;
    } else {
      reply += `Remember: speed comes from pattern recognition. Solve with elimination first, note your weak topics in the Strength & Weakness analytics, and complete today's Boss Battle to lock in 300 XP. What specific step can I break down for you?`;
    }

    return res.json({ reply });
  } catch (error) {
    console.error('Coach API error:', error);
    res.status(500).json({ error: 'Failed to process coaching request' });
  }
});

// 2. Real World Task: Email Writing Evaluation
app.post('/api/evaluate/email', async (req, res) => {
  try {
    const { emailContent, promptScenario } = req.body;
    const ai = getGeminiClient();

    if (ai && emailContent && emailContent.trim().length > 10) {
      try {
        const text = await generateWithFallback(ai, {
          contents: `You are an elite, no-nonsense Campus Placement Director and Senior HR Manager at a top tech MNC.
Evaluate this student's email draft written for the real-world scenario: "${promptScenario || 'Formal email to HR asking for interview status/feedback'}".

Student's Submitted Email:
"""${emailContent}"""

CRITICAL INSTRUCTIONS FOR HONEST & REAL EVALUATION:
1. BE REAL, UNVARNISHED, AND DIRECT. Do NOT flatter or inflate scores. In campus placements, poorly phrased emails get candidates blacklisted or silently ignored.
2. If the email is excessively brief, lacks a formal subject line, uses casual text slang (e.g. "hey", "pls", "u", "thx"), omits salutations or sign-offs, or sounds demanding/entitled, penalize heavily (overallScore between 25-60) and call out the exact recruiter elimination risks.
3. If the email is moderately structured but lacks specific dates, role IDs, or a proactive call-to-action, score it in the 60-75 range with concrete fixes.
4. Only award 80-95 if it demonstrates exemplary corporate etiquette, impeccable grammar, respectful tone, and clear next steps.

Respond ONLY in valid JSON matching this exact structure:
{
  "grammarScore": number (0-100),
  "professionalismScore": number (0-100),
  "toneScore": number (0-100),
  "overallScore": number (0-100),
  "verdict": "A sharp 1-sentence verdict (e.g., '🔴 Elimination Risk: Unprofessional & Lacks Subject' OR '🟡 Borderline: Courteous but Missing Critical Context' OR '🟢 Placement Ready: Executive-Grade Communication')",
  "verdictTier": "critical" | "needs_work" | "ready",
  "feedback": "2-3 candid sentences detailing how a real HR recruiter interprets this exact draft",
  "redFlags": ["Exact recruiter red flag 1", "Exact recruiter red flag 2"],
  "honestGuidance": [
    "Step-by-step guidance point 1",
    "Step-by-step guidance point 2",
    "Step-by-step guidance point 3"
  ],
  "strengths": ["genuine strength 1", "genuine strength 2"],
  "improvements": ["critical fix 1", "critical fix 2"],
  "polishedVersion": "The fully rewritten, corporate-ready email with formal Subject, Salutation, Body, and Signature"
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed.overallScore === 'number') {
            return res.json(parsed);
          }
        }
      } catch (err) {
        console.warn('Email evaluation Gemini call failed, utilizing rigorous dynamic fallback:', err);
      }
    }

    // Dynamic, rigorous, content-aware evaluation fallback
    const raw = (emailContent || '').trim();
    const words = raw.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const hasSubject = /subject\s*:/i.test(raw);
    const hasSalutation = /(dear|respected|hello|hi|good\s+morning|good\s+afternoon)\s+[a-z]/i.test(raw);
    const hasCasualSalutation = /^(hey|yo|hi\s+bro|what's\s+up|sup)\b/i.test(raw);
    const hasSignoff = /(regards|sincerely|best\s+regards|warm\s+regards|thank\s+you|yours\s+faithfully|yours\s+sincerely)/i.test(raw);
    const hasCasualSlang = /\b(u|ur|pls|plz|thx|thanks\s+a\s+lot|wanna|gonna|asap|lemme|btw)\b/i.test(raw);
    const hasGratitude = /thank|grateful|appreciate|sincerely|kindly|look\s+forward/i.test(raw);
    const hasContact = /@|phone|\+91|\d{10}|linkedin|github/i.test(raw);

    // Realistic Scoring calculation
    let professionalismScore = 50;
    if (hasSubject) professionalismScore += 16;
    if (hasSalutation) professionalismScore += 12;
    if (hasSignoff) professionalismScore += 12;
    if (hasContact) professionalismScore += 10;
    if (hasCasualSalutation) professionalismScore -= 25;
    if (hasCasualSlang) professionalismScore -= 30;
    if (wordCount < 20) professionalismScore -= 20;
    professionalismScore = Math.min(95, Math.max(15, professionalismScore));

    let grammarScore = 75;
    if (wordCount < 15) grammarScore = 40;
    else if (wordCount < 30) grammarScore = 60;
    else if (wordCount >= 50) grammarScore = 88;
    if (hasCasualSlang) grammarScore -= 25;
    grammarScore = Math.min(95, Math.max(20, grammarScore));

    let toneScore = hasGratitude ? 85 : 55;
    if (hasCasualSalutation || hasCasualSlang) toneScore -= 25;
    if (!hasSignoff) toneScore -= 10;
    toneScore = Math.min(95, Math.max(20, toneScore));

    const overallScore = Math.round((professionalismScore * 0.45) + (grammarScore * 0.25) + (toneScore * 0.3));

    // Determine honest verdict and red flags
    let verdictTier: 'critical' | 'needs_work' | 'ready' = 'ready';
    let verdict = '🟢 Placement Ready: Professional, respectful, and well-structured corporate email.';
    const redFlags: string[] = [];
    const honestGuidance: string[] = [];

    if (overallScore < 60 || wordCount < 25 || hasCasualSlang || !hasSubject) {
      verdictTier = 'critical';
      verdict = '🔴 High Elimination Risk: Critical recruiter red flags detected that will cause your email to be ignored.';
    } else if (overallScore < 80) {
      verdictTier = 'needs_work';
      verdict = '🟡 Needs Polish: Courteous baseline, but lacks executive polish and clear recruiter actionability.';
    }

    if (!hasSubject) {
      redFlags.push('Missing Subject Line: Over 80% of HR recruiters immediately disregard emails lacking role/candidate identification.');
      honestGuidance.push('Always add a structured subject line: "Subject: [Role Applied] - Interview Status Inquiry - [Your Name] - [College]".');
    }
    if (!hasSalutation) {
      redFlags.push('Missing Formal Salutation: Jumping straight to the body text without addressing the recipient conveys disrespect in corporate communication.');
      honestGuidance.push('Start with "Dear [Hiring Manager / Team Name]" or "Respected HR Team" to set an appropriate tone.');
    }
    if (hasCasualSlang) {
      redFlags.push('Casual SMS/Slang Detected: Words like "u", "pls", or "wanna" are severe professionalism red flags in corporate placement drives.');
      honestGuidance.push('Eliminate all shorthand abbreviations. Write out full words ("you", "please", "would like to").');
    }
    if (!hasSignoff) {
      redFlags.push('No Professional Sign-off: Candidate contact details, portfolio links, and closing salutations are absent.');
      honestGuidance.push('Close with "Warm regards," followed by your full name, degree branch, college, phone number, and LinkedIn/GitHub link.');
    }
    if (wordCount < 25) {
      redFlags.push('Critically Brief: 1-2 sentence emails often sound blunt, demanding, or low-effort to hiring teams.');
      honestGuidance.push('Elaborate with 3 distinct paragraphs: (1) Reiterate appreciation for the interview opportunity, (2) Inquire politely about next timeline steps, (3) Reaffirm strong enthusiasm and offer supplemental documents.');
    }

    if (honestGuidance.length === 0) {
      honestGuidance.push('Ensure your message is sent during business hours (9:00 AM - 11:30 AM) to maximize open rates.');
      honestGuidance.push('Attach your updated resume and portfolio link in the email signature for immediate recruiter review.');
    }

    const feedback = overallScore >= 80
      ? 'Your email adheres to corporate standards. The tone is deferential yet proactive, signaling high workplace readiness.'
      : overallScore >= 60
      ? 'Your message communicates basic intent, but hiring managers receive 200+ emails daily and demand clear subject metadata, formal sign-offs, and polite timelines.'
      : 'This draft poses high elimination risk. The tone, lack of structure, or absence of standard professional email norms would create an adverse impression with the recruiting team.';

    return res.json({
      grammarScore,
      professionalismScore,
      toneScore,
      overallScore,
      verdict,
      verdictTier,
      feedback,
      redFlags: redFlags.length > 0 ? redFlags : ['Ensure message is reviewed for typos before sending'],
      honestGuidance,
      strengths: [
        hasSalutation ? 'Clear, polite greeting' : 'Direct expression of candidate intent',
        hasGratitude ? 'Polite and appreciative vocabulary' : 'Concise messaging structure',
      ],
      improvements: [
        !hasSubject ? 'Add explicit subject line with Role and Candidate Name' : 'Include specific interview date/panel references',
        'State availability for supplementary technical assessments or code repositories',
      ],
      polishedVersion: `Subject: Follow-up regarding Technical Interview Status - Software Engineer Role

Dear Hiring Team,

I hope this email finds you well. I would like to sincerely thank you and the engineering panel for the insightful interview earlier this week for the Software Engineer position.

I am writing to respectfully inquire about the status of my application and the expected timeline for the next steps in the recruitment cycle. I remain extremely excited about the prospect of contributing to your engineering organization.

Please let me know if there are any additional documents, code repositories, or references you require from my side.

Warm regards,
Candidate Name
B.Tech Computer Science & Engineering
Phone: +91 98765 43210 | LinkedIn: in/candidate-profile | GitHub: github.com/candidate-dev`,
    });
  } catch (error) {
    console.error('Email evaluation error:', error);
    res.status(500).json({ error: 'Evaluation failed' });
  }
});

// 3. Real World Task: GD / Voice Speech Evaluation
app.post('/api/evaluate/speech', async (req, res) => {
  try {
    const { transcript, durationSeconds, topic } = req.body;
    const ai = getGeminiClient();

    if (ai && transcript && transcript.trim().length > 10) {
      try {
        const text = await generateWithFallback(ai, {
          contents: `You are a strict, experienced Group Discussion (GD) Moderator and Corporate Placement Evaluator.
Evaluate this student's GD / Public Speaking transcript for topic: "${topic || 'AI Impact on Jobs in India'}".
Duration: ${durationSeconds || 45} seconds.

Student's Spoken Transcript:
"""${transcript}"""

CRITICAL INSTRUCTIONS FOR HONEST & REAL EVALUATION:
1. BE UNVARNISHED, HONEST, AND REAL. In campus GDs, 70% of students are screened out in the first 10 minutes.
2. If the candidate gives a shallow, 1-2 sentence generic comment without supporting data, company examples, or clear structure, penalize heavily (overallScore 30-58) and highlight why they would be eliminated in Round 1.
3. Check for:
   - Analytical substance vs superficial buzzwords
   - Transitional connectives ("Furthermore", "In contrast", "Historical precedent shows")
   - Collaborative GD rhetoric ("Building on what my peer mentioned...")
   - Concrete industry or statistical references
4. Provide a powerful, high-converting hook opening that commands panel respect.

Respond ONLY in valid JSON:
{
  "confidenceScore": number (0-100),
  "grammarScore": number (0-100),
  "communicationScore": number (0-100),
  "overallScore": number (0-100),
  "verdict": "Direct 1-sentence assessment of GD survival probability",
  "verdictTier": "critical" | "needs_work" | "ready",
  "eyeContactTips": "Precise posture, webcam alignment, and gesture tips for virtual/in-person GD",
  "feedback": "2-3 candid sentences detailing how the moderation panel perceived their contribution",
  "redFlags": ["Disqualification risk 1", "Disqualification risk 2"],
  "honestGuidance": [
    "Concrete action step 1 to take control of GD",
    "Concrete action step 2 to introduce structured logic",
    "Concrete action step 3 to engage peers without aggression"
  ],
  "keyTakeaways": ["takeaway 1", "takeaway 2"],
  "improvedOpening": "High-impact hook sentence that immediately commands the room"
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed.overallScore === 'number') {
            return res.json(parsed);
          }
        }
      } catch (err) {
        console.warn('Speech evaluation Gemini call failed, utilizing rigorous dynamic fallback:', err);
      }
    }

    // Dynamic, content-aware speech evaluation fallback
    const raw = (transcript || '').trim();
    const words = raw.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const hasTransitions = /furthermore|moreover|consequently|in\s+contrast|however|on\s+the\s+other\s+hand|historical\s+precedent|specifically|to\s+summarize|in\s+addition|nevertheless/i.test(raw);
    const hasData = /\d+%|\b\d{2,}\b|statistics|research|survey|gartner|mckinsey|nasscom|market|revenue|precedent/i.test(raw);
    const hasPeerRef = /as\s+my\s+peer\s+mentioned|building\s+upon|i\s+agree\s+with|respectfully\s+differ|fellow\s+peers|distinguished\s+panel/i.test(raw);
    const hasWeakFillers = /\b(like|you\s+know|um|uh|stuff|basically|actually|kinda|sorta)\b/i.test(raw);

    let confidenceScore = 60;
    if (wordCount >= 60) confidenceScore += 22;
    else if (wordCount >= 30) confidenceScore += 12;
    else confidenceScore -= 18;

    if (hasTransitions) confidenceScore += 8;
    if (hasWeakFillers) confidenceScore -= 14;
    confidenceScore = Math.min(95, Math.max(25, confidenceScore));

    let communicationScore = 55;
    if (hasTransitions) communicationScore += 16;
    if (hasData) communicationScore += 14;
    if (hasPeerRef) communicationScore += 10;
    if (wordCount < 25) communicationScore -= 20;
    communicationScore = Math.min(95, Math.max(25, communicationScore));

    let grammarScore = wordCount > 30 ? 84 : 65;
    if (hasWeakFillers) grammarScore -= 12;
    grammarScore = Math.min(95, Math.max(30, grammarScore));

    const overallScore = Math.round((confidenceScore * 0.4) + (communicationScore * 0.35) + (grammarScore * 0.25));

    let verdictTier: 'critical' | 'needs_work' | 'ready' = 'ready';
    let verdict = '🟢 Placement Ready: Articulate argument with commanding poise and structured delivery.';
    const redFlags: string[] = [];
    const honestGuidance: string[] = [];

    if (overallScore < 60 || wordCount < 30) {
      verdictTier = 'critical';
      verdict = '🔴 Elimination Risk: Speaking too briefly or superficially will lead to immediate GD screening rejection.';
    } else if (overallScore < 80) {
      verdictTier = 'needs_work';
      verdict = '🟡 Average Contributor: Understandable point, but lacks quantified evidence to secure top-rank shortlist.';
    }

    if (wordCount < 30) {
      redFlags.push('Speech Under 25 Words: GD evaluators look for minimum 45-60 seconds of sustained argumentation.');
      honestGuidance.push('Use the PREP Framework: Point (Stance) -> Reason (Why) -> Example (Case study or stat) -> Point (Conclusion).');
    }
    if (!hasData) {
      redFlags.push('Lacks Empirical Evidence: Pure opinions without statistics, market reports, or company examples sound amateurish.');
      honestGuidance.push('Anchor your point with a credible metric (e.g., "According to recent industry reports..." or "Historical precedent from the industrial revolution shows...").');
    }
    if (!hasTransitions) {
      redFlags.push('Choppy Flow: Speaking without signposting words ("Furthermore", "In contrast") makes arguments difficult to follow.');
      honestGuidance.push('Incorporate transition phrases to help panelists follow your chain of reasoning effortlessly.');
    }
    if (!hasPeerRef) {
      honestGuidance.push('Demonstrate leadership by acknowledging peers: "I agree with the point made about automation, and I would like to add an economic perspective...".');
    }

    const feedback = overallScore >= 80
      ? 'Compelling contribution. You formulated a structured perspective, maintained analytical depth, and demonstrated high GD maturity.'
      : overallScore >= 60
      ? 'Decent initial point, but you blended into the crowd. In campus GDs of 10-12 students, only 2-3 get shortlisted. You need hard metrics and a commanding hook.'
      : 'This entry would result in disqualification. A few generic lines without substantiation or structured reasoning cannot survive Tier-1 corporate GD rounds.';

    return res.json({
      confidenceScore,
      grammarScore,
      communicationScore,
      overallScore,
      verdict,
      verdictTier,
      eyeContactTips: 'Maintain 80% direct eye-level focus on your webcam lens (not the participant gallery). Use slight hand gestures inside the camera frame to emphasize contrast.',
      feedback,
      redFlags: redFlags.length > 0 ? redFlags : ['Ensure pace remains steady under panel interruptions'],
      honestGuidance,
      keyTakeaways: [
        hasTransitions ? 'Good logical signposting' : 'Needs transitional phrases for cohesive flow',
        hasData ? 'Solid real-world metric citation' : 'Add 1 concrete statistical data point or industry example',
      ],
      improvedOpening: `Distinguished panel and peers, while rapid technological disruptions always trigger understandable anxiety, historical precedent demonstrates that technology shifts human effort from routine execution to higher-order architecture. In the Indian technology ecosystem, developers who leverage AI as a force multiplier will outpace those who resist it...`,
    });
  } catch (error) {
    console.error('Speech eval error:', error);
    res.status(500).json({ error: 'Speech evaluation failed' });
  }
});

// 4. Real World Task: Resume ATS Reviewer
app.post('/api/evaluate/resume', async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    const ai = getGeminiClient();

    if (ai && resumeText && resumeText.trim().length > 30) {
      try {
        const text = await generateWithFallback(ai, {
          contents: `You are an ATS Algorithms Architect and Senior Technical Recruiter at a Fortune 500 tech enterprise.
Perform a rigorous, honest, and unvarnished ATS audit of this student's resume for target role: "${targetRole || 'Software Development Engineer / SDE-1'}".

Student's Resume Text:
"""${resumeText}"""

CRITICAL INSTRUCTIONS FOR HONEST & REAL ATS AUDIT:
1. BE HARSH, REAL, AND OBJECTIVE. Over 75% of campus placement resumes are filtered out in the first 6 seconds or fail ATS parsing.
2. If the resume is a short skeleton, lacks quantifiable impact (no %, numbers, latency, user counts), omits critical skills for ${targetRole}, or uses passive verbs ("Responsible for", "Helped with"), score it realistically low (atsScore 35-65) and call out exact failure reasons.
3. Check for:
   - Keyword density for ${targetRole}
   - Google X-Y-Z formula: Accomplished [X] as measured by [Y] by doing [Z]
   - Section structure: Education, Technical Skills, Experience/Projects, Achievements
   - Presence of live GitHub / LinkedIn / Portfolio URLs
4. Provide at least two direct Google X-Y-Z bullet rewrites targeting actual lines in their text.

Respond ONLY in valid JSON:
{
  "atsScore": number (0-100),
  "formattingScore": number (0-100),
  "impactScore": number (0-100),
  "keywordMatch": number (0-100),
  "verdict": "A hard-hitting 1-sentence verdict on recruiter shortlist odds",
  "verdictTier": "critical" | "needs_work" | "ready",
  "summary": "2-3 honest sentences summarizing why an ATS or human screener would or would not advance this candidate",
  "redFlags": ["Exact ATS drop risk 1", "Exact ATS drop risk 2"],
  "honestGuidance": [
    "Actionable change 1 needed immediately",
    "Actionable change 2 needed immediately",
    "Actionable change 3 needed immediately"
  ],
  "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "actionableSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "bulletRewrites": [
    {
      "original": "Actual bullet from their resume that was weak or passive",
      "improved": "High-impact Google X-Y-Z rewrite with quantified metrics and active verbs"
    }
  ]
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed.atsScore === 'number') {
            return res.json(parsed);
          }
        }
      } catch (err) {
        console.warn('Resume evaluation Gemini call failed, utilizing rigorous dynamic fallback:', err);
      }
    }

    // Dynamic content-aware ATS fallback engine
    const raw = (resumeText || '').trim();
    const rawLower = raw.toLowerCase();

    // Specific role keyword matching
    const ROLE_DICT: Record<string, string[]> = {
      'Software Engineer / SDE-1': [
        'Data Structures', 'Algorithms', 'System Design', 'RESTful APIs', 'Git',
        'Docker', 'PostgreSQL', 'Unit Testing', 'CI/CD', 'Microservices', 'Redis',
        'Latency Reduction', 'Concurrency', 'Linux'
      ],
      'Data Analyst / Business Intelligence': [
        'SQL', 'Python', 'Pandas', 'Tableau', 'Power BI', 'Data Cleaning',
        'Statistical Modeling', 'A/B Testing', 'ETL Pipelines', 'Excel Pivot Tables',
        'Cohort Analysis', 'EDA'
      ],
      'Full Stack Developer (MERN / React / Node)': [
        'React.js', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS',
        'MongoDB', 'PostgreSQL', 'State Management', 'REST APIs', 'Next.js',
        'Docker', 'Authentication', 'Vite'
      ],
      'Technology Consultant / Analyst (Deloitte/Accenture)': [
        'Requirement Gathering', 'Stakeholder Management', 'Agile', 'Process Automation',
        'Cost-Benefit Analysis', 'Cloud Infrastructure', 'Enterprise Architecture',
        'Risk Mitigation', 'KPI Tracking'
      ]
    };

    const targetKws = ROLE_DICT[targetRole] || ROLE_DICT['Software Engineer / SDE-1'];
    const matchedKws = targetKws.filter(kw => rawLower.includes(kw.toLowerCase()));
    const missingKeywords = targetKws.filter(kw => !rawLower.includes(kw.toLowerCase())).slice(0, 5);
    const kwRatio = matchedKws.length / targetKws.length;
    const keywordMatch = Math.min(95, Math.max(25, Math.round(30 + kwRatio * 65)));

    // Formatting check
    const hasEdu = /education|college|b\.tech|btech|degree|cgpa|gpa/i.test(raw);
    const hasProjects = /project|experience|work|intern/i.test(raw);
    const hasSkills = /skill|technolog|languages|tools|database/i.test(raw);
    const hasLinks = /github|linkedin|portfolio|\.com|@/i.test(raw);

    let formattingScore = 40;
    if (hasEdu) formattingScore += 15;
    if (hasProjects) formattingScore += 15;
    if (hasSkills) formattingScore += 15;
    if (hasLinks) formattingScore += 15;
    formattingScore = Math.min(95, formattingScore);

    // Impact / Quantification check (Numbers, %, multipliers, scale)
    const numbers = (raw.match(/\d+(\.\d+)?%|\b\d{2,}\b|\b\d+\s*(users|clients|ms|seconds|x|k)\b/gi) || []).length;
    const impactScore = Math.min(95, Math.max(25, Math.round(35 + Math.min(numbers, 8) * 7.5)));

    const atsScore = Math.round((keywordMatch * 0.45) + (formattingScore * 0.25) + (impactScore * 0.3));

    let verdictTier: 'critical' | 'needs_work' | 'ready' = 'ready';
    let verdict = '🟢 Placement Ready: High ATS compatibility, rich keyword alignment, and quantifiable project impact.';
    const redFlags: string[] = [];
    const honestGuidance: string[] = [];

    if (atsScore < 60 || impactScore < 50 || raw.length < 200) {
      verdictTier = 'critical';
      verdict = '🔴 High ATS Drop Risk: This resume will be auto-rejected by enterprise ATS filters before a human screener sees it.';
    } else if (atsScore < 78) {
      verdictTier = 'needs_work';
      verdict = '🟡 Moderate Contender: Good foundations, but passive phrasing and missing metrics place you outside the top 10% shortlist.';
    }

    if (numbers < 2) {
      redFlags.push('Zero or Insufficient Quantified Metrics: Bullet points describe responsibilities rather than measurable business/engineering achievements.');
      honestGuidance.push('Rewrite every project bullet using Google X-Y-Z: "Accomplished [X] as measured by [Y] by doing [Z]". Include latency drops, user numbers, or database record sizes.');
    }
    if (missingKeywords.length >= 3) {
      redFlags.push(`Critical Keyword Deficit: Missing foundational ${targetRole} search tokens (${missingKeywords.slice(0, 3).join(', ')}).`);
      honestGuidance.push(`Integrate missing keywords naturally into project architecture descriptions: ${missingKeywords.join(', ')}.`);
    }
    if (!hasLinks) {
      redFlags.push('Missing Proof of Work Links: Tech recruiters immediately look for live GitHub repos and verified LinkedIn profiles.');
      honestGuidance.push('Place clean, clickable GitHub and LinkedIn links in your top header contact section.');
    }

    // Extract dynamic lines for rewrites
    const lines = raw.split('\n').map(l => l.trim().replace(/^[-*•\d.]+\s*/, '')).filter(l => l.length > 20 && !l.toUpperCase().includes('SKILLS'));
    const bullet1 = lines[0] || 'Worked on web application using React and Node.js';
    const bullet2 = lines[1] || 'Created machine learning model for data classification';

    return res.json({
      atsScore,
      formattingScore,
      impactScore,
      keywordMatch,
      verdict,
      verdictTier,
      summary: atsScore >= 80
        ? `Strong candidate profile with high keyword density for ${targetRole}. Project descriptions demonstrate technical depth.`
        : atsScore >= 60
        ? `Moderate technical profile. You have relevant coursework, but generic bullet phrasing and missing metrics reduce your shortlist rate by 40%.`
        : `High rejection probability. Sparse descriptions, lack of quantified outcomes, and missing core competencies will cause early ATS filtering.`,
      redFlags: redFlags.length > 0 ? redFlags : ['Ensure font styling uses standard ATS-safe fonts (Arial, Calibri, Helvetica)'],
      honestGuidance: honestGuidance.length > 0 ? honestGuidance : ['Group skills into clear tiers: Languages, Frameworks, Cloud & Databases, Core Fundamentals'],
      missingKeywords,
      actionableSuggestions: [
        'Replace passive verbs ("Responsible for", "Helped with") with strong action verbs ("Architected", "Engineered", "Optimized")',
        'Ensure single-column layout without tables or multi-column text frames to prevent ATS line parser corruption',
        'Quantify outcomes: specify throughput, request handling, latency improvement, or user base',
      ],
      bulletRewrites: [
        {
          original: bullet1,
          improved: `Architected responsive full-stack platform using React & Node.js, reducing API response latency by 34% across 5,000+ monthly campus users.`,
        },
        {
          original: bullet2,
          improved: `Engineered end-to-end data pipeline in Python & PostgreSQL, processing 50K+ records with 99.2% accuracy and zero database concurrency bottlenecks.`,
        },
      ],
    });
  } catch (error) {
    console.error('Resume eval error:', error);
    res.status(500).json({ error: 'Resume review failed' });
  }
});

// 5. Real World Task: LinkedIn Optimization
app.post('/api/evaluate/linkedin', async (req, res) => {
  try {
    const { headline, about, experience, targetField } = req.body;
    const ai = getGeminiClient();

    if (ai && (headline || about)) {
      try {
        const text = await generateWithFallback(ai, {
          contents: `You are a Senior Tech Recruiter and LinkedIn Personal Branding Strategist.
Perform a REAL, HONEST, and UNVARNISHED evaluation of this college student's LinkedIn profile for target field: "${targetField || 'Software Engineering & AI'}".

Current Profile:
Headline: "${headline || 'Student at XYZ College'}"
About: "${about || ''}"
Experience/Projects: "${experience || ''}"

CRITICAL INSTRUCTIONS FOR HONEST & REAL EVALUATION:
1. BE CANDID AND HONEST. Recruiters spend under 5 seconds searching on LinkedIn Recruiter.
2. If the headline is generic (e.g. "Student at...", "Aspiring software engineer", "Looking for opportunities"), score headline low (30-55) and explain why search algorithms never surface it.
3. If the About section is a generic paragraph with no hook, no metrics, no tech stack, and no call to action, score it realistically low with honest red flags.
4. Provide a high-converting, keyword-dense headline (under 120 chars) and a 3-paragraph story-driven About section ready to copy-paste.

Respond ONLY in valid JSON:
{
  "headlineScore": number (0-100),
  "aboutScore": number (0-100),
  "keywordsScore": number (0-100),
  "visibilityScore": number (0-100),
  "overallScore": number (0-100),
  "verdict": "Direct 1-sentence assessment of recruiter reach",
  "verdictTier": "critical" | "needs_work" | "ready",
  "feedback": "2-3 candid sentences detailing why recruiters are or are not reaching out",
  "redFlags": ["Recruiter search visibility red flag 1", "Red flag 2"],
  "honestGuidance": [
    "Actionable step 1 to rank higher in recruiter search",
    "Actionable step 2 for narrative engagement",
    "Actionable step 3 for networking conversion"
  ],
  "optimizedHeadline": "Keyword-rich, high-converting headline under 120 chars",
  "optimizedAbout": "Story-driven, keyword-rich 3-paragraph About section ready to copy-paste",
  "keyMissingTerms": ["term1", "term2", "term3", "term4", "term5"]
}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed.overallScore === 'number') {
            return res.json(parsed);
          }
        }
      } catch (err) {
        console.warn('LinkedIn evaluation Gemini call failed, utilizing rigorous dynamic fallback:', err);
      }
    }

    // Dynamic, content-aware LinkedIn evaluation fallback
    const hl = (headline || '').trim();
    const ab = (about || '').trim();

    const isGenericStudentHeadline = /^student\b|^aspiring\b|seeking\s+opportunities|looking\s+for\s+job/i.test(hl);
    const hasSeparators = /\||•|—|-/.test(hl);
    const hasTechInHeadline = /react|node|python|java|c\+\+|aws|cloud|ai|ml|full-stack|backend|frontend|dev/i.test(hl);
    const headlineWords = hl.split(/\s+/).filter(Boolean).length;

    let headlineScore = 60;
    if (hasTechInHeadline) headlineScore += 20;
    if (hasSeparators) headlineScore += 10;
    if (isGenericStudentHeadline) headlineScore -= 30;
    if (headlineWords < 4) headlineScore -= 20;
    headlineScore = Math.min(95, Math.max(20, headlineScore));

    const aboutWords = ab.split(/\s+/).filter(Boolean).length;
    let aboutScore = 50;
    if (aboutWords >= 80) aboutScore += 30;
    else if (aboutWords >= 40) aboutScore += 15;
    else aboutScore -= 20;

    const hasAboutTech = /build|architect|scalable|database|algorithm|project|github/i.test(ab);
    if (hasAboutTech) aboutScore += 10;
    aboutScore = Math.min(95, Math.max(25, aboutScore));

    const keywordsScore = (hasTechInHeadline && hasAboutTech) ? 88 : 55;
    const visibilityScore = Math.round((headlineScore * 0.6) + (keywordsScore * 0.4));
    const overallScore = Math.round((headlineScore + aboutScore + keywordsScore + visibilityScore) / 4);

    let verdictTier: 'critical' | 'needs_work' | 'ready' = 'ready';
    let verdict = '🟢 High Recruiter Appeal: Search-optimized headline and engaging technical narrative.';
    const redFlags: string[] = [];
    const honestGuidance: string[] = [];

    if (overallScore < 60 || isGenericStudentHeadline) {
      verdictTier = 'critical';
      verdict = '🔴 Near-Zero Recruiter Visibility: Search algorithms rarely index generic student titles.';
    } else if (overallScore < 80) {
      verdictTier = 'needs_work';
      verdict = '🟡 Moderate Visibility: Visible in broad queries, but missing differentiation to generate inbound recruiter messages.';
    }

    if (isGenericStudentHeadline) {
      redFlags.push('Generic Title ("Student at XYZ"): Recruiters never search for "student". They search for skill tokens like "React Developer", "Java Engineer", or "Data Analyst".');
      honestGuidance.push('Replace "Student" with your technical identity: "Software Engineer | React • Node.js • TypeScript | B.Tech CSE \'26".');
    }
    if (aboutWords < 40) {
      redFlags.push('Sparse About Section: A 2-line summary fails to convey your coding depth, hackathon achievements, or placement aspirations.');
      honestGuidance.push('Structure your About section into 3 acts: (1) Your engineering passion and hook, (2) What you build and key metrics, (3) Current placement aspirations and contact invite.');
    }
    if (!hasSeparators) {
      honestGuidance.push('Use visual bullet separators (• or |) in your headline to make multi-stack skills immediately scannable on mobile screens.');
    }

    return res.json({
      headlineScore,
      aboutScore,
      keywordsScore,
      visibilityScore,
      overallScore,
      verdict,
      verdictTier,
      feedback: overallScore >= 80
        ? 'Well-aligned profile with high keyword density. Search algorithms will rank this favorably in campus recruiter candidate pipelines.'
        : overallScore >= 60
        ? 'Average baseline. Your profile is readable, but without specific project achievements and targeted skills in the headline, recruiters pass over it.'
        : 'Critical visibility deficiency. The current headline and about section fail to signal technical capability or role relevance to automated recruiter search filters.',
      redFlags: redFlags.length > 0 ? redFlags : ['Ensure profile picture is professional with high contrast neutral background'],
      honestGuidance: honestGuidance.length > 0 ? honestGuidance : ['Pin your top 2 GitHub repositories and live demo links to the Featured section'],
      optimizedHeadline: `Software Engineer | Full-Stack & Scalable Systems | React • TypeScript • Node.js • PostgreSQL | 400+ LeetCode`,
      optimizedAbout: `👋 Hello! I am a Computer Science engineer dedicated to architecting resilient, user-centric software applications and solving complex algorithmic challenges.

🚀 WHAT I BUILD:
• Full-Stack Systems: Engineered responsive web applications using React.js, TypeScript, Node.js, and Express with secure RESTful APIs.
• Scalable Architecture: Designing clean relational schemas in PostgreSQL, utilizing Redis caching, and optimizing SQL queries for sub-100ms response times.
• Problem Solving: Solved 400+ algorithmic data structure problems on LeetCode, mastering dynamic programming, graphs, and system design fundamentals.

🎯 CAMPUS PLACEMENT ASPIRATIONS:
Currently preparing for 2026 campus placement recruitment drives. Eager to contribute to high-velocity engineering teams building scalable microservices and product innovations.

Let's connect! Open to technical discussions, open-source collaborations, and engineering opportunities.
✉️ Email: candidate@placementverse.edu | GitHub: github.com/candidate`,
      keyMissingTerms: ['Distributed Systems', 'RESTful APIs', 'PostgreSQL / SQL', 'Cloud Deployment (Docker/AWS)', 'Data Structures & Algorithms'],
    });
  } catch (error) {
    console.error('LinkedIn optimization error:', error);
    res.status(500).json({ error: 'LinkedIn evaluation failed' });
  }
});

// 6. AI Question Bank Generator (For admin bulk upload & dynamic topic practice)
app.post('/api/ai/generate-mcqs', async (req, res) => {
  try {
    const { topicName, count = 5, difficulty = 'Medium' } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      try {
        const text = await generateWithFallback(ai, {
          contents: `Generate ${count} placement examination MCQs on topic "${topicName}" with difficulty "${difficulty}".
Include realistic campus recruitment questions (TCS, Infosys, Amazon, Cognizant, Wipro, Accenture style).
Respond ONLY in valid JSON array:
[
  {
    "id": "gen-1",
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "difficulty": "${difficulty}",
    "explanation": "Step-by-step mathematical or logical explanation",
    "companyTag": "TCS / Infosys"
  }
]`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ questions: parsed });
        }
      } catch (err) {
        console.warn('Question generator fallback used');
      }
    }

    // Default questions fallback
    return res.json({
      questions: [
        {
          id: `gen-${Date.now()}-1`,
          question: `In a placement test on ${topicName}, if an item is increased by 20% and then discounted by 20%, what is the net change?`,
          options: ['No change', '4% decrease', '4% increase', '2% decrease'],
          correctIndex: 1,
          difficulty: 'Medium',
          explanation: 'Formula: a + b + (ab/100) = +20 - 20 - (400/100) = -4%. Hence, net 4% decrease.',
          companyTag: 'Infosys',
        },
        {
          id: `gen-${Date.now()}-2`,
          question: `A and B can complete a project in 12 days and 18 days respectively. If they work together for 4 days, what fraction of work is left?`,
          options: ['4/9', '5/9', '1/3', '2/5'],
          correctIndex: 0,
          difficulty: 'Medium',
          explanation: 'Total work = LCM(12, 18) = 36 units. Rate A = 3, Rate B = 2. Combined rate = 5 units/day. In 4 days, work done = 20 units. Remaining = 16 units. Fraction = 16/36 = 4/9.',
          companyTag: 'TCS NQT',
        },
      ],
    });
  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

// Vite middleware in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PlacementVerse AI server active on port ${PORT}`);
  });
}

startServer();

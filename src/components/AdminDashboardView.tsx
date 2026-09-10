import React, { useState, useEffect } from 'react';
import {
  Users, Award, Scroll, BookOpen, UserPlus, Search, CheckCircle2,
  AlertCircle, ShieldCheck, Flame, Sparkles, ExternalLink, ArrowRight,
  Plus, Trash2, Edit3, Eye, Printer, RefreshCw, Trophy, Crown,
  LogOut, Check, Building2, GraduationCap, Clock, QrCode, Filter, Radio,
  Volume2, Laptop, Smartphone, Globe, Activity, Send, Megaphone, Bell, Monitor, MapPin, Wifi, Zap
} from 'lucide-react';
import { LearnerProfile, Module, Topic, Question, IssuedCertificateRecord, LearnerActivityItem } from '../types';
import { ALL_BADGES } from '../data/badgesData';
import {
  getAllStudents,
  saveAllStudents,
  fetchServerStudents,
  fetchServerActivities,
  sendAdminBroadcast,
  updateStudentInRoster,
  addStudentToRoster,
  deleteStudentFromRoster,
  reissueBadgeForStudent,
  revokeBadgeForStudent,
  addNewTopicToModule,
  deleteTopicFromModule,
  getIssuedCertificates,
  issueOrReissueCertificate,
  revokeCertificate,
  setActiveStudent,
  fireCelebrationConfetti,
  calculateLevel,
  playNotificationChime,
} from '../services/storageService';
import { subscribeToFirestoreLearners, fetchLearnersFromFirestore } from '../services/firebaseAuthService';

interface AdminDashboardViewProps {
  currentProfile: LearnerProfile;
  modules: Module[];
  onUpdateModules: (modules: Module[]) => void;
  onUpdateCurrentProfile: (profile: LearnerProfile) => void;
  onExitAdmin: () => void;
  onLogoutAdmin: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentProfile,
  modules,
  onUpdateModules,
  onUpdateCurrentProfile,
  onExitAdmin,
  onLogoutAdmin,
}) => {
  const [adminTab, setAdminTab] = useState<'roster' | 'activity' | 'badges' | 'certificates' | 'lessons' | 'profiles'>('roster');

  // Real-time students state
  const [students, setStudents] = useState<LearnerProfile[]>(() => getAllStudents());
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'top' | 'in-progress'>('all');
  const [selectedStudentForInspect, setSelectedStudentForInspect] = useState<LearnerProfile | null>(null);

  // Real-time Activity Timeline state
  const [activities, setActivities] = useState<Array<LearnerActivityItem & { studentName?: string; institute?: string }>>([]);
  const [activityCategoryFilter, setActivityCategoryFilter] = useState<string>('All');
  const [activitySearchQuery, setActivitySearchQuery] = useState<string>('');

  // Admin Broadcast Alert state
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('🔥 Urgent Placement Drive Notice');
  const [broadcastMessage, setBroadcastMessage] = useState('All candidates are requested to complete today\'s Quantitative Aptitude topics and review ATS Resume score before 6 PM.');
  const [broadcastType, setBroadcastType] = useState<'motivational' | 'urgent' | 'info' | 'congrats'>('motivational');
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSuccessNotice, setBroadcastSuccessNotice] = useState<string | null>(null);

  // Reissue Badges state
  const [selectedStudentForBadge, setSelectedStudentForBadge] = useState<string>(
    students[0]?.name || currentProfile.name
  );
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<string>('All');
  const [badgeSuccessMessage, setBadgeSuccessMessage] = useState<string | null>(null);

  // Certificates state
  const [certificates, setCertificates] = useState<IssuedCertificateRecord[]>(() => getIssuedCertificates());
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<string>(
    students[0]?.name || currentProfile.name
  );
  const [certTypeToIssue, setCertTypeToIssue] = useState<'ultimate' | 'quantitative' | 'verbal' | 'corporate'>('ultimate');
  const [certPreviewModal, setCertPreviewModal] = useState<IssuedCertificateRecord | null>(null);
  const [certSuccessMessage, setCertSuccessMessage] = useState<string | null>(null);

  // Add New Lesson state
  const [targetModuleId, setTargetModuleId] = useState<number>(modules[0]?.id || 1);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonSummary, setLessonSummary] = useState('');
  const [formulas, setFormulas] = useState<{ name: string; formula: string; note: string }[]>([
    { name: '', formula: '', note: '' }
  ]);
  const [workedExample, setWorkedExample] = useState({
    problem: '',
    solution: '',
    tip: ''
  });
  const [customQuestions, setCustomQuestions] = useState<{
    question: string;
    options: string[];
    correctIndex: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    explanation: string;
    companyTag: string;
  }[]>([
    {
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      difficulty: 'Easy',
      explanation: '',
      companyTag: 'TCS NQT'
    }
  ]);
  const [lessonSuccessMessage, setLessonSuccessMessage] = useState<string | null>(null);

  // Add / Modify User state
  const [profileActionType, setProfileActionType] = useState<'modify' | 'add'>('modify');
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<string>(
    students[0]?.name || currentProfile.name
  );
  // Edit Form Fields
  const currentEditingStudent = students.find(s => s.name.toLowerCase() === selectedStudentForEdit.toLowerCase()) || students[0];
  const [editName, setEditName] = useState(currentEditingStudent?.name || '');
  const [editInstitute, setEditInstitute] = useState(currentEditingStudent?.institute || '');
  const [editDepartment, setEditDepartment] = useState(currentEditingStudent?.department || '');
  const [editClassYear, setEditClassYear] = useState(currentEditingStudent?.classYear || '');
  const [editXp, setEditXp] = useState<number>(currentEditingStudent?.xp || 0);
  const [editStreak, setEditStreak] = useState<number>(currentEditingStudent?.streakDays || 1);
  const [editPlacementScore, setEditPlacementScore] = useState<number>(currentEditingStudent?.predictedPlacementScore || 80);

  // New User Form Fields
  const [newName, setNewName] = useState('');
  const [newInstitute, setNewInstitute] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [newClassYear, setNewClassYear] = useState('Final Year 2025');
  const [newStartingXp, setNewStartingXp] = useState(250);
  const [userSuccessMessage, setUserSuccessMessage] = useState<string | null>(null);

  // Keep edit fields updated when selected student changes
  const handleSelectStudentToEdit = (name: string) => {
    setSelectedStudentForEdit(name);
    const target = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (target) {
      setEditName(target.name);
      setEditInstitute(target.institute);
      setEditDepartment(target.department);
      setEditClassYear(target.classYear);
      setEditXp(target.xp);
      setEditStreak(target.streakDays);
      setEditPlacementScore(target.predictedPlacementScore);
    }
  };

// Robust helper to merge multiple candidate lists preserving IDs, Google OAuth emails, and activity progress
function mergeAllStudentLists(...lists: (LearnerProfile[] | null | undefined)[]): LearnerProfile[] {
  const map = new Map<string, LearnerProfile>();

  const getMatchKey = (s: LearnerProfile, existingKeys: string[]): string => {
    if (s.uid && s.uid.trim()) {
      return `uid:${s.uid.trim()}`;
    }
    if (s.email && s.email.trim()) {
      return `email:${s.email.trim().toLowerCase()}`;
    }
    const cleanName = s.name.trim().toLowerCase();
    for (const key of existingKeys) {
      if (key.startsWith('name:')) {
        const val = key.replace('name:', '');
        if (val === cleanName || val.includes(cleanName) || cleanName.includes(val)) {
          return key;
        }
      }
    }
    return `name:${cleanName}`;
  };

  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      if (!item || !item.name || !item.name.trim()) continue;
      const existingKeys = Array.from(map.keys());
      const key = getMatchKey(item, existingKeys);
      if (map.has(key)) {
        const prev = map.get(key)!;
        map.set(key, {
          ...prev,
          ...item,
          uid: item.uid || prev.uid,
          email: item.email || prev.email,
          photoUrl: item.photoUrl || prev.photoUrl,
          xp: Math.max(prev.xp || 0, item.xp || 0),
          predictedPlacementScore: Math.max(prev.predictedPlacementScore || 0, item.predictedPlacementScore || 0),
          badgesEarned: Array.from(new Set([...(prev.badgesEarned || []), ...(item.badgesEarned || [])])),
          completedTopicIds: Array.from(new Set([...(prev.completedTopicIds || []), ...(item.completedTopicIds || [])])),
          unlockedTopicIds: Array.from(new Set([...(prev.unlockedTopicIds || []), ...(item.unlockedTopicIds || [])])),
        });
      } else {
        map.set(key, item);
      }
    }
  }
  return Array.from(map.values());
}

  // Refresh students list
  const refreshStudents = async () => {
    const [serverList, firestoreList] = await Promise.all([
      fetchServerStudents(),
      fetchLearnersFromFirestore(),
    ]);
    const local = getAllStudents();
    const merged = mergeAllStudentLists(students, local, serverList, firestoreList);
    if (merged.length > 0) {
      setStudents(merged);
      saveAllStudents(merged);
    }
  };

  // Real-time synchronization state
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [liveEventBanner, setLiveEventBanner] = useState<{ text: string; time: string } | null>(null);

  // Real-time synchronization effect across tabs and devices
  useEffect(() => {
    // 1. Initial server and firestore pull
    Promise.all([
      fetchServerStudents(),
      fetchLearnersFromFirestore(),
    ]).then(([serverList, firestoreList]) => {
      const local = getAllStudents();
      const merged = mergeAllStudentLists(local, serverList, firestoreList);
      if (merged.length > 0) {
        setStudents(merged);
        saveAllStudents(merged);
      }
    });

    fetchServerActivities().then(actList => {
      if (Array.isArray(actList) && actList.length > 0) {
        setActivities(actList);
      }
    });

    // 2. Subscribe to real-time Firestore learners collection
    const unsubscribeFirestore = subscribeToFirestoreLearners((firestoreList) => {
      if (firestoreList && firestoreList.length > 0) {
        setStudents(prev => {
          const merged = mergeAllStudentLists(prev, firestoreList);
          saveAllStudents(merged);
          return merged;
        });
      }
    });

    // 3. Server-Sent Events (SSE) stream for instant live updates across all devices
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/students/stream');
      eventSource.onopen = () => {
        setIsLiveConnected(true);
      };
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data.allStudents)) {
            setStudents(prev => {
              const merged = mergeAllStudentLists(prev, data.allStudents);
              saveAllStudents(merged);
              return merged;
            });
          }
          if (data.type === 'JOURNEY_BEGUN' && data.payload?.name) {
            playNotificationChime();
            setLiveEventBanner({
              text: `🚀 Live Notification: Learner "${data.payload.name}" (${data.payload.institute || 'India'}) just BEGUN their placement journey!`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 7000);
          } else if (data.type === 'JOIN' && data.payload?.name) {
            playNotificationChime();
            setLiveEventBanner({
              text: `🎉 Real-Time Alert: New Candidate ${data.payload.name} (${data.payload.institute || 'India'}) registered!`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 6000);
          } else if (data.type === 'UPDATE' && data.payload?.name) {
            setLiveEventBanner({
              text: `⚡ Real-Time Update: ${data.payload.name} updated score to ${data.payload.predictedPlacementScore || 85}%`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 4500);
          } else if (data.type === 'ACTIVITY' && data.payload?.activity) {
            const enriched = {
              ...data.payload.activity,
              studentName: data.payload.studentName,
              institute: data.payload.institute,
            };
            setActivities(prev => [enriched, ...prev.filter(a => a.id !== enriched.id)].slice(0, 100));
            setLiveEventBanner({
              text: `⚡ Activity: ${data.payload.studentName || 'Learner'} — ${data.payload.activity.title}`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 4500);
          } else if (data.type === 'BROADCAST_ALERT' && data.payload?.message) {
            setLiveEventBanner({
              text: `📢 Broadcast Alert Active: "${data.payload.title}"`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 6000);
          }
        } catch {}
      };
      eventSource.onerror = () => {
        setIsLiveConnected(false);
      };
    } catch {
      setIsLiveConnected(false);
    }

    // 3. Storage & local cross-tab event listeners
    const handleStorageChange = () => {
      const local = getAllStudents();
      setStudents(prev => {
        const merged = mergeAllStudentLists(prev, local);
        saveAllStudents(merged);
        return merged;
      });
    };
    const handleLocalCustomEvent = (e: any) => {
      const local = getAllStudents();
      setStudents(prev => {
        const merged = mergeAllStudentLists(prev, local);
        saveAllStudents(merged);
        return merged;
      });
      if (e.detail?.journeyBegun && e.detail?.name) {
        playNotificationChime();
        setLiveEventBanner({
          text: `🚀 Live Notification: Learner "${e.detail.name}" just BEGUN their placement journey!`,
          time: 'Just now'
        });
        setTimeout(() => setLiveEventBanner(null), 7000);
      } else if (e.detail?.name) {
        setLiveEventBanner({
          text: `⚡ Real-Time Update: ${e.detail.name} updated profile`,
          time: 'Just now'
        });
        setTimeout(() => setLiveEventBanner(null), 4000);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('placementverse_students_updated', handleLocalCustomEvent);

    let bc: BroadcastChannel | null = null;
    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel('placementverse_sync');
        bc.onmessage = (msg) => {
          const local = getAllStudents();
          setStudents(prev => {
            const merged = mergeAllStudentLists(prev, local);
            saveAllStudents(merged);
            return merged;
          });
          if (msg.data?.journeyBegun && msg.data?.student?.name) {
            playNotificationChime();
            setLiveEventBanner({
              text: `🚀 Live Notification: Learner "${msg.data.student.name}" just BEGUN their placement journey!`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 7000);
          } else if (msg.data?.student?.name) {
            setLiveEventBanner({
              text: `⚡ Real-Time Update: ${msg.data.student.name} updated profile`,
              time: 'Just now'
            });
            setTimeout(() => setLiveEventBanner(null), 4000);
          }
        };
      }
    } catch {}

    // 4. Polling fallback every 3.5 seconds
    const interval = setInterval(() => {
      Promise.all([
        fetchServerStudents(),
        fetchLearnersFromFirestore(),
      ]).then(([serverList, firestoreList]) => {
        const merged = mergeAllStudentLists(serverList, firestoreList);
        if (merged.length > 0) {
          setStudents(prev => {
            const combined = mergeAllStudentLists(prev, merged);
            saveAllStudents(combined);
            return combined;
          });
        }
      });
      fetchServerActivities().then(actList => {
        if (Array.isArray(actList) && actList.length > 0) {
          setActivities(actList);
        }
      });
    }, 3500);

    return () => {
      unsubscribeFirestore();
      if (eventSource) eventSource.close();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('placementverse_students_updated', handleLocalCustomEvent);
      if (bc) bc.close();
      clearInterval(interval);
    };
  }, []);

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    const [serverList, firestoreList] = await Promise.all([
      fetchServerStudents(),
      fetchLearnersFromFirestore(),
    ]);
    const local = getAllStudents();
    const merged = mergeAllStudentLists(students, local, serverList, firestoreList);
    if (merged.length > 0) {
      setStudents(merged);
      saveAllStudents(merged);
    }
    setTimeout(() => setIsManualSyncing(false), 500);
  };

  // 1. Reissue Badge Handler
  const handleReissueBadge = (badgeId: string) => {
    const updated = reissueBadgeForStudent(selectedStudentForBadge, badgeId);
    if (updated) {
      refreshStudents();
      if (updated.name.toLowerCase() === currentProfile.name.toLowerCase()) {
        onUpdateCurrentProfile(updated);
      }
      fireCelebrationConfetti();
      setBadgeSuccessMessage(`Successfully reissued badge "${badgeId}" to ${updated.name}! +150 XP bonus credited.`);
      setTimeout(() => setBadgeSuccessMessage(null), 4000);
    }
  };

  // Revoke Badge Handler
  const handleRevokeBadge = (badgeId: string) => {
    const updated = revokeBadgeForStudent(selectedStudentForBadge, badgeId);
    if (updated) {
      refreshStudents();
      if (updated.name.toLowerCase() === currentProfile.name.toLowerCase()) {
        onUpdateCurrentProfile(updated);
      }
      setBadgeSuccessMessage(`Revoked badge "${badgeId}" from ${updated.name}.`);
      setTimeout(() => setBadgeSuccessMessage(null), 4000);
    }
  };

  // Batch Reissue
  const handleBatchReissueMilestones = () => {
    const milestoneBadges = ALL_BADGES.filter(b => b.category === 'Milestone').map(b => b.id);
    milestoneBadges.forEach(bId => {
      reissueBadgeForStudent(selectedStudentForBadge, bId, 200);
    });
    refreshStudents();
    const updated = getAllStudents().find(s => s.name.toLowerCase() === selectedStudentForBadge.toLowerCase());
    if (updated && updated.name.toLowerCase() === currentProfile.name.toLowerCase()) {
      onUpdateCurrentProfile(updated);
    }
    fireCelebrationConfetti();
    setBadgeSuccessMessage(`All 5 Milestone Badges reissued to ${selectedStudentForBadge}!`);
    setTimeout(() => setBadgeSuccessMessage(null), 4000);
  };

  // 2. Issue / Reissue Certificate Handler
  const handleIssueCertificate = () => {
    const targetStudent = students.find(s => s.name.toLowerCase() === selectedStudentForCert.toLowerCase());
    if (!targetStudent) return;

    const certTitleMap = {
      ultimate: 'Ultimate Placement Readiness Certificate (Gold Tier)',
      quantitative: 'Quantitative & Logical Problem Solving Specialist',
      verbal: 'Verbal Mastery & Corporate Communication Excellence',
      corporate: 'ATS Resume & Technical Interview Endorsement',
    };

    const newCert: IssuedCertificateRecord = {
      id: `PV-CERT-${Date.now().toString().slice(-6)}`,
      studentName: targetStudent.name,
      institute: targetStudent.institute,
      type: certTypeToIssue,
      title: certTitleMap[certTypeToIssue],
      issueDate: new Date().toISOString().split('T')[0],
      readinessScore: targetStudent.predictedPlacementScore || 85,
      grade: targetStudent.predictedPlacementScore >= 90 ? 'A+ Distinguished' : 'A Superior',
      endorsedBy: 'Kapil Narula (Placement Director)',
      verificationCode: `PV-ADMIN-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
      status: 'Active',
    };

    const updatedCerts = issueOrReissueCertificate(newCert);
    setCertificates(updatedCerts);
    fireCelebrationConfetti();
    setCertSuccessMessage(`Certificate successfully issued to ${targetStudent.name}! Code: ${newCert.verificationCode}`);
    setTimeout(() => setCertSuccessMessage(null), 4500);
  };

  const handleRevokeCertificate = (certId: string) => {
    const updatedCerts = revokeCertificate(certId);
    setCertificates(updatedCerts);
    setCertSuccessMessage(`Certificate ${certId} status set to Revoked.`);
    setTimeout(() => setCertSuccessMessage(null), 3000);
  };

  // 3. Add New Lesson Handler
  const handleAddFormulaRow = () => {
    setFormulas([...formulas, { name: '', formula: '', note: '' }]);
  };

  const handleAutoFillSampleMCQs = () => {
    const title = lessonTitle.trim() || 'Placement Problem Solving';
    setCustomQuestions([
      {
        question: `What is the core strategic principle when solving recruitment problems in ${title}?`,
        options: [
          'Break down into sub-problems and apply proven formulas',
          'Guess randomly to save time',
          'Skip calculations and memorize answers',
          'Only focus on theoretical definitions'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: `In campus placements (TCS, Infosys, Amazon), structured modular decomposition saves 40% time on ${title}.`,
        companyTag: 'TCS NQT'
      },
      {
        question: `An interviewer asks for the optimal time complexity in ${title}. What is the industry standard benchmark?`,
        options: [
          'O(N) or O(N log N)',
          'O(N^3) cubic time',
          'O(2^N) exponential',
          'Unbounded search'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Top MNC technical screening rounds require linear or linear-logarithmic bounds for high-scale input sets.',
        companyTag: 'Amazon SDE'
      },
      {
        question: `[MNC Boss Challenge] Which verification metric confirms production-grade correctness in ${title}?`,
        options: [
          'Passing all edge cases, null checks, and boundary test conditions',
          'Compiles without warnings only',
          'Matches single test case',
          'Code is under 10 lines'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Comprehensive test suites including zero values, negative limits, and empty arrays guarantee clearance.',
        companyTag: 'Google & Microsoft'
      }
    ]);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;

    const newTopicId = `mod${targetModuleId}-topic-${Date.now().toString().slice(-5)}`;
    const targetMod = modules.find(m => m.id === targetModuleId);

    const newTopic: Topic = {
      id: newTopicId,
      name: lessonTitle.trim(),
      moduleId: targetModuleId,
      moduleName: targetMod?.title || 'Placement Readiness',
      order: (targetMod?.topics.length || 0) + 1,
      isUnlocked: true,
      isCompleted: false,
      learningContent: {
        summary: lessonSummary.trim() || `Master core recruitment concepts and speed-solving techniques for ${lessonTitle}.`,
        keyFormulas: formulas.filter(f => f.name.trim() || f.formula.trim()).map(f => ({
          name: f.name || 'Core Formula',
          formula: f.formula || 'X = Y / Z',
          note: f.note || 'Applied in campus placement rounds.'
        })),
        workedExamples: workedExample.problem.trim() ? [
          {
            problem: workedExample.problem,
            solution: workedExample.solution || 'Step-by-step resolution.',
            tip: workedExample.tip || 'Use analytical breakdown.'
          }
        ] : [
          {
            problem: `Sample campus drive question on ${lessonTitle}: How to approach under 60 seconds?`,
            solution: 'Identify givens, apply shortcut multiplier, and verify units.',
            tip: 'Always eliminate extreme outliers in multiple-choice questions.'
          }
        ],
        industryCase: {
          company: 'National Recruitment Drives (TCS, Infosys, Accenture, Amazon)',
          context: `Mastery in ${lessonTitle} provides a 3.4x score boost on online assessment screens.`,
          keyTakeaway: 'Speed + accuracy across standard patterns guarantees shortlisting.'
        },
        animatedConceptKey: 'default',
        infographicTakeaways: [
          'Read the problem statement once carefully before drafting solutions',
          'Memorize standard benchmark ratios and corner conditions',
          'Double check negative constraints before final submit'
        ]
      },
      practiceQuestions: customQuestions.map((q, idx) => ({
        id: `${newTopicId}-p-${idx + 1}`,
        question: q.question || `Practice problem ${idx + 1} for ${lessonTitle}`,
        options: q.options.filter(o => o.trim()).length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: q.correctIndex,
        difficulty: q.difficulty,
        explanation: q.explanation || 'Refer to the formulas tab for step-by-step breakdown.',
        companyTag: q.companyTag || 'TCS NQT'
      })),
      challengeQuestions: customQuestions.map((q, idx) => ({
        id: `${newTopicId}-c-${idx + 1}`,
        question: `[Timed Arena] ${q.question || `Challenge question ${idx + 1} for ${lessonTitle}`}`,
        options: q.options.filter(o => o.trim()).length === 4 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: q.correctIndex,
        difficulty: 'Medium',
        explanation: q.explanation || 'Apply rapid shortcut reasoning.',
        companyTag: 'Infosys InfyTQ'
      })),
      bossQuestions: [
        {
          id: `${newTopicId}-b-1`,
          question: `[MNC Boss Round] Advanced problem on ${lessonTitle}: High-stakes clearance test.`,
          options: ['Optimal Solution A', 'Plausible Distractor B', 'Boundary Flaw C', 'Syntax Error D'],
          correctIndex: 0,
          difficulty: 'Hard',
          explanation: 'Requires comprehensive mastery of both theory and edge-case execution.',
          companyTag: 'Amazon / Google'
        }
      ]
    };

    const updatedModules = addNewTopicToModule(targetModuleId, newTopic);
    onUpdateModules(updatedModules);
    fireCelebrationConfetti();
    setLessonSuccessMessage(`Lesson "${lessonTitle}" published successfully! Added to ${targetMod?.title} and available in the student Learning Path.`);
    
    // Reset form
    setLessonTitle('');
    setLessonSummary('');
    setFormulas([{ name: '', formula: '', note: '' }]);
    setWorkedExample({ problem: '', solution: '', tip: '' });
    setTimeout(() => setLessonSuccessMessage(null), 5000);
  };

  const handleDeleteLesson = (moduleId: number, topicId: string, topicName: string) => {
    if (window.confirm(`Are you sure you want to delete lesson "${topicName}"?`)) {
      const updated = deleteTopicFromModule(moduleId, topicId);
      onUpdateModules(updated);
      setLessonSuccessMessage(`Deleted topic "${topicName}".`);
      setTimeout(() => setLessonSuccessMessage(null), 3000);
    }
  };

  // 4. Modify User Handler
  const handleSaveModifiedProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.name.toLowerCase() === selectedStudentForEdit.toLowerCase());
    if (!targetStudent) return;

    const lvl = calculateLevel(editXp);
    const updated: LearnerProfile = {
      ...targetStudent,
      name: editName.trim(),
      institute: editInstitute.trim(),
      department: editDepartment.trim(),
      classYear: editClassYear.trim(),
      xp: editXp,
      streakDays: editStreak,
      predictedPlacementScore: editPlacementScore,
      level: lvl.level,
      levelTitle: lvl.title,
    };

    updateStudentInRoster(updated);
    refreshStudents();

    // If we edited the active student profile, propagate to App state
    if (currentProfile.name.toLowerCase() === targetStudent.name.toLowerCase()) {
      onUpdateCurrentProfile(updated);
    }

    fireCelebrationConfetti();
    setUserSuccessMessage(`Updated profile for ${updated.name} successfully!`);
    setTimeout(() => setUserSuccessMessage(null), 4000);
  };

  // Add New User Handler
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const lvl = calculateLevel(newStartingXp);
    const newStudent: LearnerProfile = {
      name: newName.trim(),
      institute: newInstitute.trim() || 'National Institute of Technology',
      department: newDepartment.trim() || 'Computer Science & Engineering',
      classYear: newClassYear.trim(),
      xp: newStartingXp,
      level: lvl.level,
      levelTitle: lvl.title,
      streakDays: 1,
      lastActiveDate: new Date().toISOString(),
      completedTopicIds: [],
      unlockedTopicIds: ['mod1-topic-1'],
      topicScores: {},
      badgesEarned: ['streak-fire-1'],
      dailyMissions: [
        { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 0, completed: false, rewardXp: 40 },
        { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 0, completed: false, rewardXp: 30 },
        { id: 'm3', title: 'Complete 1 Real-World Task', target: 1, current: 0, completed: false, rewardXp: 30 },
      ],
      realWorldSubmissions: {},
      predictedPlacementScore: 82,
    };

    addStudentToRoster(newStudent);
    refreshStudents();
    setSelectedStudentForEdit(newStudent.name);
    setNewName('');
    setNewInstitute('');
    setNewDepartment('');
    fireCelebrationConfetti();
    setUserSuccessMessage(`Candidate "${newStudent.name}" enrolled successfully!`);
    setTimeout(() => setUserSuccessMessage(null), 4000);
  };

  // Switch to student view (Impersonate)
  const handleSwitchToStudent = (student: LearnerProfile) => {
    setActiveStudent(student);
    onUpdateCurrentProfile(student);
    onExitAdmin();
  };

  // Delete student
  const handleDeleteStudent = (name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the Classrooms To Boardrooms roster?`)) {
      deleteStudentFromRoster(name);
      refreshStudents();
      setUserSuccessMessage(`Removed ${name} from candidate registry.`);
      setTimeout(() => setUserSuccessMessage(null), 3000);
    }
  };

  // Filter students for roster view
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(q) ||
      (s.email && s.email.toLowerCase().includes(q)) ||
      (s.institute && s.institute.toLowerCase().includes(q)) ||
      (s.department && s.department.toLowerCase().includes(q));
    if (!matchesSearch) return false;

    if (tierFilter === 'top') return s.predictedPlacementScore >= 90;
    if (tierFilter === 'in-progress') return s.predictedPlacementScore < 90;
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Admin Top Master Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Director Console
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isLiveConnected ? 'Real-Time SSE Stream Connected' : 'Real-Time Auto-Sync Active (3.5s)'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            Classrooms To Boardrooms Administration Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Classrooms To Boardrooms Placement Readiness Powered By Kapil • Real-time candidate monitoring, credential governance, badge re-issuance, curriculum lesson authoring, and student profile administration.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all"
            title="Broadcast Announcement or Motivational Alert to All Learners"
          >
            <Megaphone className="w-3.5 h-3.5 text-white" />
            <span>Broadcast Alert</span>
          </button>

          <button
            onClick={() => {
              playNotificationChime();
              setLiveEventBanner({
                text: '🔔 Notification Audio Chime Verified (Active)',
                time: 'Just now'
              });
              setTimeout(() => setLiveEventBanner(null), 3000);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all"
            title="Test Audio Chime for Learner Journey Alert"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Chime</span>
          </button>

          <button
            onClick={handleManualSync}
            disabled={isManualSyncing}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all"
            title="Force synchronization with live server roster"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isManualSyncing ? 'animate-spin text-emerald-400' : ''}`} />
            <span>{isManualSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all"
            title="Return to Student Dashboard"
          >
            <Eye className="w-4 h-4" />
            <span>Student Dashboard</span>
          </button>

          <button
            onClick={onLogoutAdmin}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            title="Log out of Admin Session"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Real-Time Live Activity Ticker Toast */}
      {liveEventBanner && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-900 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs sm:text-sm font-black text-emerald-900">{liveEventBanner.text}</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-full border border-emerald-200">
            {liveEventBanner.time}
          </span>
        </div>
      )}

      {/* Admin Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { id: 'roster', label: 'Candidate Progress', icon: Users, count: students.length },
          { id: 'activity', label: 'Activity Timeline', icon: Clock, count: activities.length },
          { id: 'badges', label: 'Reissue Badges', icon: Award, count: 23 },
          { id: 'certificates', label: 'Certificates Hub', icon: Scroll, count: certificates.length },
          { id: 'lessons', label: 'Add New Lessons', icon: BookOpen, count: modules.reduce((acc, m) => acc + m.topics.length, 0) },
          { id: 'profiles', label: 'Add / Modify Users', icon: UserPlus, count: students.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: REAL-TIME STUDENT PROGRESS & ROSTER */}
      {/* ========================================================================= */}
      {adminTab === 'roster' && (
        <div className="space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-display">{students.length} Candidates</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">● All colleges connected</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Readiness Index</p>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1 font-display">
                {students.length > 0
                  ? `${Math.round(students.reduce((acc, s) => acc + (s.predictedPlacementScore || 80), 0) / students.length)}%`
                  : '—'}
              </p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">National Target: &gt;85%</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Certificates Issued</p>
              <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 font-display">{certificates.length}</p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">Verified with QR hash</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Curriculum Lessons</p>
              <p className="text-2xl sm:text-3xl font-black text-blue-600 mt-1 font-display">
                {modules.reduce((acc, m) => acc + m.topics.length, 0)} Topics
              </p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">Across 5 Core Modules</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate, college, branch..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {(['all', 'top', 'in-progress'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTierFilter(tf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    tierFilter === tf
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tf === 'all' ? 'All Candidates' : tf === 'top' ? 'Top Tier (>90%)' : 'In Progress (<90%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Students Roster Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {searchQuery ? 'No Candidates Match Your Search' : 'Awaiting Real Candidate Registrations'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {searchQuery
                    ? `No candidate matches "${searchQuery}". Clear your search term to see all candidates.`
                    : 'No fake users or fake rankings exist. When learners type their name and click "Begin Placement Journey" from any device or browser, their profile, live XP, and scores will stream directly into this console in real time.'}
                </p>
              </div>
            ) : (
              filteredStudents.map((student) => {
              const isCurrent = student.name.toLowerCase() === currentProfile.name.toLowerCase();
              const completedCount = student.completedTopicIds.length;
              const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);
              const progressPct = Math.min(100, Math.round((completedCount / Math.max(1, totalTopics)) * 100));

              // Compute device, browser, and location metadata
              const studentAny = student as any;
              const rawDevType = (student.deviceType || studentAny.deviceMeta?.deviceType || 'laptop').toLowerCase();
              const isMobile = rawDevType.includes('mobile') || rawDevType.includes('phone') || rawDevType.includes('android') || rawDevType.includes('ios');
              const osName = student.os || studentAny.deviceMeta?.os || (isMobile ? 'Android / iOS' : 'Windows 11 Laptop');
              const browserName = student.browser || studentAny.deviceMeta?.browser || 'Chrome';
              const locationStr = student.location || studentAny.deviceMeta?.timezone || 'India';
              const ipStr = student.ipAddress || '';
              const isOnlineNow = studentAny.isOnline === true;
              const recentActivity = student.activityLog && student.activityLog.length > 0 ? student.activityLog[0] : null;

              return (
                <div
                  key={student.name}
                  className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                    isCurrent ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header line with avatar and status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {student.photoUrl ? (
                            <img
                              src={student.photoUrl}
                              alt={student.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white font-black text-sm flex items-center justify-center uppercase shadow-xs">
                              {student.name.charAt(0)}
                            </div>
                          )}
                          {isOnlineNow && (
                            <span
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse"
                              title="Active Online Now"
                            />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                            {isCurrent && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">
                                Current
                              </span>
                            )}
                            {student.email && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Google Verified
                              </span>
                            )}
                          </div>
                          {student.email && (
                            <p className="text-[10px] text-indigo-600 font-medium truncate max-w-[180px]">
                              {student.email}
                            </p>
                          )}
                          <p className="text-[11px] text-slate-500 font-medium">
                            {student.institute} • {student.department}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black">
                          {student.predictedPlacementScore || 84}%
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Readiness</span>
                      </div>
                    </div>

                    {/* Device, Browser & Location telemetry banner */}
                    <div className="mt-3 p-2 rounded-xl bg-slate-50/80 border border-slate-200/70 flex flex-wrap items-center gap-1.5 text-[10px]">
                      {isOnlineNow ? (
                        <span className="px-2 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Online Now
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-200/80 text-slate-600 border border-slate-300/50">
                          Offline
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-800 border border-blue-200/70 flex items-center gap-1" title={`Operating System: ${osName}`}>
                        {isMobile ? <Smartphone className="w-3 h-3 text-blue-600" /> : <Laptop className="w-3 h-3 text-blue-600" />}
                        <span className="truncate max-w-[110px]">{osName}</span>
                      </span>

                      <span className="px-2 py-0.5 rounded-md font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200/70 flex items-center gap-1" title={`Browser: ${browserName}`}>
                        <Globe className="w-3 h-3 text-indigo-500" />
                        <span className="truncate max-w-[80px]">{browserName}</span>
                      </span>

                      <span className="px-2 py-0.5 rounded-md font-medium bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center gap-1 truncate max-w-[140px]" title={`Origin: ${locationStr} ${ipStr ? `(${ipStr})` : ''}`}>
                        <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{locationStr}</span>
                      </span>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Total XP</p>
                        <p className="text-xs font-black text-blue-700">{student.xp.toLocaleString()}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Streak</p>
                        <p className="text-xs font-black text-amber-700 flex items-center justify-center gap-0.5">
                          <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {student.streakDays}d
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Badges</p>
                        <p className="text-xs font-black text-purple-700">{student.badgesEarned.length}</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Curriculum Progress</span>
                        <span className="font-bold text-slate-700">{completedCount}/{totalTopics} ({progressPct}%)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Latest Activity Snippet */}
                    {recentActivity && (
                      <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] flex items-start gap-2">
                        <Activity className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-800 truncate">{recentActivity.title}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {recentActivity.timestamp ? new Date(recentActivity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate">{recentActivity.description}</p>
                        </div>
                      </div>
                    )}

                    {/* Real world task summary */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span>Tasks:</span>
                      <span className={`px-1.5 py-0.5 rounded font-semibold ${student.realWorldSubmissions?.resume ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                        ATS Resume {student.realWorldSubmissions?.resume ? `(${student.realWorldSubmissions.resume.atsScore}%)` : '—'}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded font-semibold ${student.realWorldSubmissions?.gd ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-400'}`}>
                        GD Speech {student.realWorldSubmissions?.gd ? `(${student.realWorldSubmissions.gd.score}%)` : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Actions for this student */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedStudentForInspect(student)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Telemetry</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedStudentForBadge(student.name);
                          setAdminTab('badges');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center gap-1 transition-colors"
                        title="Reissue Badges for this Candidate"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Badges</span>
                      </button>

                      <button
                        onClick={() => handleSwitchToStudent(student)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                        title="Switch into student view as this candidate"
                      >
                        <span>Switch</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

          {/* Student Inspection Modal */}
          {selectedStudentForInspect && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                      {selectedStudentForInspect.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 font-display">
                        {selectedStudentForInspect.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {selectedStudentForInspect.institute} • {selectedStudentForInspect.department} ({selectedStudentForInspect.classYear})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudentForInspect(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                  >
                    ✕
                  </button>
                </div>

                {/* Score and Placement Prediction */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-900">Placement Readiness Index</span>
                    <p className="text-xs text-indigo-700">Predictive evaluation across aptitude, boss battles, and ATS tests.</p>
                  </div>
                  <div className="text-3xl font-black text-indigo-600 font-display">
                    {selectedStudentForInspect.predictedPlacementScore || 84}%
                  </div>
                </div>

                {/* Device Telemetry & Session Origin Audit */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Device Telemetry & Login Metadata
                      </h4>
                    </div>
                    {(selectedStudentForInspect as any).isOnline ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online Now
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        ⚪ Last active {(selectedStudentForInspect as any).lastActive ? new Date((selectedStudentForInspect as any).lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'recently'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-medium">Device Type</span>
                      <p className="font-bold text-slate-100 mt-0.5 flex items-center gap-1.5">
                        {((selectedStudentForInspect as any).deviceType || (selectedStudentForInspect as any).deviceMeta?.deviceType || 'Laptop').toLowerCase().includes('mobile') ? (
                          <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                        ) : (
                          <Laptop className="w-3.5 h-3.5 text-sky-400" />
                        )}
                        <span className="capitalize">{(selectedStudentForInspect as any).deviceType || (selectedStudentForInspect as any).deviceMeta?.deviceType || 'Laptop / Desktop'}</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-medium">Operating System</span>
                      <p className="font-bold text-slate-100 mt-0.5 truncate">
                        {(selectedStudentForInspect as any).os || (selectedStudentForInspect as any).deviceMeta?.os || 'Windows 11'}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-medium">Web Browser</span>
                      <p className="font-bold text-slate-100 mt-0.5 flex items-center gap-1 truncate">
                        <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{(selectedStudentForInspect as any).browser || (selectedStudentForInspect as any).deviceMeta?.browser || 'Chrome'}</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-medium">Location & Timezone</span>
                      <p className="font-bold text-slate-100 mt-0.5 truncate flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{(selectedStudentForInspect as any).location || 'India (IST)'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Client IP: <span className="font-mono text-slate-200">{(selectedStudentForInspect as any).ipAddress || '127.0.0.1'}</span></span>
                    <span>Screen: <span className="font-mono text-slate-200">{(selectedStudentForInspect as any).deviceMeta?.screenResolution || '1920x1080'}</span></span>
                    <span>Total Logins: <span className="font-bold text-emerald-400">{(selectedStudentForInspect as any).loginCount || 1} sessions</span></span>
                  </div>
                </div>

                {/* Candidate Activity Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      Candidate Activity Audit Timeline ({selectedStudentForInspect.activityLog?.length || 0})
                    </h4>
                    <span className="text-[10px] text-slate-400">Chronological Event Trail</span>
                  </div>

                  {(!selectedStudentForInspect.activityLog || selectedStudentForInspect.activityLog.length === 0) ? (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                      No timestamped events recorded yet for this candidate.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {selectedStudentForInspect.activityLog.map((act) => (
                        <div key={act.id} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                                act.actionType === 'REGISTER' || act.actionType === 'LOGIN' ? 'bg-emerald-100 text-emerald-800' :
                                act.actionType === 'BOSS_BATTLE' ? 'bg-purple-100 text-purple-800' :
                                act.actionType === 'CHALLENGE' ? 'bg-amber-100 text-amber-800' :
                                act.actionType === 'FAANG_MOCK_TEST' ? 'bg-rose-100 text-rose-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {act.actionType.replace('_', ' ')}
                              </span>
                              <span className="font-bold text-slate-900">{act.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                              {act.timestamp ? new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-1">{act.description}</p>
                          <div className="mt-1.5 flex items-center gap-3 text-[10px] text-slate-500">
                            {act.score !== undefined && <span className="font-semibold text-emerald-700">Score: {act.score}%</span>}
                            {act.xpEarned ? <span className="font-semibold text-blue-700">+{act.xpEarned} XP</span> : null}
                            {act.deviceSummary && <span className="text-slate-400">Via: {act.deviceSummary}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Badges Earned */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Unlocked Badges ({selectedStudentForInspect.badgesEarned.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudentForInspect.badgesEarned.map(badgeId => {
                      const badge = ALL_BADGES.find(b => b.id === badgeId);
                      return (
                        <div key={badgeId} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <span>{badge?.icon || '🏆'}</span>
                          <span>{badge?.name || badgeId}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-World Task Submissions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Real-World Corporate Tasks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-800">Professional Email Task</p>
                      <p className="text-slate-500 mt-0.5">Score: {selectedStudentForInspect.realWorldSubmissions?.email?.score ? `${selectedStudentForInspect.realWorldSubmissions.email.score}%` : 'Not attempted'}</p>
                      {selectedStudentForInspect.realWorldSubmissions?.email?.feedback && (
                        <p className="text-[11px] text-slate-600 mt-1 italic">"{selectedStudentForInspect.realWorldSubmissions.email.feedback}"</p>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-800">GD Speech Evaluation</p>
                      <p className="text-slate-500 mt-0.5">Score: {selectedStudentForInspect.realWorldSubmissions?.gd?.score ? `${selectedStudentForInspect.realWorldSubmissions.gd.score}%` : 'Not attempted'}</p>
                      {selectedStudentForInspect.realWorldSubmissions?.gd?.feedback && (
                        <p className="text-[11px] text-slate-600 mt-1 italic">"{selectedStudentForInspect.realWorldSubmissions.gd.feedback}"</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grand Final Assessment Performance */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-rose-600" />
                    Grand Final Assessment (250 Qs / 90 Mins)
                  </h4>
                  {selectedStudentForInspect.finalAssessmentAttempts && selectedStudentForInspect.finalAssessmentAttempts.length > 0 ? (
                    <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-950">
                          Latest Score: {selectedStudentForInspect.finalAssessmentAttempts[0].totalScore} / 1000 ({selectedStudentForInspect.finalAssessmentAttempts[0].percentage}%)
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          selectedStudentForInspect.finalAssessmentAttempts[0].passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {selectedStudentForInspect.finalAssessmentAttempts[0].passed ? 'PASSED (≥ 50%)' : 'NEEDS RETEST'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                        <div>Correct: <strong className="text-emerald-700">{selectedStudentForInspect.finalAssessmentAttempts[0].correctCount}</strong></div>
                        <div>Wrong: <strong className="text-rose-700">{selectedStudentForInspect.finalAssessmentAttempts[0].wrongCount}</strong></div>
                        <div>Skipped: <strong className="text-slate-700">{selectedStudentForInspect.finalAssessmentAttempts[0].unansweredCount}</strong></div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Code: {selectedStudentForInspect.finalAssessmentAttempts[0].certificateCode} • Time Spent: {Math.round(selectedStudentForInspect.finalAssessmentAttempts[0].timeSpentSeconds / 60)}m
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                      Candidate has not yet attempted the 250-Question Grand Final Assessment.
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      handleSwitchToStudent(selectedStudentForInspect);
                      setSelectedStudentForInspect(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Login & Experience As This Student</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: ACTIVITY TIMELINE (REAL-TIME AUDIT LOG ACROSS ALL LEARNERS) */}
      {/* ========================================================================= */}
      {adminTab === 'activity' && (
        <div className="space-y-6">
          {/* Header & Controls */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                  Live Event Feed
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Streaming activities from all browsers, mobiles & laptops
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display mt-1">
                Real-Time Learner Activity Timeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every topic solved, challenge completed, badge unlocked, boss defeated, and login event captured with exact timestamp and device origin.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsBroadcastModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Send Alert</span>
              </button>

              <button
                onClick={handleManualSync}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Stream</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={activitySearchQuery}
                onChange={(e) => setActivitySearchQuery(e.target.value)}
                placeholder="Search candidate name, action, or topic..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {['All', 'Aptitude', 'Technical', 'Soft Skills', 'Exam', 'System'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivityCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activityCategoryFilter === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Feed Container */}
          <div className="space-y-3">
            {activities.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
                <Clock className="w-10 h-10 text-indigo-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Awaiting Real-Time Activity</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  When candidates login, complete topics, defeat Boss Battles, or submit ATS resumes from any computer or phone, their activities will appear here instantly.
                </p>
              </div>
            ) : (
              activities
                .filter((act) => {
                  if (activityCategoryFilter !== 'All' && act.category !== activityCategoryFilter) return false;
                  if (!activitySearchQuery.trim()) return true;
                  const q = activitySearchQuery.toLowerCase();
                  return (
                    act.studentName?.toLowerCase().includes(q) ||
                    act.title.toLowerCase().includes(q) ||
                    act.description.toLowerCase().includes(q) ||
                    act.actionType.toLowerCase().includes(q)
                  );
                })
                .map((act) => {
                  return (
                    <div
                      key={act.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white font-black text-sm flex items-center justify-center uppercase shrink-0 shadow-xs">
                          {(act.studentName || 'L').charAt(0)}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-sm text-slate-900">{act.studentName || 'Learner'}</span>
                            {act.institute && (
                              <span className="text-[11px] text-slate-500 font-medium">({act.institute})</span>
                            )}
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                              act.actionType === 'REGISTER' || act.actionType === 'LOGIN' ? 'bg-emerald-100 text-emerald-800' :
                              act.actionType === 'BOSS_BATTLE' ? 'bg-purple-100 text-purple-800' :
                              act.actionType === 'CHALLENGE' ? 'bg-amber-100 text-amber-800' :
                              act.actionType === 'FAANG_MOCK_TEST' ? 'bg-rose-100 text-rose-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {act.actionType.replace('_', ' ')}
                            </span>
                            <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-slate-100 text-slate-600">
                              {act.category}
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{act.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{act.description}</p>

                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                            {act.score !== undefined && (
                              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Score: {act.score}%
                              </span>
                            )}
                            {act.xpEarned ? (
                              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                +{act.xpEarned} XP
                              </span>
                            ) : null}
                            {act.deviceSummary && (
                              <span className="text-slate-500 flex items-center gap-1 font-medium">
                                <Laptop className="w-3 h-3 text-slate-400" />
                                <span>{act.deviceSummary}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 self-end md:self-center flex flex-col items-end gap-1.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {act.timestamp ? new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Recent'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {act.timestamp ? new Date(act.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }) : ''}
                        </span>
                        {act.studentName && (
                          <button
                            onClick={() => {
                              const found = students.find(s => s.name.toLowerCase() === act.studentName?.toLowerCase());
                              if (found) setSelectedStudentForInspect(found);
                            }}
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline mt-1"
                          >
                            Inspect Candidate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADMIN BROADCAST & MOTIVATIONAL ALERT MODAL */}
      {/* ========================================================================= */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-display">
                    Broadcast Announcement
                  </h3>
                  <p className="text-xs text-slate-500">
                    Instantly push an alert or motivational message to all active learners across laptops and mobiles
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {broadcastSuccessNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{broadcastSuccessNotice}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Alert Title
                </label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. 🔥 Amazon Campus Drive Starts at 2 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Broadcast Message / Motivational Directive
                </label>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  rows={3}
                  placeholder="Write message to display as toast notification on all learner dashboards..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Tone & Priority
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'motivational', label: 'Motivational', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
                    { id: 'urgent', label: 'Urgent Notice', color: 'bg-rose-50 border-rose-200 text-rose-700' },
                    { id: 'info', label: 'Information', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                    { id: 'congrats', label: 'Celebration', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBroadcastType(t.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        broadcastType === t.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : t.color
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSendingBroadcast || !broadcastMessage.trim()}
                onClick={async () => {
                  setIsSendingBroadcast(true);
                  const ok = await sendAdminBroadcast(broadcastTitle, broadcastMessage, broadcastType);
                  setIsSendingBroadcast(false);
                  if (ok) {
                    playNotificationChime();
                    fireCelebrationConfetti();
                    setBroadcastSuccessNotice('Broadcast successfully transmitted to all active student screens!');
                    setTimeout(() => {
                      setBroadcastSuccessNotice(null);
                      setIsBroadcastModalOpen(false);
                    }, 2200);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSendingBroadcast ? 'Broadcasting...' : 'Broadcast to All Learners'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REISSUE BADGES */}
      {/* ========================================================================= */}
      {adminTab === 'badges' && (
        <div className="space-y-6">
          
          {/* Top selection bar */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Select Candidate to Manage Badges
              </label>
              <select
                value={selectedStudentForBadge}
                onChange={(e) => setSelectedStudentForBadge(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {students.map(s => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.institute} - {s.department}) • {s.badgesEarned.length} Badges
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleBatchReissueMilestones}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Crown className="w-4 h-4" />
                <span>Reissue All 5 Milestone Badges</span>
              </button>
            </div>
          </div>

          {badgeSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{badgeSuccessMessage}</span>
            </div>
          )}

          {/* Badges category filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Milestone', 'Aptitude', 'Reasoning', 'Verbal', 'Communication', 'Placement', 'Streak'].map(cat => (
              <button
                key={cat}
                onClick={() => setBadgeCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  badgeCategoryFilter === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat} Badges
              </button>
            ))}
          </div>

          {/* Badges grid with Reissue action */}
          {(() => {
            const currentStudentObj = students.find(s => s.name.toLowerCase() === selectedStudentForBadge.toLowerCase()) || students[0];
            const filteredBadges = ALL_BADGES.filter(b => badgeCategoryFilter === 'All' || b.category === badgeCategoryFilter);

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBadges.map((badge) => {
                  const isEarned = currentStudentObj?.badgesEarned.includes(badge.id);

                  return (
                    <div
                      key={badge.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                        isEarned
                          ? 'bg-white border-emerald-300 ring-1 ring-emerald-200 shadow-xs'
                          : 'bg-slate-50 border-slate-200 opacity-90'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-3xl">{badge.icon}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            isEarned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isEarned ? 'Awarded' : 'Not Earned'}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm mt-2">{badge.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{badge.description}</p>
                        <p className="text-[11px] font-bold text-indigo-600 mt-2">+{badge.xpBonus} XP Bonus</p>
                      </div>

                      {/* Reissue / Revoke actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleReissueBadge(badge.id)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                            isEarned
                              ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{isEarned ? 'Reissue Badge' : 'Grant Badge'}</span>
                        </button>

                        {isEarned && (
                          <button
                            onClick={() => handleRevokeBadge(badge.id)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 transition-colors"
                            title="Revoke Badge"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CERTIFICATES HUB */}
      {/* ========================================================================= */}
      {adminTab === 'certificates' && (
        <div className="space-y-6">
          
          {/* Certificate Issuing Action Panel */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 font-display flex items-center gap-2">
              <Scroll className="w-5 h-5 text-indigo-600" />
              <span>Issue / Reissue Placement Certificate</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Candidate</label>
                <select
                  value={selectedStudentForCert}
                  onChange={(e) => setSelectedStudentForCert(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {students.map(s => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.institute})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Certificate Track</label>
                <select
                  value={certTypeToIssue}
                  onChange={(e) => setCertTypeToIssue(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="ultimate">🏆 Ultimate Placement Readiness (Gold Tier)</option>
                  <option value="quantitative">📐 Quantitative & Logical Problem Solving Specialist</option>
                  <option value="verbal">🗣️ Verbal & Corporate Communication Excellence</option>
                  <option value="corporate">💼 ATS Resume & Technical Interview Endorsement</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleIssueCertificate}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Scroll className="w-4 h-4" />
                  <span>Issue & Endorse Certificate</span>
                </button>
              </div>
            </div>
          </div>

          {certSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{certSuccessMessage}</span>
            </div>
          )}

          {/* Issued Certificates Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                Active Placement Certificates Registry ({certificates.length})
              </h4>
              <span className="text-xs text-slate-500">Cryptographically verifiable credentials</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Certificate Title</th>
                    <th className="py-3.5 px-4">Verification Code</th>
                    <th className="py-3.5 px-4">Issued On</th>
                    <th className="py-3.5 px-4">Score & Grade</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{cert.studentName}</p>
                        <p className="text-[11px] text-slate-400">{cert.institute}</p>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate font-semibold text-indigo-900">
                        {cert.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {cert.verificationCode}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {cert.issueDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-emerald-700">{cert.readinessScore}%</span>
                        <span className="text-[10px] text-slate-400 block">{cert.grade}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cert.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          cert.status === 'Reissued' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setCertPreviewModal(cert)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px]"
                        >
                          Preview
                        </button>
                        {cert.status !== 'Revoked' && (
                          <button
                            onClick={() => handleRevokeCertificate(cert.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-[11px]"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificate High-Res Preview Modal */}
          {certPreviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-slate-900 text-sm">Official PlacementVerse Credential</span>
                  </div>
                  <button
                    onClick={() => setCertPreviewModal(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                  >
                    ✕
                  </button>
                </div>

                {/* Printable Certificate Frame */}
                <div className="p-8 sm:p-12 rounded-3xl border-8 border-amber-100 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 text-center space-y-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <QrCode className="w-16 h-16 text-slate-800 opacity-80" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold tracking-widest uppercase text-amber-700">PlacementVerse AI • Government & Corporate Endorsed</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                      Certificate of Placement Excellence
                    </h2>
                    <p className="text-xs text-slate-500">This is to certify that</p>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-indigo-900 font-display tracking-tight">
                      {certPreviewModal.studentName}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 mt-1">
                      {certPreviewModal.institute}
                    </p>
                  </div>

                  <div className="max-w-lg mx-auto text-xs text-slate-600 leading-relaxed">
                    has successfully cleared national placement readiness benchmarks for{' '}
                    <strong className="text-slate-900 font-bold">{certPreviewModal.title}</strong>{' '}
                    with a verified readiness score of{' '}
                    <span className="text-emerald-700 font-black">{certPreviewModal.readinessScore}% ({certPreviewModal.grade})</span>.
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-left text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Verification Hash</p>
                      <p className="font-mono font-bold text-slate-800">{certPreviewModal.verificationCode}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Issued: {certPreviewModal.issueDate}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Director Endorsement</p>
                      <p className="font-bold text-indigo-900 font-display text-sm">{certPreviewModal.endorsedBy}</p>
                      <p className="text-[10px] text-emerald-600 font-bold">✓ Cryptographically Signed</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Certificate</span>
                  </button>
                  <button
                    onClick={() => setCertPreviewModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ADD NEW LESSONS (CURRICULUM STUDIO) */}
      {/* ========================================================================= */}
      {adminTab === 'lessons' && (
        <div className="space-y-6">
          
          {lessonSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{lessonSuccessMessage}</span>
            </div>
          )}

          {/* Add Lesson Form */}
          <form onSubmit={handleCreateLesson} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Create & Publish New Lesson
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish lessons directly into the interactive 4-step Learning Path (Formulas, Practice MCQs, Timed Challenge Arena, MNC Boss Battle).
                </p>
              </div>

              <button
                type="button"
                onClick={handleAutoFillSampleMCQs}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Auto generate 3 placement MCQs for this lesson"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Fill Sample MCQs</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Training Module</label>
                <select
                  value={targetModuleId}
                  onChange={(e) => setTargetModuleId(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {modules.map(m => (
                    <option key={m.id} value={m.id}>
                      Module {m.id}: {m.title} ({m.topics.length} Lessons)
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Lesson / Topic Title</label>
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g. Probability & Combinatorics, System Design Basics, Blood Relations"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Lesson Summary & Overview</label>
              <textarea
                value={lessonSummary}
                onChange={(e) => setLessonSummary(e.target.value)}
                placeholder="High-yield recruitment overview, key intuition, and common corporate interview pitfalls..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Key Formulas / Rules */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Cheat Sheet & Key Formulas (Step 1 Tab)
                </label>
                <button
                  type="button"
                  onClick={handleAddFormulaRow}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Formula Card</span>
                </button>
              </div>

              {formulas.map((f, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="text"
                    placeholder="Formula Name (e.g. P(A∪B))"
                    value={f.name}
                    onChange={(e) => {
                      const copy = [...formulas];
                      copy[idx].name = e.target.value;
                      setFormulas(copy);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Formula / Rule (e.g. P(A) + P(B) - P(A∩B))"
                    value={f.formula}
                    onChange={(e) => {
                      const copy = [...formulas];
                      copy[idx].formula = e.target.value;
                      setFormulas(copy);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Director Note / Pro-Tip"
                    value={f.note}
                    onChange={(e) => {
                      const copy = [...formulas];
                      copy[idx].note = e.target.value;
                      setFormulas(copy);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Worked Example */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Worked Example Problem
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <textarea
                  placeholder="Problem Statement (e.g. TCS recruitment mock question...)"
                  value={workedExample.problem}
                  onChange={(e) => setWorkedExample({ ...workedExample, problem: e.target.value })}
                  rows={2}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
                <textarea
                  placeholder="Step-by-Step Solution"
                  value={workedExample.solution}
                  onChange={(e) => setWorkedExample({ ...workedExample, solution: e.target.value })}
                  rows={2}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
                <textarea
                  placeholder="Speed Trick / 30-Second Shortcut"
                  value={workedExample.tip}
                  onChange={(e) => setWorkedExample({ ...workedExample, tip: e.target.value })}
                  rows={2}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>

            {/* Questions Bank */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  MCQ Assessment Bank ({customQuestions.length} Questions)
                </label>
                <button
                  type="button"
                  onClick={() => setCustomQuestions([
                    ...customQuestions,
                    {
                      question: '',
                      options: ['', '', '', ''],
                      correctIndex: 0,
                      difficulty: 'Easy',
                      explanation: '',
                      companyTag: 'TCS NQT'
                    }
                  ])}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              {customQuestions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-indigo-700">Question #{qIdx + 1}</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={q.difficulty}
                        onChange={(e) => {
                          const copy = [...customQuestions];
                          copy[qIdx].difficulty = e.target.value as any;
                          setCustomQuestions(copy);
                        }}
                        className="px-2 py-1 rounded-lg border border-slate-300 text-[11px] font-bold bg-white"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Company Tag (e.g. Amazon)"
                        value={q.companyTag}
                        onChange={(e) => {
                          const copy = [...customQuestions];
                          copy[qIdx].companyTag = e.target.value;
                          setCustomQuestions(copy);
                        }}
                        className="px-2 py-1 rounded-lg border border-slate-300 text-[11px] bg-white font-semibold w-28"
                      />

                      {customQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setCustomQuestions(customQuestions.filter((_, idx) => idx !== qIdx))}
                          className="p-1 rounded text-rose-500 hover:bg-rose-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter MCQ Problem Question..."
                    value={q.question}
                    onChange={(e) => {
                      const copy = [...customQuestions];
                      copy[qIdx].question = e.target.value;
                      setCustomQuestions(copy);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  />

                  {/* 4 Options */}
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name={`correct-${qIdx}`}
                          checked={q.correctIndex === optIdx}
                          onChange={() => {
                            const copy = [...customQuestions];
                            copy[qIdx].correctIndex = optIdx;
                            setCustomQuestions(copy);
                          }}
                          className="w-4 h-4 text-indigo-600"
                          title="Select as correct answer"
                        />
                        <input
                          type="text"
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          value={opt}
                          onChange={(e) => {
                            const copy = [...customQuestions];
                            copy[qIdx].options[optIdx] = e.target.value;
                            setCustomQuestions(copy);
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Explanation & Vedic shortcut for solution..."
                    value={q.explanation}
                    onChange={(e) => {
                      const copy = [...customQuestions];
                      copy[qIdx].explanation = e.target.value;
                      setCustomQuestions(copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!lessonTitle.trim()}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Publish Lesson to Learning Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Existing Curriculum List */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">
              Currently Active Curriculum Topics ({modules.reduce((acc, m) => acc + m.topics.length, 0)})
            </h4>

            <div className="space-y-3">
              {modules.map(mod => (
                <div key={mod.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 text-xs">
                      Module {mod.id}: {mod.title}
                    </h5>
                    <span className="text-[11px] text-slate-500 font-semibold">{mod.topics.length} Lessons</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {mod.topics.map(topic => (
                      <div key={topic.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div className="truncate pr-2">
                          <p className="font-bold text-slate-800 truncate">{topic.name}</p>
                          <p className="text-[10px] text-slate-400">
                            {topic.practiceQuestions.length} Practice • {topic.challengeQuestions.length} Arena
                          </p>
                        </div>
                        {mod.topics.length > 1 && (
                          <button
                            onClick={() => handleDeleteLesson(mod.id, topic.id, topic.name)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600"
                            title="Delete Lesson"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ADD / MODIFY USER PROFILES */}
      {/* ========================================================================= */}
      {adminTab === 'profiles' && (
        <div className="space-y-6">
          
          {userSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{userSuccessMessage}</span>
            </div>
          )}

          {/* Sub-Switch: Modify vs Add */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setProfileActionType('modify')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                profileActionType === 'modify'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1.5" />
              Modify Existing Student Profile
            </button>
            <button
              onClick={() => setProfileActionType('add')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                profileActionType === 'add'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 inline mr-1.5" />
              Enroll New Candidate Profile
            </button>
          </div>

          {/* MODIFY SECTION */}
          {profileActionType === 'modify' && (
            <form onSubmit={handleSaveModifiedProfile} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Select Candidate to Modify
                </label>
                <select
                  value={selectedStudentForEdit}
                  onChange={(e) => handleSelectStudentToEdit(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {students.map(s => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.institute} - {s.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">College / Institute</label>
                  <input
                    type="text"
                    value={editInstitute}
                    onChange={(e) => setEditInstitute(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Class Year</label>
                  <input
                    type="text"
                    value={editClassYear}
                    onChange={(e) => setEditClassYear(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Placement XP Points</label>
                  <input
                    type="number"
                    value={editXp}
                    onChange={(e) => setEditXp(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Daily Streak (Days)</label>
                  <input
                    type="number"
                    value={editStreak}
                    onChange={(e) => setEditStreak(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-amber-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Predicted Placement Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editPlacementScore}
                    onChange={(e) => setEditPlacementScore(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Quick Profile Booster Buttons */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Quick Administrative Adjustments</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditXp(prev => prev + 1000)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200"
                  >
                    +1,000 XP Booster
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditStreak(prev => prev + 5)}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs border border-amber-200"
                  >
                    +5 Days Streak
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPlacementScore(95)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200"
                  >
                    Set Top Tier (95%)
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                  >
                    Save Profile Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const studentObj = students.find(s => s.name.toLowerCase() === selectedStudentForEdit.toLowerCase());
                      if (studentObj) handleSwitchToStudent(studentObj);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Experience As This Candidate
                  </button>
                </div>

                {students.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteStudent(selectedStudentForEdit)}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200"
                  >
                    Delete Candidate Profile
                  </button>
                )}
              </div>
            </form>
          )}

          {/* ADD NEW USER SECTION */}
          {profileActionType === 'add' && (
            <form onSubmit={handleAddNewStudent} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 font-display">
                  Enroll New Student Candidate
                </h3>
                <p className="text-xs text-slate-500">
                  Adds candidate to the real-time student registry, leaderboard, and placement progress tracker.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Rahul Sen"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">College / Institute</label>
                  <input
                    type="text"
                    value={newInstitute}
                    onChange={(e) => setNewInstitute(e.target.value)}
                    placeholder="e.g. IIT Kharagpur, DTU, NIT Surathkal"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="e.g. Computer Science, Mechanical, ECE"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Class Year</label>
                  <input
                    type="text"
                    value={newClassYear}
                    onChange={(e) => setNewClassYear(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Initial XP</label>
                  <input
                    type="number"
                    value={newStartingXp}
                    onChange={(e) => setNewStartingXp(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Enroll Candidate</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}

    </div>
  );
};

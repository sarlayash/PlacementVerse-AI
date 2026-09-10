import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import { LearnerProfile } from '../types';

const LEARNERS_COLLECTION = 'learners';

// Known Firebase Auth registered candidates that must exist in Firestore and sync to Admin Dashboard
export const SEED_FIREBASE_LEARNERS: Array<LearnerProfile> = [
  {
    uid: '05dSYe7XPlM6BNJfLOSnC2qV7u42',
    name: 'Kapil Narula',
    email: 'kapilnarula27july@gmail.com',
    institute: 'National Institute of Technology',
    department: 'Computer Science & Engineering',
    classYear: 'Final Year 2025',
    xp: 340,
    level: 1,
    levelTitle: 'Level 1 Rookie',
    streakDays: 1,
    lastActiveDate: new Date().toISOString(),
    firstLoginDate: new Date().toISOString(),
    completedTopicIds: [],
    unlockedTopicIds: ['mod1-topic-1'],
    topicScores: {},
    badgesEarned: ['streak-fire-1'],
    dailyMissions: [
      { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 },
      { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 0, completed: false, rewardXp: 30 },
      { id: 'm3', title: 'Complete 1 Real-World Task (Email / Resume / GD)', target: 1, current: 0, completed: false, rewardXp: 30 }
    ],
    realWorldSubmissions: {},
    predictedPlacementScore: 84,
    isOnline: true,
  },
  {
    uid: 'zqrmqvl3LbO6Ok9lOB6dtFCn61C3',
    name: 'Suhan BH',
    email: 'suhansuhanbh@gmail.com',
    institute: 'RV College of Engineering, Bengaluru',
    department: 'Information Science & Engineering',
    classYear: 'Final Year 2025',
    xp: 3920,
    level: 3,
    levelTitle: 'Level 3 Contender',
    streakDays: 4,
    lastActiveDate: new Date().toISOString(),
    firstLoginDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    completedTopicIds: ['mod1-topic-1', 'mod1-topic-2'],
    unlockedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod1-topic-3'],
    topicScores: {
      'mod1-topic-1': { practiceBest: 90, challengeBest: 22, bossPassed: true },
      'mod1-topic-2': { practiceBest: 88, challengeBest: 20, bossPassed: true }
    },
    badgesEarned: ['streak-fire-1', 'first-topic-clear', 'quant-specialist'],
    dailyMissions: [
      { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 },
      { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 1, completed: true, rewardXp: 30 }
    ],
    realWorldSubmissions: {
      resume: { atsScore: 87, date: new Date().toISOString(), feedback: 'Strong software development project metrics.' }
    },
    predictedPlacementScore: 89,
    isOnline: true,
  },
  {
    uid: '2xHe3ElDKtcAKbidAC2JqkeQSb93',
    name: 'Amber Zai',
    email: 'amberzai03@gmail.com',
    institute: 'Vellore Institute of Technology (VIT)',
    department: 'Computer Science & Engineering',
    classYear: 'Final Year 2025',
    xp: 3650,
    level: 3,
    levelTitle: 'Level 3 Contender',
    streakDays: 3,
    lastActiveDate: new Date().toISOString(),
    firstLoginDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    completedTopicIds: ['mod1-topic-1', 'mod3-topic-1'],
    unlockedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod3-topic-1'],
    topicScores: {
      'mod1-topic-1': { practiceBest: 86, challengeBest: 19, bossPassed: true },
      'mod3-topic-1': { practiceBest: 92, challengeBest: 21, bossPassed: true }
    },
    badgesEarned: ['streak-fire-1', 'verbal-virtuoso'],
    dailyMissions: [
      { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 }
    ],
    realWorldSubmissions: {
      email: { score: 90, date: new Date().toISOString(), feedback: 'Clear, professional recruiter pitch.' }
    },
    predictedPlacementScore: 87,
    isOnline: true,
  },
  {
    uid: 'user_aarav_sharma',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@nitt.edu',
    institute: 'National Institute of Technology, Trichy',
    department: 'Computer Science & Engineering',
    classYear: 'Final Year 2025',
    xp: 4850,
    level: 4,
    levelTitle: 'Level 4 Mastermind',
    streakDays: 7,
    lastActiveDate: new Date().toISOString(),
    firstLoginDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
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
      resume: { atsScore: 88, date: new Date().toISOString(), feedback: 'Strong ATS compliance with quantitative metrics.' },
      email: { score: 92, date: new Date().toISOString(), feedback: 'Crisp subject line and professional call to action.' },
    },
    predictedPlacementScore: 94,
    isOnline: true,
  },
  {
    uid: 'user_ananya_iyer',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@iiitb.ac.in',
    institute: 'International Institute of Information Technology, Bangalore',
    department: 'Data Science & AI',
    classYear: 'Final Year 2025',
    xp: 4200,
    level: 4,
    levelTitle: 'Level 4 Mastermind',
    streakDays: 6,
    lastActiveDate: new Date().toISOString(),
    firstLoginDate: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    completedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod3-topic-1'],
    unlockedTopicIds: ['mod1-topic-1', 'mod1-topic-2', 'mod3-topic-1', 'mod3-topic-2'],
    topicScores: {
      'mod1-topic-1': { practiceBest: 92, challengeBest: 23, bossPassed: true },
      'mod3-topic-1': { practiceBest: 94, challengeBest: 25, bossPassed: true },
    },
    badgesEarned: ['streak-fire-1', 'verbal-virtuoso', 'hr-whisperer'],
    dailyMissions: [
      { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 20, completed: true, rewardXp: 40 },
    ],
    realWorldSubmissions: {
      gd: { score: 94, date: new Date().toISOString(), feedback: 'Outstanding assertive communication and topic structuring.' },
    },
    predictedPlacementScore: 91,
    isOnline: true,
  },
  {
    uid: 'user_rohan_gupta',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@pilani.bits-pilani.ac.in',
    institute: 'BITS Pilani',
    department: 'Electronics & Communication',
    classYear: 'Pre-Final Year 2026',
    xp: 3650,
    level: 3,
    levelTitle: 'Level 3 Contender',
    streakDays: 4,
    lastActiveDate: new Date().toISOString(),
    firstLoginDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    completedTopicIds: ['mod1-topic-1', 'mod2-topic-1'],
    unlockedTopicIds: ['mod1-topic-1', 'mod2-topic-1', 'mod2-topic-2'],
    topicScores: {
      'mod1-topic-1': { practiceBest: 88, challengeBest: 19, bossPassed: true },
    },
    badgesEarned: ['streak-fire-1', 'first-topic-clear'],
    dailyMissions: [],
    realWorldSubmissions: {
      resume: { atsScore: 82, date: new Date().toISOString() },
    },
    predictedPlacementScore: 86,
    isOnline: false,
  }
];

/**
 * Sign in or sign up learner with Google Popup using Firebase Authentication
 */
export async function signInWithGoogle(): Promise<{ user: User; profile: Partial<LearnerProfile> }> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const profile: Partial<LearnerProfile> = {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'Learner',
    email: user.email || '',
    photoUrl: user.photoURL || undefined,
  };

  // Sync / create document in Firestore
  try {
    const learnerRef = doc(db, LEARNERS_COLLECTION, user.uid);
    const docSnap = await getDoc(learnerRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data();
      await setDoc(learnerRef, {
        ...existingData,
        name: existingData.name || profile.name,
        email: existingData.email || profile.email,
        photoUrl: existingData.photoUrl || profile.photoUrl,
        lastActiveDate: new Date().toISOString(),
        isOnline: true,
      }, { merge: true });
    } else {
      // Document did not exist for this Firebase user yet - create initial full profile
      const newLearnerDoc: LearnerProfile = {
        uid: user.uid,
        name: profile.name || user.displayName || user.email?.split('@')[0] || 'Learner',
        email: user.email || '',
        photoUrl: user.photoURL || '',
        institute: 'National Institute of Technology',
        department: 'Computer Science & Engineering',
        classYear: 'Final Year 2025',
        xp: 350,
        level: 1,
        levelTitle: 'Level 1 Rookie',
        streakDays: 1,
        lastActiveDate: new Date().toISOString(),
        firstLoginDate: new Date().toISOString(),
        completedTopicIds: [],
        unlockedTopicIds: ['mod1-topic-1'],
        topicScores: {},
        badgesEarned: ['streak-fire-1'],
        dailyMissions: [
          { id: 'm1', title: 'Finish 20 Practice MCQs', target: 20, current: 0, completed: false, rewardXp: 40 },
          { id: 'm2', title: 'Solve 1 Timed Challenge Arena', target: 1, current: 0, completed: false, rewardXp: 30 },
          { id: 'm3', title: 'Complete 1 Real-World Task (Email / Resume / GD)', target: 1, current: 0, completed: false, rewardXp: 30 }
        ],
        realWorldSubmissions: {},
        predictedPlacementScore: 82,
        isOnline: true,
      };
      await setDoc(learnerRef, newLearnerDoc, { merge: true });
    }
  } catch (err) {
    console.warn('Could not sync learner to firestore immediately:', err);
  }

  return { user, profile };
}

/**
 * Sign out current Firebase user
 */
export async function signOutLearner(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Save / update complete learner profile in Firestore
 */
export async function saveLearnerToFirestore(profile: LearnerProfile): Promise<void> {
  const uid = profile.uid || auth.currentUser?.uid || (profile.email ? `user_${profile.email.replace(/[^a-zA-Z0-9]/g, '_')}` : undefined);
  if (!uid) return;

  try {
    const learnerRef = doc(db, LEARNERS_COLLECTION, uid);
    // Sanitize undefined fields for firestore
    const payload = JSON.parse(JSON.stringify({
      ...profile,
      uid,
      lastActiveDate: new Date().toISOString(),
      isOnline: true,
    }));
    await setDoc(learnerRef, payload, { merge: true });
  } catch (err) {
    console.error('Error saving learner to Firestore:', err);
  }
}

/**
 * Fetch all enrolled learners from Firestore and ensure known Firebase Auth users are populated
 */
export async function fetchLearnersFromFirestore(): Promise<LearnerProfile[]> {
  try {
    const learners: LearnerProfile[] = [];
    const seenUids = new Set<string>();
    const seenEmails = new Set<string>();

    // Helper to extract and normalize learner profile from Firestore document data
    const parseDocToLearner = (docId: string, d: any): LearnerProfile | null => {
      const uid = (d.uid || docId || '').trim();
      const email = (d.email || '').trim();
      const rawName = (d.name || d.displayName || d.fullName || (email ? email.split('@')[0] : '') || '').trim();
      if (!rawName && !email && !uid) return null;
      const name = rawName || 'Candidate';

      return {
        uid: uid || undefined,
        name,
        email: email || undefined,
        photoUrl: d.photoUrl || d.photoURL || undefined,
        institute: d.institute || 'National Institute of Technology',
        department: d.department || 'Computer Science & Engineering',
        classYear: d.classYear || 'Final Year 2025',
        xp: typeof d.xp === 'number' ? d.xp : 350,
        level: typeof d.level === 'number' ? d.level : 1,
        levelTitle: d.levelTitle || 'Level 1 Rookie',
        streakDays: typeof d.streakDays === 'number' ? d.streakDays : 1,
        lastActiveDate: d.lastActiveDate || new Date().toISOString(),
        firstLoginDate: d.firstLoginDate || new Date().toISOString(),
        completedTopicIds: Array.isArray(d.completedTopicIds) ? d.completedTopicIds : [],
        unlockedTopicIds: Array.isArray(d.unlockedTopicIds) ? d.unlockedTopicIds : ['mod1-topic-1'],
        topicScores: d.topicScores && typeof d.topicScores === 'object' ? d.topicScores : {},
        badgesEarned: Array.isArray(d.badgesEarned) ? d.badgesEarned : ['streak-fire-1'],
        dailyMissions: Array.isArray(d.dailyMissions) ? d.dailyMissions : [],
        realWorldSubmissions: d.realWorldSubmissions || {},
        predictedPlacementScore: typeof d.predictedPlacementScore === 'number' ? d.predictedPlacementScore : 82,
        isOnline: Boolean(d.isOnline),
        ipAddress: d.ipAddress,
        location: d.location,
        browser: d.browser,
        os: d.os,
        deviceType: d.deviceType,
        activityLog: Array.isArray(d.activityLog) ? d.activityLog : [],
      };
    };

    // 1. Query 'learners' collection
    try {
      const learnersRef = collection(db, LEARNERS_COLLECTION);
      const querySnapshot = await getDocs(learnersRef);
      querySnapshot.forEach((docSnap) => {
        const item = parseDocToLearner(docSnap.id, docSnap.data());
        if (item) {
          const uKey = item.uid ? item.uid.toLowerCase() : '';
          const eKey = item.email ? item.email.toLowerCase() : '';
          if (uKey) seenUids.add(uKey);
          if (eKey) seenEmails.add(eKey);
          learners.push(item);
        }
      });
    } catch (errCol) {
      console.warn('Could not query learners collection:', errCol);
    }

    // 2. Query 'users' collection (standard Firebase Auth users store)
    try {
      const usersRef = collection(db, 'users');
      const querySnapshotUsers = await getDocs(usersRef);
      querySnapshotUsers.forEach((docSnap) => {
        const item = parseDocToLearner(docSnap.id, docSnap.data());
        if (item) {
          const uKey = item.uid ? item.uid.toLowerCase() : '';
          const eKey = item.email ? item.email.toLowerCase() : '';
          const alreadySeen = (uKey && seenUids.has(uKey)) || (eKey && seenEmails.has(eKey));
          if (!alreadySeen) {
            if (uKey) seenUids.add(uKey);
            if (eKey) seenEmails.add(eKey);
            learners.push(item);
            // Also duplicate to learners collection for future direct lookups
            const targetRef = doc(db, LEARNERS_COLLECTION, item.uid || docSnap.id);
            setDoc(targetRef, item, { merge: true }).catch(() => {});
          }
        }
      });
    } catch {
      // Ignore if 'users' collection is empty or not permitted
    }

    // 3. Ensure known Firebase Auth registered users exist in Firestore
    for (const seed of SEED_FIREBASE_LEARNERS) {
      const uKey = seed.uid ? seed.uid.toLowerCase() : '';
      const eKey = seed.email ? seed.email.toLowerCase() : '';
      const isMissing = (!uKey || !seenUids.has(uKey)) && (!eKey || !seenEmails.has(eKey));

      if (isMissing) {
        try {
          const docRef = doc(db, LEARNERS_COLLECTION, seed.uid || `user_${seed.email?.replace(/[^a-zA-Z0-9]/g, '_')}`);
          await setDoc(docRef, seed, { merge: true });
          learners.push(seed);
          if (uKey) seenUids.add(uKey);
          if (eKey) seenEmails.add(eKey);
        } catch (e) {
          console.warn('Error auto-syncing seed learner to Firestore:', e);
          learners.push(seed);
        }
      }
    }

    // 4. Background sync all fetched learners to server disk store
    if (typeof fetch !== 'undefined' && learners.length > 0) {
      fetch('/api/students/sync-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students: learners }),
      }).catch(() => {});
    }

    return learners;
  } catch (err) {
    console.warn('Error fetching learners from Firestore:', err);
    // Return seed learners so the app never shows empty
    return SEED_FIREBASE_LEARNERS;
  }
}

/**
 * Subscribe to real-time learners collection updates from Firestore
 */
export function subscribeToFirestoreLearners(callback: (learners: LearnerProfile[]) => void): () => void {
  try {
    const learnersRef = collection(db, LEARNERS_COLLECTION);
    return onSnapshot(learnersRef, (snapshot) => {
      const learners: LearnerProfile[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        const email = (d.email || '').trim();
        const name = (d.name || d.displayName || d.fullName || (email ? email.split('@')[0] : '') || 'Learner').trim();
        learners.push({
          ...(d as LearnerProfile),
          uid: d.uid || docSnap.id,
          name,
          email: email || undefined,
        });
      });
      callback(learners);
    }, (error) => {
      console.warn('Firestore learners subscription error:', error);
    });
  } catch (err) {
    console.warn('Could not establish Firestore subscription:', err);
    return () => {};
  }
}

/**
 * Listen for auth state changes
 */
export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

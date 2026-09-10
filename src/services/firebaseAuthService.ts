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

  // Sync to Firestore
  try {
    const learnerRef = doc(db, LEARNERS_COLLECTION, user.uid);
    const docSnap = await getDoc(learnerRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data();
      // Update last active
      await setDoc(learnerRef, {
        ...existingData,
        name: existingData.name || profile.name,
        email: existingData.email || profile.email,
        photoUrl: existingData.photoUrl || profile.photoUrl,
        lastActiveDate: new Date().toISOString(),
        isOnline: true,
      }, { merge: true });
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
  if (!profile.uid && !auth.currentUser?.uid) return;
  const uid = profile.uid || auth.currentUser?.uid;
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
 * Fetch all enrolled learners from Firestore
 */
export async function fetchLearnersFromFirestore(): Promise<LearnerProfile[]> {
  try {
    const learnersRef = collection(db, LEARNERS_COLLECTION);
    const q = query(learnersRef);
    const querySnapshot = await getDocs(q);
    const learners: LearnerProfile[] = [];
    querySnapshot.forEach((docSnap) => {
      learners.push(docSnap.data() as LearnerProfile);
    });
    return learners;
  } catch (err) {
    console.warn('Error fetching learners from Firestore:', err);
    return [];
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
        learners.push(docSnap.data() as LearnerProfile);
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

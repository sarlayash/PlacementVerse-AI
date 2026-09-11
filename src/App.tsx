import React, { useState, useEffect } from 'react';
import { ShieldCheck, Megaphone } from 'lucide-react';
import { SidebarNav, NavTabType } from './components/SidebarNav';
import { TopHeader } from './components/TopHeader';
import { LearnerDashboardView } from './components/LearnerDashboardView';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LearningPathView } from './components/LearningPathView';
import { RealWorldTasksView } from './components/RealWorldTasksView';
import { AnalyticsView } from './components/AnalyticsView';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgesView } from './components/BadgesView';
import { CertificatesView } from './components/CertificatesView';
import { FaangMockTestsView } from './components/FaangMockTestsView';
import { FinalAssessmentView } from './components/FinalAssessmentView';
import { GrammarPartsOfSpeechView } from './components/GrammarPartsOfSpeechView';
import { TopicDetailModal } from './components/TopicDetailModal';
import { DailyMissionsModal } from './components/DailyMissionsModal';
import { CoachModal } from './components/CoachModal';
import { LandingPage } from './components/LandingPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardView } from './components/AdminDashboardView';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';

import { 
  getLearnerProfile, 
  saveLearnerProfile, 
  getModulesWithTopics, 
  saveUnlockedTopic,
  hasStartedJourney,
  setJourneyStarted,
  isAdminAuthenticated,
  logoutAdmin,
  fireCelebrationConfetti,
  notifyJourneyBegunToServer,
  sendLearnerHeartbeat,
  syncStudentToServer,
  logLearnerActivity,
  playNotificationChime,
  fetchRecentBroadcasts
} from './services/storageService';
import { LearnerProfile, Module, Topic } from './types';

export default function App() {
  const [profile, setProfile] = useState<LearnerProfile>(getLearnerProfile());
  const [modules, setModules] = useState<Module[]>(getModulesWithTopics());
  const [activeTab, setActiveTab] = useState<'learn' | 'grammar' | 'mock-tests' | 'final-assessment' | 'tasks' | 'analytics' | 'leaderboard' | 'badges' | 'certificates' | 'admin'>('learn');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [selectedMockTestId, setSelectedMockTestId] = useState<string | undefined>(undefined);

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Landing page state
  const [hasStarted, setHasStarted] = useState<boolean>(hasStartedJourney());
  const [showLandingPage, setShowLandingPage] = useState<boolean>(!hasStartedJourney());

  // Broadcast alert toast
  const [activeBroadcast, setActiveBroadcast] = useState<any | null>(null);

  // Global live credential verification modal (for QR scans & URL links)
  const [globalVerificationCode, setGlobalVerificationCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const verifyParam = searchParams.get('verify') || searchParams.get('code') || searchParams.get('cert');
      if (verifyParam) {
        setGlobalVerificationCode(verifyParam.trim());
      } else if (window.location.pathname.startsWith('/verify/')) {
        const pathCode = window.location.pathname.replace('/verify/', '').trim();
        if (pathCode) {
          setGlobalVerificationCode(decodeURIComponent(pathCode));
        }
      }
    } catch {}
  }, []);

  // Modals state
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isMissionsModalOpen, setIsMissionsModalOpen] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [coachInitialQuery, setCoachInitialQuery] = useState<string | undefined>(undefined);

  // Synchronize learner to server and maintain heartbeat
  useEffect(() => {
    if (profile.name && profile.name.trim()) {
      syncStudentToServer(profile);
      sendLearnerHeartbeat(profile.name);
    }

    // Keep online status active every 25 seconds
    const heartbeatTimer = setInterval(() => {
      if (profile.name && profile.name.trim()) {
        sendLearnerHeartbeat(profile.name);
      }
    }, 25000);

    // SSE connection for immediate broadcasts & events
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/students/stream');
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'BROADCAST_ALERT' && data.payload) {
            setActiveBroadcast(data.payload);
            playNotificationChime();
          }
        } catch {}
      };
    } catch {}

    // Polling fallback every 12 seconds
    const broadcastPoll = setInterval(async () => {
      const recent = await fetchRecentBroadcasts();
      if (recent && recent.length > 0) {
        const latest = recent[0];
        if (Date.now() - latest.timestamp < 20000) {
          setActiveBroadcast((prev: any) => (prev?.id === latest.id ? prev : latest));
        }
      }
    }, 12000);

    return () => {
      clearInterval(heartbeatTimer);
      clearInterval(broadcastPoll);
      if (eventSource) eventSource.close();
    };
  }, [profile.name]);

  // Auto-dismiss broadcast alert after 9 seconds
  useEffect(() => {
    if (activeBroadcast) {
      const timer = setTimeout(() => {
        setActiveBroadcast(null);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [activeBroadcast]);

  // Sync profile updates to storage
  const handleUpdateProfile = (updated: LearnerProfile) => {
    setProfile(updated);
    saveLearnerProfile(updated);
  };

  const handleStartJourney = (
    name: string, 
    institute: string, 
    department: string, 
    targetCompany: string,
    googleData?: { uid?: string; email?: string; photoUrl?: string }
  ) => {
    const updated: LearnerProfile = {
      ...profile,
      name: name.trim(),
      institute: institute.trim() || profile.institute,
      department: department.trim() || profile.department,
      ...(googleData?.uid ? { uid: googleData.uid } : {}),
      ...(googleData?.email ? { email: googleData.email } : {}),
      ...(googleData?.photoUrl ? { photoUrl: googleData.photoUrl } : {}),
    };
    handleUpdateProfile(updated);
    setJourneyStarted(true);
    setHasStarted(true);
    setShowLandingPage(false);
    setActiveTab('learn');

    // Notify server of new student across devices
    notifyJourneyBegunToServer(updated, `Candidate started placement preparation from ${institute || 'College'}`);
    logLearnerActivity(
      'REGISTER',
      'Joined Placement Prep Track',
      `Registered as ${department || 'Engineering'} student from ${institute || 'Engineering College'}`,
      'System',
      undefined,
      100
    );
  };

  const handleOpenAdminPortal = () => {
    if (isAdminAuthenticated()) {
      setIsAdmin(true);
      setActiveTab('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminLoginOpen(false);
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setActiveTab('learn');
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsTopicModalOpen(true);
  };

  const handleUnlockNextTopic = (currentTopicId: string) => {
    // Find next topic in sequence
    const allTopics = modules.flatMap(m => m.topics);
    const currentIndex = allTopics.findIndex(t => t.id === currentTopicId);
    if (currentIndex >= 0 && currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      const updated = saveUnlockedTopic(nextTopic.id);
      setProfile(updated);
    }
  };

  const handleContinueJourney = () => {
    // Open the first unlocked but incomplete topic, or first topic
    const allTopics = modules.flatMap(m => m.topics);
    const nextTopic = allTopics.find(t => profile.unlockedTopicIds.includes(t.id) && !profile.completedTopicIds.includes(t.id)) 
      || allTopics[0];
    handleSelectTopic(nextTopic);
  };

  const handleOpenCoachWithQuery = (query: string) => {
    setCoachInitialQuery(query);
    setIsCoachModalOpen(true);
  };

  // If user is on the Landing Page, display full landing experience
  if (showLandingPage) {
    return (
      <>
        <LandingPage
          profile={profile}
          onStartJourney={handleStartJourney}
          onContinueExisting={hasStarted ? () => setShowLandingPage(false) : undefined}
          hasStartedBefore={hasStarted}
        />
        {globalVerificationCode && (
          <CertificateVerificationModal
            isOpen={Boolean(globalVerificationCode)}
            initialCode={globalVerificationCode}
            onClose={() => setGlobalVerificationCode(null)}
            onViewInCertificatesTab={() => {
              setGlobalVerificationCode(null);
              setShowLandingPage(false);
              setActiveTab('certificates');
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* 1. Left Sidebar Navigation */}
      <SidebarNav
        profile={profile}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'mock-tests') {
            setSelectedMockTestId(undefined);
          }
        }}
        onOpenMissions={() => setIsMissionsModalOpen(true)}
        onOpenCoach={() => {
          setCoachInitialQuery(undefined);
          setIsCoachModalOpen(true);
        }}
        onOpenAdmin={handleOpenAdminPortal}
        isAdmin={isAdmin}
        onGoToLanding={() => setShowLandingPage(true)}
        isMobileOpen={isMobileNavOpen}
        setIsMobileOpen={setIsMobileNavOpen}
      />

      {/* 2. Right-Hand Page Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-72 lg:pl-80 transition-all duration-300">
        
        {/* Top Header */}
        <TopHeader
          profile={profile}
          activeTab={activeTab}
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onOpenCoach={() => {
            setCoachInitialQuery(undefined);
            setIsCoachModalOpen(true);
          }}
          onOpenMissions={() => setIsMissionsModalOpen(true)}
          onOpenAdmin={handleOpenAdminPortal}
          isAdmin={isAdmin}
          onGoToLanding={() => setShowLandingPage(true)}
        />

        {/* Real-time Broadcast / Motivational Alert Toast */}
        {activeBroadcast && (
          <div id="admin-broadcast-toast" className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-300">
            <div className={`p-4 rounded-2xl border shadow-xl flex items-start gap-3 backdrop-blur-md ${
              activeBroadcast.type === 'urgent'
                ? 'bg-rose-50/95 border-rose-300 text-rose-950 shadow-rose-100'
                : activeBroadcast.type === 'congrats'
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950 shadow-emerald-100'
                : 'bg-amber-50/95 border-amber-300 text-amber-950 shadow-amber-100'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                activeBroadcast.type === 'urgent'
                  ? 'bg-rose-600 text-white'
                  : activeBroadcast.type === 'congrats'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 text-white'
              }`}>
                <Megaphone className="w-5 h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded ${
                    activeBroadcast.type === 'urgent'
                      ? 'bg-rose-200 text-rose-900'
                      : activeBroadcast.type === 'congrats'
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-amber-200 text-amber-900'
                  }`}>
                    {activeBroadcast.type === 'urgent' ? '🚨 Urgent Announcement' : activeBroadcast.type === 'congrats' ? '🎉 Milestone Alert' : '📢 Director Broadcast'}
                  </span>
                  <button
                    id="close-broadcast-toast-btn"
                    onClick={() => setActiveBroadcast(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs p-1"
                  >
                    ✕
                  </button>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mt-1">{activeBroadcast.title}</h4>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{activeBroadcast.message}</p>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                  <span>From: {activeBroadcast.sender || 'Placement Director'}</span>
                  <span>Live Alert</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          
          {/* Tab 1: Learner Dashboard (Home Page with Domain Chooser, Notes & Mocks) */}
          {activeTab === 'learn' && (
            <LearnerDashboardView
              profile={profile}
              modules={modules}
              onSelectTopic={handleSelectTopic}
              onContinueJourney={handleContinueJourney}
              onOpenMissions={() => setIsMissionsModalOpen(true)}
              onOpenCoach={() => {
                setCoachInitialQuery(undefined);
                setIsCoachModalOpen(true);
              }}
              onOpenMockTests={(testId) => {
                setSelectedMockTestId(testId);
                setActiveTab('mock-tests');
              }}
              onOpenFinalAssessment={() => setActiveTab('final-assessment')}
              onOpenGrammar={() => setActiveTab('grammar')}
            />
          )}

          {/* Tab: Grammar - The 8 Parts of Speech Mastery */}
          {activeTab === 'grammar' && (
            <GrammarPartsOfSpeechView
              onBackToLearn={() => setActiveTab('learn')}
            />
          )}

          {/* Tab: FAANG & Domain Mock Tests */}
          {activeTab === 'mock-tests' && (
            <FaangMockTestsView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onViewCertificates={() => setActiveTab('certificates')}
              onViewBadges={() => setActiveTab('badges')}
              initialTestId={selectedMockTestId}
            />
          )}

        {/* Tab: The Grand Final Assessment (Very Hard 250 Questions / 90 Minutes) */}
        {activeTab === 'final-assessment' && (
          <FinalAssessmentView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onViewCertificates={() => setActiveTab('certificates')}
          />
        )}

        {/* Tab 2: Real World Tasks */}
        {activeTab === 'tasks' && (
          <RealWorldTasksView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {/* Tab 3: Analytics & Predicted Score */}
        {activeTab === 'analytics' && (
          <AnalyticsView
            profile={profile}
            modules={modules}
            onOpenCoachWithQuery={handleOpenCoachWithQuery}
          />
        )}

        {/* Tab 4: National Leaderboard */}
        {activeTab === 'leaderboard' && (
          <LeaderboardView
            profile={profile}
          />
        )}

        {/* Tab 5: 23 Metallic Badges */}
        {activeTab === 'badges' && (
          <BadgesView
            profile={profile}
          />
        )}

        {/* Tab 6: Official Certificates */}
        {activeTab === 'certificates' && (
          <CertificatesView
            profile={profile}
            modules={modules}
            onSelectMockTests={() => setActiveTab('mock-tests')}
            onSelectFinalAssessment={() => setActiveTab('final-assessment')}
          />
        )}

        {/* Tab 7: Admin Console */}
        {activeTab === 'admin' && (
          isAdmin ? (
            <AdminDashboardView
              currentProfile={profile}
              modules={modules}
              onUpdateModules={setModules}
              onUpdateCurrentProfile={handleUpdateProfile}
              onExitAdmin={() => setActiveTab('learn')}
              onLogoutAdmin={handleAdminLogout}
            />
          ) : (
            <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 max-w-lg mx-auto my-12">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display">Administrator Access Required</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You must authenticate with authorized director credentials to inspect real-time candidate progress, reissue badges, manage certificates, and author curriculum.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Authenticate Administrator
                </button>
              </div>
            </div>
          )
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-left">
            <p className="font-bold text-slate-800">
              CLASSROOMS TO BOARDROOMS WITH KAPIL
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Powered By SarlaYash Mission • SarlaYash Learning Solutions LLP
            </p>
          </div>
          <p className="text-[11px] text-slate-600 sm:text-right">
            Technology is the engine. Learning is the mission. Careers are the outcome.
          </p>
        </div>
      </footer>
      </div>

      {/* Topic Detail 4-Step Modal */}
      {isTopicModalOpen && selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          isOpen={isTopicModalOpen}
          onClose={() => {
            setIsTopicModalOpen(false);
            setSelectedTopic(null);
          }}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onUnlockNextTopic={handleUnlockNextTopic}
          onOpenCoachWithContext={handleOpenCoachWithQuery}
        />
      )}

      {/* Daily Missions & Streak Modal */}
      {isMissionsModalOpen && (
        <DailyMissionsModal
          isOpen={isMissionsModalOpen}
          onClose={() => setIsMissionsModalOpen(false)}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {/* Kapil AI Coach Modal */}
      {isCoachModalOpen && (
        <CoachModal
          isOpen={isCoachModalOpen}
          onClose={() => {
            setIsCoachModalOpen(false);
            setCoachInitialQuery(undefined);
          }}
          profile={profile}
          initialQuery={coachInitialQuery}
        />
      )}

      {/* Administrator Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Global Live Certificate Verification Modal */}
      {globalVerificationCode && (
        <CertificateVerificationModal
          isOpen={Boolean(globalVerificationCode)}
          initialCode={globalVerificationCode}
          onClose={() => setGlobalVerificationCode(null)}
          onViewInCertificatesTab={() => {
            setGlobalVerificationCode(null);
            setActiveTab('certificates');
          }}
        />
      )}

    </div>
  );
}

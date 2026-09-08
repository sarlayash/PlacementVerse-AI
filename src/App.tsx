import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LearningPathView } from './components/LearningPathView';
import { RealWorldTasksView } from './components/RealWorldTasksView';
import { AnalyticsView } from './components/AnalyticsView';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgesView } from './components/BadgesView';
import { CertificatesView } from './components/CertificatesView';
import { TopicDetailModal } from './components/TopicDetailModal';
import { DailyMissionsModal } from './components/DailyMissionsModal';
import { CoachModal } from './components/CoachModal';
import { LandingPage } from './components/LandingPage';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardView } from './components/AdminDashboardView';

import { 
  getLearnerProfile, 
  saveLearnerProfile, 
  getModulesWithTopics, 
  saveUnlockedTopic,
  hasStartedJourney,
  setJourneyStarted,
  isAdminAuthenticated,
  logoutAdmin,
  fireCelebrationConfetti 
} from './services/storageService';
import { LearnerProfile, Module, Topic } from './types';

export default function App() {
  const [profile, setProfile] = useState<LearnerProfile>(getLearnerProfile());
  const [modules, setModules] = useState<Module[]>(getModulesWithTopics());
  const [activeTab, setActiveTab] = useState<'learn' | 'tasks' | 'analytics' | 'leaderboard' | 'badges' | 'certificates' | 'admin'>('learn');

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Landing page state
  const [hasStarted, setHasStarted] = useState<boolean>(hasStartedJourney());
  const [showLandingPage, setShowLandingPage] = useState<boolean>(!hasStartedJourney());

  // Modals state
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isMissionsModalOpen, setIsMissionsModalOpen] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [coachInitialQuery, setCoachInitialQuery] = useState<string | undefined>(undefined);

  // Sync profile updates to storage
  const handleUpdateProfile = (updated: LearnerProfile) => {
    setProfile(updated);
    saveLearnerProfile(updated);
  };

  const handleStartJourney = (name: string, institute: string, department: string, targetCompany: string) => {
    const updated: LearnerProfile = {
      ...profile,
      name: name.trim(),
      institute: institute.trim() || profile.institute,
      department: department.trim() || profile.department,
    };
    handleUpdateProfile(updated);
    setJourneyStarted(true);
    setHasStarted(true);
    setShowLandingPage(false);
    setActiveTab('learn');
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
      <LandingPage
        profile={profile}
        onStartJourney={handleStartJourney}
        onContinueExisting={hasStarted ? () => setShowLandingPage(false) : undefined}
        hasStartedBefore={hasStarted}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMissions={() => setIsMissionsModalOpen(true)}
        onOpenCoach={() => {
          setCoachInitialQuery(undefined);
          setIsCoachModalOpen(true);
        }}
        onOpenAdmin={handleOpenAdminPortal}
        isAdmin={isAdmin}
        onGoToLanding={() => setShowLandingPage(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Hero Banner displayed on primary Learning View */}
        {activeTab === 'learn' && (
          <HeroBanner
            profile={profile}
            modules={modules}
            onContinueJourney={handleContinueJourney}
            onOpenMissions={() => setIsMissionsModalOpen(true)}
            onOpenCoach={() => {
              setCoachInitialQuery(undefined);
              setIsCoachModalOpen(true);
            }}
          />
        )}

        {/* Tab 1: Learning Path View */}
        {activeTab === 'learn' && (
          <LearningPathView
            modules={modules}
            profile={profile}
            onSelectTopic={handleSelectTopic}
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
          <p className="font-semibold text-slate-700">
            PlacementVerse AI • Powered by Kapil Narula
          </p>
          <p>
            India's Ultimate Placement Readiness Challenge • 24/7 AI-Guided Practice
          </p>
        </div>
      </footer>

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

    </div>
  );
}

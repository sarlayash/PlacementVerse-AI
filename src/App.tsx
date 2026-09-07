import React, { useState, useEffect } from 'react';
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

import { 
  getLearnerProfile, 
  saveLearnerProfile, 
  getModulesWithTopics, 
  saveUnlockedTopic,
  fireCelebrationConfetti 
} from './services/storageService';
import { LearnerProfile, Module, Topic } from './types';

export default function App() {
  const [profile, setProfile] = useState<LearnerProfile>(getLearnerProfile());
  const [modules, setModules] = useState<Module[]>(getModulesWithTopics());
  const [activeTab, setActiveTab] = useState<'learn' | 'tasks' | 'analytics' | 'leaderboard' | 'badges' | 'certificates'>('learn');

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
      <TopicDetailModal
        topic={selectedTopic}
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onUnlockNextTopic={handleUnlockNextTopic}
        onOpenCoachWithContext={handleOpenCoachWithQuery}
      />

      {/* Daily Missions & Streak Modal */}
      <DailyMissionsModal
        isOpen={isMissionsModalOpen}
        onClose={() => setIsMissionsModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Kapil AI Coach Modal */}
      <CoachModal
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
        profile={profile}
        initialQuery={coachInitialQuery}
      />

    </div>
  );
}

import React from 'react';
import { 
  Menu, Flame, Sparkles, Target, Bot, ShieldCheck, 
  ExternalLink, Bell, Search, GraduationCap
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { NavTabType } from './SidebarNav';

interface TopHeaderProps {
  profile: LearnerProfile;
  activeTab: NavTabType;
  onToggleMobileNav: () => void;
  onOpenCoach: () => void;
  onOpenMissions: () => void;
  onOpenAdmin: () => void;
  isAdmin?: boolean;
  onGoToLanding?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  activeTab,
  onToggleMobileNav,
  onOpenCoach,
  onOpenMissions,
  onOpenAdmin,
  isAdmin = false,
  onGoToLanding,
}) => {
  const completedMissionsCount = profile.dailyMissions.filter(m => m.completed).length;

  const tabTitles: Record<NavTabType, { title: string; subtitle: string }> = {
    learn: { title: 'Learner Dashboard', subtitle: 'Select Domain • In-Depth Notes • High-Bar Assessments' },
    grammar: { title: 'Grammar (The 8 Parts of Speech)', subtitle: 'Verbal Aptitude & Professional Corporate Communication' },
    'mock-tests': { title: 'Domain & Tech Mock Assessments', subtitle: '14 Full-Length Simulation Tests with Cryptographic Certificates' },
    'final-assessment': { title: 'The Grand Final Assessment', subtitle: '250 Hard Questions • 90 Mins • All Domains & FAANG High-Bar' },
    tasks: { title: 'Real-World Tasks & Scenarios', subtitle: 'Industry Workplace Simulation & Practical Problem Solving' },
    analytics: { title: 'Placement Readiness Analytics', subtitle: 'AI Diagnostic Insights & Predicted Placement Index' },
    leaderboard: { title: 'National Candidate Leaderboard', subtitle: 'All-India Real-Time Merit Rankings' },
    badges: { title: 'Honors & Master Badges', subtitle: '29 Cryptographically Secured Domain Badges' },
    certificates: { title: 'Official Credentials & Certificates', subtitle: 'Instant Public QR-Code Cryptographic Verification' },
    admin: { title: 'Director & Admin Console', subtitle: 'Authoring, Candidate Auditing & Certificate Reissuance' },
  };

  const currentMeta = tabTitles[activeTab] || tabTitles.learn;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
      
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileNav}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden shrink-0 border border-slate-200"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-display truncate">
              {currentMeta.title}
            </h2>
            <span className="hidden lg:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              CLASSROOMS TO BOARDROOMS
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Quick Action Gamification Pills */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Streak Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{profile.streakDays}d Streak</span>
        </div>

        {/* XP Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{profile.xp.toLocaleString()} XP</span>
        </div>

        {/* Daily Missions Button */}
        <button
          onClick={onOpenMissions}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
        >
          <Target className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Missions:</span>
          <span>{completedMissionsCount}/3</span>
        </button>

        {/* AI Coach Button */}
        <button
          onClick={onOpenCoach}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Ask Coach</span>
        </button>

        {/* Admin Access / Status Button */}
        <button
          onClick={onOpenAdmin}
          className={`p-2 rounded-xl text-xs font-bold transition-all border ${
            isAdmin
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
          title={isAdmin ? 'Administrator Authenticated' : 'Director Portal Login'}
        >
          <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-emerald-600' : 'text-slate-500'}`} />
        </button>

        {/* Revisit Landing Page Button */}
        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 hidden sm:block"
            title="Switch Candidate Profile / Welcome Page"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}

      </div>

    </header>
  );
};

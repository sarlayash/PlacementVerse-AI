import React from 'react';
import { 
  BookOpen, Sparkles, Calendar, Zap, Briefcase, BarChart3, 
  Trophy, Award, Medal, ShieldCheck, Flame, Bot, 
  Target, ChevronRight, Menu, X, ExternalLink, GraduationCap
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { calculateLevel } from '../services/storageService';

export type NavTabType = 
  | 'learn' 
  | 'grammar' 
  | 'mock-tests' 
  | 'final-assessment' 
  | 'tasks' 
  | 'analytics' 
  | 'leaderboard' 
  | 'badges' 
  | 'certificates' 
  | 'admin';

interface SidebarNavProps {
  profile: LearnerProfile;
  activeTab: NavTabType;
  onSelectTab: (tab: NavTabType) => void;
  onOpenCoach: () => void;
  onOpenMissions: () => void;
  onOpenAdmin: () => void;
  isAdmin?: boolean;
  onGoToLanding?: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  profile,
  activeTab,
  onSelectTab,
  onOpenCoach,
  onOpenMissions,
  onOpenAdmin,
  isAdmin = false,
  onGoToLanding,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const completedMissionsCount = profile.dailyMissions.filter(m => m.completed).length;
  const levelInfo = calculateLevel(profile.xp);

  const navItems = [
    {
      id: 'learn' as NavTabType,
      label: 'Learner Dashboard',
      sublabel: 'Domains, Notes & Mocks',
      icon: BookOpen,
      badgeText: 'Active Hub',
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      id: 'grammar' as NavTabType,
      label: 'Grammar (8 Parts)',
      sublabel: 'Verbal & Speech Mastery',
      icon: Sparkles,
      badgeText: '80 MCQs',
      badgeColor: 'bg-indigo-600 text-white',
    },
    {
      id: 'mock-tests' as NavTabType,
      label: 'Domain & Tech Mocks',
      sublabel: '14 High-Bar Mock Tests',
      icon: Calendar,
      badgeText: '14 Mocks',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'final-assessment' as NavTabType,
      label: 'Final Assessment',
      sublabel: '250 Questions • 90 Mins',
      icon: Zap,
      badgeText: 'Boss Level',
      badgeColor: 'bg-rose-600 text-white',
      special: true,
    },
    {
      id: 'tasks' as NavTabType,
      label: 'Real-World Tasks',
      sublabel: 'Industry Simulations',
      icon: Briefcase,
    },
    {
      id: 'analytics' as NavTabType,
      label: 'Readiness Analytics',
      sublabel: 'Placement Probability',
      icon: BarChart3,
    },
    {
      id: 'leaderboard' as NavTabType,
      label: 'National Leaderboard',
      sublabel: 'All-India Rankers',
      icon: Trophy,
    },
    {
      id: 'badges' as NavTabType,
      label: 'Badges & Honors',
      sublabel: `${profile.badges.length}/29 Earned`,
      icon: Medal,
      badgeText: `${profile.badges.length}`,
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'certificates' as NavTabType,
      label: 'Official Certificates',
      sublabel: 'Verifiable Credentials',
      icon: Award,
    },
    {
      id: 'admin' as NavTabType,
      label: 'Director Console',
      sublabel: isAdmin ? 'Authorized' : 'Secured Access',
      icon: ShieldCheck,
      badgeText: isAdmin ? 'ADMIN' : 'LOCK',
      badgeColor: isAdmin ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300',
    },
  ];

  const handleNavClick = (tab: NavTabType) => {
    if (tab === 'admin') {
      onOpenAdmin();
    } else {
      onSelectTab(tab);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* Main Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 lg:w-80 bg-slate-950 text-white flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => {
                onSelectTab('learn');
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-sm tracking-tight text-white font-display leading-tight">
                  Classrooms To <span className="text-blue-400">Boardrooms</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mt-0.5">
                  With Kapil • SarlaYash
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-medium">Chief Ecosystem Architect</span>
            <span className="font-bold text-slate-300">Kapil Narula</span>
          </div>
        </div>

        {/* Quick Gamification Chips in Sidebar */}
        <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40 grid grid-cols-2 gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] uppercase font-bold text-slate-400">Streak</p>
              <p className="font-extrabold text-slate-200">{profile.streakDays} Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] uppercase font-bold text-slate-400">Total XP</p>
              <p className="font-extrabold text-emerald-300">{profile.xp.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 px-3 pt-1 pb-2">
            Learning & Assessment Hub
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all group ${
                  isActive
                    ? item.special
                      ? 'bg-gradient-to-r from-rose-600 via-rose-700 to-indigo-700 text-white shadow-lg shadow-rose-900/30 font-bold'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent hover:border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-900 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate leading-tight">
                      {item.label}
                    </p>
                    <p className={`text-[10px] truncate mt-0.5 ${
                      isActive ? 'text-blue-100/90' : 'text-slate-300 group-hover:text-slate-200'
                    }`}>
                      {item.sublabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badgeText && (
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}>
                      {item.badgeText}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-white translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: AI Coach & Candidate Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950 shrink-0 space-y-3">
          
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenMissions();
                setIsMobileOpen(false);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center gap-2 transition-all"
            >
              <Target className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase font-bold text-slate-300 truncate">Missions</p>
                <p className="text-[11px] font-bold text-slate-200">{completedMissionsCount}/3 Done</p>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenCoach();
                setIsMobileOpen(false);
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 hover:from-blue-900/60 hover:to-indigo-900/60 border border-blue-800/50 text-left flex items-center gap-2 transition-all"
            >
              <Bot className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase font-bold text-blue-300 truncate">Kapil AI</p>
                <p className="text-[11px] font-bold text-white">Ask Coach</p>
              </div>
            </button>
          </div>

          {/* Candidate Card */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-xs">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'L'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {profile.name || 'Placement Learner'}
                </p>
                <p className="text-[10px] text-slate-300 truncate">
                  {profile.institute || 'Engineering Institute'}
                </p>
              </div>
            </div>

            {onGoToLanding && (
              <button
                onClick={onGoToLanding}
                title="Change Candidate / Revisit Welcome Page"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </aside>
    </>
  );
};

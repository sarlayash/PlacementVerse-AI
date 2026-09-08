import React from 'react';
import { 
  Flame, Award, BookOpen, Briefcase, BarChart3, 
  Trophy, Bot, Sparkles, Target, Medal, ShieldCheck, LogOut
} from 'lucide-react';
import { LearnerProfile } from '../types';

interface NavbarProps {
  profile: LearnerProfile;
  activeTab: 'learn' | 'tasks' | 'analytics' | 'leaderboard' | 'badges' | 'certificates' | 'admin';
  onSelectTab: (tab: 'learn' | 'tasks' | 'analytics' | 'leaderboard' | 'badges' | 'certificates' | 'admin') => void;
  onOpenCoach: () => void;
  onOpenMissions: () => void;
  onOpenAdmin: () => void;
  isAdmin?: boolean;
  onGoToLanding?: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  onSelectTab,
  onOpenCoach,
  onOpenMissions,
  onOpenAdmin,
  isAdmin = false,
  onGoToLanding,
  onSignOut,
}) => {
  const completedMissionsCount = profile.dailyMissions.filter(m => m.completed).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSelectTab('learn')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-display">
                  PlacementVerse <span className="text-blue-600">AI</span>
                </span>
                <span className="hidden md:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Powered By Kapil
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Learn • Practice • Compete • Earn Badges • Get Placement Ready
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60">
            <button
              onClick={() => onSelectTab('learn')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'learn'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Learning Path
            </button>
            <button
              onClick={() => onSelectTab('tasks')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'tasks'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Real World Tasks
            </button>
            <button
              onClick={() => onSelectTab('analytics')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'analytics'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button
              onClick={() => onSelectTab('leaderboard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </button>
            <button
              onClick={() => onSelectTab('badges')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'badges'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Medal className="w-4 h-4 text-amber-500" />
              Badges
            </button>
            <button
              onClick={() => onSelectTab('certificates')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'certificates'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Award className="w-4 h-4 text-indigo-600" />
              Certificates
            </button>
          </nav>

          {/* User Gamification Stats & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streak Pill */}
            <div 
              title={`${profile.streakDays} Day Streak`}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-bold"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{profile.streakDays}d</span>
            </div>

            {/* XP Pill */}
            <div 
              title="Total Placement XP"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200/70 text-blue-800 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{profile.xp.toLocaleString()} XP</span>
            </div>

            {/* Daily Missions Trigger */}
            <button
              onClick={onOpenMissions}
              className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              title="Daily Missions"
            >
              <Target className="w-5 h-5" />
              {completedMissionsCount < 3 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

            {/* Kapil AI Coach Floating trigger */}
            <button
              onClick={onOpenCoach}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all hover:brightness-105 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Coach Kapil</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-slate-200 hover:border-indigo-200'
              }`}
              title="Administrator Portal"
            >
              <ShieldCheck className={`w-4 h-4 ${activeTab === 'admin' ? 'text-white' : 'text-indigo-600'}`} />
              <span className="hidden sm:inline">Admin</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            {/* Profile Avatar / Change name / Landing Page */}
            {onGoToLanding && (
              <button
                onClick={onGoToLanding}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left group"
                title="Change Name / Revisit Profile"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 group-hover:bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase transition-colors">
                  {profile.name ? profile.name.charAt(0) : 'K'}
                </div>
                <div className="hidden xl:block text-xs">
                  <p className="font-bold text-slate-800 group-hover:text-blue-700 leading-tight">
                    {profile.name || 'Set Name'}
                  </p>
                  <p className="text-[10px] text-slate-500">{profile.department?.split(' ')[0] || 'Learner'}</p>
                </div>
              </button>
            )}

            {/* Learner Sign Out Button */}
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold transition-all"
                title="Sign Out of Learner Account"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 scrollbar-none items-center">
          <button
            onClick={() => onSelectTab('learn')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 ${
              activeTab === 'learn' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            Learning Path
          </button>
          <button
            onClick={() => onSelectTab('tasks')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 ${
              activeTab === 'tasks' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            Real World Tasks
          </button>
          <button
            onClick={() => onSelectTab('analytics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 ${
              activeTab === 'analytics' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => onSelectTab('leaderboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 ${
              activeTab === 'leaderboard' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => onSelectTab('badges')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 ${
              activeTab === 'badges' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            Badges
          </button>
          <button
            onClick={() => onSelectTab('certificates')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 ${
              activeTab === 'certificates' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            Certificates
          </button>
          <button
            onClick={onOpenAdmin}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 ${
              activeTab === 'admin' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-600 font-bold'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 text-rose-600 hover:bg-rose-50 border border-rose-200"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

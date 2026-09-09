import React from 'react';
import { Flame, Sparkles, ArrowRight, Zap, Trophy, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { LearnerProfile, Module } from '../types';
import { calculateLevel } from '../services/storageService';

interface HeroBannerProps {
  profile: LearnerProfile;
  modules: Module[];
  onContinueJourney: () => void;
  onOpenMissions: () => void;
  onOpenCoach: () => void;
  onOpenMockTests?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  profile,
  modules,
  onContinueJourney,
  onOpenMissions,
  onOpenCoach,
  onOpenMockTests,
}) => {
  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);
  const completedCount = profile.completedTopicIds.length;
  const completionPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const levelInfo = calculateLevel(profile.xp);
  const xpInCurrentLevel = profile.xp - levelInfo.currentBase;
  const xpForNextLevel = levelInfo.nextThreshold - levelInfo.currentBase;
  const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / xpForNextLevel) * 100));

  // Circular progress math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-800">
      {/* Subtle background glow effect */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Main Welcome & User Gamification Info */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold tracking-wide">
              {levelInfo.title}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {profile.xp.toLocaleString()} XP Earned
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Current Streak: {profile.streakDays} {profile.streakDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-sky-400">{profile.name || 'Learner'}</span>!
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              India's Ultimate Placement Readiness Challenge. Your daily placement sprint is live — tackle timed challenges, conquer corporate Boss Battles, and lock your dream campus offer.
            </p>
          </div>

          {/* Today's Challenge Waiting & CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={onContinueJourney}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              <span>Continue Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenMockTests && (
              <button
                onClick={onOpenMockTests}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-102 active:scale-98 relative"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>3 FAANG Mock Tests</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-rose-500 text-white animate-pulse">
                  Today
                </span>
              </button>
            )}

            <button
              onClick={onOpenMissions}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Today's Challenge Waiting</span>
            </button>

            <button
              onClick={onOpenCoach}
              className="px-4 py-3 rounded-xl bg-blue-900/30 hover:bg-blue-900/50 text-blue-200 border border-blue-700/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>Ask Kapil AI Coach</span>
            </button>
          </div>

          {/* Level Progress Bar */}
          <div className="pt-2 max-w-xl">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
              <span>XP to {levelInfo.level === 5 ? 'Max Level' : 'Next Tier'}</span>
              <span>{xpInCurrentLevel} / {xpForNextLevel} XP ({levelProgress}%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>

        </div>

        {/* Right: Circular Progress Ring & Placement Readiness Score */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-6 bg-white/5 backdrop-blur-xs p-6 rounded-2xl border border-white/10">
          
          {/* Progress Ring */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              {/* Background track */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress fill */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-blue-500 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {completionPercentage}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Completed
              </span>
            </div>
          </div>

          {/* Metric details */}
          <div className="w-full space-y-3 text-center sm:text-left lg:text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Completion %</p>
              <p className="text-sm font-medium text-slate-200 mt-0.5">
                {completedCount} of {totalTopics} Topics Mastered
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-around">
              <div>
                <p className="text-xs text-slate-400">Badges</p>
                <p className="text-lg font-bold text-amber-400 flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {profile.badgesEarned.length}
                </p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-xs text-slate-400">Placement Score</p>
                <p className="text-lg font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {profile.predictedPlacementScore}%
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

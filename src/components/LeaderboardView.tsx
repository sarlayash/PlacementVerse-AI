import React, { useState } from 'react';
import { Trophy, Flame, Sparkles, Search, Medal, Filter, MapPin, Building2, GraduationCap } from 'lucide-react';
import { LearnerProfile, LeaderboardEntry } from '../types';
import { INITIAL_LEADERBOARD_POOL } from '../data/leaderboardData';

interface LeaderboardViewProps {
  profile: LearnerProfile;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ profile }) => {
  const [scopeFilter, setScopeFilter] = useState<'india' | 'institute' | 'department' | 'class'>('india');
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'allTime'>('allTime');
  const [searchQuery, setSearchQuery] = useState('');

  // Assemble leaderboard including learner
  const learnerEntry: LeaderboardEntry = {
    rank: 4,
    name: profile.name || 'You (Learner)',
    institute: profile.institute || 'National Institute of Technology',
    department: profile.department || 'Computer Science & Engineering',
    classYear: profile.classYear || 'Final Year 2025',
    xp: profile.xp,
    streak: profile.streakDays,
    badgesCount: profile.badgesEarned.length,
    isCurrentLearner: true,
  };

  // Combine and sort
  const combined = [
    learnerEntry,
    ...INITIAL_LEADERBOARD_POOL.filter(p => p.name !== profile.name),
  ].sort((a, b) => b.xp - a.xp);

  // Assign ranks
  const ranked = combined.map((entry, idx) => ({ ...entry, rank: idx + 1 }));

  const filtered = ranked.filter((entry) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.institute.toLowerCase().includes(q) ||
        entry.department.toLowerCase().includes(q)
      );
    }
    if (scopeFilter === 'institute') {
      return entry.institute.includes('NIT') || entry.institute.includes('IIT') || entry.isCurrentLearner;
    }
    if (scopeFilter === 'department') {
      return entry.department.includes('Computer Science') || entry.isCurrentLearner;
    }
    if (scopeFilter === 'class') {
      return entry.classYear.includes('2025') || entry.isCurrentLearner;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Leaderboard Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              National Placement Leaderboard
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            India's Placement Readiness Challenge
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Compete across universities, departments, and nationwide batches. Top performers receive direct referrals to participating campus hiring partners.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs px-5 py-3 rounded-2xl border border-white/15 text-center shrink-0">
          <p className="text-[10px] uppercase font-bold text-slate-400">Your Current Stand</p>
          <p className="text-2xl font-black text-amber-400 font-display">
            Rank #{ranked.find(r => r.isCurrentLearner)?.rank || 4}
          </p>
          <p className="text-[11px] text-slate-300">{profile.xp.toLocaleString()} XP</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Scope Filters (Institute, Department, Class, India) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setScopeFilter('india')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'india' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Overall India
          </button>
          <button
            onClick={() => setScopeFilter('institute')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'institute' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Institute Wise
          </button>
          <button
            onClick={() => setScopeFilter('department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'department' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Department Wise
          </button>
          <button
            onClick={() => setScopeFilter('class')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'class' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Class Wise
          </button>
        </div>

        {/* Timeframe Filters (Weekly, Monthly, All Time) & Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            {(['weekly', 'monthly', 'allTime'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeFilter(t)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                  timeFilter === t ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t === 'allTime' ? 'All Time' : t}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-48"
            />
          </div>
        </div>

      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          
          {filtered.map((entry) => {
            const isTop3 = entry.rank <= 3;
            return (
              <div
                key={entry.name}
                className={`p-4 sm:p-5 flex items-center justify-between gap-3 transition-colors ${
                  entry.isCurrentLearner
                    ? 'bg-blue-50/70 hover:bg-blue-50 ring-1 ring-blue-300'
                    : 'hover:bg-slate-50/70'
                }`}
              >
                {/* Rank & Learner Details */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 sm:w-10 flex items-center justify-center shrink-0">
                    {entry.rank === 1 ? (
                      <span className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shadow-sm">
                        🥇
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow-sm">
                        🥈
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-black text-sm flex items-center justify-center shadow-sm">
                        🥉
                      </span>
                    ) : (
                      <span className="font-mono text-sm font-bold text-slate-500">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {entry.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {entry.name}
                      </p>
                      {entry.isCurrentLearner && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-2 mt-0.5">
                      <span>{entry.institute}</span>
                      <span>•</span>
                      <span className="hidden sm:inline">{entry.department}</span>
                    </p>
                  </div>
                </div>

                {/* Gamification Stats */}
                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{entry.streak}d</span>
                  </div>

                  <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>{entry.badgesCount} badges</span>
                  </div>

                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-black text-blue-600 font-display flex items-center gap-1 justify-end">
                      <Sparkles className="w-3.5 h-3.5" />
                      {entry.xp.toLocaleString()} XP
                    </p>
                    <p className="text-[10px] font-semibold text-slate-400">Score</p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

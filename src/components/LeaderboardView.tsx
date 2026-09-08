import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Sparkles, Search, Medal, Filter, MapPin, Building2, GraduationCap, Users, RefreshCw } from 'lucide-react';
import { LearnerProfile, LeaderboardEntry } from '../types';
import { getAllStudents, fetchServerStudents, getRealLeaderboard } from '../services/storageService';

interface LeaderboardViewProps {
  profile: LearnerProfile;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ profile }) => {
  const [scopeFilter, setScopeFilter] = useState<'india' | 'institute' | 'department' | 'class'>('india');
  const [searchQuery, setSearchQuery] = useState('');
  const [allStudents, setAllStudents] = useState<LearnerProfile[]>(() => getAllStudents());
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);

  // Sync real students from server and local storage
  const syncStudents = async () => {
    setIsLiveSyncing(true);
    const serverList = await fetchServerStudents();
    if (serverList && serverList.length > 0) {
      setAllStudents(serverList);
    } else {
      setAllStudents(getAllStudents());
    }
    setIsLiveSyncing(false);
  };

  useEffect(() => {
    syncStudents();

    // SSE Real-time stream listener
    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/students/stream');
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (Array.isArray(data.allStudents)) {
            setAllStudents(data.allStudents);
          }
        } catch {}
      };
    } catch {}

    const handleUpdate = () => {
      setAllStudents(getAllStudents());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('placementverse_students_updated', handleUpdate);

    return () => {
      if (es) es.close();
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('placementverse_students_updated', handleUpdate);
    };
  }, []);

  // Ensure current learner profile is part of student pool if they started journey
  const effectiveStudents = React.useMemo(() => {
    const list = [...allStudents];
    if (profile.name && profile.name.trim()) {
      const exists = list.some(s => s.name.toLowerCase() === profile.name.toLowerCase());
      if (!exists) {
        list.push(profile);
      } else {
        // Sync newest profile stats
        const idx = list.findIndex(s => s.name.toLowerCase() === profile.name.toLowerCase());
        list[idx] = { ...list[idx], ...profile };
      }
    }
    return list;
  }, [allStudents, profile]);

  // Generate 100% real ranked leaderboard with no fake entries
  const rankedEntries = React.useMemo(() => {
    return getRealLeaderboard(effectiveStudents, profile.name);
  }, [effectiveStudents, profile.name]);

  const currentLearnerEntry = rankedEntries.find(r => r.isCurrentLearner);
  const totalLearnersCount = rankedEntries.length;

  const filtered = rankedEntries.filter((entry) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.institute.toLowerCase().includes(q) ||
        entry.department.toLowerCase().includes(q)
      );
    }
    if (scopeFilter === 'institute') {
      const targetInst = (profile.institute || '').toLowerCase().trim();
      return entry.institute.toLowerCase().includes(targetInst) || entry.isCurrentLearner;
    }
    if (scopeFilter === 'department') {
      const targetDept = (profile.department || '').toLowerCase().trim();
      return entry.department.toLowerCase().includes(targetDept) || entry.isCurrentLearner;
    }
    if (scopeFilter === 'class') {
      const targetClass = (profile.classYear || '').toLowerCase().trim();
      return entry.classYear.toLowerCase().includes(targetClass) || entry.isCurrentLearner;
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
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Real-Time
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Authentic Placement Readiness Rankings
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Live rankings calculated purely from authentic candidate XP, real test clearance, and verified assessment performance.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs px-5 py-3 rounded-2xl border border-white/15 text-center shrink-0">
          <p className="text-[10px] uppercase font-bold text-slate-400">Your Real Stand</p>
          <p className="text-2xl font-black text-amber-400 font-display">
            {currentLearnerEntry ? `Rank #${currentLearnerEntry.rank}` : 'Rank #1'}
          </p>
          <p className="text-[11px] text-slate-300">
            {profile.xp.toLocaleString()} Real XP ({totalLearnersCount} {totalLearnersCount === 1 ? 'Learner' : 'Learners'})
          </p>
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
            Overall India ({totalLearnersCount})
          </button>
          <button
            onClick={() => setScopeFilter('institute')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'institute' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            My Institute ({profile.institute?.split(' ')[0] || 'College'})
          </button>
          <button
            onClick={() => setScopeFilter('department')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'department' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            My Department
          </button>
          <button
            onClick={() => setScopeFilter('class')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              scopeFilter === 'class' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Class of 2025
          </button>
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center gap-3">
          <button
            onClick={syncStudents}
            disabled={isLiveSyncing}
            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${isLiveSyncing ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate name or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56"
            />
          </div>
        </div>

      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No candidates found in this scope</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery ? 'Try clearing your search query.' : 'Be the first from your cohort to start the placement challenge!'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((entry) => {
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
                      {entry.name.charAt(0) || 'L'}
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
                        {entry.rank === 1 && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold shrink-0">
                            Rank #1
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
                      <p className="text-[10px] font-semibold text-slate-400">Authentic XP</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

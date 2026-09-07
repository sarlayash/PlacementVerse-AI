import React, { useState } from 'react';
import { Trophy, Award, Lock, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { LearnerProfile, Badge } from '../types';
import { ALL_BADGES } from '../data/badgesData';

interface BadgesViewProps {
  profile: LearnerProfile;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ profile }) => {
  const [filter, setFilter] = useState<'all' | 'milestone' | 'mastery' | 'special'>('all');

  const earnedCount = profile.badgesEarned.length;
  const totalCount = ALL_BADGES.length;

  const filteredBadges = ALL_BADGES.filter((b) => {
    if (filter === 'all') return true;
    return b.category === filter;
  });

  return (
    <div className="space-y-8">
      
      {/* Badges Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              PlacementVerse Trophy Cabinet
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            23 Metallic Placement Badges
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Each metallic badge represents verified placement competency — from rapid mental math speed to conquering MNC Boss Battles and ATS resume perfection.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs px-5 py-3 rounded-2xl border border-white/15 text-center shrink-0">
          <p className="text-[10px] uppercase font-bold text-slate-400">Badges Unlocked</p>
          <p className="text-2xl font-black text-amber-400 font-display">
            {earnedCount} / {totalCount}
          </p>
          <p className="text-[11px] text-slate-300">{Math.round((earnedCount / totalCount) * 100)}% Collected</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        {(['all', 'milestone', 'mastery', 'special'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
              filter === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? 'All 23 Badges' : `${cat} Badges`}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = profile.badgesEarned.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md ring-1 ring-slate-200'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-60'
              }`}
            >
              <div>
                {/* 3D Metallic Badge Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md border ${
                      isUnlocked
                        ? `bg-gradient-to-br ${badge.gradient} border-white/40 shadow-inner`
                        : 'bg-slate-200 border-slate-300 text-slate-400 grayscale'
                    }`}
                  >
                    <span>{badge.icon}</span>
                  </div>

                  {isUnlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Unlocked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500">
                <span className="font-bold text-slate-700">Requirement:</span> {badge.requirement}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

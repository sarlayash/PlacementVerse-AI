import React from 'react';
import { X, CheckCircle2, Target, Flame, Sparkles, Trophy, Award, Gem, Crown, Gift } from 'lucide-react';
import { LearnerProfile } from '../types';
import { fireCelebrationConfetti } from '../services/storageService';

interface DailyMissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onUpdateProfile: (updated: LearnerProfile) => void;
}

export const DailyMissionsModal: React.FC<DailyMissionsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  if (!isOpen) return null;

  const allMissionsCompleted = profile.dailyMissions.every(m => m.completed);
  const totalMissionsCompleted = profile.dailyMissions.filter(m => m.completed).length;

  const handleClaimBonus = () => {
    if (!allMissionsCompleted) return;
    const updated = {
      ...profile,
      xp: profile.xp + 100,
    };
    onUpdateProfile(updated);
    fireCelebrationConfetti();
  };

  const STREAK_MILESTONES = [
    { days: 1, title: 'Fire Badge', icon: Flame, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { days: 3, title: 'Bronze Tier', icon: Award, color: 'text-amber-700 bg-amber-100/50 border-amber-300' },
    { days: 7, title: 'Silver Tier', icon: Award, color: 'text-slate-400 bg-slate-100 border-slate-300' },
    { days: 15, title: 'Gold Tier', icon: Trophy, color: 'text-yellow-600 bg-yellow-50 border-yellow-300' },
    { days: 30, title: 'Diamond Tier', icon: Gem, color: 'text-cyan-500 bg-cyan-50 border-cyan-300' },
    { days: 100, title: 'Legend Tier', icon: Crown, color: 'text-purple-600 bg-purple-50 border-purple-300' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Today's Missions & Streak</h2>
              <p className="text-xs text-slate-500">Complete all 3 missions to unlock today's 100 XP bonus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Daily Missions ({totalMissionsCompleted}/3)</h3>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
              <Gift className="w-3.5 h-3.5" />
              Bonus: 100 XP
            </span>
          </div>

          {profile.dailyMissions.map((m) => {
            const pct = Math.min(100, Math.round((m.current / m.target) * 100));
            return (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all ${
                  m.completed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50/70 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    {m.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                    <span className={`text-sm font-semibold ${m.completed ? 'text-emerald-900' : 'text-slate-800'}`}>
                      {m.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {m.current} / {m.target}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.completed ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}

          {allMissionsCompleted && (
            <button
              onClick={handleClaimBonus}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Claim 100 XP Bonus!
            </button>
          )}
        </div>

        {/* Streak Ladder */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Streak System</h3>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              {profile.streakDays} Day Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {STREAK_MILESTONES.map((item) => {
              const achieved = profile.streakDays >= item.days;
              const Icon = item.icon;
              return (
                <div
                  key={item.days}
                  className={`p-3 rounded-2xl border text-center relative transition-all ${
                    achieved ? item.color : 'bg-slate-50/50 border-slate-200 opacity-55'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <Icon className={`w-5 h-5 ${achieved ? '' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-xs font-extrabold">{item.title}</p>
                  <p className="text-[11px] font-medium opacity-80">{item.days} Days</p>
                  {achieved && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* XP Rules Reference */}
        <div className="pt-2 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <p className="text-xs font-bold text-slate-700 mb-2">⚡ PlacementVerse XP Rewards Guide</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
            <div>• Learning: <strong className="text-blue-600">+50 XP</strong></div>
            <div>• Quiz Practice: <strong className="text-blue-600">+100 XP</strong></div>
            <div>• Challenge: <strong className="text-blue-600">+150 XP</strong></div>
            <div>• Boss Battle: <strong className="text-amber-600">+300 XP</strong></div>
            <div>• Daily Login: <strong className="text-emerald-600">+20 XP</strong></div>
            <div>• Perfect Score: <strong className="text-purple-600">+500 XP</strong></div>
          </div>
        </div>

      </div>
    </div>
  );
};

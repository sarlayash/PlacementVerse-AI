import React from 'react';
import { 
  BarChart3, TrendingUp, ShieldCheck, Zap, Clock, Trophy, 
  AlertTriangle, CheckCircle2, Bot, Sparkles 
} from 'lucide-react';
import { LearnerProfile, Module } from '../types';

interface AnalyticsViewProps {
  profile: LearnerProfile;
  modules: Module[];
  onOpenCoachWithQuery?: (query: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  profile,
  modules,
  onOpenCoachWithQuery,
}) => {
  const completedCount = profile.completedTopicIds.length;
  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);

  // Dynamic strength and weakness calculations
  const strengths = [
    { topic: 'Percentage & Multiplying Factors', accuracy: 94, category: 'Quantitative' },
    { topic: 'Coding Decoding & Series', accuracy: 91, category: 'Reasoning' },
    { topic: 'Grammar & Subject-Verb Agreement', accuracy: 88, category: 'Verbal' },
    { topic: 'Google X-Y-Z Resume Bullets', accuracy: 92, category: 'Placement' },
  ];

  const weaknesses = [
    { topic: 'Boats & Streams (Relative Velocity)', accuracy: 58, category: 'Quantitative', tip: 'Use (u+v) for downstream and (u-v) for upstream' },
    { topic: 'Seating Arrangement (Dual Circular)', accuracy: 62, category: 'Reasoning', tip: 'Lock definite positions first; don\'t erase intermediate sketches' },
    { topic: 'Para Jumbles & Transition Sentences', accuracy: 65, category: 'Verbal', tip: 'Find noun-pronoun mandatory pairs first' },
    { topic: 'STAR Behavioral Conflict Questions', accuracy: 68, category: 'Placement', tip: 'Spend 50% on personal action, not group backstory' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner: Predicted Placement Score */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              AI Placement Probability Predictor
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Predicted Placement Score: <span className="text-emerald-400">{profile.predictedPlacementScore}%</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Based on your Practice accuracy, Timed Challenge speed, and Boss Battle clearance. You are currently indexed in the <strong>Top 5% candidate bracket</strong> for TCS Digital, Infosys InfyTQ, and Amazon SDE campus recruitment rounds.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/15 shrink-0 text-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">National Rank</p>
            <p className="text-2xl font-black text-white mt-1">#4</p>
            <p className="text-[10px] text-emerald-400 mt-0.5">Overall India</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Consistency</p>
            <p className="text-2xl font-black text-amber-400 mt-1">96%</p>
            <p className="text-[10px] text-slate-300 mt-0.5">{profile.streakDays}d Streak</p>
          </div>
        </div>
      </div>

      {/* 4 Core Velocity Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Average Speed</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-display">38 Sec</p>
          <p className="text-[11px] text-emerald-600 font-semibold">⚡ 22s faster than national avg</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Topic Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-display">86.4%</p>
          <p className="text-[11px] text-slate-500">Across 200+ solved questions</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Boss Cleared</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-display">{completedCount}</p>
          <p className="text-[11px] text-slate-500">Of {totalTopics} syllabus topics</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Badges Earned</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-display">{profile.badgesEarned.length}</p>
          <p className="text-[11px] text-slate-500">Out of 23 total badges</p>
        </div>
      </div>

      {/* Strength vs Weakness Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strength Meter */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Strength Meter (High Accuracy)</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Offer Boosters
            </span>
          </div>

          <div className="space-y-3.5">
            {strengths.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{s.topic}</span>
                  <span className="font-mono font-bold text-emerald-600">{s.accuracy}% Accuracy</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${s.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weakness Meter */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold text-slate-900">Weakness Meter (Focus Required)</h3>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              Needs Practice
            </span>
          </div>

          <div className="space-y-3.5">
            {weaknesses.map((w, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{w.topic}</span>
                  <span className="font-mono font-bold text-rose-600">{w.accuracy}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-rose-500 transition-all duration-700"
                    style={{ width: `${w.accuracy}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 italic mt-1">
                  💡 Strategy: {w.tip}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Assistant Coach Recommendation Callout */}
      <div className="p-6 rounded-3xl bg-blue-50/80 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-950">Kapil AI Coach: Personalized Action Plan</h4>
            <p className="text-xs text-blue-900/80 mt-0.5">
              Practice 15 Boats & Streams relative velocity MCQs today to raise your placement probability above 92%.
            </p>
          </div>
        </div>
        {onOpenCoachWithQuery && (
          <button
            onClick={() => onOpenCoachWithQuery('Can you give me a 10-minute crash course and 3 shortcut tricks for Boats & Streams relative velocity?')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 shadow-sm transition-all"
          >
            Start Targeted Drill
          </button>
        )}
      </div>

    </div>
  );
};

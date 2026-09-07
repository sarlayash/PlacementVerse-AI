import React, { useState } from 'react';
import { 
  CheckCircle2, Lock, ArrowRight, BookOpen, Layers, 
  Clock, ShieldAlert, Sparkles, Trophy, ChevronRight, Calculator, 
  BrainCircuit, MessageSquareText, Briefcase
} from 'lucide-react';
import { Module, Topic, LearnerProfile } from '../types';

interface LearningPathViewProps {
  modules: Module[];
  profile: LearnerProfile;
  onSelectTopic: (topic: Topic) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  modules,
  profile,
  onSelectTopic,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);

  const getModuleIcon = (id: number) => {
    switch (id) {
      case 1: return Calculator;
      case 2: return BrainCircuit;
      case 3: return BookOpen;
      case 4: return MessageSquareText;
      case 5: return Briefcase;
      default: return BookOpen;
    }
  };

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  return (
    <div className="space-y-8">
      
      {/* Module Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {modules.map((m) => {
          const Icon = getModuleIcon(m.id);
          const isActive = m.id === activeModuleId;
          const completedTopicsInModule = m.topics.filter(t => profile.completedTopicIds.includes(t.id)).length;
          const totalInModule = m.topics.length;
          const pct = Math.round((completedTopicsInModule / totalInModule) * 100);

          return (
            <button
              key={m.id}
              onClick={() => setActiveModuleId(m.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-102'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Mod {m.id}
                </span>
              </div>

              <h3 className="text-xs font-bold leading-tight line-clamp-1">{m.title}</h3>
              <p className={`text-[11px] mt-1 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {completedTopicsInModule} / {totalInModule} done ({pct}%)
              </p>

              {/* Progress bar line */}
              <div className={`w-full h-1 rounded-full mt-2 overflow-hidden ${
                isActive ? 'bg-white/30' : 'bg-slate-100'
              }`}>
                <div
                  className={`h-full rounded-full ${isActive ? 'bg-emerald-300' : 'bg-blue-600'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Module {activeModule.id}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{activeModule.topics.length} Topics with 4-Step Roadmaps</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display mt-0.5">
            {activeModule.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {activeModule.shortDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shrink-0">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Every topic unlocks +500 Total XP</span>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {activeModule.topics.map((topic, index) => {
          const isCompleted = profile.completedTopicIds.includes(topic.id);
          const isUnlocked = profile.unlockedTopicIds.includes(topic.id) || index === 0;

          return (
            <div
              key={topic.id}
              onClick={() => isUnlocked && onSelectTopic(topic)}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isCompleted
                  ? 'bg-white border-emerald-300 shadow-xs hover:shadow-md cursor-pointer ring-1 ring-emerald-400/20'
                  : isUnlocked
                  ? 'bg-white border-blue-200 hover:border-blue-400 shadow-xs hover:shadow-md cursor-pointer'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-65 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Topic status header */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Topic {topic.order}
                  </span>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Ready to Learn
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {topic.learningContent.summary}
                </p>

                {/* 4 Step Pills */}
                <div className="grid grid-cols-2 gap-1.5 mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-600">
                  <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-50">
                    <BookOpen className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>10m Concept</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-50">
                    <Layers className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>25 Practice MCQs</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-50">
                    <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>15m Challenge</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-50">
                    <ShieldAlert className="w-3 h-3 text-rose-600 shrink-0" />
                    <span>Boss Battle (80%)</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  {isUnlocked ? '4 Stages' : 'Defeat prev. Boss to unlock'}
                </span>
                {isUnlocked && (
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span>{isCompleted ? 'Review & Practice' : 'Start Topic'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

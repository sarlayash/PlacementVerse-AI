import React, { useState } from 'react';
import { 
  Sparkles, Flame, Trophy, Award, ArrowRight, CheckCircle2, 
  Clock, BookOpen, Code2, AlertTriangle, Copy, Check, 
  ExternalLink, Zap, Target, ShieldCheck, ChevronRight,
  BarChart3, RefreshCw, Layers, Terminal, Database, FileSpreadsheet,
  Lock, Cpu, FileText, Compass, PlayCircle
} from 'lucide-react';
import { LearnerProfile, Module, Topic, FaangMockTest } from '../types';
import { calculateLevel } from '../services/storageService';
import { DOMAIN_STUDY_NOTES, DomainStudyNote } from '../data/domainStudyNotesData';
import { FAANG_MOCK_TESTS } from '../data/faangMockTestsData';
import { ALL_BADGES } from '../data/badgesData';

interface LearnerDashboardViewProps {
  profile: LearnerProfile;
  modules: Module[];
  onSelectTopic: (topic: Topic) => void;
  onContinueJourney: () => void;
  onOpenMissions: () => void;
  onOpenCoach: () => void;
  onOpenMockTests: (testId?: string) => void;
  onOpenFinalAssessment: () => void;
  onOpenGrammar: () => void;
}

export const LearnerDashboardView: React.FC<LearnerDashboardViewProps> = ({
  profile,
  modules,
  onSelectTopic,
  onContinueJourney,
  onOpenMissions,
  onOpenCoach,
  onOpenMockTests,
  onOpenFinalAssessment,
  onOpenGrammar,
}) => {
  // Selected Domain State (Defaults to DBMS & SQL Architecture)
  const [selectedDomainId, setSelectedDomainId] = useState<string>('dbms-sql');
  const [activeNotesTab, setActiveNotesTab] = useState<'concepts' | 'syntax' | 'pitfalls' | 'cheatsheet'>('concepts');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Active domain note object
  const activeDomain = DOMAIN_STUDY_NOTES.find(d => d.id === selectedDomainId) || DOMAIN_STUDY_NOTES[0];

  // Matching mock test for the selected domain
  const matchingMockTest = FAANG_MOCK_TESTS.find(t => t.id === activeDomain.testId);
  const attempt = matchingMockTest ? profile.mockTestAttempts?.[matchingMockTest.id] : undefined;
  const isPassed = attempt?.passed;

  // Matching master badge for this domain
  const matchingBadge = ALL_BADGES.find(b => b.id === activeDomain.badgeId);
  const hasEarnedBadge = (profile?.badgesEarned || []).includes(activeDomain.badgeId);

  // Gamification math
  const levelInfo = calculateLevel(profile?.xp || 0);
  const totalTopics = modules.reduce((acc, m) => acc + (m?.topics?.length || 0), 0);
  const completedTopicsCount = (profile?.completedTopicIds || []).length;
  const completionPercentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ==================================================================== */}
      {/* 1. HERO BANNER & CANDIDATE PLACEMENT OVERVIEW */}
      {/* ==================================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-72 h-72 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
                {levelInfo.title}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {profile.xp.toLocaleString()} Total XP
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {profile.streakDays} Day Streak
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
                Target: {profile.targetCompany || 'Top Tech & Enterprise'}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white">
                Welcome, {profile.name || 'Placement Candidate'}
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Select your focus domain below to immediately load comprehensive architectural notes, syntax cheat sheets, and live high-bar mock assessments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenMockTests(activeDomain.testId)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all active:scale-95"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Launch {activeDomain.domainName} Mock Test</span>
              </button>

              <button
                onClick={onContinueJourney}
                className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Continue Learning Path</span>
              </button>

              <button
                onClick={onOpenCoach}
                className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <span>Ask Kapil AI</span>
              </button>
            </div>
          </div>

          {/* Right: Placement Readiness Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="text-slate-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="text-blue-500"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - Math.min(100, profile.predictedPlacementScore || 68) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-display text-white">
                  {profile.predictedPlacementScore || 68}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Readiness
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-xs font-bold text-slate-200">
                Predicted Placement Index
              </p>
              <p className="text-[11px] text-slate-400">
                {(profile?.badgesEarned || []).length} Badges Earned • {completedTopicsCount}/{totalTopics} Topics Completed
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. INTERACTIVE DOMAIN SELECTION HUB */}
      {/* ==================================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">Dynamic Domain Selector</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-xs text-slate-500 font-medium">10 Core Disciplines</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-0.5">
              Choose Domain to Load Notes & Mock Assessments
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:block">
            Click any domain pill to dynamically switch notes & tests
          </span>
        </div>

        {/* Domain Selector Horizontal Bar / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {DOMAIN_STUDY_NOTES.map((domain) => {
            const isSelected = domain.id === selectedDomainId;
            const test = FAANG_MOCK_TESTS.find(t => t.id === domain.testId);
            const testAttempt = test ? profile.mockTestAttempts?.[test.id] : undefined;

            return (
              <button
                key={domain.id}
                onClick={() => {
                  setSelectedDomainId(domain.id);
                  setActiveNotesTab('concepts');
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-indigo-700 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xl">{domain.icon}</span>
                  {testAttempt?.passed ? (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" />
                      Passed
                    </span>
                  ) : testAttempt ? (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-100 text-amber-800">
                      {testAttempt.percentage}%
                    </span>
                  ) : (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-indigo-900 text-indigo-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      10 Qs
                    </span>
                  )}
                </div>

                <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {domain.domainName.split('&')[0].trim()}
                </p>
                <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {domain.tagline.split(',')[0]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. DYNAMIC CONTENT FOR CHOSEN DOMAIN: NOTES + MOCK ASSESSMENT */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Comprehensive Domain Study Notes (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Domain Notes Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shrink-0">
                    {activeDomain.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                        {activeDomain.category}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">⏱️ {activeDomain.estimatedReadTime} Read</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-bold text-amber-600">{activeDomain.level}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 font-display mt-1">
                      {activeDomain.domainName}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => onOpenMockTests(activeDomain.testId)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-center"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start Domain Test</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {activeDomain.overview}
              </p>

              {/* Notes Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => setActiveNotesTab('concepts')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeNotesTab === 'concepts'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Core Architecture</span>
                </button>

                <button
                  onClick={() => setActiveNotesTab('syntax')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeNotesTab === 'syntax'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Formulas & Syntax</span>
                </button>

                <button
                  onClick={() => setActiveNotesTab('pitfalls')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeNotesTab === 'pitfalls'
                      ? 'bg-rose-900 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Interview Traps</span>
                </button>

                <button
                  onClick={() => setActiveNotesTab('cheatsheet')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeNotesTab === 'cheatsheet'
                      ? 'bg-indigo-900 text-white shadow-xs'
                      : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Quick Cheat Sheet</span>
                </button>
              </div>
            </div>

            {/* Dynamic Notes Content Body */}
            <div className="p-6">
              
              {/* TAB 1: CORE ARCHITECTURE */}
              {activeNotesTab === 'concepts' && (
                <div className="space-y-6 animate-in fade-in">
                  {activeDomain.keyArchitecturalNotes.map((note, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900 font-display flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-black">
                            {idx + 1}
                          </span>
                          {note.title}
                        </h4>
                      </div>

                      <p className="text-xs font-medium text-slate-700 leading-relaxed">
                        {note.summary}
                      </p>

                      <div className="space-y-2 pt-1 border-t border-slate-200/60">
                        {note.deepDive.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        {note.keyTerms.map((term, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: SYNTAX & FORMULAS */}
              {activeNotesTab === 'syntax' && (
                <div className="space-y-6 animate-in fade-in">
                  {activeDomain.formulasAndSyntax.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {item.language.toUpperCase()}
                          </span>
                          <h4 className="font-bold text-sm text-white mt-1">{item.title}</h4>
                        </div>

                        <button
                          onClick={() => handleCopyCode(item.codeOrFormula, idx)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {item.codeOrFormula}
                      </pre>

                      <div className="text-xs text-slate-300 space-y-1">
                        <p><strong className="text-slate-200">Explanation:</strong> {item.explanation}</p>
                        <p><strong className="text-amber-400">Corporate Use Case:</strong> {item.useCase}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: INTERVIEW PITFALLS */}
              {activeNotesTab === 'pitfalls' && (
                <div className="space-y-4 animate-in fade-in">
                  {activeDomain.interviewPitfalls.map((pitfall, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-sm text-rose-950 font-display">
                            Trap #{idx + 1}: {pitfall.trap}
                          </h4>
                          <p className="text-xs text-rose-800 mt-1">
                            <strong>Why 80% Candidates Fail:</strong> {pitfall.whyCandidatesFail}
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs text-slate-800 space-y-1">
                        <p className="font-black text-emerald-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Recommended High-Bar Response:
                        </p>
                        <p className="leading-relaxed font-medium">{pitfall.correctResponse}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: QUICK CHEAT SHEET */}
              {activeNotesTab === 'cheatsheet' && (
                <div className="p-6 rounded-2xl bg-indigo-950 text-white border border-indigo-900 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-white font-display flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {activeDomain.domainName} • Last-Minute Revision Cheat Sheet
                    </h4>
                    <span className="text-[10px] uppercase font-bold text-indigo-300">
                      SarlaYash Verified
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-indigo-100">
                    {activeDomain.quickRevisionSummary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="font-black text-amber-400">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Domain Mock Assessment Card & Badge (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Mock Test Assessment Card */}
          {matchingMockTest ? (
            <div className={`rounded-3xl border p-6 space-y-5 transition-all shadow-md ${
              isPassed
                ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border-emerald-500/50'
                : 'bg-white text-slate-900 border-slate-200'
            }`}>
              
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                  isPassed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}>
                  {matchingMockTest.totalQuestions} MCQs • {matchingMockTest.durationMinutes}m
                </span>

                {isPassed ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Passed ({attempt?.percentage}%)
                  </span>
                ) : attempt ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    Previous: {attempt.percentage}%
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    Unattempted
                  </span>
                )}
              </div>

              <div>
                <h3 className={`text-lg font-black font-display leading-snug ${isPassed ? 'text-white' : 'text-slate-900'}`}>
                  {matchingMockTest.title}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isPassed ? 'text-slate-300' : 'text-slate-500'}`}>
                  {matchingMockTest.subtitle}
                </p>
              </div>

              {/* Exam Rules Breakdown */}
              <div className={`p-3.5 rounded-2xl text-xs space-y-1.5 ${
                isPassed ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-50 border border-slate-100'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={isPassed ? 'text-slate-400' : 'text-slate-500'}>Marking Scheme</span>
                  <span className={isPassed ? 'text-emerald-400' : 'text-blue-700'}>
                    +{matchingMockTest.marksPerQuestion} / -{matchingMockTest.negativeMark}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={isPassed ? 'text-slate-400' : 'text-slate-500'}>Pass Threshold</span>
                  <span className={isPassed ? 'text-slate-200' : 'text-slate-700'}>≥60% (18/30 Marks)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={isPassed ? 'text-slate-400' : 'text-slate-500'}>Credential</span>
                  <span className={isPassed ? 'text-amber-400' : 'text-slate-700'}>Cryptographic Certificate</span>
                </div>
              </div>

              {/* Syllabus Preview */}
              <div className="space-y-1.5">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isPassed ? 'text-slate-400' : 'text-slate-400'}`}>
                  High-Yield Screening Focus
                </p>
                <ul className="space-y-1 text-xs">
                  {matchingMockTest.syllabusHighlights.slice(0, 3).map((item, sIdx) => (
                    <li key={sIdx} className={`flex items-start gap-1.5 leading-snug ${isPassed ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Start / Retake Action Button */}
              <button
                onClick={() => onOpenMockTests(matchingMockTest.id)}
                className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isPassed
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/30'
                }`}
              >
                <span>{isPassed ? 'Retake Exam' : attempt ? 'Retake to Qualify' : 'Start Mock Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500">Assessment loaded from master pool.</p>
              <button
                onClick={() => onOpenMockTests()}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                View All Mocks
              </button>
            </div>
          )}

          {/* Master Badge Card */}
          {matchingBadge && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Domain Master Badge
                </p>
                {hasEarnedBadge ? (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Unlocked
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                    Locked
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-2xl shrink-0 shadow-md">
                  {matchingBadge.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-sm text-slate-900 font-display truncate">
                    {matchingBadge.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {matchingBadge.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">XP Reward</span>
                <span className="font-black text-emerald-700">+{matchingBadge.xpBonus} XP</span>
              </div>
            </div>
          )}

          {/* Grammar & Verbal Quick Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700">
                Verbal & Communication
              </span>
              <span className="text-xs">🗣️</span>
            </div>
            <h4 className="font-black text-sm text-slate-900 font-display">
              The 8 Parts of Speech Mastery
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Master nouns, pronouns, verbs, tenses, adjectives, adverbs, prepositions, conjunctions, and corporate situational judgment.
            </p>
            <button
              onClick={onOpenGrammar}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-900 border border-indigo-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Practice Grammar (80 MCQs)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 4. FOUNDATIONAL LEARNING PATH MODULES & TOPICS (PRESERVED CONTENT) */}
      {/* ==================================================================== */}
      <div className="pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">Aptitude & Technical Foundations</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-xs text-slate-500 font-medium">{modules.length} Core Modules</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-0.5">
              Foundational Placement Modules & Question Banks
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Click any unlocked topic to launch interactive 4-step practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((module) => {
            const completedCount = (module?.topics || []).filter(t => (profile?.completedTopicIds || []).includes(t.id)).length;
            const topicTotal = (module?.topics || []).length;
            const progress = topicTotal > 0 ? Math.round((completedCount / topicTotal) * 100) : 0;

            return (
              <div 
                key={module.id} 
                className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Module 0{module.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                      {completedCount}/{topicTotal} Done
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 font-display">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {module.shortDesc}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Topics Preview List */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  {(module?.topics || []).slice(0, 3).map((topic) => {
                    const isUnlocked = (profile?.unlockedTopicIds || []).includes(topic.id);
                    const isCompleted = (profile?.completedTopicIds || []).includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        disabled={!isUnlocked}
                        onClick={() => onSelectTopic(topic)}
                        className={`w-full p-2 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between ${
                          !isUnlocked
                            ? 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-400'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                            : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900'
                        }`}
                      >
                        <span className="truncate">{topic.name}</span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : isUnlocked ? (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}

                  {(module?.topics || []).length > 3 && (
                    <button
                      onClick={() => {
                        const firstUnlocked = (module?.topics || []).find(t => (profile?.unlockedTopicIds || []).includes(t.id)) || module.topics[0];
                        onSelectTopic(firstUnlocked);
                      }}
                      className="w-full text-center text-[11px] font-bold text-blue-600 hover:text-blue-800 pt-1"
                    >
                      + {(module?.topics || []).length - 3} more topics in this module
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

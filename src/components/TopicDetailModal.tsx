import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, AlertCircle, Clock, ShieldAlert, Sparkles, 
  HelpCircle, ArrowRight, ArrowLeft, Trophy, Zap, Bot, BookOpen, 
  Check, RefreshCw, Layers
} from 'lucide-react';
import { Topic, Question, LearnerProfile } from '../types';
import { fireCelebrationConfetti } from '../services/storageService';

interface TopicDetailModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onUpdateProfile: (updated: LearnerProfile) => void;
  onUnlockNextTopic?: (currentTopicId: string) => void;
  onOpenCoachWithContext?: (query: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onUnlockNextTopic,
  onOpenCoachWithContext,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 2 Practice Zone State
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceDifficulty, setPracticeDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [practiceUserAnswers, setPracticeUserAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  // Step 3 Challenge Arena State
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeFinished, setChallengeFinished] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60); // 15 minutes
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<number, number>>({});
  const [challengeScore, setChallengeScore] = useState<{ correct: number; wrong: number; skipped: number; netScore: number } | null>(null);

  // Step 4 Boss Battle State
  const [bossIndex, setBossIndex] = useState(0);
  const [bossAnswers, setBossAnswers] = useState<Record<number, number>>({});
  const [bossSubmitted, setBossSubmitted] = useState(false);
  const [bossPassed, setBossPassed] = useState(false);

  // Filter practice questions based on difficulty
  const filteredPracticeQuestions = (topic?.practiceQuestions || []).filter(q => {
    if (practiceDifficulty === 'All') return true;
    return q.difficulty === practiceDifficulty;
  });

  const currentPracticeQ = filteredPracticeQuestions[practiceIndex] || filteredPracticeQuestions[0];
  const currentChallengeQ = topic?.challengeQuestions?.[challengeIndex] || topic?.challengeQuestions?.[0];
  const currentBossQ = topic?.bossQuestions?.[bossIndex] || topic?.bossQuestions?.[0];

  // Challenge Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (challengeStarted && !challengeFinished && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleFinishChallenge();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [challengeStarted, challengeFinished, timeLeftSeconds]);

  // Handle Practice Answer
  const handleSelectPracticeAnswer = (optIndex: number) => {
    if (!currentPracticeQ) return;
    if (practiceUserAnswers[currentPracticeQ.id] !== undefined) return;
    setPracticeUserAnswers(prev => ({ ...prev, [currentPracticeQ.id]: optIndex }));
    setShowExplanation(true);

    // Update mission counter if newly answered
    const missions = [...profile.dailyMissions];
    const m1 = missions.find(m => m.id === 'm1');
    if (m1 && !m1.completed) {
      m1.current += 1;
      if (m1.current >= m1.target) {
        m1.completed = true;
        profile.xp += m1.rewardXp;
      }
      onUpdateProfile({ ...profile, dailyMissions: missions });
    }
  };

  // Complete Step 1 Learning -> +50 XP
  const handleFinishLearning = () => {
    const isFirstTime = !profile.completedTopicIds.includes(topic.id);
    if (isFirstTime) {
      const updated = {
        ...profile,
        xp: profile.xp + 50,
      };
      onUpdateProfile(updated);
    }
    setActiveStep(2);
  };

  // Complete Step 2 Practice -> +100 XP
  const handleFinishPractice = () => {
    const updated = {
      ...profile,
      xp: profile.xp + 100,
    };
    onUpdateProfile(updated);
    setActiveStep(3);
  };

  // Finish Challenge Arena
  const handleFinishChallenge = () => {
    setChallengeFinished(true);
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    topic.challengeQuestions.forEach((q, idx) => {
      const userAns = challengeAnswers[idx];
      if (userAns === undefined) {
        skipped++;
      } else if (userAns === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    // Scoring: +1 per correct, -0.25 per wrong
    const net = Math.max(0, Number((correct * 1 - wrong * 0.25).toFixed(2)));
    setChallengeScore({ correct, wrong, skipped, netScore: net });

    // Award Challenge XP (+150 XP, +500 if Perfect 25!)
    let bonusXp = 150;
    const newBadges = [...profile.badgesEarned];
    if (correct === 25) {
      bonusXp += 500;
      if (!newBadges.includes('perfect-25')) {
        newBadges.push('perfect-25');
      }
    }

    const missions = [...profile.dailyMissions];
    const m2 = missions.find(m => m.id === 'm2');
    if (m2 && !m2.completed) {
      m2.current = 1;
      m2.completed = true;
      bonusXp += m2.rewardXp;
    }

    onUpdateProfile({
      ...profile,
      xp: profile.xp + bonusXp,
      badgesEarned: newBadges,
      topicScores: {
        ...profile.topicScores,
        [topic.id]: {
          ...profile.topicScores[topic.id],
          challengeBest: Math.max(net, profile.topicScores[topic.id]?.challengeBest || 0),
        },
      },
    });

    fireCelebrationConfetti();
  };

  // Submit Boss Battle
  const handleSelectBossAnswer = (optIndex: number) => {
    setBossAnswers(prev => ({ ...prev, [bossIndex]: optIndex }));
  };

  const handleEvaluateBoss = () => {
    let correct = 0;
    topic.bossQuestions.forEach((q, idx) => {
      if (bossAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = (correct / topic.bossQuestions.length) * 100;
    const passed = scorePct >= 80; // Must score 80% (4 out of 5)
    setBossSubmitted(true);
    setBossPassed(passed);

    if (passed) {
      fireCelebrationConfetti();
      const updatedCompleted = Array.from(new Set([...profile.completedTopicIds, topic.id]));
      const newBadges = [...profile.badgesEarned];
      if (!newBadges.includes('placement-beast') && updatedCompleted.length >= 5) {
        newBadges.push('placement-beast');
      }

      onUpdateProfile({
        ...profile,
        xp: profile.xp + 300, // +300 XP for Boss Battle victory
        completedTopicIds: updatedCompleted,
        badgesEarned: newBadges,
        topicScores: {
          ...profile.topicScores,
          [topic.id]: {
            ...profile.topicScores[topic.id],
            bossPassed: true,
          },
        },
      });

      if (onUnlockNextTopic) {
        onUnlockNextTopic(topic.id);
      }
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {topic.moduleName} • Topic {topic.order}
              </span>
              <span className="text-xs font-semibold text-slate-400">4-Step Journey</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
              {topic.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Steps Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-slate-100/80 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeStep === 1
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Step 1: 10m AI Learning</span>
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeStep === 2
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Step 2: Practice Zone (25 MCQs)</span>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeStep === 3
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Step 3: Challenge Arena (15m)</span>
          </button>

          <button
            onClick={() => setActiveStep(4)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeStep === 4
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Step 4: Boss Battle (MNC Tier)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* ================= STEP 1: 10-MIN AI LEARNING ================= */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Summary banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">10-Minute Concept Breakdown</h3>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {topic.learningContent.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated Interactive Concept Visualizer */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Animated Interactive Concept Simulator
                    </h4>
                  </div>
                  <span className="text-[11px] text-blue-400 font-semibold">Live Visual Matrix</span>
                </div>

                <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Input Base</p>
                      <p className="text-lg font-black text-blue-400 mt-1">100 Units</p>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Multiplier</p>
                      <p className="text-lg font-black text-amber-400 mt-1">× 1.25</p>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Effective Rate</p>
                      <p className="text-lg font-black text-emerald-400 mt-1">+25%</p>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Time Saved</p>
                      <p className="text-lg font-black text-purple-400 mt-1">45 Sec</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                    💡 <strong>Pro Shortcut:</strong> Replace multi-step equation solving with standard multiplying factors and LCM unit assignment. This eliminates fractional additions completely.
                  </p>
                </div>
              </div>

              {/* Key Formulas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Formulas & Short Tricks</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {topic.learningContent.keyFormulas.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
                      <p className="text-xs font-bold text-slate-700">{f.name}</p>
                      <p className="text-sm font-mono font-bold text-blue-700 mt-1 bg-white p-2 rounded-lg border border-slate-200/80">
                        {f.formula}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">{f.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked Examples */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Worked Industry Examples</h4>
                {topic.learningContent.workedExamples.map((ex, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <p className="text-sm font-bold text-slate-900">{ex.problem}</p>
                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/60 whitespace-pre-line font-mono">
                      {ex.solution}
                    </div>
                    <p className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                      <span>⚡ Exam Tip:</span> {ex.tip}
                    </p>
                  </div>
                ))}
              </div>

              {/* Industry Case & Infographics Takeaways */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                    🏢 Industry Case: {topic.learningContent.industryCase.company}
                  </h4>
                  <p className="text-xs text-indigo-950 leading-relaxed">
                    {topic.learningContent.industryCase.context}
                  </p>
                  <p className="text-xs font-bold text-indigo-700 pt-1">
                    Key Metric: {topic.learningContent.industryCase.keyTakeaway}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    📋 Cheat-Sheet Takeaways
                  </h4>
                  <ul className="text-xs text-emerald-950 space-y-1">
                    {topic.learningContent.infographicTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleFinishLearning}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-102"
                >
                  <span>Complete Learning (+50 XP) & Enter Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 2: PRACTICE ZONE ================= */}
          {activeStep === 2 && currentPracticeQ && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Practice Controls & Progress */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Difficulty Filter:</span>
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => {
                        setPracticeDifficulty(diff);
                        setPracticeIndex(0);
                        const targetList = (topic?.practiceQuestions || []).filter(q => diff === 'All' || q.difficulty === diff);
                        const firstQ = targetList[0];
                        setShowExplanation(firstQ ? practiceUserAnswers[firstQ.id] !== undefined : false);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                        practiceDifficulty === diff
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-bold text-slate-500">
                  Question {practiceIndex + 1} of {filteredPracticeQuestions.length}
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    currentPracticeQ.difficulty === 'Hard'
                      ? 'bg-rose-100 text-rose-700'
                      : currentPracticeQ.difficulty === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {currentPracticeQ.difficulty} Tier
                  </span>
                  {currentPracticeQ.companyTag && (
                    <span className="text-xs font-semibold text-slate-500">
                      Seen in: <strong className="text-slate-800">{currentPracticeQ.companyTag}</strong>
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentPracticeQ.question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5 pt-2">
                  {currentPracticeQ.options.map((opt, optIdx) => {
                    const isSelected = practiceUserAnswers[currentPracticeQ.id] === optIdx;
                    const isAnswered = practiceUserAnswers[currentPracticeQ.id] !== undefined;
                    const isCorrect = optIdx === currentPracticeQ.correctIndex;

                    let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                      } else {
                        btnStyle = 'border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectPracticeAnswer(optIdx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-800">Explanation & Shortcut</p>
                      {onOpenCoachWithContext && (
                        <button
                          onClick={() => onOpenCoachWithContext(`Can you explain this question from ${topic.name}: "${currentPracticeQ.question}"?`)}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Ask Coach Kapil</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-blue-950 leading-relaxed font-mono">
                      {currentPracticeQ.explanation}
                    </p>
                  </div>
                )}

              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={practiceIndex === 0}
                  onClick={() => {
                    const prevIdx = practiceIndex - 1;
                    setPracticeIndex(prevIdx);
                    const prevQ = filteredPracticeQuestions[prevIdx];
                    setShowExplanation(prevQ ? practiceUserAnswers[prevQ.id] !== undefined : false);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </button>

                {practiceIndex < filteredPracticeQuestions.length - 1 ? (
                  <button
                    onClick={() => {
                      const nextIdx = practiceIndex + 1;
                      setPracticeIndex(nextIdx);
                      const nextQ = filteredPracticeQuestions[nextIdx];
                      setShowExplanation(nextQ ? practiceUserAnswers[nextQ.id] !== undefined : false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    Next Question
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishPractice}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-105"
                  >
                    Finish Practice (+100 XP) & Go to Challenge Arena
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          )}

          {/* ================= STEP 3: CHALLENGE ARENA ================= */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {!challengeStarted && !challengeFinished && (
                <div className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-5 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-display">15-Minute Timed Challenge</h3>
                    <p className="text-xs text-slate-500 mt-1">25 Questions • Negative Marking (+1, -0.25) • Leaderboard Impact</p>
                  </div>
                  <div className="text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-200 text-left space-y-1.5">
                    <p>• <strong>Time:</strong> Strictly 15 minutes (countdown clock)</p>
                    <p>• <strong>Scoring:</strong> +1 for correct, -0.25 for incorrect, 0 for unattempted</p>
                    <p>• <strong>Reward:</strong> +150 XP base, +500 XP for Perfect 25!</p>
                  </div>
                  <button
                    onClick={() => {
                      setChallengeStarted(true);
                      setTimeLeftSeconds(15 * 60);
                    }}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    Start Timed Challenge Now
                  </button>
                </div>
              )}

              {challengeStarted && !challengeFinished && (
                <div className="space-y-5">
                  
                  {/* Timer & Live Status Bar */}
                  <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-semibold uppercase">Question:</span>
                      <span className="text-sm font-bold text-blue-400">
                        {challengeIndex + 1} / {topic.challengeQuestions.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                      <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className={`font-mono text-sm font-bold ${timeLeftSeconds < 120 ? 'text-rose-400' : 'text-slate-200'}`}>
                        {formatTimer(timeLeftSeconds)}
                      </span>
                    </div>

                    <button
                      onClick={handleFinishChallenge}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-all"
                    >
                      Submit Test
                    </button>
                  </div>

                  {/* Question Container */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {currentChallengeQ.question}
                    </h3>

                    <div className="space-y-2.5 pt-2">
                      {currentChallengeQ.options.map((opt, optIdx) => {
                        const isSelected = challengeAnswers[challengeIndex] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => setChallengeAnswers(prev => ({ ...prev, [challengeIndex]: optIdx }))}
                            className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question Palette 1-25 */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Question Navigation Palette</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.challengeQuestions.map((_, idx) => {
                        const isAnswered = challengeAnswers[idx] !== undefined;
                        const isCurrent = challengeIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setChallengeIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              isCurrent
                                ? 'ring-2 ring-blue-600 bg-blue-600 text-white'
                                : isAnswered
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between">
                    <button
                      disabled={challengeIndex === 0}
                      onClick={() => setChallengeIndex(prev => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      disabled={challengeIndex === topic.challengeQuestions.length - 1}
                      onClick={() => setChallengeIndex(prev => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-40"
                    >
                      Next Question
                    </button>
                  </div>

                </div>
              )}

              {challengeFinished && challengeScore && (
                <div className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-display">Challenge Completed!</h3>
                    <p className="text-xs text-slate-500 mt-1">Official PlacementVerse Challenge Assessment</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <p className="text-[10px] text-emerald-700 font-bold uppercase">Correct (+1)</p>
                      <p className="text-xl font-black text-emerald-900 mt-1">{challengeScore.correct}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                      <p className="text-[10px] text-rose-700 font-bold uppercase">Wrong (-0.25)</p>
                      <p className="text-xl font-black text-rose-900 mt-1">{challengeScore.wrong}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                      <p className="text-[10px] text-blue-700 font-bold uppercase">Net Score</p>
                      <p className="text-xl font-black text-blue-900 mt-1">{challengeScore.netScore} / 25</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStep(4)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Enter Final Step: Boss Battle!
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ================= STEP 4: BOSS BATTLE ================= */}
          {activeStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Boss Header Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white border border-amber-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Tier-1 MNC Boss Battle
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Target: ≥ 80% (4/5) To Unlock Next
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                      5 Tough Industry Questions
                    </h3>
                    <p className="text-xs text-slate-400">Curated from TCS Digital, Amazon SDE, Google, and Infosys InfyTQ</p>
                  </div>
                  <span className="text-sm font-extrabold text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/40">
                    Victory: +300 XP
                  </span>
                </div>
              </div>

              {!bossSubmitted ? (
                <div className="space-y-5">
                  
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        Boss Question {bossIndex + 1} of 5
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Company: <strong className="text-slate-900">{currentBossQ.companyTag}</strong>
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentBossQ.question}
                    </h4>

                    <div className="space-y-2.5 pt-2">
                      {currentBossQ.options.map((opt, optIdx) => {
                        const isSelected = bossAnswers[bossIndex] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectBossAnswer(optIdx)}
                            className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center justify-between">
                    <button
                      disabled={bossIndex === 0}
                      onClick={() => setBossIndex(prev => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {bossIndex < 4 ? (
                      <button
                        onClick={() => setBossIndex(prev => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleEvaluateBoss}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all hover:scale-102"
                      >
                        Submit Boss Battle & Verify Score!
                      </button>
                    )}
                  </div>

                </div>
              ) : (
                <div className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 max-w-lg mx-auto">
                  {bossPassed ? (
                    <>
                      <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 font-display">Boss Defeated! 🎉</h3>
                        <p className="text-xs text-slate-500 mt-1">Score: ≥ 80% • +300 XP Bonus Awarded</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                        ✓ Next topic in the learning path is now unlocked! Topic certificate is ready to print.
                      </div>
                      <button
                        onClick={onClose}
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
                      >
                        Continue to Learning Path
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                        <ShieldAlert className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 font-display">Boss Survived!</h3>
                        <p className="text-xs text-slate-500 mt-1">You must score at least 80% (4 out of 5) to unlock the next topic.</p>
                      </div>
                      <button
                        onClick={() => {
                          setBossSubmitted(false);
                          setBossIndex(0);
                          setBossAnswers({});
                        }}
                        className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Retry Boss Battle
                      </button>
                    </>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

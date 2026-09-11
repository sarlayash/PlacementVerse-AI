import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, CheckCircle2, AlertCircle, Award, Trophy, Sparkles, 
  Timer, ArrowRight, ArrowLeft, RotateCcw, Flag, ShieldCheck, 
  Printer, Share2, Calendar, Zap, Building2, Check,
  Target, BarChart3, HelpCircle
} from 'lucide-react';
import { LearnerProfile, FaangMockTest, FaangQuestion, MockTestAttempt, IssuedCertificateRecord } from '../types';
import { FAANG_MOCK_TESTS } from '../data/faangMockTestsData';
import { recordMockTestResult, fireCelebrationConfetti } from '../services/storageService';
import { getCertificateVerificationUrl } from '../services/certificateVerificationService';
import { CertificateVerificationModal } from './CertificateVerificationModal';

interface FaangMockTestsViewProps {
  profile: LearnerProfile;
  onUpdateProfile: (updated: LearnerProfile) => void;
  onViewCertificates?: () => void;
  onViewBadges?: () => void;
}

export const FaangMockTestsView: React.FC<FaangMockTestsViewProps> = ({
  profile,
  onUpdateProfile,
  onViewCertificates,
  onViewBadges,
}) => {
  // Active Test State
  const [activeTest, setActiveTest] = useState<FaangMockTest | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(60 * 60); // 1 Hour (3,600s)
  const [isTestSubmitting, setIsTestSubmitting] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Result & Review State
  const [completedAttempt, setCompletedAttempt] = useState<MockTestAttempt | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [activeCertificate, setActiveCertificate] = useState<IssuedCertificateRecord | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [verifyModalCode, setVerifyModalCode] = useState<string | null>(null);

  // Category Filtering: 'ALL' | 'TECHNICAL CORE' | '30-MIN RAPID SPRINT' | 'DAILY PRACTICE' | 'FAANG High-Bar'
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'TECHNICAL CORE' | '30-MIN RAPID SPRINT' | 'DAILY PRACTICE' | 'FAANG High-Bar'>('ALL');

  const filteredTests = useMemo(() => {
    if (selectedCategory === 'TECHNICAL CORE') {
      return FAANG_MOCK_TESTS.filter(t => t.category === 'TECHNICAL CORE');
    }
    if (selectedCategory === '30-MIN RAPID SPRINT') {
      return FAANG_MOCK_TESTS.filter(t => t.category === '30-MIN RAPID SPRINT');
    }
    if (selectedCategory === 'DAILY PRACTICE') {
      return FAANG_MOCK_TESTS.filter(t => t.category === 'DAILY PRACTICE');
    }
    if (selectedCategory === 'FAANG High-Bar') {
      return FAANG_MOCK_TESTS.filter(t => t.category === 'FAANG High-Bar' || !t.category);
    }
    return FAANG_MOCK_TESTS;
  }, [selectedCategory]);

  // Countdown to Today's Slot 1 (Wednesday, Sep 9, 2026, 10:00 AM IST)
  const [countdownString, setCountdownString] = useState<string>('01d 02h 15m');

  useEffect(() => {
    const updateCountdown = () => {
      // Calculate remaining time until Today 10:00 AM
      const now = new Date();
      const today10am = new Date(now);
      
      today10am.setHours(10, 0, 0, 0);
      
      const diffMs = Math.max(0, today10am.getTime() - now.getTime());
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      setCountdownString(`${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1-Hour Timer for Active Test
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeTest && !completedAttempt && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleAutoSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTest, completedAttempt, timeLeftSeconds]);

  // Start a test
  const handleStartTest = (test: FaangMockTest) => {
    setActiveTest(test);
    setCurrentQIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(test.durationMinutes * 60); // 3600 seconds = 1 hour
    setCompletedAttempt(null);
    setShowConfirmSubmit(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select an option
  const handleSelectOption = (qId: string, optIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optIndex
    }));
  };

  // Clear answer
  const handleClearAnswer = (qId: string) => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  // Toggle flag/review
  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Submit test calculation
  const handleFinishTest = () => {
    if (!activeTest) return;
    setIsTestSubmitting(true);

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    activeTest.questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) {
        skippedCount++;
      } else if (userAns === q.correctIndex) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const marksFromCorrect = correctCount * activeTest.marksPerQuestion; // +4
    const marksLostFromWrong = wrongCount * activeTest.negativeMark; // -1
    const netMarks = Math.max(0, marksFromCorrect - marksLostFromWrong);
    const maxMarks = activeTest.totalQuestions * activeTest.marksPerQuestion; // 100
    const percentage = Math.round((netMarks / maxMarks) * 100);
    const passed = percentage >= activeTest.passingPercentage;
    const timeSpent = (activeTest.durationMinutes * 60) - timeLeftSeconds;

    const certPrefix = activeTest.id.startsWith('daily-practice') 
      ? 'PV-DP' 
      : activeTest.id.startsWith('rapid-sprint') 
      ? 'PV-RS' 
      : activeTest.id.startsWith('mock-') 
      ? 'PV-TECH' 
      : 'PV-FAANG';
    const cleanTestCode = activeTest.id
      .replace('daily-practice-mock-', 'MOCK-')
      .replace('faang-mock-', 'MOCK-')
      .replace('rapid-sprint-mock-', 'RS-')
      .replace('mock-', 'TECH-')
      .toUpperCase();
    const certCode = `${certPrefix}-${cleanTestCode}-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;

    const attempt: MockTestAttempt = {
      testId: activeTest.id,
      completedAt: new Date().toISOString(),
      totalScore: netMarks,
      maxScore: maxMarks,
      percentage,
      correctCount,
      wrongCount,
      skippedCount,
      timeSpentSeconds: timeSpent,
      passed,
      userAnswers: answers,
      certificateCode: certCode
    };

    // Save and record in profile
    const { updatedProfile, certificate, newlyUnlockedBadge } = recordMockTestResult(
      profile,
      attempt,
      activeTest.badgeRewardId,
      activeTest.badgeRewardName,
      activeTest.certificateTitle
    );

    onUpdateProfile(updatedProfile);
    setCompletedAttempt(attempt);
    if (certificate) {
      setActiveCertificate(certificate);
    }
    setIsTestSubmitting(false);
    setShowConfirmSubmit(false);

    if (passed || newlyUnlockedBadge) {
      fireCelebrationConfetti();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAutoSubmitTest = () => {
    handleFinishTest();
  };

  // Format time remaining MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Format time spent string
  const formatTimeSpent = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  // Filtered questions for review
  const reviewQuestions = useMemo(() => {
    if (!activeTest || !completedAttempt) return [];
    return activeTest.questions.filter(q => {
      const ans = completedAttempt.userAnswers[q.id];
      if (reviewFilter === 'all') return true;
      if (reviewFilter === 'correct') return ans === q.correctIndex;
      if (reviewFilter === 'wrong') return ans !== undefined && ans !== q.correctIndex;
      if (reviewFilter === 'unattempted') return ans === undefined;
      return true;
    });
  }, [activeTest, completedAttempt, reviewFilter]);

  // Current active question
  const currentQuestion = activeTest?.questions[currentQIndex];

  // If candidate is actively taking a test:
  if (activeTest && !completedAttempt) {
    const answeredCount = Object.keys(answers).length;
    const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
    const isUrgent = timeLeftSeconds < 5 * 60; // Less than 5 minutes

    return (
      <div className="space-y-6">
        
        {/* Live Test Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-20 z-30 backdrop-blur-md bg-slate-900/95">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-black text-lg">
              {activeTest.companies[0].charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  1-Hour FAANG Placement Screening
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                  LIVE TEST
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white font-display">
                {activeTest.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            
            {/* 1-Hour Live Countdown Clock */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${
              isUrgent 
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse shadow-lg shadow-rose-900/50' 
                : 'bg-slate-800/90 border-slate-700 text-emerald-400'
            }`}>
              <Timer className={`w-5 h-5 ${isUrgent ? 'text-rose-400 animate-spin' : 'text-emerald-400'}`} />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Time Remaining</p>
                <p className="text-xl sm:text-2xl font-mono font-black tracking-wider leading-none mt-0.5">
                  {formatTime(timeLeftSeconds)}
                </p>
              </div>
            </div>

            {/* Finish & Submit Button */}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Submit Test</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Test Arena Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Question Viewer (3 Cols) */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Question Metainfo Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Question {currentQIndex + 1} of {activeTest.totalQuestions}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                  {currentQuestion?.section}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {currentQuestion?.companyTag}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+4 Correct</span>
                <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">-1 Negative</span>
              </div>
            </div>

            {/* Question Prompt */}
            {currentQuestion && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((optText, optIdx) => {
                    const isSelected = answers[currentQuestion.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-200'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="pt-0.5 leading-relaxed">{optText}</span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Actions & Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {currentQuestion && (
                  <>
                    <button
                      onClick={() => handleToggleFlag(currentQuestion.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        flaggedQuestions[currentQuestion.id]
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQuestion.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                      <span>{flaggedQuestions[currentQuestion.id] ? 'Flagged for Review' : 'Mark for Review'}</span>
                    </button>

                    {answers[currentQuestion.id] !== undefined && (
                      <button
                        onClick={() => handleClearAnswer(currentQuestion.id)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      >
                        Clear Response
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentQIndex < activeTest.totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(activeTest.totalQuestions - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Review & Submit</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Question Palette Sidebar (1 Col) */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Question Palette</span>
              <span className="text-[11px] font-bold text-slate-500">
                {answeredCount}/{activeTest.totalQuestions} Done
              </span>
            </h4>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(answeredCount / activeTest.totalQuestions) * 100}%` }}
              />
            </div>

            {/* Grid of 25 question bubbles */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {activeTest.questions.map((q, idx) => {
                const isCurrent = idx === currentQIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];

                let bgStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent';
                if (isAnswered && isFlagged) {
                  bgStyle = 'bg-purple-100 text-purple-900 border-purple-300 font-black';
                } else if (isFlagged) {
                  bgStyle = 'bg-amber-100 text-amber-900 border-amber-300 font-black';
                } else if (isAnswered) {
                  bgStyle = 'bg-emerald-600 text-white font-black shadow-xs';
                }

                if (isCurrent) {
                  bgStyle += ' ring-2 ring-indigo-600 ring-offset-2';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all border flex items-center justify-center relative ${bgStyle}`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 shrink-0" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border border-amber-300 shrink-0" />
                <span>Marked for Review ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-100 shrink-0" />
                <span>Not Visited ({activeTest.totalQuestions - answeredCount})</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Submit Final Exam</span>
              </button>
            </div>

          </div>

        </div>

        {/* Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 font-display">Ready to Submit Exam?</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Once submitted, your responses will be scored and your official FAANG readiness credential evaluated.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Answered</p>
                  <p className="text-sm font-black text-emerald-700">{answeredCount}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Review</p>
                  <p className="text-sm font-black text-amber-700">{flaggedCount}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Skipped</p>
                  <p className="text-sm font-black text-rose-700">{activeTest.totalQuestions - answeredCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Return to Test
                </button>
                <button
                  disabled={isTestSubmitting}
                  onClick={handleFinishTest}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                >
                  {isTestSubmitting ? 'Evaluating...' : 'Confirm Submission'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // If candidate just completed a test (Result & Diagnostic Screen):
  if (activeTest && completedAttempt) {
    const isPassed = completedAttempt.passed;

    return (
      <div className="space-y-8">
        
        {/* Score Card Hero */}
        <div className={`p-6 sm:p-8 rounded-3xl text-white shadow-xl border relative overflow-hidden ${
          isPassed 
            ? 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 border-emerald-700/50' 
            : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-slate-800'
        }`}>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Official FAANG Placement Evaluation
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  isPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {isPassed ? 'CLEARED • PLACEMENT QUALIFIED' : 'NEEDS IMPROVEMENT'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {activeTest.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {isPassed 
                  ? `Outstanding achievement! You scored ${completedAttempt.percentage}% and successfully cleared the high-bar benchmark. Your metallic badge and verified credential have been unlocked.`
                  : `You scored ${completedAttempt.percentage}%. The passing threshold is ${activeTest.passingPercentage}%. Study the detailed solutions below and retake to earn your certification.`}
              </p>
            </div>

            {/* Score Pill */}
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center shrink-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">Final Placement Score</p>
              <p className="text-4xl font-black text-white font-display mt-0.5">
                {completedAttempt.totalScore} <span className="text-xl font-normal text-slate-400">/ 100</span>
              </p>
              <p className="text-xs font-bold text-emerald-400 mt-1">
                {completedAttempt.percentage}% Marks ({completedAttempt.correctCount} Correct)
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400">Correct (+4)</p>
              <p className="text-base font-black text-emerald-400">{completedAttempt.correctCount} Qs</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400">Incorrect (-1)</p>
              <p className="text-base font-black text-rose-400">{completedAttempt.wrongCount} Qs</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400">Skipped (0)</p>
              <p className="text-base font-black text-slate-300">{completedAttempt.skippedCount} Qs</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400">Time Consumed</p>
              <p className="text-base font-black text-indigo-300">{formatTimeSpent(completedAttempt.timeSpentSeconds)}</p>
            </div>
          </div>
        </div>

        {/* Unlocked Credentials Banner */}
        {isPassed && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 border border-amber-300/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                {activeTest.badgeIcon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wide">Reward Unlocked</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    +1,000 XP Credited
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {activeTest.badgeRewardName} Metallic Badge & Verified Certificate
                </h4>
                <p className="text-xs text-slate-500">
                  Cryptographically signed by Kapil Narula. Add to your LinkedIn profile and campus resume.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Award className="w-4 h-4" />
                <span>View & Print Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* Detailed Solutions & Explanations Key */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Comprehensive Solutions & Shortcut Explanations</h3>
              <p className="text-xs text-slate-500">
                Detailed algorithmic analysis and interview insights for every single question.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['all', 'correct', 'wrong', 'unattempted'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setReviewFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    reviewFilter === filter
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Accordion */}
          <div className="space-y-4">
            {reviewQuestions.map((q, idx) => {
              const userAns = completedAttempt.userAnswers[q.id];
              const isCorrect = userAns === q.correctIndex;
              const isSkipped = userAns === undefined;

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : isSkipped
                      ? 'border-slate-200 bg-slate-50/30'
                      : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-black ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSkipped
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? '✓ Correct (+4)' : isSkipped ? '⚪ Skipped (0)' : '✗ Incorrect (-1)'}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {q.companyTag}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      Q{idx + 1} of {activeTest.totalQuestions}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-relaxed mb-4">
                    {q.question}
                  </h4>

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctIndex;
                      const isOptionSelected = userAns === oIdx;

                      let optStyle = 'border-slate-200 bg-white text-slate-600';
                      if (isOptionCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-400';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${optStyle}`}
                        >
                          <span className="w-5 h-5 rounded flex items-center justify-center font-bold bg-slate-100 text-slate-700 shrink-0 text-[10px]">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-step Technical Explanation */}
                  <div className="bg-slate-100/80 p-3.5 rounded-xl text-xs space-y-2 border border-slate-200">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                      Detailed Solution:
                    </p>
                    <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                      {q.explanation}
                    </p>
                    <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-indigo-700 font-semibold text-[11px]">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>FAANG Placement Insight: {q.shortcutOrInsight}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                setActiveTest(null);
                setCompletedAttempt(null);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to FAANG Hub</span>
            </button>

            <button
              onClick={() => handleStartTest(activeTest)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Mock Exam</span>
            </button>
          </div>

        </div>

        {/* Certificate Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Official Credential Preview
                  </span>
                </div>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  Close
                </button>
              </div>

              {/* Printable Certificate Canvas */}
              <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/40 border-8 border-double border-amber-600/30 text-center space-y-6 shadow-md relative">
                
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black text-amber-800 tracking-widest">Classrooms To Boardrooms Placement Readiness</p>
                    <p className="text-xs font-bold text-slate-600">FAANG Placement Certification Board • Powered By Kapil</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-500 font-bold">
                      {completedAttempt.certificateCode}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold">VERIFIED AUTHENTIC</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Certificate of Placement Excellence
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                    {profile.name || 'Placement Candidate'}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    has officially conquered the high-bar 1-Hour technical placement evaluation for
                  </p>
                  <p className="text-base sm:text-lg font-black text-indigo-900">
                    {activeTest.certificateTitle}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto bg-amber-500/10 p-3 rounded-xl border border-amber-300/40 text-center">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-900">Score</p>
                    <p className="text-sm font-black text-amber-950">{completedAttempt.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-900">Target Companies</p>
                    <p className="text-sm font-black text-amber-950">{activeTest.companies.join(' & ')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-900">Issue Date</p>
                    <p className="text-sm font-black text-amber-950">{new Date().toISOString().split('T')[0]}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-amber-900/10 flex items-center justify-between text-left text-xs">
                  <div>
                    <p className="font-bold text-slate-900">Kapil Narula</p>
                    <p className="text-[10px] text-slate-600 font-semibold">Chief Learning Officer | Chief Ecosystem Architect | Founder</p>
                    <p className="text-[10px] text-slate-500">SarlaYash Learning Solutions LLP • Powered By SarlaYash Mission</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-amber-600/40 bg-amber-500/20 text-amber-800 flex items-center justify-center font-black text-xs text-center leading-tight">
                    OFFICIAL<br/>SEAL
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setVerifyModalCode(completedAttempt.certificateCode || 'PV-FAANG-VERIFIED')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential Live</span>
                </button>

                <button
                  onClick={() => {
                    const realUrl = getCertificateVerificationUrl(completedAttempt.certificateCode || 'PV-FAANG-VERIFIED');
                    navigator.clipboard.writeText(realUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Real Verification Link'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Certificate</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {verifyModalCode && (
          <CertificateVerificationModal
            isOpen={Boolean(verifyModalCode)}
            initialCode={verifyModalCode}
            onClose={() => setVerifyModalCode(null)}
          />
        )}

      </div>
    );
  }

  // Primary Mock Tests Hub: FAANG High-Bar + DAILY PRACTICE Categories
  return (
    <div className="space-y-8">
      
      {/* High-Impact Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                Scheduled for Today & Daily Practice
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                New Category: DAILY PRACTICE
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
              Placement Mock Tests & Daily Practice Zone
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Featuring 3 new DAILY PRACTICE sprint exams (10 unique MCQs each) alongside 3 comprehensive 1-hour FAANG OA diagnostics. All questions are strictly non-repeated with negative marking and instant credentialing.
            </p>
          </div>

          {/* Today Live Countdown Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
            <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Today's First Slot Opens In</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-white mt-1">
              {countdownString}
            </p>
            <p className="text-[11px] text-slate-300 mt-1">
              Wednesday, Sep 9, 2026 • 10:00 AM IST
            </p>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Timer className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>20m, 30m & 60m Options</strong> (Active Timers)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span><strong>10 & 25 Unique Qs</strong> (+4 / -1 Marking)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>8 Metallic Badges</strong> (+1,000 XP Each)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span><strong>Verified Certificates</strong> (Zero Repetition)</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600">Category Selection</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-500 font-medium">
              {filteredTests.length} {filteredTests.length === 1 ? 'Exam' : 'Exams'} Available
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 font-display mt-0.5">
            {selectedCategory === 'TECHNICAL CORE'
              ? '💻 Category: TECHNICAL CORE (5 Mocks: C, C++, Java, Python, DSA • 10 MCQs Each)'
              : selectedCategory === '30-MIN RAPID SPRINT'
              ? '⚡ Category: 30-MIN RAPID SPRINT (2 High-Yield Mock Exams • 25 MCQs • 30 Mins Each)'
              : selectedCategory === 'DAILY PRACTICE' 
              ? '⚡ Category: DAILY PRACTICE (3 Mock Exams • 10 MCQs • 20 Mins Each)' 
              : selectedCategory === 'FAANG High-Bar'
              ? '🏛️ Category: FAANG High-Bar (3 Mock Exams • 25 MCQs • 60 Mins Each)'
              : `🌟 All Placement Mock Exams (${FAANG_MOCK_TESTS.length} Total)`}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            All Mocks ({FAANG_MOCK_TESTS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('TECHNICAL CORE')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
              selectedCategory === 'TECHNICAL CORE'
                ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-md'
                : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <span>💻 TECHNICAL CORE</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-blue-600 text-white uppercase tracking-widest">
              C, C++, Java, Py, DSA (5)
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('30-MIN RAPID SPRINT')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
              selectedCategory === '30-MIN RAPID SPRINT'
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-zinc-900 text-white shadow-md'
                : 'bg-red-50 text-red-900 border border-red-200 hover:bg-red-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>RAPID SPRINT</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-600 text-white uppercase tracking-widest">
              25 Qs • 30M
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('DAILY PRACTICE')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
              selectedCategory === 'DAILY PRACTICE'
                ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-md'
                : 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>DAILY PRACTICE</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 uppercase tracking-widest">
              10 Qs
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('FAANG High-Bar')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'FAANG High-Bar'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <span>FAANG High-Bar</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-200 text-slate-700">
              25 Qs
            </span>
          </button>
        </div>
      </div>

      {/* Mock Test Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTests.map((test, index) => {
          const attempt = profile.mockTestAttempts?.[test.id];
          const isPassed = attempt?.passed;
          const isTechnicalCore = test.category === 'TECHNICAL CORE';
          const isDailyPractice = test.category === 'DAILY PRACTICE';
          const isRapidSprint = test.category === '30-MIN RAPID SPRINT';

          return (
            <div
              key={test.id}
              className={`bg-white rounded-3xl border transition-all flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                isPassed 
                  ? 'border-emerald-300 ring-2 ring-emerald-100' 
                  : isTechnicalCore
                  ? 'border-blue-200 hover:border-indigo-400 ring-1 ring-blue-50'
                  : isRapidSprint
                  ? 'border-red-200 hover:border-red-400 ring-1 ring-red-100'
                  : isDailyPractice
                  ? 'border-amber-200 hover:border-amber-300'
                  : 'border-slate-200'
              }`}
            >
              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider ${
                      isTechnicalCore
                        ? 'bg-blue-100 text-blue-900 border border-blue-300'
                        : isRapidSprint
                        ? 'bg-red-100 text-red-900 border border-red-300'
                        : isDailyPractice
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}>
                      {isTechnicalCore
                        ? test.badgeIcon + ' ' + (test.title.split(' ')[0] || 'Core')
                        : isRapidSprint 
                        ? `Rapid Mock ${test.id === 'rapid-mock-4' ? 'I' : 'II'}` 
                        : isDailyPractice 
                        ? `Daily Mock ${index + 1}` 
                        : `FAANG Mock ${index + 1}`}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                      isTechnicalCore
                        ? 'bg-blue-700 text-white'
                        : isRapidSprint
                        ? 'bg-red-600 text-white'
                        : isDailyPractice 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {test.totalQuestions} MCQs • {test.durationMinutes}m
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {test.companies.slice(0, 3).map(c => (
                      <span key={c} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-display leading-snug">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {test.subtitle}
                  </p>
                </div>

                {/* Slot Timing */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{test.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                    <span>⏱️ {test.durationMinutes} Mins</span>
                    <span>•</span>
                    <span>📝 {test.totalQuestions} Questions ({test.totalQuestions * test.marksPerQuestion} Marks)</span>
                    <span>•</span>
                    <span>⚖️ +{test.marksPerQuestion} / -{test.negativeMark}</span>
                  </div>
                </div>

                {/* Syllabus Highlights */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    {isDailyPractice ? 'Daily Practice Syllabus' : 'High-Bar Screening Topics'}
                  </p>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    {test.syllabusHighlights.slice(0, 4).map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5 leading-snug">
                        <span className={`font-black ${isDailyPractice ? 'text-amber-600' : 'text-indigo-600'}`}>•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reward Preview */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{test.badgeIcon}</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Reward Badge</p>
                      <p className="font-bold text-slate-800">{test.badgeRewardName} (+1,000 XP)</p>
                    </div>
                  </div>
                  {isPassed && (
                    <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Earned
                    </span>
                  )}
                </div>

              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0">
                {attempt ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-slate-500">Previous Attempt:</span>
                      <span className={`font-black ${isPassed ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {attempt.totalScore}/{test.totalQuestions * test.marksPerQuestion} ({attempt.percentage}%)
                      </span>
                    </div>
                    <button
                      onClick={() => handleStartTest(test)}
                      className={`w-full py-3 rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                        isPassed 
                          ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <span>{isPassed ? 'Retake Exam' : 'Retake to Qualify'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartTest(test)}
                    className={`w-full py-3 rounded-2xl text-white text-xs font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      isDailyPractice
                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:opacity-95'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                    }`}
                  >
                    <span>Enter {test.durationMinutes}-Min Test Arena</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Preparation Advice Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">FAANG Placement Strategy</h4>
            <p className="text-xs text-slate-500">
              Each test features negative marking (-1). Skip questions if your confidence is low. Scoring ≥60% instantly issues your verified certificate and metallic badge.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onViewBadges && (
            <button
              onClick={onViewBadges}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
            >
              View Badges
            </button>
          )}
          {onViewCertificates && (
            <button
              onClick={onViewCertificates}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
            >
              Certificates Vault
            </button>
          )}
        </div>
      </div>

    </div>
  );
};


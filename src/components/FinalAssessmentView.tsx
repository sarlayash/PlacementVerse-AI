import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Timer, Award, CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  ChevronLeft, ChevronRight, Bookmark, ArrowRight, RotateCcw, 
  Sparkles, Zap, ShieldAlert, BarChart3, Search, Clock, 
  ExternalLink, Check, AlertCircle, FileText, Share2, Layers
} from 'lucide-react';
import { LearnerProfile, FinalAssessmentAttempt, FinalAssessmentQuestion, IssuedCertificateRecord } from '../types';
import { 
  FINAL_ASSESSMENT_QUESTIONS, 
  FINAL_ASSESSMENT_SECTIONS, 
  FINAL_ASSESSMENT_DURATION_SECONDS,
  FinalAssessmentSectionMeta
} from '../data/finalAssessment';
import { 
  recordFinalAssessmentAttempt, 
  getFinalAssessmentAttempts, 
  fireCelebrationConfetti,
  playNotificationChime
} from '../services/storageService';

interface FinalAssessmentViewProps {
  profile: LearnerProfile;
  onUpdateProfile: (updated: LearnerProfile) => void;
  onViewCertificates?: () => void;
}

export const FinalAssessmentView: React.FC<FinalAssessmentViewProps> = ({
  profile,
  onUpdateProfile,
  onViewCertificates
}) => {
  // Assessment State
  const [assessmentStatus, setAssessmentStatus] = useState<'intro' | 'active' | 'review'>('intro');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(FINAL_ASSESSMENT_DURATION_SECONDS);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [latestAttempt, setLatestAttempt] = useState<FinalAssessmentAttempt | null>(null);
  const [issuedCert, setIssuedCert] = useState<IssuedCertificateRecord | null>(null);

  // Palette filtering & jump
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'answered' | 'unanswered' | 'review'>('all');
  const [paletteSectionFilter, setPaletteSectionFilter] = useState<string>('all');
  const [jumpInput, setJumpInput] = useState<string>('');

  // Review screen filter
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'skipped'>('all');

  // Load past attempt if any
  useEffect(() => {
    const attempts = getFinalAssessmentAttempts();
    if (attempts && attempts.length > 0) {
      setLatestAttempt(attempts[0]);
    }
  }, []);

  // 90-Minute Timer Interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (assessmentStatus === 'active') {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          // Warning chime when 10 minutes (600s) remain
          if (prev === 600) {
            playNotificationChime();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [assessmentStatus]);

  // Keyboard navigation for exam efficiency
  useEffect(() => {
    if (assessmentStatus !== 'active') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in the jump input
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' && currentIndex < FINAL_ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        const currentQ = FINAL_ASSESSMENT_QUESTIONS[currentIndex];
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
      } else if (e.key.toLowerCase() === 'm') {
        const currentQ = FINAL_ASSESSMENT_QUESTIONS[currentIndex];
        setMarkedForReview(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [assessmentStatus, currentIndex]);

  // Formatted Timer string (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Assessment
  const handleStartAssessment = () => {
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTimeRemaining(FINAL_ASSESSMENT_DURATION_SECONDS);
    setAssessmentStatus('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit and compute final score
  const handleSubmitAssessment = () => {
    setShowSubmitModal(false);
    calculateAndRecordResults();
  };

  const handleAutoSubmit = () => {
    setShowSubmitModal(false);
    calculateAndRecordResults();
  };

  const calculateAndRecordResults = () => {
    const totalQuestions = FINAL_ASSESSMENT_QUESTIONS.length;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const sectionScores: Record<string, { correct: number; wrong: number; skipped: number; score: number; total: number }> = {};

    FINAL_ASSESSMENT_SECTIONS.forEach(sec => {
      sectionScores[sec.name] = { correct: 0, wrong: 0, skipped: 0, score: 0, total: sec.total };
    });

    FINAL_ASSESSMENT_QUESTIONS.forEach(q => {
      const selected = userAnswers[q.id];
      const secName = q.section;
      if (!sectionScores[secName]) {
        sectionScores[secName] = { correct: 0, wrong: 0, skipped: 0, score: 0, total: 50 };
      }

      if (selected === undefined) {
        skippedCount++;
        sectionScores[secName].skipped++;
      } else if (selected === q.correctIndex) {
        correctCount++;
        sectionScores[secName].correct++;
        sectionScores[secName].score += 4;
      } else {
        wrongCount++;
        sectionScores[secName].wrong++;
        sectionScores[secName].score -= 1; // Negative marking
      }
    });

    // Scoring scheme: +4 for correct, -1 for wrong, 0 for skipped. Max score = 1000.
    const totalScore = (correctCount * 4) - (wrongCount * 1);
    const maxScore = totalQuestions * 4; // 1000
    const rawPercentage = Math.max(0, (totalScore / maxScore) * 100);
    const passed = rawPercentage >= 70; // 70% passing threshold
    const timeSpent = FINAL_ASSESSMENT_DURATION_SECONDS - timeRemaining;

    const attempt: FinalAssessmentAttempt = {
      attemptId: `final-att-${Date.now()}`,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
      totalScore,
      maxScore,
      percentage: rawPercentage,
      correctCount,
      wrongCount,
      skippedCount,
      passed,
      userAnswers,
      sectionScores,
      certificateCode: passed ? `PV-FINAL-250Q-${Math.floor(100000 + Math.random() * 900000)}` : undefined
    };

    const res = recordFinalAssessmentAttempt(attempt, profile);
    onUpdateProfile(res.updatedProfile);
    setLatestAttempt(attempt);
    if (res.certificate) {
      setIssuedCert(res.certificate);
    }
    setAssessmentStatus('review');

    if (passed) {
      fireCelebrationConfetti();
      playNotificationChime();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stats computation for active exam
  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const currentQuestion = FINAL_ASSESSMENT_QUESTIONS[currentIndex];
  const currentSection = FINAL_ASSESSMENT_SECTIONS.find(
    s => (currentIndex + 1) >= s.startQuestion && (currentIndex + 1) <= s.endQuestion
  ) || FINAL_ASSESSMENT_SECTIONS[0];

  // Quick jump by number
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= FINAL_ASSESSMENT_QUESTIONS.length) {
      setCurrentIndex(num - 1);
      setJumpInput('');
    }
  };

  // Filtered Question Palette
  const filteredPaletteIndices = useMemo(() => {
    return FINAL_ASSESSMENT_QUESTIONS.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
      // Section filter
      if (paletteSectionFilter !== 'all' && q.section !== paletteSectionFilter) {
        return false;
      }
      const isAnswered = userAnswers[q.id] !== undefined;
      const isMarked = !!markedForReview[q.id];

      if (paletteFilter === 'answered') return isAnswered;
      if (paletteFilter === 'unanswered') return !isAnswered;
      if (paletteFilter === 'review') return isMarked;
      return true;
    });
  }, [paletteFilter, paletteSectionFilter, userAnswers, markedForReview]);

  // Section progress stats
  const sectionStats = useMemo(() => {
    return FINAL_ASSESSMENT_SECTIONS.map(sec => {
      const qInRange = FINAL_ASSESSMENT_QUESTIONS.slice(sec.startQuestion - 1, sec.endQuestion);
      const answeredInSec = qInRange.filter(q => userAnswers[q.id] !== undefined).length;
      return {
        ...sec,
        answered: answeredInSec,
        pct: Math.round((answeredInSec / sec.total) * 100)
      };
    });
  }, [userAnswers]);

  // Timer warning classes
  const isTimeCritical = timeRemaining <= 600; // < 10 mins
  const isTimeUrgent = timeRemaining <= 300; // < 5 mins

  // ==========================================
  // RENDER: INTRODUCTION / SUMMARY DASHBOARD
  // ==========================================
  if (assessmentStatus === 'intro') {
    return (
      <div className="space-y-8">
        
        {/* Hero Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl p-6 sm:p-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white flex items-center gap-1.5 animate-pulse shadow-md shadow-rose-500/20">
                <ShieldAlert className="w-3.5 h-3.5" />
                Very Hard Difficulty
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                250 Comprehensive Questions
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                90-Minute Strict Timer (1000 Marks)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-3">
              The Grand Placement Final Assessment
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
              The definitive, high-bar evaluation designed by Placement Director Kapil Narula. Spans five foundational engineering pillars with rigorous +4 / -1 marking. Passing unlocks the verified, cryptographic <strong className="text-white">Grand Placement Master Credential</strong>.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-xs text-slate-400 font-semibold mb-1">Total Questions</div>
                <div className="text-2xl sm:text-3xl font-black text-white">250 Qs</div>
                <div className="text-[11px] text-slate-400 mt-0.5">5 Distinct Sections</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-xs text-slate-400 font-semibold mb-1">Time Limit</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">90 Mins</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Strict Countdown (5400s)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-xs text-slate-400 font-semibold mb-1">Scoring System</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">1000 Pts</div>
                <div className="text-[11px] text-slate-400 mt-0.5">+4 Correct / -1 Wrong</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="text-xs text-slate-400 font-semibold mb-1">Passing Cut-off</div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-400">70% (700m)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Elite FAANG Benchmark</div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="start-final-assessment-btn"
                onClick={handleStartAssessment}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white font-black text-base shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                <span>Launch 90-Minute Assessment (250 Questions)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {latestAttempt && (
                <button
                  id="view-last-attempt-btn"
                  onClick={() => setAssessmentStatus('review')}
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-300" />
                  <span>View Previous Attempt ({Math.round(latestAttempt.percentage)}%)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section Matrix Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Examination Architecture (5 Pillars • 50 Questions Each)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Each section is modeled after top-tier FAANG screening benchmarks.
              </p>
            </div>
            <span className="hidden sm:inline-flex text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              Total: 250 Questions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINAL_ASSESSMENT_SECTIONS.map((sec, idx) => (
              <div 
                key={sec.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Section 0{idx + 1}
                    </span>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Q{sec.startQuestion} - Q{sec.endQuestion} (50 Qs)
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-1.5">
                    {sec.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sec.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Weightage: 200 Marks</span>
                  <span className="text-emerald-600">+4 / -1 Scheme</span>
                </div>
              </div>
            ))}

            {/* Credential Bonus Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-700 text-xs font-black uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Grand Certification
                </div>
                <h4 className="font-extrabold text-slate-900 text-base mb-1.5">
                  Official Verification & Badge
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scoring ≥70% automatically issues a cryptographic certificate signed by Director Kapil Narula and unlocks the prestigious <strong className="text-slate-900">Grand FAANG Master</strong> metallic badge (+3500 XP).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-bold text-amber-900">
                <span>Cut-off: 700 / 1000</span>
                <span>Cryptographic QR Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Protocol Guidelines */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            Standard Examination Protocol & Best Practices
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Time Allocation:</strong> 90 minutes for 250 questions implies an average of ~21.6 seconds per question. Skip lengthy calculations and return to them using the Question Palette.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Negative Marking Caution:</strong> Every incorrect answer penalizes -1 mark. Unattempted questions incur 0 penalty. Guess selectively.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Keyboard Accelerators:</strong> Use Left/Right Arrow keys to jump questions, numbers [1, 2, 3, 4] to mark options, and [M] to toggle Mark for Review.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Auto-Submission:</strong> When the 90-minute countdown expires, your responses will be submitted automatically without data loss.</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: ACTIVE 90-MINUTE EXAM VIEW
  // ==========================================
  if (assessmentStatus === 'active') {
    return (
      <div className="space-y-4 select-none pb-12">
        
        {/* Sticky Exam Control Bar */}
        <div className="sticky top-16 sm:top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
              Q{currentIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900">
                  Question {currentIndex + 1} of 250
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {currentSection.name}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span>Progress: {answeredCount}/250 answered</span>
                {reviewCount > 0 && <span className="text-purple-600">• {reviewCount} marked for review</span>}
              </div>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono font-black text-sm sm:text-base border transition-all ${
              isTimeUrgent
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md shadow-rose-500/30'
                : isTimeCritical
                ? 'bg-amber-50 text-amber-700 border-amber-300 animate-pulse'
                : 'bg-slate-900 text-emerald-400 border-slate-800'
            }`}>
              <Clock className={`w-4 h-4 ${isTimeUrgent ? 'text-white' : isTimeCritical ? 'text-amber-600' : 'text-emerald-400'}`} />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <button
              id="submit-exam-early-btn"
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Section Jump Navigator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {FINAL_ASSESSMENT_SECTIONS.map((sec, idx) => {
            const isCurrentSec = currentSection.id === sec.id;
            const stat = sectionStats.find(s => s.id === sec.id);
            return (
              <button
                key={sec.id}
                onClick={() => setCurrentIndex(sec.startQuestion - 1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrentSec
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>Sec {idx + 1}: {sec.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isCurrentSec ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {stat?.answered || 0}/50
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Examination Grid: Question Container + Question Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Question Display (8 Columns on desktop) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative">
              
              {/* Question Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {currentQuestion.section}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Topic: {currentQuestion.domainTag}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <span className="text-emerald-600">+4.0</span> / <span className="text-rose-500">-1.0</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                  {currentQuestion.question}
                </h3>

                {/* Optional Code Snippet */}
                {currentQuestion.codeSnippet && (
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                    <code>{currentQuestion.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestion.id] === optIdx;
                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <div
                      key={optIdx}
                      onClick={() => {
                        setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: optIdx }));
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected 
                          ? 'bg-indigo-50/80 border-indigo-600 shadow-xs ring-2 ring-indigo-500/20' 
                          : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {letter}
                      </div>

                      <div className="flex-1 pt-0.5">
                        <span className={`text-sm leading-relaxed ${isSelected ? 'font-bold text-indigo-950' : 'text-slate-800'}`}>
                          {opt}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                        [{optIdx + 1}]
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Toolbar */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMarkedForReview(prev => ({
                        ...prev,
                        [currentQuestion.id]: !prev[currentQuestion.id]
                      }));
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      markedForReview[currentQuestion.id]
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark for Review [M]'}</span>
                  </button>

                  {userAnswers[currentQuestion.id] !== undefined && (
                    <button
                      onClick={() => {
                        setUserAnswers(prev => {
                          const updated = { ...prev };
                          delete updated[currentQuestion.id];
                          return updated;
                        });
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    disabled={currentIndex === FINAL_ASSESSMENT_QUESTIONS.length - 1}
                    onClick={() => setCurrentIndex(prev => Math.min(FINAL_ASSESSMENT_QUESTIONS.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 250-Question Interactive Palette (4 Columns on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm sticky top-36">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Question Palette (250)
                </h4>
                <div className="text-[11px] font-bold text-slate-500">
                  {answeredCount} / 250 Answered
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-100 mb-3 text-[11px] font-bold">
                <button
                  onClick={() => setPaletteFilter('all')}
                  className={`py-1 rounded-lg transition-all ${paletteFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
                >
                  All (250)
                </button>
                <button
                  onClick={() => setPaletteFilter('answered')}
                  className={`py-1 rounded-lg transition-all ${paletteFilter === 'answered' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Done ({answeredCount})
                </button>
                <button
                  onClick={() => setPaletteFilter('unanswered')}
                  className={`py-1 rounded-lg transition-all ${paletteFilter === 'unanswered' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Left ({250 - answeredCount})
                </button>
                <button
                  onClick={() => setPaletteFilter('review')}
                  className={`py-1 rounded-lg transition-all ${paletteFilter === 'review' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Flag ({reviewCount})
                </button>
              </div>

              {/* Jump directly to question input */}
              <form onSubmit={handleJumpSubmit} className="flex gap-2 mb-3">
                <input
                  type="number"
                  min="1"
                  max="250"
                  placeholder="Jump to Q# (1-250)..."
                  value={jumpInput}
                  onChange={e => setJumpInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Go
                </button>
              </form>

              {/* Question Number Badges Palette Grid (scrollable) */}
              <div className="max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-5 gap-1.5">
                  {filteredPaletteIndices.map(({ q, idx }) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isMarked = !!markedForReview[q.id];
                    const isCurrent = idx === currentIndex;

                    let bgClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                    if (isMarked && isAnswered) {
                      bgClass = 'bg-purple-600 text-white border-purple-700 font-black';
                    } else if (isMarked) {
                      bgClass = 'bg-purple-100 text-purple-800 border-purple-300 font-black';
                    } else if (isAnswered) {
                      bgClass = 'bg-emerald-600 text-white border-emerald-700 font-black shadow-xs';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-8 rounded-lg text-[11px] font-mono font-bold border transition-all flex items-center justify-center cursor-pointer ${bgClass} ${
                          isCurrent ? 'ring-2 ring-blue-500 ring-offset-1 scale-105 z-10' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-600 shrink-0" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300 shrink-0" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-purple-600 shrink-0" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded ring-2 ring-blue-500 shrink-0" />
                  <span>Current Question</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">
                Submit Grand Final Assessment?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                You are about to finalize your 90-minute examination. Review your tally before submission:
              </p>

              <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 text-center">
                <div>
                  <div className="text-lg font-black text-emerald-600">{answeredCount}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Answered</div>
                </div>
                <div>
                  <div className="text-lg font-black text-slate-500">{250 - answeredCount}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Skipped</div>
                </div>
                <div>
                  <div className="text-lg font-black text-purple-600">{reviewCount}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Marked</div>
                </div>
              </div>

              <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Time Remaining: <strong>{formatTime(timeRemaining)}</strong></span>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all cursor-pointer"
                >
                  Continue Reviewing
                </button>
                <button
                  id="confirm-submit-exam-btn"
                  onClick={handleSubmitAssessment}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: RESULTS & COMPREHENSIVE REVIEW
  // ==========================================
  const attemptToDisplay = latestAttempt;

  if (!attemptToDisplay) {
    return null;
  }

  // Filtered review questions
  const filteredReviewQuestions = FINAL_ASSESSMENT_QUESTIONS.filter(q => {
    const userChoice = attemptToDisplay.userAnswers[q.id];
    if (reviewFilter === 'wrong') return userChoice !== undefined && userChoice !== q.correctIndex;
    if (reviewFilter === 'correct') return userChoice === q.correctIndex;
    if (reviewFilter === 'skipped') return userChoice === undefined;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Result Hero Banner */}
      <div className={`p-6 sm:p-10 rounded-3xl text-white border shadow-2xl relative overflow-hidden ${
        attemptToDisplay.passed
          ? 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 border-emerald-800/80'
          : 'bg-gradient-to-br from-slate-950 via-rose-950 to-slate-900 border-rose-800/80'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                attemptToDisplay.passed
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white'
              }`}>
                {attemptToDisplay.passed ? '🎉 Passed Final Assessment' : 'Needs Practice (Below 70%)'}
              </span>
              <span className="text-xs font-bold text-slate-300">
                Completed on {new Date(attemptToDisplay.completedAt).toLocaleDateString()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
              {attemptToDisplay.passed 
                ? 'Grand Placement Assessment Cleared!' 
                : 'Grand Final Assessment Results'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {attemptToDisplay.passed
                ? 'Congratulations! You have demonstrated exceptional high-bar competency across Quantitative Aptitude, Algorithmic Reasoning, CS Core Systems, Advanced DSA, and Architecture.'
                : 'The 250-Question Final Assessment tests strict FAANG-bar depth. Review the step-by-step master shortcuts below to eliminate weak spots and re-attempt when ready.'}
            </p>
          </div>

          {/* Big Score Card */}
          <div className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center min-w-[200px] shrink-0">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Final Scaled Score
            </div>
            <div className="text-4xl sm:text-5xl font-black font-display text-white">
              {attemptToDisplay.totalScore}
              <span className="text-lg sm:text-xl font-normal text-slate-400">/1000</span>
            </div>
            <div className="text-sm font-bold text-emerald-400 mt-1">
              {Math.round(attemptToDisplay.percentage)}% Normalized Score
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Time: {Math.round(attemptToDisplay.timeSpentSeconds / 60)}m / 90m
            </div>
          </div>
        </div>

        {/* Certificate Claim Button if passed */}
        {attemptToDisplay.passed && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-amber-300">
                Official Credential Issued: <strong>{attemptToDisplay.certificateCode}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {onViewCertificates && (
                <button
                  onClick={onViewCertificates}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4 Score Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">Correct Answers</div>
          <div className="text-2xl font-black text-emerald-600">{attemptToDisplay.correctCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">+{attemptToDisplay.correctCount * 4} Marks</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">Incorrect Answers</div>
          <div className="text-2xl font-black text-rose-600">{attemptToDisplay.wrongCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">-{attemptToDisplay.wrongCount * 1} Negative Marks</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">Unattempted / Skipped</div>
          <div className="text-2xl font-black text-slate-600">{attemptToDisplay.skippedCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">0 Marks Penalty</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-500 mb-1">Accuracy Ratio</div>
          <div className="text-2xl font-black text-indigo-600">
            {attemptToDisplay.correctCount + attemptToDisplay.wrongCount > 0 
              ? `${Math.round((attemptToDisplay.correctCount / (attemptToDisplay.correctCount + attemptToDisplay.wrongCount)) * 100)}%`
              : '0%'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Precision on Attempted</div>
        </div>
      </div>

      {/* Section-by-Section Performance Breakdown */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span>Section-Wise Performance Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FINAL_ASSESSMENT_SECTIONS.map((sec, idx) => {
            const secData = attemptToDisplay.sectionScores?.[sec.name] || {
              correct: 0,
              wrong: 0,
              skipped: 0,
              score: 0,
              total: 50
            };
            const secPct = Math.max(0, Math.round((secData.score / 200) * 100));

            return (
              <div key={sec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-extrabold text-slate-900">
                    Sec {idx + 1}: {sec.name.split('&')[0]}
                  </span>
                  <span className={`font-black ${secPct >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {secData.score} / 200 pts
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full ${secPct >= 70 ? 'bg-emerald-500' : secPct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${Math.min(100, Math.max(0, secPct))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="text-emerald-700">{secData.correct} Correct</span>
                  <span className="text-rose-700">{secData.wrong} Wrong</span>
                  <span className="text-slate-600">{secData.skipped} Skipped</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Retake CTA or View Details */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-100 border border-slate-200">
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            Ready to challenge the 250 Questions again?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            You can retake the assessment to improve your score or earn the Grand FAANG Master distinction.
          </p>
        </div>

        <button
          onClick={handleStartAssessment}
          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake 90-Minute Assessment</span>
        </button>
      </div>

      {/* Question-by-Question Solution Browser */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Complete Question Review & Master Explanations (250 Questions)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review correct mathematical formulas, systems rationale, and shortcuts for every problem.
            </p>
          </div>

          {/* Review Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${reviewFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              All (250)
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg transition-all ${reviewFilter === 'wrong' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
            >
              Incorrect ({attemptToDisplay.wrongCount})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-lg transition-all ${reviewFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
            >
              Correct ({attemptToDisplay.correctCount})
            </button>
            <button
              onClick={() => setReviewFilter('skipped')}
              className={`px-3 py-1.5 rounded-lg transition-all ${reviewFilter === 'skipped' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-600'}`}
            >
              Skipped ({attemptToDisplay.skippedCount})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredReviewQuestions.map((q) => {
            const userChoice = attemptToDisplay.userAnswers[q.id];
            const isCorrect = userChoice === q.correctIndex;
            const isSkipped = userChoice === undefined;

            return (
              <div 
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-white border-emerald-200/80 shadow-xs'
                    : isSkipped
                    ? 'bg-white border-slate-200/80'
                    : 'bg-white border-rose-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg text-xs font-mono font-black flex items-center justify-center ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : isSkipped
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      Q{q.questionNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {q.section} • {q.domainTag}
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isCorrect
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : isSkipped
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : isSkipped ? <HelpCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? '+4.0 Correct' : isSkipped ? 'Skipped (0)' : '-1.0 Incorrect'}</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed mb-4 whitespace-pre-line">
                  {q.question}
                </p>

                {/* Options Review */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = userChoice === optIdx;
                    const isRightOption = q.correctIndex === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                    if (isRightOption) {
                      optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isUserPick && !isRightOption) {
                      optClass = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                    }

                    return (
                      <div 
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${optClass}`}
                      >
                        <span className="font-mono font-bold shrink-0">{letter}.</span>
                        <span className="flex-1">{opt}</span>
                        {isRightOption && <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Correct Answer</span>}
                        {isUserPick && !isRightOption && <span className="text-[10px] font-black text-rose-700 uppercase tracking-wider">Your Selection</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Comprehensive Technical Explanation:</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {q.explanation}
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-start gap-1.5 text-indigo-900 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Pro Shortcut / Insight:</strong> {q.shortcutOrInsight}</span>
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

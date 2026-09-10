import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Lightbulb, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Building2,
  Share2,
  BookmarkCheck
} from 'lucide-react';
import { GRAMMAR_PARTS_OF_SPEECH, PartOfSpeechSection, GrammarMCQ } from '../data/grammarPartsOfSpeechData';

interface GrammarPartsOfSpeechViewProps {
  onBackToLearn?: () => void;
}

export const GrammarPartsOfSpeechView: React.FC<GrammarPartsOfSpeechViewProps> = ({ onBackToLearn }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('nouns');
  const [activeSubTab, setActiveSubTab] = useState<'notes' | 'mcqs' | 'interview' | 'all-questions'>('notes');
  
  // MCQ Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const currentPart: PartOfSpeechSection = 
    GRAMMAR_PARTS_OF_SPEECH.find(p => p.id === selectedPartId) || GRAMMAR_PARTS_OF_SPEECH[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowExplanation({});
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const calculateScore = () => {
    let score = 0;
    currentPart.mcqs.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const currentMCQ = currentPart.mcqs[currentQuestionIndex];
  const isCurrentAnswered = userAnswers[currentMCQ?.id] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-indigo-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                  Verbal Ability Masterclass
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-indigo-200">
                  8 Parts of Speech
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  80 Placement MCQs + Interview Tips
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Grammar: The 8 Parts of Speech
              </h1>
              <p className="text-sm sm:text-base text-indigo-200/90 mt-1 max-w-3xl">
                Placement-grade study notes, 10 curated MCQs per section with detailed rationale, and common verbal blunders candidates make during corporate interviews.
              </p>
            </div>

            {onBackToLearn && (
              <button
                onClick={onBackToLearn}
                className="self-start md:self-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/20 flex items-center gap-2"
              >
                <span>Back to Learning Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 8 Parts of Speech Selector Tabs */}
          <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {GRAMMAR_PARTS_OF_SPEECH.map((part) => {
              const isActive = part.id === selectedPartId;
              return (
                <button
                  key={part.id}
                  onClick={() => {
                    setSelectedPartId(part.id);
                    handleResetQuiz();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-white text-indigo-900 shadow-md scale-102 ring-2 ring-amber-400'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-indigo-900 text-white' : 'bg-white/20 text-white'
                  }`}>
                    {part.partNumber}
                  </span>
                  <span>{part.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Active Part Header & Mode Navigation */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                  Part #{currentPart.partNumber}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentPart.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {currentPart.tagline}
              </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center bg-slate-100/80 p-1 rounded-xl gap-1 shrink-0">
              <button
                onClick={() => setActiveSubTab('notes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'notes'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Notes & Rules</span>
              </button>
              <button
                onClick={() => setActiveSubTab('mcqs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'mcqs'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>10 MCQs Arena</span>
              </button>
              <button
                onClick={() => setActiveSubTab('interview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'interview'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-rose-500" />
                <span>Interview Tips</span>
              </button>
              <button
                onClick={() => setActiveSubTab('all-questions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'all-questions'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>All 10 Qs Bank</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: Comprehensive Notes & Golden Rules */}
        {activeSubTab === 'notes' && (
          <div className="space-y-6">
            {/* Definition & Role in Placements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Grammar Concept & Core Definition</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentPart.notes.definition}
                </p>

                {/* Quick Memory Aids */}
                <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Memory Anchors & Speed Cheat-Sheet</span>
                  </div>
                  <ul className="space-y-1.5">
                    {currentPart.notes.quickMemoryAids.map((aid, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-amber-950 flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{aid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Placement Relevance Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50/60 rounded-2xl p-6 border border-indigo-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-bold text-indigo-950">Placement Screener Focus</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-900/80 leading-relaxed">
                    {currentPart.notes.roleInPlacements}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-200/60">
                  <button
                    onClick={() => setActiveSubTab('mcqs')}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Practice 10 {currentPart.shortName} MCQs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Subtypes Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Subtypes & Structural Classifications</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPart.notes.subtypes.map((st, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 transition-all">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{st.name}</h4>
                    <p className="text-xs text-slate-600 mb-3">{st.definition}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {st.examples.map((ex, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-indigo-700 font-medium">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Golden Rules */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Golden Placement Rules & Exam Traps</h3>
              </div>
              <div className="space-y-4">
                {currentPart.notes.goldenRules.map((gr, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:bg-slate-50/50 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{gr.rule}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-8">
                      {gr.explanation}
                    </p>
                    <div className="mt-2.5 pl-8">
                      <div className="p-2.5 rounded-lg bg-slate-100 text-xs font-mono text-slate-800 border-l-4 border-indigo-500">
                        {gr.example}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Interactive 10 MCQs Arena */}
        {activeSubTab === 'mcqs' && (
          <div className="space-y-6">
            {/* Quiz Navigation & Progress Bar */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Interactive Question {currentQuestionIndex + 1} of 10
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentPart.shortName} Placement Assessment
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    Answered: {Object.keys(userAnswers).length} / 10
                  </span>
                  <button
                    onClick={handleResetQuiz}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Stepper Buttons */}
              <div className="grid grid-cols-10 gap-1.5">
                {currentPart.mcqs.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIndex;
                  const isCorrect = quizSubmitted && userAnswers[q.id] === q.correctIndex;
                  const isWrong = quizSubmitted && isAnswered && userAnswers[q.id] !== q.correctIndex;

                  let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isCurrent) btnBg = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400';
                  else if (isCorrect) btnBg = 'bg-emerald-500 text-white';
                  else if (isWrong) btnBg = 'bg-rose-500 text-white';
                  else if (isAnswered) btnBg = 'bg-blue-100 text-blue-800 font-semibold';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${btnBg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            {currentMCQ && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                {/* Question Meta Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    Q{currentQuestionIndex + 1}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                    currentMCQ.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    currentMCQ.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {currentMCQ.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    🏢 {currentMCQ.companyTag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                    Concept: {currentMCQ.testedConcept}
                  </span>
                </div>

                {/* Question Prompt */}
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
                  {currentMCQ.question}
                </h4>

                {/* 4 Choices */}
                <div className="space-y-3">
                  {currentMCQ.options.map((option, optIdx) => {
                    const isSelected = userAnswers[currentMCQ.id] === optIdx;
                    const isCorrect = currentMCQ.correctIndex === optIdx;
                    const showResultState = quizSubmitted || showExplanation[currentMCQ.id];

                    let containerClass = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80 text-slate-800';
                    let markerClass = 'border-slate-300 bg-white text-slate-600';

                    if (showResultState) {
                      if (isCorrect) {
                        containerClass = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-semibold';
                        markerClass = 'bg-emerald-600 border-emerald-600 text-white';
                      } else if (isSelected && !isCorrect) {
                        containerClass = 'border-rose-500 bg-rose-50/60 text-rose-950';
                        markerClass = 'bg-rose-600 border-rose-600 text-white';
                      }
                    } else if (isSelected) {
                      containerClass = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-600';
                      markerClass = 'bg-indigo-600 border-indigo-600 text-white';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentMCQ.id, optIdx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${containerClass}`}
                      >
                        <span className={`w-7 h-7 rounded-lg border font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-all ${markerClass}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-sm leading-relaxed flex-1">
                          {option}
                        </span>
                        {showResultState && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {showResultState && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Toggle & Content */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    onClick={() => {
                      setShowExplanation(prev => ({
                        ...prev,
                        [currentMCQ.id]: !prev[currentMCQ.id]
                      }));
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 self-start"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showExplanation[currentMCQ.id] ? 'Hide Explanation' : 'Show Explanation & Rationale'}</span>
                  </button>

                  {/* Navigation next/prev */}
                  <div className="flex items-center gap-2 self-end">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 disabled:opacity-40 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
                    >
                      Previous
                    </button>
                    {currentQuestionIndex < 9 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(9, prev + 1))}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Submit & Review Score</span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Explanation Box */}
                {(showExplanation[currentMCQ.id] || quizSubmitted) && (
                  <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-fadeIn">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Grammar Analysis & Examiner Explanation:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentMCQ.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Score Summary Modal Card when submitted */}
            {quizSubmitted && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-emerald-950">
                    {currentPart.shortName} Quiz Completed!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
                    Your Score: <span className="font-extrabold text-emerald-950 text-base">{calculateScore()} / 10</span> questions correct ({Math.round((calculateScore() / 10) * 100)}%).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSubTab('interview')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Read Interview Tips</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetQuiz}
                    className="px-3.5 py-2 rounded-xl border border-emerald-300 hover:bg-white text-xs font-semibold text-emerald-800"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Interview Tips & Candidate Common Mistakes */}
        {activeSubTab === 'interview' && (
          <div className="space-y-6">
            {/* Interview Context Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900">
                  {currentPart.shortName} in Placement Interviews & HR Evaluations
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentPart.interviewTips.overview}
              </p>

              {/* Kapil's Pro Tip */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Trainer's Pro Interview Blueprint</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                  "{currentPart.interviewTips.kapilProTip}"
                </p>
              </div>
            </div>

            {/* Common Mistakes: Candidate Says ❌ vs Professional Says ✅ */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Common Candidate Mistakes: Wrong vs Correct Phrasing
                </h3>
              </div>

              <div className="space-y-4">
                {currentPart.interviewTips.commonMistakes.map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                      {/* Candidate Mistake */}
                      <div className="p-4 bg-rose-50/40">
                        <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                          <XCircle className="w-4 h-4" />
                          <span>Candidate Mistake ❌</span>
                        </div>
                        <p className="text-sm font-semibold text-rose-950 font-mono">
                          "{item.wrongSentence}"
                        </p>
                        <p className="text-xs text-rose-800/90 mt-2">
                          <strong className="text-rose-900">Why it's wrong:</strong> {item.whyWrong}
                        </p>
                      </div>

                      {/* Professional Phrasing */}
                      <div className="p-4 bg-emerald-50/40">
                        <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Professional Phrasing ✅</span>
                        </div>
                        <p className="text-sm font-semibold text-emerald-950 font-mono">
                          "{item.correctSentence}"
                        </p>
                        <p className="text-xs text-emerald-800/90 mt-2">
                          <strong className="text-emerald-900">Recruiter Impression:</strong> {item.interviewerImpression}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spoken Delivery Guidelines */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Verbal Delivery & Tone Best Practices
                </h3>
              </div>
              <ul className="space-y-2.5">
                {currentPart.interviewTips.spokenDeliveryAdvice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                      ✓
                    </span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: All 10 Questions Bank (Speed Review Mode) */}
        {activeSubTab === 'all-questions' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Complete {currentPart.shortName} Question Bank (10 MCQs)
                </h3>
                <p className="text-xs text-slate-600">
                  Speed revision mode for pre-interview brush up. View all questions with verified answers and explanations.
                </p>
              </div>
              <button
                onClick={() => setActiveSubTab('mcqs')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Take Interactive Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {currentPart.mcqs.map((q, idx) => (
              <div key={q.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800">
                    Question #{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                    🏢 {q.companyTag}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {q.difficulty}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 mb-3">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = q.correctIndex === oIdx;
                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
                          isCorrect 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong className="text-indigo-900">Grammar Rationale: </strong>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Sparkles, Rocket, ArrowRight, CheckCircle2, Trophy, Award, 
  Flame, BookOpen, Target, Brain, Briefcase, ShieldCheck, 
  Star, Users, Zap, Building2, GraduationCap, Check, HelpCircle
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { fireCelebrationConfetti } from '../services/storageService';
import { signInWithGoogle } from '../services/firebaseAuthService';

interface LandingPageProps {
  profile: LearnerProfile;
  onStartJourney: (name: string, institute: string, department: string, targetCompany: string, googleData?: { uid?: string; email?: string; photoUrl?: string }) => void;
  onContinueExisting?: () => void;
  hasStartedBefore: boolean;
}

const TARGET_COMPANIES = [
  'Amazon (SDE)',
  'Google (SWE)',
  'TCS Digital / Prime',
  'Infosys InfyTQ',
  'Deloitte / PwC',
  'Microsoft',
  'High-Growth Startup',
  'All Tier-1 MNCs',
];

const BRANCH_OPTIONS = [
  'Computer Science & IT',
  'Electronics & Comm (ECE/EEE)',
  'Mechanical / Civil',
  'Data Science & AI',
  'MCA / BCA',
  'MBA / Management',
];

export const LandingPage: React.FC<LandingPageProps> = ({
  profile,
  onStartJourney,
  onContinueExisting,
  hasStartedBefore,
}) => {
  const [name, setName] = useState(profile.name || '');
  const [institute, setInstitute] = useState(profile.institute || 'National Institute of Technology');
  const [department, setDepartment] = useState(profile.department || 'Computer Science & IT');
  const [selectedTarget, setSelectedTarget] = useState('Amazon (SDE)');
  const [googleUser, setGoogleUser] = useState<{ uid?: string; email?: string; photoUrl?: string } | null>(
    profile.uid || profile.email ? { uid: profile.uid, email: profile.email, photoUrl: profile.photoUrl } : null
  );
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsGoogleSigningIn(true);
      const { user, profile: googleProfile } = await signInWithGoogle();
      const resolvedName = googleProfile.name || user.displayName || user.email?.split('@')[0] || 'Learner';
      setName(resolvedName);
      setGoogleUser({
        uid: user.uid,
        email: user.email || '',
        photoUrl: user.photoURL || undefined,
      });
      fireCelebrationConfetti();
      setIsGoogleSigningIn(false);
      // Automatically launch journey with verified Google account
      setTimeout(() => {
        onStartJourney(
          resolvedName,
          institute,
          department,
          selectedTarget,
          {
            uid: user.uid,
            email: user.email || '',
            photoUrl: user.photoURL || undefined,
          }
        );
      }, 500);
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setIsGoogleSigningIn(false);
      // If popup was closed by user or blocked
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please click "Sign in with Google" again.');
      } else {
        setError(err?.message || 'Google Sign-In failed. Please try again or complete the form.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please sign in with Google or enter your name to personalize your placement journey.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    fireCelebrationConfetti();

    setTimeout(() => {
      onStartJourney(trimmed, institute, department, selectedTarget, googleUser || undefined);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Header */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-blue-500/25">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-display">
                  PlacementVerse <span className="text-blue-400">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-700/50">
                  Powered by Kapil
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                India's Ultimate Placement Readiness Challenge
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-300">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Campus Season 2025–26 Live</span>
            </div>

            {hasStartedBefore && onContinueExisting && (
              <button
                type="button"
                onClick={onContinueExisting}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <span>Dashboard ({profile.name || 'Resume'})</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Hero Section with Live Name Input Card */}
      <section className="relative z-10 py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Tag & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Campus Placement Ecosystem
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Crack Your Dream MNC. <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Your Journey Begins Today.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Personalized aptitude tracks, authentic 15-minute negative marking test arenas, 
            24/7 AI Mock Interview Coach Kapil, and Tier-1 MNC Boss Battles.
          </p>
        </div>

        {/* The Centerpiece Onboarding Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left: Input Form Card */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Learner Access</h2>
                    <p className="text-xs text-slate-400">Sign in with Google to sync to Admin Roster & Track Progress</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Firebase Auth
                </span>
              </div>

              {/* PRIMARY: One-Click Google Authentication */}
              <div className="mb-6 bg-gradient-to-r from-slate-900 to-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 shadow-inner">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Recommended: Instant Google Signup
                </p>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleSigningIn}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm shadow-lg shadow-black/20 hover:shadow-xl transition-all border border-slate-200 active:scale-[0.99]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isGoogleSigningIn ? 'Connecting with Google...' : 'Continue with Google Account'}</span>
                </button>
                {googleUser?.email && (
                  <p className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Authenticated as {googleUser.email}
                  </p>
                )}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-slate-700/80" />
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Or configure profile manually</span>
                  <div className="flex-1 h-px bg-slate-700/80" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="user-fullname-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    What is your Full Name? <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="user-fullname-input"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="e.g. Rahul Sharma or Priya Verma"
                      autoFocus
                      className={`w-full bg-slate-900/90 border ${
                        error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-600 focus:border-blue-400'
                      } rounded-xl px-4 py-3.5 text-base font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    />
                    {name.trim().length > 0 && (
                      <div className="absolute right-3.5 top-3.5 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      {error}
                    </p>
                  )}
                </div>

                {/* College / Institute */}
                <div>
                  <label htmlFor="user-college-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    College / Institute
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="user-college-input"
                      type="text"
                      value={institute}
                      onChange={(e) => setInstitute(e.target.value)}
                      placeholder="e.g. National Institute of Technology, Delhi"
                      className="w-full bg-slate-900/90 border border-slate-600 focus:border-blue-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Branch / Discipline
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-600 focus:border-blue-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-all"
                  >
                    {BRANCH_OPTIONS.map((branch) => (
                      <option key={branch} value={branch} className="bg-slate-900 text-white">
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Company Choice */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Dream Target Company / Role
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {TARGET_COMPANIES.map((comp) => {
                      const isSelected = selectedTarget === comp;
                      return (
                        <button
                          key={comp}
                          type="button"
                          onClick={() => setSelectedTarget(comp)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-700/80 hover:border-slate-600'
                          }`}
                        >
                          {comp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Launch Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-500/35 transition-all transform active:scale-[0.99]"
                  >
                    <span>Begin Your Placement Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    Instant access • No credit card required • Powered by Kapil Narula
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Live Interactive Student ID Pass Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Real-time Generated Student ID Badge Card */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-850 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                    PLACEMENTVERSE CANDIDATE PASS
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Active
                  </span>
                </div>

                {/* Candidate Name Live Preview */}
                <div className="flex items-center gap-3.5 my-4">
                  {googleUser?.photoUrl ? (
                    <img
                      src={googleUser.photoUrl}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-400 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                      {name.trim() ? name.trim().charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {name.trim() || 'Your Name Here'}
                    </h3>
                    <p className="text-xs text-blue-400 font-medium flex items-center gap-1">
                      {selectedTarget} Candidate
                      {googleUser?.email && (
                        <span className="text-[10px] text-emerald-400 font-normal">
                          (Verified)
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      {institute || 'National Institute of Technology'}
                    </p>
                  </div>
                </div>

                {/* Live Credentials & Stats */}
                <div className="grid grid-cols-2 gap-2 my-4 pt-4 border-t border-slate-700/60 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Initial Rank</span>
                    <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Candidate #142
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Readiness Index</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      84% Projected
                    </span>
                  </div>
                </div>

                {/* Verifiable Certificate Endorsement Preview */}
                <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3 text-xs text-slate-300">
                  <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    Target Credential
                  </p>
                  <p className="text-slate-200 font-medium">
                    Ultimate Placement Readiness Certificate
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Issued to <strong className="text-white">{name.trim() || '[Your Name]'}</strong> upon passing Tier-1 MNC Boss Battles.
                  </p>
                </div>
              </div>

              {/* Endorsement signature note */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Director of Placement Coaching</span>
                <span className="font-serif italic font-semibold text-slate-300">Kapil Narula</span>
              </div>
            </div>

            {/* Quick Guarantees Pill Card */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero fluff: 100% focused on TCS, Amazon, Infosys hiring patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real negative marking (-0.25) simulation prevents campus exam surprises</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 4-Stage Learning Engine Showcase */}
      <section className="relative z-10 py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Proven 4-Stage Learning Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              How You Win in PlacementVerse
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Every topic is engineered to turn textbook knowledge into high-speed interview reflexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stage 1 */}
            <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">10-Min AI Modules</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visual formula sheets, animated concept walkthroughs, and real corporate engineering case studies from Amazon and Infosys.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Practice Zone</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                25 curated MCQs with instant step-by-step explanations and Coach Kapil shortcut tips to build instant calculation muscle memory.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Challenge Arena</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                15-minute countdown test with authentic +1.00 / -0.25 negative marking. Train your time management and risk assessment.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                04
              </div>
              <h3 className="text-lg font-bold text-white mb-2">MNC Boss Battles</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-difficulty gatekeeper rounds (TCS Digital, Amazon SDE, Google). Score 80%+ to defeat the boss and unlock the next topic.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5 Core Curriculum Modules */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
            Comprehensive Curriculum
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Master All 5 Placement Pillars
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            60+ In-Depth Topics curated from over 500+ campus hiring drives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-3">
              📐
            </div>
            <h4 className="font-bold text-sm text-white">Quantitative Aptitude</h4>
            <p className="text-[11px] text-slate-400 mt-1">16 Topics: Time & Work, Speed, Profit & Loss, Probability</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center mb-3">
              🧠
            </div>
            <h4 className="font-bold text-sm text-white">Logical Reasoning</h4>
            <p className="text-[11px] text-slate-400 mt-1">13 Topics: Seating, Syllogisms, Coding-Decoding, Puzzles</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              📖
            </div>
            <h4 className="font-bold text-sm text-white">Verbal Ability</h4>
            <p className="text-[11px] text-slate-400 mt-1">12 Topics: Reading Comp, Para Jumbles, Error Spotting</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
              🎙️
            </div>
            <h4 className="font-bold text-sm text-white">Communication</h4>
            <p className="text-[11px] text-slate-400 mt-1">11 Topics: Group Discussion, Self Intro, STAR Storytelling</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-3">
              👔
            </div>
            <h4 className="font-bold text-sm text-white">Placement Readiness</h4>
            <p className="text-[11px] text-slate-400 mt-1">10 Topics: ATS Resume, LinkedIn, Salary Negotiation</p>
          </div>

        </div>
      </section>

      {/* Real-World Corporate Task Evaluators & Badges */}
      <section className="relative z-10 py-16 bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Interactive Lab Simulations
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                Real-World Tasks Beyond Just MCQs
              </h2>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Campus recruitment isn't just about formulas. PlacementVerse tests your actual professional skills with live AI evaluations.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Live Email to HR Simulator</h4>
                    <p className="text-xs text-slate-400">Instant AI feedback on corporate professionalism, grammar, and formal rewrites.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Voice Group Discussion & Confidence Analyzer</h4>
                    <p className="text-xs text-slate-400">Record your speech and receive scores on vocal confidence, articulation, and opening hooks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">ATS Single-Column Resume Checker</h4>
                    <p className="text-xs text-slate-400">Converts standard duty bullets into Google X-Y-Z quantifiable metric statements.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Badges & Credential Showcase */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  23 Metallic Badges & Trophy Ranks
                </h3>
                <span className="text-xs text-amber-400 font-semibold">Tiers 1 to 5</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Earn collectible 3D metallic badges as you maintain daily streaks and conquer difficult modules:
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">🥉</span>
                  <p className="text-[11px] font-bold text-white mt-1">Bronze Starter</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">🥈</span>
                  <p className="text-[11px] font-bold text-white mt-1">Silver Pro</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">🥇</span>
                  <p className="text-[11px] font-bold text-white mt-1">Gold Legend</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">💎</span>
                  <p className="text-[11px] font-bold text-white mt-1">Diamond 15k</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">⚔️</span>
                  <p className="text-[11px] font-bold text-white mt-1">Boss Slayer</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">⚡</span>
                  <p className="text-[11px] font-bold text-white mt-1">Speed Demon</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">🔥</span>
                  <p className="text-[11px] font-bold text-white mt-1">Streak Master</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-2xl">🏆</span>
                  <p className="text-[11px] font-bold text-white mt-1">Champion</p>
                </div>
              </div>

              {/* Kapil Narula Endorsement Quote */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <p className="italic text-xs text-slate-300 leading-relaxed">
                  "Speed without accuracy leads to negative marks. Accuracy without speed leaves 10 unattempted questions. PlacementVerse builds both."
                </p>
                <p className="text-right text-[11px] font-bold text-blue-400 mt-1">
                  — Kapil Narula, Placement Director
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA to start journey */}
      <section className="relative z-10 py-16 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to Claim Your Top Placement Offer?
        </h2>
        <p className="text-sm text-slate-400 mt-2 mb-6">
          Scroll up or click below to enter your name and start your placement journey right now.
        </p>
        <button
          type="button"
          onClick={() => {
            const inputEl = document.getElementById('user-fullname-input');
            if (inputEl) {
              inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              inputEl.focus();
            }
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all"
        >
          <span>Enter Your Name to Begin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-slate-400">
            PlacementVerse AI • Powered by Kapil Narula
          </p>
          <p>
            India's Premier Campus Placement Readiness & Diagnostic Platform
          </p>
        </div>
      </footer>

    </div>
  );
};

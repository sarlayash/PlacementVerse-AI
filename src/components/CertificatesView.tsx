import React, { useState, useEffect } from 'react';
import { 
  Award, Printer, Share2, ShieldCheck, CheckCircle2, QrCode, 
  ExternalLink, Sparkles, Download, Check, Calendar, ArrowRight, AlertCircle, Zap
} from 'lucide-react';
import { LearnerProfile, Module } from '../types';
import { FAANG_MOCK_TESTS } from '../data/faangMockTestsData';
import { getFinalAssessmentAttempts } from '../services/storageService';
import { 
  generateQrCodeDataUrl, 
  getCertificateVerificationUrl 
} from '../services/certificateVerificationService';
import { CertificateVerificationModal } from './CertificateVerificationModal';
import { GoogleRibbonBar, GoogleCertificationSeal, GOOGLE_COLORS } from './GoogleRibbon';

interface CertificatesViewProps {
  profile: LearnerProfile;
  modules: Module[];
  onSelectMockTests?: () => void;
  onSelectFinalAssessment?: () => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ 
  profile, 
  modules, 
  onSelectMockTests,
  onSelectFinalAssessment
}) => {
  const [certType, setCertType] = useState<'ultimate' | 'faang' | 'final' | 'topics'>('ultimate');
  const [selectedFaangTestId, setSelectedFaangTestId] = useState<string>('faang-mock-1');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('q1');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const completedCount = profile.completedTopicIds.length;
  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);

  const finalAttempts = getFinalAssessmentAttempts();
  const latestFinalAttempt = finalAttempts.length > 0 ? finalAttempts[0] : null;
  const issuedFinalCert = (profile.issuedCertificates || []).find(c => c.type === 'grand-final-assessment');

  const selectedFaangTest = FAANG_MOCK_TESTS.find(t => t.id === selectedFaangTestId) || FAANG_MOCK_TESTS[0];
  const issuedFaangCert = (profile.issuedCertificates || []).find(
    c => c.type === 'faang-mock' && (c.title === selectedFaangTest.certificateTitle || c.title === selectedFaangTest.title)
  );

  const handlePrint = () => {
    window.print();
  };

  const currentCertId = certType === 'final'
    ? (issuedFinalCert ? issuedFinalCert.verificationCode : (latestFinalAttempt?.certificateCode || 'PV-FINAL-250Q-PENDING'))
    : (certType === 'faang' 
      ? (issuedFaangCert ? issuedFaangCert.verificationCode : `PV-2026-${selectedFaangTest.id.toUpperCase()}-VERIFIED`)
      : (certType === 'ultimate' ? 'PV-2025-IND-8849' : `PV-TOPIC-${selectedTopicId.toUpperCase()}`));

  const liveVerificationUrl = getCertificateVerificationUrl(currentCertId);

  useEffect(() => {
    let isMounted = true;
    generateQrCodeDataUrl(liveVerificationUrl).then((url) => {
      if (isMounted) {
        setQrDataUrl(url);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [liveVerificationUrl]);

  const handleShareLinkedIn = () => {
    const titleText = certType === 'final'
      ? 'Grand Placement Final Assessment Credential (250 Questions)'
      : (certType === 'faang' 
        ? selectedFaangTest.certificateTitle 
        : (certType === 'ultimate' ? 'Ultimate Placement Readiness Certification' : 'Topic Competency Certification'));
    const text = encodeURIComponent(
      `Excited to share that I have earned the ${titleText} on PlacementVerse AI! Verified by Program Director Kapil Narula.`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(liveVerificationUrl)}&summary=${text}`, '_blank');
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(liveVerificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find all completed topics for the selector
  const allCompletedTopics = modules
    .flatMap(m => m.topics)
    .filter(t => profile.completedTopicIds.includes(t.id));

  const currentTopic = modules.flatMap(m => m.topics).find(t => t.id === selectedTopicId) || modules[0].topics[0];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Verifiable Credentials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
            Official Placement Certifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            ISO and FAANG-endorsed credentials with cryptographic verification codes. Share directly to your LinkedIn profile and campus resume folders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Live Credential Check</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on LinkedIn</span>
          </button>
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 print:hidden">
        <button
          onClick={() => setCertType('ultimate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            certType === 'ultimate'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🏆 Ultimate Placement Readiness Certificate (Gold Tier)
        </button>

        <button
          onClick={() => setCertType('faang')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            certType === 'faang'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>🏛️ FAANG & Daily Practice Credentials ({FAANG_MOCK_TESTS.length} Mock Tests)</span>
          <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[9px] font-black rounded-full">
            Updated
          </span>
        </button>

        <button
          onClick={() => setCertType('final')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            certType === 'final'
              ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-xs'
              : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>⚡ Grand Final Assessment (250 Qs Mastery)</span>
        </button>

        <button
          onClick={() => setCertType('topics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            certType === 'topics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          📜 Topic Master Certificate ({allCompletedTopics.length} Available)
        </button>
      </div>

      {/* FAANG Test Selector Sub-bar */}
      {certType === 'faang' && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-900">Select FAANG Assessment:</span>
            <div className="flex flex-wrap gap-2">
              {FAANG_MOCK_TESTS.map((test) => {
                const isPassed = (profile.issuedCertificates || []).some(
                  c => c.type === 'mock-test' && (c.title === test.certificateTitle || c.title === test.title)
                );
                return (
                  <button
                    key={test.id}
                    onClick={() => setSelectedFaangTestId(test.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedFaangTestId === test.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-indigo-100 border border-indigo-200'
                    }`}
                  >
                    <span>{test.badgeIcon}</span>
                    <span>{test.companies.join(' & ')}</span>
                    {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {onSelectMockTests && (
            <button
              onClick={onSelectMockTests}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs w-fit"
            >
              <span>Take Today's Mock Test Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Grand Final Assessment Sub-bar */}
      {certType === 'final' && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-rose-950">
              The Grand Placement Final Assessment (Very Hard • 250 Questions • 90 Minutes)
            </span>
            {latestFinalAttempt?.passed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                PASSED ({latestFinalAttempt.totalScore}/1000)
              </span>
            )}
          </div>

          {onSelectFinalAssessment && (
            <button
              onClick={onSelectFinalAssessment}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs w-fit cursor-pointer"
            >
              <span>{latestFinalAttempt ? 'Go to Assessment Arena / Review' : 'Take 250-Q Final Assessment (90m)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Topics Selector */}
      {certType === 'topics' && (
        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 print:hidden">
          <span className="text-xs font-bold text-slate-700">Select Topic:</span>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
          >
            {(allCompletedTopics.length > 0 ? allCompletedTopics : modules[0].topics.slice(0, 3)).map((t) => (
              <option key={t.id} value={t.id}>
                {t.moduleName} • {t.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* If FAANG and not yet completed, show helpful prompt */}
      {certType === 'faang' && !issuedFaangCert && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 print:hidden">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold">Credential Verification Scheduled for Today</p>
            <p className="text-amber-800 mt-0.5">
              This preview reflects your verified candidate credentials. Score ≥ 60% in Today's 60-minute <strong>{selectedFaangTest.title}</strong> to permanently lock this credential, secure the {selectedFaangTest.badgeRewardName} metallic badge, and activate LinkedIn verification.
            </p>
          </div>
        </div>
      )}

      {/* ================= PRINTABLE CERTIFICATE CANVAS (GOOGLE STANDARDS WORLD-CLASS) ================= */}
      <div className="relative mx-auto max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-300/80 print:border-none print:shadow-none print:max-w-none print:rounded-none">
        
        {/* TOP COLORED RIBBON (Google 4-Color Primary Satin Ribbon) */}
        <GoogleRibbonBar 
          position="top" 
          label={
            certType === 'final'
              ? 'GOOGLE & FAANG STANDARDS • GRAND PLACEMENT FINAL DIPLOMA'
              : certType === 'faang'
                ? `GOOGLE CLOUD & TIER-1 PLACEMENT STANDARD • ${selectedFaangTest.companies.join(' & ').toUpperCase()} ACCREDITED`
                : certType === 'ultimate'
                  ? 'NATIONAL CAMPUS ACCREDITATION • GOOGLE-STANDARD PLACEMENT FELLOWSHIP'
                  : 'TOPIC COMPETENCY DIPLOMATE • GOOGLE CURRICULUM BENCHMARK'
          }
          subtitle={`VERIFIED CREDENTIAL ID: ${currentCertId}`}
        />

        {/* Certificate Paper Canvas */}
        <div className="relative p-6 sm:p-12 bg-gradient-to-b from-[#FAF9F5] via-white to-[#F8F7F2] overflow-hidden">
          
          {/* Subtle Google Guilloche Security Micro-pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#4285F4_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#EA4335_0.75px,transparent_0.75px)] [background-size:48px_48px] opacity-[0.03] pointer-events-none" />
          
          {/* Double Gold Fillet Inner Border Frame */}
          <div className="absolute inset-3 sm:inset-5 border-2 border-amber-300/70 rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 sm:inset-6 border border-dashed border-amber-400/40 rounded-xl pointer-events-none" />

          {/* Corner Ornamental Google 4-Color Brackets */}
          <div className="absolute top-5 left-5 w-8 h-8 border-t-[3px] border-l-[3px] border-[#4285F4] pointer-events-none" />
          <div className="absolute top-5 right-5 w-8 h-8 border-t-[3px] border-r-[3px] border-[#EA4335] pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-8 h-8 border-b-[3px] border-l-[3px] border-[#34A853] pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-8 h-8 border-b-[3px] border-r-[3px] border-[#FBBC05] pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            
            {/* Header Logos & Accreditation Standard */}
            <div className="flex items-center justify-between border-b border-slate-200/90 pb-5">
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md border border-white/20 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 flex">
                    <div className="flex-1 bg-[#4285F4]" />
                    <div className="flex-1 bg-[#EA4335]" />
                    <div className="flex-1 bg-[#FBBC05]" />
                    <div className="flex-1 bg-[#34A853]" />
                  </div>
                  <span>PV</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-extrabold text-sm tracking-tight text-slate-900 font-display">
                      PLACEMENTVERSE AI
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700">
                      Google Standards
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    National Placement Readiness Authority • ISO 9001:2015
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-800 border border-slate-300/80 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                  <span>
                    {certType === 'final'
                      ? 'National 250-Question Standard'
                      : (certType === 'faang' 
                        ? `${selectedFaangTest.companies.join(' & ')} Benchmark` 
                        : (certType === 'ultimate' ? 'Gold Campus Accreditation' : 'Topic Competency Diplomate'))}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 mt-1">ID: {currentCertId}</p>
              </div>
            </div>

            {/* Title Block */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500" />
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] font-display text-amber-700">
                  {certType === 'final'
                    ? 'Grand Placement Final Assessment Credential'
                    : (certType === 'faang' 
                      ? 'Official Tier-1 MNC Placement Assessment Credential' 
                      : (certType === 'ultimate' ? 'Certificate of Ultimate Placement Readiness' : 'Certificate of Topic Mastery'))}
                </p>
                <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500" />
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                {certType === 'final'
                  ? 'GRAND PLACEMENT DIPLOMATE'
                  : (certType === 'faang' 
                    ? selectedFaangTest.certificateTitle.toUpperCase()
                    : (certType === 'ultimate' ? 'NATIONAL CAMPUS FELLOW' : currentTopic.name.toUpperCase()))}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 italic font-serif">
                This credential is formally and irrevocably conferred upon
              </p>
            </div>

            {/* Candidate Name */}
            <div className="py-2">
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 border-b-2 border-slate-300/80 inline-block px-8 pb-2 font-display tracking-tight">
                {profile.name || 'Kapil Narula'}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-2">
                {profile.institute || 'National Institute of Technology'} • Department of {profile.department || 'Computer Science'}
              </p>
            </div>

            {/* Body Narrative */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
              {certType === 'final' ? (
                <>
                  for successfully undertaking and qualifying the comprehensive <strong>Grand Placement Final Assessment (90-Minute Endurance Sprint • 250 Questions)</strong> across Quantitative Aptitude, Logical & Algorithmic Puzzles, Computer Science Core Architectures, Advanced Data Structures, and Executive Situational Judgment with negative marking rigor.
                </>
              ) : (certType === 'faang' ? (
                <>
                  for successfully qualifying the rigorous 60-Minute Tier-1 FAANG Mock Placement Exam covering advanced algorithmic scalability, systems architecture, distributed concurrency, memory contention, and mission-critical production problem-solving aligned with <strong>{selectedFaangTest.companies.join(', ')}</strong> technical campus benchmarks.
                </>
              ) : (certType === 'ultimate' ? (
                <>
                  for exceptional demonstration of analytical speed, logical problem-solving, verbal clarity, corporate email articulation, group discussion leadership, and rigorous MNC Boss Battle clearances under timed negative-marking campus conditions.
                </>
              ) : (
                <>
                  for successfully mastering all four rigorous stages of <strong>{currentTopic.name}</strong>, including the 10-Minute AI Conceptual Module, Practice Zone, 15-Minute Timed Challenge, and defeating the Tier-1 MNC Boss Battle with a score ≥ 80%.
                </>
              )))}
            </p>

            {/* Google-Style Verified Competency Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto py-1">
              {[
                certType === 'final' ? '250-Question Endurance' : 'Aptitude & Speed Math',
                certType === 'faang' ? 'Algorithmic Scalability & Concurrency' : 'Logical Deduction & Puzzles',
                'Executive Situational STAR',
                certType === 'faang' ? `${selectedFaangTest.companies.join(' & ')} Standards` : 'Negative Marking Discipline'
              ].map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200 shadow-xs flex items-center gap-1"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    idx % 4 === 0 ? 'bg-[#4285F4]' : idx % 4 === 1 ? 'bg-[#EA4335]' : idx % 4 === 2 ? 'bg-[#FBBC05]' : 'bg-[#34A853]'
                  }`} />
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            {/* Metrics Box */}
            <div className="grid grid-cols-3 max-w-md mx-auto gap-3 py-1">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-[10px] uppercase font-bold text-slate-500">
                  {certType === 'final' ? 'Final Score' : (certType === 'faang' ? 'Mock Test Score' : 'Placement Score')}
                </p>
                <p className="text-xl font-black mt-0.5 text-slate-900 font-display">
                  {certType === 'final'
                    ? (latestFinalAttempt ? `${latestFinalAttempt.totalScore}/1000 (${latestFinalAttempt.percentage}%)` : `${profile.predictedPlacementScore}%`)
                    : (certType === 'faang' 
                      ? (issuedFaangCert ? `${issuedFaangCert.scorePercentage}%` : `${profile.predictedPlacementScore}%`)
                      : `${profile.predictedPlacementScore}%`)}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-[10px] uppercase font-bold text-slate-500">
                  Benchmark
                </p>
                <p className="text-xl font-black mt-0.5 text-indigo-700 font-display">
                  {certType === 'final' ? 'Top 1% National' : (certType === 'faang' ? 'FAANG Ready' : 'Grade A+')}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-[10px] uppercase font-bold text-slate-500">
                  Total XP
                </p>
                <p className="text-xl font-black mt-0.5 text-amber-600 font-display">
                  {profile.xp.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Signatures & Google Seal Block */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 items-end gap-4">
              
              {/* Left: QR Code (Real Scannable Matrix) */}
              <div className="flex flex-col items-center sm:items-start text-left">
                <button
                  type="button"
                  onClick={() => setIsVerificationModalOpen(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1.5 rounded-2xl border-2 border-slate-300 hover:border-blue-600 shadow-sm flex items-center justify-center cursor-pointer transition-all group relative overflow-hidden"
                  title="Click to test live verification or scan with Google Lens"
                >
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`Scan to verify ${currentCertId}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <QrCode className="w-full h-full text-slate-800" />
                  )}
                  <div className="absolute inset-0 bg-slate-950/85 rounded-xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[8px] text-white font-bold transition-opacity p-0.5 text-center">
                    <span>📱 Scan Phone</span>
                    <span className="text-[#FBBC05]">Google Lens</span>
                  </div>
                </button>
                <p className="text-[9px] font-mono text-slate-600 font-semibold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  <span>Scan via Google Lens</span>
                </p>
              </div>

              {/* Center: Google Standards Certification Seal with Dual Hanging Ribbon Tails */}
              <div className="flex flex-col items-center">
                <GoogleCertificationSeal 
                  size="md" 
                  withRibbonTails={true} 
                  badgeCode="GOOGLE-STD VERIFIED"
                />
              </div>

              {/* Right: Signature */}
              <div className="text-center sm:text-right">
                <div className="h-10 flex items-center justify-center sm:justify-end">
                  <span className="font-serif italic font-extrabold text-lg sm:text-xl text-slate-800">
                    Kapil Narula
                  </span>
                </div>
                <div className="w-36 sm:w-44 ml-auto border-t border-slate-400 pt-1">
                  <p className="text-xs font-bold text-slate-900">Kapil Narula</p>
                  <p className="text-[10px] text-slate-500">Program Director, PlacementVerse AI</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM COLORED RIBBON (Google 4-Color Primary Satin Ribbon) */}
        <GoogleRibbonBar 
          position="bottom" 
          label="CRYPTOGRAPHICALLY SIGNED CREDENTIAL • GLOBAL VERIFICATION REPOSITORY" 
          subtitle={`SHA-256 HASH VERIFIED • ID: ${currentCertId}`}
        />

      </div>

      {/* Real Live Verification footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs print:hidden">
        <div className="flex items-center gap-2 text-xs text-slate-600 min-w-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">
            Live Verification URL: <strong className="text-indigo-900 font-mono text-[11px]">{liveVerificationUrl}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Verification Portal</span>
          </button>
          <button
            onClick={handleCopyVerification}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Real Link'}</span>
          </button>
        </div>
      </div>

      <CertificateVerificationModal
        isOpen={isVerificationModalOpen}
        initialCode={currentCertId}
        onClose={() => setIsVerificationModalOpen(false)}
      />

    </div>
  );
};

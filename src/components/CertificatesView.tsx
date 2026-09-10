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
import { PrestigeRibbonBar, GoldMedalWithRedRibbon } from './GoogleRibbon';

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
      ? 'Grand Placement Final Assessment Credential'
      : (certType === 'faang' 
        ? selectedFaangTest.certificateTitle 
        : (certType === 'ultimate' ? 'Ultimate Placement Readiness Certification' : 'Topic Competency Certification'));
    const text = encodeURIComponent(
      `Conferred the ${titleText} on Classrooms To Boardrooms Placement Readiness. Verified Credential by Kapil Narula.`
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
      
      {/* Top Banner (Executive Black, Crimson Red & Gold) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A0A0C] via-[#14141A] to-[#0A0A0C] text-white border-2 border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Sovereign Verified Credentials
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-100 font-display">
            Official Placement Certifications
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
            Cryptographically signed credentials featuring genuine gold medals in silk red ribbon with black, red, and 24K gold borders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all border border-amber-400/40 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Live Credential Check</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 text-amber-200 hover:bg-zinc-800 font-bold text-xs flex items-center gap-2 shadow-sm transition-all border border-amber-500/30 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Certificate</span>
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-zinc-950" />
            <span>Share on LinkedIn</span>
          </button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3 print:hidden">
        <button
          onClick={() => setCertType('ultimate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            certType === 'ultimate'
              ? 'bg-[#0A0A0C] text-amber-300 border border-amber-400 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
          }`}
        >
          🏆 Ultimate Placement Readiness Certificate
        </button>

        <button
          onClick={() => setCertType('faang')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            certType === 'faang'
              ? 'bg-[#0A0A0C] text-amber-300 border border-amber-400 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-red-500" />
          <span>🏛️ Tier-1 MNC Credentials ({FAANG_MOCK_TESTS.length} Mock Tests)</span>
        </button>

        <button
          onClick={() => setCertType('final')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            certType === 'final'
              ? 'bg-gradient-to-r from-red-700 via-zinc-900 to-[#0A0A0C] text-amber-300 border border-amber-400 shadow-xs'
              : 'bg-white text-red-700 hover:bg-red-50 border border-red-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>⚡ Grand Final Assessment (250 Qs Mastery)</span>
        </button>

        <button
          onClick={() => setCertType('topics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            certType === 'topics'
              ? 'bg-[#0A0A0C] text-amber-300 border border-amber-400 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
          }`}
        >
          📜 Topic Master Certificate ({allCompletedTopics.length} Available)
        </button>
      </div>

      {/* FAANG Test Selector Sub-bar */}
      {certType === 'faang' && (
        <div className="p-4 rounded-2xl bg-zinc-900 text-white border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300">Select Assessment:</span>
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
                        ? 'bg-red-700 text-white border border-amber-400 shadow-xs'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
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
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs w-fit border border-amber-400/40"
            >
              <span>Take Today's Mock Test Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Grand Final Assessment Sub-bar */}
      {certType === 'final' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950 via-zinc-900 to-[#0A0A0C] border border-red-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-100">
              The Grand Placement Final Assessment (250 Questions • 90 Minutes)
            </span>
            {latestFinalAttempt?.passed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-zinc-950 border border-amber-300">
                PASSED ({latestFinalAttempt.totalScore}/1000)
              </span>
            )}
          </div>

          {onSelectFinalAssessment && (
            <button
              onClick={onSelectFinalAssessment}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs w-fit cursor-pointer border border-amber-400/40"
            >
              <span>{latestFinalAttempt ? 'Review Assessment Performance' : 'Start 250-Q Final Assessment (90m)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Topics Selector */}
      {certType === 'topics' && (
        <div className="flex items-center gap-3 bg-zinc-100 p-4 rounded-2xl border border-zinc-300 print:hidden">
          <span className="text-xs font-bold text-zinc-800">Select Topic:</span>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="p-2 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-900 bg-white"
          >
            {(allCompletedTopics.length > 0 ? allCompletedTopics : modules[0].topics.slice(0, 3)).map((t) => (
              <option key={t.id} value={t.id}>
                {t.moduleName} • {t.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ================= PRINTABLE CERTIFICATE CANVAS (BLACK, RED & GOLDEN BORDERS WITH GOLD MEDAL IN RED RIBBON) ================= */}
      <div className="relative mx-auto max-w-4xl rounded-3xl bg-[#0A0A0C] p-2.5 sm:p-3.5 shadow-2xl overflow-hidden border-4 border-[#0A0A0C] ring-2 ring-amber-500/80 print:border-none print:shadow-none print:max-w-none print:rounded-none print:p-0">
        
        {/* Outer Imperial Crimson Red Pinstripe Frame */}
        <div className="rounded-2xl p-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800 shadow-inner">
          
          {/* Top Black, Red & Gold Ribbon Bar */}
          <PrestigeRibbonBar 
            position="top" 
            label={
              certType === 'final'
                ? 'GRAND PLACEMENT READINESS DIPLOMA • ACCREDITED CREDENTIAL'
                : certType === 'faang'
                  ? `TIER-1 MNC TECHNICAL BENCHMARK • ${selectedFaangTest.companies.join(' & ').toUpperCase()} ACCREDITATION`
                  : certType === 'ultimate'
                    ? 'NATIONAL CAMPUS ACCREDITATION • EXECUTIVE PLACEMENT FELLOWSHIP'
                    : 'TOPIC MASTERY DIPLOMA • PLACEMENT EXCELLENCE'
            }
            subtitle={`VERIFICATION ID: ${currentCertId}`}
          />

          {/* Certificate Paper Canvas (Warm Parchment Ivory with Gold & Black Frames) */}
          <div className="relative p-6 sm:p-12 bg-gradient-to-b from-[#FAF9F5] via-[#FFFDF9] to-[#F7F5EE] overflow-hidden">
            
            {/* Subtle Royal Guilloche Security Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#b45309_0.65px,transparent_0.65px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#991b1b_0.65px,transparent_0.65px)] [background-size:48px_48px] opacity-[0.03] pointer-events-none" />
            
            {/* TRIPLE INNER BORDER: Black, Red, and 24K Gold Fillet */}
            <div className="absolute inset-3 sm:inset-5 border-2 border-amber-600/70 rounded-2xl pointer-events-none" />
            <div className="absolute inset-4 sm:inset-6 border border-red-700/40 rounded-xl pointer-events-none" />
            <div className="absolute inset-5 sm:inset-7 border border-dashed border-amber-500/50 rounded-lg pointer-events-none" />

            {/* Regal Corner Filigree Ornaments in 24K Gold & Crimson Red */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t-[3px] border-l-[3px] border-amber-500 pointer-events-none flex items-start justify-start p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <div className="absolute top-5 right-5 w-8 h-8 border-t-[3px] border-r-[3px] border-amber-500 pointer-events-none flex items-start justify-end p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <div className="absolute bottom-5 left-5 w-8 h-8 border-b-[3px] border-l-[3px] border-amber-500 pointer-events-none flex items-end justify-start p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b-[3px] border-r-[3px] border-amber-500 pointer-events-none flex items-end justify-end p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>

            <div className="relative z-10 text-center space-y-6">
              
              {/* Header: Classrooms To Boardrooms Crest & Credential Meta */}
              <div className="flex items-center justify-between border-b border-amber-900/20 pb-5">
                <div className="flex items-center gap-3 text-left">
                  {/* Crest with Black, Red, and Gold Shield */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0A0A0C] text-amber-400 flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-400/80 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-red-600" />
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-500" />
                    <span className="font-display tracking-wider">C2B</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-black text-sm tracking-tight text-zinc-900 font-display">
                        CLASSROOMS TO BOARDROOMS
                      </p>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">
                        Powered By Kapil
                      </span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      National Placement Readiness Authority • Verified Repository
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-amber-300 border border-amber-400/50 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Official Credential</span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1">ID: {currentCertId}</p>
                </div>
              </div>

              {/* Title Block (Minimal, Dignified & High-Contrast) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-red-600 to-amber-500" />
                  <p className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] font-display text-red-800">
                    {certType === 'final'
                      ? 'Grand Placement Final Assessment Credential'
                      : (certType === 'faang' 
                        ? 'Tier-1 MNC Technical Competency Credential' 
                        : (certType === 'ultimate' ? 'Certificate of Ultimate Placement Readiness' : 'Certificate of Topic Competency'))}
                  </p>
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-red-600 to-amber-500" />
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-zinc-950 tracking-tight">
                  {certType === 'final'
                    ? 'GRAND PLACEMENT DIPLOMA'
                    : (certType === 'faang' 
                      ? selectedFaangTest.certificateTitle.toUpperCase()
                      : (certType === 'ultimate' ? 'NATIONAL CAMPUS FELLOW' : currentTopic.name.toUpperCase()))}
                </h1>

                <p className="text-xs sm:text-sm text-zinc-600 italic font-serif pt-1">
                  This credential is formally and irrevocably conferred upon
                </p>
              </div>

              {/* Candidate Name (Minimal, Commanding & Regal) */}
              <div className="py-1">
                <p className="text-2xl sm:text-4xl font-extrabold text-zinc-950 inline-block px-8 pb-1 font-display tracking-tight border-b-2 border-amber-600">
                  {profile.name || 'Kapil Narula'}
                </p>
                <p className="text-xs sm:text-sm text-zinc-700 font-semibold mt-2">
                  {profile.institute || 'National Institute of Technology'} • Department of {profile.department || 'Computer Science'}
                </p>
              </div>

              {/* Body Statement (Minimal Text but Elegant) */}
              <p className="text-xs sm:text-sm text-zinc-700 max-w-2xl mx-auto leading-relaxed font-serif">
                {certType === 'final' ? (
                  <>
                    For distinguished performance and qualification in the comprehensive <strong>Grand Placement Final Assessment (250 Questions • 90 Minutes)</strong> across Quantitative Logic, Computer Science Core, and Executive Situational Judgment.
                  </>
                ) : certType === 'faang' ? (
                  <>
                    For demonstrated technical mastery in Tier-1 algorithmic scalability, distributed system architectures, and production problem-solving aligned with <strong>{selectedFaangTest.companies.join(', ')}</strong> campus benchmarks.
                  </>
                ) : certType === 'ultimate' ? (
                  <>
                    For exceptional analytical speed, algorithmic problem-solving, corporate articulation, and clearance of timed negative-marking campus placement benchmarks.
                  </>
                ) : (
                  <>
                    For successfully mastering all stages of <strong>{currentTopic.name}</strong>, including the Practice Zone, Timed Challenge Arena, and Tier-1 MNC Boss Battle.
                  </>
                )}
              </p>

              {/* Minimal Metrics Indicators (Gold, Red & Black) */}
              <div className="grid grid-cols-3 max-w-md mx-auto gap-3 py-1">
                <div className="p-3 rounded-2xl bg-white border border-amber-500/40 shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-zinc-500">
                    {certType === 'final' ? 'Final Score' : (certType === 'faang' ? 'Mock Test Score' : 'Placement Score')}
                  </p>
                  <p className="text-xl font-black mt-0.5 text-zinc-900 font-display">
                    {certType === 'final'
                      ? (latestFinalAttempt ? `${latestFinalAttempt.totalScore}/1000 (${latestFinalAttempt.percentage}%)` : `${profile.predictedPlacementScore}%`)
                      : (certType === 'faang' 
                        ? (issuedFaangCert ? `${issuedFaangCert.scorePercentage}%` : `${profile.predictedPlacementScore}%`)
                        : `${profile.predictedPlacementScore}%`)}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-amber-500/40 shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-zinc-500">
                    Honors Standing
                  </p>
                  <p className="text-xl font-black mt-0.5 text-red-700 font-display">
                    {certType === 'final' ? 'Top 1% National' : (certType === 'faang' ? 'Tier-1 Ready' : 'Grade A+')}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-amber-500/40 shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-zinc-500">
                    Total Honor XP
                  </p>
                  <p className="text-xl font-black mt-0.5 text-amber-600 font-display">
                    {profile.xp.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Signatures & Centerpiece GOLD MEDAL IN RED RIBBON */}
              <div className="pt-6 border-t border-amber-900/20 grid grid-cols-3 items-end gap-4">
                
                {/* Left: Scannable QR Matrix */}
                <div className="flex flex-col items-center sm:items-start text-left">
                  <button
                    type="button"
                    onClick={() => setIsVerificationModalOpen(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-2xl border-2 border-zinc-900 hover:border-amber-500 shadow-sm flex items-center justify-center cursor-pointer transition-all group relative overflow-hidden"
                    title="Click to verify or scan with smartphone"
                  >
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt={`Scan to verify ${currentCertId}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <QrCode className="w-full h-full text-zinc-800" />
                    )}
                    <div className="absolute inset-0 bg-zinc-950/85 rounded-xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[8px] text-white font-bold transition-opacity p-0.5 text-center">
                      <span>📱 Scan Phone</span>
                      <span className="text-amber-400">Live Verify</span>
                    </div>
                  </button>
                  <p className="text-[9px] font-mono text-zinc-700 font-semibold mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span>Scan to Authenticate</span>
                  </p>
                </div>

                {/* Center: THE 3D GOLD MEDAL IN RED RIBBON (Signature Centerpiece!) */}
                <div className="flex flex-col items-center">
                  <GoldMedalWithRedRibbon 
                    size="xl" 
                    subtitle="VERIFIED" 
                    badgeCode="OFFICIAL MEDAL" 
                  />
                </div>

                {/* Right: Signature Line */}
                <div className="text-center sm:text-right">
                  <div className="h-10 flex items-center justify-center sm:justify-end">
                    <span className="font-serif italic font-black text-lg sm:text-2xl text-zinc-900">
                      Kapil Narula
                    </span>
                  </div>
                  <div className="w-36 sm:w-44 ml-auto border-t-2 border-amber-600 pt-1">
                    <p className="text-xs font-bold text-zinc-900">Kapil Narula</p>
                    <p className="text-[10px] text-zinc-500">Program Director, Classrooms To Boardrooms</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Black, Red & Gold Ribbon Bar */}
          <PrestigeRibbonBar 
            position="bottom" 
            label="CLASSROOMS TO BOARDROOMS • REPOSITORIUM AUTHENTICUM" 
            subtitle={`VERIFIED ID: ${currentCertId}`}
          />

        </div>

      </div>

      {/* Live Verification Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A0A0C] text-white p-4 rounded-2xl border-2 border-amber-500/40 shadow-md print:hidden">
        <div className="flex items-center gap-2 text-xs text-zinc-300 min-w-0">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">
            Public Verification Portal: <strong className="text-amber-300 font-mono text-[11px]">{liveVerificationUrl}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Open Verification Portal</span>
          </button>
          <button
            onClick={handleCopyVerification}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
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

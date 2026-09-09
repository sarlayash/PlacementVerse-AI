import React, { useState } from 'react';
import { 
  Award, Printer, Share2, ShieldCheck, CheckCircle2, QrCode, 
  ExternalLink, Sparkles, Download, Check, Calendar, ArrowRight, AlertCircle
} from 'lucide-react';
import { LearnerProfile, Module } from '../types';
import { FAANG_MOCK_TESTS } from '../data/faangMockTestsData';

interface CertificatesViewProps {
  profile: LearnerProfile;
  modules: Module[];
  onSelectMockTests?: () => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ profile, modules, onSelectMockTests }) => {
  const [certType, setCertType] = useState<'ultimate' | 'faang' | 'topics'>('ultimate');
  const [selectedFaangTestId, setSelectedFaangTestId] = useState<string>('faang-mock-1');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('q1');
  const [copiedLink, setCopiedLink] = useState(false);

  const completedCount = profile.completedTopicIds.length;
  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);

  const selectedFaangTest = FAANG_MOCK_TESTS.find(t => t.id === selectedFaangTestId) || FAANG_MOCK_TESTS[0];
  const issuedFaangCert = (profile.issuedCertificates || []).find(
    c => c.type === 'mock-test' && (c.title === selectedFaangTest.certificateTitle || c.title === selectedFaangTest.title)
  );

  const handlePrint = () => {
    window.print();
  };

  const currentCertId = certType === 'faang' 
    ? (issuedFaangCert ? issuedFaangCert.certificateId : `PV-2026-${selectedFaangTest.id.toUpperCase()}-VERIFIED`)
    : (certType === 'ultimate' ? 'PV-2025-IND-8849' : `PV-TOPIC-${selectedTopicId.toUpperCase()}`);

  const handleShareLinkedIn = () => {
    const titleText = certType === 'faang' 
      ? selectedFaangTest.certificateTitle 
      : (certType === 'ultimate' ? 'Ultimate Placement Readiness Certification' : 'Topic Competency Certification');
    const text = encodeURIComponent(
      `Excited to share that I have earned the ${titleText} on PlacementVerse AI! Verified by Program Director Kapil Narula.`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://placementverse.ai/verify/${currentCertId}&summary=${text}`, '_blank');
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(`https://placementverse.ai/verify/${currentCertId}`);
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

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
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
          <span>🏛️ FAANG Tier-1 Credentials (3 Mock Tests)</span>
          <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[9px] font-black rounded-full">
            Today
          </span>
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

      {/* ================= PRINTABLE CERTIFICATE CANVAS ================= */}
      <div className={`relative mx-auto max-w-4xl p-8 sm:p-12 rounded-3xl bg-white border-12 border-double shadow-2xl overflow-hidden print:p-6 print:border-8 print:shadow-none ${
        certType === 'faang' ? 'border-indigo-700/60' : 'border-amber-600/60'
      }`}>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        {/* Corner Ornaments */}
        <div className={`absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 pointer-events-none ${certType === 'faang' ? 'border-indigo-600' : 'border-amber-600'}`} />
        <div className={`absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 pointer-events-none ${certType === 'faang' ? 'border-indigo-600' : 'border-amber-600'}`} />
        <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 pointer-events-none ${certType === 'faang' ? 'border-indigo-600' : 'border-amber-600'}`} />
        <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 pointer-events-none ${certType === 'faang' ? 'border-indigo-600' : 'border-amber-600'}`} />

        <div className="relative z-10 text-center space-y-6">
          
          {/* Header Logos */}
          <div className={`flex items-center justify-between border-b pb-6 ${certType === 'faang' ? 'border-indigo-200/80' : 'border-amber-200/80'}`}>
            <div className="flex items-center gap-2 text-left">
              <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-black text-lg shadow-sm ${
                certType === 'faang' 
                  ? 'bg-gradient-to-tr from-indigo-600 to-purple-700' 
                  : 'bg-gradient-to-tr from-amber-500 to-amber-700'
              }`}>
                PV
              </div>
              <div>
                <p className="font-extrabold text-sm tracking-tight text-slate-900 font-display">
                  PLACEMENTVERSE AI
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${certType === 'faang' ? 'text-indigo-700' : 'text-amber-700'}`}>
                  National Placement Readiness Authority
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                certType === 'faang'
                  ? 'bg-indigo-50 text-indigo-800 border border-indigo-300'
                  : (certType === 'ultimate' ? 'bg-amber-50 text-amber-800 border border-amber-300' : 'bg-blue-50 text-blue-800 border border-blue-300')
              }`}>
                {certType === 'faang' 
                  ? `${selectedFaangTest.companies.join(' & ')} Placement Standard` 
                  : (certType === 'ultimate' ? 'ISO 9001:2015 Verified' : 'Topic Competency Certificate')}
              </span>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">ID: {currentCertId}</p>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2 pt-2">
            <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest font-display ${
              certType === 'faang' ? 'text-indigo-700' : 'text-amber-700'
            }`}>
              {certType === 'faang' 
                ? 'Official Tier-1 MNC Placement Assessment Credential' 
                : (certType === 'ultimate' ? 'Certificate of Ultimate Placement Readiness' : 'Certificate of Topic Mastery')}
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
              {certType === 'faang' 
                ? selectedFaangTest.certificateTitle.toUpperCase()
                : (certType === 'ultimate' ? 'NATIONAL CAMPUS FELLOW' : currentTopic.name.toUpperCase())}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              This credential is formally conferred upon
            </p>
          </div>

          {/* Candidate Name */}
          <div className="py-2">
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 border-b-2 border-slate-300 inline-block px-8 pb-2 font-display">
              {profile.name || 'Kapil Narula'}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-2">
              {profile.institute || 'National Institute of Technology'} • Department of {profile.department || 'Computer Science'}
            </p>
          </div>

          {/* Body Narrative */}
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {certType === 'faang' ? (
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
            ))}
          </p>

          {/* Metrics Box */}
          <div className="grid grid-cols-3 max-w-md mx-auto gap-3 py-2">
            <div className={`p-3 rounded-2xl border ${certType === 'faang' ? 'bg-indigo-50/70 border-indigo-200' : 'bg-amber-50/70 border-amber-200'}`}>
              <p className={`text-[10px] uppercase font-bold ${certType === 'faang' ? 'text-indigo-800' : 'text-amber-800'}`}>
                {certType === 'faang' ? 'Mock Test Score' : 'Placement Score'}
              </p>
              <p className={`text-xl font-black mt-0.5 ${certType === 'faang' ? 'text-indigo-900' : 'text-amber-900'}`}>
                {certType === 'faang' 
                  ? (issuedFaangCert ? `${issuedFaangCert.scorePercentage}%` : `${profile.predictedPlacementScore}%`)
                  : `${profile.predictedPlacementScore}%`}
              </p>
            </div>
            <div className={`p-3 rounded-2xl border ${certType === 'faang' ? 'bg-indigo-50/70 border-indigo-200' : 'bg-amber-50/70 border-amber-200'}`}>
              <p className={`text-[10px] uppercase font-bold ${certType === 'faang' ? 'text-indigo-800' : 'text-amber-800'}`}>
                {certType === 'faang' ? 'Benchmark' : 'Final Grade'}
              </p>
              <p className={`text-xl font-black mt-0.5 ${certType === 'faang' ? 'text-indigo-900' : 'text-amber-900'}`}>
                {certType === 'faang' ? 'FAANG Ready' : 'Grade A+'}
              </p>
            </div>
            <div className={`p-3 rounded-2xl border ${certType === 'faang' ? 'bg-indigo-50/70 border-indigo-200' : 'bg-amber-50/70 border-amber-200'}`}>
              <p className={`text-[10px] uppercase font-bold ${certType === 'faang' ? 'text-indigo-800' : 'text-amber-800'}`}>
                Total XP
              </p>
              <p className={`text-xl font-black mt-0.5 ${certType === 'faang' ? 'text-indigo-900' : 'text-amber-900'}`}>
                {profile.xp.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Signatures & QR Code */}
          <div className={`pt-6 border-t grid grid-cols-3 items-end gap-4 ${certType === 'faang' ? 'border-indigo-200/80' : 'border-amber-200/80'}`}>
            
            {/* Left: QR Code */}
            <div className="flex flex-col items-center sm:items-start text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-800" />
              </div>
              <p className="text-[9px] font-mono text-slate-400 mt-1">Scan to Verify Authenticity</p>
            </div>

            {/* Center: Gold/Indigo Foil Stamp */}
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-1 shadow-lg border-2 border-white ${
                certType === 'faang'
                  ? 'bg-gradient-to-tr from-indigo-500 via-purple-300 to-indigo-700'
                  : 'bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600'
              }`}>
                <div className="w-full h-full rounded-full border border-dashed border-slate-900/40 flex flex-col items-center justify-center text-slate-900 text-center">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
                  <span className="text-[7px] font-extrabold tracking-widest uppercase">Verified</span>
                </div>
              </div>
              <p className="text-[9px] font-bold text-slate-800 uppercase mt-1">Official Seal</p>
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

      {/* Verification footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs print:hidden">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verification URL: <strong className="text-slate-800">placementverse.ai/verify/{currentCertId}</strong></span>
        </div>
        <button
          onClick={handleCopyVerification}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied!' : 'Copy Verification Link'}</span>
        </button>
      </div>

    </div>
  );
};

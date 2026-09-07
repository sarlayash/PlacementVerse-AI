import React, { useState } from 'react';
import { 
  Award, Printer, Share2, ShieldCheck, CheckCircle2, QrCode, 
  ExternalLink, Sparkles, Download, Check 
} from 'lucide-react';
import { LearnerProfile, Module } from '../types';

interface CertificatesViewProps {
  profile: LearnerProfile;
  modules: Module[];
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ profile, modules }) => {
  const [certType, setCertType] = useState<'ultimate' | 'topics'>('ultimate');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('q1');
  const [copiedLink, setCopiedLink] = useState(false);

  const completedCount = profile.completedTopicIds.length;
  const totalTopics = modules.reduce((acc, m) => acc + m.topics.length, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `Excited to share that I have achieved the Ultimate Placement Readiness Certification on PlacementVerse AI! Scored ${profile.predictedPlacementScore}% with ${profile.badgesEarned.length} placement badges. Verified by Kapil Narula.`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://placementverse.ai/verify/PV-2025-IND-8849&summary=${text}`, '_blank');
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(`https://placementverse.ai/verify/PV-2025-IND-8849`);
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
            ISO and industry-endorsed certificates with cryptographic QR code verification. Share directly to your LinkedIn profile and add to campus resume folders.
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
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 print:hidden">
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

      {/* ================= PRINTABLE CERTIFICATE CANVAS ================= */}
      <div className="relative mx-auto max-w-4xl p-8 sm:p-12 rounded-3xl bg-white border-12 border-double border-amber-600/60 shadow-2xl overflow-hidden print:p-6 print:border-8 print:shadow-none">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

        <div className="relative z-10 text-center space-y-6">
          
          {/* Header Logos */}
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-6">
            <div className="flex items-center gap-2 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 text-white flex items-center justify-center font-black text-lg shadow-sm">
                PV
              </div>
              <div>
                <p className="font-extrabold text-sm tracking-tight text-slate-900 font-display">
                  PLACEMENTVERSE AI
                </p>
                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                  National Readiness Authority
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-bold uppercase tracking-widest">
                {certType === 'ultimate' ? 'ISO 9001:2015 Verified' : 'Topic Competency Certificate'}
              </span>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">ID: PV-2025-IND-8849</p>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2 pt-2">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-700 font-display">
              {certType === 'ultimate' ? 'Certificate of Ultimate Placement Readiness' : 'Certificate of Topic Mastery'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
              {certType === 'ultimate' ? 'NATIONAL CAMPUS FELLOW' : currentTopic.name.toUpperCase()}
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
            {certType === 'ultimate' ? (
              <>
                for exceptional demonstration of analytical speed, logical problem-solving, verbal clarity, corporate email articulation, group discussion leadership, and rigorous MNC Boss Battle clearances under timed negative-marking campus conditions.
              </>
            ) : (
              <>
                for successfully mastering all four rigorous stages of <strong>{currentTopic.name}</strong>, including the 10-Minute AI Conceptual Module, Practice Zone, 15-Minute Timed Challenge, and defeating the Tier-1 MNC Boss Battle with a score ≥ 80%.
              </>
            )}
          </p>

          {/* Metrics Box */}
          <div className="grid grid-cols-3 max-w-md mx-auto gap-3 py-2">
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
              <p className="text-[10px] uppercase font-bold text-amber-800">Placement Score</p>
              <p className="text-xl font-black text-amber-900 mt-0.5">{profile.predictedPlacementScore}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
              <p className="text-[10px] uppercase font-bold text-amber-800">Final Grade</p>
              <p className="text-xl font-black text-amber-900 mt-0.5">Grade A+</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
              <p className="text-[10px] uppercase font-bold text-amber-800">Total XP</p>
              <p className="text-xl font-black text-amber-900 mt-0.5">{profile.xp.toLocaleString()}</p>
            </div>
          </div>

          {/* Signatures & QR Code */}
          <div className="pt-6 border-t border-amber-200/80 grid grid-cols-3 items-end gap-4">
            
            {/* Left: QR Code */}
            <div className="flex flex-col items-center sm:items-start text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-800" />
              </div>
              <p className="text-[9px] font-mono text-slate-400 mt-1">Scan to Verify Authenticity</p>
            </div>

            {/* Center: Gold Foil Stamp */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 flex items-center justify-center p-1 shadow-lg border-2 border-white">
                <div className="w-full h-full rounded-full border border-dashed border-amber-900/40 flex flex-col items-center justify-center text-amber-950 text-center">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900" />
                  <span className="text-[7px] font-extrabold tracking-widest uppercase">Verified</span>
                </div>
              </div>
              <p className="text-[9px] font-bold text-amber-800 uppercase mt-1">Official Seal</p>
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
          <span>Verification URL: <strong className="text-slate-800">placementverse.ai/verify/PV-2025-IND-8849</strong></span>
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

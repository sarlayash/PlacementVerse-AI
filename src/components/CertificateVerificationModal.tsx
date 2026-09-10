import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CheckCircle2, Award, Calendar, ExternalLink, 
  Copy, Check, Search, ArrowLeft, Download, Share2, Building2, 
  GraduationCap, User, Hash, Lock, AlertTriangle, QrCode
} from 'lucide-react';
import { 
  lookupCertificateData, 
  VerifiedCertificateResult, 
  generateQrCodeDataUrl,
  getCertificateVerificationUrl 
} from '../services/certificateVerificationService';
import { GoogleRibbonBar } from './GoogleRibbon';

interface CertificateVerificationModalProps {
  initialCode: string;
  isOpen: boolean;
  onClose: () => void;
  onViewInCertificatesTab?: () => void;
}

export const CertificateVerificationModal: React.FC<CertificateVerificationModalProps> = ({
  initialCode,
  isOpen,
  onClose,
  onViewInCertificatesTab,
}) => {
  const [searchCode, setSearchCode] = useState<string>(initialCode || '');
  const [result, setResult] = useState<VerifiedCertificateResult>(() => lookupCertificateData(initialCode || 'PV-2025-IND-8849'));
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      const data = lookupCertificateData(initialCode);
      setResult(data);
    }
  }, [initialCode]);

  useEffect(() => {
    let isMounted = true;
    if (result && result.code) {
      const liveUrl = getCertificateVerificationUrl(result.code);
      generateQrCodeDataUrl(liveUrl).then(url => {
        if (isMounted) {
          setQrCodeUrl(url);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [result]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const data = lookupCertificateData(searchCode.trim());
      setResult(data);
      setIsSearching(false);
    }, 200);
  };

  const handleCopyLink = () => {
    const liveUrl = getCertificateVerificationUrl(result.code);
    navigator.clipboard.writeText(liveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const liveUrl = getCertificateVerificationUrl(result.code);
    const text = encodeURIComponent(
      `Verified Classrooms To Boardrooms Placement Readiness Credential: ${result.title} formally conferred upon ${result.studentName}. Powered By Kapil Narula.`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(liveUrl)}&summary=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Top Google Colored Ribbon */}
        <GoogleRibbonBar 
          position="top"
          label="GOOGLE & FAANG ACCREDITED VERIFICATION PORTAL • SECURE LEDGER"
          subtitle="PUBLIC REAL-TIME CREDENTIAL REPOSITORY"
        />

        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-display tracking-tight text-white flex items-center gap-2">
                <span>Classrooms To Boardrooms Credential Verification Portal</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Live System
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Official public verification authority powered by Kapil Narula
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close Verification Window"
          >
            ✕
          </button>
        </div>

        {/* Search Bar to verify any code */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter any verification code (e.g. PV-2025-IND-8849, PV-FINAL-250Q-...)"
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              {isSearching ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {result.found ? (
            <>
              {/* Authenticity Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                        {result.status}
                      </span>
                      <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                        Cryptographically Validated
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display mt-0.5">
                      {result.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      National Placement Readiness Authority ID: <strong className="font-mono text-emerald-950">{result.code}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right sm:text-right shrink-0 bg-white/80 px-4 py-2 rounded-xl border border-emerald-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Assessment Score</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-700 font-display">
                    {result.scorePercentage}%
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-800">{result.grade}</p>
                </div>
              </div>

              {/* Main Credential Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Candidate Info Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    Recipient Candidate Details
                  </h5>
                  
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-slate-500">Full Name:</span>
                      <p className="text-sm font-black text-slate-900">{result.studentName}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Institution:</span>
                      <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{result.institute}</span>
                      </p>
                    </div>
                    {result.department && (
                      <div>
                        <span className="text-slate-500">Department / Batch:</span>
                        <p className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{result.department} • {result.batch}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Issuance & Endorsement Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    Issuance Authority & Verification
                  </h5>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-slate-500">Conferred & Endorsed By:</span>
                      <p className="font-extrabold text-slate-900">{result.endorsedBy}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Date of Official Conformance:</span>
                      <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{result.issueDate}</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Accredited Benchmark:</span>
                      <p className="font-semibold text-indigo-700 mt-0.5">{result.benchmark}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Verified Competencies */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Technical Competencies
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.competencies.map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        ✓
                      </div>
                      <span className="font-semibold">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scannable QR Code and Cryptographic Verification Seal */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-emerald-50 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Real Scannable QR Code Image */}
                  <div className="w-24 h-24 bg-white p-1 rounded-2xl border-2 border-indigo-200 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
                    {qrCodeUrl ? (
                      <img 
                        src={qrCodeUrl} 
                        alt={`Scan to verify ${result.code}`}
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <QrCode className="w-12 h-12 text-slate-400" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Live Scannable QR Matrix
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 max-w-sm">
                      Scan this matrix with any smartphone camera or Google Lens to instantly authenticate this credential.
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 truncate max-w-xs sm:max-w-sm">
                      {result.verificationHash}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Verification Link'}</span>
                  </button>

                  <button
                    onClick={handleShareLinkedIn}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share on LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Direct Verification Link Display */}
              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200">
                <span>Public Verification URL: </span>
                <a 
                  href={getCertificateVerificationUrl(result.code)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-indigo-600 hover:underline break-all"
                >
                  {getCertificateVerificationUrl(result.code)}
                </a>
              </div>
            </>
          ) : (
            /* Not Found Alert */
            <div className="p-8 rounded-3xl bg-rose-50 border border-rose-200 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-rose-950 font-display">
                Verification Code Not Found
              </h4>
              <p className="text-xs text-rose-700 max-w-md mx-auto">
                No active credential record exists for code &ldquo;<strong className="font-mono">{result.code}</strong>&rdquo;. Please check the code for typos or enter a standard accredited code such as <code className="bg-rose-100 px-1 py-0.5 rounded font-mono font-bold">PV-2025-IND-8849</code>.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => {
                    setSearchCode('PV-2025-IND-8849');
                    setResult(lookupCertificateData('PV-2025-IND-8849'));
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Load Sample Accredited Credential (PV-2025-IND-8849)
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>SSL Secured Public Verification by Classrooms To Boardrooms Placement Readiness</span>
          </div>

          <div className="flex items-center gap-2">
            {onViewInCertificatesTab && (
              <button
                onClick={() => {
                  onClose();
                  onViewInCertificatesTab();
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold cursor-pointer"
              >
                View in Certificates Tab
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>

        {/* Bottom Google Colored Ribbon */}
        <GoogleRibbonBar 
          position="bottom"
          label="Classrooms To Boardrooms Placement Readiness • Powered By Kapil Narula"
          subtitle="Direct Verification Engine • Official Credential Ledger"
        />

      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Award, Sparkles, ExternalLink, Check, Lock, Calendar, Star } from 'lucide-react';
import { Badge } from '../types';

/**
 * Official Google 4-Color Palette:
 * Blue:   #4285F4
 * Red:    #EA4335
 * Yellow: #FBBC05
 * Green:  #34A853
 */
export const GOOGLE_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
};

interface GoogleRibbonBarProps {
  position: 'top' | 'bottom';
  label?: string;
  subtitle?: string;
  className?: string;
  variant?: 'standard' | 'slim' | 'card';
}

/**
 * World-Class Google 4-Color Ribbon Bar for Top and Bottom Edges
 * Features rich satin gloss, 3D folded edge tabs, and metallic pin-stripes.
 */
export const GoogleRibbonBar: React.FC<GoogleRibbonBarProps> = ({
  position,
  label,
  subtitle,
  className = '',
  variant = 'standard',
}) => {
  const isSlim = variant === 'slim';
  const isCard = variant === 'card';

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* Top micro metallic fillet if on bottom, or bottom micro fillet if on top */}
      {position === 'bottom' && (
        <div className="h-[2px] w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 shadow-xs" />
      )}

      {/* Main 4-Color Stripe Ribbon */}
      <div className={`relative w-full flex ${isSlim ? 'h-2' : isCard ? 'h-2.5 sm:h-3' : 'h-3.5 sm:h-4.5'}`}>
        {/* Google Blue */}
        <div className="flex-1 bg-[#4285F4] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/15" />
        </div>
        {/* Google Red */}
        <div className="flex-1 bg-[#EA4335] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/15" />
        </div>
        {/* Google Yellow */}
        <div className="flex-1 bg-[#FBBC05] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10" />
        </div>
        {/* Google Green */}
        <div className="flex-1 bg-[#34A853] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/15" />
        </div>

        {/* Satin sheen reflection sweeping across */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Optional Centered Official Label / Ribbon Banner Bar */}
      {label && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white px-4 py-1 text-center flex items-center justify-center gap-2 border-y border-white/10 shadow-inner">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 font-display">
              {label}
            </span>
          </div>
          {subtitle && (
            <span className="hidden sm:inline text-[9px] text-slate-400 font-medium">
              • {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Bottom micro metallic fillet if on top */}
      {position === 'top' && (
        <div className="h-[2px] w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 shadow-xs" />
      )}
    </div>
  );
};

interface GoogleSealProps {
  size?: 'sm' | 'md' | 'lg';
  withRibbonTails?: boolean;
  className?: string;
  badgeCode?: string;
}

/**
 * World-Class Google Certification Seal with 4-Color Ring and Dual Draping Ribbon Tails
 */
export const GoogleCertificationSeal: React.FC<GoogleSealProps> = ({
  size = 'md',
  withRibbonTails = true,
  className = '',
  badgeCode = 'OFFICIAL SEAL',
}) => {
  const dimensions = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-24 h-24 sm:w-32 sm:h-32',
  }[size];

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      
      {/* The Circular 3D Seal Medallion */}
      <div className={`relative ${dimensions} rounded-full p-1 shadow-2xl flex items-center justify-center z-10 select-none group`}>
        
        {/* Outer 4-color segmented Google ring */}
        <div className="absolute inset-0 rounded-full overflow-hidden p-1 shadow-md">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* 4 Quarter Arcs of Google Colors */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="#4285F4" strokeWidth="6" strokeDasharray="72.25 216.75" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#EA4335" strokeWidth="6" strokeDasharray="72.25 216.75" strokeDashoffset="-72.25" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#FBBC05" strokeWidth="6" strokeDasharray="72.25 216.75" strokeDashoffset="-144.5" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="#34A853" strokeWidth="6" strokeDasharray="72.25 216.75" strokeDashoffset="-216.75" />
          </svg>
        </div>

        {/* Inner Gold Foil Medallion with Serrated / Starburst Rim */}
        <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-0.5 shadow-inner flex items-center justify-center border border-amber-300">
          
          {/* Beveled Core Disc */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 flex flex-col items-center justify-center text-center p-1 border border-amber-500/60 shadow-inner relative overflow-hidden">
            
            {/* Fine Concentric Rings */}
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-700/30" />
            <div className="absolute inset-2.5 rounded-full border border-amber-700/20" />

            {/* Specular sheen reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Center Icon: Google Standards Shield & Star */}
            <div className="relative z-10 flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-900 drop-shadow-xs stroke-[2.2]" />
              <span className="text-[6.5px] sm:text-[8px] font-black uppercase tracking-wider text-amber-950 font-display mt-0.5">
                VERIFIED
              </span>
              <span className="text-[5px] sm:text-[6px] font-extrabold uppercase tracking-widest text-amber-900/80">
                GOOGLE STD
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Dual Hanging Satin Ribbon Tails (Draped below the seal) */}
      {withRibbonTails && (
        <div className="relative -mt-3.5 flex justify-center items-start gap-1 z-0 pointer-events-none">
          {/* Left Ribbon Tail (Google Blue with gold border) */}
          <div className="w-3.5 sm:w-4.5 h-8 sm:h-10 bg-gradient-to-b from-[#4285F4] to-[#1a73e8] border-x border-[#1a73e8] shadow-md transform -rotate-8 origin-top relative overflow-hidden"
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/20" />
            <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-amber-300/60" />
          </div>

          {/* Right Ribbon Tail (Google Red with gold border) */}
          <div className="w-3.5 sm:w-4.5 h-8 sm:h-10 bg-gradient-to-b from-[#EA4335] to-[#c5221f] border-x border-[#c5221f] shadow-md transform rotate-8 origin-top relative overflow-hidden"
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/20" />
            <div className="absolute top-0 bottom-0 right-0.5 w-[1px] bg-amber-300/60" />
          </div>
        </div>
      )}

      {/* Seal Caption */}
      <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest uppercase text-slate-700 font-display mt-1">
        {badgeCode}
      </span>
    </div>
  );
};

interface GoogleSkillBadgeMedallionProps {
  badge: Badge;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Authentic Google Cloud & Developer Style Skill Badge Medallion
 * Features hexagonal geometry, metallic chamfer, top ribbon tab, acrylic dome reflection.
 */
export const GoogleSkillBadgeMedallion: React.FC<GoogleSkillBadgeMedallionProps> = ({
  badge,
  isUnlocked,
  size = 'md',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20 text-2xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-32 h-32 text-4xl',
  }[size];

  // Derive metallic rim based on category
  const rimGradient = isUnlocked
    ? badge.category === 'Milestone'
      ? 'from-amber-200 via-amber-400 to-amber-600'
      : badge.category === 'FAANG'
        ? 'from-indigo-300 via-indigo-400 to-purple-600'
        : 'from-slate-200 via-slate-400 to-slate-600'
    : 'from-slate-300 via-slate-400 to-slate-500';

  return (
    <div 
      onClick={onClick}
      className={`relative flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-105 select-none`}
    >
      {/* Top Google 4-Color Ribbon Tab on the Medallion */}
      <div className="w-10 sm:w-12 h-2 flex rounded-t-sm overflow-hidden shadow-xs z-20 -mb-0.5">
        <div className="flex-1 bg-[#4285F4]" />
        <div className="flex-1 bg-[#EA4335]" />
        <div className="flex-1 bg-[#FBBC05]" />
        <div className="flex-1 bg-[#34A853]" />
      </div>

      {/* Outer Hexagonal Medallion Container */}
      <div
        className={`relative ${sizeClasses} flex items-center justify-center p-1.5 shadow-xl transition-all ${
          isUnlocked
            ? 'filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]'
            : 'filter grayscale opacity-60'
        }`}
        style={{
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
        }}
      >
        {/* Metallic Bevel Rim */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${rimGradient} p-1 shadow-inner`}
          style={{
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          }}
        />

        {/* Inner Facet Surface */}
        <div 
          className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden border border-white/40 ${
            isUnlocked
              ? `bg-gradient-to-br ${badge.gradient}`
              : 'bg-slate-300 text-slate-500'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          }}
        >
          {/* Subtle Guilloche / Grid Pattern inside badge */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />

          {/* Acrylic Glass Highlight Arc (Google Standard) */}
          <div className="absolute -top-6 -left-6 w-28 h-28 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full pointer-events-none transform -rotate-12" />

          {/* Badge Icon / Symbol */}
          <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            <span>{badge.icon}</span>
          </div>

          {/* Locked Overlay Icon */}
          {!isUnlocked && (
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-20">
              <Lock className="w-6 h-6 text-white/90" />
            </div>
          )}

          {/* Bottom Medallion Tier Sash Ribbon */}
          {isUnlocked && (
            <div className="absolute bottom-0 inset-x-0 h-4 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center border-t border-white/20">
              <span className="text-[7px] font-black uppercase tracking-widest text-amber-300 font-display">
                {badge.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Hanging Ribbon Tail on Badge (Google Standard) */}
      {isUnlocked && (
        <div className="relative -mt-1 w-7 h-3 flex items-center justify-center z-10 pointer-events-none">
          <div 
            className="w-full h-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] shadow-xs"
            style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 50% 75%, 20% 100%)' }}
          />
        </div>
      )}
    </div>
  );
};

interface BadgeDetailModalProps {
  badge: Badge | null;
  isUnlocked: boolean;
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

/**
 * Google-Standard Verified Skill Badge Inspector Modal
 * Features full credential metadata, criteria verification, and verified LinkedIn badge sharing.
 */
export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  isUnlocked,
  isOpen,
  onClose,
  studentName,
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!isOpen || !badge) return null;

  const credentialId = `PV-BADGE-${badge.id.toUpperCase()}-2026`;
  const verificationUrl = typeof window !== 'undefined' ? `${window.location.origin}/?verify=${credentialId}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `Earned the Google-standard verified credential: ${badge.name} (${badge.category} Category) on PlacementVerse AI! Authorized by Program Director Kapil Narula.`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}&summary=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Top Google 4-Color Ribbon */}
        <GoogleRibbonBar 
          position="top" 
          label="Google Standard Verified Skill Badge" 
          subtitle="PlacementVerse Authority" 
        />

        {/* Modal Header with Close button */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              {badge.category} Track
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isUnlocked 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {isUnlocked ? '✓ Credential Conferred' : '🔒 Locked Credential'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-2 text-center space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Centered Big Google Skill Medallion */}
          <div className="py-2 flex justify-center">
            <GoogleSkillBadgeMedallion 
              badge={badge} 
              isUnlocked={isUnlocked} 
              size="lg" 
            />
          </div>

          {/* Badge Titles */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {badge.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              {badge.description}
            </p>
          </div>

          {/* Verification Attributes Grid */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Recipient Candidate:</span>
              <span className="font-bold text-slate-900">{studentName || 'Kapil Narula'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Accredited Standard:</span>
              <span className="font-bold text-indigo-700">Google Cloud / FAANG Benchmark</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Evaluation Criteria:</span>
              <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">{badge.requirement}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Earned XP Bonus:</span>
              <span className="font-black text-amber-600">+{badge.xpBonus} XP</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 font-mono text-[10px]">
              <span className="text-slate-400">Credential ID:</span>
              <span className="text-slate-700 font-bold">{credentialId}</span>
            </div>
          </div>

          {/* LinkedIn & Link Actions */}
          {isUnlocked ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                onClick={handleShareLinkedIn}
                className="w-full sm:flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Add to LinkedIn Profile</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <ShieldCheck className="w-4 h-4 text-indigo-600" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium">
              💡 Complete the requirement &ldquo;<strong>{badge.requirement}</strong>&rdquo; to officially unlock this credential and mint your Google-standard digital badge.
            </div>
          )}

        </div>

        {/* Bottom Google 4-Color Ribbon */}
        <GoogleRibbonBar 
          position="bottom" 
          label="PLACEMENTVERSE NATIONAL ACCREDITATION AUTHORITY" 
          variant="slim" 
        />

      </div>
    </div>
  );
};

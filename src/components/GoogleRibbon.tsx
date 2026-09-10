import React from 'react';
import { ShieldCheck, Award, Sparkles, ExternalLink, Check, Lock, Star } from 'lucide-react';
import { Badge } from '../types';

/**
 * Signature Sovereign Palette:
 * Onyx Black:    #0A0A0B / #121214
 * Imperial Red:  #B91C1C / #DC2626 / #7F1D1D
 * 24K Royal Gold: #F59E0B / #D97706 / #FBBF24 / #FEF08A
 */
export const PRESTIGE_COLORS = {
  black: '#0A0A0B',
  red: '#DC2626',
  crimson: '#991B1B',
  gold: '#F59E0B',
  goldLight: '#FDE68A',
  goldDark: '#B45309',
};

// Aliased for any legacy imports
export const GOOGLE_COLORS = PRESTIGE_COLORS;

interface RibbonBarProps {
  position: 'top' | 'bottom';
  label?: string;
  subtitle?: string;
  className?: string;
  variant?: 'standard' | 'slim' | 'card';
}

/**
 * Unique Sovereign Black, Red & Golden Border Ribbon Bar
 * Features luxury onyx black backing, precision imperial red ribbon stripe, and radiant 24K gold metallic trims.
 */
export const PrestigeRibbonBar: React.FC<RibbonBarProps> = ({
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
      {/* 24K Gold Metallic Trim (Top or Bottom depending on position) */}
      {position === 'bottom' && (
        <div className="h-[2px] w-full bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 shadow-xs" />
      )}

      {/* Triple-Stripe Sovereign Border: Black & Red & Gold */}
      <div className={`relative w-full flex ${isSlim ? 'h-2' : isCard ? 'h-2.5 sm:h-3' : 'h-3.5 sm:h-4'}`}>
        {/* Deep Onyx Black section */}
        <div className="w-1/4 bg-gradient-to-r from-[#0a0a0c] via-[#17171c] to-[#0a0a0c] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />
        </div>
        
        {/* Imperial Crimson Red Satin Ribbon section (Dominant) */}
        <div className="w-1/2 bg-gradient-to-r from-[#7f1d1d] via-[#dc2626] to-[#7f1d1d] relative overflow-hidden">
          {/* Subtle silk weave diagonal pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] [background-size:6px_6px] opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/35" />
          {/* Gold pinstripe woven into red ribbon */}
          <div className="absolute inset-y-0 left-2 w-[1.5px] bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600 opacity-80" />
          <div className="absolute inset-y-0 right-2 w-[1.5px] bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600 opacity-80" />
        </div>

        {/* Deep Onyx Black section */}
        <div className="w-1/4 bg-gradient-to-r from-[#0a0a0c] via-[#17171c] to-[#0a0a0c] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />
        </div>

        {/* Light reflection sheen across all stripes */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Elegant Minimal Center Badge / Inscription */}
      {label && (
        <div className="bg-gradient-to-r from-[#0A0A0C] via-[#141418] to-[#0A0A0C] text-white px-4 py-1 text-center flex items-center justify-center gap-2 border-y border-amber-500/30 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90 font-display">
              {label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-red-500 to-rose-400 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          </div>
          {subtitle && (
            <span className="hidden sm:inline text-[9px] text-slate-400 font-mono tracking-wider">
              • {subtitle}
            </span>
          )}
        </div>
      )}

      {/* 24K Gold Metallic Trim */}
      {position === 'top' && (
        <div className="h-[2px] w-full bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 shadow-xs" />
      )}
    </div>
  );
};

// Aliased for backwards compatibility
export const GoogleRibbonBar = PrestigeRibbonBar;

interface GoldMedalWithRedRibbonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  isUnlocked?: boolean;
  className?: string;
  badgeCode?: string;
}

/**
 * Masterpiece 3D Gold Medal in Luxurious Folded Red Ribbon
 * - Authentic silk red neck-ribbon folds with metallic golden edge stitching
 * - Gleaming 24K embossed gold medallion with outer coin-milled bevel and specular sheen
 * - Draped double red ribbon tails with gold borders and V-cut swallowtails
 * - Absolutely unique, unmistakable original design
 */
export const GoldMedalWithRedRibbon: React.FC<GoldMedalWithRedRibbonProps> = ({
  size = 'md',
  icon,
  title,
  subtitle,
  isUnlocked = true,
  className = '',
  badgeCode,
}) => {
  const sizeConfig = {
    sm: {
      medalSize: 'w-14 h-14',
      ribbonTop: 'w-10 h-7',
      ribbonTail: 'w-3 h-6',
      iconSize: 'text-xl',
      borderWidth: 'p-1',
    },
    md: {
      medalSize: 'w-20 h-20 sm:w-22 sm:h-22',
      ribbonTop: 'w-14 h-9',
      ribbonTail: 'w-4 sm:w-4.5 h-8 sm:h-10',
      iconSize: 'text-2xl sm:text-3xl',
      borderWidth: 'p-1.5',
    },
    lg: {
      medalSize: 'w-24 h-24 sm:w-28 sm:h-28',
      ribbonTop: 'w-18 h-12',
      ribbonTail: 'w-5 sm:w-6 h-10 sm:h-12',
      iconSize: 'text-3xl sm:text-4xl',
      borderWidth: 'p-2',
    },
    xl: {
      medalSize: 'w-28 h-28 sm:w-36 sm:h-36',
      ribbonTop: 'w-22 h-14',
      ribbonTail: 'w-6 sm:w-7 h-12 sm:h-16',
      iconSize: 'text-4xl sm:text-5xl',
      borderWidth: 'p-2.5',
    },
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* 1. TOP FOLDED RED RIBBON (Neck V-Hanger with Gold Borders) */}
      <div className={`relative ${sizeConfig.ribbonTop} flex items-center justify-center -mb-2 z-0`}>
        {/* Left folded ribbon half */}
        <div 
          className="absolute left-1/2 -translate-x-[90%] top-0 w-3/5 h-full bg-gradient-to-b from-[#7F1D1D] via-[#DC2626] to-[#991B1B] shadow-md origin-bottom transform -rotate-12 border-l border-amber-300/80"
          style={{ clipPath: 'polygon(0 0, 100% 15%, 85% 100%, 0 90%)' }}
        >
          {/* Gold edge stitching line */}
          <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-black/30" />
        </div>

        {/* Right folded ribbon half */}
        <div 
          className="absolute left-1/2 -translate-x-[10%] top-0 w-3/5 h-full bg-gradient-to-b from-[#7F1D1D] via-[#B91C1C] to-[#7F1D1D] shadow-md origin-bottom transform rotate-12 border-r border-amber-300/80"
          style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 90%, 15% 100%)' }}
        >
          {/* Gold edge stitching line */}
          <div className="absolute top-0 bottom-0 right-0.5 w-[1px] bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/35" />
        </div>

        {/* Golden Suspension Clasp / Ring */}
        <div className="absolute bottom-0 w-6 h-2 rounded-full bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 shadow-sm border border-amber-300 z-10" />
      </div>

      {/* 2. THE 3D 24K GOLD MEDAL */}
      <div 
        className={`relative ${sizeConfig.medalSize} rounded-full z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
          isUnlocked 
            ? 'filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]' 
            : 'filter grayscale opacity-60'
        }`}
      >
        {/* Outer Coin-Milled / Starburst 24K Gold Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-700 via-yellow-300 to-amber-600 p-0.5 shadow-xl">
          
          {/* Concentric Milled Ring with Gold Bevel */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#121214] via-[#1a1a20] to-[#0A0A0C] p-1 flex items-center justify-center relative overflow-hidden border border-amber-400/80">
            
            {/* Subtle radial guilloche background inside the coin */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f59e0b_0.75px,transparent_0.75px)] [background-size:6px_6px] opacity-25" />

            {/* Radiant Gold Inner Core Medallion */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-600 via-yellow-200 via-amber-400 to-amber-700 p-0.5 shadow-inner flex items-center justify-center relative">
              
              {/* Embossed Satin Center Disc */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FEF3C7] via-[#FDE68A] to-[#F59E0B] flex flex-col items-center justify-center text-center p-1 border border-amber-600/60 shadow-inner relative overflow-hidden">
                
                {/* Concentric ornamental gold rings */}
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-800/35 pointer-events-none" />
                <div className="absolute inset-2 rounded-full border border-amber-900/20 pointer-events-none" />

                {/* Curved specular sheen / acrylic gloss reflection */}
                <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-full pointer-events-none transform -rotate-12" />

                {/* Medallion Centerpiece Icon or Laurel Relief */}
                <div className="relative z-10 flex flex-col items-center justify-center drop-shadow-md">
                  {icon ? (
                    <div className={`${sizeConfig.iconSize} transform transition-transform group-hover:scale-110`}>
                      {icon}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-amber-950 fill-amber-500 stroke-amber-950 stroke-[1.8] drop-shadow-xs" />
                      <span className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest text-amber-950 font-display mt-0.5">
                        HONOR
                      </span>
                    </div>
                  )}

                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 rounded-full">
                      <Lock className="w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>

                {/* Subtle Lower Inscription Arc */}
                {subtitle && (
                  <span className="absolute bottom-1 text-[5px] sm:text-[6.5px] font-black uppercase tracking-widest text-amber-950/80 font-display">
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DRAPED LUXURY RED SATIN RIBBON TAILS (Below the Medal) */}
      <div className="relative -mt-2.5 sm:-mt-3 flex justify-center items-start gap-1 z-0 pointer-events-none">
        {/* Left Ribbon Tail (Rich Crimson Red with Gold Edge) */}
        <div 
          className={`${sizeConfig.ribbonTail} bg-gradient-to-b from-[#DC2626] via-[#991B1B] to-[#7F1D1D] shadow-lg transform -rotate-10 origin-top relative overflow-hidden border-l border-amber-300/80`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
        >
          {/* Gold edge trim */}
          <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/30" />
        </div>

        {/* Right Ribbon Tail (Deep Ruby Red with Gold Edge) */}
        <div 
          className={`${sizeConfig.ribbonTail} bg-gradient-to-b from-[#B91C1C] via-[#7F1D1D] to-[#450A0A] shadow-lg transform rotate-10 origin-top relative overflow-hidden border-r border-amber-300/80`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
        >
          {/* Gold edge trim */}
          <div className="absolute top-0 bottom-0 right-0.5 w-[1px] bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/35" />
        </div>
      </div>

      {/* Badge Code or Caption below tails */}
      {badgeCode && (
        <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-amber-900 font-display mt-1">
          {badgeCode}
        </span>
      )}
    </div>
  );
};

// Aliased for backwards compatibility with existing imports
export const GoogleCertificationSeal: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  withRibbonTails?: boolean;
  className?: string;
  badgeCode?: string;
}> = ({ size = 'md', className = '', badgeCode = 'OFFICIAL MEDAL' }) => {
  return (
    <GoldMedalWithRedRibbon
      size={size === 'sm' ? 'sm' : size === 'lg' ? 'xl' : 'lg'}
      className={className}
      badgeCode={badgeCode}
    />
  );
};

interface SkillBadgeMedallionProps {
  badge: Badge;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Truly Unique Signature Skill Badge Medallion
 * Features 24K Gold Medal in Rich Folded Red Ribbon
 */
export const PrestigeSkillBadgeMedallion: React.FC<SkillBadgeMedallionProps> = ({
  badge,
  isUnlocked,
  size = 'md',
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <GoldMedalWithRedRibbon
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
        icon={<span>{badge.icon}</span>}
        subtitle={badge.category}
        isUnlocked={isUnlocked}
      />
    </div>
  );
};

// Aliased for backwards compatibility
export const GoogleSkillBadgeMedallion = PrestigeSkillBadgeMedallion;

interface BadgeDetailModalProps {
  badge: Badge | null;
  isUnlocked: boolean;
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

/**
 * Sovereign Credential Badge Detail Inspector
 * Styled in Onyx Black, Imperial Red, and 24K Gold
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

  const credentialId = `PV-MEDAL-${badge.id.toUpperCase()}-2026`;
  const verificationUrl = typeof window !== 'undefined' ? `${window.location.origin}/?verify=${credentialId}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `Conferred the official verified credential: ${badge.name} (${badge.category} Category) on Classrooms To Boardrooms Placement Readiness. Conferred by Program Director Kapil Narula.`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}&summary=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#101014] text-white rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] border-2 border-amber-500/50 overflow-hidden my-auto">
        
        {/* Top Black & Red & Gold Ribbon */}
        <PrestigeRibbonBar 
          position="top" 
          label="OFFICIAL PLACEMENT READINESS MEDAL" 
          subtitle="CLASSROOMS TO BOARDROOMS" 
        />

        {/* Modal Header */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-700/60">
              {badge.category} Category
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isUnlocked 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50' 
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}>
              {isUnlocked ? '★ Medal Awarded' : '🔒 Locked Medal'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-zinc-700"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-2 text-center space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Centered Gold Medal in Red Ribbon */}
          <div className="py-2 flex justify-center">
            <GoldMedalWithRedRibbon 
              size="xl" 
              icon={<span>{badge.icon}</span>}
              subtitle={badge.category}
              isUnlocked={isUnlocked} 
            />
          </div>

          {/* Badge Titles (Minimal & Elegant) */}
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200 font-display tracking-tight">
              {badge.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
              {badge.description}
            </p>
          </div>

          {/* Minimal Verification Box */}
          <div className="bg-[#18181F] rounded-2xl p-4 border border-amber-500/30 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Recipient:</span>
              <span className="font-bold text-white">{studentName || 'Kapil Narula'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Evaluation:</span>
              <span className="font-medium text-amber-300 text-right max-w-[220px] truncate">{badge.requirement}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Honor XP:</span>
              <span className="font-black text-amber-400">+{badge.xpBonus} XP</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800 pt-2 font-mono text-[10px]">
              <span className="text-zinc-500">Registry ID:</span>
              <span className="text-amber-300 font-semibold">{credentialId}</span>
            </div>
          </div>

          {/* Actions */}
          {isUnlocked ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                onClick={handleShareLinkedIn}
                className="w-full sm:flex-1 py-2.5 px-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md border border-amber-400/40 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Share Medal on LinkedIn</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full sm:w-auto py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-amber-200 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-amber-400" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Verification'}</span>
              </button>
            </div>
          ) : (
            <div className="p-3 bg-red-950/40 rounded-xl border border-red-800/50 text-xs text-red-200 font-medium">
              Achieve requirement &ldquo;<strong>{badge.requirement}</strong>&rdquo; to unlock this gold medal.
            </div>
          )}

        </div>

        {/* Bottom Black & Red & Gold Ribbon */}
        <PrestigeRibbonBar 
          position="bottom" 
          variant="slim" 
        />

      </div>
    </div>
  );
};

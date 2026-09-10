import React, { useState } from 'react';
import { Trophy, Award, Lock, Sparkles, CheckCircle2, ShieldCheck, Search, ExternalLink, Zap } from 'lucide-react';
import { LearnerProfile, Badge } from '../types';
import { ALL_BADGES } from '../data/badgesData';
import { GoogleRibbonBar, GoogleSkillBadgeMedallion, BadgeDetailModal } from './GoogleRibbon';

interface BadgesViewProps {
  profile: LearnerProfile;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ profile }) => {
  const [filter, setFilter] = useState<'all' | 'milestone' | 'mastery' | 'special' | 'streak'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const earnedCount = profile.badgesEarned.length;
  const totalCount = ALL_BADGES.length;

  const filteredBadges = ALL_BADGES.filter((b) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchDesc = b.description.toLowerCase().includes(q);
      const matchReq = b.requirement.toLowerCase().includes(q);
      const matchCat = b.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchReq && !matchCat) return false;
    }

    if (filter === 'all') return true;
    if (filter === 'milestone') return b.category === 'Milestone';
    if (filter === 'mastery') {
      return ['Aptitude', 'Reasoning', 'Verbal', 'Communication', 'Placement', 'Mastery'].includes(b.category);
    }
    if (filter === 'special') return ['Special', 'FAANG', 'Tasks'].includes(b.category);
    if (filter === 'streak') return b.category === 'Streak';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* ================= GOOGLE STANDARDS TROPHY CABINET HEADER ================= */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Top Colored Ribbon (Google 4-Colors with Satin Sheen) */}
        <GoogleRibbonBar 
          position="top" 
          label="GOOGLE CLOUD & FAANG STANDARDS • OFFICIAL SKILL BADGES" 
          subtitle="Accredited Placement Competencies"
        />

        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-400">
                <Trophy className="w-5 h-5" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-display">
                Classrooms To Boardrooms Verified Credential Registry
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
              Google-Standard Metallic Skill Badges
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Designed as per Google Cloud and Developer certification standards. Each 3D metallic badge features precision top and bottom ribbon bands, cryptographically valid verification hashes, and instant 1-click LinkedIn Credential integration.
            </p>
          </div>

          {/* Unlocked Counter Pill */}
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0 w-full md:w-auto shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Skill Badges Conferred</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
              {earnedCount} <span className="text-lg text-slate-400">/ {totalCount}</span>
            </p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((earnedCount / totalCount) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 font-semibold mt-1.5">
              {Math.round((earnedCount / totalCount) * 100)}% Curriculum Unlocked
            </p>
          </div>
        </div>

        {/* Bottom Colored Ribbon on Header */}
        <GoogleRibbonBar 
          position="bottom" 
          variant="slim" 
        />

      </div>

      {/* ================= CONTROLS & FILTER TABS ================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'milestone', label: 'Milestones & Tiers' },
            { id: 'mastery', label: 'Subject Mastery' },
            { id: 'streak', label: 'Streaks' },
            { id: 'special', label: 'Specialty & FAANG' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative shrink-0 sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search badges by skill or name..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* ================= GOOGLE STANDARDS BADGES GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredBadges.map((badge) => {
          const isUnlocked = profile.badgesEarned.includes(badge.id);

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`group rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                isUnlocked
                  ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 ring-1 ring-slate-200'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-70 hover:opacity-90'
              }`}
            >
              {/* TOP COLORED RIBBON ON EACH BADGE (Google Standard) */}
              <GoogleRibbonBar 
                position="top" 
                variant="card" 
              />

              {/* Card Body */}
              <div className="p-5 flex flex-col items-center text-center">
                
                {/* Status Pill */}
                <div className="w-full flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                    {badge.category}
                  </span>

                  {isUnlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                {/* 3D Google Skill Badge Medallion */}
                <div className="py-2">
                  <GoogleSkillBadgeMedallion 
                    badge={badge} 
                    isUnlocked={isUnlocked} 
                    size="md" 
                  />
                </div>

                {/* Badge Titles */}
                <h3 className="text-base font-extrabold text-slate-900 font-display mt-2 group-hover:text-blue-600 transition-colors">
                  {badge.name}
                </h3>
                
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2 min-h-[32px]">
                  {badge.description}
                </p>

                {/* Requirement & XP Footprint */}
                <div className="w-full mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 text-left truncate max-w-[140px]" title={badge.requirement}>
                    <strong className="text-slate-700">Req:</strong> {badge.requirement}
                  </span>
                  <span className="font-extrabold text-amber-600 shrink-0">
                    +{badge.xpBonus} XP
                  </span>
                </div>

                {/* Click to inspect prompt */}
                <div className="mt-2 text-[10px] font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Inspect Google Credential</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>

              </div>

              {/* BOTTOM COLORED RIBBON ON EACH BADGE (Google Standard) */}
              <GoogleRibbonBar 
                position="bottom" 
                variant="slim" 
                label={badge.category.toUpperCase()} 
              />

            </div>
          );
        })}
      </div>

      {/* Empty Search State */}
      {filteredBadges.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-800">No skill badges match &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-xs text-slate-500">Try changing your search keywords or switching category tabs.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilter('all'); }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Show All Badges
          </button>
        </div>
      )}

      {/* ================= GOOGLE SKILL BADGE DETAIL MODAL ================= */}
      <BadgeDetailModal
        badge={selectedBadge}
        isUnlocked={selectedBadge ? profile.badgesEarned.includes(selectedBadge.id) : false}
        isOpen={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
        studentName={profile.name}
      />

    </div>
  );
};

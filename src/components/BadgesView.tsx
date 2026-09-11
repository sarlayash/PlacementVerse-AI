import React, { useState } from 'react';
import { Trophy, Award, Lock, Sparkles, CheckCircle2, ShieldCheck, Search, ExternalLink, Zap } from 'lucide-react';
import { LearnerProfile, Badge } from '../types';
import { ALL_BADGES } from '../data/badgesData';
import { PrestigeRibbonBar, PrestigeSkillBadgeMedallion, BadgeDetailModal } from './GoogleRibbon';

interface BadgesViewProps {
  profile: LearnerProfile;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ profile }) => {
  const [filter, setFilter] = useState<'all' | 'milestone' | 'mastery' | 'technical' | 'special' | 'streak'>('all');
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
    if (filter === 'technical') {
      return ['c-master', 'cpp-master', 'java-master', 'python-master', 'dsa-master'].includes(b.id);
    }
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
      
      {/* ================= SOVEREIGN TROPHY CABINET HEADER (BLACK, RED & GOLD) ================= */}
      <div className="rounded-3xl bg-[#0A0A0C] border-2 border-amber-500/40 shadow-2xl overflow-hidden">
        
        {/* Top Ribbon Bar (Black, Red & Gold) */}
        <PrestigeRibbonBar 
          position="top" 
          label="CLASSROOMS TO BOARDROOMS WITH KAPIL • POWERED BY SARLAYASH MISSION" 
          subtitle="SarlaYash Learning Solutions LLP • Kapil Narula"
        />

        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0A0A0C] via-[#15151C] to-[#0A0A0C] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-red-950/60 border border-amber-400/40 text-amber-400">
                <Trophy className="w-5 h-5 text-amber-400" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-display">
                Classrooms To Boardrooms With Kapil • Verified Credential Registry
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-100 font-display tracking-tight">
              Sovereign Skill Medallions ({totalCount} Total)
            </h2>
            
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Proprietary placement honors featuring 24K gold medals suspended on genuine silk crimson ribbons with black, red, and gold borders. Endorsed by Chief Ecosystem Architect Kapil Narula.
            </p>
          </div>

          {/* Unlocked Counter Pill */}
          <div className="bg-[#121217] px-6 py-4 rounded-2xl border-2 border-amber-500/40 text-center shrink-0 w-full md:w-auto shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Medallions Conferred</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
              {earnedCount} <span className="text-lg text-zinc-500">/ {totalCount}</span>
            </p>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((earnedCount / totalCount) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400 font-semibold mt-1.5">
              {Math.round((earnedCount / totalCount) * 100)}% Curriculum Unlocked
            </p>
          </div>
        </div>

        {/* Bottom Ribbon Bar */}
        <PrestigeRibbonBar 
          position="bottom" 
          variant="slim" 
        />

      </div>

      {/* ================= CONTROLS & FILTER TABS ================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'technical', label: '💻 Programming & DSA (5)' },
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
                  ? 'bg-[#0A0A0C] text-amber-300 border border-amber-400 shadow-xs'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative shrink-0 sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medallions by skill..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900"
          />
        </div>

      </div>

      {/* ================= SOVEREIGN BADGES GRID (BLACK, RED & GOLD BORDERS) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredBadges.map((badge) => {
          const isUnlocked = profile.badgesEarned.includes(badge.id);

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`group rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                isUnlocked
                  ? 'bg-white border-zinc-800 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-amber-500'
                  : 'bg-zinc-50 border-zinc-200 opacity-70 hover:opacity-90'
              }`}
            >
              {/* TOP BLACK, RED & GOLD RIBBON ON EACH BADGE */}
              <PrestigeRibbonBar 
                position="top" 
                variant="card" 
              />

              {/* Card Body */}
              <div className="p-5 flex flex-col items-center text-center">
                
                {/* Status Pill */}
                <div className="w-full flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-mono border border-zinc-200">
                    {badge.category}
                  </span>

                  {isUnlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-red-600" />
                      Conferred
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                {/* 3D Gold Medal in Red Ribbon Medallion */}
                <div className="py-2">
                  <PrestigeSkillBadgeMedallion 
                    badge={badge} 
                    isUnlocked={isUnlocked} 
                    size="md" 
                  />
                </div>

                {/* Badge Titles (Minimal & Clean) */}
                <h3 className="text-base font-extrabold text-zinc-900 font-display mt-2 group-hover:text-red-700 transition-colors">
                  {badge.name}
                </h3>
                
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed line-clamp-2 min-h-[32px]">
                  {badge.description}
                </p>

                {/* Requirement & XP Footprint */}
                <div className="w-full mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 text-left truncate max-w-[140px]" title={badge.requirement}>
                    <strong className="text-zinc-800">Req:</strong> {badge.requirement}
                  </span>
                  <span className="font-extrabold text-amber-600 shrink-0">
                    +{badge.xpBonus} XP
                  </span>
                </div>

                {/* Click to inspect prompt */}
                <div className="mt-2 text-[10px] font-bold text-red-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Inspect Official Credential</span>
                  <ExternalLink className="w-2.5 h-2.5 text-amber-600" />
                </div>

              </div>

              {/* BOTTOM RIBBON ON EACH BADGE */}
              <PrestigeRibbonBar 
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
        <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200 space-y-3">
          <p className="text-base font-bold text-zinc-800">No skill medallions match &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-xs text-zinc-500">Try changing your search keywords or switching category tabs.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilter('all'); }}
            className="px-4 py-2 bg-[#0A0A0C] text-amber-300 border border-amber-400 text-xs font-bold rounded-xl cursor-pointer"
          >
            Show All Medallions
          </button>
        </div>
      )}

      {/* ================= BADGE DETAIL MODAL ================= */}
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


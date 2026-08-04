'use client';

import React from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Sparkles, 
  Camera, 
  SunDim, 
  Plane, 
  AlertTriangle, 
  TrendingUp, 
  Crown, 
  CheckCircle2 
} from 'lucide-react';

export function PropertyIntelligenceCard() {
  const { currentProject } = useProjectStore();
  const intel = currentProject?.propertyIntelligence;

  if (!intel) return null;

  const scoreMetrics = [
    { label: 'Luxury Index', value: intel.luxuryScore, icon: Crown, color: 'text-amber-400' },
    { label: 'Photo Quality', value: intel.photographyScore, icon: Camera, color: 'text-blue-400' },
    { label: 'Marketing Power', value: intel.marketingScore, icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Video Potential', value: intel.videoPotential, icon: Sparkles, color: 'text-purple-400' },
  ];

  return (
    <Card variant="glass" className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif italic text-white font-bold">Property Intelligence Report</h3>
            <p className="text-xs text-neutral-400">AI Computer Vision & Architectural Asset Scorecard</p>
          </div>
        </div>

        <Badge variant="gold" size="md">
          Overall Appeal: {intel.buyerAppeal}%
        </Badge>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {scoreMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className="text-2xl font-bold text-white font-mono">{m.value}<span className="text-xs text-neutral-500">/100</span></div>
            </div>
          );
        })}
      </div>

      {/* AI Summary */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
        <span className="font-bold text-amber-400">AI Strategic Executive Summary: </span>
        {intel.aiExecutiveSummary}
      </div>

      {/* Suggested Reshoots & Drone / Twilight Shots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Missing Asset Flags
          </h4>
          <ul className="space-y-1">
            {intel.missingImages.map((img, i) => (
              <li key={i} className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                {img}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
            <SunDim className="w-3.5 h-3.5 text-indigo-400" /> Twilight Suggestions
          </h4>
          <ul className="space-y-1">
            {intel.suggestedTwilightImages.map((t, i) => (
              <li key={i} className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 text-emerald-400" /> Drone Aerial Opportunities
          </h4>
          <ul className="space-y-1">
            {intel.suggestedDroneShots.map((d, i) => (
              <li key={i} className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

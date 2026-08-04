'use client';

import React from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Image as ImageIcon, Sparkles, TrendingUp, Check } from 'lucide-react';

export function IntelligentThumbnailSelector() {
  const { currentProject, updateProject } = useProjectStore();
  const thumbnails = currentProject?.thumbnails || [];
  const selectedUrl = currentProject?.thumbnailUrl || thumbnails[0]?.url;

  if (thumbnails.length === 0) return null;

  return (
    <Card variant="glass" className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-serif italic text-white font-bold">Intelligent Thumbnail AI</h3>
              <Badge variant="gold" size="sm">Predictive CTR & Luxury Scoring</Badge>
            </div>
            <p className="text-xs text-neutral-400">
              AI-generated thumbnail options ranked by predicted click-through rate and luxury appeal.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {thumbnails.map((thumb) => {
          const isSelected = selectedUrl === thumb.url;

          return (
            <Card
              key={thumb.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => currentProject && updateProject(currentProject.id, { thumbnailUrl: thumb.url })}
              className={`p-3 cursor-pointer space-y-3 transition-all duration-200 ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10' : 'hover:border-neutral-700'
              }`}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb.url} alt={thumb.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <Badge variant="gold" size="sm">{thumb.badgeText}</Badge>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{thumb.title}</h4>
                <div className="flex items-center justify-between text-xs text-neutral-400 mt-1 pt-2 border-t border-neutral-800 font-mono">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {thumb.predictedCTR}% CTR
                  </span>
                  <span className="text-amber-400">{thumb.luxuryAppealScore}/100 Luxury</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}

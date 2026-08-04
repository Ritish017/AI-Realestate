'use client';

import React from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { HeyGenAvatarStyle } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, Sparkles, Check } from 'lucide-react';

const AVATAR_STYLES: { id: HeyGenAvatarStyle; label: string; desc: string }[] = [
  { id: 'luxury', label: 'Luxury Broker', desc: 'Formal black-tie/tuxedo attire with upscale studio lighting.' },
  { id: 'modern', label: 'Modern Realtor', desc: 'Smart casual blazer, high-energy friendly presentation.' },
  { id: 'corporate', label: 'Corporate Executive', desc: 'Commercial broker attire for high-value properties.' },
  { id: 'commercial', label: 'Commercial Specialist', desc: 'Direct, confident tone tailored for investors.' },
  { id: 'friendly', label: 'Friendly Family Agent', desc: 'Warm, approachable demeanor for suburban residential homes.' },
  { id: 'elegant', label: 'Elegant Editorial', desc: 'High-fashion aesthetic tailored for luxury architectural reels.' },
];

export function HeyGenAvatarStudio() {
  const { currentProject, setHeyGenConfig } = useProjectStore();
  const config = currentProject?.heyGenConfig;
  const currentStyle = config?.avatarStyle || 'luxury';

  return (
    <Card variant="glass" className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-serif italic text-white font-bold">HeyGen AI Realtor Intro Engine</h3>
              <Badge variant="gold" size="sm">5-10s Opening & Ending</Badge>
            </div>
            <p className="text-xs text-neutral-400">
              Generates a 5-10s personalized Realtor video intro that smoothly fades into the property tour.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {AVATAR_STYLES.map((style) => {
          const isSelected = currentStyle === style.id;
          return (
            <Card
              key={style.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => setHeyGenConfig({ avatarStyle: style.id })}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10' : 'hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white">{style.label}</h4>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <p className="text-xs text-neutral-400">{style.desc}</p>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}

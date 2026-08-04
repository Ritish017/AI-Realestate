'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VideoStyleId } from '@/types/domain';
import { ArrowRight, ArrowLeft, Crown, Sparkles, Plane, Film, Layout, Check } from 'lucide-react';

interface CampaignStep3Props {
  selectedStyle: VideoStyleId;
  setSelectedStyle: (style: VideoStyleId) => void;
  onNext: () => void;
  onBack: () => void;
}

interface StyleTemplateCard {
  id: VideoStyleId;
  title: string;
  durationText: string;
  mood: string;
  cameraStyle: string;
  desc: string;
  badge: string;
  previewUrl: string;
}

const TEMPLATES: StyleTemplateCard[] = [
  {
    id: 'cinematic_luxury',
    title: 'Cinematic Luxury',
    durationText: '30s - 60s',
    mood: 'Classical Orchestral & Dusk Glow',
    cameraStyle: 'Slow Orbits & Horizon Sweeps',
    desc: 'Bespoke twilight lighting shifts & high-end architectural focus.',
    badge: 'Luxury Top Pick',
    previewUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'drone',
    title: 'Drone Showcase',
    durationText: '30s - 45s',
    mood: 'Epic Cinematic Aerial',
    cameraStyle: 'High-Altitude 45m Sweeps & Crane Down',
    desc: 'Highlights expansive estate acreage, rooflines & neighborhood.',
    badge: 'Aerial Focus',
    previewUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'apple_commercial',
    title: 'Apple Commercial',
    durationText: '15s - 30s',
    mood: 'Minimal Electronic & Precise Pacing',
    cameraStyle: 'Snappy Parallax & Glass Cards',
    desc: 'Ultra-clean key features, typography overlays & high contrast.',
    badge: 'Apple Aesthetic',
    previewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'modern',
    title: 'Modern Minimal',
    durationText: '30s',
    mood: 'Ambient Chill Synth',
    cameraStyle: 'Linear Push In & Horizontal Sliders',
    desc: 'Clean lines, geometric framing & modern interior focus.',
    badge: 'High Conversion',
    previewUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'luxury_documentary',
    title: 'Luxury Documentary',
    durationText: '45s - 60s',
    mood: 'Deep Warm Strings & Storytelling',
    cameraStyle: 'Dutch Reveal Pans & Structural Archways',
    desc: 'Narrative-driven architectural breakdown explaining room flow.',
    badge: 'Storyteller Choice',
    previewUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'editorial_magazine',
    title: 'Editorial Magazine',
    durationText: '30s',
    mood: 'High-Fashion Jazz Ambient',
    cameraStyle: 'Tilt Up & High Contrast Framing',
    desc: 'Magazine grid overlays, gold borders & luxury font treatments.',
    badge: 'Vogue Style',
    previewUrl: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'family_home',
    title: 'Family Home',
    durationText: '30s',
    mood: 'Warm Acoustic Guitar',
    cameraStyle: 'Smooth Walkthrough & Backyard Focus',
    desc: 'Emphasizes spacious backyards, kitchens & family living rooms.',
    badge: 'Residential Favorite',
    previewUrl: 'https://images.unsplash.com/photo-1600566753086-35f13ebc6746?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'open_house',
    title: 'Open House Reel',
    durationText: '15s - 30s',
    mood: 'Upbeat Energetic Pop',
    cameraStyle: 'Fast Paced Room Walkthroughs',
    desc: 'Event date callouts, map overlays & open house CTA.',
    badge: 'Event Driver',
    previewUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'social_reel',
    title: 'Social Media Reel',
    durationText: '15s',
    mood: 'Viral Beat & Beat-Synced Cuts',
    cameraStyle: 'Dynamic Zoom Pushes (9:16 Vertical)',
    desc: 'Built specifically for Instagram Reels, TikTok & YouTube Shorts.',
    badge: 'Viral Engine',
    previewUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'commercial_showcase',
    title: 'Commercial Showcase',
    durationText: '30s - 45s',
    mood: 'Corporate Electronic',
    cameraStyle: 'Wide Horizon Sliders & Exterior Flying',
    desc: 'Tailored for office buildings, retail space & commercial leasing.',
    badge: 'B2B Commercial',
    previewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
];

export function CampaignStep3VideoStyle({
  selectedStyle,
  setSelectedStyle,
  onNext,
  onBack,
}: CampaignStep3Props) {
  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-5xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 3 of 7</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Select Video Style & Template</h2>
        </div>
        <Badge variant="emerald" size="sm">Auto Motion & Music Sync</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedStyle === tmpl.id;

          return (
            <Card
              key={tmpl.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => setSelectedStyle(tmpl.id)}
              className={`p-4 cursor-pointer space-y-3 transition-all duration-300 flex flex-col justify-between group ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10 shadow-2xl gold-glow' : 'hover:border-neutral-700'
              }`}
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img src={tmpl.previewUrl} alt={tmpl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="gold" size="sm">{tmpl.badge}</Badge>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{tmpl.title}</h3>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">{tmpl.desc}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 space-y-1 text-[10px] font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Camera: {tmpl.cameraStyle}</span>
                </div>
                <div className="flex justify-between text-amber-400">
                  <span>Mood: {tmpl.mood}</span>
                  <span>{tmpl.durationText}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <Button variant="outline" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Next: Choose Cover Image
        </Button>
      </div>
    </Card>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LayoutTemplate, Sparkles, Video, Compass, Moon, Sun, ArrowRight } from 'lucide-react';
import { VideoStyleId } from '@/types/domain';

export default function TemplatesPage() {
  const [selectedStyle, setSelectedStyle] = useState<VideoStyleId>('tour');

  const templates: Array<{
    id: VideoStyleId;
    title: string;
    badge: string;
    description: string;
    icon: any;
    color: string;
    cameraMotion: string;
    pacing: string;
  }> = [
    {
      id: 'tour',
      title: 'Interior Walkthrough Tour',
      badge: 'Most Popular',
      description: 'Smooth ground-level gimbal dolly pushes through living, kitchen, and master suite spaces.',
      icon: Video,
      color: 'text-amber-400',
      cameraMotion: 'Forward Dolly & Slider Tracks',
      pacing: 'Smooth Architectural (0.5x)',
    },
    {
      id: 'drone',
      title: 'Aerial Drone Showcase',
      badge: 'Luxury Estates',
      description: 'High-altitude flyovers, roof descents, and sweeping surrounding ocean vistas.',
      icon: Compass,
      color: 'text-blue-400',
      cameraMotion: 'High-Altitude Flyovers & 360 Orbit',
      pacing: 'Sweeping Cinematic (0.75x)',
    },
    {
      id: 'twilight',
      title: 'Dusk Twilight Shift',
      badge: 'High Conversion',
      description: 'Day-to-night lighting transition activating warm sconce and pool illumination aesthetics.',
      icon: Moon,
      color: 'text-purple-400',
      cameraMotion: 'Twilight Lighting Shift & Jib Crane',
      pacing: 'Serene Luxury (0.25x)',
    },
  ];

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Cinematic Presets</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Production Style Templates</h1>
        </div>

        <Badge variant="emerald" size="sm">Pre-Configured Motion Math</Badge>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          const isSelected = selectedStyle === tpl.id;
          return (
            <Card
              key={tpl.id}
              variant="glass"
              className={`space-y-5 flex flex-col justify-between transition-all ${
                isSelected ? 'border-amber-400 gold-glow bg-neutral-900/90' : 'hover:border-neutral-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="sm">{tpl.badge}</Badge>
                  <Icon className={`w-5 h-5 ${tpl.color}`} />
                </div>

                <h3 className="text-lg font-bold font-serif text-white">{tpl.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{tpl.description}</p>

                <div className="pt-3 border-t border-neutral-800 space-y-1.5 text-[11px] font-mono text-neutral-400">
                  <p><span className="text-white font-bold">Motion:</span> {tpl.cameraMotion}</p>
                  <p><span className="text-white font-bold">Pacing:</span> {tpl.pacing}</p>
                </div>
              </div>

              <Link href="/projects/create">
                <Button
                  variant={isSelected ? 'gold' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedStyle(tpl.id)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {isSelected ? 'Selected Template' : 'Use This Template'}
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

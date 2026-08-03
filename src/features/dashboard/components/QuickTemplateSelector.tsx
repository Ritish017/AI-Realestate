'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LayoutTemplate, Sparkles, ArrowRight } from 'lucide-react';

export const QuickTemplateSelector: React.FC = () => {
  const templates = [
    {
      id: 'template-tour',
      title: 'Interior Walkthrough Tour',
      badge: 'Most Popular',
      description: 'Smooth ground-level gimbal dolly pushes through living, kitchen, and bedroom spaces.',
      presetStyle: 'tour',
    },
    {
      id: 'template-drone',
      title: 'Aerial Drone Showcase',
      badge: 'Luxury Estates',
      description: 'High-altitude flyovers, roof descents, and surrounding neighborhood vistas.',
      presetStyle: 'drone',
    },
    {
      id: 'template-twilight',
      title: 'Dusk Twilight Shift',
      badge: 'High Conversion',
      description: 'Day-to-night lighting transition activating warm sconce & pool glow aesthetics.',
      presetStyle: 'twilight',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-serif text-white">Favorite Production Templates</h2>
          <p className="text-xs text-neutral-400">Launch a campaign instantly using pre-configured cinematic motion presets.</p>
        </div>
        <Link href="/templates" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1">
          <span>Explore All Templates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <Card key={tpl.id} variant="glass" className="space-y-4 flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="gold" size="sm">{tpl.badge}</Badge>
                <LayoutTemplate className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{tpl.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{tpl.description}</p>
            </div>

            <Link href="/projects/create">
              <Button variant="outline" size="sm" className="w-full" rightIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Use This Template
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

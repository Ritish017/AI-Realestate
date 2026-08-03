'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Zap, Sparkles, Moon, Video, TrendingUp, Check } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';

export const AIDirectorFeed: React.FC = () => {
  const { showSuccess } = useToastStore();

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Sunset Twilight Opportunity',
      director: 'Cinematographer AI',
      icon: Moon,
      color: 'text-amber-400',
      description: '"The Crestview Modern Villa features outdoor pool illumination. Applying a Dusk Twilight shift will boost luxury perception scores by +18%."',
      actionLabel: 'Apply Twilight Shift',
    },
    {
      id: 'rec-2',
      title: 'Missing Scene Alert',
      director: 'Story Director AI',
      icon: Video,
      color: 'text-blue-400',
      description: '"Adding 1 high-angle balcony shot to Aspen Ridge Lodge completes the narrative flow from foyer to mountain terrace."',
      actionLabel: 'Add Balcony Scene',
    },
    {
      id: 'rec-3',
      title: 'Social Trend Optimization',
      director: 'Marketing Director AI',
      icon: TrendingUp,
      color: 'text-purple-400',
      description: '"9:16 vertical reels with luxury ambient audio are outperforming standard 16:9 posts by 3.2x on Instagram Reels and TikTok."',
      actionLabel: 'Format to 9:16',
    },
  ];

  const handleApply = (title: string) => {
    showSuccess('Recommendation Applied', `AI Director executed "${title}".`);
  };

  return (
    <Card variant="elevated" className="border-amber-500/20 bg-amber-500/5 space-y-5 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif text-white">Proactive AI Director Feed</h3>
            <p className="text-xs text-neutral-400">Automated insights & recommendations from your virtual 12-Director agency team.</p>
          </div>
        </div>
        <Badge variant="gold" size="sm">Live Agency Context</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div key={rec.id} className="p-5 rounded-2xl bg-black/40 border border-neutral-800 space-y-3 flex flex-col justify-between hover:border-neutral-700 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-400">{rec.director}</span>
                  <Icon className={`w-4 h-4 ${rec.color}`} />
                </div>
                <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{rec.description}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => handleApply(rec.title)}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                {rec.actionLabel}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Video, Film, Eye, Download, TrendingUp, Sparkles } from 'lucide-react';

export const MetricCards: React.FC = () => {
  const metrics = [
    {
      id: 'videos',
      label: 'Videos Generated',
      value: '24',
      change: '+18% this month',
      changeType: 'positive',
      icon: Video,
      iconColor: 'text-blue-400',
    },
    {
      id: 'projects',
      label: 'Active Campaigns',
      value: '6',
      change: '2 drafts in progress',
      changeType: 'neutral',
      icon: Film,
      iconColor: 'text-amber-400',
    },
    {
      id: 'views',
      label: 'Total Social Views',
      value: '1,482',
      change: '+342 new viewers',
      changeType: 'positive',
      icon: Eye,
      iconColor: 'text-purple-400',
    },
    {
      id: 'downloads',
      label: 'Exports & Downloads',
      value: '310',
      change: '100% 4K Reels Exported',
      changeType: 'positive',
      icon: Download,
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.id} variant="glass" className="space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">{metric.label}</span>
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Icon className={`w-4 h-4 ${metric.iconColor}`} />
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold font-serif text-white tracking-tight">{metric.value}</p>
              <p className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{metric.change}</span>
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

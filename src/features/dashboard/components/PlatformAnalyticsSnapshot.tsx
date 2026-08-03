'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart } from '@/components/charts/BarChart';
import { Instagram, Facebook, Linkedin, Video } from 'lucide-react';

export const PlatformAnalyticsSnapshot: React.FC = () => {
  const platformStats = [
    { label: 'Instagram Reels (9:16)', value: 680, max: 1000, color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { label: 'TikTok Video (9:16)', value: 420, max: 1000, color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { label: 'YouTube Showcase (16:9)', value: 240, max: 1000, color: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { label: 'Facebook Feed (1:1)', value: 142, max: 1000, color: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <BarChart title="Social Campaign Distribution & Reach" items={platformStats} />
      </div>

      <Card variant="glass" className="space-y-4 flex flex-col justify-between">
        <div>
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Storage & Cloud Rendering</span>
          <h4 className="text-lg font-bold font-serif text-white mt-1">Supabase & Gemini Engine</h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Cloud Storage Used</span>
            <span className="text-white font-mono font-bold">4.2 GB / 25 GB</span>
          </div>
          <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[17%]" />
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-neutral-400">Monthly AI Render Budget</span>
            <span className="text-amber-400 font-mono font-bold">480 / 500 Credits</span>
          </div>
          <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[96%]" />
          </div>
        </div>

        <p className="text-[10px] text-neutral-500 font-mono">
          System operational · All AI Directors online
        </p>
      </Card>
    </div>
  );
};

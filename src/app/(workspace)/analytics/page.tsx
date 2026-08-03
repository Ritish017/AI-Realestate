'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BarChart } from '@/components/charts/BarChart';
import { Eye, Download, TrendingUp, Sparkles, Video, Share2, Award, Clock } from 'lucide-react';

export default function AnalyticsPage() {
  const platformStats = [
    { label: 'Instagram Reels (9:16)', value: 680, max: 1000, color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { label: 'TikTok Video (9:16)', value: 420, max: 1000, color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
    { label: 'YouTube Showcase (16:9)', value: 240, max: 1000, color: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { label: 'Facebook Feed (1:1)', value: 142, max: 1000, color: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
  ];

  const topVideos = [
    { id: '1', title: 'Montecito Coastal Sanctuary', style: 'Twilight Dusk', views: '842', CTR: '4.8%', shares: '94' },
    { id: '2', title: 'Aspen Ridge Luxury Lodge', style: 'Aerial Drone', views: '420', CTR: '3.9%', shares: '52' },
    { id: '3', title: 'Beverly Hills Modern Villa', style: 'Interior Tour', views: '220', CTR: '3.2%', shares: '28' },
  ];

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Campaign Intelligence</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Analytics & Audience Reach</h1>
        </div>

        <Badge variant="emerald" size="sm">Real-Time Data Sync</Badge>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card variant="glass" className="space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Total Campaign Views</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-bold font-serif text-white">1,482</p>
          <span className="text-[10px] text-emerald-400 font-mono">+24% from last week</span>
        </Card>

        <Card variant="glass" className="space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Reel Downloads</span>
            <Download className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold font-serif text-white">310</p>
          <span className="text-[10px] text-neutral-400 font-mono">100% 4K Ultra HD</span>
        </Card>

        <Card variant="glass" className="space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Avg. Watch Retention</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-bold font-serif text-white">88%</p>
          <span className="text-[10px] text-emerald-400 font-mono">+12% higher than industry avg</span>
        </Card>

        <Card variant="glass" className="space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Click-Through Rate (CTR)</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-bold font-serif text-white">4.2%</p>
          <span className="text-[10px] text-emerald-400 font-mono">Top 5% Realtor Performance</span>
        </Card>
      </div>

      {/* Social Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChart title="Multi-Platform Video Views Breakdown" items={platformStats} />
        </div>

        <Card variant="glass" className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold font-serif text-white">Top Performing Style</h3>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <Badge variant="gold" size="sm">Dusk Twilight Shift</Badge>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Videos utilizing the Dusk Twilight Shift preset achieved 3.2x higher engagement and +28% longer watch retention on Instagram Reels.
            </p>
          </div>
        </Card>
      </div>

      {/* Top Videos Performance Table */}
      <Card variant="glass" className="p-6 space-y-4 border border-neutral-800">
        <h3 className="text-lg font-bold font-serif text-white">Top Performing Property Reels</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-mono">
                <th className="pb-3">CAMPAIGN TITLE</th>
                <th className="pb-3">STYLE</th>
                <th className="pb-3">TOTAL VIEWS</th>
                <th className="pb-3">CTR</th>
                <th className="pb-3">SHARES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {topVideos.map((video) => (
                <tr key={video.id} className="hover:bg-neutral-900/40">
                  <td className="py-3 font-bold text-white">{video.title}</td>
                  <td className="py-3 text-neutral-400">{video.style}</td>
                  <td className="py-3 font-mono text-emerald-400">{video.views}</td>
                  <td className="py-3 font-mono text-amber-400">{video.CTR}</td>
                  <td className="py-3 font-mono text-neutral-300">{video.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}

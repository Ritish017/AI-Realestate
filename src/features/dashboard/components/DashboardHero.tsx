'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Link as LinkIcon, ShieldCheck, Video, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToastStore } from '@/stores/useToastStore';

export const DashboardHero: React.FC = () => {
  const [quickMlsUrl, setQuickMlsUrl] = useState('');
  const { showSuccess } = useToastStore();

  const handleQuickImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMlsUrl.trim()) return;
    showSuccess('MLS Link Detected', 'Importing property metadata and scenes...');
    setQuickMlsUrl('');
  };

  return (
    <div className="relative rounded-3xl p-8 sm:p-10 glass-panel border border-white/10 shadow-2xl overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Greeting & Description */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" size="sm" className="shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Apple Pro AI Marketing Suite</span>
            </Badge>
            <Badge variant="glass" size="sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Realtor Pro Tier</span>
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight font-bold">
            Welcome Back, Ritish Agent
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Your 12-Director AI Production Agency is active. Transform property listing photos or paste an MLS link into a complete 4K video reel, social campaign, and luxury print assets in under 2 minutes.
          </p>

          {/* Quick MLS Import Bar */}
          <form onSubmit={handleQuickImport} className="flex items-center gap-2 pt-2 max-w-lg">
            <div className="relative flex-1">
              <LinkIcon className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Paste Zillow or MLS listing URL..."
                value={quickMlsUrl}
                onChange={(e) => setQuickMlsUrl(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none transition-all shadow-inner"
              />
            </div>
            <Button type="submit" variant="gold" size="sm" leftIcon={<Zap className="w-3.5 h-3.5" />}>
              Import MLS
            </Button>
          </form>
        </div>

        {/* Right Column: Quick Action Callout */}
        <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link href="/projects/create">
            <Button variant="gold" size="lg" className="w-full" leftIcon={<Sparkles className="w-5 h-5" />}>
              Create New Campaign
            </Button>
          </Link>
          <Link href="/media">
            <Button variant="outline" size="lg" className="w-full" leftIcon={<Video className="w-5 h-5" />}>
              AI Photo Inspector
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

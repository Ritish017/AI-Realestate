'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Key, ShieldCheck, Cpu, Sliders } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';

export default function SettingsPage() {
  const { showSuccess } = useToastStore();

  const handleSave = () => {
    showSuccess('Settings Saved', 'Workspace preferences and API credentials updated.');
  };

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Workspace Configuration</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Settings & AI Keys</h1>
        </div>

        <Badge variant="emerald" size="sm">System Operational</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Credentials & Defaults */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="space-y-6 border border-neutral-800">
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              <span>AI Provider API Credentials</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Google Gemini 3.6 API Key</label>
                <input
                  type="password"
                  value="************************************"
                  disabled
                  className="w-full bg-black border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-neutral-400 focus:outline-none"
                />
                <span className="text-[10px] text-emerald-400 mt-1 block">✓ GEMINI_API_KEY environment variable configured</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">ElevenLabs Turbo v2.5 Voice API Key</label>
                <input
                  type="password"
                  placeholder="Enter ElevenLabs API Key for voice narration..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="gold" size="sm" onClick={handleSave}>Save Preferences</Button>
            </div>
          </Card>

          <Card variant="glass" className="space-y-6 border border-neutral-800">
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-400" />
              <span>Default Campaign Specifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Default Aspect Ratio</label>
                <select className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none">
                  <option value="9:16">9:16 Vertical Reels (Instagram/TikTok)</option>
                  <option value="16:9">16:9 Widescreen (YouTube/MLS)</option>
                  <option value="1:1">1:1 Square (Facebook/Feed)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Default Reel Duration</label>
                <select className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none">
                  <option value="30">30 Seconds (Recommended)</option>
                  <option value="15">15 Seconds (Teaser)</option>
                  <option value="60">60 Seconds (Full Showcase)</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Account Status */}
        <div className="space-y-6">
          <Card variant="glass" className="space-y-4 border border-neutral-800">
            <h3 className="text-base font-bold font-serif text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Subscription & Account</span>
            </h3>

            <div className="space-y-2">
              <span className="text-xs text-neutral-400">Current Plan</span>
              <p className="text-xl font-bold font-serif text-amber-400">Realtor Pro Studio Tier</p>
              <p className="text-xs text-neutral-400">Unlimited 4K exports · 12-Director AI Agency included.</p>
            </div>

            <div className="pt-2">
              <Badge variant="emerald" size="sm">Active Account</Badge>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

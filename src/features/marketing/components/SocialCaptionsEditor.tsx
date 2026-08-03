'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Copy, Check, Instagram, Facebook, Linkedin, MessageSquare, Sparkles } from 'lucide-react';
import { SocialCaptions } from '@/types/domain';
import { useToastStore } from '@/stores/useToastStore';

export interface SocialCaptionsEditorProps {
  captions: SocialCaptions;
  onUpdateCaptions?: (captions: SocialCaptions) => void;
}

export const SocialCaptionsEditor: React.FC<SocialCaptionsEditorProps> = ({
  captions,
  onUpdateCaptions,
}) => {
  const { showSuccess } = useToastStore();
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'facebook' | 'linkedIn' | 'x'>('instagram');
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const platforms = [
    { id: 'instagram', label: 'Instagram Reels', icon: Instagram, color: 'text-pink-400' },
    { id: 'facebook', label: 'Facebook Feed', icon: Facebook, color: 'text-blue-400' },
    { id: 'linkedIn', label: 'LinkedIn Post', icon: Linkedin, color: 'text-indigo-400' },
    { id: 'x', label: 'X / Twitter', icon: MessageSquare, color: 'text-cyan-400' },
  ];

  const handleCopyCaption = (platformId: 'instagram' | 'facebook' | 'linkedIn' | 'x') => {
    navigator.clipboard.writeText(captions[platformId]);
    setCopiedPlatform(platformId);
    showSuccess('Caption Copied', `${platformId.toUpperCase()} caption copied to clipboard.`);
    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  return (
    <Card variant="glass" className="p-6 space-y-5 border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold font-serif text-white">Multi-Channel Social Captions</h4>
        </div>
        <Badge variant="gold" size="sm">AI Copywriter Engine</Badge>
      </div>

      {/* Platform Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {platforms.map((p) => {
          const Icon = p.icon;
          const isActive = activePlatform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : p.color}`} />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Caption Content Box */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-300">
            {activePlatform.toUpperCase()} Caption Format
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopyCaption(activePlatform)}
            leftIcon={copiedPlatform === activePlatform ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copiedPlatform === activePlatform ? 'Copied' : 'Copy Caption'}
          </Button>
        </div>

        <textarea
          rows={6}
          value={captions[activePlatform]}
          onChange={(e) => {
            const updated = { ...captions, [activePlatform]: e.target.value };
            onUpdateCaptions?.(updated);
          }}
          className="w-full bg-black border border-neutral-800 rounded-2xl p-4 text-xs text-neutral-200 focus:border-amber-400 focus:outline-none leading-relaxed font-sans"
        />
      </div>
    </Card>
  );
};

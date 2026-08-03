'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Subtitles, Sparkles, Check, Play, Pause } from 'lucide-react';
import { VoiceService } from '../services/voiceService';

export interface SubtitleSyncEditorProps {
  script: string;
  totalDurationSeconds: number;
}

export const SubtitleSyncEditor: React.FC<SubtitleSyncEditorProps> = ({
  script,
  totalDurationSeconds,
}) => {
  const [subtitleStyle, setSubtitleStyle] = useState<'instagram' | 'tiktok' | 'netflix'>('instagram');
  const [activeWordIdx, setActiveWordIdx] = useState(2);
  const wordTimestamps = VoiceService.generateWordTimestamps(script, totalDurationSeconds);

  return (
    <Card variant="glass" className="p-6 space-y-5 border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Subtitles className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold font-serif text-white">Word-Level Subtitle Sync & Styling</h4>
        </div>
        <Badge variant="gold" size="sm">ElevenLabs Sync</Badge>
      </div>

      {/* Subtitle Style Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 block">Subtitle Preset Style</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setSubtitleStyle('instagram')}
            className={`p-3 rounded-xl border text-left transition-colors ${
              subtitleStyle === 'instagram'
                ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}
          >
            <span className="text-xs font-bold block">Instagram Highlight</span>
            <span className="text-[10px] opacity-80">Yellow active word glow</span>
          </button>

          <button
            onClick={() => setSubtitleStyle('tiktok')}
            className={`p-3 rounded-xl border text-left transition-colors ${
              subtitleStyle === 'tiktok'
                ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}
          >
            <span className="text-xs font-bold block">TikTok Pill</span>
            <span className="text-[10px] opacity-80">High-contrast black background</span>
          </button>

          <button
            onClick={() => setSubtitleStyle('netflix')}
            className={`p-3 rounded-xl border text-left transition-colors ${
              subtitleStyle === 'netflix'
                ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}
          >
            <span className="text-xs font-bold block">Netflix Minimal</span>
            <span className="text-[10px] opacity-80">Serif bottom center text</span>
          </button>
        </div>
      </div>

      {/* Word Timestamp Sequence Map */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300 block">Transcript Timing Map</label>
        <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          {wordTimestamps.map((item, idx) => (
            <span
              key={idx}
              onClick={() => setActiveWordIdx(idx)}
              className={`px-2 py-1 rounded text-xs font-mono cursor-pointer transition-all ${
                idx === activeWordIdx
                  ? 'bg-amber-400 text-black font-bold scale-105 shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {item.word}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mic, Music, Subtitles, ShieldCheck, Volume2 } from 'lucide-react';
import { MusicTrack, BrandKit } from '@/types/domain';

export interface AudioTracksViewProps {
  musicTrack: MusicTrack;
  brandKit: BrandKit;
  voiceScript?: string;
}

export const AudioTracksView: React.FC<AudioTracksViewProps> = ({
  musicTrack,
  brandKit,
  voiceScript,
}) => {
  return (
    <div className="space-y-3 pt-2">
      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
        Synchronized Production Tracks
      </span>

      <div className="space-y-2">
        {/* Track 2: Voice Narration Track */}
        <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 text-purple-400" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">Voice Narration (ElevenLabs Marcus)</span>
              <p className="text-[10px] text-neutral-400 truncate">"{voiceScript || 'Welcome to this luxury residence...'}"</p>
            </div>
          </div>
          <Badge variant="glass" size="sm">Auto-Ducked -12dB</Badge>
        </div>

        {/* Track 3: Music Audio Track */}
        <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Music className="w-4 h-4 text-blue-400" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block">{musicTrack.title} ({musicTrack.genre})</span>
              <p className="text-[10px] text-neutral-400">Tempo matched to scene cuts · Mood: {musicTrack.mood}</p>
            </div>
          </div>
          <Badge variant="blue" size="sm">{musicTrack.durationSeconds}s Track</Badge>
        </div>

        {/* Track 4: Lower-Third & Brand Overlay Track */}
        <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Lower-Third Realtor Branding</span>
              <p className="text-[10px] text-neutral-400">{brandKit.agentName} · {brandKit.brokerageName}</p>
            </div>
          </div>
          <Badge variant="gold" size="sm">Persistent Overlay</Badge>
        </div>
      </div>
    </div>
  );
};

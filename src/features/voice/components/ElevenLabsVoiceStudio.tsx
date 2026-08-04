'use client';

import React from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { ElevenLabsVoiceId } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mic, Volume2, Check } from 'lucide-react';

const VOICES: { id: ElevenLabsVoiceId; name: string; desc: string }[] = [
  { id: 'luxury_female', name: 'Luxury Female (Rachel)', desc: 'Sophisticated, elegant voice for high-end luxury estates.' },
  { id: 'luxury_male', name: 'Luxury Male (Arnold)', desc: 'Deep, resonant voice suited for luxury architectural walkthroughs.' },
  { id: 'canadian_realtor', name: 'Canadian Realtor (Domi)', desc: 'Warm, clear regional tone ideal for residential markets.' },
  { id: 'warm_family', name: 'Warm Family (Bella)', desc: 'Approachable, friendly narration for family homes.' },
  { id: 'commercial', name: 'Commercial (Antoni)', desc: 'High-energy, authoritative voice for investment listings.' },
  { id: 'modern', name: 'Modern (Elli)', desc: 'Upbeat, contemporary voice for social media reels.' },
  { id: 'corporate', name: 'Corporate (Josh)', desc: 'Professional, articulate voice for commercial leasing.' },
];

export function ElevenLabsVoiceStudio() {
  const { currentProject, setVoiceConfig } = useProjectStore();
  const config = currentProject?.voiceConfig;
  const activeVoice = config?.voiceId || 'luxury_female';

  return (
    <Card variant="glass" className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-serif italic text-white font-bold">ElevenLabs Voice Studio</h3>
              <Badge variant="gold" size="sm">Frame Duration Auto-Sync</Badge>
            </div>
            <p className="text-xs text-neutral-400">
              Professional AI voice narration automatically synchronized to scene timing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {VOICES.map((v) => {
          const isSelected = activeVoice === v.id;
          return (
            <Card
              key={v.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => setVoiceConfig({ voiceId: v.id, voiceName: v.name })}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10' : 'hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Volume2 className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                  <h4 className="text-sm font-bold text-white">{v.name}</h4>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <p className="text-xs text-neutral-400">{v.desc}</p>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}

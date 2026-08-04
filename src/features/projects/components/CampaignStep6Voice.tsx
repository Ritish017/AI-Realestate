'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ElevenLabsVoiceId } from '@/types/domain';
import { ArrowRight, ArrowLeft, Mic, Volume2, Play, Check } from 'lucide-react';

interface CampaignStep6Props {
  selectedVoice: ElevenLabsVoiceId;
  setSelectedVoice: (voice: ElevenLabsVoiceId) => void;
  onNext: () => void;
  onBack: () => void;
}

interface VoiceOptionCard {
  id: ElevenLabsVoiceId;
  name: string;
  accent: string;
  style: string;
  sampleUrl: string;
}

const VOICES: VoiceOptionCard[] = [
  {
    id: 'luxury_female',
    name: 'Luxury Female (Rachel)',
    accent: 'American Luxury',
    style: 'Sophisticated & Elegant',
    sampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sample-1.mp3',
  },
  {
    id: 'luxury_male',
    name: 'Luxury Male (Arnold)',
    accent: 'British / International',
    style: 'Deep & Resonant',
    sampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sample-2.mp3',
  },
  {
    id: 'canadian_realtor',
    name: 'Professional Realtor (Domi)',
    accent: 'North American',
    style: 'Warm & Clear',
    sampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sample-3.mp3',
  },
  {
    id: 'warm_family',
    name: 'Warm Family (Bella)',
    accent: 'Soft American',
    style: 'Approachable & Welcoming',
    sampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sample-4.mp3',
  },
  {
    id: 'commercial',
    name: 'Corporate (Antoni)',
    accent: 'Authoritative',
    style: 'High Energy & Confident',
    sampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sample-5.mp3',
  },
  {
    id: 'modern',
    name: 'Modern (Elli)',
    accent: 'Upbeat Contemporary',
    style: 'Fast-Paced Social Reel',
    sampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sample-6.mp3',
  },
];

export function CampaignStep6Voice({
  selectedVoice,
  setSelectedVoice,
  onNext,
  onBack,
}: CampaignStep6Props) {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const handlePlaySample = (e: React.MouseEvent, voiceId: string) => {
    e.stopPropagation();
    if (playingVoiceId === voiceId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(voiceId);
      setTimeout(() => setPlayingVoiceId(null), 3000);
    }
  };

  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 6 of 7</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Select ElevenLabs Narration Voice</h2>
        </div>
        <Badge variant="emerald" size="sm">ElevenLabs Studio v2</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {VOICES.map((v) => {
          const isSelected = selectedVoice === v.id;
          const isPlaying = playingVoiceId === v.id;

          return (
            <Card
              key={v.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => setSelectedVoice(v.id)}
              className={`p-4 cursor-pointer space-y-3 transition-all duration-300 flex flex-col justify-between group ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10 shadow-2xl gold-glow' : 'hover:border-neutral-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{v.name}</h3>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </div>

                <p className="text-xs text-neutral-400">{v.style}</p>
                <Badge variant="neutral" size="sm">{v.accent}</Badge>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handlePlaySample(e, v.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isPlaying
                      ? 'bg-amber-400 text-black'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isPlaying ? 'Playing Sample...' : 'Play Sample'}</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <Button variant="outline" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Generate AI Campaign
        </Button>
      </div>
    </Card>
  );
}

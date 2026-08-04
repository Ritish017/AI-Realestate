'use client';

import React, { useState } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { ElevenLabsVoiceId } from '@/types/domain';
import { generateElevenLabsNarration } from '@/services/elevenLabsService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Input';
import { Mic, Volume2, Check, Sparkles, RefreshCw, Play } from 'lucide-react';

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

  const defaultScript =
    config?.narrationScript ||
    `Welcome to ${currentProject?.listingInfo.title || 'this luxury residence'}. Offered at ${currentProject?.listingInfo.price || '$6,850,000'}. Featuring ${currentProject?.listingInfo.bedrooms || 5} bedrooms, ${currentProject?.listingInfo.bathrooms || 6} luxury bathrooms, and architectural perfection throughout.`;

  const [script, setScript] = useState(defaultScript);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(config?.audioUrl || null);

  const handleGenerateVoice = async () => {
    setIsSynthesizing(true);
    const result = await generateElevenLabsNarration(script, activeVoice);
    setIsSynthesizing(false);
    if (result.success) {
      setGeneratedAudioUrl(result.audioUrl);
      setVoiceConfig({
        voiceId: activeVoice,
        narrationScript: script,
        audioUrl: result.audioUrl,
        syncDurationSeconds: result.durationEstimateSeconds,
      });
    }
  };

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
              <Badge variant="gold" size="sm">Studio Multilingual v2</Badge>
            </div>
            <p className="text-xs text-neutral-400">
              Type custom speech text below to generate realistic studio-grade voice narration synchronized to video.
            </p>
          </div>
        </div>

        <Button
          variant="gold"
          size="sm"
          isLoading={isSynthesizing}
          leftIcon={<Sparkles className="w-4 h-4" />}
          onClick={handleGenerateVoice}
        >
          Synthesize AI Speech
        </Button>
      </div>

      {/* Voice Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {VOICES.map((v) => {
          const isSelected = activeVoice === v.id;
          return (
            <Card
              key={v.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => {
                setVoiceConfig({ voiceId: v.id, voiceName: v.name });
              }}
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

      {/* Custom Narration Script Input */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-neutral-300 block">
          Custom Narration Speech Text
        </label>
        <Textarea
          value={script}
          onChange={(e) => {
            setScript(e.target.value);
            setVoiceConfig({ narrationScript: e.target.value });
          }}
          rows={3}
          placeholder="Type the exact narration speech you want ElevenLabs to speak..."
          className="text-xs font-mono"
        />
      </div>

      {/* Generated Audio Player Preview */}
      {generatedAudioUrl && (
        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <p className="text-xs font-bold text-white">Generated ElevenLabs Audio Track</p>
              <p className="text-[10px] text-neutral-400 font-mono">Synced to ~{Math.ceil(script.split(' ').length / 2.5)}s duration</p>
            </div>
          </div>
          <audio controls src={generatedAudioUrl} className="h-8 max-w-xs" />
        </div>
      )}
    </Card>
  );
}

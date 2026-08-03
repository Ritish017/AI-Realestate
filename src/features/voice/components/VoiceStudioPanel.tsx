'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Input';
import { Mic, Play, Pause, Sparkles, RefreshCw, Check, Volume2 } from 'lucide-react';
import { VOICE_ACTORS_CATALOG, VoiceActor, VoiceService } from '../services/voiceService';
import { SubtitleSyncEditor } from './SubtitleSyncEditor';
import { useToastStore } from '@/stores/useToastStore';
import { PropertyListingInfo } from '@/types/domain';

export interface VoiceStudioPanelProps {
  listingInfo: PropertyListingInfo;
  onUpdateScript?: (script: string) => void;
}

export const VoiceStudioPanel: React.FC<VoiceStudioPanelProps> = ({
  listingInfo,
  onUpdateScript,
}) => {
  const { showSuccess } = useToastStore();
  const [selectedActor, setSelectedActor] = useState<VoiceActor>(VOICE_ACTORS_CATALOG[0]);
  const [script, setScript] = useState<string>(VoiceService.buildNarrationScript(listingInfo));
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const wordCount = script.trim().split(/\s+/).length;
  const estimatedSeconds = Math.round((wordCount / 150) * 60);

  const handleRewriteScript = () => {
    const rewritten = VoiceService.buildNarrationScript(listingInfo);
    setScript(rewritten);
    onUpdateScript?.(rewritten);
    showSuccess('Script Rewritten', 'AI Copywriter synthesized a luxury property documentary script.');
  };

  const handleSynthesizeVoice = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      showSuccess('ElevenLabs Voice Synthesized', `Generated high-fidelity audio with ${selectedActor.name}.`);
    }, 1500);
  };

  return (
    <Card variant="glass" className="p-8 space-y-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Mic className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-white">ElevenLabs AI Voice Studio</h2>
            <p className="text-xs text-neutral-400">Synthesize documentary-grade voice narration scripts and word-level animated subtitles.</p>
          </div>
        </div>

        <Badge variant="gold" size="sm">ElevenLabs Turbo v2.5</Badge>
      </div>

      {/* Voice Actor Selection Cards */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-neutral-300 block">Select Voice Actor</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VOICE_ACTORS_CATALOG.map((actor) => {
            const isSelected = selectedActor.id === actor.id;
            return (
              <div
                key={actor.id}
                onClick={() => setSelectedActor(actor)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-400 gold-glow'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{actor.name}</span>
                    <Badge variant="glass" size="sm">{actor.style}</Badge>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{actor.description}</p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingAudio(!isPlayingAudio);
                  }}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white shrink-0"
                >
                  <Volume2 className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Script Editor & Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300">Narration Script Text</label>
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span>{wordCount} Words</span>
            <span>·</span>
            <span>Est. Duration: {estimatedSeconds}s</span>
          </div>
        </div>

        <Textarea
          rows={5}
          value={script}
          onChange={(e) => {
            setScript(e.target.value);
            onUpdateScript?.(e.target.value);
          }}
        />

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRewriteScript}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Rewrite Script with AI
          </Button>

          <Button
            variant="gold"
            size="md"
            isLoading={isSynthesizing}
            onClick={handleSynthesizeVoice}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Synthesize ElevenLabs Audio
          </Button>
        </div>
      </div>

      {/* Subtitle Sync Editor Integration */}
      <SubtitleSyncEditor script={script} totalDurationSeconds={estimatedSeconds} />
    </Card>
  );
};

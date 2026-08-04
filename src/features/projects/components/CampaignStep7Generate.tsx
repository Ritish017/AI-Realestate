'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface CampaignStep7Props {
  onComplete: () => void;
}

const PROGRESS_STEPS = [
  'Understanding your property...',
  'Analyzing your images with Gemini Computer Vision...',
  'Planning cinematic scene trajectories...',
  'Writing professional narration script...',
  'Selecting camera movements & lighting transitions...',
  'Synchronizing ElevenLabs AI Voice narration...',
  'Preparing your high-definition preview...',
  'Almost ready...',
];

export function CampaignStep7Generate({ onComplete }: CampaignStep7Props) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progressPercent, setProgressPercent] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < PROGRESS_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
      });

      setProgressPercent((prev) => Math.min(prev + 12, 100));
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Card variant="gold" className="p-10 max-w-xl mx-auto space-y-8 text-center bg-neutral-950 border-amber-500/40 shadow-2xl">
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto gold-glow">
        <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
      </div>

      <div className="space-y-2">
        <Badge variant="gold" size="md">AI Director at Work</Badge>
        <h2 className="text-2xl font-serif italic font-bold text-white">Creating Your Campaign</h2>
        <p className="text-xs text-neutral-400">Sit back while our Multi-AI Agency builds your complete marketing package.</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-neutral-400">
          <span className="text-amber-300 font-bold">{PROGRESS_STEPS[currentStepIdx]}</span>
          <span className="text-white font-bold">{progressPercent}%</span>
        </div>

        <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500 shadow-md"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Completed Checklist Items */}
      <div className="text-left space-y-2 pt-4 border-t border-neutral-800">
        {PROGRESS_STEPS.slice(0, currentStepIdx + 1).map((msg, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{msg}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

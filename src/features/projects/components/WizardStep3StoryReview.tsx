'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowLeft, Clock, GripVertical, Zap } from 'lucide-react';
import { PropertyPhoto, VideoStyleId } from '@/types/domain';

export interface WizardStep3Props {
  photos: PropertyPhoto[];
  selectedStyle: VideoStyleId;
  durationSeconds: number;
  onBack: () => void;
  onFinish: () => void;
}

export const WizardStep3StoryReview: React.FC<WizardStep3Props> = ({
  photos,
  selectedStyle,
  durationSeconds,
  onBack,
  onFinish,
}) => {
  const activePhotos = photos.filter((p) => p.isSelected);

  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 3 of 3</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Review AI Narrative Story Sequence</h2>
        </div>
        <Badge variant="emerald" size="sm">Story Director AI Ready</Badge>
      </div>

      {/* Story Timeline Flow Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-serif text-white">
            Narrative Scene Order ({activePhotos.length} Scenes)
          </h3>
          <span className="text-xs font-mono text-neutral-400">
            Est. Reel Duration: {durationSeconds} Seconds
          </span>
        </div>

        <div className="space-y-3">
          {activePhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-neutral-600 cursor-grab" />
                <span className="text-xs font-mono font-bold text-amber-400">SCENE 0{idx + 1}</span>

                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-neutral-800">
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{photo.name}</h4>
                  <p className="text-[10px] text-neutral-400">{photo.sceneType} · {photo.cameraMotion}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="glass" size="sm">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span>5.0s</span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Director Recommendation Callout */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-amber-300">Story Director AI Rationale</h4>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          "The narrative sequence opens with the Front Exterior facade dolly push, moves smoothly into the Foyer, highlights the Gourmet Kitchen slider, and climaxes at the Infinity Pool terrace. This arc delivers a +24% higher engagement score."
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <Button variant="outline" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Media
        </Button>
        <Button variant="gold" size="lg" onClick={onFinish} leftIcon={<Sparkles className="w-5 h-5" />}>
          Generate Production Reel Studio
        </Button>
      </div>
    </Card>
  );
};

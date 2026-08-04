'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PropertyPhoto } from '@/types/domain';
import { ArrowRight, ArrowLeft, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

interface CampaignStep4Props {
  photos: PropertyPhoto[];
  coverPhotoId?: string;
  setCoverPhotoId: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CampaignStep4CoverImage({
  photos,
  coverPhotoId,
  setCoverPhotoId,
  onNext,
  onBack,
}: CampaignStep4Props) {
  const selectedCoverId = coverPhotoId || photos[0]?.id;
  const recommendedPhoto = photos.find((p) => p.isRecommendedCover) || photos[0];

  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 4 of 7</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Choose Cover & Poster Image</h2>
        </div>
        <Badge variant="emerald" size="sm">AI Visual Recommendation Active</Badge>
      </div>

      {/* AI Recommendation Highlight Box */}
      {recommendedPhoto && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs text-amber-200">
            <span className="font-bold text-amber-400">AI Recommendation: </span>
            We recommend <span className="font-bold text-white">"{recommendedPhoto.name}"</span> because it has the highest curb appeal quality score ({recommendedPhoto.qualityScore}/100) and strongest visual impact for opening frames.
          </div>
        </div>
      )}

      {/* Photos Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {photos.map((photo) => {
          const isSelected = selectedCoverId === photo.id;

          return (
            <Card
              key={photo.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => setCoverPhotoId(photo.id)}
              className={`p-3 cursor-pointer space-y-3 transition-all duration-300 ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10 shadow-2xl gold-glow' : 'hover:border-neutral-700'
              }`}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                {photo.isRecommendedCover && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="gold" size="sm">AI Recommended</Badge>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-white truncate">{photo.name}</h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">{photo.sceneType}</p>
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
          Next: Property Details
        </Button>
      </div>
    </Card>
  );
}

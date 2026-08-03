'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Link as LinkIcon, Building2, Home, Compass } from 'lucide-react';
import { PropertyListingInfo, AspectRatio, VideoStyleId } from '@/types/domain';

export interface WizardStep1Props {
  listingInfo: PropertyListingInfo;
  setListingInfo: React.Dispatch<React.SetStateAction<PropertyListingInfo>>;
  selectedStyle: VideoStyleId;
  setSelectedStyle: (style: VideoStyleId) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  durationSeconds: number;
  setDurationSeconds: (duration: number) => void;
  onNext: () => void;
  onImportMlsUrl: (url: string) => void;
  isLoadingMls: boolean;
}

export const WizardStep1Details: React.FC<WizardStep1Props> = ({
  listingInfo,
  setListingInfo,
  selectedStyle,
  setSelectedStyle,
  aspectRatio,
  setAspectRatio,
  durationSeconds,
  setDurationSeconds,
  onNext,
  onImportMlsUrl,
  isLoadingMls,
}) => {
  const propertyTypes = [
    { value: 'Luxury Villa', label: 'Luxury Villa / Mansion' },
    { value: 'Single Family', label: 'Single Family Residence' },
    { value: 'Modern Condo', label: 'Modern Condo / Penthouse' },
    { value: 'Townhouse', label: 'Townhouse / Urban Rowhouse' },
    { value: 'Vacation Rental', label: 'Vacation Rental / Airbnb' },
    { value: 'Commercial', label: 'Commercial Estate / Office' },
  ];

  const aspectRatios: Array<{ id: AspectRatio; label: string; desc: string }> = [
    { id: '9:16', label: '9:16 Portrait', desc: 'Instagram Reels, TikTok, Shorts' },
    { id: '16:9', label: '16:9 Landscape', desc: 'YouTube, MLS, Website Hero' },
    { id: '1:1', label: '1:1 Square', desc: 'Instagram Feed, Facebook, LinkedIn' },
  ];

  const durations = [15, 30, 45, 60];

  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-3xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 1 of 3</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Property Metadata & Target Specifications</h2>
        </div>
        <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
      </div>

      {/* MLS URL Instant Auto-Import Bar */}
      <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
        <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Optional MLS or Zillow URL Auto-Import</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Paste MLS or Zillow listing URL (e.g. https://www.zillow.com/homedetails/...)"
            value={listingInfo.mlsUrl || ''}
            onChange={(e) => setListingInfo((prev) => ({ ...prev, mlsUrl: e.target.value }))}
            className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
          />
          <Button
            variant="gold"
            size="sm"
            isLoading={isLoadingMls}
            onClick={() => listingInfo.mlsUrl && onImportMlsUrl(listingInfo.mlsUrl)}
          >
            Import MLS Data
          </Button>
        </div>
      </div>

      {/* Main Metadata Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Input
            label="Property Name / Campaign Title"
            value={listingInfo.title}
            onChange={(e) => setListingInfo((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. The Crestview Modern Villa"
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Full Address & City"
            value={listingInfo.address}
            onChange={(e) => setListingInfo((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="e.g. 742 Sycamore Canyon Rd, Montecito, CA 93108"
          />
        </div>

        <Input
          label="Listing Price"
          value={listingInfo.price}
          onChange={(e) => setListingInfo((prev) => ({ ...prev, price: e.target.value }))}
          placeholder="e.g. $8,950,000"
        />

        <Select
          label="Property Category"
          value={listingInfo.propertyType || 'Luxury Villa'}
          onChange={(e) => setListingInfo((prev) => ({ ...prev, propertyType: e.target.value }))}
          options={propertyTypes}
        />

        <Input
          label="Bedrooms"
          type="number"
          value={listingInfo.bedrooms}
          onChange={(e) => setListingInfo((prev) => ({ ...prev, bedrooms: Number(e.target.value) }))}
        />

        <Input
          label="Bathrooms"
          type="number"
          value={listingInfo.bathrooms}
          onChange={(e) => setListingInfo((prev) => ({ ...prev, bathrooms: Number(e.target.value) }))}
        />

        <Input
          label="Square Footage (Sq Ft)"
          type="number"
          value={listingInfo.sqft}
          onChange={(e) => setListingInfo((prev) => ({ ...prev, sqft: Number(e.target.value) }))}
        />

        <div className="sm:col-span-2">
          <Textarea
            label="Property Description"
            value={listingInfo.description}
            onChange={(e) => setListingInfo((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe key architectural highlights, ocean views, wine cellar, infinity pool..."
          />
        </div>
      </div>

      {/* Target Aspect Ratio Selection */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-neutral-300 block">Target Platform Aspect Ratio</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.id}
              type="button"
              onClick={() => setAspectRatio(ratio.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                aspectRatio === ratio.id
                  ? 'bg-amber-500/10 border-amber-400 gold-glow'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <p className="text-xs font-bold text-white">{ratio.label}</p>
              <p className="text-[10px] text-neutral-400 mt-1">{ratio.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Target Duration Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-neutral-300 block">Target Reel Duration</label>
        <div className="flex items-center gap-3">
          {durations.map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => setDurationSeconds(dur)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                durationSeconds === dur
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {dur} Seconds
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-neutral-800">
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Continue to Media Upload
        </Button>
      </div>
    </Card>
  );
};

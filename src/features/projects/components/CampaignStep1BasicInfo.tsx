'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Target, Building2, Tag } from 'lucide-react';
import { CampaignGoal, PropertyCategory } from '@/types/domain';

interface CampaignStep1Props {
  campaignName: string;
  setCampaignName: (name: string) => void;
  campaignGoal: CampaignGoal;
  setCampaignGoal: (goal: CampaignGoal) => void;
  propertyCategory: PropertyCategory;
  setPropertyCategory: (cat: PropertyCategory) => void;
  onNext: () => void;
}

const CAMPAIGN_GOALS: { value: CampaignGoal; label: string; desc: string }[] = [
  { value: 'just_listed', label: 'Just Listed', desc: 'High-converting launch campaign for brand new listings.' },
  { value: 'luxury_showcase', label: 'Luxury Showcase', desc: 'Editorial twilight aesthetics for high-end estates.' },
  { value: 'open_house', label: 'Open House Event', desc: 'Event date driving & walkthrough invitations.' },
  { value: 'coming_soon', label: 'Coming Soon Teaser', desc: 'Exclusive preview & VIP buyer waitlists.' },
  { value: 'sold', label: 'Just Sold Portfolio', desc: 'Celebrate closing & capture seller leads.' },
  { value: 'investment', label: 'Investment Opportunity', desc: 'Highlight cap rates, ROI & rental yield.' },
  { value: 'rental', label: 'Rental Showcase', desc: 'Lease terms & move-in readiness.' },
  { value: 'commercial', label: 'Commercial Leasing', desc: 'Corporate presentation for commercial space.' },
];

const PROPERTY_CATEGORIES: { value: PropertyCategory; label: string }[] = [
  { value: 'House', label: 'Single Family House' },
  { value: 'Condo', label: 'Condo / Penthouse' },
  { value: 'Townhouse', label: 'Townhouse / Rowhouse' },
  { value: 'Villa', label: 'Luxury Villa / Mansion' },
  { value: 'Apartment', label: 'Modern Apartment' },
  { value: 'Commercial', label: 'Commercial Estate / Office' },
];

export function CampaignStep1BasicInfo({
  campaignName,
  setCampaignName,
  campaignGoal,
  setCampaignGoal,
  propertyCategory,
  setPropertyCategory,
  onNext,
}: CampaignStep1Props) {
  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-3xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 1 of 7</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Create Marketing Campaign</h2>
        </div>
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>

      <div className="space-y-6">
        {/* Campaign Name */}
        <div>
          <Input
            label="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g. 742 Sycamore Canyon Rd – Luxury Showcase"
          />
          <p className="text-[11px] text-neutral-400 mt-1">
            Realtors organize campaigns by property address and marketing goal.
          </p>
        </div>

        {/* Campaign Goal Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Campaign Goal</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CAMPAIGN_GOALS.map((goal) => {
              const isSelected = campaignGoal === goal.value;
              return (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setCampaignGoal(goal.value)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-400 gold-glow'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <p className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-white'}`}>{goal.label}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{goal.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Property Category */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Property Type</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PROPERTY_CATEGORIES.map((cat) => {
              const isSelected = propertyCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setPropertyCategory(cat.value)}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                    isSelected
                      ? 'bg-white text-black font-bold shadow-lg'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-neutral-800">
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Next: Upload Images
        </Button>
      </div>
    </Card>
  );
}

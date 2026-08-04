'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PropertyListingInfo, CallToAction } from '@/types/domain';
import { ArrowRight, ArrowLeft, Building2, MapPin, DollarSign, Home, PhoneCall } from 'lucide-react';

interface CampaignStep5Props {
  listingInfo: PropertyListingInfo;
  setListingInfo: React.Dispatch<React.SetStateAction<PropertyListingInfo>>;
  cta: CallToAction;
  setCta: (cta: CallToAction) => void;
  onNext: () => void;
  onBack: () => void;
}

const CTA_OPTIONS: { value: CallToAction; label: string }[] = [
  { value: 'Book a Private Tour', label: 'Book a Private Tour' },
  { value: 'Contact Me Today', label: 'Contact Me Today' },
  { value: 'Schedule a Showing', label: 'Schedule a Showing' },
];

export function CampaignStep5PropertyDetails({
  listingInfo,
  setListingInfo,
  cta,
  setCta,
  onNext,
  onBack,
}: CampaignStep5Props) {
  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-3xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 5 of 7</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Property Details & Call to Action</h2>
        </div>
        <Badge variant="emerald" size="sm">Auto AI Enrichment</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Input
            label="Property Address"
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
          label="Primary Call to Action (CTA)"
          value={cta}
          onChange={(e) => setCta(e.target.value as CallToAction)}
          options={CTA_OPTIONS}
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

        <Input
          label="Nearby Schools (Optional)"
          value={listingInfo.schools || ''}
          onChange={(e) => setListingInfo((prev) => ({ ...prev, schools: e.target.value }))}
          placeholder="e.g. Montecito Elementary (10/10)"
        />

        <div className="sm:col-span-2">
          <Textarea
            label="Property Description"
            value={listingInfo.description}
            onChange={(e) => setListingInfo((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            placeholder="Describe key architectural highlights, ocean views, wine cellar, infinity pool..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <Button variant="outline" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Next: Voice Selection
        </Button>
      </div>
    </Card>
  );
}

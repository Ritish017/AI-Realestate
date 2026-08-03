'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Printer, Download, Sparkles, Building2, Phone, Mail } from 'lucide-react';
import { PropertyListingInfo, BrandKit } from '@/types/domain';

export interface FlyerGeneratorProps {
  listingInfo: PropertyListingInfo;
  brandKit: BrandKit;
}

export const FlyerGenerator: React.FC<FlyerGeneratorProps> = ({
  listingInfo,
  brandKit,
}) => {
  return (
    <Card variant="glass" className="p-6 space-y-6 border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Printer className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold font-serif text-white">Digital Print Flyer & Open House Poster</h4>
        </div>
        <Badge variant="emerald" size="sm">Print-Ready PDF</Badge>
      </div>

      {/* Live Print Flyer Preview Box */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
        {/* Top Gold Border Accent */}
        <div className="h-2 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full" />

        <div className="space-y-1 text-center">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">JUST LISTED SHOWCASE</span>
          <h3 className="text-xl font-bold font-serif text-white">{listingInfo.title}</h3>
          <p className="text-xs text-neutral-400">{listingInfo.address}</p>
        </div>

        {/* Feature Spec Pills */}
        <div className="flex items-center justify-center gap-4 py-3 bg-black/60 rounded-2xl border border-neutral-800 text-xs font-mono text-amber-400">
          <span>{listingInfo.bedrooms} BEDS</span>
          <span>·</span>
          <span>{listingInfo.bathrooms} BATHS</span>
          <span>·</span>
          <span>{listingInfo.sqft.toLocaleString()} SQFT</span>
        </div>

        {/* Price Callout */}
        <div className="text-center">
          <span className="text-2xl font-bold font-serif text-white">{listingInfo.price}</span>
        </div>

        {/* Agent Footer Signature */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div>
            <p className="font-bold text-white">{brandKit.agentName}</p>
            <p className="text-[10px] text-neutral-400">{brandKit.brokerageName}</p>
          </div>
          <p className="font-mono text-[10px] text-amber-400">{brandKit.agentPhone}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="gold" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Download High-Res PDF Flyer
        </Button>
      </div>
    </Card>
  );
};

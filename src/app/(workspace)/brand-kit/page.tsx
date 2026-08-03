'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { BrandKitModal } from '@/components/BrandKitModal';
import { useBrandStore } from '@/stores/useBrandStore';
import { Badge } from '@/components/ui/Badge';

export default function BrandKitPage() {
  const { brandKit, updateBrandKit } = useBrandStore();

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Identity & Branding</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Realtor Brand Kit Studio</h1>
        </div>

        <Badge variant="emerald" size="sm">Persistent Lower-Third Active</Badge>
      </div>

      <BrandKitModal
        brandKit={brandKit}
        setBrandKit={(updated: any) => {
          if (typeof updated === 'function') {
            updateBrandKit(updated(brandKit));
          } else {
            updateBrandKit(updated);
          }
        }}
      />
    </PageContainer>
  );
}

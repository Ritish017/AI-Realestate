'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PhotoUploader } from '@/components/PhotoUploader';
import { useMediaStore } from '@/stores/useMediaStore';
import { Badge } from '@/components/ui/Badge';

export default function MediaPage() {
  const { photos, setPhotos } = useMediaStore();

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Media Management</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Media Library & AI Inspector</h1>
        </div>

        <Badge variant="emerald" size="sm">Gemini Vision AI Active</Badge>
      </div>

      <PhotoUploader
        photos={photos}
        setPhotos={setPhotos}
        listingInfo={{
          title: 'Montecito Coastal Sanctuary',
          address: '742 Sycamore Canyon Rd, Montecito, CA',
          price: '$8,950,000',
          bedrooms: 5,
          bathrooms: 7,
          sqft: 7200,
          description: 'Private Montecito sanctuary with ocean views.',
        }}
        setListingInfo={() => {}}
        onImportMlsUrl={async (url: string) => {}}
        isLoadingMls={false}
      />
    </PageContainer>
  );
}

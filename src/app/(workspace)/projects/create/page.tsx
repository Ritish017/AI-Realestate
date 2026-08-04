'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { CampaignWizard } from '@/features/projects/components/CampaignWizard';

export default function CreateCampaignPage() {
  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Create Campaign Wizard</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">New AI Marketing Campaign</h1>
        </div>

        <Badge variant="emerald" size="sm">Apple-Grade 7-Step Workflow</Badge>
      </div>

      <CampaignWizard />
    </PageContainer>
  );
}

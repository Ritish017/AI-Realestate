'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DashboardHero } from '@/features/dashboard/components/DashboardHero';
import { MetricCards } from '@/features/dashboard/components/MetricCards';
import { ContinueWorkingGrid } from '@/features/dashboard/components/ContinueWorkingGrid';
import { AIDirectorFeed } from '@/features/dashboard/components/AIDirectorFeed';
import { QuickTemplateSelector } from '@/features/dashboard/components/QuickTemplateSelector';
import { PlatformAnalyticsSnapshot } from '@/features/dashboard/components/PlatformAnalyticsSnapshot';

export default function DashboardPage() {
  return (
    <PageContainer className="space-y-10">
      {/* Hero Welcome Banner */}
      <DashboardHero />

      {/* Metric Cards Grid */}
      <MetricCards />

      {/* Continue Working / Recent Projects */}
      <ContinueWorkingGrid />

      {/* Proactive AI Director Recommendation Feed */}
      <AIDirectorFeed />

      {/* Favorite Production Templates */}
      <QuickTemplateSelector />

      {/* Social Distribution Analytics & Storage */}
      <PlatformAnalyticsSnapshot />
    </PageContainer>
  );
}

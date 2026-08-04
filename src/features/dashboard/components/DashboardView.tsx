'use client';

import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DashboardHero } from '@/features/dashboard/components/DashboardHero';
import { MetricCards } from '@/features/dashboard/components/MetricCards';
import { ContinueWorkingGrid } from '@/features/dashboard/components/ContinueWorkingGrid';
import { AIDirectorFeed } from '@/features/dashboard/components/AIDirectorFeed';
import { PropertyIntelligenceCard } from '@/features/dashboard/components/PropertyIntelligenceCard';
import { AIMarketingDirectorSelector } from '@/features/marketing/components/AIMarketingDirectorSelector';
import { MarketingPackageExporter } from '@/features/marketing/components/MarketingPackageExporter';
import { QuickTemplateSelector } from '@/features/dashboard/components/QuickTemplateSelector';
import { PlatformAnalyticsSnapshot } from '@/features/dashboard/components/PlatformAnalyticsSnapshot';

export function DashboardView() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <PageContainer className="space-y-10">
        <div className="h-64 rounded-3xl bg-neutral-900 animate-pulse border border-neutral-800" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-10">
      {/* Hero Welcome Banner */}
      <DashboardHero />

      {/* Metric Cards Grid */}
      <MetricCards />

      {/* AI Marketing Director Goal Selector */}
      <AIMarketingDirectorSelector />

      {/* Property Intelligence Scorecard & Report */}
      <PropertyIntelligenceCard />

      {/* Continue Working / Recent Projects */}
      <ContinueWorkingGrid />

      {/* Proactive AI Director Recommendation Feed */}
      <AIDirectorFeed />

      {/* Marketing Package Exporter (Email, Social, Print, QR, Landing Page) */}
      <MarketingPackageExporter />

      {/* Favorite Production Templates */}
      <QuickTemplateSelector />

      {/* Social Distribution Analytics & Storage */}
      <PlatformAnalyticsSnapshot />
    </PageContainer>
  );
}

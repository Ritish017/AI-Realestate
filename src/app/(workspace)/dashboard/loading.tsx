import React from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Card } from '../../../components/ui/Card';

export default function DashboardLoading() {
  return (
    <PageContainer>
      <div className="h-48 rounded-3xl bg-neutral-900/60 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-3xl bg-neutral-900/60 animate-pulse" />
        ))}
      </div>
      <div className="h-64 rounded-3xl bg-neutral-900/60 animate-pulse" />
    </PageContainer>
  );
}

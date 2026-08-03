'use client';

import React from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageContainer>
      <Card variant="glass" className="p-12 text-center max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold font-serif text-white">Dashboard Encountered an Issue</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {error.message || 'We could not load your active dashboard data. Try refreshing or contact support if the issue persists.'}
        </p>
        <Button variant="primary" onClick={reset} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Reload Dashboard
        </Button>
      </Card>
    </PageContainer>
  );
}

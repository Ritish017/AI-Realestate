'use client';

import React from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Check, X, ArrowRight, Wand2 } from 'lucide-react';

export function DirectorsCutModal() {
  const { currentProject, applyDirectorsCut } = useProjectStore();
  const recs = currentProject?.directorsCut;

  if (!recs || recs.length === 0) return null;

  return (
    <Card variant="gold" className="p-6 space-y-4 border-amber-500/40 bg-amber-500/5 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-400 text-black">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">AI Director's Cut Self-Critique</h3>
              <Badge variant="gold" size="sm">{recs.length} Optimizations Found</Badge>
            </div>
            <p className="text-xs text-neutral-400">The AI evaluated the sequence and identified 3 key improvements for maximum buyer conversion.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {recs.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300">{rec.title}</span>
                <Badge variant={rec.impact === 'High' ? 'gold' : 'neutral'} size="sm">
                  {rec.impact} Impact
                </Badge>
              </div>
              <p className="text-xs text-neutral-400">{rec.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="gold"
                size="sm"
                leftIcon={<Check className="w-3.5 h-3.5" />}
                onClick={() => applyDirectorsCut(rec.id)}
              >
                Apply Cut
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => applyDirectorsCut(rec.id)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

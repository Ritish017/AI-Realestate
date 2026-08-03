'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useProjectStore } from '@/stores/useProjectStore';

export const ContinueWorkingGrid: React.FC = () => {
  const { projects } = useProjectStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-serif text-white">Continue Working</h2>
          <p className="text-xs text-neutral-400">Jump right back into your recent property campaigns.</p>
        </div>
        <Link href="/projects" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1">
          <span>View All ({projects.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.slice(0, 2).map((project) => (
          <Card key={project.id} variant="glass" className="space-y-4 flex flex-col justify-between group">
            {/* Thumbnail Preview Area */}
            <div className="h-44 rounded-2xl overflow-hidden bg-neutral-900 relative border border-neutral-800">
              <img
                src={project.scenes[0]?.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <Badge variant="gold" size="sm">{project.style} style</Badge>
                <Badge variant="glass" size="sm">{project.aspectRatio}</Badge>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
                  <p className="text-[11px] text-neutral-300 truncate">{project.listingInfo.address}</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">{project.listingInfo.price}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{project.scenes.length} Scenes · {project.duration}s</span>
              </span>

              <Link href={`/projects/${project.id}/studio`}>
                <Button variant="gold" size="sm" leftIcon={<Play className="w-3.5 h-3.5 fill-black" />}>
                  Open Studio
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useProjectStore } from '@/stores/useProjectStore';

export function ProjectsView() {
  const { projects, deleteProject } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <PageContainer>
        <div className="h-64 rounded-3xl bg-neutral-900 animate-pulse border border-neutral-800" />
      </PageContainer>
    );
  }

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.listingInfo.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Campaigns Hub</h1>
          <p className="text-xs text-neutral-400">Manage and preview all your active AI real estate video marketing campaigns.</p>
        </div>

        <Link href="/projects/create">
          <Button variant="gold" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Campaign
          </Button>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <Card variant="glass" className="p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Filter projects by title, address, or style..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
        />
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} variant="glass" className="space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="gold" size="sm">{project.style}</Badge>
                <Badge variant="emerald" size="sm">{project.status}</Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{project.title}</h3>
                <p className="text-xs text-neutral-400">{project.listingInfo.address}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                <span>{project.listingInfo.price}</span>
                <span>·</span>
                <span>{project.aspectRatio}</span>
                <span>·</span>
                <span>{project.duration}s</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <button
                onClick={() => deleteProject(project.id)}
                className="text-neutral-500 hover:text-rose-400 p-2 rounded-xl hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Link href={`/projects/${project.id}/studio`}>
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Studio
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}

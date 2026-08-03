'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Download, Share2, Package, Film, Check } from 'lucide-react';
import { useProjectStore } from '@/stores/useProjectStore';
import { useToastStore } from '@/stores/useToastStore';

export default function ExportsPage() {
  const { projects } = useProjectStore();
  const { showSuccess } = useToastStore();

  const handleDownloadMp4 = (title: string) => {
    showSuccess('Exporting 4K MP4 Reel', `Rendering 60fps 4K video reel for ${title}...`);
  };

  const handleDownloadZip = (title: string) => {
    showSuccess('Packaging Campaign ZIP', `Downloading complete marketing ZIP package for ${title}...`);
  };

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Export Center</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">Exports & Campaign Packages</h1>
        </div>

        <Badge variant="emerald" size="sm">4K Ultra HD 60fps Enabled</Badge>
      </div>

      {/* Projects Export List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.id} variant="glass" className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-amber-400/40 transition-colors">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="sm">{project.style} Style</Badge>
                <Badge variant="glass" size="sm">{project.aspectRatio}</Badge>
                <Badge variant="emerald" size="sm">1080p / 4K Ready</Badge>
              </div>

              <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-neutral-400">
                {project.listingInfo.address} · Created {project.createdAt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => showSuccess('Share Link Copied', 'Public campaign URL copied to clipboard.')}
                leftIcon={<Share2 className="w-4 h-4" />}
              >
                Share Link
              </Button>

              <Button
                variant="gold"
                size="sm"
                onClick={() => handleDownloadMp4(project.title)}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download MP4 Reel
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownloadZip(project.title)}
                leftIcon={<Package className="w-4 h-4" />}
              >
                Download Full Campaign ZIP
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}

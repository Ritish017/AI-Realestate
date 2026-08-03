'use client';

import React, { use } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { VideoStudioPlayer } from '@/components/VideoStudioPlayer';
import { useProjectStore } from '@/stores/useProjectStore';

export default function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { projects, currentProject } = useProjectStore();
  const project = projects.find((p) => p.id === resolvedParams.id) || currentProject || projects[0];

  if (!project) {
    return (
      <PageContainer>
        <p className="text-neutral-400">Project not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <VideoStudioPlayer
        job={project as any}
        photos={project.scenes.map((s) => ({
          id: s.photoId,
          url: s.imageUrl,
          name: s.title,
          sceneType: s.sceneType,
          qualityScore: 98,
          rank: 1,
          cameraMotion: s.cameraMotion,
          isSelected: true,
        }))}
        brandKit={project.brandKit}
        musicTrack={project.musicTrack}
        aspectRatio={project.aspectRatio}
        onGenerateNew={() => {}}
        isGenerating={false}
      />
    </PageContainer>
  );
}

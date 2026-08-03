'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { TimelineTrack } from '@/components/timeline/TimelineTrack';
import { TimelineScrubber } from '@/components/timeline/TimelineScrubber';
import { TimelineInspector } from './TimelineInspector';
import { AudioTracksView } from './AudioTracksView';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useProjectStore } from '@/stores/useProjectStore';

export const TimelineEditor: React.FC = () => {
  const { currentProject } = useProjectStore();
  const {
    scenes,
    activeSceneIndex,
    isPlaying,
    currentTime,
    setActiveSceneIndex,
    setIsPlaying,
    setCurrentTime,
    updateScene,
    setScenes,
  } = useTimelineStore();

  const activeScenes = scenes.length > 0 ? scenes : currentProject?.scenes || [];
  const currentScene = activeScenes[activeSceneIndex] || activeScenes[0] || null;
  const totalDuration = activeScenes.reduce((acc, s) => acc + s.durationSeconds, 0);

  const handleUpdateScene = (id: string, updates: any) => {
    updateScene(id, updates);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Columns: Multi-Track Timeline & Controls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Playback Controls & Scrubber */}
        <TimelineScrubber
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          currentTime={currentTime}
          totalDuration={totalDuration}
          isMuted={false}
          onToggleMute={() => {}}
        />

        {/* Video Track 1: Scene Cards */}
        <Card variant="glass" className="p-6 border border-neutral-800 space-y-4">
          <TimelineTrack
            scenes={activeScenes}
            activeSceneIndex={activeSceneIndex}
            onSelectScene={(idx) => setActiveSceneIndex(idx)}
          />
        </Card>

        {/* Production Audio & Brand Tracks */}
        {currentProject && (
          <AudioTracksView
            musicTrack={currentProject.musicTrack}
            brandKit={currentProject.brandKit}
          />
        )}
      </div>

      {/* Right Column: Contextual Inspector Panel */}
      <div className="lg:col-span-1">
        <TimelineInspector scene={currentScene} onUpdateScene={handleUpdateScene} />
      </div>
    </div>
  );
};

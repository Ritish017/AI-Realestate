import React from 'react';
import { VideoScene } from '../../types/domain';
import { TimelineSceneCard } from './TimelineSceneCard';

export interface TimelineTrackProps {
  scenes: VideoScene[];
  activeSceneIndex: number;
  onSelectScene: (index: number) => void;
}

export const TimelineTrack: React.FC<TimelineTrackProps> = ({
  scenes,
  activeSceneIndex,
  onSelectScene,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span className="font-mono uppercase tracking-wider text-[10px]">Video Track ({scenes.length} Scenes)</span>
        <span className="font-mono text-[10px]">Total: {scenes.reduce((acc, s) => acc + s.durationSeconds, 0)}s</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {scenes.map((scene, idx) => (
          <TimelineSceneCard
            key={scene.id}
            scene={scene}
            index={idx}
            isActive={idx === activeSceneIndex}
            onSelect={() => onSelectScene(idx)}
          />
        ))}
      </div>
    </div>
  );
};

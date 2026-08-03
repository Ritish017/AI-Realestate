import React from 'react';
import { VideoScene } from '../../types/domain';
import { Badge } from '../ui/Badge';
import { GripVertical, Clock, Video } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TimelineSceneCardProps {
  scene: VideoScene;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

export const TimelineSceneCard: React.FC<TimelineSceneCardProps> = ({
  scene,
  index,
  isActive,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'shrink-0 w-48 glass-card rounded-2xl p-3 space-y-2 cursor-pointer transition-all border group relative',
        isActive ? 'border-amber-400 gold-glow bg-amber-500/10' : 'border-neutral-800 hover:border-neutral-700'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-500">SCENE 0{index + 1}</span>
        <GripVertical className="w-3.5 h-3.5 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="h-20 rounded-xl overflow-hidden bg-neutral-900 relative">
        <img src={scene.imageUrl} alt={scene.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-mono text-amber-400 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          <span>{scene.durationSeconds}s</span>
        </div>
      </div>

      <div className="truncate">
        <p className="text-xs font-bold text-white truncate">{scene.title}</p>
        <Badge variant="glass" size="sm" className="mt-1">{scene.cameraMotion}</Badge>
      </div>
    </div>
  );
};

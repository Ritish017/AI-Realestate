import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/Button';

export interface TimelineScrubberProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  totalDuration: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  isPlaying,
  onTogglePlay,
  currentTime,
  totalDuration,
  isMuted,
  onToggleMute,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4 border border-neutral-800">
      {/* Time Display */}
      <span className="font-mono text-xs text-amber-400">
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </span>

      {/* Playback Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onTogglePlay}>
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
        </Button>
      </div>

      {/* Scrubber Progress Bar */}
      <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden relative cursor-pointer">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Audio Mute Toggle */}
      <button
        onClick={onToggleMute}
        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

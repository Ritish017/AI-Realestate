'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Smartphone, Monitor, Square } from 'lucide-react';
import { CanvasRenderEngine } from '@/render/engine/canvasRenderEngine';
import { VideoJob, AspectRatio, BrandKit, MusicTrack } from '@/types/domain';

export interface CanvasPreviewPlayerProps {
  job: VideoJob;
  brandKit: BrandKit;
  musicTrack: MusicTrack;
  aspectRatio: AspectRatio;
  onAspectRatioChange?: (ratio: AspectRatio) => void;
}

export const CanvasPreviewPlayer: React.FC<CanvasPreviewPlayerProps> = ({
  job,
  brandKit,
  musicTrack,
  aspectRatio,
  onAspectRatioChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<CanvasRenderEngine | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);

  const hasPosterIntro = brandKit.enablePosterIntro ?? true;
  const totalScenes = hasPosterIntro ? job.scenes.length + 1 : job.scenes.length;

  useEffect(() => {
    if (!canvasRef.current) return;

    engineRef.current = new CanvasRenderEngine(canvasRef.current, {
      aspectRatio,
      listingInfo: job.listingInfo,
      brandKit,
      scenes: job.scenes,
    });

    engineRef.current.preloadImages();
    engineRef.current.renderFrame(currentSceneIndex, sceneProgress);

    return () => {
      engineRef.current?.stop();
    };
  }, [job, aspectRatio, brandKit]);

  // Animation Loop Effect
  useEffect(() => {
    if (!isPlaying) return;

    let startTime = performance.now();
    const sceneDurationMs = 4000; // 4 seconds per scene

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / sceneDurationMs);

      setSceneProgress(progress);
      engineRef.current?.renderFrame(currentSceneIndex, progress);

      if (progress >= 1) {
        startTime = now;
        setCurrentSceneIndex((prev) => {
          const next = prev + 1;
          if (next >= totalScenes) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      } else {
        requestAnimationFrame(tick);
      }
    };

    const animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentSceneIndex, totalScenes]);

  const getCanvasDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return { ratioClass: 'aspect-[9/16] max-w-[360px]' };
      case '1:1':
        return { ratioClass: 'aspect-square max-w-[460px]' };
      case '16:9':
      default:
        return { ratioClass: 'aspect-[16/9] max-w-[720px]' };
    }
  };

  const dims = getCanvasDimensions();

  return (
    <Card variant="elevated" className="p-8 space-y-6 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-lg font-bold font-serif text-white">Live AI Canvas Render Engine</h3>
        </div>

        {/* Aspect Ratio Switcher Pills */}
        <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800">
          <button
            onClick={() => onAspectRatioChange?.('9:16')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              aspectRatio === '9:16' ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Reels</span>
          </button>

          <button
            onClick={() => onAspectRatioChange?.('16:9')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              aspectRatio === '16:9' ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>16:9 HD</span>
          </button>

          <button
            onClick={() => onAspectRatioChange?.('1:1')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              aspectRatio === '1:1' ? 'bg-white text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            <span>1:1 Feed</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport Frame */}
      <div className="flex items-center justify-center py-4 bg-black/60 rounded-3xl border border-neutral-800">
        <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${dims.ratioClass}`}>
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Scrubber & Controls */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Button
          variant="gold"
          size="md"
          onClick={() => setIsPlaying(!isPlaying)}
          leftIcon={isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
        >
          {isPlaying ? 'Pause Preview' : 'Play Cinematic Reel'}
        </Button>

        <span className="text-xs font-mono text-neutral-400">
          Scene {currentSceneIndex + 1} of {totalScenes}
        </span>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </Card>
  );
};

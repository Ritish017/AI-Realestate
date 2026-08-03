'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Select } from '@/components/ui/Input';
import { VideoScene, CameraMotion } from '@/types/domain';
import { CAMERA_MOTION_SPECS } from '@/utils/promptGenerator';
import { Camera, Clock, Sliders, Copy, Check, Sparkles, MoveRight, Layers } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';

export interface TimelineInspectorProps {
  scene: VideoScene | null;
  onUpdateScene: (id: string, updates: Partial<VideoScene>) => void;
}

export const TimelineInspector: React.FC<TimelineInspectorProps> = ({ scene, onUpdateScene }) => {
  const { showSuccess } = useToastStore();
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!scene) {
    return (
      <Card variant="glass" className="p-6 text-center text-neutral-500 space-y-2 border border-neutral-800">
        <Sliders className="w-8 h-8 mx-auto text-neutral-600" />
        <p className="text-xs">Select a scene card in the timeline to inspect camera motion, timing, and Veo prompts.</p>
      </Card>
    );
  }

  const cameraOptions: Array<{ value: CameraMotion; label: string }> = [
    { value: 'Forward Dolly', label: 'Forward Dolly Push (Linear)' },
    { value: 'Slow Orbit', label: 'Slow 360° Orbit (Parallax)' },
    { value: 'Push In', label: 'Optical Push In (Depth of Field)' },
    { value: 'Crane Down', label: 'Crane Jib Descent (Overhead)' },
    { value: 'Slider Left to Right', label: 'Horizontal Slider Track' },
    { value: 'Reveal Pan', label: 'Reveal Dutch Pan' },
    { value: 'Tilt Up', label: 'Vertical Tilt Sweep' },
    { value: 'Twilight Lighting Transition', label: 'Twilight Lighting Shift' },
    { value: 'High-Altitude Flyover', label: 'Aerial Drone Flyover' },
    { value: 'Low-Angle Glide', label: 'Low-Angle Floor Glide' },
  ];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(scene.veoPrompt);
    setCopiedPrompt(true);
    showSuccess('Veo Prompt Copied', 'Google Veo 2.0 prompt text copied to clipboard.');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <Card variant="glass" className="p-6 space-y-6 border border-white/10 shadow-2xl overflow-y-auto max-h-[calc(100vh-160px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">{scene.sceneType}</Badge>
          <h3 className="text-base font-bold font-serif text-white">{scene.title}</h3>
        </div>
        <Camera className="w-5 h-5 text-amber-400" />
      </div>

      {/* Scene Title Input */}
      <Input
        label="Scene Label / Subject"
        value={scene.title}
        onChange={(e) => onUpdateScene(scene.id, { title: e.target.value })}
      />

      {/* Camera Motion Selector */}
      <Select
        label="3D Camera Trajectory"
        value={scene.cameraMotion}
        onChange={(e) => onUpdateScene(scene.id, { cameraMotion: e.target.value as CameraMotion })}
        options={cameraOptions}
      />

      {/* Trajectory Rationale Description */}
      <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
        <span className="font-bold text-amber-300 block mb-0.5">Motion Specification:</span>
        {CAMERA_MOTION_SPECS[scene.cameraMotion]?.description || 'Smooth architectural camera motion.'}
      </div>

      {/* Scene Duration Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-neutral-300">Scene Duration</span>
          <span className="text-amber-400 font-mono">{scene.durationSeconds} Seconds</span>
        </div>
        <input
          type="range"
          min={2}
          max={10}
          step={1}
          value={scene.durationSeconds}
          onChange={(e) => onUpdateScene(scene.id, { durationSeconds: Number(e.target.value) })}
          className="w-full accent-amber-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
        />
      </div>

      {/* Focal Length & Speed Settings */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-neutral-300 block mb-1">Prime Lens</label>
          <select
            value={scene.focalLength || '24mm'}
            onChange={(e) => onUpdateScene(scene.id, { focalLength: e.target.value as any })}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="16mm">16mm Ultra-Wide</option>
            <option value="24mm">24mm Wide Prime</option>
            <option value="35mm">35mm Medium Prime</option>
            <option value="50mm">50mm Portrait Prime</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-300 block mb-1">Motion Speed</label>
          <select
            value={scene.motionSpeed || 'Smooth Architectural (0.5x)'}
            onChange={(e) => onUpdateScene(scene.id, { motionSpeed: e.target.value as any })}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="Ultra-Slow (0.25x)">0.25x Ultra-Slow</option>
            <option value="Smooth Architectural (0.5x)">0.5x Architectural</option>
            <option value="Standard (1.0x)">1.0x Standard</option>
          </select>
        </div>
      </div>

      {/* Google Veo 2.0 Prompt Inspector */}
      <div className="space-y-2 pt-2 border-t border-neutral-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Veo 2.0 Prompt Text</span>
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyPrompt}
            leftIcon={copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copiedPrompt ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <textarea
          readOnly
          rows={4}
          value={scene.veoPrompt}
          className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-[11px] font-mono text-neutral-300 focus:outline-none leading-relaxed"
        />
      </div>
    </Card>
  );
};

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Upload, ArrowRight, ArrowLeft, Check, Sparkles, Folder, Cloud, Trash2 } from 'lucide-react';
import { PropertyPhoto, SceneType } from '@/types/domain';

interface CampaignStep2Props {
  photos: PropertyPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<PropertyPhoto[]>>;
  onNext: () => void;
  onBack: () => void;
}

const ROOM_TYPES: SceneType[] = [
  'Front Exterior',
  'Gourmet Kitchen',
  'Living Room',
  'Master Suite',
  'Luxury Bathroom',
  'Backyard & Pool',
  'Dining Area',
  'Foyer / Entryway',
  'Patio / Terrace',
  'Aerial / Roof',
];

export function CampaignStep2Upload({ photos, setPhotos, onNext, onBack }: CampaignStep2Props) {
  const [activeTab, setActiveTab] = useState<'computer' | 'drive' | 'dropbox'>('computer');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const newPhotos: PropertyPhoto[] = files.map((file, idx) => {
      const assignedScene = ROOM_TYPES[idx % ROOM_TYPES.length];
      return {
        id: `up-${Date.now()}-${idx}`,
        url: URL.createObjectURL(file),
        name: file.name,
        sceneType: assignedScene,
        qualityScore: 96,
        rank: photos.length + idx + 1,
        cameraMotion: idx === 0 ? 'Forward Dolly' : idx === 1 ? 'Slow Orbit' : 'Push In',
        isSelected: true,
        isRecommendedCover: idx === 0,
      };
    });

    setPhotos((prev) => [...newPhotos, ...prev]);
  };

  const handleRemove = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 2 of 7</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Upload Property Images</h2>
        </div>
        <Badge variant="emerald" size="sm">AI Scene Classifier Active</Badge>
      </div>

      {/* Cloud Source Tabs */}
      <div className="flex items-center gap-2 p-1 bg-neutral-900 rounded-2xl border border-neutral-800">
        <button
          onClick={() => setActiveTab('computer')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'computer' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>My Computer / Drag & Drop</span>
        </button>
        <button
          onClick={() => setActiveTab('drive')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'drive' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>Google Drive</span>
        </button>
        <button
          onClick={() => setActiveTab('dropbox')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'dropbox' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Dropbox</span>
        </button>
      </div>

      {/* Upload Dropzone */}
      <div className="relative border-2 border-dashed border-neutral-700 hover:border-amber-400 rounded-3xl p-10 text-center space-y-3 transition-colors bg-neutral-900/40 group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-sm font-bold text-white">Drag & Drop Property Photos Here</p>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          AI automatically detects Kitchen, Living Room, Bedroom, Exterior, Bathroom, Garage, Pool, Garden, Dining, and Office.
        </p>
      </div>

      {/* Uploaded Photos Grid */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-serif">
            Analyzed Photos ({photos.length})
          </h3>
          <span className="text-xs text-neutral-400 font-mono">
            {photos.filter((p) => p.isSelected).length} Selected for Campaign
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group"
            >
              <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <Badge variant="gold" size="sm">{photo.sceneType}</Badge>
                  <button
                    onClick={() => handleRemove(photo.id)}
                    className="p-1 rounded-lg bg-black/60 text-neutral-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-white font-mono truncate">{photo.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <Button variant="outline" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Next: Choose Video Style
        </Button>
      </div>
    </Card>
  );
}

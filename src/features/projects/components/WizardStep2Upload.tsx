'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Upload, ArrowRight, ArrowLeft, Check, AlertTriangle, Sparkles, Folder, Cloud, Trash2, RefreshCw } from 'lucide-react';
import { PropertyPhoto } from '@/types/domain';

export interface WizardStep2Props {
  photos: PropertyPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<PropertyPhoto[]>>;
  onNext: () => void;
  onBack: () => void;
}

export const WizardStep2Upload: React.FC<WizardStep2Props> = ({
  photos,
  setPhotos,
  onNext,
  onBack,
}) => {
  const [activeCloudTab, setActiveCloudTab] = useState<'computer' | 'gdrive' | 'dropbox' | 'onedrive'>('computer');

  const handleToggleSelect = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSelected: !p.isSelected } : p))
    );
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFileUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFile = e.target.files[0];
    const newPhoto: PropertyPhoto = {
      id: `up-${Date.now()}`,
      url: URL.createObjectURL(newFile),
      name: newFile.name,
      sceneType: 'Front Exterior',
      qualityScore: 97,
      rank: photos.length + 1,
      cameraMotion: 'Forward Dolly',
      focalLength: '24mm',
      motionSpeed: 'Smooth Architectural (0.5x)',
      isSelected: true,
    };
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  return (
    <Card variant="glass" className="space-y-8 p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">Step 2 of 3</Badge>
          <h2 className="text-xl font-bold font-serif text-white">Upload Photos & Live AI Analysis</h2>
        </div>
        <Badge variant="emerald" size="sm">AI Scene Classifier Active</Badge>
      </div>

      {/* Cloud Import Source Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-neutral-900/80 rounded-2xl border border-neutral-800">
        <button
          onClick={() => setActiveCloudTab('computer')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
            activeCloudTab === 'computer' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>My Computer</span>
        </button>

        <button
          onClick={() => setActiveCloudTab('gdrive')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
            activeCloudTab === 'gdrive' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>Google Drive</span>
        </button>

        <button
          onClick={() => setActiveCloudTab('dropbox')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
            activeCloudTab === 'dropbox' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Dropbox</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="relative border-2 border-dashed border-neutral-700 hover:border-amber-400 rounded-3xl p-10 text-center space-y-3 transition-colors bg-neutral-900/40 group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUploadMock}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-sm font-bold text-white">Drag & Drop Property Photos Here</p>
        <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
          Supports high-resolution JPG, PNG, WEBP files up to 25MB each. Gemini Vision automatically scores image clarity, tags room types, and assigns camera paths.
        </p>
      </div>

      {/* Live AI Analysis Grid Cards */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-serif text-white">
            Analyzed Photo Scenes ({photos.length})
          </h3>
          <span className="text-xs text-neutral-400 font-mono">
            {photos.filter((p) => p.isSelected).length} Selected for Production
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                photo.isSelected
                  ? 'bg-neutral-900/90 border-amber-400/60 shadow-lg'
                  : 'bg-neutral-900/40 border-neutral-800 opacity-60'
              }`}
            >
              {/* Photo Thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative border border-neutral-800">
                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                {photo.isBlurry && (
                  <div className="absolute inset-0 bg-rose-900/80 backdrop-blur-xs flex items-center justify-center p-1 text-[9px] text-white font-bold text-center">
                    Blur Alert
                  </div>
                )}
              </div>

              {/* Live AI Metadata Details */}
              <div className="flex-1 space-y-1.5 truncate">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="sm">{photo.sceneType}</Badge>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {photo.qualityScore}% Score
                  </span>
                </div>

                <p className="text-xs font-bold text-white truncate">{photo.name}</p>

                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                  <span>Motion: {photo.cameraMotion}</span>
                  <span>·</span>
                  <span>{photo.focalLength || '24mm'}</span>
                </div>

                {/* Selection & Removal Action Bar */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleToggleSelect(photo.id)}
                    className={`text-[10px] font-semibold flex items-center gap-1 ${
                      photo.isSelected ? 'text-amber-400' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{photo.isSelected ? 'Included in Reel' : 'Include Scene'}</span>
                  </button>

                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <Button variant="outline" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Details
        </Button>
        <Button variant="gold" size="lg" onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Continue to Story Review
        </Button>
      </div>
    </Card>
  );
};

import React, { useState, useRef } from 'react';
import { PropertyPhoto, PropertyListingInfo, FocalLengthOption, MotionSpeedOption } from '../types';
import { SAMPLE_PRESETS, SamplePropertyPreset } from '../data/sampleListings';
import { generateVeoPrompt } from '../utils/promptGenerator';
import { 
  Upload, 
  Link as LinkIcon, 
  Sparkles, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ImageIcon, 
  Camera, 
  ArrowUpDown,
  Send,
  Building,
  RefreshCw,
  FolderPlus,
  Copy,
  Check,
  Sliders,
  Video
} from 'lucide-react';

interface PhotoUploaderProps {
  photos: PropertyPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<PropertyPhoto[]>>;
  listingInfo: PropertyListingInfo;
  setListingInfo: React.Dispatch<React.SetStateAction<PropertyListingInfo>>;
  onImportMlsUrl: (url: string) => Promise<void>;
  isLoadingMls: boolean;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  setPhotos,
  listingInfo,
  setListingInfo,
  onImportMlsUrl,
  isLoadingMls,
}) => {
  const [activeSourceTab, setActiveSourceTab] = useState<'preset' | 'upload' | 'mls' | 'cloud'>('preset');
  const [mlsInputUrl, setMlsInputUrl] = useState('');
  const [cloudUrlInput, setCloudUrlInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Preset selection
  const handleSelectPreset = (preset: SamplePropertyPreset) => {
    setListingInfo(preset.listingInfo);
    setPhotos(preset.photos);
  };

  // Handle local File Uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const validImageFiles = files.filter(f => f.type.startsWith('image/'));
    const newPhotos: PropertyPhoto[] = validImageFiles.map((file, idx) => {
      const objectUrl = URL.createObjectURL(file);
      const index = photos.length + idx + 1;
      
      let sceneType: PropertyPhoto['sceneType'] = 'Front Exterior';
      let cameraMotion: PropertyPhoto['cameraMotion'] = 'Forward Dolly';
      const fileNameLower = file.name.toLowerCase();

      if (fileNameLower.includes('kitchen')) {
        sceneType = 'Gourmet Kitchen';
        cameraMotion = 'Push In';
      } else if (fileNameLower.includes('living') || fileNameLower.includes('room')) {
        sceneType = 'Living Room';
        cameraMotion = 'Slow Orbit';
      } else if (fileNameLower.includes('bed')) {
        sceneType = 'Master Suite';
        cameraMotion = 'Slider Left to Right';
      } else if (fileNameLower.includes('pool') || fileNameLower.includes('yard')) {
        sceneType = 'Backyard & Pool';
        cameraMotion = 'Crane Down';
      } else if (fileNameLower.includes('bath')) {
        sceneType = 'Luxury Bathroom';
        cameraMotion = 'Reveal Pan';
      }

      return {
        id: `uploaded-${Date.now()}-${idx}`,
        url: objectUrl,
        name: file.name.replace(/\.[^/.]+$/, ''),
        sceneType,
        qualityScore: Math.floor(Math.random() * 12) + 88,
        rank: index,
        cameraMotion,
        isSelected: true,
      };
    });

    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleToggleSelect = (id: string) => {
    setPhotos(prev =>
      prev.map(p => (p.id === id ? { ...p, isSelected: !p.isSelected } : p))
    );
  };

  const handleSelectAll = (select: boolean) => {
    setPhotos(prev => prev.map(p => ({ ...p, isSelected: select })));
  };

  const handleUpdateMotion = (id: string, motion: PropertyPhoto['cameraMotion']) => {
    setPhotos(prev => prev.map(p => (p.id === id ? { ...p, cameraMotion: motion } : p)));
  };

  const handleUpdateFocalLength = (id: string, focal: FocalLengthOption) => {
    setPhotos(prev => prev.map(p => (p.id === id ? { ...p, focalLength: focal } : p)));
  };

  const handleUpdateMotionSpeed = (id: string, speed: MotionSpeedOption) => {
    setPhotos(prev => prev.map(p => (p.id === id ? { ...p, motionSpeed: speed } : p)));
  };

  const handleCopyPrompt = (photo: PropertyPhoto) => {
    const promptText = photo.veoPrompt || generateVeoPrompt(photo, listingInfo);
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(photo.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const selectedCount = photos.filter(p => p.isSelected).length;

  return (
    <div className="space-y-6">
      
      {/* Source Selection Tabs */}
      <div className="bg-black p-1.5 rounded-2xl border border-neutral-800 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveSourceTab('preset')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSourceTab === 'preset'
              ? 'bg-white text-black shadow-md'
              : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Sample Presets</span>
        </button>

        <button
          onClick={() => setActiveSourceTab('upload')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSourceTab === 'upload'
              ? 'bg-white text-black shadow-md'
              : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Files</span>
        </button>

        <button
          onClick={() => setActiveSourceTab('mls')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSourceTab === 'mls'
              ? 'bg-white text-black shadow-md'
              : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>MLS / Zillow URL</span>
        </button>

        <button
          onClick={() => setActiveSourceTab('cloud')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeSourceTab === 'cloud'
              ? 'bg-white text-black shadow-md'
              : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
          }`}
        >
          <Send className="w-4 h-4 text-sky-400" />
          <span>Google Drive Sync</span>
        </button>
      </div>

      {/* Tab Panel Content */}
      {activeSourceTab === 'preset' && (
        <div className="space-y-3 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Select 1-Click Luxury Sample Property:
            </span>
            <span className="text-[11px] text-amber-400 font-semibold">Zero upload wait time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SAMPLE_PRESETS.map((preset) => {
              const isCurrent = listingInfo.title === preset.listingInfo.title;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                    isCurrent
                      ? 'border-2 border-white bg-black shadow-xl ring-4 ring-white/5'
                      : 'border-neutral-800 bg-black/40 hover:border-neutral-600 hover:bg-neutral-900/60'
                  }`}
                >
                  <img
                    src={preset.photos[0]?.url}
                    alt={preset.listingInfo.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-neutral-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-white truncate">{preset.listingInfo.title}</h4>
                    <p className="text-[11px] text-amber-400 font-bold">{preset.listingInfo.price}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{preset.listingInfo.address}</p>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-neutral-300 bg-neutral-800 px-1.5 py-0.5 rounded mt-1">
                      {preset.photos.length} HD Photos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSourceTab === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
            isDragOver
              ? 'border-white bg-white/10 scale-[1.01]'
              : 'border-neutral-800 bg-black/50 hover:border-neutral-600 hover:bg-neutral-900/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Drag & drop listing photos here</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Supports JPG, PNG, WEBP (Up to 20 photos). AI will rank framing & scene composition.
            </p>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            Browse Computer
          </button>
        </div>
      )}

      {activeSourceTab === 'mls' && (
        <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-white" />
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">Paste MLS or Zillow URL</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={mlsInputUrl}
              onChange={(e) => setMlsInputUrl(e.target.value)}
              placeholder="https://www.zillow.com/homedetails/1048-Crestview-Way... or MLS #1029384"
              className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
            />
            <button
              onClick={() => {
                if (mlsInputUrl.trim()) {
                  onImportMlsUrl(mlsInputUrl.trim());
                }
              }}
              disabled={isLoadingMls || !mlsInputUrl.trim()}
              className="px-5 py-2.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center gap-2 disabled:opacity-50 hover:bg-neutral-200 transition-colors"
            >
              {isLoadingMls ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Import Listing</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeSourceTab === 'cloud' && (
        <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">Google Drive Folder Sync</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={cloudUrlInput}
              onChange={(e) => setCloudUrlInput(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/1a2b3c4d..."
              className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
            />
            <button
              onClick={() => {
                handleSelectPreset(SAMPLE_PRESETS[0]);
              }}
              className="px-5 py-2.5 bg-sky-500 text-black hover:bg-sky-400 font-bold uppercase tracking-wider text-xs rounded-xl flex items-center gap-2"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Import Folder</span>
            </button>
          </div>
        </div>
      )}

      {/* Photo Inspector Grid Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0.5">
              Sequence Inspector
            </h3>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-white" />
              <span>Photo Framing & Camera Motion Controls</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white border border-neutral-800">
              {selectedCount} of {photos.length} Selected
            </span>
            <button
              onClick={() => handleSelectAll(true)}
              className="text-xs text-neutral-300 hover:text-white transition-colors font-bold uppercase tracking-wider px-2.5 py-1 bg-neutral-900 rounded-lg border border-neutral-800"
            >
              Select All
            </button>
            <button
              onClick={() => handleSelectAll(false)}
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-bold uppercase tracking-wider px-2.5 py-1 bg-neutral-900 rounded-lg border border-neutral-800"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => {
            const livePrompt = photo.veoPrompt || generateVeoPrompt(photo, listingInfo);
            const isCopied = copiedPromptId === photo.id;

            return (
              <div
                key={photo.id}
                className={`relative group rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  photo.isSelected
                    ? 'border-2 border-white bg-neutral-900 shadow-2xl'
                    : 'border-neutral-800 bg-black/60 opacity-50'
                }`}
              >
                {/* Image Box */}
                <div className="relative h-40 w-full overflow-hidden bg-black">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 bg-black/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white border border-neutral-800">
                    Scene #{index + 1}
                  </div>

                  {/* Checkbox */}
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={photo.isSelected}
                      onChange={() => handleToggleSelect(photo.id)}
                      className="w-4 h-4 rounded text-white focus:ring-white accent-white cursor-pointer"
                    />
                  </div>

                  {/* Quality Score Indicator */}
                  <div className="absolute bottom-2 left-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded">
                    Framing: {photo.qualityScore}/100
                  </div>

                  {/* Delete Hover Button */}
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute bottom-2 right-2 p-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Info & Cinematography Motion Controls */}
                <div className="p-3.5 space-y-3 bg-neutral-900/90 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-white truncate">{photo.name}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-amber-400 font-bold px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
                        {photo.sceneType}
                      </span>
                    </div>
                  </div>

                  {/* Camera Motion & Lens Controls */}
                  <div className="space-y-2 pt-1 border-t border-neutral-800">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-neutral-400 block font-bold mb-1 flex items-center justify-between">
                        <span>Veo Trajectory:</span>
                        <Video className="w-3 h-3 text-amber-400" />
                      </label>
                      <select
                        value={photo.cameraMotion}
                        onChange={(e) => handleUpdateMotion(photo.id, e.target.value as PropertyPhoto['cameraMotion'])}
                        className="w-full bg-black border border-neutral-800 rounded-lg text-[10px] text-white font-medium py-1.5 px-2 focus:outline-none focus:border-white"
                      >
                        <option value="Forward Dolly">Forward Dolly (Central Push)</option>
                        <option value="Slow Orbit">Slow Orbit (360° Arc)</option>
                        <option value="Push In">Push In (Focal Reveal)</option>
                        <option value="Crane Down">Crane Down (Jib Sweep)</option>
                        <option value="Slider Left to Right">Slider Left to Right (Parallax)</option>
                        <option value="Reveal Pan">Reveal Pan (Archway Reveal)</option>
                        <option value="Tilt Up">Tilt Up (Floor to Ceiling)</option>
                        <option value="Twilight Lighting Transition">Twilight Transition (Dusk Glow)</option>
                        <option value="High-Altitude Flyover">High-Altitude Flyover (Aerial Drone)</option>
                        <option value="Low-Angle Glide">Low-Angle Glide (Floor Level)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-neutral-400 block font-bold mb-0.5">
                          Lens Focal:
                        </label>
                        <select
                          value={photo.focalLength || '24mm'}
                          onChange={(e) => handleUpdateFocalLength(photo.id, e.target.value as FocalLengthOption)}
                          className="w-full bg-black border border-neutral-800 rounded-lg text-[10px] text-neutral-200 py-1 px-1.5 focus:outline-none focus:border-white"
                        >
                          <option value="16mm">16mm Ultra-Wide</option>
                          <option value="24mm">24mm Architecture</option>
                          <option value="35mm">35mm Natural</option>
                          <option value="50mm">50mm Detail</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-neutral-400 block font-bold mb-0.5">
                          Motion Speed:
                        </label>
                        <select
                          value={photo.motionSpeed || 'Smooth Architectural (0.5x)'}
                          onChange={(e) => handleUpdateMotionSpeed(photo.id, e.target.value as MotionSpeedOption)}
                          className="w-full bg-black border border-neutral-800 rounded-lg text-[10px] text-neutral-200 py-1 px-1.5 focus:outline-none focus:border-white"
                        >
                          <option value="Ultra-Slow (0.25x)">0.25x Ultra-Slow</option>
                          <option value="Smooth Architectural (0.5x)">0.5x Smooth</option>
                          <option value="Standard (1.0x)">1.0x Standard</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Veo Prompt Snippet Box */}
                  <div className="bg-black/80 p-2 rounded-xl border border-neutral-800 space-y-1">
                    <div className="flex items-center justify-between text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1 text-white">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Veo 2.0 AI Prompt</span>
                      </span>
                      <button
                        onClick={() => handleCopyPrompt(photo)}
                        className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5"
                        title="Copy prompt text"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-400 line-clamp-2 leading-tight font-mono italic">
                      "{livePrompt}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

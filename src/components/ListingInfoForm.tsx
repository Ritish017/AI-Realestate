import React from 'react';
import { PropertyListingInfo, AspectRatio, MusicTrack } from '../types';
import { MUSIC_TRACKS } from '../data/sampleListings';
import { Home, DollarSign, MapPin, BedDouble, Bath, Maximize2, FileText, Music, Clock, Smartphone, Monitor, Square } from 'lucide-react';

interface ListingInfoFormProps {
  listingInfo: PropertyListingInfo;
  setListingInfo: React.Dispatch<React.SetStateAction<PropertyListingInfo>>;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  selectedMusic: MusicTrack;
  setSelectedMusic: (track: MusicTrack) => void;
  durationSeconds: number;
  setDurationSeconds: (dur: number) => void;
}

export const ListingInfoForm: React.FC<ListingInfoFormProps> = ({
  listingInfo,
  setListingInfo,
  aspectRatio,
  setAspectRatio,
  selectedMusic,
  setSelectedMusic,
  durationSeconds,
  setDurationSeconds,
}) => {
  const handleChange = (field: keyof PropertyListingInfo, value: any) => {
    setListingInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-2">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0.5">
            Property Metadata
          </h3>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Home className="w-4 h-4 text-white" />
            <span>Listing Details & Video Export Settings</span>
          </h2>
        </div>
        <span className="text-[11px] text-neutral-400">Used for lower-third overlay badges & AI captions</span>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="sm:col-span-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Listing Title / Property Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={listingInfo.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. The Crestview Modern Villa"
              className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-medium"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Property Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={listingInfo.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. 1048 Crestview Way, Beverly Hills, CA"
              className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Listing Price
          </label>
          <div className="relative">
            <input
              type="text"
              value={listingInfo.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="e.g. $6,850,000"
              className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-white"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            value={listingInfo.bedrooms}
            onChange={(e) => handleChange('bedrooms', parseInt(e.target.value) || 0)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            value={listingInfo.bathrooms}
            onChange={(e) => handleChange('bathrooms', parseInt(e.target.value) || 0)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
            Square Feet
          </label>
          <input
            type="number"
            value={listingInfo.sqft}
            onChange={(e) => handleChange('sqft', parseInt(e.target.value) || 0)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Video Customization Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-neutral-800">
        
        {/* Aspect Ratio Selector */}
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
            Aspect Ratio (Format)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setAspectRatio('9:16')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                aspectRatio === '9:16'
                  ? 'border-2 border-white bg-black text-white font-bold'
                  : 'border-neutral-800 bg-black/40 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-[11px]">9:16 Reel</span>
            </button>

            <button
              type="button"
              onClick={() => setAspectRatio('16:9')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                aspectRatio === '16:9'
                  ? 'border-2 border-white bg-black text-white font-bold'
                  : 'border-neutral-800 bg-black/40 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-[11px]">16:9 Wide</span>
            </button>

            <button
              type="button"
              onClick={() => setAspectRatio('1:1')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                aspectRatio === '1:1'
                  ? 'border-2 border-white bg-black text-white font-bold'
                  : 'border-neutral-800 bg-black/40 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <Square className="w-4 h-4" />
              <span className="text-[11px]">1:1 Square</span>
            </button>
          </div>
        </div>

        {/* Video Duration Selector */}
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-white" />
            <span>Target Reel Duration</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setDurationSeconds(sec)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  durationSeconds === sec
                    ? 'border-2 border-white bg-white text-black shadow-lg'
                    : 'border-neutral-800 bg-black/40 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        {/* Music Track Selector */}
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2 flex items-center gap-1">
            <Music className="w-3.5 h-3.5 text-white" />
            <span>AI Music Soundtrack</span>
          </label>
          <select
            value={selectedMusic.id}
            onChange={(e) => {
              const found = MUSIC_TRACKS.find((t) => t.id === e.target.value);
              if (found) setSelectedMusic(found);
            }}
            className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white font-medium focus:outline-none focus:border-white"
          >
            {MUSIC_TRACKS.map((track) => (
              <option key={track.id} value={track.id}>
                🎵 {track.title} ({track.mood})
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

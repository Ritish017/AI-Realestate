import React, { useState, useRef } from 'react';
import { BrandKit } from '../types';
import { Palette, ShieldCheck, Check, Upload, RefreshCw, Sparkles, Image as ImageIcon, Layout, Tag } from 'lucide-react';

interface BrandKitModalProps {
  brandKit: BrandKit;
  setBrandKit: React.Dispatch<React.SetStateAction<BrandKit>>;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ brandKit, setBrandKit }) => {
  const [previewTab, setPreviewTab] = useState<'poster' | 'overlay'>('poster');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof BrandKit, value: any) => {
    setBrandKit((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          handleChange('agentPhotoUrl', uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">
          Identity, Posters & Studio Branding
        </h3>
        <h2 className="text-xl font-bold text-white font-serif italic">
          Agent Brand Kit & Opening Poster Studio
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Create high-impact opening poster cover cards featuring your Realtor profile image, brokerage logo, and custom video overlays.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Settings Form */}
        <div className="bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 space-y-6 shadow-xl">
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <span>Agent & Brokerage Identity</span>
            </h3>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Agent Full Name</label>
              <input
                type="text"
                value={brandKit.agentName}
                onChange={(e) => handleChange('agentName', e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-serif italic text-base"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Agent Title / Tagline</label>
              <input
                type="text"
                value={brandKit.agentTitle}
                onChange={(e) => handleChange('agentTitle', e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={brandKit.agentPhone}
                  onChange={(e) => handleChange('agentPhone', e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Brokerage Name</label>
                <input
                  type="text"
                  value={brandKit.brokerageName}
                  onChange={(e) => handleChange('brokerageName', e.target.value)}
                  className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Agent Photo Upload & URL */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">Agent Poster Photo / Headshot</label>
              <div className="flex items-center gap-3">
                <img
                  src={brandKit.agentPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                  alt={brandKit.agentName}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-white shrink-0 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Agent Headshot</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <input
                    type="text"
                    value={brandKit.agentPhotoUrl}
                    onChange={(e) => handleChange('agentPhotoUrl', e.target.value)}
                    placeholder="Or paste image URL..."
                    className="w-full bg-black border border-neutral-800 rounded-lg px-2.5 py-1 text-[10px] text-neutral-300 font-mono focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Opening Poster Cover Intro Settings */}
          <div className="border-t border-neutral-800 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Realtor Poster Cover Intro Card</span>
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enablePosterIntroCheck"
                  checked={brandKit.enablePosterIntro ?? true}
                  onChange={(e) => handleChange('enablePosterIntro', e.target.checked)}
                  className="w-4 h-4 text-white rounded bg-black border-neutral-800 accent-white cursor-pointer"
                />
                <label htmlFor="enablePosterIntroCheck" className="text-xs font-bold text-white cursor-pointer">
                  Enable
                </label>
              </div>
            </div>

            {(brandKit.enablePosterIntro ?? true) && (
              <div className="space-y-3 bg-black/60 p-4 rounded-xl border border-neutral-800">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Poster Slogan / Headline Banner
                  </label>
                  <div className="flex gap-1.5 overflow-x-auto pb-2">
                    {['JUST LISTED', 'EXCLUSIVE OFFERING', 'FOR SALE', 'OPEN HOUSE THIS SUNDAY', 'PRICE IMPROVEMENT'].map((headline) => (
                      <button
                        key={headline}
                        type="button"
                        onClick={() => handleChange('posterHeadline', headline)}
                        className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                          brandKit.posterHeadline === headline
                            ? 'bg-white text-black shadow'
                            : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                        }`}
                      >
                        {headline}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={brandKit.posterHeadline || 'JUST LISTED'}
                    onChange={(e) => handleChange('posterHeadline', e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-bold tracking-widest uppercase focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Poster Aesthetic Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'editorial', label: 'Editorial Luxe' },
                      { id: 'glassmorphism', label: 'Glassmorphism' },
                      { id: 'modern_gold', label: 'Gold Badge' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => handleChange('posterStyle', style.id)}
                        className={`py-2 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center border transition-all ${
                          (brandKit.posterStyle || 'editorial') === style.id
                            ? 'bg-white text-black border-white shadow-md'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-neutral-800 pt-3">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Verification Watermark Banner</label>
            <input
              type="text"
              value={brandKit.watermarkText}
              onChange={(e) => handleChange('watermarkText', e.target.value)}
              className="w-full bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Live Interactive Preview */}
        <div className="bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">Live Studio Preview</h3>
              
              <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setPreviewTab('poster')}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    previewTab === 'poster' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Cover Poster Card
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('overlay')}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    previewTab === 'overlay' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Lower Third Overlay
                </button>
              </div>
            </div>

            {/* Simulated Video Frame */}
            <div className="relative h-80 w-full bg-black rounded-2xl overflow-hidden border border-neutral-800 p-5 flex flex-col justify-between shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                alt="Preview Property"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

              {/* Watermark Top Right */}
              {brandKit.showWatermark && (
                <div className="relative self-end bg-black/90 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-800 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg z-10">
                  {brandKit.watermarkText || 'VERIFIED PROPERTY • UNMODIFIED'}
                </div>
              )}

              {/* COVER POSTER PREVIEW */}
              {previewTab === 'poster' ? (
                <div className="relative z-10 my-auto bg-black/85 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="px-2.5 py-0.5 bg-white text-black text-[9px] font-bold tracking-[0.2em] uppercase rounded-full">
                      {brandKit.posterHeadline || 'JUST LISTED'}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {brandKit.brokerageName}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={brandKit.agentPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                      alt={brandKit.agentName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shrink-0 shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                        {brandKit.posterSubtitle || 'PRESENTED EXCLUSIVELY BY'}
                      </p>
                      <h4 className="font-serif text-lg font-bold text-white truncate">{brandKit.agentName || 'Elena Rostova'}</h4>
                      <p className="text-xs text-neutral-300 truncate">{brandKit.agentTitle}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">{brandKit.agentPhone}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-white block font-serif italic">Bel Air Modern Sanctuary</strong>
                      <span className="text-neutral-400 text-[10px]">$6,850,000 • 5 Beds • 6 Baths</span>
                    </div>
                    <span className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md">
                      Intro Poster
                    </span>
                  </div>
                </div>
              ) : (
                /* LOWER THIRD OVERLAY PREVIEW */
                <div className="relative z-10 bg-black/90 backdrop-blur-md p-3.5 rounded-xl border border-neutral-800 flex items-center space-x-3 shadow-2xl mt-auto">
                  <img
                    src={brandKit.agentPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                    alt={brandKit.agentName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-base font-bold text-white truncate">{brandKit.agentName || 'Elena Rostova'}</h4>
                    <p className="text-xs text-neutral-300 font-semibold truncate">{brandKit.agentTitle}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{brandKit.agentPhone} • {brandKit.brokerageName}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black/60 border border-neutral-800 p-3.5 rounded-xl text-neutral-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Realtor poster cover card will play at the start of every generated video reel.</span>
          </div>
        </div>

      </div>
    </div>
  );
};


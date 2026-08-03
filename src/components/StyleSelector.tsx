import React from 'react';
import { VIDEO_STYLES } from '../data/sampleListings';
import { VideoStyleId, VideoStyleOption } from '../types';
import { Check, Building2, Plane, MoonStar, Sparkles, ShieldAlert } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: VideoStyleId;
  onSelectStyle: (styleId: VideoStyleId) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Plane':
        return <Plane className="w-5 h-5" />;
      case 'MoonStar':
        return <MoonStar className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">
            Production Aesthetics
          </h3>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-serif italic">
            Select Premium Style
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-3.5 py-1.5 rounded-full">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px]"><strong>100% Faithful:</strong> Preserves exact room dimensions & architecture</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VIDEO_STYLES.map((styleOption: VideoStyleOption) => {
          const isSelected = selectedStyle === styleOption.id;
          return (
            <div
              key={styleOption.id}
              id={`style-card-${styleOption.id}`}
              onClick={() => onSelectStyle(styleOption.id)}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-2 border-white ring-8 ring-white/5 bg-neutral-900 shadow-2xl shadow-white/5'
                  : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-500 hover:bg-neutral-900/70'
              }`}
            >
              {/* Preview Image & Gradient Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                <img
                  src={styleOption.previewImage}
                  alt={styleOption.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-orange-950/60 via-neutral-950/70 to-transparent' : 'from-neutral-950 via-neutral-950/50 to-transparent'}`} />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-[9px] px-2.5 py-1 rounded font-bold uppercase tracking-wider ${isSelected ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/30' : 'bg-neutral-900/90 text-neutral-300 border border-neutral-700'}`}>
                    {styleOption.badge}
                  </span>
                </div>

                {/* Selected Check Circle Indicator */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/30 scale-105'
                        : 'bg-neutral-900/80 text-neutral-500 border border-neutral-700 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Card Title Header on Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="font-serif text-2xl italic text-white mb-0.5 drop-shadow-md">
                    {styleOption.title}
                  </h4>
                  <p className="text-[11px] text-neutral-300 font-medium">{styleOption.tagline}</p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-neutral-300 leading-relaxed">{styleOption.description}</p>

                {/* Recommended Photo Types */}
                <div className="bg-black/60 p-3 rounded-xl border border-neutral-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block">
                    Ideal Input Photos:
                  </span>
                  <p className="text-xs text-white font-medium">{styleOption.recommendedPhotoTypes}</p>
                </div>

                {/* Bullet Features */}
                <ul className="space-y-2 pt-1 border-t border-neutral-800/80">
                  {styleOption.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start text-xs text-neutral-300 gap-2">
                      <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStyle(styleOption.id);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Selected Aesthetic</span>
                    </>
                  ) : (
                    <span>Use {styleOption.title}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

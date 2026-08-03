import React, { useState } from 'react';
import { 
  PropertyListingInfo, 
  PropertyPhoto, 
  VideoStyleId, 
  AspectRatio, 
  MusicTrack, 
  BrandKit, 
  VideoJob 
} from './types';
import { SAMPLE_PRESETS, DEFAULT_BRAND_KIT, MUSIC_TRACKS } from './data/sampleListings';
import { generateVeoPrompt } from './utils/promptGenerator';
import { Header } from './components/Header';
import { StyleSelector } from './components/StyleSelector';
import { PhotoUploader } from './components/PhotoUploader';
import { ListingInfoForm } from './components/ListingInfoForm';
import { VideoStudioPlayer } from './components/VideoStudioPlayer';
import { ProjectsLibrary } from './components/ProjectsLibrary';
import { BrandKitModal } from './components/BrandKitModal';
import { TelegramBotSim } from './components/TelegramBotSim';
import { PricingModal } from './components/PricingModal';
import { Video, Sparkles, Download, Layers, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'projects' | 'brand' | 'telegram' | 'pricing'>('studio');

  // Initial State from Sample Preset 1
  const initialPreset = SAMPLE_PRESETS[0];
  const [listingInfo, setListingInfo] = useState<PropertyListingInfo>(initialPreset.listingInfo);
  const [photos, setPhotos] = useState<PropertyPhoto[]>(initialPreset.photos);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyleId>('tour');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack>(MUSIC_TRACKS[0]);
  const [durationSeconds, setDurationSeconds] = useState<number>(30);
  const [brandKit, setBrandKit] = useState<BrandKit>(DEFAULT_BRAND_KIT);

  const [isLoadingMls, setIsLoadingMls] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial Saved Projects List
  const [projects, setProjects] = useState<VideoJob[]>([
    {
      id: 'job-sample-1',
      title: 'The Crestview Modern Villa',
      listingInfo: SAMPLE_PRESETS[0].listingInfo,
      style: 'tour',
      aspectRatio: '9:16',
      duration: 30,
      status: 'completed',
      progress: 100,
      currentStepMessage: 'Render complete!',
      scenes: SAMPLE_PRESETS[0].photos.map((p) => ({
        id: p.id,
        photoId: p.id,
        imageUrl: p.url,
        title: p.name,
        sceneType: p.sceneType,
        cameraMotion: p.cameraMotion,
        durationSeconds: 5,
        veoPrompt: `Cinematic ${p.cameraMotion} camera trajectory of ${p.sceneType}, preserving property fidelity`,
      })),
      musicTrack: MUSIC_TRACKS[0],
      brandKit: DEFAULT_BRAND_KIT,
      captions: {
        instagram: `✨ JUST LISTED! The Crestview Modern Villa in Beverly Hills ($6,850,000).\n\n🏡 5 Beds | 6 Baths | 6,420 SF\n\nDM for private showings! #BeverlyHillsRealEstate #LuxuryListing #PropertyTour`,
        facebook: `🏡 NEW LISTING: The Crestview Modern Villa ($6,850,000) - Beverly Hills CA. Schedule your tour today!`,
        linkedIn: `Proud to present 1048 Crestview Way, Beverly Hills. Contact our team for viewings.`,
        x: `🔥 NEW LISTING! The Crestview Modern Villa | $6,850,000 | 5 Bed 6 Bath | Beverly Hills 🏡`,
      },
      createdAt: 'Today, 10:15 AM',
      viewsCount: 384,
      downloadsCount: 42,
    },
    {
      id: 'job-sample-2',
      title: 'Aspen Timber Ridge Lodge',
      listingInfo: SAMPLE_PRESETS[1].listingInfo,
      style: 'drone',
      aspectRatio: '16:9',
      duration: 30,
      status: 'completed',
      progress: 100,
      currentStepMessage: 'Render complete!',
      scenes: SAMPLE_PRESETS[1].photos.map((p) => ({
        id: p.id,
        photoId: p.id,
        imageUrl: p.url,
        title: p.name,
        sceneType: p.sceneType,
        cameraMotion: p.cameraMotion,
        durationSeconds: 5,
        veoPrompt: `Aerial drone orbit of ${p.sceneType}`,
      })),
      musicTrack: MUSIC_TRACKS[1],
      brandKit: DEFAULT_BRAND_KIT,
      createdAt: 'Yesterday, 4:20 PM',
      viewsCount: 192,
      downloadsCount: 18,
    },
  ]);

  const [currentJob, setCurrentJob] = useState<VideoJob | null>(projects[0]);

  // Handle Dynamic MLS / Zillow URL Import
  const handleImportMlsUrl = async (url: string) => {
    setIsLoadingMls(true);
    try {
      const response = await fetch('/api/import-mls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.listing) setListingInfo(data.listing);
        if (data.photos) setPhotos(data.photos);
      }
    } catch (e) {
      console.warn('MLS import fallback applied');
    } finally {
      setIsLoadingMls(false);
    }
  };

  // Generate Video Pipeline
  const handleGenerateVideo = async () => {
    setIsGenerating(true);

    const selectedPhotos = photos.filter((p) => p.isSelected);
    const activePhotos = selectedPhotos.length > 0 ? selectedPhotos : photos;

    const newJob: VideoJob = {
      id: `job-${Date.now()}`,
      title: listingInfo.title || 'Luxury Estate Video',
      listingInfo,
      style: selectedStyle,
      aspectRatio,
      duration: durationSeconds,
      status: 'analyzing',
      progress: 15,
      currentStepMessage: 'Gemini Vision analyzing photo framing & ranking best scenes...',
      scenes: activePhotos.map((p) => ({
        id: p.id,
        photoId: p.id,
        imageUrl: selectedStyle === 'twilight' && p.twilightUrl ? p.twilightUrl : p.url,
        title: p.name,
        sceneType: p.sceneType,
        cameraMotion: p.cameraMotion,
        focalLength: p.focalLength || '24mm',
        motionSpeed: p.motionSpeed || 'Smooth Architectural (0.5x)',
        durationSeconds: 5,
        veoPrompt: p.veoPrompt || generateVeoPrompt(p, listingInfo, selectedStyle),
      })),
      musicTrack: selectedMusic,
      brandKit,
      createdAt: 'Just now',
    };

    setCurrentJob(newJob);

    // Call Backend for Gemini Analysis
    try {
      const res = await fetch('/api/analyze-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photos: activePhotos,
          listingInfo,
          videoStyle: selectedStyle,
        }),
      });
      const data = await res.json();
      if (data.captions) {
        newJob.captions = data.captions;
      }
    } catch (e) {
      console.warn('Gemini backend fallback ready');
    }

    // Step 2: Veo Motion Generation
    setTimeout(() => {
      setCurrentJob((prev) =>
        prev
          ? {
              ...prev,
              progress: 45,
              currentStepMessage: 'Google Veo generating 3D camera trajectory paths from reference photos...',
            }
          : null
      );
    }, 1200);

    // Step 3: Frame Assembly & Audio Layering
    setTimeout(() => {
      setCurrentJob((prev) =>
        prev
          ? {
              ...prev,
              progress: 75,
              currentStepMessage: 'Applying lower-third agent brand kit & syncing AI background audio track...',
            }
          : null
      );
    }, 2400);

    // Step 4: Finalize & Ready
    setTimeout(() => {
      const completedJob: VideoJob = {
        ...newJob,
        status: 'completed',
        progress: 100,
        currentStepMessage: 'Video rendering complete! Ready for MP4 download.',
      };

      setCurrentJob(completedJob);
      setProjects((prev) => [completedJob, ...prev]);
      setIsGenerating(false);

      // Scroll smoothly to Player
      const playerElement = document.getElementById('studio-player-container');
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3600);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-white selection:text-black">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectsCount={projects.length}
      />

      {/* Main Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: STUDIO WORKSPACE */}
        {activeTab === 'studio' && (
          <div className="space-y-8">
            
            {/* Top Hero Banner */}
            <div className="bg-neutral-900/90 p-8 rounded-3xl border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-black text-neutral-300 border border-neutral-800 text-[10px] font-bold rounded-full uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Veo & Gemini Powered</span>
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
                  Transform Listing Photos Into Cinematic Real Estate Videos
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Upload property photos or paste an MLS URL. Select from 3 premium cinematic styles. Our AI animates your exact property with 100% architectural fidelity—never hallucinating fake rooms or furniture.
                </p>
              </div>

              {/* Quick Call-to-Action Generate Button */}
              <div className="shrink-0 relative z-10">
                <button
                  id="generate-video-hero-btn"
                  onClick={handleGenerateVideo}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider text-xs rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin text-amber-500" />
                      <span>Rendering Video Studio...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5 fill-black" />
                      <span>Generate AI Video Reel</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 1: Choose 1 of 3 Video Styles */}
            <section className="bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 space-y-4 shadow-xl">
              <StyleSelector
                selectedStyle={selectedStyle}
                onSelectStyle={(style) => setSelectedStyle(style)}
              />
            </section>

            {/* Step 2: Photo Upload & AI Inspector */}
            <section className="bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 space-y-4 shadow-xl">
              <PhotoUploader
                photos={photos}
                setPhotos={setPhotos}
                listingInfo={listingInfo}
                setListingInfo={setListingInfo}
                onImportMlsUrl={handleImportMlsUrl}
                isLoadingMls={isLoadingMls}
              />
            </section>

            {/* Step 3: Listing Details & Export Settings */}
            <section className="bg-neutral-900/80 p-8 rounded-3xl border border-neutral-800 space-y-4 shadow-xl">
              <ListingInfoForm
                listingInfo={listingInfo}
                setListingInfo={setListingInfo}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                selectedMusic={selectedMusic}
                setSelectedMusic={setSelectedMusic}
                durationSeconds={durationSeconds}
                setDurationSeconds={setDurationSeconds}
              />
            </section>

            {/* Step 4: Real-time Video Studio Canvas & Preview Player */}
            <section id="studio-player-container" className="bg-neutral-900/90 p-8 rounded-3xl border border-neutral-800 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h2 className="text-xl font-bold font-serif italic text-white">Live AI Production Studio</h2>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest bg-black border border-neutral-800 px-3 py-1 rounded-full">
                  HTML5 Canvas Engine
                </span>
              </div>

              <VideoStudioPlayer
                job={currentJob}
                photos={photos}
                brandKit={brandKit}
                musicTrack={selectedMusic}
                aspectRatio={aspectRatio}
                onGenerateNew={handleGenerateVideo}
                isGenerating={isGenerating}
              />
            </section>

          </div>
        )}

        {/* TAB 2: PROJECTS LIBRARY */}
        {activeTab === 'projects' && (
          <ProjectsLibrary
            projects={projects}
            onSelectProject={(job) => {
              setCurrentJob(job);
              setActiveTab('studio');
            }}
            onDeleteProject={(id) => {
              setProjects((prev) => prev.filter((p) => p.id !== id));
            }}
          />
        )}

        {/* TAB 3: BRAND KIT */}
        {activeTab === 'brand' && (
          <BrandKitModal brandKit={brandKit} setBrandKit={setBrandKit} />
        )}

        {/* TAB 4: TELEGRAM BOT SIMULATOR */}
        {activeTab === 'telegram' && <TelegramBotSim />}

        {/* TAB 5: PRICING PLANS */}
        {activeTab === 'pricing' && <PricingModal />}

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 text-center text-xs text-neutral-400">
        <p>© 2026 AI Real Estate Video Studio. Powered by Google Gemini Vision & Veo.</p>
      </footer>

    </div>
  );
}

import { create } from 'zustand';
import { VideoJob, MarketingGoal, HeyGenConfig, VoiceStudioConfig, PIPLayoutConfig } from '../types/domain';
import { SAMPLE_PRESETS, DEFAULT_BRAND_KIT, MUSIC_TRACKS } from '../data/sampleListings';
import { MultiAIOrchestrator } from '../ai/orchestrator/multiAIOrchestrator';

interface ProjectStoreState {
  projects: VideoJob[];
  currentProject: VideoJob | null;
  isLoading: boolean;
  setCurrentProject: (project: VideoJob | null) => void;
  addProject: (project: VideoJob) => void;
  updateProject: (id: string, updates: Partial<VideoJob>) => void;
  deleteProject: (id: string) => void;
  setMarketingGoal: (goal: MarketingGoal) => Promise<void>;
  applyDirectorsCut: (recommendationId: string) => void;
  setHeyGenConfig: (config: Partial<HeyGenConfig>) => void;
  setVoiceConfig: (config: Partial<VoiceStudioConfig>) => void;
  setPIPConfig: (config: Partial<PIPLayoutConfig>) => void;
  runAgencyPipeline: (goal?: MarketingGoal) => Promise<void>;
}

const INITIAL_PROJECTS: VideoJob[] = [
  {
    id: 'job-sample-1',
    title: 'The Crestview Modern Villa',
    listingInfo: SAMPLE_PRESETS[0].listingInfo,
    style: 'tour',
    marketingGoal: 'luxury_buyers',
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
      reasoning: 'Architectural Feature Scene',
    })),
    musicTrack: MUSIC_TRACKS[0],
    brandKit: DEFAULT_BRAND_KIT,
    propertyIntelligence: {
      luxuryScore: 98,
      photographyScore: 94,
      marketingScore: 96,
      videoPotential: 97,
      buyerAppeal: 95,
      missingImages: ['Twilight Sunset Exterior', 'High-Altitude Aerial Drone Sweep'],
      suggestedReshoots: ['Kitchen: Shoot during morning sunlight for reduced reflections.'],
      suggestedTwilightImages: ['Front Exterior Facade at dusk with warm sconce lighting.'],
      suggestedDroneShots: ['45m 360° Property Perimeter Sweep.'],
      suggestedImprovements: ['Enable Glassmorphism PIP card overlay on foyer transition.'],
      aiExecutiveSummary: 'Exceptional Beverly Hills architectural estate with prime luxury appeal.',
    },
    directorsCut: [
      {
        id: 'cut-1',
        title: 'Move Gourmet Kitchen to Scene 2',
        description: 'Placing kitchen after foyer increases viewer retention by 24%.',
        actionType: 'reorder',
        impact: 'High',
      },
      {
        id: 'cut-2',
        title: 'Switch Opening to Twilight Transition',
        description: 'Twilight openings increase reel watch completion from 62% to 89%.',
        actionType: 'style',
        impact: 'High',
      },
    ],
    heyGenConfig: {
      enabled: true,
      avatarStyle: 'luxury',
      introDuration: 7,
      scriptIntro: 'Welcome to The Crestview Modern Villa in Beverly Hills. Presenting this architectural masterpiece.',
      scriptOutro: 'Contact Ritish Agent today for private viewings.',
    },
    voiceConfig: {
      enabled: true,
      voiceId: 'luxury_female',
      voiceName: 'Luxury Female (Rachel)',
      narrationScript: 'Welcome to The Crestview Modern Villa. Offered at $6,850,000 in Beverly Hills.',
      syncDurationSeconds: 30,
    },
    pipConfig: {
      enabled: true,
      style: 'glass_card',
      scalePercentage: 25,
    },
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
    marketingGoal: 'sell_quickly',
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
];

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
  projects: INITIAL_PROJECTS,
  currentProject: INITIAL_PROJECTS[0],
  isLoading: false,

  setCurrentProject: (project) => set({ currentProject: project }),

  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      currentProject: state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject,
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject,
    })),

  setMarketingGoal: async (goal) => {
    const current = get().currentProject;
    if (!current) return;

    set({ isLoading: true });
    const orchestrator = new MultiAIOrchestrator(current);
    const { updatedJob } = await orchestrator.executeAgencyPipeline(goal);
    get().updateProject(current.id, updatedJob);
    set({ isLoading: false });
  },

  applyDirectorsCut: (recommendationId) => {
    const current = get().currentProject;
    if (!current || !current.directorsCut) return;

    const remaining = current.directorsCut.filter((rec) => rec.id !== recommendationId);
    get().updateProject(current.id, { directorsCut: remaining });
  },

  setHeyGenConfig: (config) => {
    const current = get().currentProject;
    if (!current) return;

    get().updateProject(current.id, {
      heyGenConfig: {
        enabled: true,
        avatarStyle: 'luxury',
        introDuration: 7,
        scriptIntro: 'Welcome to this architectural home.',
        scriptOutro: 'Contact us for showings.',
        ...current.heyGenConfig,
        ...config,
      },
    });
  },

  setVoiceConfig: (config) => {
    const current = get().currentProject;
    if (!current) return;

    get().updateProject(current.id, {
      voiceConfig: {
        enabled: true,
        voiceId: 'luxury_female',
        voiceName: 'Luxury Female (Rachel)',
        narrationScript: 'Welcome to this luxury residence.',
        syncDurationSeconds: current.duration,
        ...current.voiceConfig,
        ...config,
      },
    });
  },

  setPIPConfig: (config) => {
    const current = get().currentProject;
    if (!current) return;

    get().updateProject(current.id, {
      pipConfig: {
        enabled: true,
        style: 'glass_card',
        scalePercentage: 25,
        ...current.pipConfig,
        ...config,
      },
    });
  },

  runAgencyPipeline: async (goal) => {
    const current = get().currentProject;
    if (!current) return;

    set({ isLoading: true });
    const selectedGoal = goal || current.marketingGoal || 'sell_quickly';
    const orchestrator = new MultiAIOrchestrator(current);
    const { updatedJob } = await orchestrator.executeAgencyPipeline(selectedGoal);
    get().updateProject(current.id, updatedJob);
    set({ isLoading: false });
  },
}));

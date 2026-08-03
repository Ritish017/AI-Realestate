import { create } from 'zustand';
import { VideoJob } from '../types/domain';
import { SAMPLE_PRESETS, DEFAULT_BRAND_KIT, MUSIC_TRACKS } from '../data/sampleListings';

interface ProjectStoreState {
  projects: VideoJob[];
  currentProject: VideoJob | null;
  isLoading: boolean;
  setCurrentProject: (project: VideoJob | null) => void;
  addProject: (project: VideoJob) => void;
  updateProject: (id: string, updates: Partial<VideoJob>) => void;
  deleteProject: (id: string) => void;
}

const INITIAL_PROJECTS: VideoJob[] = [
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
];

export const useProjectStore = create<ProjectStoreState>((set) => ({
  projects: INITIAL_PROJECTS,
  currentProject: INITIAL_PROJECTS[0],
  isLoading: false,

  setCurrentProject: (project) => set({ currentProject: project }),

  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),

  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    currentProject: state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject,
  })),

  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id),
    currentProject: state.currentProject?.id === id ? null : state.currentProject,
  })),
}));

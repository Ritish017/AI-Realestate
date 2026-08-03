import { create } from 'zustand';
import { VideoScene } from '../types/domain';

interface TimelineStoreState {
  scenes: VideoScene[];
  activeSceneIndex: number;
  isPlaying: boolean;
  currentTime: number; // seconds
  setScenes: (scenes: VideoScene[]) => void;
  setActiveSceneIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  updateScene: (id: string, updates: Partial<VideoScene>) => void;
  reorderScenes: (startIndex: number, endIndex: number) => void;
}

export const useTimelineStore = create<TimelineStoreState>((set) => ({
  scenes: [],
  activeSceneIndex: 0,
  isPlaying: false,
  currentTime: 0,

  setScenes: (scenes) => set({ scenes }),
  setActiveSceneIndex: (index) => set({ activeSceneIndex: index }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),

  updateScene: (id, updates) => set((state) => ({
    scenes: state.scenes.map((s) => (s.id === id ? { ...s, ...updates } : s)),
  })),

  reorderScenes: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.scenes);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { scenes: result };
  }),
}));

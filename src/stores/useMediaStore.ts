import { create } from 'zustand';
import { PropertyPhoto } from '../types/domain';
import { SAMPLE_PRESETS } from '../data/sampleListings';

interface MediaStoreState {
  photos: PropertyPhoto[];
  selectedPhotoIds: string[];
  setPhotos: (photos: PropertyPhoto[]) => void;
  addPhoto: (photo: PropertyPhoto) => void;
  togglePhotoSelection: (id: string) => void;
  updatePhoto: (id: string, updates: Partial<PropertyPhoto>) => void;
  removePhoto: (id: string) => void;
}

export const useMediaStore = create<MediaStoreState>((set) => ({
  photos: SAMPLE_PRESETS[0].photos,
  selectedPhotoIds: SAMPLE_PRESETS[0].photos.filter((p) => p.isSelected).map((p) => p.id),

  setPhotos: (photos) => set({
    photos,
    selectedPhotoIds: photos.filter((p) => p.isSelected).map((p) => p.id),
  }),

  addPhoto: (photo) => set((state) => ({
    photos: [photo, ...state.photos],
    selectedPhotoIds: photo.isSelected ? [photo.id, ...state.selectedPhotoIds] : state.selectedPhotoIds,
  })),

  togglePhotoSelection: (id) => set((state) => {
    const updatedPhotos = state.photos.map((p) => (p.id === id ? { ...p, isSelected: !p.isSelected } : p));
    return {
      photos: updatedPhotos,
      selectedPhotoIds: updatedPhotos.filter((p) => p.isSelected).map((p) => p.id),
    };
  }),

  updatePhoto: (id, updates) => set((state) => ({
    photos: state.photos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
  })),

  removePhoto: (id) => set((state) => ({
    photos: state.photos.filter((p) => p.id !== id),
    selectedPhotoIds: state.selectedPhotoIds.filter((pId) => pId !== id),
  })),
}));

import { create } from 'zustand';
import { BrandKit } from '../types/domain';
import { DEFAULT_BRAND_KIT } from '../data/sampleListings';

interface BrandStoreState {
  brandKit: BrandKit;
  updateBrandKit: (updates: Partial<BrandKit>) => void;
  resetBrandKit: () => void;
}

export const useBrandStore = create<BrandStoreState>((set) => ({
  brandKit: DEFAULT_BRAND_KIT,

  updateBrandKit: (updates) => set((state) => ({
    brandKit: { ...state.brandKit, ...updates },
  })),

  resetBrandKit: () => set({ brandKit: DEFAULT_BRAND_KIT }),
}));

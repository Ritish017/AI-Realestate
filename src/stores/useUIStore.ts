import { create } from 'zustand';

interface UIStoreState {
  isSidebarCollapsed: boolean;
  isCommandPaletteOpen: boolean;
  activeModal: { type: string | null; data?: any } | null;
  activeDrawer: { type: string | null; data?: any } | null;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
  openDrawer: (type: string, data?: any) => void;
  closeDrawer: () => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  isSidebarCollapsed: false,
  isCommandPaletteOpen: false,
  activeModal: null,
  activeDrawer: null,

  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  openModal: (type, data) => set({ activeModal: { type, data } }),
  closeModal: () => set({ activeModal: null }),

  openDrawer: (type, data) => set({ activeDrawer: { type, data } }),
  closeDrawer: () => set({ activeDrawer: null }),
}));

import { create } from 'zustand';
import { ToastMessage, ToastType } from '../types/ui';

interface ToastStoreState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  showSuccess: (title: string, description?: string) => void;
  showError: (title: string, description?: string) => void;
  showWarning: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

export const useToastStore = create<ToastStoreState>((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, durationMs: 4000, ...toast };
    
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      get().removeToast(id);
    }, newToast.durationMs);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  showSuccess: (title, description) => get().addToast({ type: 'success', title, description }),
  showError: (title, description) => get().addToast({ type: 'error', title, description }),
  showWarning: (title, description) => get().addToast({ type: 'warning', title, description }),
  showInfo: (title, description) => get().addToast({ type: 'info', title, description }),
}));

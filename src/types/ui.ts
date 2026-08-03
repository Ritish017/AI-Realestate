export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  durationMs?: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badgeCount?: number;
  isExternal?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: any;
}

export interface DrawerState {
  isOpen: boolean;
  type: string | null;
  data?: any;
}

export interface CommandItem {
  id: string;
  label: string;
  category: 'Actions' | 'Navigation' | 'Projects' | 'Templates' | 'Settings';
  iconName: string;
  action: () => void;
  shortcut?: string;
}

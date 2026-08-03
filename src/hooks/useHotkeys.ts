import { useEffect } from 'react';

export function useHotkeys(keyCombo: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMetaOrCtrl = event.metaKey || event.ctrlKey;

      if (keyCombo === 'mod+k' && isMetaOrCtrl && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        callback();
      }

      if (keyCombo === 'escape' && event.key === 'Escape') {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCombo, callback]);
}

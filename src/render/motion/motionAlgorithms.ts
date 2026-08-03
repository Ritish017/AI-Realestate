import { CameraMotion } from '@/types/domain';

export interface RenderTransform {
  scale: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
}

/**
 * Calculates 60fps frame-accurate scale, offset, and opacity transformations
 * based on camera motion trajectory and scene completion progress (0 to 1).
 */
export function calculateMotionTransform(
  motion: CameraMotion,
  progress: number,
  canvasWidth: number,
  canvasHeight: number
): RenderTransform {
  const p = Math.max(0, Math.min(1, progress));

  switch (motion) {
    case 'Forward Dolly':
      return {
        scale: 1.0 + 0.18 * p,
        offsetX: 0,
        offsetY: 0,
        opacity: 1.0,
      };

    case 'Slow Orbit':
      return {
        scale: 1.15,
        offsetX: Math.sin(p * Math.PI - Math.PI / 2) * 0.08 * canvasWidth,
        offsetY: 0,
        opacity: 1.0,
      };

    case 'Push In':
      return {
        scale: 1.0 + 0.12 * p,
        offsetX: 0,
        offsetY: 0,
        opacity: 1.0,
      };

    case 'Crane Down':
      return {
        scale: 1.10 + 0.05 * p,
        offsetX: 0,
        offsetY: -(1.0 - p) * 0.12 * canvasHeight,
        opacity: 1.0,
      };

    case 'Slider Left to Right':
      return {
        scale: 1.10,
        offsetX: -(0.5 - p) * 0.15 * canvasWidth,
        offsetY: 0,
        opacity: 1.0,
      };

    case 'Reveal Pan':
      return {
        scale: 1.08 + 0.04 * p,
        offsetX: (p - 0.5) * 0.12 * canvasWidth,
        offsetY: 0,
        opacity: 1.0,
      };

    case 'Tilt Up':
      return {
        scale: 1.10,
        offsetX: 0,
        offsetY: (0.5 - p) * 0.14 * canvasHeight,
        opacity: 1.0,
      };

    case 'Twilight Lighting Transition':
      return {
        scale: 1.02 + 0.03 * p,
        offsetX: 0,
        offsetY: 0,
        opacity: 1.0,
      };

    case 'High-Altitude Flyover':
      return {
        scale: 1.25 - 0.10 * p,
        offsetX: (p - 0.5) * 0.08 * canvasWidth,
        offsetY: -(p - 0.5) * 0.06 * canvasHeight,
        opacity: 1.0,
      };

    case 'Low-Angle Glide':
    default:
      return {
        scale: 1.0 + 0.10 * p,
        offsetX: (p - 0.5) * 0.05 * canvasWidth,
        offsetY: 0,
        opacity: 1.0,
      };
  }
}

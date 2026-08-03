import { VideoScene, CameraMotion } from '@/types/domain';
import { CAMERA_MOTION_SPECS } from '@/utils/promptGenerator';

export class TimelineService {
  /**
   * Recalculates total timeline duration across all video scenes
   */
  public static calculateTotalDuration(scenes: VideoScene[]): number {
    return scenes.reduce((acc, scene) => acc + scene.durationSeconds, 0);
  }

  /**
   * Updates camera motion and defaults for a specific scene
   */
  public static updateSceneMotion(scene: VideoScene, motion: CameraMotion): VideoScene {
    const spec = CAMERA_MOTION_SPECS[motion];
    return {
      ...scene,
      cameraMotion: motion,
      focalLength: spec?.defaultFocalLength || '24mm',
      motionSpeed: spec?.defaultSpeed || 'Smooth Architectural (0.5x)',
    };
  }

  /**
   * Reorders scene array from startIndex to endIndex
   */
  public static reorderScenes(scenes: VideoScene[], startIndex: number, endIndex: number): VideoScene[] {
    const result = Array.from(scenes);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
}

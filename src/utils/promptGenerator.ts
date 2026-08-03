import { PropertyPhoto, PropertyListingInfo, VideoStyleId, CameraMotion } from '../types';

export interface CameraMotionSpecs {
  motion: CameraMotion;
  defaultFocalLength: '16mm' | '24mm' | '35mm' | '50mm';
  defaultSpeed: 'Ultra-Slow (0.25x)' | 'Smooth Architectural (0.5x)' | 'Standard (1.0x)';
  description: string;
  recommendedStyles: VideoStyleId[];
}

export const CAMERA_MOTION_SPECS: Record<CameraMotion, CameraMotionSpecs> = {
  'Forward Dolly': {
    motion: 'Forward Dolly',
    defaultFocalLength: '24mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: 'Linear forward push along central axis into room with static vanishing point.',
    recommendedStyles: ['tour'],
  },
  'Slow Orbit': {
    motion: 'Slow Orbit',
    defaultFocalLength: '24mm',
    defaultSpeed: 'Ultra-Slow (0.25x)',
    description: '3D orbital 15°/sec sweep around key architectural feature with depth parallax.',
    recommendedStyles: ['tour', 'drone'],
  },
  'Push In': {
    motion: 'Push In',
    defaultFocalLength: '35mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: 'Eye-level slow zoom towards focal point with subtle background separation.',
    recommendedStyles: ['tour'],
  },
  'Crane Down': {
    motion: 'Crane Down',
    defaultFocalLength: '16mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: 'Vertical jib descent from 8m down to 1.5m entrance level pitching up smoothly.',
    recommendedStyles: ['drone', 'tour'],
  },
  'Slider Left to Right': {
    motion: 'Slider Left to Right',
    defaultFocalLength: '24mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: 'Horizontal track parallel to facade or counter with distinct foreground parallax.',
    recommendedStyles: ['tour'],
  },
  'Reveal Pan': {
    motion: 'Reveal Pan',
    defaultFocalLength: '35mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: 'Smooth Dutch pan originating behind structural pillar or entryway archway.',
    recommendedStyles: ['tour'],
  },
  'Tilt Up': {
    motion: 'Tilt Up',
    defaultFocalLength: '16mm',
    defaultSpeed: 'Ultra-Slow (0.25x)',
    description: 'Vertical camera tilt starting from floor surface up to double-height ceiling.',
    recommendedStyles: ['tour'],
  },
  'Twilight Lighting Transition': {
    motion: 'Twilight Lighting Transition',
    defaultFocalLength: '24mm',
    defaultSpeed: 'Ultra-Slow (0.25x)',
    description: 'Locked tripod golden-hour-to-dusk shift with warm interior sconce glow activation.',
    recommendedStyles: ['twilight'],
  },
  'High-Altitude Flyover': {
    motion: 'High-Altitude Flyover',
    defaultFocalLength: '16mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: '45m aerial drone traverse with level horizon and smooth gimbal descent.',
    recommendedStyles: ['drone'],
  },
  'Low-Angle Glide': {
    motion: 'Low-Angle Glide',
    defaultFocalLength: '16mm',
    defaultSpeed: 'Smooth Architectural (0.5x)',
    description: 'Floor-level ultra-wide tracking push across polished surfaces.',
    recommendedStyles: ['tour'],
  },
};

/**
 * Generates an ultra-precise, industry-standard Google Veo / AI Video Prompt
 * based on cinematographic parameters, camera motion, lens focal length, and video style.
 */
export function generateVeoPrompt(
  photo: Partial<PropertyPhoto>,
  listingInfo?: Partial<PropertyListingInfo>,
  style: VideoStyleId = 'tour'
): string {
  const motion = photo.cameraMotion || 'Forward Dolly';
  const sceneType = photo.sceneType || 'Front Exterior';
  const focalLength = photo.focalLength || '24mm';
  const speed = photo.motionSpeed || 'Smooth Architectural (0.5x)';
  const propName = listingInfo?.title || 'Luxury Property';

  let cameraInstruction = '';
  switch (motion) {
    case 'Forward Dolly':
      cameraInstruction = `Smooth linear forward dolly push at 0.5 m/s along central architectural line towards ${sceneType}`;
      break;
    case 'Slow Orbit':
      cameraInstruction = `Continuous 360-degree orbital arc at 15 deg/sec keeping ${sceneType} perfectly centered in frame with organic depth parallax`;
      break;
    case 'Push In':
      cameraInstruction = `Precision 1.2x slow optical push-in focusing on architectural textures of ${sceneType} with shallow depth of field`;
      break;
    case 'Crane Down':
      cameraInstruction = `Smooth jib crane descent from 6 meters overhead down to 1.6 meter eye-level with subtle upward camera pitch towards ${sceneType}`;
      break;
    case 'Slider Left to Right':
      cameraInstruction = `Silky smooth horizontal motorized slider track from left to right across ${sceneType}, creating depth layer separation`;
      break;
    case 'Reveal Pan':
      cameraInstruction = `Smooth Dutch pan around entryway wall reveal into ${sceneType}, keeping vertical lines locked and straight`;
      break;
    case 'Tilt Up':
      cameraInstruction = `Vertical tilt sweep from floor-level upward to reveal soaring high ceilings and architectural lighting of ${sceneType}`;
      break;
    case 'Twilight Lighting Transition':
      cameraInstruction = `Locked tripod framing with dynamic lighting transformation: dusk sky deepens to indigo blue while warm 2700K interior architectural sconces, cove LEDs, and pool underwater lights turn on`;
      break;
    case 'High-Altitude Flyover':
      cameraInstruction = `Aerial DJI Inspire 3 flyover at 40m elevation smoothly traversing over ${propName} grounds with steady 3-axis gimbal stabilization`;
      break;
    case 'Low-Angle Glide':
      cameraInstruction = `Low-angle floor glide across pristine hardwood surfaces towards ${sceneType} at eye-level with lens flare bloom`;
      break;
    default:
      cameraInstruction = `Smooth cinematic camera motion across ${sceneType}`;
  }

  let styleAesthetics = '';
  if (style === 'tour') {
    styleAesthetics = 'Cinematic architectural real estate tour, bright natural sunlight pouring through windows, high-contrast interior lighting, 4k ultra-crisp detail, clean photorealistic rendering.';
  } else if (style === 'drone') {
    styleAesthetics = 'High-end aerial cinematography, sweeping exterior vista, crisp architectural facades, golden hour sunlight, smooth horizon stabilization, 4k movie quality.';
  } else if (style === 'twilight') {
    styleAesthetics = 'Magical twilight dusk ambiance, glowing warm interior architectural illumination, indigo blue evening sky, shimmering water reflections, ultra-luxurious atmospheric aesthetic.';
  }

  return `Google Veo 2.0 Video Prompt: ${cameraInstruction}. Shot on ${focalLength} prime lens, speed: ${speed}. Property: "${propName}". Style: ${styleAesthetics} Strict Constraints: Maintain 100% architectural fidelity of source photo, zero artificial room alterations, no warped furniture, smooth 60fps motion, photorealistic rendering.`;
}

import { PropertyPhoto, PropertyListingInfo, VideoStyleId, CameraMotion } from '@/types/domain';

export function buildVeo2Prompt(
  photo: Partial<PropertyPhoto>,
  listingInfo?: Partial<PropertyListingInfo>,
  style: VideoStyleId = 'tour'
): string {
  const motion = photo.cameraMotion || 'Forward Dolly';
  const sceneType = photo.sceneType || 'Front Exterior';
  const focalLength = photo.focalLength || '24mm';
  const speed = photo.motionSpeed || 'Smooth Architectural (0.5x)';
  const propName = listingInfo?.title || 'Luxury Residence';

  let cameraInstruction = '';
  switch (motion) {
    case 'Forward Dolly':
      cameraInstruction = `Smooth linear forward dolly push at 0.5 m/s along central architectural axis into ${sceneType}`;
      break;
    case 'Slow Orbit':
      cameraInstruction = `Continuous 360-degree orbital sweep at 15 deg/sec keeping ${sceneType} centered with 3D depth parallax`;
      break;
    case 'Push In':
      cameraInstruction = `Precision 1.2x slow optical push-in focusing on texture details of ${sceneType}`;
      break;
    case 'Crane Down':
      cameraInstruction = `Smooth jib crane descent from 6 meters overhead down to 1.6m eye-level facing ${sceneType}`;
      break;
    case 'Slider Left to Right':
      cameraInstruction = `Motorized horizontal slider track from left to right across ${sceneType}, creating foreground parallax`;
      break;
    case 'Reveal Pan':
      cameraInstruction = `Dutch pan around entryway wall reveal into ${sceneType}, keeping vertical lines locked`;
      break;
    case 'Tilt Up':
      cameraInstruction = `Vertical tilt sweep from floor-level upward to reveal soaring high ceilings of ${sceneType}`;
      break;
    case 'Twilight Lighting Transition':
      cameraInstruction = `Locked tripod golden-hour-to-dusk shift with warm 2700K interior sconces and pool illumination activating`;
      break;
    case 'High-Altitude Flyover':
      cameraInstruction = `Aerial DJI drone flyover at 40m elevation smoothly traversing over ${propName} grounds`;
      break;
    case 'Low-Angle Glide':
      cameraInstruction = `Low-angle floor tracking glide across polished surfaces towards ${sceneType}`;
      break;
    default:
      cameraInstruction = `Smooth cinematic camera motion across ${sceneType}`;
  }

  let styleAesthetics = '';
  if (style === 'tour') {
    styleAesthetics = 'Cinematic architectural real estate tour, bright natural sunlight, 4k ultra-crisp detail, clean photorealistic rendering.';
  } else if (style === 'drone') {
    styleAesthetics = 'High-end aerial cinematography, sweeping exterior vista, golden hour lighting, smooth horizon stabilization.';
  } else if (style === 'twilight') {
    styleAesthetics = 'Magical dusk ambiance, glowing warm interior architectural sconces, indigo evening sky, luxurious water reflections.';
  } else {
    styleAesthetics = 'Ultra-luxurious architectural showcase, crisp 60fps movement, Hollywood cinema lighting.';
  }

  return `Google Veo 2.0 Video Prompt: ${cameraInstruction}. Shot on ${focalLength} prime lens, speed: ${speed}. Property: "${propName}". Style: ${styleAesthetics} Strict Constraints: Maintain 100% architectural fidelity of source photo, zero artificial room alterations, no warped furniture, photorealistic 60fps output.`;
}

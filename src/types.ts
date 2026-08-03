export type VideoStyleId = 'tour' | 'drone' | 'twilight';

export type AspectRatio = '16:9' | '9:16' | '1:1';

export type SceneType = 
  | 'Front Exterior'
  | 'Foyer / Entryway'
  | 'Living Room'
  | 'Gourmet Kitchen'
  | 'Dining Area'
  | 'Master Suite'
  | 'Luxury Bathroom'
  | 'Backyard & Pool'
  | 'Patio / Terrace'
  | 'Aerial / Roof'
  | 'Twilight Exterior';

export type CameraMotion = 
  | 'Forward Dolly'
  | 'Slow Orbit'
  | 'Push In'
  | 'Crane Down'
  | 'Slider Left to Right'
  | 'Reveal Pan'
  | 'Tilt Up'
  | 'Twilight Lighting Transition'
  | 'High-Altitude Flyover'
  | 'Low-Angle Glide';

export type FocalLengthOption = '16mm' | '24mm' | '35mm' | '50mm';
export type MotionSpeedOption = 'Ultra-Slow (0.25x)' | 'Smooth Architectural (0.5x)' | 'Standard (1.0x)';

export interface PropertyPhoto {
  id: string;
  url: string;
  name: string;
  sceneType: SceneType;
  qualityScore: number; // 0-100
  rank: number;
  cameraMotion: CameraMotion;
  focalLength?: FocalLengthOption;
  motionSpeed?: MotionSpeedOption;
  veoPrompt?: string;
  isSelected: boolean;
  isDuplicate?: boolean;
  isBlurry?: boolean;
  reason?: string;
  twilightUrl?: string;
}

export interface PropertyListingInfo {
  title: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  mlsUrl?: string;
}

export interface BrandKit {
  agentName: string;
  agentTitle: string;
  agentPhone: string;
  agentEmail: string;
  agentPhotoUrl: string;
  brokerageName: string;
  brokerageLogoUrl: string;
  website: string;
  brandColor: string; // hex
  showWatermark: boolean;
  watermarkText: string;
  enablePosterIntro?: boolean;
  posterHeadline?: string;
  posterSubtitle?: string;
  posterStyle?: 'editorial' | 'glassmorphism' | 'modern_gold';
}

export interface MusicTrack {
  id: string;
  title: string;
  genre: string;
  mood: string;
  audioUrl: string;
  durationSeconds: number;
}

export interface VideoScene {
  id: string;
  photoId: string;
  imageUrl: string;
  twilightImageUrl?: string;
  title: string;
  sceneType: SceneType;
  cameraMotion: CameraMotion;
  focalLength?: FocalLengthOption;
  motionSpeed?: MotionSpeedOption;
  durationSeconds: number;
  veoPrompt: string;
}

export interface SocialCaptions {
  instagram: string;
  facebook: string;
  linkedIn: string;
  x: string;
}

export interface VideoJob {
  id: string;
  title: string;
  listingInfo: PropertyListingInfo;
  style: VideoStyleId;
  aspectRatio: AspectRatio;
  duration: number; // e.g. 15, 30, 45, 60 seconds
  status: 'draft' | 'queued' | 'analyzing' | 'rendering' | 'completed' | 'error';
  progress: number; // 0 - 100
  currentStepMessage: string;
  scenes: VideoScene[];
  musicTrack: MusicTrack;
  brandKit: BrandKit;
  captions?: SocialCaptions;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  viewsCount?: number;
  downloadsCount?: number;
}

export interface VideoStyleOption {
  id: VideoStyleId;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  popularPercent: string;
  iconName: string;
  recommendedPhotoTypes: string;
  features: string[];
  gradient: string;
  previewImage: string;
}

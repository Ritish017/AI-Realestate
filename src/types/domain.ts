export type VideoStyleId = 'tour' | 'drone' | 'twilight' | 'luxury' | 'modern' | 'minimal';
export type AspectRatio = '16:9' | '9:16' | '1:1';
export type ProjectStatus = 'draft' | 'analyzing' | 'storytelling' | 'rendering' | 'completed' | 'error';
export type PosterStyle = 'editorial' | 'glassmorphism' | 'modern_gold';

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

export type MarketingGoal =
  | 'sell_quickly'
  | 'luxury_buyers'
  | 'generate_leads'
  | 'investment'
  | 'open_house'
  | 'coming_soon'
  | 'price_reduction'
  | 'commercial_leasing'
  | 'rental'
  | 'social_growth';

export interface PropertyListingInfo {
  title: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  mlsUrl?: string;
  mlsNumber?: string;
  propertyType?: string;
  luxuryLevel?: number; // 0-100
  amenities?: string[];
  schools?: string;
  walkScore?: number;
  transitScore?: number;
  neighborhood?: string;
}

export interface PropertyPhoto {
  id: string;
  url: string;
  name: string;
  sceneType: SceneType;
  qualityScore: number; // 0-100
  rank: number;
  cameraMotion: CameraMotion;
  focalLength?: '16mm' | '24mm' | '35mm' | '50mm';
  motionSpeed?: 'Ultra-Slow (0.25x)' | 'Smooth Architectural (0.5x)' | 'Standard (1.0x)';
  veoPrompt?: string;
  isSelected: boolean;
  isDuplicate?: boolean;
  isBlurry?: boolean;
  reason?: string;
  twilightUrl?: string;
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
  posterStyle?: PosterStyle;
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
  focalLength?: '16mm' | '24mm' | '35mm' | '50mm';
  motionSpeed?: 'Ultra-Slow (0.25x)' | 'Smooth Architectural (0.5x)' | 'Standard (1.0x)';
  durationSeconds: number;
  veoPrompt: string;
  reasoning?: string; // Smart Story Engine explanation
}

export interface SocialCaptions {
  instagram: string;
  facebook: string;
  linkedIn: string;
  x: string;
  threads?: string;
  pinterest?: string;
  youtube?: string;
  googleBusiness?: string;
}

export interface PropertyIntelligenceReport {
  luxuryScore: number; // 0-100
  photographyScore: number; // 0-100
  marketingScore: number; // 0-100
  videoPotential: number; // 0-100
  buyerAppeal: number; // 0-100
  missingImages: string[];
  suggestedReshoots: string[];
  suggestedTwilightImages: string[];
  suggestedDroneShots: string[];
  suggestedImprovements: string[];
  aiExecutiveSummary: string;
}

export interface DirectorsCutRecommendation {
  id: string;
  title: string;
  description: string;
  actionType: 'reorder' | 'style' | 'narration' | 'thumbnail';
  impact: 'High' | 'Medium';
}

export type HeyGenAvatarStyle = 'luxury' | 'modern' | 'corporate' | 'commercial' | 'friendly' | 'elegant';

export interface HeyGenConfig {
  enabled: boolean;
  avatarStyle: HeyGenAvatarStyle;
  introDuration: number; // 5-10s
  scriptIntro: string;
  scriptOutro: string;
  avatarVideoUrl?: string;
}

export type ElevenLabsVoiceId =
  | 'luxury_female'
  | 'luxury_male'
  | 'canadian_realtor'
  | 'warm_family'
  | 'commercial'
  | 'modern'
  | 'corporate';

export interface VoiceStudioConfig {
  enabled: boolean;
  voiceId: ElevenLabsVoiceId;
  voiceName: string;
  narrationScript: string;
  audioUrl?: string;
  syncDurationSeconds: number;
}

export type PIPLayoutStyle =
  | 'glass_card'
  | 'magazine'
  | 'blueprint'
  | 'apple_keynote'
  | 'luxury_editorial'
  | 'split_layout'
  | 'pinterest'
  | 'animated_polaroid'
  | 'corner_card'
  | 'timeline_card';

export interface PIPLayoutConfig {
  enabled: boolean;
  style: PIPLayoutStyle;
  scalePercentage: 20 | 25 | 30 | 35;
  overlayImageUrl?: string;
}

export interface ThumbnailOption {
  id: string;
  url: string;
  title: string;
  predictedCTR: number; // e.g. 8.4%
  luxuryAppealScore: number; // 0-100
  badgeText: string;
}

export interface MarketingPackage {
  socialPosts: SocialCaptions;
  emailCampaign: {
    subject: string;
    bodyHtml: string;
    previewText: string;
  };
  flyer: {
    headline: string;
    bulletPoints: string[];
    pdfUrl?: string;
  };
  brochure: {
    title: string;
    sections: { title: string; content: string }[];
    pdfUrl?: string;
  };
  openHousePoster: {
    eventTitle: string;
    date: string;
    time: string;
    pdfUrl?: string;
  };
  qrCodeUrl: string;
  landingPageHtml: string;
}

export interface VideoJob {
  id: string;
  title: string;
  listingInfo: PropertyListingInfo;
  style: VideoStyleId;
  marketingGoal?: MarketingGoal;
  aspectRatio: AspectRatio;
  duration: number; // seconds
  status: ProjectStatus;
  progress: number; // 0-100
  currentStepMessage: string;
  scenes: VideoScene[];
  musicTrack: MusicTrack;
  brandKit: BrandKit;
  captions?: SocialCaptions;
  propertyIntelligence?: PropertyIntelligenceReport;
  directorsCut?: DirectorsCutRecommendation[];
  heyGenConfig?: HeyGenConfig;
  voiceConfig?: VoiceStudioConfig;
  pipConfig?: PIPLayoutConfig;
  thumbnails?: ThumbnailOption[];
  marketingPackage?: MarketingPackage;
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  viewsCount?: number;
  downloadsCount?: number;
}

export interface ProductionTemplate {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  style: VideoStyleId;
  previewUrl: string;
  recommendedPhotoTypes: string;
}

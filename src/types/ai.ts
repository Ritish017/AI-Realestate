import { PropertyListingInfo, PropertyPhoto, VideoStyleId, SocialCaptions, BrandKit } from './domain';

export type AIDirectorType =
  | 'Orchestrator'
  | 'PropertyIntelligence'
  | 'PhotoQuality'
  | 'CreativeDirector'
  | 'StoryDirector'
  | 'Cinematographer'
  | 'MotionDirector'
  | 'VoiceDirector'
  | 'MusicDirector'
  | 'BrandDirector'
  | 'MarketingDirector'
  | 'QA'
  | 'ExportDirector';

export interface AIDirectorResult<T = any> {
  director: AIDirectorType;
  confidenceScore: number; // 0-100
  reasoningSummary: string;
  userFacingExplanation: string;
  result: T;
  warnings?: string[];
  suggestions?: string[];
}

export interface ProjectMemory {
  projectId: string;
  listingInfo: PropertyListingInfo;
  photos: PropertyPhoto[];
  style: VideoStyleId;
  brandKit: BrandKit;
  socialCaptions?: SocialCaptions;
  generatedPrompts?: Record<string, string>;
  historyRevisions: Array<{
    revisionId: string;
    timestamp: string;
    description: string;
  }>;
}

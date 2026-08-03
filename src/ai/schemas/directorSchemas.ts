import { z } from 'zod';

export const PropertyIntelligenceSchema = z.object({
  architectureStyle: z.string(),
  interiorStyle: z.string(),
  luxuryTier: z.number().min(0).max(100),
  inferredBuyerPersona: z.string(),
  lifestyleMood: z.string(),
  detectedFeatures: z.array(z.string()),
});

export const PhotoQualitySchema = z.array(
  z.object({
    photoId: z.string(),
    sceneType: z.string(),
    qualityScore: z.number().min(0).max(100),
    isBlurry: z.boolean(),
    isDuplicate: z.boolean(),
    recommendedCameraMotion: z.string(),
    recommendedFocalLength: z.string(),
    recommendedDurationSeconds: z.number(),
  })
);

export const StoryArcSchema = z.object({
  narrativeTone: z.string(),
  openingSceneId: z.string(),
  climaxSceneId: z.string(),
  endingSceneId: z.string(),
  orderedSceneIds: z.array(z.string()),
  directorRationale: z.string(),
});

export const SocialCaptionsSchema = z.object({
  instagram: z.string(),
  facebook: z.string(),
  linkedIn: z.string(),
  x: z.string(),
});

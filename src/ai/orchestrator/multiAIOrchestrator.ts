import { VideoJob, MarketingGoal, PropertyIntelligenceReport, DirectorsCutRecommendation } from '@/types/domain';
import { runPropertyIntelligenceAI } from '../directors/propertyIntelligence';
import { runMarketingDirectorAI } from '../directors/marketingDirector';
import { runDirectorsCutAI } from '../directors/directorsCutAI';
import { runQADirectorAI } from '../directors/qaDirector';
import { generateHeyGenAvatarVideo } from '@/services/heygenService';
import { generateElevenLabsNarration } from '@/services/elevenLabsService';

export class MultiAIOrchestrator {
  private job: VideoJob;

  constructor(job: VideoJob) {
    this.job = job;
  }

  public async executeAgencyPipeline(marketingGoal: MarketingGoal = 'sell_quickly'): Promise<{
    success: boolean;
    updatedJob: VideoJob;
  }> {
    const listing = this.job.listingInfo;

    // 1. Property Intelligence AI (Gemini Vision + Heuristics)
    const intelReport = await runPropertyIntelligenceAI(listing, this.job.scenes);

    // 2. Marketing Director AI (Claude Anthropic Reasoning)
    const marketingOutputs = await runMarketingDirectorAI(listing, marketingGoal, this.job.brandKit);

    // 3. AI Director's Cut Self-Critique (OpenAI Reasoning)
    const directorsCutRecs = await runDirectorsCutAI(this.job.scenes, marketingGoal);

    // 4. HeyGen Avatar & ElevenLabs Voice Studio Integration
    const avatarRes = await generateHeyGenAvatarVideo(
      {
        enabled: true,
        avatarStyle: marketingGoal === 'luxury_buyers' ? 'luxury' : 'modern',
        introDuration: 7,
        scriptIntro: `Welcome to ${listing.title}. Presenting this breathtaking property custom tailored for ${marketingGoal.replace('_', ' ')}.`,
        scriptOutro: `Contact ${this.job.brandKit.agentName} today at ${this.job.brandKit.agentPhone} for private showings.`,
      },
      this.job.brandKit.agentName,
      listing.title
    );

    const voiceRes = await generateElevenLabsNarration(
      marketingOutputs.socialCaptions.instagram,
      marketingGoal === 'luxury_buyers' ? 'luxury_female' : 'commercial'
    );

    // 5. Automated QA Review & Verification
    const qaResult = await runQADirectorAI();

    // Smart Story Engine: annotate scene reasoning
    const enhancedScenes = this.job.scenes.map((scene, idx) => ({
      ...scene,
      reasoning:
        idx === 0
          ? 'Architectural Hook: High-impact front facade establishing luxury curb appeal.'
          : idx === 1
          ? 'Emotional Transition: Foyer flow guiding viewer into main living area.'
          : 'Feature Focus: Highlight key selling point aligning with marketing goal.',
    }));

    const updatedJob: VideoJob = {
      ...this.job,
      marketingGoal,
      propertyIntelligence: intelReport,
      directorsCut: directorsCutRecs,
      heyGenConfig: {
        enabled: true,
        avatarStyle: marketingGoal === 'luxury_buyers' ? 'luxury' : 'modern',
        introDuration: 7,
        scriptIntro: `Welcome to ${listing.title}. I am ${this.job.brandKit.agentName}, presenting this incredible home.`,
        scriptOutro: `Call ${this.job.brandKit.agentPhone} for private tours.`,
        avatarVideoUrl: avatarRes.videoUrl,
      },
      voiceConfig: {
        enabled: true,
        voiceId: marketingGoal === 'luxury_buyers' ? 'luxury_female' : 'commercial',
        voiceName: marketingGoal === 'luxury_buyers' ? 'Luxury Female (Rachel)' : 'Commercial (Antoni)',
        narrationScript: marketingOutputs.socialCaptions.instagram,
        audioUrl: voiceRes.audioUrl,
        syncDurationSeconds: voiceRes.durationEstimateSeconds,
      },
      pipConfig: {
        enabled: true,
        style: 'glass_card',
        scalePercentage: 25,
      },
      thumbnails: marketingOutputs.thumbnails,
      marketingPackage: marketingOutputs.marketingPackage,
      captions: marketingOutputs.socialCaptions,
      scenes: enhancedScenes,
      status: 'completed',
      progress: 100,
      currentStepMessage: 'AI Multi-Agency Studio Package Complete!',
    };

    return {
      success: qaResult.result.passedAudit,
      updatedJob,
    };
  }
}

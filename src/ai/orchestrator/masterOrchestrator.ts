import { ProjectMemoryManager } from '../memory/projectMemory';
import { runPropertyIntelligenceAI } from '../directors/propertyIntelligence';
import { runPhotoQualityAI } from '../directors/photoQuality';
import { runCreativeDirectorAI } from '../directors/creativeDirector';
import { runStoryDirectorAI } from '../directors/storyDirector';
import { runCinematographerAI } from '../directors/cinematographer';
import { runMotionDirectorAI } from '../directors/motionDirector';
import { runVoiceDirectorAI } from '../directors/voiceDirector';
import { runMusicDirectorAI } from '../directors/musicDirector';
import { runBrandDirectorAI } from '../directors/brandDirector';
import { runMarketingDirectorAI } from '../directors/marketingDirector';
import { runQADirectorAI } from '../directors/qaDirector';
import { runExportDirectorAI } from '../directors/exportDirector';
import { VideoJob } from '@/types/domain';

export class MasterAIOrchestrator {
  private memoryManager: ProjectMemoryManager;

  constructor(job: VideoJob) {
    this.memoryManager = new ProjectMemoryManager(
      job.id,
      job.listingInfo,
      job.scenes.map((s) => ({
        id: s.photoId,
        url: s.imageUrl,
        name: s.title,
        sceneType: s.sceneType,
        qualityScore: 98,
        rank: 1,
        cameraMotion: s.cameraMotion,
        isSelected: true,
      })),
      job.style,
      job.brandKit
    );
  }

  public async executePipeline(): Promise<{
    success: boolean;
    job: VideoJob;
    directorOutputs: Record<string, any>;
  }> {
    const memory = this.memoryManager.getMemory();

    // 1. Property Intelligence AI
    const propIntel = await runPropertyIntelligenceAI(memory.listingInfo);

    // 2. Photo Quality AI
    const photoQuality = await runPhotoQualityAI(memory.photos);

    // 3. Creative Director AI
    const creative = await runCreativeDirectorAI(memory.style);

    // 4. Story Director AI
    const story = await runStoryDirectorAI(photoQuality.result);

    // 5. Cinematographer AI
    const cinema = await runCinematographerAI(story.result);

    // 6. Motion Director AI
    const motion = await runMotionDirectorAI();

    // 7. Voice Director AI
    const voice = await runVoiceDirectorAI(memory.listingInfo);

    // 8. Music Director AI
    const music = await runMusicDirectorAI();

    // 9. Brand Director AI
    const brand = await runBrandDirectorAI(memory.brandKit);

    // 10. Marketing Director AI
    const marketing = await runMarketingDirectorAI(memory.listingInfo);

    // 11. QA Director AI
    const qa = await runQADirectorAI();

    // 12. Export Director AI
    const exportConfig = await runExportDirectorAI();

    // Store social captions in memory
    this.memoryManager.updateSocialCaptions(marketing.result);

    const completedJob: VideoJob = {
      id: memory.projectId,
      title: memory.listingInfo.title,
      listingInfo: memory.listingInfo,
      style: memory.style,
      aspectRatio: '9:16',
      duration: 30,
      status: 'completed',
      progress: 100,
      currentStepMessage: 'AI Agency Production Package Complete!',
      scenes: cinema.result,
      musicTrack: music.result,
      brandKit: brand.result,
      captions: marketing.result,
      createdAt: 'Just now',
    };

    return {
      success: true,
      job: completedJob,
      directorOutputs: {
        propertyIntelligence: propIntel,
        photoQuality: photoQuality,
        creativeDirector: creative,
        storyDirector: story,
        cinematographer: cinema,
        motionDirector: motion,
        voiceDirector: voice,
        musicDirector: music,
        brandDirector: brand,
        marketingDirector: marketing,
        qaDirector: qa,
        exportDirector: exportConfig,
      },
    };
  }
}

import { ProjectMemory, AIDirectorResult } from '@/types/ai';
import { PropertyListingInfo, PropertyPhoto, VideoStyleId, BrandKit, SocialCaptions } from '@/types/domain';

export class ProjectMemoryManager {
  private memory: ProjectMemory;

  constructor(projectId: string, listingInfo: PropertyListingInfo, photos: PropertyPhoto[], style: VideoStyleId, brandKit: BrandKit) {
    this.memory = {
      projectId,
      listingInfo,
      photos,
      style,
      brandKit,
      historyRevisions: [
        {
          revisionId: `rev-0-${Date.now()}`,
          timestamp: new Date().toISOString(),
          description: 'Project initialized with base memory',
        },
      ],
    };
  }

  public getMemory(): ProjectMemory {
    return { ...this.memory };
  }

  public updateListingInfo(listingInfo: Partial<PropertyListingInfo>): void {
    this.memory.listingInfo = { ...this.memory.listingInfo, ...listingInfo };
    this.addRevision('Updated Property Listing Information');
  }

  public updatePhotos(photos: PropertyPhoto[]): void {
    this.memory.photos = photos;
    this.addRevision('Updated Photo Collection & Quality Ratings');
  }

  public updateSocialCaptions(captions: SocialCaptions): void {
    this.memory.socialCaptions = captions;
    this.addRevision('Synthesized Multi-Channel Social Captions');
  }

  public setGeneratedPrompt(photoId: string, veoPrompt: string): void {
    if (!this.memory.generatedPrompts) {
      this.memory.generatedPrompts = {};
    }
    this.memory.generatedPrompts[photoId] = veoPrompt;
  }

  private addRevision(description: string): void {
    this.memory.historyRevisions.push({
      revisionId: `rev-${this.memory.historyRevisions.length}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      description,
    });
  }
}

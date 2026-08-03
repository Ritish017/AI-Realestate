import { PropertyListingInfo } from '@/types/domain';

export interface VoiceActor {
  id: string;
  name: string;
  gender: 'male' | 'female';
  style: 'luxury' | 'warm' | 'corporate' | 'modern';
  description: string;
  previewAudioUrl: string;
}

export const VOICE_ACTORS_CATALOG: VoiceActor[] = [
  {
    id: 'voice-marcus',
    name: 'Marcus',
    gender: 'male',
    style: 'luxury',
    description: 'Deep, authoritative documentary voice designed for luxury estates.',
    previewAudioUrl: 'https://actions.google.com/sounds/v1/speech/man_speaking.ogg',
  },
  {
    id: 'voice-victoria',
    name: 'Victoria',
    gender: 'female',
    style: 'luxury',
    description: 'Sophisticated, polished tone ideal for high-end coastal properties.',
    previewAudioUrl: 'https://actions.google.com/sounds/v1/speech/woman_speaking.ogg',
  },
  {
    id: 'voice-sophia',
    name: 'Sophia',
    gender: 'female',
    style: 'warm',
    description: 'Inviting, friendly voice perfect for suburban family residences.',
    previewAudioUrl: 'https://actions.google.com/sounds/v1/speech/woman_speaking.ogg',
  },
  {
    id: 'voice-alexander',
    name: 'Alexander',
    gender: 'male',
    style: 'corporate',
    description: 'Energetic, confident voice tailored for commercial & penthouses.',
    previewAudioUrl: 'https://actions.google.com/sounds/v1/speech/man_speaking.ogg',
  },
];

export class VoiceService {
  /**
   * Rewrites MLS details into luxury documentary narration script
   */
  public static buildNarrationScript(listingInfo: PropertyListingInfo): string {
    return `Welcome to ${listingInfo.title}, situated in ${listingInfo.address}. Offered at ${listingInfo.price}, this residence spans over ${listingInfo.sqft.toLocaleString()} square feet of architectural luxury, incorporating ${listingInfo.bedrooms} bedrooms and ${listingInfo.bathrooms} designer bathrooms thoughtfully crafted for elevated living.`;
  }

  /**
   * Calculates word-level subtitle timing synchronization markers
   */
  public static generateWordTimestamps(script: string, totalDurationSeconds: number): Array<{ word: string; startTime: number; endTime: number }> {
    const words = script.trim().split(/\s+/);
    if (words.length === 0) return [];

    const timePerWord = totalDurationSeconds / words.length;
    return words.map((word, idx) => ({
      word,
      startTime: idx * timePerWord,
      endTime: (idx + 1) * timePerWord,
    }));
  }
}

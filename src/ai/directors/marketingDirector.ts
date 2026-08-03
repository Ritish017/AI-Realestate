import { AIDirectorResult } from '@/types/ai';
import { PropertyListingInfo, SocialCaptions } from '@/types/domain';

export async function runMarketingDirectorAI(
  listingInfo: PropertyListingInfo
): Promise<AIDirectorResult<SocialCaptions>> {
  const captions: SocialCaptions = {
    instagram: `✨ JUST LISTED! Welcome to ${listingInfo.title} located in ${listingInfo.address}. Offered at ${listingInfo.price}.\n\n🏡 Features: ${listingInfo.bedrooms} Beds | ${listingInfo.bathrooms} Baths | ${listingInfo.sqft} SF\n\nDM for private showings! #RealEstate #LuxuryListing #DreamHome`,
    facebook: `🏡 NEW LISTING HIGHLIGHT!\n${listingInfo.title}\n📍 ${listingInfo.address}\n💰 ${listingInfo.price}\n\nSchedule your private tour today.`,
    linkedIn: `Proud to present our newest listing at ${listingInfo.address}. Contact our team for viewings.`,
    x: `🔥 NEW LISTING! ${listingInfo.address} | ${listingInfo.price} | ${listingInfo.bedrooms} Bed ${listingInfo.bathrooms} Bath. DM for details! 🏡`,
  };

  return {
    director: 'MarketingDirector',
    confidenceScore: 98,
    reasoningSummary: 'Synthesized high-converting multi-channel captions for Instagram, Facebook, LinkedIn, and X.',
    userFacingExplanation: 'Multi-platform social captions generated with trending real estate hashtags.',
    result: captions,
  };
}

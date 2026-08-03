import { PropertyListingInfo, SocialCaptions, BrandKit } from '@/types/domain';

export interface EmailCampaign {
  subject: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
}

export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export class MarketingService {
  /**
   * Generates multi-channel social media captions for Instagram, Facebook, LinkedIn, X
   */
  public static generateSocialCaptions(listingInfo: PropertyListingInfo): SocialCaptions {
    return {
      instagram: `✨ JUST LISTED! Welcome to ${listingInfo.title} located in ${listingInfo.address}.\n\n Offered at ${listingInfo.price}.\n\n🏡 Property Features:\n• ${listingInfo.bedrooms} Bedrooms | ${listingInfo.bathrooms} Bathrooms\n• ${listingInfo.sqft.toLocaleString()} Sq Ft Architectural Sanctuary\n\nDM for private viewings or details! #RealEstate #LuxuryListing #PropertyTour #JustListed #DreamHome`,
      facebook: `🏡 NEW LISTING HIGHLIGHT!\n${listingInfo.title}\n📍 ${listingInfo.address}\n💰 ${listingInfo.price}\n\n${listingInfo.description}\n\nSchedule your private tour today.`,
      linkedIn: `Proud to present our newest property listing at ${listingInfo.address}. Combining architectural precision with luxury amenities. Offered at ${listingInfo.price}. Contact our team for institutional overview and viewings.`,
      x: `🔥 NEW LISTING! ${listingInfo.address} | ${listingInfo.price} | ${listingInfo.bedrooms} Bed ${listingInfo.bathrooms} Bath. DM for private tour! 🏡`,
    };
  }

  /**
   * Generates email campaign blast content
   */
  public static generateEmailCampaign(listingInfo: PropertyListingInfo, brandKit: BrandKit): EmailCampaign {
    return {
      subject: `✨ Just Listed: ${listingInfo.title} (${listingInfo.price})`,
      body: `Dear Partner,\n\nWe are thrilled to introduce ${listingInfo.title}, a remarkable property situated at ${listingInfo.address}. Offered at ${listingInfo.price}, this residence features ${listingInfo.bedrooms} bedrooms, ${listingInfo.bathrooms} bathrooms, and ${listingInfo.sqft.toLocaleString()} sq ft of pristine living spaces.\n\nBest regards,\n${brandKit.agentName}\n${brandKit.brokerageName}`,
      ctaText: 'View 4K Video Tour & Details',
      ctaUrl: brandKit.website || 'https://houzstudio.ai',
    };
  }

  /**
   * Generates search engine optimized titles and meta descriptions
   */
  public static generateSeoMetadata(listingInfo: PropertyListingInfo): SeoMetadata {
    return {
      metaTitle: `${listingInfo.title} - ${listingInfo.price} | Luxury Real Estate ${listingInfo.address}`,
      metaDescription: `Explore ${listingInfo.title} at ${listingInfo.address}. Featuring ${listingInfo.bedrooms} beds, ${listingInfo.bathrooms} baths, ${listingInfo.sqft.toLocaleString()} sq ft with ocean views and private grounds.`,
      keywords: [
        'Luxury Real Estate',
        listingInfo.title,
        listingInfo.address,
        'Montecito Homes for Sale',
        'Property Tour Video',
      ],
    };
  }
}

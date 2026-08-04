import { PropertyListingInfo, MarketingGoal, BrandKit, SocialCaptions, ThumbnailOption, MarketingPackage } from '@/types/domain';

export async function runMarketingDirectorAI(
  listing: PropertyListingInfo,
  goal: MarketingGoal = 'sell_quickly',
  brandKit: BrandKit
): Promise<{
  socialCaptions: SocialCaptions;
  thumbnails: ThumbnailOption[];
  marketingPackage: MarketingPackage;
}> {
  const goalLabel = goal.replace(/_/g, ' ').toUpperCase();

  const instagram = `✨ JUST LISTED! [${goalLabel}] ${listing.title}\n📍 ${listing.address} | Offered at ${listing.price}\n\n🏡 Specs: ${listing.bedrooms} Beds | ${listing.bathrooms} Baths | ${listing.sqft?.toLocaleString()} SF\n\nDM @${brandKit.agentName.replace(/\s+/g, '').toLowerCase()} for private viewings or call ${brandKit.agentPhone}.\n\n#RealEstate #LuxuryListing #${listing.title.replace(/\s+/g, '')} #DreamHome #PropertyTour`;

  const facebook = `🏡 EXCLUSIVE NEW LISTING: ${listing.title} (${listing.price}) in ${listing.address}.\n\nFeatures ${listing.bedrooms} bedrooms, ${listing.bathrooms} bathrooms, and ${listing.sqft} sq ft of luxury living space. Schedule your private walkthrough today with ${brandKit.agentName} from ${brandKit.brokerageName}!`;

  const linkedIn = `Proud to present our latest marketing campaign for ${listing.title}, located at ${listing.address}. Tailored specifically for ${goalLabel}.\n\nContact ${brandKit.agentName} at ${brandKit.agentEmail} for institutional or private inquiry.`;

  const x = `🔥 NEW LISTING! ${listing.title} | ${listing.price} | ${listing.bedrooms} Bed ${listing.bathrooms} Bath | ${listing.address} 🏡 Contact ${brandKit.agentPhone}`;

  const thumbnails: ThumbnailOption[] = [
    {
      id: 'thumb-1',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      title: 'Architectural Dusk Cover',
      predictedCTR: 9.4,
      luxuryAppealScore: 98,
      badgeText: 'Highest CTR Choice',
    },
    {
      id: 'thumb-2',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      title: 'Gourmet Kitchen Focus',
      predictedCTR: 8.7,
      luxuryAppealScore: 92,
      badgeText: 'Top Interior Choice',
    },
    {
      id: 'thumb-3',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      title: 'Pool & Lounge Aerial',
      predictedCTR: 8.9,
      luxuryAppealScore: 95,
      badgeText: 'Outdoor Appeal',
    },
  ];

  const marketingPackage: MarketingPackage = {
    socialPosts: { instagram, facebook, linkedIn, x },
    emailCampaign: {
      subject: `Exclusive Showcase: ${listing.title} - ${listing.price}`,
      previewText: `Discover ${listing.title} in ${listing.address}. Private tours now open.`,
      bodyHtml: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 24px; border-radius: 16px;">
          <h1 style="color: #fbbf24; font-size: 24px;">${listing.title}</h1>
          <p style="color: #94a3b8;">${listing.address}</p>
          <div style="background: #1e293b; padding: 16px; border-radius: 12px; margin: 16px 0;">
            <p><strong>Price:</strong> ${listing.price}</p>
            <p><strong>Bedrooms:</strong> ${listing.bedrooms} | <strong>Bathrooms:</strong> ${listing.bathrooms} | <strong>SQFT:</strong> ${listing.sqft}</p>
          </div>
          <p>${listing.description}</p>
          <a href="${brandKit.website}" style="display: inline-block; background: #f59e0b; color: #000000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">Schedule Private Tour</a>
        </div>
      `,
    },
    flyer: {
      headline: `${listing.title} - Luxury Architectural Residence`,
      bulletPoints: [
        `${listing.bedrooms} Bedrooms, ${listing.bathrooms} Luxury Bathrooms`,
        `${listing.sqft?.toLocaleString()} Square Feet of Living Space`,
        'Custom Chef\'s Kitchen with Quartz Countertops',
        'Private Resort-Style Backyard & Swimming Pool',
      ],
    },
    brochure: {
      title: `${listing.title} Portfolio Brochure`,
      sections: [
        { title: 'The Estate', content: listing.description },
        { title: 'Architectural Details', content: 'Soaring ceilings, floor-to-ceiling glass walls, premium hardwood flooring.' },
      ],
    },
    openHousePoster: {
      eventTitle: `EXCLUSIVE OPEN HOUSE: ${listing.title}`,
      date: 'This Sunday',
      time: '1:00 PM - 4:00 PM',
    },
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(brandKit.website || 'https://houzstudio.ai')}`,
    landingPageHtml: `
      <!DOCTYPE html>
      <html>
      <head><title>${listing.title}</title></head>
      <body style="background:#090A0F; color:#fff; font-family:sans-serif; text-align:center; padding:40px;">
        <h1 style="color:#f59e0b;">${listing.title}</h1>
        <p>${listing.address} - ${listing.price}</p>
        <p>${listing.description}</p>
        <p>Contact ${brandKit.agentName} at ${brandKit.agentPhone}</p>
      </body>
      </html>
    `,
  };

  return {
    socialCaptions: { instagram, facebook, linkedIn, x },
    thumbnails,
    marketingPackage,
  };
}

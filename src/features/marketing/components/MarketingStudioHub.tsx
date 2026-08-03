'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SocialCaptionsEditor } from './SocialCaptionsEditor';
import { EmailCampaignBuilder } from './EmailCampaignBuilder';
import { FlyerGenerator } from './FlyerGenerator';
import { QrCodeGenerator } from './QrCodeGenerator';
import { Sparkles, MessageSquare, Mail, Printer, QrCode } from 'lucide-react';
import { PropertyListingInfo, BrandKit, SocialCaptions } from '@/types/domain';
import { MarketingService } from '../services/marketingService';

export interface MarketingStudioHubProps {
  listingInfo: PropertyListingInfo;
  brandKit: BrandKit;
  captions?: SocialCaptions;
}

export const MarketingStudioHub: React.FC<MarketingStudioHubProps> = ({
  listingInfo,
  brandKit,
  captions,
}) => {
  const [activeTab, setActiveTab] = useState<'captions' | 'email' | 'flyer' | 'qr'>('captions');
  const activeCaptions = captions || MarketingService.generateSocialCaptions(listingInfo);

  return (
    <Card variant="glass" className="p-8 space-y-8 max-w-4xl mx-auto border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-white">Full-Stack Marketing Campaign Studio</h2>
            <p className="text-xs text-neutral-400">Generate social media copy, email blasts, print flyers, and QR landing links with 1 click.</p>
          </div>
        </div>

        <Badge variant="gold" size="sm">Multi-Channel Suite</Badge>
      </div>

      {/* Main Feature Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-neutral-900/80 rounded-2xl border border-neutral-800">
        <button
          onClick={() => setActiveTab('captions')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'captions' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Social Captions</span>
        </button>

        <button
          onClick={() => setActiveTab('email')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'email' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Blast</span>
        </button>

        <button
          onClick={() => setActiveTab('flyer')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'flyer' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Flyer & Poster</span>
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'qr' ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR Code</span>
        </button>
      </div>

      {/* Tab View Switcher */}
      {activeTab === 'captions' && <SocialCaptionsEditor captions={activeCaptions} />}
      {activeTab === 'email' && <EmailCampaignBuilder listingInfo={listingInfo} brandKit={brandKit} />}
      {activeTab === 'flyer' && <FlyerGenerator listingInfo={listingInfo} brandKit={brandKit} />}
      {activeTab === 'qr' && <QrCodeGenerator listingInfo={listingInfo} brandKit={brandKit} />}
    </Card>
  );
};

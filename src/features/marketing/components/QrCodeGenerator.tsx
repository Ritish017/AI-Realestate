'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QrCode, Download, Copy, Check } from 'lucide-react';
import { PropertyListingInfo, BrandKit } from '@/types/domain';
import { useToastStore } from '@/stores/useToastStore';

export interface QrCodeGeneratorProps {
  listingInfo: PropertyListingInfo;
  brandKit: BrandKit;
}

export const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  listingInfo,
  brandKit,
}) => {
  const { showSuccess } = useToastStore();
  const [copied, setCopied] = React.useState(false);
  const landingUrl = `https://houzstudio.ai/p/${listingInfo.title.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(landingUrl);
    setCopied(true);
    showSuccess('Link Copied', 'Property video landing page URL copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="glass" className="p-6 space-y-6 border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-bold font-serif text-white">Branded Property QR Code</h4>
        </div>
        <Badge variant="glass" size="sm">Landing Page Link</Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-black/60 rounded-3xl border border-neutral-800">
        {/* Mock Custom QR Code Box */}
        <div className="w-40 h-40 bg-white p-3 rounded-2xl flex items-center justify-center shadow-2xl relative border-4 border-amber-400">
          <div className="w-full h-full border-2 border-black p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[10px] font-bold text-black font-mono">SCAN FOR 4K TOUR</span>
            <div className="w-16 h-16 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
              QR
            </div>
            <span className="text-[8px] font-mono text-neutral-600">{brandKit.agentName}</span>
          </div>
        </div>

        <div className="space-y-3 text-center sm:text-left">
          <div>
            <h5 className="text-sm font-bold text-white">Direct Campaign Landing Page</h5>
            <p className="text-xs text-neutral-400">{landingUrl}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy URL'}
            </Button>
            <Button variant="gold" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Download PNG QR Code
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { PropertyListingInfo, BrandKit } from '@/types/domain';
import { MarketingService } from '../services/marketingService';
import { useToastStore } from '@/stores/useToastStore';

export interface EmailCampaignBuilderProps {
  listingInfo: PropertyListingInfo;
  brandKit: BrandKit;
}

export const EmailCampaignBuilder: React.FC<EmailCampaignBuilderProps> = ({
  listingInfo,
  brandKit,
}) => {
  const { showSuccess } = useToastStore();
  const initialCampaign = MarketingService.generateEmailCampaign(listingInfo, brandKit);
  const [subject, setSubject] = useState(initialCampaign.subject);
  const [body, setBody] = useState(initialCampaign.body);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    showSuccess('Email Copied', 'Email subject line and body copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="glass" className="p-6 space-y-5 border border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-bold font-serif text-white">Email Blast Campaign Builder</h4>
        </div>
        <Badge variant="gold" size="sm">Open House Blast</Badge>
      </div>

      <Input
        label="Email Subject Line"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <Textarea
        label="Email Body Content"
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyEmail}
          leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        >
          {copied ? 'Copied to Clipboard' : 'Copy Email HTML/Text'}
        </Button>

        <Button variant="gold" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
          Send Email Announcement
        </Button>
      </div>
    </Card>
  );
};

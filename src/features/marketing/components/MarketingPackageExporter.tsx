'use client';

import React, { useState } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { sendEmailCampaign } from '@/services/resendService';
import { triggerN8nWorkflow } from '@/services/n8nService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Package, 
  Send, 
  FileText, 
  QrCode, 
  Globe, 
  Share2, 
  Check, 
  Zap, 
  Copy 
} from 'lucide-react';

export function MarketingPackageExporter() {
  const { currentProject } = useProjectStore();
  const pkg = currentProject?.marketingPackage;
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [n8nStatus, setN8nStatus] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!pkg || !currentProject) return null;

  const handleSendEmail = async () => {
    setEmailStatus('Broadcasting email via Resend API...');
    const result = await sendEmailCampaign(
      currentProject.brandKit.agentEmail || 'realtor@montecito.com',
      pkg.emailCampaign.subject,
      pkg.emailCampaign.bodyHtml
    );
    setEmailStatus(result.message);
  };

  const handleTriggerN8n = async () => {
    setN8nStatus('Triggering n8n lead generation workflow...');
    const result = await triggerN8nWorkflow(currentProject, 'campaign_created');
    setN8nStatus(result.message);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <Card variant="glass" className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif italic text-white font-bold">All-In-One Marketing Package</h3>
            <p className="text-xs text-neutral-400">Automated Social, Email, Print, QR Code & Landing Page Collateral</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="gold" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />} onClick={handleSendEmail}>
            Send Email (Resend API)
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Zap className="w-3.5 h-3.5 text-amber-400" />} onClick={handleTriggerN8n}>
            n8n Automation
          </Button>
        </div>
      </div>

      {emailStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
          {emailStatus}
        </div>
      )}

      {n8nStatus && (
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-mono">
          {n8nStatus}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Printable Flyer */}
        <Card variant="glass" className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <FileText className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Printable Flyer</h4>
          </div>
          <p className="text-xs text-neutral-400">{pkg.flyer.headline}</p>
          <ul className="space-y-1 text-[11px] text-neutral-400">
            {pkg.flyer.bulletPoints.map((pt, i) => (
              <li key={i}>• {pt}</li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleCopy(JSON.stringify(pkg.flyer, null, 2), 'flyer')}
          >
            {copiedKey === 'flyer' ? 'Copied!' : 'Copy Flyer Spec'}
          </Button>
        </Card>

        {/* Brochure & Open House Poster */}
        <Card variant="glass" className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <FileText className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Open House Poster</h4>
          </div>
          <p className="text-xs text-neutral-400">{pkg.openHousePoster.eventTitle}</p>
          <p className="text-[11px] text-neutral-400 font-mono">
            {pkg.openHousePoster.date} | {pkg.openHousePoster.time}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleCopy(JSON.stringify(pkg.openHousePoster, null, 2), 'poster')}
          >
            {copiedKey === 'poster' ? 'Copied!' : 'Copy Poster Spec'}
          </Button>
        </Card>

        {/* QR Code */}
        <Card variant="glass" className="p-4 space-y-3 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-emerald-400">
            <QrCode className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Property QR Code</h4>
          </div>
          <div className="w-24 h-24 bg-white p-2 rounded-xl border border-neutral-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pkg.qrCodeUrl} alt="Property QR Code" className="w-full h-full object-contain" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleCopy(pkg.qrCodeUrl, 'qr')}
          >
            {copiedKey === 'qr' ? 'Copied!' : 'Copy QR Code Link'}
          </Button>
        </Card>

        {/* Landing Page */}
        <Card variant="glass" className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Globe className="w-4 h-4" />
            <h4 className="text-sm font-bold text-white">Single-Property Site</h4>
          </div>
          <p className="text-xs text-neutral-400">High-converting landing page HTML template auto-generated.</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => handleCopy(pkg.landingPageHtml, 'landing')}
          >
            {copiedKey === 'landing' ? 'Copied!' : 'Copy HTML Code'}
          </Button>
        </Card>
      </div>
    </Card>
  );
}

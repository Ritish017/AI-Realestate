import React from 'react';
import { Check, Sparkles, Zap, ShieldCheck, Building2, Star } from 'lucide-react';

export const PricingModal: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-black text-neutral-400 border border-neutral-800 rounded-full">
          Transparent Pricing
        </span>
        <h2 className="text-3xl font-serif italic text-white">AI Real Estate Video Plans</h2>
        <p className="text-xs text-neutral-400">
          Replaces $1,500/listing drone pilots and video editing agencies. Generate property-faithful videos in minutes.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Starter Plan */}
        <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-0.5">Starter Agent</h3>
              <p className="text-xs text-neutral-400">For solo realtors with 2–4 listings/mo</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-serif italic text-white">$79</span>
              <span className="text-xs text-neutral-400">/ month</span>
            </div>

            <ul className="space-y-3 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span><strong>20 Videos / month</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>1080p HD Video Exports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>All 3 Premium Video Styles</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Agent Brand Kit & Watermark</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>AI Social Media Captions</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-wider text-xs rounded-xl border border-neutral-800 transition-colors">
            Start Starter Plan
          </button>
        </div>

        {/* Professional Plan (Featured) */}
        <div className="relative bg-neutral-900 rounded-2xl border-2 border-white p-6 space-y-6 flex flex-col justify-between shadow-2xl">
          
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-black" />
            <span>Most Popular Choice</span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-0.5">Professional Studio</h3>
              <p className="text-xs text-neutral-300 font-medium">For high-volume producers & top teams</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-serif italic text-white">$199</span>
              <span className="text-xs text-neutral-400">/ month</span>
            </div>

            <ul className="space-y-3 text-xs text-neutral-200 border-t border-neutral-800 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span><strong>Unlimited Standard Videos</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Telegram Bot Automation (/generate)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>MLS & Zillow URL Auto-Import</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Google Drive Folder Watch</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Priority Veo AI Rendering Queue</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-xl transition-all">
            Upgrade to Professional
          </button>
        </div>

        {/* Enterprise Brokerage Plan */}
        <div className="bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-0.5">Brokerage Enterprise</h3>
              <p className="text-xs text-neutral-400">For brokerages, teams & MLS integrations</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-serif italic text-white">Custom</span>
              <span className="text-xs text-neutral-400">/ annual</span>
            </div>

            <ul className="space-y-3 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Multi-Agent Team Workspaces</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Brokerage-wide Custom Branding</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>REST API & Webhooks Access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Automated MLS Feed Ingestion</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Dedicated Account Manager</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-wider text-xs rounded-xl border border-neutral-800 transition-colors">
            Contact Sales Team
          </button>
        </div>

      </div>
    </div>
  );
};

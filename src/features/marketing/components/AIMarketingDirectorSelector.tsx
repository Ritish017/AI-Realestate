'use client';

import React from 'react';
import { MarketingGoal } from '@/types/domain';
import { useProjectStore } from '@/stores/useProjectStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Zap, 
  Crown, 
  Target, 
  TrendingUp, 
  Home, 
  Sparkles, 
  Tag, 
  Building2, 
  KeyRound, 
  Share2 
} from 'lucide-react';

interface GoalOption {
  id: MarketingGoal;
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

const GOALS: GoalOption[] = [
  { id: 'sell_quickly', title: 'Sell Quickly', description: 'Urgent buyer motivation, fast pacing & high-converting CTA.', icon: Zap, badge: 'High Conversion' },
  { id: 'luxury_buyers', title: 'Luxury Buyers', description: 'Cinematic twilight shifts, classical music & editorial aesthetics.', icon: Crown, badge: 'Premium Edition' },
  { id: 'generate_leads', title: 'Generate Leads', description: 'High engagement hooks, lead magnets & direct DM triggers.', icon: Target, badge: 'Top Growth' },
  { id: 'investment', title: 'Investment Focus', description: 'ROI metrics, cap rates, rental yield & investor appeal.', icon: TrendingUp, badge: 'Financial Analysis' },
  { id: 'open_house', title: 'Open House Event', description: 'Event date callouts, map directions & walkthrough invitation.', icon: Home, badge: 'Event Driving' },
  { id: 'coming_soon', title: 'Coming Soon Teaser', description: 'Exclusive preview, curiosity hooks & VIP buyer waitlists.', icon: Sparkles, badge: 'VIP Teaser' },
  { id: 'price_reduction', title: 'Price Improvement', description: 'Incredible value highlight, price adjustment urgency.', icon: Tag, badge: 'Urgent Deal' },
  { id: 'commercial_leasing', title: 'Commercial Leasing', description: 'Corporate branding, foot traffic stats & floor plan focus.', icon: Building2, badge: 'B2B Commercial' },
  { id: 'rental', title: 'Rental Property', description: 'Lease terms, move-in readiness & neighborhood amenities.', icon: KeyRound, badge: 'Tenant Focus' },
  { id: 'social_growth', title: 'Social Media Growth', description: 'Trending audio sync, TikTok/Reels framing & viral hooks.', icon: Share2, badge: 'Viral Engine' },
];

export function AIMarketingDirectorSelector() {
  const { currentProject, setMarketingGoal, isLoading } = useProjectStore();
  const activeGoal = currentProject?.marketingGoal || 'sell_quickly';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">AI Marketing Director</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Select your objective. The AI automatically steers story flow, voice tone, music, captions, and export collateral.
          </p>
        </div>

        <Badge variant="gold" size="md">
          Active Strategy: {activeGoal.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {GOALS.map((goal) => {
          const Icon = goal.icon;
          const isSelected = activeGoal === goal.id;

          return (
            <Card
              key={goal.id}
              variant={isSelected ? 'gold' : 'glass'}
              onClick={() => setMarketingGoal(goal.id)}
              className={`p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                isSelected ? 'ring-2 ring-amber-400 bg-amber-500/10 shadow-lg gold-glow' : 'hover:border-neutral-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${isSelected ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-amber-400 group-hover:bg-neutral-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant={isSelected ? 'gold' : 'neutral'} size="sm">
                    {goal.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{goal.title}</h3>
                  <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">{goal.description}</p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 pt-2 border-t border-amber-500/30 flex items-center justify-between text-[10px] font-mono text-amber-400">
                  <span>AI Autopilot Active</span>
                  <span>100% Synced</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

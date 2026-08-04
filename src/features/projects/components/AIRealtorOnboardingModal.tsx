'use client';

import React, { useState } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { MarketingGoal } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, MessageSquare, ArrowRight, Bot } from 'lucide-react';

interface AIRealtorOnboardingModalProps {
  onComplete: () => void;
}

export function AIRealtorOnboardingModal({ onComplete }: AIRealtorOnboardingModalProps) {
  const { setMarketingGoal } = useProjectStore();
  const [step, setStep] = useState(0);

  const steps = [
    {
      question: 'Welcome! I am your AI Marketing Director. What is your primary objective for this listing?',
      options: [
        { label: 'Sell Quickly (High-converting urgency)', goal: 'sell_quickly' as MarketingGoal },
        { label: 'Attract Luxury Buyers (Cinematic twilight aesthetic)', goal: 'luxury_buyers' as MarketingGoal },
        { label: 'Generate Inbound Leads (Hook-driven reels)', goal: 'generate_leads' as MarketingGoal },
        { label: 'Highlight Investment ROI (Financial analytics)', goal: 'investment' as MarketingGoal },
      ],
    },
    {
      question: 'Got it! Which voice narration tone best matches your agency brand identity?',
      options: [
        { label: 'Luxury Female (Rachel - Sophisticated)', goal: 'luxury_buyers' as MarketingGoal },
        { label: 'Commercial Authority (Antoni - High energy)', goal: 'sell_quickly' as MarketingGoal },
        { label: 'Warm Family Tone (Bella - Approachable)', goal: 'open_house' as MarketingGoal },
      ],
    },
  ];

  const handleSelectOption = (goal: MarketingGoal) => {
    setMarketingGoal(goal);
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <Card variant="gold" className="max-w-lg w-full p-6 space-y-6 bg-neutral-950 border-amber-500/40 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-bold">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-serif italic text-white font-bold">AI Realtor Conversational Concierge</h3>
              <Badge variant="gold" size="sm">Guided Onboarding</Badge>
            </div>
            <p className="text-xs text-neutral-400">Step {step + 1} of {steps.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <p className="text-sm text-neutral-200 leading-relaxed font-medium">
            "{current.question}"
          </p>
        </div>

        <div className="space-y-3">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelectOption(opt.goal)}
              className="w-full p-4 rounded-2xl bg-neutral-900 hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-400 text-left transition-all text-xs font-semibold text-white flex items-center justify-between group"
            >
              <span>{opt.label}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" size="sm" onClick={onComplete}>
            Skip Conversational Setup
          </Button>
        </div>
      </Card>
    </div>
  );
}

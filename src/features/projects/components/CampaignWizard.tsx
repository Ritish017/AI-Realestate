'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/stores/useProjectStore';
import { 
  CampaignGoal, 
  PropertyCategory, 
  VideoStyleId, 
  PropertyListingInfo, 
  PropertyPhoto, 
  CallToAction, 
  ElevenLabsVoiceId, 
  VideoJob 
} from '@/types/domain';
import { SAMPLE_PRESETS, DEFAULT_BRAND_KIT, MUSIC_TRACKS } from '@/data/sampleListings';
import { CampaignStep1BasicInfo } from './CampaignStep1BasicInfo';
import { CampaignStep2Upload } from './CampaignStep2Upload';
import { CampaignStep3VideoStyle } from './CampaignStep3VideoStyle';
import { CampaignStep4CoverImage } from './CampaignStep4CoverImage';
import { CampaignStep5PropertyDetails } from './CampaignStep5PropertyDetails';
import { CampaignStep6Voice } from './CampaignStep6Voice';
import { CampaignStep7Generate } from './CampaignStep7Generate';
import { MultiAIOrchestrator } from '@/ai/orchestrator/multiAIOrchestrator';

export function CampaignWizard() {
  const router = useRouter();
  const { addProject, setCurrentProject } = useProjectStore();

  const [step, setStep] = useState(1);

  // Form State
  const [campaignName, setCampaignName] = useState('742 Sycamore Canyon Rd – Luxury Showcase');
  const [campaignGoal, setCampaignGoal] = useState<CampaignGoal>('just_listed');
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategory>('Villa');

  const [photos, setPhotos] = useState<PropertyPhoto[]>(SAMPLE_PRESETS[0].photos);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyleId>('cinematic_luxury');
  const [coverPhotoId, setCoverPhotoId] = useState<string>(SAMPLE_PRESETS[0].photos[0].id);

  const [listingInfo, setListingInfo] = useState<PropertyListingInfo>({
    title: 'Montecito Coastal Estate',
    address: '742 Sycamore Canyon Rd, Montecito, CA 93108',
    price: '$8,950,000',
    bedrooms: 5,
    bathrooms: 7,
    sqft: 7200,
    description: 'Breathtaking Montecito architectural sanctuary featuring panoramic Pacific ocean views, infinity edge pool, gourmet chef kitchen, and master craftsmanship.',
    propertyType: 'Luxury Villa',
  });

  const [cta, setCta] = useState<CallToAction>('Book a Private Tour');
  const [selectedVoice, setSelectedVoice] = useState<ElevenLabsVoiceId>('luxury_female');

  const handleFinishGeneration = async () => {
    const coverPhoto = photos.find((p) => p.id === coverPhotoId) || photos[0];

    const newJob: VideoJob = {
      id: `campaign-${Date.now()}`,
      title: campaignName || listingInfo.address,
      campaignGoal,
      propertyCategory,
      coverPhotoId,
      cta,
      listingInfo,
      style: selectedStyle,
      aspectRatio: '9:16',
      duration: 30,
      status: 'completed',
      progress: 100,
      currentStepMessage: 'Campaign Package Complete!',
      scenes: photos.map((p) => ({
        id: p.id,
        photoId: p.id,
        imageUrl: p.url,
        title: p.name,
        sceneType: p.sceneType,
        cameraMotion: p.cameraMotion,
        durationSeconds: 5,
        veoPrompt: `Cinematic ${p.cameraMotion} camera trajectory of ${p.sceneType}`,
      })),
      musicTrack: MUSIC_TRACKS[0],
      brandKit: {
        ...DEFAULT_BRAND_KIT,
        posterHeadline: campaignGoal.replace('_', ' ').toUpperCase(),
      },
      createdAt: 'Just now',
    };

    // Execute Multi-AI Pipeline
    const orchestrator = new MultiAIOrchestrator(newJob);
    const { updatedJob } = await orchestrator.executeAgencyPipeline(campaignGoal);

    addProject(updatedJob);
    setCurrentProject(updatedJob);

    router.push(`/projects/${updatedJob.id}/studio`);
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <CampaignStep1BasicInfo
          campaignName={campaignName}
          setCampaignName={setCampaignName}
          campaignGoal={campaignGoal}
          setCampaignGoal={setCampaignGoal}
          propertyCategory={propertyCategory}
          setPropertyCategory={setPropertyCategory}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <CampaignStep2Upload
          photos={photos}
          setPhotos={setPhotos}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <CampaignStep3VideoStyle
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <CampaignStep4CoverImage
          photos={photos}
          coverPhotoId={coverPhotoId}
          setCoverPhotoId={setCoverPhotoId}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
        />
      )}

      {step === 5 && (
        <CampaignStep5PropertyDetails
          listingInfo={listingInfo}
          setListingInfo={setListingInfo}
          cta={cta}
          setCta={setCta}
          onNext={() => setStep(6)}
          onBack={() => setStep(4)}
        />
      )}

      {step === 6 && (
        <CampaignStep6Voice
          selectedVoice={selectedVoice}
          setSelectedVoice={setSelectedVoice}
          onNext={() => setStep(7)}
          onBack={() => setStep(5)}
        />
      )}

      {step === 7 && (
        <CampaignStep7Generate onComplete={handleFinishGeneration} />
      )}
    </div>
  );
}

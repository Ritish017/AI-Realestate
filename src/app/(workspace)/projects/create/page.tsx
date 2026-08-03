'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/Badge';
import { WizardStep1Details } from '@/features/projects/components/WizardStep1Details';
import { WizardStep2Upload } from '@/features/projects/components/WizardStep2Upload';
import { WizardStep3StoryReview } from '@/features/projects/components/WizardStep3StoryReview';
import { useProjectStore } from '@/stores/useProjectStore';
import { useToastStore } from '@/stores/useToastStore';
import { SAMPLE_PRESETS, DEFAULT_BRAND_KIT, MUSIC_TRACKS } from '@/data/sampleListings';
import { PropertyListingInfo, PropertyPhoto, VideoStyleId, AspectRatio, VideoJob } from '@/types/domain';

export default function CreateProjectWizard() {
  const router = useRouter();
  const { addProject, setCurrentProject } = useProjectStore();
  const { showSuccess, showInfo } = useToastStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyleId>('tour');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [durationSeconds, setDurationSeconds] = useState<number>(30);
  const [isLoadingMls, setIsLoadingMls] = useState(false);

  const initialPreset = SAMPLE_PRESETS[0];
  const [listingInfo, setListingInfo] = useState<PropertyListingInfo>(initialPreset.listingInfo);
  const [photos, setPhotos] = useState<PropertyPhoto[]>(initialPreset.photos);

  const handleImportMlsUrl = async (url: string) => {
    setIsLoadingMls(true);
    showInfo('MLS Importer Active', 'Fetching structured listing data and reference photos...');
    setTimeout(() => {
      setIsLoadingMls(false);
      showSuccess('MLS Data Imported', 'Property details and photos successfully populated!');
    }, 1200);
  };

  const handleFinishWizard = () => {
    const selectedPhotos = photos.filter((p) => p.isSelected);
    const activePhotos = selectedPhotos.length > 0 ? selectedPhotos : photos;

    const newJob: VideoJob = {
      id: `job-${Date.now()}`,
      title: listingInfo.title || 'Luxury Estate Video',
      listingInfo,
      style: selectedStyle,
      aspectRatio,
      duration: durationSeconds,
      status: 'completed',
      progress: 100,
      currentStepMessage: 'Render complete!',
      scenes: activePhotos.map((p) => ({
        id: p.id,
        photoId: p.id,
        imageUrl: p.url,
        title: p.name,
        sceneType: p.sceneType,
        cameraMotion: p.cameraMotion,
        durationSeconds: 5,
        veoPrompt: `Cinematic ${p.cameraMotion} trajectory of ${p.sceneType}`,
      })),
      musicTrack: MUSIC_TRACKS[0],
      brandKit: DEFAULT_BRAND_KIT,
      createdAt: 'Just now',
    };

    addProject(newJob);
    setCurrentProject(newJob);
    showSuccess('AI Video Reel Generated', 'Opening Final Cut Production Studio...');
    router.push(`/projects/${newJob.id}/studio`);
  };

  return (
    <PageContainer className="space-y-8">
      {/* Top Breadcrumb & Step Indicator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <Badge variant="gold" size="sm" className="mb-2">Create Project Wizard</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white font-bold">New AI Real Estate Campaign</h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className={step >= 1 ? 'text-amber-400 font-bold' : 'text-neutral-500'}>1. Details</span>
          <span className="text-neutral-700">→</span>
          <span className={step >= 2 ? 'text-amber-400 font-bold' : 'text-neutral-500'}>2. Media</span>
          <span className="text-neutral-700">→</span>
          <span className={step >= 3 ? 'text-amber-400 font-bold' : 'text-neutral-500'}>3. Story Review</span>
        </div>
      </div>

      {/* Step Render Switcher */}
      {step === 1 && (
        <WizardStep1Details
          listingInfo={listingInfo}
          setListingInfo={setListingInfo}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          durationSeconds={durationSeconds}
          setDurationSeconds={setDurationSeconds}
          onNext={() => setStep(2)}
          onImportMlsUrl={handleImportMlsUrl}
          isLoadingMls={isLoadingMls}
        />
      )}

      {step === 2 && (
        <WizardStep2Upload
          photos={photos}
          setPhotos={setPhotos}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <WizardStep3StoryReview
          photos={photos}
          selectedStyle={selectedStyle}
          durationSeconds={durationSeconds}
          onBack={() => setStep(2)}
          onFinish={handleFinishWizard}
        />
      )}
    </PageContainer>
  );
}

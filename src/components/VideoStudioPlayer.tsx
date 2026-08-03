import React, { useState, useEffect, useRef } from 'react';
import { VideoJob, PropertyPhoto, BrandKit, MusicTrack, SocialCaptions, AspectRatio } from '../types';
import { generateVeoPrompt } from '../utils/promptGenerator';
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Send, 
  Copy, 
  Check, 
  Music, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  Square,
  Instagram,
  Linkedin,
  Facebook,
  MessageSquare,
  Maximize2,
  Sliders,
  Video,
  Eye
} from 'lucide-react';

interface VideoStudioPlayerProps {
  job: VideoJob | null;
  photos: PropertyPhoto[];
  brandKit: BrandKit;
  musicTrack: MusicTrack;
  aspectRatio: AspectRatio;
  onGenerateNew: () => void;
  isGenerating: boolean;
}

export const VideoStudioPlayer: React.FC<VideoStudioPlayerProps> = ({
  job,
  photos,
  brandKit,
  musicTrack,
  aspectRatio,
  onGenerateNew,
  isGenerating,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 100
  const [isMuted, setIsMuted] = useState(false);
  const [copiedCaptionTab, setCopiedCaptionTab] = useState<'instagram' | 'facebook' | 'linkedIn' | 'x' | null>(null);
  const [activeCaptionPlatform, setActiveCaptionPlatform] = useState<'instagram' | 'facebook' | 'linkedIn' | 'x'>('instagram');
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [isExportingMedia, setIsExportingMedia] = useState(false);
  const [copiedCurrentVeoPrompt, setCopiedCurrentVeoPrompt] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const selectedPhotos = photos.filter((p) => p.isSelected);
  const activePhotos = selectedPhotos.length > 0 ? selectedPhotos : photos;

  // Calculate total scenes count including Opening Poster Cover
  const hasPosterIntro = brandKit.enablePosterIntro ?? true;
  const totalScenes = hasPosterIntro ? activePhotos.length + 1 : activePhotos.length;
  const isPosterScene = hasPosterIntro && currentSceneIndex === 0;
  const photoSceneIndex = hasPosterIntro ? currentSceneIndex - 1 : currentSceneIndex;
  const currentPhoto = activePhotos[photoSceneIndex] || activePhotos[0];

  // Canvas Dimensions based on Aspect Ratio
  const getCanvasDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return { width: 540, height: 960, ratioClass: 'aspect-[9/16] max-w-[360px]' };
      case '1:1':
        return { width: 720, height: 720, ratioClass: 'aspect-square max-w-[480px]' };
      case '16:9':
      default:
        return { width: 960, height: 540, ratioClass: 'aspect-[16/9] max-w-[720px]' };
    }
  };

  const dims = getCanvasDimensions();

  // Helper function to draw Realtor Opening Poster Cover Frame
  const drawPosterCover = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    progress: number
  ) => {
    const bgPhotoUrl = activePhotos[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
    
    // Background Photo with subtle slow zoom
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = bgPhotoUrl;
    if (img.complete) {
      ctx.save();
      const scale = 1.0 + progress * 0.08;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Dark Vignette Backdrop
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, 'rgba(0,0,0,0.65)');
    bgGrad.addColorStop(0.5, 'rgba(0,0,0,0.85)');
    bgGrad.addColorStop(1, 'rgba(0,0,0,0.95)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center Luxury Poster Container Box
    const pWidth = canvas.width * 0.88;
    const pHeight = canvas.height * 0.78;
    const pX = (canvas.width - pWidth) / 2;
    const pY = (canvas.height - pHeight) / 2;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.beginPath();
    ctx.roundRect(pX, pY, pWidth, pHeight, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)'; // Gold line border
    ctx.lineWidth = 2;
    ctx.stroke();

    // Headline Badge Pill
    const headlineText = (brandKit.posterHeadline || 'JUST LISTED').toUpperCase();
    ctx.font = 'bold 12px sans-serif';
    const badgeWidth = Math.max(140, ctx.measureText(headlineText).width + 30);
    const badgeX = pX + 24;
    const badgeY = pY + 24;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, 26, 13);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(headlineText, badgeX + 15, badgeY + 17);

    // Brokerage Name (Top Right of Poster)
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText((brandKit.brokerageName || 'Premiere Realty').toUpperCase(), pX + pWidth - 24, badgeY + 17);
    ctx.textAlign = 'left';

    // Agent Profile Headshot Image
    const agentImg = new Image();
    agentImg.crossOrigin = 'anonymous';
    agentImg.src = brandKit.agentPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';

    const avatarSize = Math.min(80, canvas.width * 0.16);
    const avatarX = pX + 28;
    const avatarY = pY + 70;

    if (agentImg.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(agentImg, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();

      // Gold Ring Around Avatar
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 1, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Agent Information
    const infoX = avatarX + avatarSize + 18;
    const infoY = avatarY + 15;

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText((brandKit.posterSubtitle || 'PRESENTED EXCLUSIVELY BY').toUpperCase(), infoX, infoY);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Playfair Display, serif';
    ctx.fillText(brandKit.agentName || 'Elena Rostova', infoX, infoY + 26);

    ctx.fillStyle = '#d1d5db';
    ctx.font = '13px sans-serif';
    ctx.fillText(brandKit.agentTitle || 'Luxury Estate Specialist', infoX, infoY + 46);

    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`${brandKit.agentPhone || '(310) 892-4100'} • ${brandKit.website || 'premierestates.com'}`, infoX, infoY + 66);

    // Divider Line
    const divY = pY + pHeight - 110;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pX + 24, divY);
    ctx.lineTo(pX + pWidth - 24, divY);
    ctx.stroke();

    // Property Listing Summary Box at Bottom of Poster Card
    const listing = job?.listingInfo;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Playfair Display, serif';
    ctx.fillText(listing?.title || 'Bel Air Modern Sanctuary', pX + 24, divY + 34);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 15px sans-serif';
    const priceText = `${listing?.price || '$6,850,000'} • ${listing?.bedrooms || 5} Beds • ${listing?.bathrooms || 6} Baths • ${listing?.sqft ? listing.sqft.toLocaleString() + ' sqft' : '6,200 sqft'}`;
    ctx.fillText(priceText, pX + 24, divY + 58);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px sans-serif';
    ctx.fillText(listing?.address || '1200 Bel Air Road, Los Angeles, CA 90077', pX + 24, divY + 80);

    // Watermark Banner Top Right
    if (brandKit.showWatermark) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(canvas.width - 290, 15, 275, 28);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(brandKit.watermarkText || 'VERIFIED PROPERTY • UNMODIFIED', canvas.width - 280, 33);
    }
  };

  // Handle Playback & Animation Loop
  useEffect(() => {
    let startTime: number | null = null;
    const sceneDurationMs = 5000; // 5 seconds per scene

    const renderFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / sceneDurationMs, 1);

      setSceneProgress(progress * 100);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (isPosterScene) {
            // Draw Realtor Poster Cover Intro Scene
            drawPosterCover(ctx, canvas, progress);
          } else if (currentPhoto) {
            // Draw Regular Photo Camera Motion Scene
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = currentPhoto.url;

            if (img.complete) {
              ctx.save();

              let scale = 1.0;
              let translateX = 0;
              let translateY = 0;
              let rotateAngle = 0;

              const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
              const motion = currentPhoto.cameraMotion || 'Forward Dolly';

              if (motion === 'Forward Dolly') {
                scale = 1.0 + easeProgress * 0.14;
              } else if (motion === 'Push In') {
                scale = 1.0 + easeProgress * 0.18;
              } else if (motion === 'Slow Orbit') {
                scale = 1.1;
                translateX = Math.sin((easeProgress - 0.5) * Math.PI) * 35;
                translateY = Math.cos((easeProgress - 0.5) * Math.PI) * 10 - 10;
              } else if (motion === 'Slider Left to Right') {
                scale = 1.12;
                translateX = (0.5 - easeProgress) * 55;
              } else if (motion === 'Crane Down') {
                scale = 1.08 + easeProgress * 0.05;
                translateY = (0.5 - easeProgress) * 45;
              } else if (motion === 'Tilt Up') {
                scale = 1.1;
                translateY = (easeProgress - 0.5) * 45;
              } else if (motion === 'Reveal Pan') {
                scale = 1.12;
                translateX = (easeProgress - 0.5) * 45;
                rotateAngle = (easeProgress - 0.5) * 0.02;
              } else if (motion === 'Twilight Lighting Transition') {
                scale = 1.04 + easeProgress * 0.06;
              } else if (motion === 'High-Altitude Flyover') {
                scale = 1.16 - easeProgress * 0.1;
                translateX = (easeProgress - 0.5) * 30;
                translateY = (0.5 - easeProgress) * 20;
              } else if (motion === 'Low-Angle Glide') {
                scale = 1.02 + easeProgress * 0.16;
                translateY = easeProgress * 15;
              }

              const cx = canvas.width / 2;
              const cy = canvas.height / 2;

              ctx.translate(cx + translateX, cy + translateY);
              if (rotateAngle !== 0) ctx.rotate(rotateAngle);
              ctx.scale(scale, scale);
              ctx.translate(-cx, -cy);

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              ctx.restore();

              if (job?.style === 'twilight' || motion === 'Twilight Lighting Transition') {
                const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                grad.addColorStop(0, `rgba(15, 23, 42, ${0.15 + progress * 0.3})`);
                grad.addColorStop(0.5, `rgba(124, 45, 18, ${0.1 + progress * 0.2})`);
                grad.addColorStop(1, `rgba(15, 23, 42, ${0.2 + progress * 0.35})`);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = `rgba(251, 191, 36, ${0.08 + Math.sin(progress * Math.PI) * 0.15})`;
                ctx.fillRect(canvas.width * 0.25, canvas.height * 0.3, canvas.width * 0.5, canvas.height * 0.3);
              }

              const vignette = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.75
              );
              vignette.addColorStop(0, 'rgba(0,0,0,0)');
              vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
              ctx.fillStyle = vignette;
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              // Watermark Banner (Top Right)
              if (brandKit.showWatermark) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
                ctx.fillRect(canvas.width - 290, 15, 275, 28);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px sans-serif';
                ctx.fillText(brandKit.watermarkText || 'VERIFIED PROPERTY • UNMODIFIED', canvas.width - 280, 33);
              }

              // Lower-Third Agent Brand Overlay (Bottom)
              const ltHeight = canvas.height * 0.18;
              const ltY = canvas.height - ltHeight - 20;

              ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
              ctx.beginPath();
              ctx.roundRect(20, ltY, canvas.width - 40, ltHeight, 12);
              ctx.fill();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
              ctx.lineWidth = 1;
              ctx.stroke();

              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 18px Playfair Display, serif';
              ctx.fillText(brandKit.agentName || 'Elena Rostova', 40, ltY + 28);

              ctx.fillStyle = '#f59e0b';
              ctx.font = 'bold 13px sans-serif';
              ctx.fillText(job?.listingInfo?.title || 'Luxury Estate', 40, ltY + 48);

              ctx.fillStyle = '#a3a3a3';
              ctx.font = '12px sans-serif';
              ctx.fillText(`${job?.listingInfo?.price || '$6,850,000'} • Call ${brandKit.agentPhone}`, 40, ltY + 68);
            }
          }
        }
      }

      if (progress < 1 && isPlaying) {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      } else if (progress >= 1 && isPlaying) {
        startTime = null;
        if (currentSceneIndex < totalScenes - 1) {
          setCurrentSceneIndex((prev) => prev + 1);
        } else {
          setCurrentSceneIndex(0);
        }
      }
    };

    if (isPlaying) {
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch(() => {});
      }
      animationFrameRef.current = requestAnimationFrame(renderFrame);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentSceneIndex, currentPhoto, isMuted, brandKit, job, aspectRatio, isPosterScene, totalScenes]);

  useEffect(() => {
    if (!isPlaying && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (isPosterScene) {
          drawPosterCover(ctx, canvas, 0);
        } else if (currentPhoto) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = currentPhoto.url;
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const ltHeight = canvas.height * 0.18;
            const ltY = canvas.height - ltHeight - 20;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.beginPath();
            ctx.roundRect(20, ltY, canvas.width - 40, ltHeight, 12);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px Playfair Display, serif';
            ctx.fillText(brandKit.agentName || 'Elena Rostova', 40, ltY + 28);

            ctx.fillStyle = '#f59e0b';
            ctx.font = 'bold 13px sans-serif';
            ctx.fillText(job?.listingInfo?.title || 'Luxury Estate', 40, ltY + 48);

            ctx.fillStyle = '#a3a3a3';
            ctx.font = '12px sans-serif';
            ctx.fillText(`${job?.listingInfo?.price || '$6,850,000'} • Call ${brandKit.agentPhone}`, 40, ltY + 68);
          };
        }
      }
    }
  }, [currentPhoto, isPlaying, brandKit, job, isPosterScene]);

  const handleCopyCaption = (platform: 'instagram' | 'facebook' | 'linkedIn' | 'x') => {
    const text = job?.captions?.[platform] || '';
    navigator.clipboard.writeText(text);
    setCopiedCaptionTab(platform);
    setTimeout(() => setCopiedCaptionTab(null), 2000);
  };

  const handleDownloadVideo = () => {
    setIsExportingMedia(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${job?.listingInfo?.title || 'Property_Video'}_${job?.style || 'Tour'}.mp4`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
      setIsExportingMedia(false);
    }, 1500);
  };

  const handleDownloadPosterCover = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawPosterCover(ctx, canvas, 0);
        const link = document.createElement('a');
        link.download = `${job?.listingInfo?.title || 'Property'}_Realtor_Poster_Cover.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Audio Element */}
      <audio ref={audioRef} src={musicTrack.audioUrl} loop muted={isMuted} />

      {/* Progress Bar Header if Generating */}
      {isGenerating && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4 animate-pulse">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>{job?.currentStepMessage || 'Gemini Vision analyzing property photos & building Veo camera motions...'}</span>
            </span>
            <span className="text-white font-mono">{job?.progress || 45}%</span>
          </div>

          <div className="w-full h-3 bg-black rounded-full overflow-hidden p-0.5 border border-neutral-800">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${job?.progress || 45}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-wider pt-1 text-center">
            <span className={job?.progress && job.progress >= 20 ? 'text-white' : ''}>1. Vision Ranking</span>
            <span className={job?.progress && job.progress >= 45 ? 'text-white' : ''}>2. Veo Motion</span>
            <span className={job?.progress && job.progress >= 75 ? 'text-white' : ''}>3. Assembly</span>
            <span className={job?.progress && job.progress >= 95 ? 'text-white' : ''}>4. Export</span>
          </div>
        </div>
      )}

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Video Canvas Player */}
        <div className="lg:col-span-7 bg-black p-5 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center space-y-4">
          
          {/* Header Controls Above Canvas */}
          <div className="w-full flex items-center justify-between text-xs text-neutral-400 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <span className="font-bold text-white uppercase tracking-widest text-[10px]">
                {isPosterScene ? 'Realtor Poster Cover' : job?.style === 'tour' ? 'Cinematic Tour' : job?.style === 'drone' ? 'Drone Showcase' : 'Twilight Showcase'}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-neutral-400">
              <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded font-mono text-neutral-300">
                {aspectRatio} • HD 1080p
              </span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-white bg-neutral-900 rounded-md border border-neutral-800"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Surface */}
          <div className={`relative w-full ${dims.ratioClass} bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center`}>
            <canvas
              ref={canvasRef}
              width={dims.width}
              height={dims.height}
              className="w-full h-full object-contain"
            />

            {/* Play Overlay Button if Paused */}
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-black ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Playback Progress & Control Strip */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 bg-white text-black rounded-xl font-bold transition-all shadow-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
                </button>

                <div>
                  <span className="text-xs font-bold text-white block">
                    Scene {currentSceneIndex + 1} of {totalScenes}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {isPosterScene ? 'Realtor Opening Poster Cover' : `${currentPhoto?.sceneType} • ${currentPhoto?.cameraMotion}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] text-neutral-300 font-medium truncate max-w-[140px]">
                  {musicTrack.title}
                </span>
              </div>
            </div>

            {/* Scene progress bar */}
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{ width: `${sceneProgress}%` }}
              />
            </div>

            {/* Scene Thumbnails Strip with Realtor Poster Cover Entry */}
            <div className="flex items-center space-x-2 overflow-x-auto pt-1 pb-1">
              {hasPosterIntro && (
                <button
                  onClick={() => {
                    setCurrentSceneIndex(0);
                    setSceneProgress(0);
                  }}
                  className={`relative shrink-0 px-2.5 h-12 rounded-lg border transition-all flex items-center gap-2 bg-neutral-900 ${
                    currentSceneIndex === 0
                      ? 'border-2 border-amber-400 scale-105 shadow-lg bg-black'
                      : 'border-neutral-800 opacity-70 hover:opacity-100'
                  }`}
                  title="Realtor Poster Cover Intro"
                >
                  <img
                    src={brandKit.agentPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                    alt="Agent"
                    className="w-7 h-7 rounded-full object-cover border border-amber-400 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-amber-400 block uppercase tracking-wider">Cover</span>
                    <span className="text-[8px] text-neutral-400 font-mono">Poster</span>
                  </div>
                </button>
              )}

              {activePhotos.map((photo, idx) => {
                const sceneNum = hasPosterIntro ? idx + 1 : idx;
                const isSelected = currentSceneIndex === sceneNum;
                return (
                  <button
                    key={photo.id}
                    onClick={() => {
                      setCurrentSceneIndex(sceneNum);
                      setSceneProgress(0);
                    }}
                    className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border transition-all ${
                      isSelected
                        ? 'border-2 border-white scale-105 shadow-lg'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-0 right-0 bg-black/90 text-[8px] text-white font-bold px-1">
                      #{sceneNum + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Scene Veo AI Prompt Inspector */}
            {!isPosterScene && currentPhoto && (
              <div className="mt-3 bg-neutral-900/90 border border-neutral-800 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scene #{currentSceneIndex + 1} Veo 2.0 Motion Prompt</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 font-mono bg-black px-2 py-0.5 rounded border border-neutral-800">
                      Lens: {currentPhoto.focalLength || '24mm'} • {currentPhoto.motionSpeed || '0.5x'}
                    </span>
                    <button
                      onClick={() => {
                        const promptText = currentPhoto.veoPrompt || generateVeoPrompt(currentPhoto, job?.listingInfo, job?.style);
                        navigator.clipboard.writeText(promptText);
                        setCopiedCurrentVeoPrompt(true);
                        setTimeout(() => setCopiedCurrentVeoPrompt(false), 2000);
                      }}
                      className="px-2 py-1 bg-white hover:bg-neutral-200 text-black rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      title="Copy Veo prompt for video AI generator"
                    >
                      {copiedCurrentVeoPrompt ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-300 font-mono bg-black p-2.5 rounded-lg border border-neutral-850 leading-relaxed italic">
                  "{currentPhoto.veoPrompt || generateVeoPrompt(currentPhoto, job?.listingInfo, job?.style)}"
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Actions & Social Captions Panel */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Quick Download & Share Box */}
          <div className="bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white">Export & Studio Assets</h3>
                <p className="text-xs text-neutral-400">Branded with {brandKit.agentName}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                Ready in HD
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadVideo}
                disabled={isExportingMedia}
                className="w-full py-3.5 px-4 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {isExportingMedia ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rendering MP4 Video File...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Branded Video (MP4)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadPosterCover}
                className="w-full py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Download Realtor Poster Cover (JPG)</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedShareLink(true);
                    setTimeout(() => setCopiedShareLink(false), 2000);
                  }}
                  className="py-2.5 px-3 bg-black hover:bg-neutral-800 text-neutral-200 border border-neutral-800 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedShareLink ? 'Copied' : 'Share'}</span>
                </button>

                <button
                  onClick={() => {
                    const msg = `Check out this listing video for ${job?.listingInfo?.title || 'our property'}`;
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(msg)}`);
                  }}
                  className="py-2.5 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </button>

                <button
                  onClick={() => {
                    const msg = `Listing Video for ${job?.listingInfo?.title || 'Property'}: ${window.location.href}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
                  }}
                  className="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Generated Social Captions Tabs */}
          <div className="bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0.5">
                  AI Marketing Copy
                </h3>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Social Media Captions</span>
                </h2>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono uppercase">Gemini 2.5</span>
            </div>

            {/* Platform Selector Buttons */}
            <div className="flex space-x-1 bg-black p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setActiveCaptionPlatform('instagram')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1 transition-all ${
                  activeCaptionPlatform === 'instagram' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </button>

              <button
                onClick={() => setActiveCaptionPlatform('linkedIn')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1 transition-all ${
                  activeCaptionPlatform === 'linkedIn' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </button>

              <button
                onClick={() => setActiveCaptionPlatform('facebook')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1 transition-all ${
                  activeCaptionPlatform === 'facebook' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </button>
            </div>

            {/* Caption Text Box */}
            <div className="relative bg-black p-4 rounded-xl border border-neutral-800 text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {job?.captions?.[activeCaptionPlatform] || 'Loading AI caption...'}

              <button
                onClick={() => handleCopyCaption(activeCaptionPlatform)}
                className="absolute top-2 right-2 p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg border border-neutral-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                title="Copy Caption"
              >
                {copiedCaptionTab === activeCaptionPlatform ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

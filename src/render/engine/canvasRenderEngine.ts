import { AspectRatio, VideoScene, BrandKit, PropertyListingInfo } from '@/types/domain';
import { calculateMotionTransform } from '../motion/motionAlgorithms';
import { drawPosterIntroCover } from '../overlays/posterIntroRenderer';
import { drawLowerThirdBrandOverlay } from '../overlays/brandOverlayRenderer';

export interface CanvasEngineOptions {
  aspectRatio: AspectRatio;
  listingInfo: PropertyListingInfo;
  brandKit: BrandKit;
  scenes: VideoScene[];
}

export class CanvasRenderEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: CanvasEngineOptions;
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement, options: CanvasEngineOptions) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not acquire 2D canvas context');
    this.ctx = context;
    this.options = options;
    this.setResolutionByAspectRatio(options.aspectRatio);
  }

  public setResolutionByAspectRatio(aspectRatio: AspectRatio): void {
    switch (aspectRatio) {
      case '9:16':
        this.canvas.width = 540;
        this.canvas.height = 960;
        break;
      case '1:1':
        this.canvas.width = 720;
        this.canvas.height = 720;
        break;
      case '16:9':
      default:
        this.canvas.width = 960;
        this.canvas.height = 540;
        break;
    }
  }

  public updateOptions(newOptions: Partial<CanvasEngineOptions>): void {
    this.options = { ...this.options, ...newOptions };
    if (newOptions.aspectRatio) {
      this.setResolutionByAspectRatio(newOptions.aspectRatio);
    }
  }

  public preloadImages(): void {
    this.options.scenes.forEach((scene) => {
      if (!this.imageCache.has(scene.imageUrl)) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = scene.imageUrl;
        this.imageCache.set(scene.imageUrl, img);
      }
    });
  }

  public renderFrame(sceneIndex: number, progress: number): void {
    const { width, height } = this.canvas;
    const { scenes, brandKit, listingInfo } = this.options;
    const hasPosterIntro = brandKit.enablePosterIntro ?? true;

    // Clear Canvas
    this.ctx.clearRect(0, 0, width, height);

    // Check if drawing Opening Poster Intro Cover Slide
    if (hasPosterIntro && sceneIndex === 0) {
      const bgImg = this.imageCache.get(scenes[0]?.imageUrl || '');
      drawPosterIntroCover(this.ctx, this.canvas, progress, bgImg || null, listingInfo, brandKit);
      return;
    }

    const photoIdx = hasPosterIntro ? sceneIndex - 1 : sceneIndex;
    const currentScene = scenes[photoIdx] || scenes[0];
    if (!currentScene) return;

    const img = this.imageCache.get(currentScene.imageUrl);

    // Render 3D Motion Trajectory Transform
    this.ctx.save();
    if (img && img.complete) {
      const transform = calculateMotionTransform(currentScene.cameraMotion, progress, width, height);
      
      const w = width * transform.scale;
      const h = height * transform.scale;
      const x = (width - w) / 2 + transform.offsetX;
      const y = (height - h) / 2 + transform.offsetY;

      this.ctx.globalAlpha = transform.opacity;
      this.ctx.drawImage(img, x, y, w, h);
    } else {
      this.ctx.fillStyle = '#090A0F';
      this.ctx.fillRect(0, 0, width, height);
    }
    this.ctx.restore();

    // Render Lower-Third Agent Branding & Watermark Overlays
    drawLowerThirdBrandOverlay(this.ctx, this.canvas, brandKit, currentScene.title);
  }

  public stop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

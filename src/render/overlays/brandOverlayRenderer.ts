import { BrandKit } from '@/types/domain';

export function drawLowerThirdBrandOverlay(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  brandKit: BrandKit,
  sceneTitle: string
): void {
  const { width, height } = canvas;

  ctx.save();

  // 1. Scene Title Badge (Top Left)
  ctx.fillStyle = 'rgba(9, 10, 15, 0.85)';
  ctx.fillRect(20, 20, 220, 36);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, 220, 36);

  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 11px monospace';
  ctx.fillText(sceneTitle.toUpperCase(), 32, 42);

  // 2. Lower-Third Agent Branding Bar (Bottom Left)
  const barY = height - 90;
  ctx.fillStyle = 'rgba(18, 20, 28, 0.90)';
  ctx.fillRect(20, barY, 340, 60);

  // Gold Accent Left Border Line
  ctx.fillStyle = brandKit.brandColor || '#D4AF37';
  ctx.fillRect(20, barY, 4, 60);

  // Agent Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText(brandKit.agentName || 'Ritish Agent', 36, barY + 22);

  // Brokerage & Contact
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '11px sans-serif';
  ctx.fillText(`${brandKit.brokerageName || 'Montecito Luxury'} · ${brandKit.agentPhone || '(805) 555-0199'}`, 36, barY + 44);

  // 3. Optional Watermark Text (Top Right)
  if (brandKit.showWatermark && brandKit.watermarkText) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(brandKit.watermarkText, width - 20, 30);
  }

  ctx.restore();
}

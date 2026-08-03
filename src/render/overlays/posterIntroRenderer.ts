import { BrandKit, PropertyListingInfo } from '@/types/domain';

export function drawPosterIntroCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  progress: number,
  bgImage: HTMLImageElement | null,
  listingInfo: PropertyListingInfo,
  brandKit: BrandKit
): void {
  const { width, height } = canvas;
  const p = Math.max(0, Math.min(1, progress));

  // 1. Draw Background Image with subtle slow zoom
  ctx.save();
  if (bgImage && bgImage.complete) {
    const scale = 1.0 + 0.08 * p;
    const w = width * scale;
    const h = height * scale;
    const x = (width - w) / 2;
    const y = (height - h) / 2;
    ctx.drawImage(bgImage, x, y, w, h);
  } else {
    ctx.fillStyle = '#090A0F';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();

  // 2. Overlay Vignette / Dark Background Mask
  ctx.fillStyle = 'rgba(9, 10, 15, 0.75)';
  ctx.fillRect(0, 0, width, height);

  // 3. Draw Poster Theme Overlays
  const style = brandKit.posterStyle || 'modern_gold';

  if (style === 'modern_gold') {
    // Dual Gold Border Frame
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, width - 56, height - 56);
  } else if (style === 'glassmorphism') {
    // Glass Container Box
    const boxW = width * 0.85;
    const boxH = height * 0.60;
    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2;

    ctx.fillStyle = 'rgba(18, 20, 28, 0.85)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxX, boxY, boxW, boxH);
  }

  // 4. Draw Typography & Property Metadata
  ctx.save();
  ctx.textAlign = 'center';

  // Subtitle / Badge
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('EXCLUSIVE REAL ESTATE SHOWCASE', width / 2, height / 2 - 70);

  // Property Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px serif';
  ctx.fillText(listingInfo.title || 'Montecito Coastal Estate', width / 2, height / 2 - 20);

  // Address
  ctx.fillStyle = '#D1D5DB';
  ctx.font = '14px sans-serif';
  ctx.fillText(listingInfo.address || '742 Sycamore Canyon Rd, Montecito CA', width / 2, height / 2 + 15);

  // Price & Specs Pill
  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(listingInfo.price || '$8,950,000', width / 2, height / 2 + 50);

  // Agent / Brokerage Footer Line
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '12px sans-serif';
  ctx.fillText(`Presented by ${brandKit.agentName} | ${brandKit.brokerageName}`, width / 2, height / 2 + 90);

  ctx.restore();
}

import { PIPLayoutConfig } from '../types/domain';

export function renderPIPOverlayOnCanvas(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  pipImage: HTMLImageElement | null,
  config: PIPLayoutConfig,
  progress: number // 0 to 1 completion
): void {
  if (!config.enabled || !pipImage) return;

  const scaleFactor = (config.scalePercentage || 25) / 100;
  const cardW = canvasWidth * scaleFactor;
  const cardH = cardW * 0.75; // 4:3 aspect ratio

  // Subtle floating scale effect for PIP foreground
  const floatingScale = 1.0 + Math.sin(progress * Math.PI) * 0.05;
  const currentW = cardW * floatingScale;
  const currentH = cardH * floatingScale;

  ctx.save();

  switch (config.style) {
    case 'glass_card': {
      const x = canvasWidth - currentW - 24;
      const y = canvasHeight - currentH - 80;

      // Glassmorphism background box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - 8, y - 8, currentW + 16, currentH + 16, 16);
      ctx.fill();
      ctx.stroke();

      // Floating photo draw
      ctx.drawImage(pipImage, x, y, currentW, currentH);
      break;
    }

    case 'magazine': {
      const x = 24;
      const y = canvasHeight - currentH - 60;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(x - 6, y - 24, currentW + 12, currentH + 30, 8);
      ctx.fill();

      // Magazine Header
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('ARCHITECTURAL DIGEST', x, y - 8);

      ctx.drawImage(pipImage, x, y, currentW, currentH);
      break;
    }

    case 'blueprint': {
      const x = canvasWidth - currentW - 24;
      const y = 80;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x - 10, y - 10, currentW + 20, currentH + 20, 12);
      ctx.fill();
      ctx.stroke();

      ctx.drawImage(pipImage, x, y, currentW, currentH);
      break;
    }

    case 'animated_polaroid': {
      const x = 32;
      const y = 90;

      ctx.translate(x + currentW / 2, y + currentH / 2);
      ctx.rotate((-4 * Math.PI) / 180); // 4 degree tilt

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-currentW / 2 - 10, -currentH / 2 - 10, currentW + 20, currentH + 40);

      ctx.drawImage(pipImage, -currentW / 2, -currentH / 2, currentW, currentH);

      ctx.fillStyle = '#333333';
      ctx.font = 'italic 11px sans-serif';
      ctx.fillText('Key Feature View', -currentW / 2 + 8, currentH / 2 + 20);
      break;
    }

    default: {
      // Default Corner Card
      const x = canvasWidth - currentW - 24;
      const y = canvasHeight - currentH - 60;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - 6, y - 6, currentW + 12, currentH + 12, 12);
      ctx.fill();
      ctx.stroke();

      ctx.drawImage(pipImage, x, y, currentW, currentH);
      break;
    }
  }

  ctx.restore();
}

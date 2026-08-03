/**
 * HOUZSTUDIO AI - DESIGN TOKENS
 * Apple Pro Minimalist Dark Graphite Design System Specifications
 */

export const DESIGN_TOKENS = {
  colors: {
    bgCanvas: '#090A0F',
    surfaceElevated: '#12141C',
    surfaceCard: 'rgba(18, 20, 28, 0.75)',
    surfaceHover: 'rgba(255, 255, 255, 0.04)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderActive: 'rgba(255, 255, 255, 0.18)',
    luxuryGold: '#D4AF37',
    luxuryBlue: '#3B82F6',
    electricBlue: '#60A5FA',
    emeraldSuccess: '#10B981',
    amberWarning: '#F59E0B',
    roseError: '#F43F5E',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
  },
  typography: {
    fontFamilySans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilySerif: '"Playfair Display", Georgia, Cambria, serif',
    fontFamilyMono: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    massive: '64px',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  animation: {
    curveApple: 'cubic-bezier(0.16, 1, 0.3, 1)',
    durationFast: '150ms',
    durationNormal: '250ms',
    durationSlow: '400ms',
  },
  glassmorphism: {
    backdropBlur: 'blur(16px)',
    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
  },
} as const;

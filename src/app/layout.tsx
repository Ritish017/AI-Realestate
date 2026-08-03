import React from 'react';
import type { Metadata } from 'next';
import { AppProviders } from '../providers/AppProviders';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'HouzStudio AI - World\'s Best Real Estate AI Marketing Studio',
  description: 'Automated real estate video production & multi-channel marketing platform powered by Google Gemini Vision & Veo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090A0F] text-neutral-100 antialiased selection:bg-white selection:text-black">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

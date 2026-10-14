import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { CursorBalloonProvider } from '@/components/CursorBalloonProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { InfoPanelProvider } from '@/context/InfoPanelContext';
import { IntroProvider } from '@/context/IntroContext';
import { BrandBar } from '@/components/BrandBar';
import { IntroOverlay } from '@/components/IntroOverlay';
import { InfoPanel } from '@/components/InfoPanel';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Boc.Studio — Creative brand studio in Barcelona',
  description:
    'A Barcelona creative brand studio. We create, refresh and boost brands through identity, creative direction, motion design and AI production.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" type="image/png" />
      </head>
      <body className="min-h-screen bg-boc-canvas text-boc-text-on-canvas selection:bg-boc-orange selection:text-black">
        <LanguageProvider>
          <IntroProvider>
            <InfoPanelProvider>
              <CursorBalloonProvider>
                <LenisProvider>
                  <IntroOverlay />
                  <BrandBar />
                  <InfoPanel variant="drawer" />
                  <main className="min-h-[calc(100vh-120px)] w-full">
                    {children}
                  </main>
                  <Footer />
                </LenisProvider>
              </CursorBalloonProvider>
            </InfoPanelProvider>
          </IntroProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

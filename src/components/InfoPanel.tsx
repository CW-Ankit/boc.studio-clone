'use client';

import React from 'react';
import Link from 'next/link';
import { useInfoPanel } from '@/context/InfoPanelContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCursorBalloon } from './CursorBalloonProvider';
import studioData from '@/data/studio.json';

interface InfoPanelProps {
  variant?: 'drawer' | 'page';
}

export function InfoPanel({ variant = 'drawer' }: InfoPanelProps) {
  const { isOpen, close } = useInfoPanel();
  const { t } = useLanguage();
  const { flash } = useCursorBalloon();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = studioData.getInTouch?.inquiryEmail || 'hola@boc.studio';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        flash(t('common', 'emailCopied', 'Email copied'), { x: e.clientX, y: e.clientY });
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  if (variant === 'drawer' && !isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Information"
      className={
        variant === 'drawer'
          ? 'fixed inset-0 z-[80] overflow-y-auto bg-boc-orange text-black p-[20px] lg:p-[40px] animate-in fade-in duration-300'
          : 'w-full min-h-screen bg-boc-orange text-black p-[20px] lg:p-[40px]'
      }
    >
      <div className="max-w-[1400px] mx-auto flex flex-col justify-between min-h-full">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-[40px] border-b border-black/15">
          <div className="text-[13px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
            {t('info', 'title', 'Info')}
          </div>
          {variant === 'drawer' && (
            <button
              type="button"
              onClick={close}
              className="text-[13px] uppercase tracking-[0.04em] font-semibold text-black hover:opacity-70 transition-opacity cursor-pointer"
            >
              {t('common', 'close', 'CLOSE')} ✕
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[40px] lg:gap-[80px] py-[40px]">
          {/* Left Column: Manifesto */}
          <div className="flex flex-col gap-[30px]">
            <h2 className="text-[clamp(24px,2rem+1vw,42px)] font-normal tracking-[-0.02em] leading-[1.15]">
              Boc.Studio is a creative brand studio co-led by{' '}
              <span className="font-semibold underline decoration-black/40">Jordi Canals</span> and{' '}
              <span className="font-semibold underline decoration-black/40">Oriol Bada</span> with a focus on{' '}
              <Link href="/create" onClick={close} className="underline decoration-black hover:text-white transition-colors">
                creating
              </Link>
              ,{' '}
              <Link href="/refresh" onClick={close} className="underline decoration-black hover:text-white transition-colors">
                refreshing
              </Link>{' '}
              and{' '}
              <Link href="/boost" onClick={close} className="underline decoration-black hover:text-white transition-colors">
                boosting
              </Link>{' '}
              brands and aesthetics.
            </h2>

            <p className="text-[16px] lg:text-[18px] text-black/85 leading-relaxed max-w-[650px]">
              We are driven by a constant curious attitude and rooted in pragmatism to bridge the gap between what brands are and what they aspire to be. Through new tech and creativity we push brand identities, campaigns and visual systems with utilitarian impact.
            </p>

            {/* Quick Packages Links */}
            <div className="flex flex-wrap gap-[15px] pt-[15px]">
              <Link
                href="/create"
                onClick={close}
                className="rounded-full border border-black/30 px-[16px] py-[8px] text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-all"
              >
                Package: Create ↗
              </Link>
              <Link
                href="/refresh"
                onClick={close}
                className="rounded-full border border-black/30 px-[16px] py-[8px] text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-all"
              >
                Package: Refresh ↗
              </Link>
              <Link
                href="/boost"
                onClick={close}
                className="rounded-full border border-black/30 px-[16px] py-[8px] text-[13px] uppercase font-medium hover:bg-black hover:text-white transition-all"
              >
                Package: Boost ↗
              </Link>
            </div>
          </div>

          {/* Right Column: Capabilities, Clients, Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[40px] text-[14px]">
            {/* Services */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[12px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
                {t('info', 'services', 'Services')}
              </h3>
              <ul className="flex flex-col gap-[6px] text-black/90">
                {studioData.services.map((svc) => (
                  <li key={svc}>{svc}</li>
                ))}
              </ul>
            </div>

            {/* Selected Clients */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[12px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
                {t('info', 'selectedClients', 'Selected clients')}
              </h3>
              <ul className="flex flex-col gap-[6px] text-black/90">
                {studioData.selectedClients.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </ul>
            </div>

            {/* Inquiries */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[12px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
                {t('info', 'inquiries', 'Inquiries:')}
              </h3>
              <a
                href={`mailto:${studioData.getInTouch.inquiryEmail}`}
                onClick={handleCopyEmail}
                className="underline underline-offset-4 font-medium hover:opacity-70 transition-opacity"
              >
                {studioData.getInTouch.inquiryEmail}
              </a>
              <div className="flex items-center gap-[12px] pt-[6px]">
                <a
                  href={studioData.getInTouch.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Instagram ↗
                </a>
                <a
                  href={studioData.getInTouch.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[12px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
                {t('info', 'address', 'Address:')}
              </h3>
              <p className="text-black/90">
                {studioData.getInTouch.address.street}
                <br />
                {studioData.getInTouch.address.postcode}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Ecosystem */}
        <div className="pt-[30px] border-t border-black/15 flex flex-wrap items-center justify-between gap-[15px] text-[12px] text-black/70">
          <div className="flex items-center gap-[20px]">
            <span className="uppercase font-semibold text-boc-info-label">
              {t('info', 'broaderEcosystem', 'Broader ecosystem')}:
            </span>
            {studioData.broaderEcosystem.map((eco) => (
              <a
                key={eco._key}
                href={eco.url}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-black"
              >
                {eco.label} ↗
              </a>
            ))}
          </div>
          <div>© {new Date().getFullYear()} Boc.Studio. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}

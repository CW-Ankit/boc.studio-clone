'use client';

import React from 'react';
import Link from 'next/link';
import { getAssetUrl } from '@/lib/assets';

export interface MarqueeTile {
  image?: {
    asset?: {
      url?: string;
      metadata?: {
        dimensions?: {
          aspectRatio?: number;
          width?: number;
          height?: number;
        };
      };
    };
  };
  videoPlaybackId?: string | null;
}

interface ProjectMarqueeStripProps {
  tiles: MarqueeTile[];
  href: string;
  title: string;
  height?: number;
  priority?: boolean;
}

export function ProjectMarqueeStrip({
  tiles,
  href,
  title,
  height = 188,
  priority = false,
}: ProjectMarqueeStripProps) {
  const validTiles = tiles.filter((t) => t?.image?.asset?.url);
  if (validTiles.length === 0) return null;

  // Duplicate tiles to allow seamless loop
  const duplicatedTiles = [...validTiles, ...validTiles];

  return (
    <Link
      href={href}
      className="group block relative w-full overflow-hidden select-none"
      style={{ height: `${height}px` }}
      aria-label={`View case study: ${title}`}
    >
      <div className="boc-list-marquee flex items-center gap-[15px] w-max h-full">
        {duplicatedTiles.map((tile, idx) => {
          const rawUrl = tile.image?.asset?.url;
          const localUrl = getAssetUrl(rawUrl);
          const aspect = tile.image?.asset?.metadata?.dimensions?.aspectRatio || 1.77;
          const tileWidth = Math.round(height * aspect);

          return (
            <div
              key={idx}
              className="relative shrink-0 overflow-hidden bg-boc-offblack transition-opacity duration-300 group-hover:opacity-95"
              style={{
                width: `${tileWidth}px`,
                height: `${height}px`,
              }}
            >
              {localUrl ? (
                <img
                  src={localUrl}
                  alt={`${title} visual ${idx + 1}`}
                  loading={priority && idx < 4 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </Link>
  );
}

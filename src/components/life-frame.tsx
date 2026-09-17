"use client";

import { SteamEffect } from "@/components/hero/steam-effect";
import { assetPath } from "@/lib/site";

type LifeFrameProps = {
  src: string;
  alt: string;
  className?: string;
  steam?: boolean;
};

export function LifeFrame({ src, alt, className, steam = false }: LifeFrameProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assetPath(src)} alt={alt} className="life-pan h-full w-full object-cover" />
      {steam ? (
        <div className="pointer-events-none absolute inset-x-[18%] bottom-[28%] flex justify-center opacity-80">
          <SteamEffect width={140} height={200} opacity={0.45} />
        </div>
      ) : null}
    </div>
  );
}

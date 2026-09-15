"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

type LocationActionsProps = {
  directionsLabel: string;
  copyLabel: string;
  copiedLabel: string;
};

export function LocationActions({
  directionsLabel,
  copyLabel,
  copiedLabel,
}: LocationActionsProps) {
  const [copied, setCopied] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.street);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 border border-gold/50 bg-green-mid/40 px-6 py-3 text-xs tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-green"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{directionsLabel}</span>
      </a>

      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center gap-2 border border-gold/20 px-5 py-3 text-xs tracking-[0.14em] text-gold-muted transition-colors hover:border-gold/50 hover:text-gold"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        <span>{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}

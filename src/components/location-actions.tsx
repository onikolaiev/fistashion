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
      await navigator.clipboard.writeText(SITE.fullAddress);
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
        className="inline-flex items-center gap-2 rounded-full bg-green px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream-pure shadow-md transition-all hover:bg-green-mid hover:shadow-lg"
      >
        <svg
          className="h-4 w-4 text-gold-light"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
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
        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream-soft px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition-all hover:border-gold hover:bg-gold-pale/40"
      >
        <svg
          className="h-4 w-4 text-gold-dark"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span>{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}

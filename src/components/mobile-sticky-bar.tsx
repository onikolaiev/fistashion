"use client";

import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site";

export function MobileStickyBar() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");

  return (
    <aside
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-cream-pure/90 px-4 py-2.5 shadow-2xl backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-around gap-2">
        <a
          href="#menu"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-charcoal transition-colors hover:text-green"
        >
          <span className="text-base" aria-hidden="true">📋</span>
          <span>{tNav("menu")}</span>
        </a>

        <a
          href="#location"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-charcoal transition-colors hover:text-green"
        >
          <span className="text-base" aria-hidden="true">📍</span>
          <span>{tNav("location")}</span>
        </a>

        <a
          href={SITE.phoneHref}
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-charcoal transition-colors hover:text-green"
        >
          <span className="text-base" aria-hidden="true">📞</span>
          <span>{tNav("contact")}</span>
        </a>

        <a
          href="#franchise"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-green px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-cream-pure shadow-sm transition-all hover:bg-green-mid"
        >
          <span className="text-base" aria-hidden="true">🤝</span>
          <span>{tHero("ctaFranchise")}</span>
        </a>
      </div>
    </aside>
  );
}

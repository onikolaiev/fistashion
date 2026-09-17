"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const LABELS: Record<AppLocale, string> = {
  ar: "العربية",
  en: "EN",
  ru: "RU",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language selection"
      className="flex items-center gap-1.5 rounded-full border border-gold/25 bg-cream-soft/70 px-2.5 py-1 text-xs tracking-wider backdrop-blur-xs"
    >
      {routing.locales.map((code, index) => {
        const isActive = locale === code;
        return (
          <span key={code} className="flex items-center">
            {index > 0 ? (
              <span className="mx-1 text-[10px] text-gold/40" aria-hidden="true">
                •
              </span>
            ) : null}
            <Link
              href={pathname}
              locale={code}
              className={`px-1.5 py-0.5 text-[11px] font-medium transition-colors ${
                isActive
                  ? "rounded-full bg-green text-cream font-semibold"
                  : "text-charcoal-muted hover:text-green"
              }`}
            >
              {LABELS[code]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

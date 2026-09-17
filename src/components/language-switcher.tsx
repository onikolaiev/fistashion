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
    <nav aria-label="Language selection" className="flex items-center gap-2 text-[11px] tracking-[0.14em]">
      {routing.locales.map((code) => {
        const isActive = locale === code;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            className={`uppercase transition-colors ${
              isActive ? "text-cream" : "text-cream/45 hover:text-cream"
            }`}
          >
            {LABELS[code]}
          </Link>
        );
      })}
    </nav>
  );
}

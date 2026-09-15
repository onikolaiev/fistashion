"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const LABELS: Record<AppLocale, string> = {
  ar: "AR",
  en: "EN",
  ru: "RU",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label="Language" className="flex items-center gap-2 text-xs tracking-[0.12em]">
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 ? (
            <span className="text-gold-muted/50" aria-hidden="true">
              |
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={code}
            className={
              locale === code
                ? "text-gold"
                : "text-gold-muted/70 transition-colors hover:text-gold"
            }
          >
            {LABELS[code]}
          </Link>
        </span>
      ))}
    </nav>
  );
}

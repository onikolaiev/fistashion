import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";

const NAV_ITEMS = [
  { href: "#about", key: "about" },
  { href: "#menu", key: "menu" },
  { href: "#experience", key: "experience" },
  { href: "#location", key: "location" },
  { href: "#franchise", key: "franchise" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <>
      {/* Skip to Content for Accessibility (WCAG 2.1 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:border-gold focus:bg-green focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-cream-pure focus:shadow-2xl focus:outline-hidden"
      >
        {t("skipToContent")}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-cream-pure/85 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
          {/* Brand logo & lockup */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-opacity hover:opacity-85"
            aria-label="Fistashion The Bakery House"
          >
            <Logo variant="mark" className="h-8 w-8 object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold uppercase tracking-[0.16em] text-green md:text-lg">
                FISTASHION
              </span>
              <span className="hidden text-[9px] uppercase tracking-[0.24em] text-charcoal-muted sm:inline">
                The Bakery House
              </span>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.16em] text-charcoal-muted transition-colors hover:text-green focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-gold"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Right side: Language switcher + Primary CTA */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="#location"
              className="hidden rounded-full border border-green/20 bg-green px-5 py-2 text-xs font-semibold tracking-[0.12em] text-cream-pure shadow-xs transition-all hover:bg-green-mid hover:shadow-md sm:inline-block"
            >
              {t("location")}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

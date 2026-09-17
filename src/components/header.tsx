import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";

const NAV_ITEMS = [
  { href: "#menu", key: "menu" },
  { href: "#space", key: "space" },
  { href: "#visit", key: "visit" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-green focus:outline-hidden"
      >
        {t("skipToContent")}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 bg-green/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
          <a
            href="#top"
            className="font-serif text-lg tracking-[0.14em] text-cream uppercase"
            aria-label="Fistashion The Bakery House"
          >
            FISTASHION
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-cream"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="rounded-full bg-cream px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-green transition-opacity hover:opacity-85"
            >
              {t("contact")}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

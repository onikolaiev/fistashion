import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const NAV_ITEMS = [
  { href: "#about", key: "about" },
  { href: "#offerings", key: "offerings" },
  { href: "#location", key: "location" },
  { href: "#franchise", key: "franchise" },
  { href: "#contact", key: "contact" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/10 bg-green/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-12">
        <a href="#top" className="flex items-center gap-3 text-gold">
          <Logo variant="mark" />
          <span className="hidden font-sans text-xs tracking-[0.2em] sm:inline">
            {SITE.brand.toUpperCase()}
          </span>
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs text-gold-muted transition-colors hover:text-gold"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

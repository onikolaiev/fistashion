import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="border-t border-cream/10 bg-green px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-[0.14em] text-cream uppercase">FISTASHION</p>
          <p className="mt-2 text-sm text-cream/55">{t("line")}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/65">
            <a href={SITE.phoneHref} className="hover:text-yellow transition-colors" dir="ltr">
              {SITE.phoneDisplay}
            </a>
            <span className="text-cream/30">·</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-yellow transition-colors">
              {SITE.email}
            </a>
            <span className="text-cream/30">·</span>
            <a
              href={SITE.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow transition-colors"
            >
              @{SITE.instagram.toLowerCase()}
            </a>
          </div>
        </div>
        <nav className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.18em] text-cream/70">
          <a href="#menu">{tNav("menu")}</a>
          <a href="#space">{tNav("about")}</a>
          <a href="#visit">{tNav("location")}</a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-cream/40">
        © {new Date().getFullYear()} {SITE.brand}. {t("rights")}
      </p>
    </footer>
  );
}

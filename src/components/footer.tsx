import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer
      id="contact"
      className="border-t border-gold/10 bg-green-deep px-6 py-16 md:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-sans text-xs tracking-[0.2em] text-gold">
            {SITE.brand.toUpperCase()}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-gold-muted">
            {SITE.street}
            <br />
            {SITE.city}
          </p>
          <p className="mt-6 text-xs tracking-[0.18em] text-gold-muted/70">
            {t("rights")}
          </p>
        </div>
        <ul className="space-y-3 text-sm text-gold">
          <li>
            <a
              href={`mailto:${SITE.email}`}
              className="transition-colors hover:text-gold-muted"
            >
              {SITE.email}
            </a>
          </li>
          <li>
            <a
              href={SITE.phoneHref}
              className="transition-colors hover:text-gold-muted"
            >
              {SITE.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={SITE.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold-muted"
            >
              @{SITE.instagram}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

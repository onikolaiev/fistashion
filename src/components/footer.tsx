import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Google Maps", href: `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}` },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer id="contact" className="border-t border-gold/20 bg-cream-soft px-6 pt-20 pb-28 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Logo variant="lockup" theme="dark" />
            <p className="font-arabic text-xl text-green-mid">
              فيستاشيون — دار المخبوزات والقهوة المختصة
            </p>
            <p className="text-sm leading-relaxed text-charcoal-muted">
              {t("rights")}
            </p>
          </div>

          {/* Col 2: Location */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold">
              Location
            </h3>
            <p className="text-sm leading-relaxed text-charcoal">
              {SITE.street}
            </p>
            <p className="text-xs text-charcoal-muted">
              Kingdom of Saudi Arabia
            </p>
            <a
              href={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block pt-1 text-xs font-semibold text-green underline decoration-gold underline-offset-4 hover:text-green-mid"
            >
              Get Directions &rarr;
            </a>
          </div>

          {/* Col 3: Hours & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold">
              Hours & Contact
            </h3>
            <p className="text-sm text-charcoal">
              Daily: 07:00 AM – 12:00 Midnight
            </p>
            <div className="pt-2 text-xs text-charcoal-muted space-y-1">
              <p>Email: <a href={`mailto:${SITE.email}`} className="text-green hover:underline">{SITE.email}</a></p>
              <p>Phone: <a href={SITE.phoneHref} className="text-green hover:underline">{SITE.phoneDisplay}</a></p>
            </div>
          </div>

          {/* Col 4: Connect */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold">
              Connect
            </h3>
            <ul className="space-y-2 text-xs">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-green inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/15 pt-8 text-xs text-charcoal-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.brand}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-green">About</a>
            <a href="#menu" className="hover:text-green">Menu</a>
            <a href="#location" className="hover:text-green">Location</a>
            <a href="#franchise" className="hover:text-green">Franchise</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

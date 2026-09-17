import { getTranslations } from "next-intl/server";
import { LocationActions } from "@/components/location-actions";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SITE } from "@/lib/site";

export async function Location() {
  const t = await getTranslations("location");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&z=16&output=embed`;

  return (
    <Section id="location" className="bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Details */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream-soft px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                {t("badge")}
              </div>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-green sm:text-5xl">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-muted">
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
              </div>

              {/* Address card */}
              <div className="mt-8 rounded-3xl border border-gold/30 bg-cream-soft p-7 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold">
                  {t("addressTitle")}
                </p>
                <p className="mt-1 font-serif text-xl font-medium text-green">
                  {SITE.street}
                </p>
                <p className="mt-0.5 text-xs text-charcoal-muted">
                  Kingdom of Saudi Arabia
                </p>
                
                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gold/20 pt-5 sm:grid-cols-2 text-xs text-charcoal-muted">
                  <div>
                    <span className="block font-semibold text-charcoal">{t("hoursTitle")}:</span>
                    <span>{t("hoursValue")}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-charcoal">{t("serviceTitle")}:</span>
                    <span>{t("serviceValue")}</span>
                  </div>
                </div>
              </div>

              <LocationActions
                directionsLabel={t("directions")}
                copyLabel={t("copy")}
                copiedLabel={t("copied")}
              />
            </Reveal>
          </div>

          {/* Right Map in Gold Frame */}
          <div className="lg:col-span-6">
            <Reveal variant="media" delayMs={180}>
              <div className="relative overflow-hidden rounded-3xl border-2 border-gold/30 bg-cream-pure p-2.5 shadow-2xl">
                <div className="overflow-hidden rounded-2xl">
                  <iframe
                    title={SITE.street}
                    src={mapSrc}
                    className="h-80 w-full md:h-[30rem]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </Section>
  );
}

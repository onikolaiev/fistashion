import { getTranslations } from "next-intl/server";
import { LocationActions } from "@/components/location-actions";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SITE } from "@/lib/site";

export async function Location() {
  const t = await getTranslations("location");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&z=16&output=embed`;

  return (
    <Section id="location">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="text-4xl text-gold md:text-6xl">{t("title")}</h2>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-8 text-base leading-8 text-gold-muted">{t("p1")}</p>
            <p className="mt-6 text-base leading-8 text-gold-muted">{t("p2")}</p>
            <p className="mt-8 text-sm tracking-[0.08em] text-gold">
              {SITE.street}
            </p>
            <LocationActions
              directionsLabel={t("directions")}
              copyLabel={t("copy")}
              copiedLabel={t("copied")}
            />
          </Reveal>
        </div>
        <Reveal variant="media" delayMs={180}>
          <div className="overflow-hidden rounded-[2rem] border border-gold/15 bg-green-deep">
            <iframe
              title={SITE.street}
              src={mapSrc}
              className="h-80 w-full grayscale invert-[0.9] contrast-125 md:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

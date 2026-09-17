import { getTranslations } from "next-intl/server";
import { Section } from "@/components/section";
import { SITE } from "@/lib/site";

export async function Discover() {
  const t = await getTranslations("discover");

  return (
    <Section className="bg-green">
      <h2 className="font-serif text-[clamp(2.2rem,6vw,4.8rem)] leading-none text-cream">
        {t("title")}
      </h2>
      <a
        href="#menu"
        className="mt-8 inline-flex rounded-full bg-cream px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-green transition-opacity hover:opacity-85"
      >
        {t("cta")}
      </a>
    </Section>
  );
}

export async function Visit() {
  const t = await getTranslations("visit");
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

  return (
    <Section id="visit" className="bg-yellow text-green">
      <h2 className="max-w-4xl font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] leading-[0.95]">
        {t("title")}
      </h2>
      <p className="mt-6 max-w-xl text-lg text-ink">{t("lead")}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.16em] text-ink-muted">{t("hours")}</p>
      <p className="mt-4 text-sm text-ink">{SITE.fullAddress}</p>
      <div className="mt-8 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.18em]">
        <a href={mapsHref} target="_blank" rel="noreferrer" className="underline underline-offset-4">
          {t("maps")}
        </a>
        <a href={SITE.instagramHref} target="_blank" rel="noreferrer" className="underline underline-offset-4">
          {t("instagram")}
        </a>
      </div>
    </Section>
  );
}

export async function Story() {
  const t = await getTranslations("story");

  return (
    <Section className="bg-green">
      <p className="text-xs uppercase tracking-[0.22em] text-cream/50">{t("kicker")}</p>
      <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] leading-[0.95] text-cream">
        {t("title")}
      </h2>
      <p className="mt-6 max-w-xl text-lg text-cream/70">{t("lead")}</p>
    </Section>
  );
}

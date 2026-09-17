import { getTranslations } from "next-intl/server";
import { Section } from "@/components/section";

const PILLAR_KEYS = ["green", "light", "stone", "details"] as const;

export async function Space() {
  const t = await getTranslations("space");

  return (
    <Section id="space" className="bg-green">
      <div className="max-w-4xl">
        <h2 className="font-serif text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.92] text-cream">
          {t("title")}
        </h2>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream/75">
          {t("lead")}
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILLAR_KEYS.map((key) => (
          <div
            key={key}
            className="rounded-sm border border-cream/15 bg-green-mid/40 p-8 transition-colors hover:border-yellow/40 hover:bg-green-mid/70"
          >
            <span className="font-serif text-sm tracking-[0.2em] text-yellow">
              {t(`pillars.${key}.num`)}
            </span>
            <h3 className="mt-4 font-serif text-2xl text-cream">
              {t(`pillars.${key}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {t(`pillars.${key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

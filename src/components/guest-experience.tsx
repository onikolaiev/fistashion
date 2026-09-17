import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const AMENITY_KEYS = [
  "location",
  "hours",
  "ambience",
  "gifting",
] as const;

export async function GuestExperience() {
  const t = await getTranslations("experience");

  return (
    <Section id="experience" className="bg-cream-soft">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {t("badge")}
            </div>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-green sm:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-base leading-relaxed text-charcoal-muted sm:text-lg">
              {t("lead")}
            </p>
          </Reveal>
        </div>

        {/* 4 Essential Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITY_KEYS.map((key, index) => (
            <Reveal key={key} delayMs={100 + index * 60}>
              <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-gold/30 bg-cream p-7 shadow-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:bg-cream-pure hover:shadow-xl">
                <div>
                  {/* Roman Index or Accent */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-light text-gold-dark/50 transition-colors group-hover:text-gold-dark">
                      0{index + 1}
                    </span>
                    <div className="h-2 w-2 rounded-full bg-gold/40 transition-all group-hover:scale-125 group-hover:bg-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 font-serif text-lg font-bold tracking-tight text-green transition-colors group-hover:text-gold-dark">
                    {t(`cards.${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-charcoal-muted">
                    {t(`cards.${key}.desc`)}
                  </p>
                </div>

                {/* Bottom luxury accent bar */}
                <div className="mt-6 h-0.5 w-10 bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

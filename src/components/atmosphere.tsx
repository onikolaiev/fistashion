import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const ITEM_KEYS = [
  "interior",
  "assortment",
  "guests",
  "style",
  "idea",
  "service",
] as const;

export async function Atmosphere() {
  const t = await getTranslations("atmosphere");

  return (
    <Section id="atmosphere" className="bg-cream-pure">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream-soft px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
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

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEM_KEYS.map((key, index) => (
            <Reveal key={key} delayMs={100 + index * 50}>
              <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-gold/25 bg-cream p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-cream-soft hover:shadow-xl">
                
                {/* Index & Gold accent dot */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-light text-gold-dark/40 transition-colors group-hover:text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-gold/40 transition-all group-hover:scale-125 group-hover:bg-gold" />
                </div>

                <p className="mt-8 text-base font-medium leading-relaxed tracking-wide text-charcoal transition-colors group-hover:text-green">
                  {t(`items.${key}`)}
                </p>

                {/* Bottom line accent */}
                <div className="mt-6 h-0.5 w-8 bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

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
    <Section id="atmosphere" className="overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center text-4xl text-gold md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-gold-muted">
            {t("lead")}
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEM_KEYS.map((key, index) => (
            <Reveal key={key} delayMs={140 + index * 60}>
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-gold/15 bg-green-mid/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-green-mid/70 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]">
                <span className="font-serif text-3xl font-light text-gold/30 transition-colors group-hover:text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-8 text-base tracking-[0.04em] text-gold/90 transition-colors group-hover:text-gold">
                  {t(`items.${key}`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

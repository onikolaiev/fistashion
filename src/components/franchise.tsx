import { getTranslations } from "next-intl/server";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export async function Franchise() {
  const t = await getTranslations("franchise");

  const perks = [
    {
      title: t("perk1Title"),
      desc: t("perk1Desc"),
    },
    {
      title: t("perk2Title"),
      desc: t("perk2Desc"),
    },
    {
      title: t("perk3Title"),
      desc: t("perk3Desc"),
    },
  ];

  return (
    <Section id="franchise" className="bg-cream-pure">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
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
              <p className="mt-6 text-base leading-relaxed text-charcoal-muted sm:text-lg">
                {t("lead")}
              </p>

              {/* Franchise perks */}
              <div className="mt-8 space-y-5">
                {perks.map((perk, index) => (
                  <div key={index} className="flex items-start gap-3.5">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold-dark">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-green">
                        {perk.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-charcoal-muted">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delayMs={180}>
              <InquiryForm />
            </Reveal>
          </div>

        </div>
      </div>
    </Section>
  );
}

import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { assetPath } from "@/lib/site";

export async function About() {
  const t = await getTranslations("about");

  const pillars = [
    {
      key: "pistache",
      title: t("pillars.pistache.title"),
      desc: t("pillars.pistache.desc"),
    },
    {
      key: "lart",
      title: t("pillars.lart.title"),
      desc: t("pillars.lart.desc"),
    },
    {
      key: "cafe",
      title: t("pillars.cafe.title"),
      desc: t("pillars.cafe.desc"),
    },
  ];

  return (
    <Section id="about" className="bg-cream-pure">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Visual Side: Two luxury framed architectural photos */}
          <div className="lg:col-span-6">
            <Reveal variant="media">
              <div className="relative">
                {/* Main large image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/25 bg-cream-soft shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/scenes/photo-about-guest.png")}
                    alt="Distinguished Saudi gentleman enjoying coffee and pastry at Fistashion Medina"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green/25 via-transparent to-transparent" />
                </div>

                {/* Overlapping detail card */}
                <div className="absolute -bottom-8 -right-4 w-1/2 overflow-hidden rounded-2xl border-2 border-cream-pure bg-cream p-1.5 shadow-2xl sm:-bottom-10 sm:-right-8">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath("/scenes/photo-coffee-croissant.png")}
                      alt="Artisanal French pistachio croissant and specialty flat white"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="py-2 text-center text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                    Artisanal Bakes
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
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
              <p className="mt-6 font-serif text-xl italic leading-relaxed text-charcoal sm:text-2xl">
                {t("lead")}
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-muted">
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
              </div>

              {/* Three Pillars */}
              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-gold/25 pt-8 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <div key={pillar.key} className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-green">
                      {pillar.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-charcoal-muted">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </Section>
  );
}

import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { OFFERING_IDS, assetPath } from "@/lib/site";

export async function Offerings() {
  const t = await getTranslations("offerings");

  return (
    <Section id="offerings" className="bg-cream-soft">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            {t("badge")}
          </div>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-green sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-muted sm:text-lg">
            {t("lead")}
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
          {OFFERING_IDS.map((id, index) => (
            <li key={id}>
              <Reveal
                variant="media"
                delayMs={index * 80}
                className="group flex flex-col items-center text-center"
              >
                {/* Round gold medal frame with soft shadow */}
                <div className="relative aspect-square w-full max-w-[190px] overflow-hidden rounded-full border-2 border-gold/40 bg-cream p-1.5 shadow-md transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-gold group-hover:shadow-2xl">
                  <div className="h-full w-full overflow-hidden rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath(`/offerings/${id}.jpg`)}
                      alt={t(id)}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Offering Label */}
                <h3 className="mt-5 font-serif text-base font-semibold tracking-wider text-green transition-colors group-hover:text-gold-dark sm:text-lg">
                  {t(id)}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal-light">
                  Fresh Daily
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Menu note banner */}
        <Reveal delayMs={300}>
          <div className="mt-16 rounded-3xl border border-gold/30 bg-cream px-8 py-7 text-center shadow-xs">
            <h3 className="font-serif text-base font-semibold tracking-widest uppercase text-gold-dark">
              {t("noteTitle")}
            </h3>
            <p className="mt-1.5 max-w-2xl mx-auto text-xs leading-relaxed text-charcoal-muted">
              {t("noteDesc")}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

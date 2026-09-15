import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { OFFERING_IDS } from "@/lib/site";

export async function Offerings() {
  const t = await getTranslations("offerings");

  return (
    <Section id="offerings">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl text-gold md:text-6xl">{t("title")}</h2>
        <p className="mt-8 text-base leading-8 text-gold-muted">{t("lead")}</p>
      </Reveal>
      <ul className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-6">
        {OFFERING_IDS.map((id, index) => (
          <li key={id}>
            <Reveal
              variant="media"
              delayMs={index * 90}
              className="flex flex-col items-center text-center"
            >
              <div className="group aspect-square w-full max-w-[180px] overflow-hidden rounded-full border border-gold/20 shadow-[0_0_0_8px_rgba(15,36,24,1),0_0_0_9px_rgba(232,213,163,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/offerings/${id}.jpg`}
                  alt={t(id)}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <p className="mt-5 text-sm tracking-[0.18em] text-gold">{t(id)}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

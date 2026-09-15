import { getTranslations } from "next-intl/server";
import { CinematicBackdrop } from "@/components/cinematic-backdrop";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export async function About() {
  const t = await getTranslations("about");

  return (
    <Section id="about" className="overflow-hidden">
      <CinematicBackdrop src="/scenes/green-salon.png" overlay="section" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-4xl text-gold md:text-6xl">{t("title")}</h2>
        </Reveal>
        <Reveal delayMs={140}>
          <p className="mt-10 text-xl leading-relaxed text-gold md:text-2xl">
            {t("lead")}
          </p>
        </Reveal>
        <Reveal delayMs={260}>
          <p className="mt-8 text-base leading-8 text-gold-muted">{t("p1")}</p>
          <p className="mt-6 text-base leading-8 text-gold-muted">{t("p2")}</p>
        </Reveal>
      </div>
    </Section>
  );
}

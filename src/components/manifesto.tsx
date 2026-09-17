import { getTranslations } from "next-intl/server";
import { Section } from "@/components/section";

export async function Manifesto() {
  const t = await getTranslations("manifesto");

  return (
    <Section className="bg-yellow text-green">
      <p className="max-w-4xl font-serif text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
        {t("title")}
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">{t("lead")}</p>
    </Section>
  );
}

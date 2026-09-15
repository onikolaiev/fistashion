import { getTranslations } from "next-intl/server";
import { HeroExperience } from "@/components/hero/hero-experience";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <HeroExperience
      badge={t("badge")}
      city={t("city")}
      ctaLocation={t("ctaLocation")}
      ctaFranchise={t("ctaFranchise")}
    />
  );
}

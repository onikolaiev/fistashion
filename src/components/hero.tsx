import { getTranslations } from "next-intl/server";
import { HeroExperience } from "@/components/hero/hero-experience";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <HeroExperience
      badge={t("badge")}
      city={t("city")}
      subline={t("subline")}
      tagline={t("tagline")}
      lead={t("lead")}
      ctaLocation={t("ctaLocation")}
      ctaMenu={t("ctaMenu")}
      ctaFranchise={t("ctaFranchise")}
      feature1={t("feature1")}
      feature2={t("feature2")}
      feature3={t("feature3")}
      feature4={t("feature4")}
      dessertCardTitle={t("dessertCardTitle")}
      dessertCardSubtitle={t("dessertCardSubtitle")}
    />
  );
}

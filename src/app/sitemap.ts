import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.map((locale) => ({
    url: `${SITE.domain}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "ar" ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE.domain}/${loc}`])
      ),
    },
  }));
}

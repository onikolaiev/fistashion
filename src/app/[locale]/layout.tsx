import type { Metadata } from "next";
import { Bodoni_Moda, Noto_Naskh_Arabic, Ysabeau } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE, assetPath } from "@/lib/site";
import "../globals.css";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif-face",
  weight: ["400", "500", "600", "700"],
});

const sans = Ysabeau({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans-face",
  weight: ["400", "500", "600", "700"],
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-face",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "meta" });

  const ogLocaleMap = {
    ar: "ar_SA",
    en: "en_US",
    ru: "ru_RU",
  } as const;

  const currentOgLocale =
    ogLocaleMap[locale as keyof typeof ogLocaleMap] || "en_US";

  return {
    title: `${t("title")} | ${SITE.brand}`,
    description: t("description"),
    metadataBase: new URL(SITE.domain),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
        ru: "/ru",
      },
    },
    openGraph: {
      title: `${t("title")} | ${SITE.brand}`,
      description: t("description"),
      url: `/${locale}`,
      siteName: SITE.brand,
      locale: currentOgLocale,
      type: "website",
      images: [
        {
          url: "/offerings/confectionery.jpg",
          width: 1200,
          height: 900,
          alt: "Fistashion The Bakery House Medina",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | ${SITE.brand}`,
      description: t("description"),
      images: ["/offerings/confectionery.jpg"],
    },
    icons: { icon: assetPath("/favicon.svg") },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "CafeOrCoffeeShop"],
    name: "Fistashion — The Bakery House",
    alternateName: "فيستاشيون — دار المخبوزات والقهوة المختصة",
    url: `${SITE.domain}/${locale}`,
    logo: `${SITE.domain}/brand/logo.svg`,
    image: `${SITE.domain}/offerings/confectionery.jpg`,
    description:
      "Premium bakery and café in Medina — pastry, specialty coffee, and warm Saudi hospitality.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: "Medina",
      postalCode: "42351",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.468056,
      longitude: 39.5625,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "23:59",
      },
    ],
    servesCuisine: ["French", "Bakery", "Specialty Coffee", "Pâtisserie"],
    priceRange: "$$",
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
  };

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${serif.variable} ${sans.variable} ${arabic.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

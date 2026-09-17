import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Connect } from "@/components/connect";
import { Craft, Signature } from "@/components/craft";
import { Exclusive } from "@/components/exclusive";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { Discover, Story, Visit } from "@/components/visit";
import { Space } from "@/components/space";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-green pb-16 md:pb-0">
        <Hero />
        <Manifesto />
        <Exclusive />
        <Signature />
        <Craft />
        <Space />
        <Discover />
        <Visit />
        <Story />
        <Connect />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}

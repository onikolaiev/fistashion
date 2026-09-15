import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Atmosphere } from "@/components/atmosphere";
import { Footer } from "@/components/footer";
import { Franchise } from "@/components/franchise";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Location } from "@/components/location";
import { Offerings } from "@/components/offerings";
import { Reveal } from "@/components/reveal";
import { SceneBreak } from "@/components/scene-break";
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
      <main>
        <Hero />
        <About />
        <Reveal variant="media">
          <SceneBreak src="/scenes/pastry-case.png" />
        </Reveal>
        <Offerings />
        <Reveal variant="media">
          <SceneBreak
            src="/scenes/bar-counter.png"
            heightClass="h-[62vh] min-h-[24rem] md:h-[78vh]"
          />
        </Reveal>
        <Location />
        <Atmosphere />
        <Franchise />
      </main>
      <Footer />
    </>
  );
}

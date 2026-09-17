import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Atmosphere } from "@/components/atmosphere";
import { Footer } from "@/components/footer";
import { Franchise } from "@/components/franchise";
import { GuestExperience } from "@/components/guest-experience";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Location } from "@/components/location";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { Offerings } from "@/components/offerings";
import { Reveal } from "@/components/reveal";
import { SceneBreak } from "@/components/scene-break";
import { SignatureMenu } from "@/components/signature-menu";
import { routing } from "@/i18n/routing";
import { assetPath } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-cream">
        <Hero />
        <About />
        
        <Reveal variant="media">
          <SceneBreak
            src={assetPath("/scenes/photo-pastry-counter.png")}
            subtitle="Artisanal Pâtisserie"
            title="Crafted with French Heritage"
            heightClass="h-[40vh] min-h-[18rem] md:h-[55vh]"
          />
        </Reveal>

        <SignatureMenu />
        <Offerings />

        <Reveal variant="media">
          <SceneBreak
            src={assetPath("/scenes/photo-salon-grand-wide.png")}
            subtitle="The Grand Salon"
            title="An Atmosphere of Warmth & Elegance"
            heightClass="h-[42vh] min-h-[20rem] md:h-[58vh]"
          />
        </Reveal>

        <Atmosphere />
        <GuestExperience />
        <Location />
        <Franchise />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}

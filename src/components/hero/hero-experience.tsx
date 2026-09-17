"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/site";

type HeroExperienceProps = {
  badge: string;
  city: string;
  subline: string;
  tagline: string;
  lead: string;
  ctaLocation: string;
  ctaMenu: string;
  ctaFranchise: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  dessertCardTitle: string;
  dessertCardSubtitle: string;
};

export function HeroExperience({
  badge,
  city,
  subline,
  lead,
  ctaLocation,
  ctaMenu,
  feature1,
  feature2,
  feature3,
  feature4,
  dessertCardTitle,
  dessertCardSubtitle,
}: HeroExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const titleLetters = root.querySelectorAll("[data-hero-char]");
    const fadeEls = root.querySelectorAll("[data-hero-fade]");
    const visual = root.querySelector("[data-hero-visual]");
    const bgImage = root.querySelector("[data-hero-bg]");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (bgImage) {
      tl.fromTo(
        bgImage,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 0.9, duration: 1.4, ease: "power2.out" },
        0,
      );
    }

    if (titleLetters.length > 0) {
      tl.fromTo(
        titleLetters,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.035 },
        0.1,
      );
    }

    if (fadeEls.length > 0) {
      tl.fromTo(
        fadeEls,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        0.25,
      );
    }

    if (visual) {
      tl.fromTo(
        visual,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power2.out" },
        0.2,
      );
    }

    // Gentle scroll parallax
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    if (visual) {
      scrollTl.to(visual, { y: 30, ease: "none" }, 0);
    }
    if (bgImage) {
      scrollTl.to(bgImage, { y: 40, ease: "none" }, 0);
    }

    return () => {
      tl.kill();
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, []);

  const brandName = "FISTASHION";

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-[82vh] items-center overflow-hidden bg-cream px-6 pt-24 pb-14 md:min-h-[88vh] md:px-12 md:pt-28 md:pb-24"
    >
      {/* 1. Vibrant, Clearly Visible Grand Salon Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-bg
          src={assetPath("/scenes/photo-hero-backdrop.png")}
          alt=""
          className="h-full w-full object-cover object-[center_35%] opacity-90 contrast-[1.05] brightness-[1.03] md:object-[center_30%]"
        />

        {/* Soft radial reading aura strictly behind left text block, leaving the center and right grand salon clearly visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 85% at 20% 50%, rgba(250, 247, 242, 0.94) 0%, rgba(250, 247, 242, 0.86) 42%, rgba(250, 247, 242, 0.35) 72%, transparent 100%)",
          }}
        />

        {/* Seamless top and bottom blending */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream via-cream/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream-pure via-cream-pure/60 to-transparent" />

        {/* Warm golden light glow over chandeliers */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              "radial-gradient(circle at 75% 25%, rgba(223, 199, 147, 0.5) 0%, transparent 60%)",
          }}
        />

        {/* Subtle luxury grain */}
        <div className="absolute inset-0 opacity-[0.02] luxury-noise" />
      </div>

      {/* 2. Delicate Architectural Hairline Frame with Corner Accents */}
      <div className="pointer-events-none absolute inset-3 hidden rounded-3xl border border-gold/30 sm:block md:inset-6">
        {/* Corner Accents */}
        <div className="absolute -top-1.5 -left-1.5 h-3 w-3 rounded-full border border-gold/70 bg-cream" />
        <div className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full border border-gold/70 bg-cream" />
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full border border-gold/70 bg-cream" />
        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-full border border-gold/70 bg-cream" />

        {/* Top edge watermark coordinate */}
        <div className="absolute top-3 right-6 hidden text-[10px] font-semibold tracking-[0.24em] text-gold-dark/90 md:block">
          24°28′05″N 39°33′45″E • AL JAMIAH, MADINAH
        </div>

        {/* Bottom edge watermark label */}
        <div className="absolute bottom-3 left-6 hidden text-[10px] font-semibold tracking-[0.22em] text-gold-dark/90 md:block">
          THE BAKERY HOUSE • HAUTE PÂTISSERIE & SPECIALTY COFFEE
        </div>
      </div>

      {/* 3. Main Hero Content Grid */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Haute Typography, Heritage & Key Features */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-start">
            
            {/* Top pill badge */}
            <div
              data-hero-fade
              className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-cream-pure/95 px-4 py-1.5 shadow-xs backdrop-blur-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath("/brand/logo-mark.svg")}
                alt=""
                className="h-3.5 w-3.5 object-contain"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                {badge}
              </span>
            </div>

            {/* Main Brand Title */}
            <h1 className="mt-3.5 flex flex-wrap justify-center overflow-hidden font-serif text-[clamp(2.75rem,6.8vw,5.25rem)] font-bold tracking-[0.08em] text-green lg:justify-start">
              {brandName.split("").map((char, index) => (
                <span
                  key={index}
                  data-hero-char
                  className="inline-block"
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Arabic Script & Subline */}
            <div data-hero-fade className="mt-2 space-y-1">
              <p className="font-arabic text-2xl font-medium text-gold-dark md:text-3xl">
                فيستاشيون — دار المخبوزات والقهوة المختصة
              </p>
              <p className="font-serif text-sm uppercase tracking-[0.28em] text-charcoal-muted md:text-base">
                {subline} • {city}
              </p>
            </div>

            {/* Editorial Narrative */}
            <p
              data-hero-fade
              className="mt-3.5 max-w-xl text-base leading-relaxed text-charcoal md:text-lg"
            >
              {lead}
            </p>

            {/* Action buttons */}
            <div
              data-hero-fade
              className="mt-5 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="#location"
                className="group relative inline-flex items-center gap-3 rounded-full bg-green px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-pure shadow-lg shadow-green/25 transition-all hover:bg-green-mid hover:shadow-xl"
              >
                <span>{ctaLocation}</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-cream-pure/90 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal shadow-xs backdrop-blur-md transition-all hover:border-gold hover:bg-gold-pale/50"
              >
                <span>{ctaMenu}</span>
              </a>
            </div>

            {/* Structured Luxury Feature Strip */}
            <div
              data-hero-fade
              className="mt-8 w-full max-w-xl rounded-2xl border border-gold/35 bg-cream-pure/90 p-4 shadow-md backdrop-blur-md lg:mt-9"
            >
              <div className="grid grid-cols-3 gap-3 text-center sm:gap-4">
                <div className="px-1">
                  <p className="font-serif text-base font-bold text-green sm:text-lg">Normandy</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal-muted">{feature1}</p>
                </div>
                <div className="border-x border-gold/25 px-1">
                  <p className="font-serif text-base font-bold text-green sm:text-lg">Pistache</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal-muted">{feature2}</p>
                </div>
                <div className="px-1">
                  <p className="font-serif text-base font-bold text-green sm:text-lg">Arabica</p>
                  <p className="text-[10px] uppercase tracking-wider text-charcoal-muted">{feature3}</p>
                </div>
              </div>

              {/* Sub-strip detail */}
              <div className="mt-3 border-t border-gold/15 pt-2 text-center text-[11px] font-medium tracking-wide text-charcoal-light">
                {feature4} • Parking Dedicated
              </div>
            </div>

          </div>

          {/* Right Column: Grand Visual Showcase */}
          <div className="relative lg:col-span-6">
            <div
              data-hero-visual
              className="relative mx-auto w-full max-w-xl"
            >
              {/* Outer decorative gold frame border */}
              <div className="absolute -inset-3 rounded-[2.5rem] border border-gold/45 p-2 shadow-md sm:-inset-4 sm:rounded-[3rem]" />
              
              {/* Main Image Container (Saudi guests in red shemagh) */}
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-cream-soft shadow-2xl ring-1 ring-gold/30 sm:rounded-[2.5rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetPath("/scenes/photo-salon-saudi-men.png")}
                  alt="Saudi guests in traditional attire enjoying coffee and fresh bakery at Fistashion Medina"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle soft gradient over image bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-dark/55 via-transparent to-transparent" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-cream-pure/20 bg-green/90 px-5 py-3.5 text-cream-pure shadow-lg backdrop-blur-md">
                  <div>
                    <p className="font-serif text-sm font-semibold tracking-wide text-gold-light">
                      The Salon Experience
                    </p>
                    <p className="text-xs text-cream-pure/80">
                      Medina Hospitality & Artisanal Bakery
                    </p>
                  </div>
                  <span className="rounded-full bg-gold/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-pale">
                    Open Daily
                  </span>
                </div>
              </div>

              {/* Floating secondary accent card (Signature Pistache Dessert) */}
              <div className="absolute -bottom-14 -left-5 hidden w-52 overflow-hidden rounded-2xl border-2 border-cream-pure bg-cream p-2 shadow-2xl sm:block md:-bottom-20 md:-left-8 md:w-56 lg:-bottom-22">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/scenes/photo-pistachio-dessert.png")}
                    alt="Signature Pistachio Dessert Tart"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 rounded-full bg-green/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cream-pure backdrop-blur-xs">
                    Maison
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <p className="font-serif text-xs font-bold text-green">
                    {dessertCardTitle}
                  </p>
                  <p className="text-[10px] text-charcoal-muted">
                    {dessertCardSubtitle}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

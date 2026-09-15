"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicBackdrop } from "@/components/cinematic-backdrop";
import { SteamEffect } from "@/components/hero/steam-effect";
import { Logo } from "@/components/logo";

type HeroExperienceProps = {
  badge: string;
  city: string;
  ctaLocation: string;
  ctaFranchise: string;
};

// Exact coordinates of the coffee cup foam rim inside hero-coffee-v4.png (1280x720)
// Cup opening left rim: 749, right rim: 859 -> Exact horizontal center: 804.0
// Cup opening top rim: 418-422 -> Exact top level: 420.0
const CUP_NATURAL_X = 804.0;
const CUP_NATURAL_Y = 420.0;
const IMG_NW = 1280;
const IMG_NH = 720;

export function HeroExperience({
  badge,
  city,
  ctaLocation,
  ctaFranchise,
}: HeroExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [steamAnchor, setSteamAnchor] = useState<{ x: number; y: number; scale: number } | null>(null);

  const updateSteamPosition = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const img = section.querySelector<HTMLImageElement>("img");
    if (!img) return;

    const nw = img.naturalWidth || IMG_NW;
    const nh = img.naturalHeight || IMG_NH;
    const rect = img.getBoundingClientRect();

    const scale = Math.max(rect.width / nw, rect.height / nh);
    const sw = nw * scale;
    const sh = nh * scale;

    const isSmall = rect.width < 768;
    const posX = isSmall ? 0.75 : 0.58;
    const posY = 0.50;

    const ox = (rect.width - sw) * posX;
    const oy = (rect.height - sh) * posY;

    const x = ox + CUP_NATURAL_X * scale;
    const y = oy + CUP_NATURAL_Y * scale;

    setSteamAnchor({ x, y, scale });
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReducedMotion(motion.matches);
      setIsMobile(mobile.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    updateSteamPosition();
    window.addEventListener("resize", updateSteamPosition);
    const section = sectionRef.current;
    const img = section?.querySelector<HTMLImageElement>("img");
    if (img && !img.complete) {
      img.addEventListener("load", updateSteamPosition, { once: true });
    }
    return () => {
      window.removeEventListener("resize", updateSteamPosition);
    };
  }, [updateSteamPosition]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const backdrop = section.querySelector("[data-hero-backdrop]");
    const copy = section.querySelector("[data-hero-copy]");
    const badgeEl = section.querySelector("[data-hero-badge]");
    const titleEl = section.querySelector("[data-hero-title]");
    const cityEl = section.querySelector("[data-hero-city]");
    const ctaEl = section.querySelector("[data-hero-cta]");

    const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
    intro
      .fromTo(backdrop, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.6 }, 0)
      .fromTo(
        badgeEl,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.85 },
        0.3,
      )
      .fromTo(
        titleEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.95 },
        0.45,
      )
      .fromTo(
        cityEl,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7,
      )
      .fromTo(
        ctaEl,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.9,
      );

    const scroll = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });
    scroll
      .to(copy, { y: -36, opacity: 0, ease: "none" }, 0)
      .to(backdrop, { yPercent: 6, ease: "none" }, 0);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      if (backdrop instanceof HTMLElement) {
        backdrop.style.transform = `scale(1.02) translate3d(${current.x * 6}px, ${current.y * 4}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    if (!isMobile) {
      section.addEventListener("mousemove", onMove);
      frame = window.requestAnimationFrame(tick);
    }

    return () => {
      intro.kill();
      scroll.scrollTrigger?.kill();
      scroll.kill();
      section.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, [isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-start md:justify-center overflow-hidden px-6 pb-12 pt-24 md:pt-28 md:px-12 lg:px-16"
    >
      <CinematicBackdrop
        src="/scenes/hero-coffee-v4.png"
        overlay="hero"
        layer="hero-backdrop"
        motion="still"
        imgClassName="object-[75%_50%] md:object-[58%_50%]"
      >
        {/* Living animated steam anchored directly to the coffee cup opening */}
        {steamAnchor && (
          <div
            className="pointer-events-none absolute z-15 will-change-transform"
            style={{
              left: steamAnchor.x,
              top: steamAnchor.y,
            }}
            aria-hidden="true"
          >
            <div className="-translate-x-1/2 -translate-y-[calc(100%-10px)]">
              <SteamEffect
                width={Math.round(220 * Math.min(Math.max(steamAnchor.scale, 0.8), 1.5))}
                height={Math.round(320 * Math.min(Math.max(steamAnchor.scale, 0.8), 1.5))}
                opacity={0.88}
                cupScale={steamAnchor.scale}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        )}
      </CinematicBackdrop>

      <div
        data-hero-copy
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center text-center md:items-start md:text-start"
      >
        <div className="max-w-md lg:max-w-lg">
          <p
            data-hero-badge
            className="text-[11px] uppercase tracking-[0.28em] text-gold-muted"
          >
            {badge}
          </p>
          <div data-hero-title className="mt-3 md:mt-5 text-gold">
            <span className="inline-flex origin-center scale-110 md:scale-125 md:origin-left">
              <Logo variant="mark" />
            </span>
            <p className="mt-3 font-sans text-2xl tracking-[0.2em] md:text-4xl md:tracking-[0.32em]">
              FISTASHION
            </p>
            <p className="mt-1.5 font-arabic text-xl">فيستاشيون</p>
            <p className="mt-1.5 text-xs tracking-[0.22em] text-gold-muted md:text-sm">
              The Bakery House
            </p>
          </div>
          <p
            data-hero-city
            className="mt-2.5 text-[11px] uppercase tracking-[0.28em] text-gold-muted md:mt-3"
          >
            {city}
          </p>
          <div
            data-hero-cta
            className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4 md:justify-start"
          >
            <a
              href="#location"
              className="border border-gold/50 px-5 py-2.5 text-xs tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-green md:px-7 md:py-3"
            >
              {ctaLocation}
            </a>
            <a
              href="#franchise"
              className="border border-gold/20 px-5 py-2.5 text-xs tracking-[0.16em] text-gold-muted transition-colors hover:border-gold/50 hover:text-gold md:px-7 md:py-3"
            >
              {ctaFranchise}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

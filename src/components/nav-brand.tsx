"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/site";

export function NavBrand() {
  const markRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const heroMarkEl = document.getElementById("hero-logo-mark");
    const heroTitleEl = document.getElementById("hero-logo-title");
    const heroSubtitlesEl = document.getElementById("hero-subtitles");
    const markNode = markRef.current;
    const textNode = textRef.current;
    const linkNode = linkRef.current;

    if (!heroMarkEl || !heroTitleEl || !markNode || !textNode || !linkNode) {
      return;
    }

    // Reveal the animated link container and hide the static hero items
    linkNode.style.opacity = "1";
    heroMarkEl.style.opacity = "0";
    heroTitleEl.style.opacity = "0";

    let rafId: number | null = null;
    let coords: {
      dxMark: number;
      dyMark: number;
      scaleMark: number;
      dxText: number;
      dyText: number;
      scaleText: number;
    } | null = null;

    const measure = () => {
      // Temporarily clear inline transforms to measure true base layout positions
      const prevMarkTransform = markNode.style.transform;
      const prevTextTransform = textNode.style.transform;
      markNode.style.transform = "none";
      textNode.style.transform = "none";

      const navMarkRect = markNode.getBoundingClientRect();
      const navTextRect = textNode.getBoundingClientRect();
      const heroMarkRect = heroMarkEl.getBoundingClientRect();
      const heroTitleRect = heroTitleEl.getBoundingClientRect();

      markNode.style.transform = prevMarkTransform;
      textNode.style.transform = prevTextTransform;

      const scrollY = window.scrollY || window.pageYOffset;

      const heroMarkCenter = {
        x: heroMarkRect.left + heroMarkRect.width / 2,
        y: heroMarkRect.top + scrollY + heroMarkRect.height / 2,
      };
      const heroTitleCenter = {
        x: heroTitleRect.left + heroTitleRect.width / 2,
        y: heroTitleRect.top + scrollY + heroTitleRect.height / 2,
      };

      const navMarkCenter = {
        x: navMarkRect.left + navMarkRect.width / 2,
        y: navMarkRect.top + navMarkRect.height / 2,
      };
      const navTextCenter = {
        x: navTextRect.left + navTextRect.width / 2,
        y: navTextRect.top + navTextRect.height / 2,
      };

      coords = {
        dxMark: heroMarkCenter.x - navMarkCenter.x,
        dyMark: heroMarkCenter.y - navMarkCenter.y,
        scaleMark: heroMarkRect.width / Math.max(1, navMarkRect.width),
        dxText: heroTitleCenter.x - navTextCenter.x,
        dyText: heroTitleCenter.y - navTextCenter.y,
        scaleText: heroTitleRect.width / Math.max(1, navTextRect.width),
      };
    };

    measure();

    // Re-measure after web fonts finish loading to ensure sub-pixel text measurement
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measure();
        update();
      });
    }

    const update = () => {
      if (!coords || !markNode || !textNode) return;
      const scrollY = Math.max(0, window.scrollY || window.pageYOffset);
      const threshold = Math.min(340, Math.max(220, window.innerHeight * 0.42));
      const rawProgress = Math.min(1, Math.max(0, scrollY / threshold));

      // Cosine easing for a soft, premium acceleration and deceleration
      const t = 1 - (1 - Math.cos(rawProgress * Math.PI)) / 2;

      if (rawProgress >= 1) {
        markNode.style.transform = "translate3d(0, 0, 0) scale(1)";
        textNode.style.transform = "translate3d(0, 0, 0) scale(1)";
        linkNode.style.pointerEvents = "auto";
      } else {
        const curDxMark = coords.dxMark * t;
        const curDyMark = coords.dyMark * t;
        const curScaleMark = 1 + (coords.scaleMark - 1) * t;

        const curDxText = coords.dxText * t;
        const curDyText = coords.dyText * t;
        const curScaleText = 1 + (coords.scaleText - 1) * t;

        markNode.style.transform = `translate3d(${curDxMark}px, ${curDyMark}px, 0) scale(${curScaleMark})`;
        textNode.style.transform = `translate3d(${curDxText}px, ${curDyText}px, 0) scale(${curScaleText})`;

        // When at hero center, click target is disabled at top-left
        linkNode.style.pointerEvents = rawProgress > 0.8 ? "auto" : "none";
      }

      if (heroSubtitlesEl) {
        const subOpacity = Math.max(0, 1 - rawProgress * 2.5);
        heroSubtitlesEl.style.opacity = String(subOpacity);
        heroSubtitlesEl.style.transform = `translate3d(0, ${-rawProgress * 30}px, 0)`;
      }
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    update();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (heroMarkEl) heroMarkEl.style.opacity = "";
      if (heroTitleEl) heroTitleEl.style.opacity = "";
      if (heroSubtitlesEl) {
        heroSubtitlesEl.style.opacity = "";
        heroSubtitlesEl.style.transform = "";
      }
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href="#top"
      aria-label="Fistashion The Bakery House"
      className="group relative flex items-center gap-2.5 transition-opacity duration-300"
      style={{ opacity: 0 }}
    >
      <div
        ref={markRef}
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath("/brand/logo-mark.svg")}
          alt=""
          width={28}
          height={28}
          className="h-full w-full object-contain"
        />
      </div>
      <span
        ref={textRef}
        className="inline-block flex-shrink-0 font-serif text-lg tracking-[0.14em] text-cream uppercase transition-colors group-hover:text-yellow will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        FISTASHION
      </span>
    </a>
  );
}

import { SteamEffect } from "@/components/hero/steam-effect";

type CoffeeHeroVisualProps = {
  src?: string;
  alt?: string;
  steam?: {
    opacity?: number;
    speed?: number;
    amount?: number;
    blur?: number;
    height?: number;
  };
  reducedMotion?: boolean;
};

export function CoffeeHeroVisual({
  src = "/hero/coffee-glass-v3.png",
  alt = "Fistashion coffee",
  steam,
  reducedMotion = false,
}: CoffeeHeroVisualProps) {
  return (
    <div
      data-hero-glass
      className="coffee-hero-visual relative h-[7.2rem] w-[6.4rem] md:h-[9.6rem] md:w-[8.4rem] lg:h-[10.6rem] lg:w-[9.2rem]"
    >
      <div
        data-hero-shadow
        className="pointer-events-none absolute bottom-0 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-md"
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-hero-cup
        src={src}
        alt={alt}
        className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_10px_14px_rgba(0,0,0,0.28)]"
      />
      <SteamEffect reducedMotion={reducedMotion} {...steam} />
    </div>
  );
}

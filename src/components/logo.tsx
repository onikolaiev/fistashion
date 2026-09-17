import { SITE, assetPath } from "@/lib/site";

type LogoProps = {
  variant?: "mark" | "wordmark" | "lockup";
  className?: string;
  theme?: "light" | "dark" | "gold";
};

export function Logo({ variant = "lockup", className, theme = "gold" }: LogoProps) {
  const markColorClass =
    theme === "light"
      ? "text-cream-pure"
      : theme === "dark"
        ? "text-green"
        : "text-gold";

  const wordmarkColorClass =
    theme === "light"
      ? "text-cream-pure"
      : theme === "dark"
        ? "text-green"
        : "text-gold";

  if (variant === "mark") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={assetPath("/brand/logo-mark.svg")}
        alt=""
        width={40}
        height={40}
        className={className ?? `inline-block h-9 w-9 object-contain ${markColorClass}`}
        aria-hidden="true"
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={
          className ??
          `font-serif text-base font-semibold uppercase tracking-[0.14em] ${wordmarkColorClass}`
        }
      >
        {SITE.brand.toUpperCase()}
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/brand/logo-mark.svg")}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        aria-hidden="true"
      />
      <div className="flex flex-col text-start">
        <span
          className={`font-serif text-lg font-bold uppercase tracking-[0.16em] leading-none ${wordmarkColorClass}`}
        >
          {SITE.brand.toUpperCase()}
        </span>
        <span className="text-[9px] uppercase tracking-[0.22em] text-charcoal-muted mt-1">
          {SITE.line}
        </span>
      </div>
    </div>
  );
}

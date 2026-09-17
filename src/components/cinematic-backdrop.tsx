type Overlay = "hero" | "scene" | "section";

type CinematicBackdropProps = {
  src: string;
  alt?: string;
  overlay?: Overlay;
  className?: string;
  imgClassName?: string;
  layer?: "hero-backdrop";
  motion?: "kenburns" | "still";
  children?: React.ReactNode;
};

export function CinematicBackdrop({
  src,
  alt = "",
  overlay = "section",
  className,
  imgClassName,
  layer,
  motion = "kenburns",
  children,
}: CinematicBackdropProps) {
  return (
    <div
      data-hero-backdrop={layer === "hero-backdrop" ? "" : undefined}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden={alt === ""}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${imgClassName ?? "object-[center_62%]"} ${motion === "kenburns" ? "kenburns" : ""}`}
      />

      {overlay === "hero" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent md:from-black/45 md:via-black/10" />
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 55% 50% at 72% 62%, rgba(232,213,163,0.1) 0%, rgba(232,213,163,0.03) 30%, transparent 62%)",
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.28),inset_0_-60px_80px_rgba(0,0,0,0.35)]" />
        </>
      ) : overlay === "scene" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-green/30 via-green/20 to-green/75" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(7,20,13,0.55)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-green/75 via-green/70 to-green/85" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(7,20,13,0.55)]" />
        </>
      )}

      {children}
    </div>
  );
}

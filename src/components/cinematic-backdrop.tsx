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

const OVERLAY: Record<Overlay, string> = {
  hero: "bg-gradient-to-b from-green/40 via-green/10 to-green/55",
  scene: "bg-gradient-to-b from-green/30 via-green/25 to-green/80",
  section: "bg-gradient-to-b from-green/75 via-green/70 to-green/85",
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
      <div className={`absolute inset-0 ${OVERLAY[overlay]}`} />
      {children}
      <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(7,20,13,0.55)]" />
    </div>
  );
}

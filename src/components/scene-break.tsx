import { CinematicBackdrop } from "@/components/cinematic-backdrop";

type SceneBreakProps = {
  src: string;
  title?: string;
  subtitle?: string;
  heightClass?: string;
};

export function SceneBreak({
  src,
  title,
  subtitle,
  heightClass = "h-[45vh] min-h-[20rem] md:h-[60vh]",
}: SceneBreakProps) {
  return (
    <div className={`relative overflow-hidden ${heightClass}`}>
      <CinematicBackdrop src={src} overlay="scene" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/60" />
      
      {(title || subtitle) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
          {subtitle && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-light drop-shadow-sm">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="mt-2 font-serif text-3xl font-medium tracking-tight text-cream-pure drop-shadow-md sm:text-5xl">
              {title}
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

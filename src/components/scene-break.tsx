import { CinematicBackdrop } from "@/components/cinematic-backdrop";

type SceneBreakProps = {
  src: string;
  heightClass?: string;
};

export function SceneBreak({
  src,
  heightClass = "h-[70vh] min-h-[28rem] md:h-[85vh]",
}: SceneBreakProps) {
  return (
    <div className={`relative overflow-hidden ${heightClass}`}>
      <CinematicBackdrop src={src} overlay="scene" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-green to-transparent" />
    </div>
  );
}

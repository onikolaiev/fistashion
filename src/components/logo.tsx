type LogoProps = {
  variant: "mark" | "lockup";
  className?: string;
};

export function Logo({ variant, className }: LogoProps) {
  if (variant === "mark") {
    return (
      <img
        src="/brand/logo-mark.svg"
        alt="Fistashion"
        className={`inline-block object-contain ${className ?? "h-8 w-8"}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src="/brand/logo.svg"
      alt="Fistashion — فيستاشيون — The Bakery House"
      className={`h-auto w-[min(22rem,70vw)] object-contain ${className ?? ""}`}
    />
  );
}

import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/logo";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center bg-green px-6 pt-24 pb-16"
    >
      <div className="flex flex-col items-center text-center">
        <Logo variant="mark" className="h-28 w-28 object-contain sm:h-36 sm:w-36" />
        <h1 className="mt-8 font-serif text-4xl tracking-[0.18em] text-cream uppercase sm:text-5xl">
          FISTASHION
        </h1>
        <p className="mt-3 font-arabic text-2xl text-cream/85">{t("arabic")}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-cream/55">{t("line")}</p>
      </div>
    </section>
  );
}

import { getTranslations } from "next-intl/server";

export async function MobileStickyBar() {
  const t = await getTranslations("nav");

  return (
    <aside
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-green/95 px-4 py-3 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <a href="#menu" className="text-[11px] uppercase tracking-[0.16em] text-cream/80">
          {t("menu")}
        </a>
        <a href="#visit" className="text-[11px] uppercase tracking-[0.16em] text-cream/80">
          {t("visit")}
        </a>
        <a
          href="#contact"
          className="rounded-full bg-cream px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-green"
        >
          {t("contact")}
        </a>
      </div>
    </aside>
  );
}

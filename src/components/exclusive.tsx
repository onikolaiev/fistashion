import { getTranslations } from "next-intl/server";
import { LifeFrame } from "@/components/life-frame";
import { Section } from "@/components/section";

const ITEMS = [
  { key: "pastry", src: "/offerings/pastry.jpg", steam: false },
  { key: "desserts", src: "/offerings/confectionery.jpg", steam: false },
  { key: "coffee", src: "/offerings/coffee.jpg", steam: true },
  { key: "bread", src: "/offerings/bread.jpg", steam: false },
  { key: "breakfast", src: "/offerings/breakfasts.jpg", steam: false },
] as const;

export async function Exclusive() {
  const t = await getTranslations("exclusive");

  return (
    <Section id="menu" className="bg-green">
      <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-cream">
        {t("title")}
      </h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {ITEMS.map((item) => (
          <article key={item.key} className="group">
            <LifeFrame
              src={item.src}
              alt={t(`items.${item.key}.title`)}
              steam={item.steam}
              className="aspect-[4/5] rounded-sm bg-green-mid"
            />
            <h3 className="mt-4 font-serif text-xl text-cream">{t(`items.${item.key}.title`)}</h3>
            <p className="mt-1 text-sm leading-relaxed text-cream/65">{t(`items.${item.key}.desc`)}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

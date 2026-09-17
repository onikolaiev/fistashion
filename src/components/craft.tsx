import { getTranslations } from "next-intl/server";
import { LifeFrame } from "@/components/life-frame";
import { Section } from "@/components/section";

export async function Signature() {
  const t = await getTranslations("signature");

  return (
    <Section className="bg-green">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.95] text-cream">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-cream/75">{t("lead")}</p>
        </div>
        <LifeFrame
          src="/offerings/confectionery.jpg"
          alt=""
          className="aspect-[4/3] rounded-sm"
        />
      </div>
    </Section>
  );
}

export async function Craft() {
  const t = await getTranslations("craft");

  return (
    <>
      <Section className="bg-green pt-8 md:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <LifeFrame
            src="/offerings/coffee.jpg"
            alt=""
            steam
            className="aspect-[4/5] rounded-sm sm:aspect-[5/4]"
          />
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] leading-[0.95] text-cream">
              {t("coffeeTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-cream/70">{t("coffeeLead")}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-yellow text-green">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4rem)] leading-[0.95]">
              {t("breakfastTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink">{t("breakfastLead")}</p>
          </div>
          <LifeFrame
            src="/offerings/breakfasts.jpg"
            alt=""
            className="aspect-[4/3] rounded-sm"
          />
        </div>
      </Section>

      <Section className="bg-green">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <LifeFrame
            src="/offerings/bread.jpg"
            alt=""
            className="aspect-[16/11] rounded-sm"
          />
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] leading-[0.95] text-cream">
              {t("bakeTitle")}
            </h2>
            <p className="mt-6 text-lg text-cream/70">{t("bakeLead")}</p>
            <h3 className="mt-12 font-serif text-[clamp(1.8rem,4vw,3rem)] leading-tight text-cream">
              {t("dessertTitle")}
            </h3>
            <p className="mt-5 text-lg text-cream/70">{t("dessertLead")}</p>
          </div>
        </div>
      </Section>
    </>
  );
}

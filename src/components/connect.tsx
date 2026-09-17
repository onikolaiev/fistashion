import { getTranslations } from "next-intl/server";
import { InquiryForm } from "@/components/inquiry-form";
import { Section } from "@/components/section";
import { SITE } from "@/lib/site";

export async function Connect() {
  const t = await getTranslations("contact");

  return (
    <Section id="contact" className="bg-green">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="font-serif text-4xl text-cream/70 md:text-5xl">{t("kicker")}</p>
          <h2 className="font-serif text-[clamp(3rem,8vw,6rem)] leading-none text-cream">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-md text-lg text-cream/70">{t("lead")}</p>
          <div className="mt-10 space-y-6 text-sm">
            <div>
              <p className="uppercase tracking-[0.18em] text-cream/45">{t("visit")}</p>
              <p className="mt-2 text-cream">{SITE.fullAddress}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.18em] text-cream/45">{t("follow")}</p>
              <a
                href={SITE.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-cream underline underline-offset-4"
              >
                @{SITE.instagram.toLowerCase()}
              </a>
            </div>
          </div>
        </div>
        <InquiryForm />
      </div>
    </Section>
  );
}

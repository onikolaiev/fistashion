import { getTranslations } from "next-intl/server";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

export async function Franchise() {
  const t = await getTranslations("franchise");

  return (
    <Section id="franchise" className="bg-green-deep">
      <div className="grid items-start gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-4xl text-gold md:text-6xl">{t("title")}</h2>
          <p className="mt-8 max-w-md text-base leading-8 text-gold-muted">
            {t("lead")}
          </p>
        </Reveal>
        <Reveal delayMs={160}>
          <InquiryForm />
        </Reveal>
      </div>
    </Section>
  );
}

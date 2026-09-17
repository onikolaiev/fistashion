"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  composeInquiryMailto,
  validateInquiry,
  type InquiryErrors,
  type InquiryValues,
} from "@/lib/inquiry";
import { SITE } from "@/lib/site";

const EMPTY: InquiryValues = {
  name: "",
  contact: "",
  city: "",
  message: "",
};

export function InquiryForm() {
  const t = useTranslations("franchise");
  const [values, setValues] = useState<InquiryValues>(EMPTY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof InquiryValues>(key: K, value: InquiryValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    window.location.href = composeInquiryMailto(values);
    setSent(true);
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(SITE.email);
    setCopied(true);
  }

  const fieldClass =
    "w-full rounded-xl border border-gold/30 bg-cream-pure px-4 py-3 text-sm text-charcoal outline-none transition-all placeholder:text-charcoal-light/50 focus:border-green focus:ring-2 focus:ring-green/10";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-gold/30 bg-cream p-8 shadow-xl sm:p-10"
      noValidate
      aria-label="Franchise and Partnership Inquiry Form"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="franchise-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
            {t("name")} *
          </label>
          <input
            id="franchise-name"
            name="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
            placeholder="Your full name"
          />
          {errors.name ? (
            <span id="name-error" role="alert" className="mt-1.5 block text-xs text-red-600 font-medium">
              {t("errors.name")}
            </span>
          ) : null}
        </div>

        <div>
          <label htmlFor="franchise-contact" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
            {t("contact")} *
          </label>
          <input
            id="franchise-contact"
            name="contact"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "contact-error" : undefined}
            value={values.contact}
            onChange={(event) => update("contact", event.target.value)}
            className={fieldClass}
            placeholder="Email address or phone number"
          />
          {errors.contact ? (
            <span id="contact-error" role="alert" className="mt-1.5 block text-xs text-red-600 font-medium">
              {t("errors.contact")}
            </span>
          ) : null}
        </div>

        <div>
          <label htmlFor="franchise-city" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
            {t("city")}
          </label>
          <input
            id="franchise-city"
            name="city"
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
            className={fieldClass}
            placeholder="Preferred city / region"
          />
        </div>

        <div>
          <label htmlFor="franchise-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
            {t("message")} *
          </label>
          <textarea
            id="franchise-message"
            name="message"
            rows={4}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            className={`${fieldClass} resize-none`}
            placeholder="Tell us about your background or investment plans..."
          />
          {errors.message ? (
            <span id="message-error" role="alert" className="mt-1.5 block text-xs text-red-600 font-medium">
              {t("errors.message")}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-green py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream-pure shadow-md transition-all hover:bg-green-mid hover:shadow-lg focus:ring-2 focus:ring-green focus:outline-hidden"
        >
          {t("submit")}
        </button>

        {sent ? (
          <div role="status" className="rounded-xl bg-cream-soft p-4 text-center text-xs text-charcoal-muted">
            <p>{t("success")}</p>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-2 text-green font-semibold underline hover:text-green-mid"
            >
              {copied ? "Email copied!" : `Copy email: ${SITE.email}`}
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
}

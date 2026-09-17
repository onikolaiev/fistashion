"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  composeInquiryMailto,
  validateInquiry,
  type InquiryErrors,
  type InquiryValues,
} from "@/lib/inquiry";

const EMPTY: InquiryValues = {
  name: "",
  contact: "",
  city: "",
  message: "",
};

export function InquiryForm() {
  const t = useTranslations("contact");
  const [values, setValues] = useState<InquiryValues>(EMPTY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sent, setSent] = useState(false);

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

  const fieldClass =
    "w-full border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-sm text-cream outline-none placeholder:text-cream/35 focus:border-cream";

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate aria-label="Contact form">
      <div>
        <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-[0.18em] text-cream/55">
          {t("name")}
        </label>
        <input
          id="contact-name"
          name="name"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={fieldClass}
          placeholder="Your name"
        />
        {errors.name ? (
          <span role="alert" className="mt-2 block text-xs text-yellow">
            {t("errors.name")}
          </span>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-[0.18em] text-cream/55">
          {t("email")}
        </label>
        <input
          id="contact-email"
          name="contact"
          type="email"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.contact)}
          value={values.contact}
          onChange={(event) => update("contact", event.target.value)}
          className={fieldClass}
          placeholder="Your email"
        />
        {errors.contact ? (
          <span role="alert" className="mt-2 block text-xs text-yellow">
            {t("errors.contact")}
          </span>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-[0.18em] text-cream/55">
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us how we can help…"
        />
        {errors.message ? (
          <span role="alert" className="mt-2 block text-xs text-yellow">
            {t("errors.message")}
          </span>
        ) : null}
      </div>

      <button
        type="submit"
        className="rounded-full bg-cream px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-green transition-opacity hover:opacity-85"
      >
        {t("submit")}
      </button>

      {sent ? (
        <p role="status" className="text-sm text-cream/70">
          {t("success")}
        </p>
      ) : null}
    </form>
  );
}

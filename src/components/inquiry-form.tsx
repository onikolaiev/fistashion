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
    "w-full border-b border-gold/25 bg-transparent px-0 py-3 text-gold outline-none placeholder:text-gold-muted/40 focus:border-gold";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <label className="block">
        <span className="text-[11px] tracking-[0.22em] text-gold-muted">
          {t("name")}
        </span>
        <input
          name="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={fieldClass}
        />
        {errors.name ? (
          <span className="mt-2 block text-xs text-gold">{t("errors.name")}</span>
        ) : null}
      </label>
      <label className="block">
        <span className="text-[11px] tracking-[0.22em] text-gold-muted">
          {t("contact")}
        </span>
        <input
          name="contact"
          value={values.contact}
          onChange={(event) => update("contact", event.target.value)}
          className={fieldClass}
        />
        {errors.contact ? (
          <span className="mt-2 block text-xs text-gold">
            {t("errors.contact")}
          </span>
        ) : null}
      </label>
      <label className="block">
        <span className="text-[11px] tracking-[0.22em] text-gold-muted">
          {t("city")}
        </span>
        <input
          name="city"
          value={values.city}
          onChange={(event) => update("city", event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-[11px] tracking-[0.22em] text-gold-muted">
          {t("message")}
        </span>
        <textarea
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          className={`${fieldClass} resize-none`}
        />
        {errors.message ? (
          <span className="mt-2 block text-xs text-gold">
            {t("errors.message")}
          </span>
        ) : null}
      </label>
      <button
        type="submit"
        className="border border-gold/50 px-7 py-3 text-xs tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-green"
      >
        {t("submit")}
      </button>
      {sent ? (
        <div className="space-y-3 text-sm text-gold-muted">
          <p>{t("success")}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="text-[11px] tracking-[0.2em] text-gold underline-offset-4 hover:underline"
          >
            {copied ? t("copied") : t("copyEmail")}
          </button>
        </div>
      ) : null}
    </form>
  );
}

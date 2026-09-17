import { SITE } from "./site";

export type InquiryValues = {
  name: string;
  contact: string;
  city: string;
  message: string;
};

export type InquiryErrors = Partial<
  Record<"name" | "contact" | "message", true>
>;

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = true;
  if (!values.contact.trim()) errors.contact = true;
  if (!values.message.trim()) errors.message = true;
  return errors;
}

export function composeInquiryMailto(values: InquiryValues): string {
  const subject = `Fistashion — ${values.name.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Contact: ${values.contact.trim()}`,
    `City: ${values.city.trim() || "—"}`,
    "",
    values.message.trim(),
  ].join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

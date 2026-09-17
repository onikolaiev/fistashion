import { describe, expect, it } from "vitest";
import { composeInquiryMailto, validateInquiry } from "./inquiry";

describe("validateInquiry", () => {
  it("requires name, contact, and message", () => {
    expect(
      validateInquiry({ name: "", contact: "", city: "", message: "" }),
    ).toEqual({
      name: true,
      contact: true,
      message: true,
    });
  });

  it("accepts city as optional", () => {
    expect(
      validateInquiry({
        name: "Nora",
        contact: "n@a.co",
        city: "",
        message: "Franchise in Jeddah",
      }),
    ).toEqual({});
  });

  it("trims whitespace", () => {
    expect(
      validateInquiry({
        name: "  ",
        contact: " 1 ",
        city: "",
        message: " hi ",
      }),
    ).toEqual({ name: true });
  });
});

describe("composeInquiryMailto", () => {
  it("builds a Fistashion franchise mailto", () => {
    const href = composeInquiryMailto({
      name: "Nora",
      contact: "n@a.co",
      city: "Jeddah",
      message: "I want a shop",
    });
    expect(href.startsWith("mailto:Fistashion@gmail.com?")).toBe(true);
    expect(href).toContain(encodeURIComponent("Fistashion — Nora"));
    expect(href).toContain(encodeURIComponent("Jeddah"));
    expect(href).toContain(encodeURIComponent("I want a shop"));
  });
});

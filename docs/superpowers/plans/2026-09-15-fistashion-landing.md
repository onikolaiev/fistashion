# Fistashion Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a cinematic pre-opening landing page for Fistashion (The Bakery House) at fistashion.com in Arabic, English, and Russian.

**Architecture:** Next.js App Router with `next-intl` locale routes (`/en`, `/ar`, `/ru`). One page composed of section components. All copy lives in locale JSON. Form validation and mailto composition are pure functions with unit tests. Arabic sets `dir="rtl"` on `<html>`.

**Tech Stack:** Next.js (App Router, TypeScript, Tailwind), next-intl, Vitest, Google fonts (Cormorant Garamond + Outfit + Noto Naskh Arabic).

## Global Constraints

- Locales: `ar`, `en`, `ru`. Default locale: `en`.
- Domain: fistashion.com
- Brand: Fistashion / فيستاشيون — The Bakery House
- Street: Rufaidah Al Ansariyah, Al Jamiah, Madinah 42351
- Email: Fistashion@gmail.com
- Phone: +7 963 598 68 68
- Instagram: FISTASHION
- Status: not open yet. 24-hour operation is the intended model after opening.
- Offerings order (fixed): puff pastry, confectionery, bread, breakfasts, coffee
- Background `#0F2418`, gold `#E8D5A3`, muted gold `#C4B48A`
- No CMS, no auth, no prices, no opening date, no second venue, no light theme
- Form v1: mailto only, no server storage
- Copy is rewritten from the presentation; do not invent menu items
- Do not commit unless the user asks

---

## File map

Create:

- `src/i18n/routing.ts` — locales and default
- `src/i18n/navigation.ts` — locale-aware Link / usePathname / useRouter
- `src/i18n/request.ts` — load messages
- `src/middleware.ts` — next-intl middleware
- `src/lib/site.ts` — canonical facts
- `src/lib/inquiry.ts` — validate + compose mailto
- `src/lib/inquiry.test.ts`
- `src/messages/en.json`, `src/messages/ar.json`, `src/messages/ru.json`
- `src/app/globals.css`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/components/logo.tsx`
- `src/components/language-switcher.tsx`
- `src/components/header.tsx`
- `src/components/footer.tsx`
- `src/components/hero.tsx`
- `src/components/about.tsx`
- `src/components/offerings.tsx`
- `src/components/location.tsx`
- `src/components/atmosphere.tsx`
- `src/components/franchise.tsx`
- `src/components/inquiry-form.tsx`
- `public/offerings/*.jpg` — five editorial stills
- `vitest.config.ts`

Modify after `create-next-app`:

- `next.config.ts` — next-intl plugin
- `package.json` — next-intl, vitest, test script
- Remove default `src/app/page.tsx` / `src/app/layout.tsx` if the template created them at root

---

### Task 1: Scaffold Next.js + next-intl + Vitest

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/navigation.ts`, `src/i18n/request.ts`, `src/middleware.ts`, `vitest.config.ts`
- Modify: `next.config.ts`, `package.json`

**Interfaces:**
- Consumes: empty repo
- Produces: `routing` with `locales: ['ar','en','ru']` and `defaultLocale: 'en'`; `createNavigation(routing)` exports; `getRequestConfig` loads `src/messages/{locale}.json`

- [ ] **Step 1: Scaffold the app in the repo root**

Run from `d:\Sources\fistashion` (do not nest a second folder). If the directory is not empty because of `docs/`, use create-next-app in a temp dir and move files, or init manually. Prefer:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack --yes
```

If create-next-app refuses a non-empty directory, create files by hand with Next + Tailwind + ESLint. Expected: `package.json`, `src/app`, Tailwind config or CSS `@import "tailwindcss"`.

- [ ] **Step 2: Install i18n and test tools**

```bash
npm install next-intl
npm install -D vitest
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 3: Write i18n routing**

`src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
```

`src/i18n/navigation.ts`:

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

`src/i18n/request.ts`:

```ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

`src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

`vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 4: Leave stub message files so the plugin can resolve**

Create `src/messages/en.json`, `ar.json`, `ru.json` with `{ "meta": { "title": "Fistashion" } }` until Task 2 replaces them.

- [ ] **Step 5: Smoke the toolchain**

Run: `npx tsc --noEmit`
Expected: pass or only missing-page errors that Task 4/6 will fix. Do not commit.

---

### Task 2: Locale copy and site facts

**Files:**
- Create: `src/lib/site.ts`, `src/messages/en.json`, `src/messages/ar.json`, `src/messages/ru.json`

**Interfaces:**
- Consumes: Task 1 message path `src/messages/{locale}.json`
- Produces: `SITE` object; message trees with identical keys in all three files

- [ ] **Step 1: Write `src/lib/site.ts`**

```ts
export const SITE = {
  brand: "Fistashion",
  brandAr: "فيستاشيون",
  line: "The Bakery House",
  email: "Fistashion@gmail.com",
  phoneDisplay: "+7 963 598 68 68",
  phoneHref: "tel:+79635988688",
  instagram: "FISTASHION",
  instagramHref: "https://www.instagram.com/fistashion/",
  street: "Rufaidah Al Ansariyah, Al Jamiah, Madinah 42351",
  city: "Medina, Saudi Arabia",
  mapsQuery: "Rufaidah Al Ansariyah, Al Jamiah, Madinah 42351",
  domain: "https://fistashion.com",
} as const;

export const OFFERING_IDS = [
  "pastry",
  "confectionery",
  "bread",
  "breakfasts",
  "coffee",
] as const;

export type OfferingId = (typeof OFFERING_IDS)[number];
```

- [ ] **Step 2: Write the three message files with identical keys**

`src/messages/en.json` (full tree — ar/ru must mirror every key):

```json
{
  "meta": {
    "title": "Fistashion — The Bakery House",
    "description": "A bakery-coffee house in Medina. Opening soon beside the Islamic University."
  },
  "nav": {
    "about": "About",
    "offerings": "The house",
    "location": "Location",
    "franchise": "Franchise",
    "contact": "Contact"
  },
  "hero": {
    "badge": "Opening soon",
    "city": "Medina",
    "ctaLocation": "Find us",
    "ctaFranchise": "Franchise"
  },
  "about": {
    "title": "The house",
    "lead": "We are not only a coffee house and not only a bakery. We are one house.",
    "p1": "Pastry and confectionery are made here. Good coffee should be a joy for everyone — that is why our prices stay honest, so a small pleasure is possible every day.",
    "p2": "We will be open around the clock, on a visible first line beside the Islamic University, where there is almost no place like this."
  },
  "offerings": {
    "title": "What we bake and pour",
    "lead": "Every day we join the scent of fresh baking with the taste of real coffee.",
    "pastry": "Puff pastry",
    "confectionery": "Confectionery",
    "bread": "Bread",
    "breakfasts": "Breakfasts",
    "coffee": "Coffee"
  },
  "location": {
    "title": "Where we are",
    "p1": "A convenient, visible place beside the Islamic University. Comfortable parking — come by car with family or friends.",
    "p2": "We sit on the first line, easy to find and easy to read from the street."
  },
  "atmosphere": {
    "title": "Character, without the distance",
    "lead": "There is character, aesthetics, and a little ceremony. The main thing is this: we stay open to everyone.",
    "items": {
      "interior": "Atmosphere and interior",
      "assortment": "Assortment and presentation",
      "guests": "The people we serve",
      "style": "The visual language of the brand",
      "idea": "The idea we tell",
      "service": "A high level of service"
    }
  },
  "franchise": {
    "title": "Grow the house with us",
    "lead": "We are open to partners who want to develop this project. If you want to build a Fistashion of your own, write — we will talk through the details.",
    "name": "Name",
    "contact": "Email or phone",
    "city": "City",
    "message": "Message",
    "submit": "Send inquiry",
    "success": "Your mail app should open with the inquiry. If it does not, write to us directly.",
    "copyEmail": "Copy email",
    "copied": "Copied",
    "errors": {
      "name": "Please tell us your name.",
      "contact": "Please leave an email or a phone number.",
      "message": "Please write a short message."
    }
  },
  "footer": {
    "rights": "The Bakery House, Medina"
  }
}
```

Russian (`src/messages/ru.json`) — same keys, rewritten (not the garbled deck):

- nav: О нас / Дом / Локация / Франшиза / Контакты
- hero.badge: Скоро открытие
- about.title: Дом
- about.lead: Мы не только кофейня и не только пекарня. Мы — один дом.
- offerings.title: Что печём и наливаем
- offerings: Слойка / Кондитерская / Хлеб / Завтраки / Кофе
- location.title: Где мы
- atmosphere.title: Характер без дистанции
- franchise.title: Растите дом вместе с нами

Arabic (`src/messages/ar.json`) — same keys, formal Gulf Arabic:

- nav: عنّا / البيت / الموقع / الامتياز / تواصل
- hero.badge: قريبًا
- about.title: البيت
- about.lead: لسنا مقهى فقط ولسنا مخبزًا فقط. نحن بيت واحد.
- offerings: المعجنات / الحلويات / الخبز / الإفطار / القهوة
- location.title: أين نحن
- atmosphere.title: حضور بلا مسافة
- franchise.title: ابنِ البيت معنا

- [ ] **Step 3: Type-check messages mentally** — every key in `en.json` exists in `ar.json` and `ru.json`. No extra keys.

Do not commit.

---

### Task 3: Inquiry validation and mailto (TDD)

**Files:**
- Create: `src/lib/inquiry.ts`, `src/lib/inquiry.test.ts`

**Interfaces:**
- Consumes: `SITE.email` from `src/lib/site.ts`
- Produces:
  - `export type InquiryValues = { name: string; contact: string; city: string; message: string }`
  - `export type InquiryErrors = Partial<Record<'name' | 'contact' | 'message', true>>`
  - `export function validateInquiry(values: InquiryValues): InquiryErrors`
  - `export function composeInquiryMailto(values: InquiryValues): string`

- [ ] **Step 1: Write the failing tests**

`src/lib/inquiry.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { composeInquiryMailto, validateInquiry } from "./inquiry";

describe("validateInquiry", () => {
  it("requires name, contact, and message", () => {
    expect(validateInquiry({ name: "", contact: "", city: "", message: "" })).toEqual({
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
      validateInquiry({ name: "  ", contact: " 1 ", city: "", message: " hi " }),
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
    expect(href).toContain(encodeURIComponent("Fistashion franchise — Nora"));
    expect(href).toContain(encodeURIComponent("Jeddah"));
    expect(href).toContain(encodeURIComponent("I want a shop"));
  });
});
```

- [ ] **Step 2: Run tests — they must fail**

Run: `npm test`
Expected: FAIL — cannot find `./inquiry`

- [ ] **Step 3: Implement `src/lib/inquiry.ts`**

```ts
import { SITE } from "./site";

export type InquiryValues = {
  name: string;
  contact: string;
  city: string;
  message: string;
};

export type InquiryErrors = Partial<Record<"name" | "contact" | "message", true>>;

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = true;
  if (!values.contact.trim()) errors.contact = true;
  if (!values.message.trim()) errors.message = true;
  return errors;
}

export function composeInquiryMailto(values: InquiryValues): string {
  const subject = `Fistashion franchise — ${values.name.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Contact: ${values.contact.trim()}`,
    `City: ${values.city.trim() || "—"}`,
    "",
    values.message.trim(),
  ].join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Run tests — they must pass**

Run: `npm test`
Expected: PASS, 4 tests.

Do not commit.

---

### Task 4: Design tokens, fonts, logo

**Files:**
- Create: `src/components/logo.tsx`
- Modify: `src/app/globals.css`, `src/app/[locale]/layout.tsx` (created here if missing)

**Interfaces:**
- Consumes: none
- Produces: `Logo({ variant: 'mark' | 'lockup' })` SVG; CSS variables `--green`, `--gold`, `--gold-muted`

- [ ] **Step 1: Tokens in `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --green: #0f2418;
  --green-deep: #07140d;
  --gold: #e8d5a3;
  --gold-muted: #c4b48a;
}

html {
  background: var(--green);
  color: var(--gold);
  scroll-behavior: smooth;
}

body {
  background: var(--green);
  color: var(--gold);
  font-family: var(--font-outfit), var(--font-arabic), sans-serif;
}

h1, h2, h3 {
  font-family: var(--font-serif), var(--font-arabic), serif;
  font-weight: 500;
  letter-spacing: 0.04em;
}
```

- [ ] **Step 2: Redraw the logo as SVG in `src/components/logo.tsx`**

Gold stroke on transparent. `variant="mark"` is wreath + pistachio only (header). `variant="lockup"` adds FISTASHION, فيستاشيون, The Bakery House (hero). Use currentColor. Recreate the provided mark: oval pistachio / V, open at the top, laurel sprays left and right.

- [ ] **Step 3: Locale layout with fonts and RTL**

`src/app/[locale]/layout.tsx` loads Cormorant Garamond, Outfit, Noto Naskh Arabic. Sets `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`. Wraps children in `NextIntlClientProvider`. `generateStaticParams` from `routing.locales`. Metadata from `meta.title` / `meta.description`.

If the template left `src/app/layout.tsx` + `src/app/page.tsx`, delete `page.tsx` and keep a thin root layout only if Next requires it; prefer a single `[locale]` root layout.

Do not commit.

---

### Task 5: Chrome — header, switcher, footer

**Files:**
- Create: `src/components/language-switcher.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`

**Interfaces:**
- Consumes: `Link`, `usePathname` from `@/i18n/navigation`; `routing.locales`; `SITE`; `useTranslations('nav'|'footer')`
- Produces: sticky header with mark, five anchors `#about #offerings #location #franchise #contact`, switcher `AR | EN | RU`; footer with email, phone, Instagram, street

- [ ] **Step 1: Language switcher**

Client component. Maps `AR`/`EN`/`RU` to `ar`/`en`/`ru`. Uses `usePathname()` + `Link` with `href={pathname}` and `locale={code}` so the current page (and hash if present) stays put.

- [ ] **Step 2: Header and footer**

Header: sticky, translucent green, logo mark + FISTASHION wordmark, desktop nav, switcher. Footer: `id="contact"`, four facts from `SITE` (mailto, tel, Instagram, address). No opening hours.

Do not commit.

---

### Task 6: Page sections and form

**Files:**
- Create: `src/components/hero.tsx`, `about.tsx`, `offerings.tsx`, `location.tsx`, `atmosphere.tsx`, `franchise.tsx`, `inquiry-form.tsx`, `src/app/[locale]/page.tsx`
- Create: `public/offerings/pastry.jpg`, `confectionery.jpg`, `bread.jpg`, `breakfasts.jpg`, `coffee.jpg`

**Interfaces:**
- Consumes: `useTranslations`, `SITE`, `OFFERING_IDS`, `validateInquiry`, `composeInquiryMailto`, `Logo`
- Produces: home page assembling sections in spec order

- [ ] **Step 1: Source five offering stills**

Place JPGs in `public/offerings/` matching the five ids. Editorial, close, warm bakery/coffee. Circular crop is CSS (`rounded-full object-cover`).

- [ ] **Step 2: Build section components**

Hero: full viewport, lockup logo, badge, two buttons (`#location`, `#franchise`).
About: `id="about"`, title + three paragraphs.
Offerings: `id="offerings"`, five circles in `OFFERING_IDS` order, labels from `offerings.{id}`.
Location: `id="location"`, copy + Google Maps iframe `https://maps.google.com/maps?q={encodeURIComponent(SITE.mapsQuery)}&z=16&output=embed`.
Atmosphere: `id="atmosphere"`, lead + six items.
Franchise: `id="franchise"`, lead + `InquiryForm`.

- [ ] **Step 3: Inquiry form behaviour**

Client component. State: `InquiryValues` + `InquiryErrors` + `sent` boolean. On submit: `errors = validateInquiry(values)`; if any key, set errors and return; else `window.location.href = composeInquiryMailto(values)` and set `sent`. Show field errors from `franchise.errors.*`. Show `franchise.success` and a button that copies `SITE.email`.

- [ ] **Step 4: Compose `src/app/[locale]/page.tsx`**

Render Header, Hero, About, Offerings, Location, Atmosphere, Franchise, Footer in that order. No extra sections.

Do not commit.

---

### Task 7: Verify

**Files:** none new

- [ ] **Step 1: Unit tests**

Run: `npm test`
Expected: 4 passing inquiry tests.

- [ ] **Step 2: Typecheck and build**

Run: `npx tsc --noEmit` then `npm run build`
Expected: success. All three locales pre-rendered.

- [ ] **Step 3: Browser pass**

Run `npm run dev`. Check `http://localhost:3000/en`, `/ar` (RTL mirroring), `/ru`. Click anchors, switch language, submit empty form (inline errors), submit valid form (mailto). Desktop ≈1280 and mobile ≈375. Logo is SVG-sharp.

If something fails, fix it in place before calling the work done.

---

## Spec coverage

| Spec item | Task |
| --- | --- |
| One landing, three locales, RTL | 1, 4, 5 |
| Section order + five offerings order | 2, 6 |
| Canonical facts / no invented prices or date | 2 |
| SVG logo, green/gold system | 4 |
| Mailto form + copy fallback | 3, 6 |
| Sticky header, footer contacts | 5 |
| Desktop/mobile/RTL verification | 7 |
| Out of scope (CMS, orders, light theme) | not scheduled |

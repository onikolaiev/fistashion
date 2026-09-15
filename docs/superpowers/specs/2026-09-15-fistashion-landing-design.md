# Fistashion landing page

Single cinematic landing for [fistashion.com](https://fistashion.com): a pre-opening bakery-coffee house in Medina. Guests see atmosphere, the five offerings, and the location. Partners see a franchise invitation. Three languages: Arabic, English, Russian.

## Goal

Ship a luxury one-page site that feels like the brand presentation: deep forest green, champagne gold, generous space, circular food frames. The cafe is not open yet. Primary guest action is “find us / write us.” Primary partner action is a franchise inquiry.

## Audience

- Medina guests (Arabic and English first)
- Russian-speaking partners and franchise interest
- One scroll serves both. Franchise is a late section, not a second site.

## Stack

- Next.js App Router, static-friendly
- `next-intl` for `ar` / `en` / `ru`
- Arabic sets `dir="rtl"` and `lang="ar"` on the document
- All copy lives in locale JSON files, never hardcoded in components
- Logo redrawn as SVG from the provided mark (laurel wreath + pistachio / “V” monogram + FISTASHION + فيستاشيون + The Bakery House)
- No CMS, no auth, no online ordering, no menu prices

Default locale: `en` (Saudi public web default). Language switcher always visible. Locale is stored in the URL (`/en`, `/ar`, `/ru`) so each language is shareable and indexable.

## Page sections (top to bottom)

Sticky header: mark + wordmark, in-page anchors (About, Offerings, Location, Franchise, Contact), language switcher `AR | EN | RU`.

1. **Hero** — full-viewport green field, SVG logo lockup, “The Bakery House”, Medina, quiet “Opening soon” badge. Two actions: jump to Location, jump to Franchise.
2. **About** — not only a cafe, not only a bakery. Fresh production on site, honest prices, 24 hours, next to the Islamic University.
3. **Offerings** — five circular frames in this exact order:
   1. Puff pastry
   2. Confectionery
   3. Bread
   4. Breakfasts
   5. Coffee
4. **Location** — Rufaidah Al Ansariyah, Al Jamiah, Madinah 42351. Visible first-line unit, parking, easy to reach with family or friends. Embedded map pin to that address. Faisaliyah 42351 from the closing slide is treated as the same city/postal context, not a second venue.
5. **Atmosphere** — character and aesthetics without losing accessibility. Six points: interior, assortment and presentation, guests, visual style, marketing idea, service level.
6. **Franchise** — open to partners who want to grow the concept. Form fields: name, contact (email or phone), city, message. Submit opens a prefilled `mailto:Fistashion@gmail.com`. If the client cannot open mail, show the address and a copy button.
7. **Footer / contact** — email, phone, Instagram, street address. No fake opening hours (not open yet).

## Visual system

| Token | Value |
| --- | --- |
| Background | `#0F2418` deep forest, near-black in footer |
| Gold | `#E8D5A3` champagne for type, rules, logo |
| Gold muted | `#C4B48A` secondary text |
| Surface | slightly lighter green panels, no white cards |
| Radius | circles for food; soft 24–32px on location frames |
| Type Latin | elegant serif headlines (Cormorant Garamond or equivalent), clean sans body |
| Type Arabic | matching luxury Arabic face (e.g. Noto Naskh Arabic or IBM Plex Sans Arabic for UI) |
| Motion | slow fade/rise on scroll, no playful bounce |
| Imagery | editorial bakery/coffee stills in the same green-gold world; circular crops |

No stock-looking grids, no generic “startup SaaS” layout, no light mode.

## Canonical facts

- Brand: Fistashion / فيستاشيون
- Line: The Bakery House
- City: Medina, Saudi Arabia
- Street: Rufaidah Al Ansariyah, Al Jamiah, Madinah 42351
- Email: Fistashion@gmail.com
- Phone: +7 963 598 68 68
- Instagram: FISTASHION
- Status: not open yet; 24-hour operation is the intended model after opening
- Domain: fistashion.com

Copy in all three languages is rewritten from the presentation (the deck Russian is garbled). Tone: calm, precise, a little ceremonial, never cheap or loud. Do not invent menu items, prices, opening date, or a second address.

## Components

- `LanguageSwitcher` — three locales, preserves the current section hash when possible
- `Header` / `Footer`
- `Hero`, `About`, `Offerings`, `Location`, `Atmosphere`, `Franchise`
- `Logo` — SVG, used in header (compact) and hero (full lockup)
- `InquiryForm` — client validation, mailto compose, success/error text per locale

Each section is a self-contained component that only receives translated strings and static assets.

## Form behaviour

- Required: name, contact, message. City optional.
- Invalid submit: inline field errors, no navigation.
- Valid submit: `mailto:` with subject `Fistashion franchise — {name}` and the fields in the body.
- No server storage in v1.

## Out of scope

- Online ordering, reservations, payments
- Real menu PDF or prices
- Separate `/franchise` site
- CMS, blog, accounts
- Backend email API
- Light theme

## Verification

- Desktop and mobile (≈375 and ≈1280)
- All three languages, Arabic RTL mirroring
- Anchors, language switch, mailto form (valid and invalid)
- Logo sharpness (SVG, not the source PNG at display size)

## Success

A guest understands what Fistashion is, where it will be, and that it is not open yet. A partner can send a franchise note in one minute. The page looks like the presentation, not like a template.

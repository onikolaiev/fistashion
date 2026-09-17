# Fistashion — The Bakery House (Medina)

> Haute Pâtisserie & Specialty Coffee Salon in Medina Al-Munawwarah.

Live Website: [https://onikolaiev.github.io/fistashion/](https://onikolaiev.github.io/fistashion/)

## Architectural & Culinary Direction
- **Theme:** Light Luxury (Calacatta marble, French bistro brass, deep emerald green)
- **Cuisine:** 72-hour slow-fermented French viennoiserie, stone-ground Mediterranean pistachios, single-origin specialty coffee roasts
- **Location:** First line beside the Islamic University of Madinah (`FHF8+VF4, Al Jamiah, Madinah 42351, Saudi Arabia`)

## Tech Stack
- **Framework:** Next.js 16 (App Router, Static HTML Export `output: "export"`)
- **Localization:** `next-intl` (Arabic `ar`, English `en`, Russian `ru`) with RTL support
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP 3 + ScrollTrigger
- **Standards:** WCAG 2.1 AA Accessibility, Schema.org (JSON-LD) Local Business markup, SEO sitemap & robots
- **Deployment:** Automated GitHub Pages via GitHub Actions

## Development
```bash
npm install
npm run dev
```

## Production Build & Static Export
```bash
npm run build
```
Outputs static site to `./out`.

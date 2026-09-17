"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

type CategoryKey = "all" | "viennoiserie" | "pastry" | "coffee" | "savory";

export function SignatureMenu() {
  const t = useTranslations("menu");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const categories: { id: CategoryKey; label: string }[] = [
    { id: "all", label: t("categories.all") },
    { id: "viennoiserie", label: t("categories.viennoiserie") },
    { id: "pastry", label: t("categories.pastry") },
    { id: "coffee", label: t("categories.coffee") },
    { id: "savory", label: t("categories.savory") },
  ];

  type RawMenuItem = {
    id: string;
    category: string;
    name: string;
    arabicName: string;
    desc: string;
    tag: string;
    notes: string;
  };

  const items = t.raw("items") as RawMenuItem[];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <Section id="menu" className="bg-cream-pure">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream-soft px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {t("badge")}
            </div>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-green sm:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-base leading-relaxed text-charcoal-muted sm:text-lg">
              {t("lead")}
            </p>
          </Reveal>
        </div>

        {/* Category Navigation Pills */}
        <Reveal delayMs={160} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-gold/25 bg-cream p-1.5 shadow-xs"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${cat.id}`}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive
                      ? "bg-green text-cream-pure shadow-sm"
                      : "text-charcoal-muted hover:text-green"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Menu Cards Grid */}
        <div
          role="tabpanel"
          id={`panel-${selectedCategory}`}
          aria-labelledby={`tab-${selectedCategory}`}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delayMs={80 + index * 40}>
              <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-gold/30 bg-cream p-7 shadow-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:bg-cream-pure hover:shadow-xl">
                
                {/* Top Badge & Category */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-full border border-gold/40 bg-cream-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                      {item.tag}
                    </span>
                    <span className="font-serif text-xs font-light text-charcoal-light">
                      {item.arabicName}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-serif text-xl font-bold tracking-tight text-green transition-colors group-hover:text-gold-dark">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-charcoal-muted">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tasting Notes bar */}
                <div className="mt-6 border-t border-gold/20 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold/70 group-hover:bg-gold" />
                    <p className="text-[11px] font-medium tracking-wide text-charcoal-muted group-hover:text-charcoal">
                      {item.notes}
                    </p>
                  </div>
                </div>

              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom Menu Note & Order Prompt */}
        <Reveal delayMs={240} className="mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-3 sm:flex-row">
            <span className="text-xs text-charcoal-muted">
              Looking for our daily special bakes or private pastry gift boxes?
            </span>
            <a
              href="#location"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green transition-colors hover:text-gold-dark underline underline-offset-4"
            >
              Visit Our Salon Today →
            </a>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}

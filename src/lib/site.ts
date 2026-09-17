export const SITE = {
  brand: "Fistashion",
  brandAr: "فيستاشيون",
  line: "The Bakery House",
  email: "Fistashion@gmail.com",
  phoneDisplay: "+966 54 905 02 82",
  phoneHref: "tel:+966549050282",
  whatsappHref: "https://wa.me/966549050282",
  instagram: "FISTASHION",
  instagramHref: "https://www.instagram.com/fistashion/",
  street: "FHF8+VF4, Al Jamiah, Madinah 42351",
  city: "Madinah, Saudi Arabia",
  fullAddress: "FHF8+VF4, Al Jamiah, Madinah 42351, Saudi Arabia",
  mapsQuery: "FHF8+VF4, Al Jamiah, Madinah 42351, Saudi Arabia",
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

export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}

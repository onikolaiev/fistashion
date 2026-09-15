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

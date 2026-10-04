import { site } from "@/config/site";
// Phase 1: catalog lives in code. Phase 2 moves this to Supabase + admin panel.

export type CategoryId = "oils";

export type Category = {
  id: CategoryId;
  name: string;
  kannada: string;
  blurb: string;
};

// mrp: the struck-out price. Usually left out: it is worked out from site.discountPercent
// (see `products` below). Set it on a size only to override that.
export type Variant = { size: string; price: number; mrp?: number };

export type ArtKind = "bottle" | "pouch" | "jar";

export type Product = {
  slug: string;
  name: string;
  kannada: string;
  category: CategoryId;
  short: string;
  description: string;
  uses: string[];
  variants: Variant[];
  art: { kind: ArtKind; fill: string; tint?: string };
  // Real photo in public/products/; the illustration in `art` is the fallback
  photo?: string;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    id: "oils",
    name: "Wood-pressed oils",
    kannada: "ಗಾಣದ ಎಣ್ಣೆ",
    blurb: "Cold-pressed slowly in a wooden chekku. Nothing added, nothing refined.",
  },
];

const baseProducts: Product[] = [
  {
    slug: "groundnut-oil",
    name: "Groundnut oil",
    kannada: "ಶೇಂಗಾ ಎಣ್ಣೆ",
    category: "oils",
    short: "Everyday cooking oil with a nutty smell.",
    description:
      "Pressed from groundnuts in a wooden chekku at low speed, so the oil stays cool and keeps its natural aroma. Filtered by settling, not chemicals.",
    uses: ["Daily cooking", "Deep frying", "Chutneys and gojju"],
    variants: [
      { size: "1 L", price: 300 },
      { size: "3 L", price: 900 },
      { size: "5 L", price: 1500 },
    ],
    art: { kind: "bottle", fill: "#E3A934" },
    photo: "/products/groundnut-oil.webp",
    featured: true,
  },
  {
    slug: "sunflower-oil",
    name: "Sunflower oil",
    kannada: "ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ",
    category: "oils",
    short: "Light and mild, for those who want little flavour.",
    description: "Wood-pressed from sunflower seed. Lighter taste than groundnut, unrefined.",
    uses: ["Daily cooking", "Frying", "Baking"],
    variants: [
      { size: "1 L", price: 350 },
      { size: "3 L", price: 1050 },
      { size: "5 L", price: 1750 },
    ],
    art: { kind: "bottle", fill: "#F0C64A" },
    photo: "/products/sunflower-oil.webp",
    featured: true,
  },
  {
    slug: "coconut-oil",
    name: "Coconut oil",
    kannada: "ತೆಂಗಿನ ಎಣ್ಣೆ",
    category: "oils",
    short: "Pressed from dried copra. For cooking, hair and skin.",
    description:
      "Clear, fragrant oil pressed from dried copra. Solidifies below 24°C, which is normal for pure coconut oil.",
    uses: ["Cooking", "Hair oil", "Baby massage"],
    variants: [
      { size: "500 ml", price: 300 },
      { size: "1 L", price: 600 },
      { size: "3 L", price: 1800 },
      { size: "5 L", price: 3000 },
    ],
    art: { kind: "bottle", fill: "#F1E6C2" },
    photo: "/products/coconut-oil.webp",
    featured: true,
  },
  {
    slug: "safflower-oil",
    name: "Safflower oil",
    kannada: "ಕುಸುಬಿ ಎಣ್ಣೆ",
    category: "oils",
    short: "Light, mild oil for everyday cooking.",
    description: "Wood-pressed from safflower (kusubi) seed. Mild taste, unrefined.",
    uses: ["Daily cooking", "Frying"],
    variants: [
      { size: "1 L", price: 480 },
      { size: "3 L", price: 1440 },
      { size: "5 L", price: 2400 },
    ],
    art: { kind: "bottle", fill: "#E8B84A" },
    photo: "/products/safflower-oil.webp",
    featured: true,
  },
  {
    slug: "sesame-oil",
    name: "Sesame oil",
    kannada: "ಎಳ್ಳಿನ ಎಣ್ಣೆ",
    category: "oils",
    short: "Gingelly oil for tempering, pickles and oil baths.",
    description: "Wood-pressed from sesame seed. Rich, nutty and deep amber in colour.",
    uses: ["Tempering", "Pickles", "Oil bath"],
    variants: [
      { size: "250 ml", price: 150 },
      { size: "500 ml", price: 300 },
      { size: "1 L", price: 600 },
      { size: "3 L", price: 1800 },
      { size: "5 L", price: 3000 },
    ],
    art: { kind: "bottle", fill: "#B5651D" },
    photo: "/products/sesame-oil.webp",
    featured: true,
  },
  {
    slug: "mustard-oil",
    name: "Mustard oil",
    kannada: "ಸಾಸಿವೆ ಎಣ್ಣೆ",
    category: "oils",
    short: "Sharp and pungent. Good for pickles.",
    description: "Pressed from mustard seed. Strong flavour that mellows when heated.",
    uses: ["Pickles", "North Indian cooking"],
    variants: [
      { size: "250 ml", price: 150 },
      { size: "500 ml", price: 300 },
    ],
    art: { kind: "bottle", fill: "#C9A227" },
    photo: "/products/mustard-oil.webp",
    featured: true,
  },
  {
    slug: "castor-oil",
    name: "Castor oil",
    kannada: "ಹರಳೆಣ್ಣೆ",
    category: "oils",
    short: "Thick oil for hair and skin. Not for cooking.",
    description: "Pressed from castor seeds. Traditionally used for hair, skin and oil baths.",
    uses: ["Hair care", "Skin care"],
    variants: [
      { size: "250 ml", price: 125 },
      { size: "500 ml", price: 250 },
    ],
    art: { kind: "bottle", fill: "#D9C27A" },
    photo: "/products/castor-oil.webp",
  },
  {
    slug: "deepam-oil",
    name: "Deepam oil",
    kannada: "ದೀಪದ ಎಣ್ಣೆ",
    category: "oils",
    short: "Lamp oil for pooja and deepam. Not for cooking.",
    description: "For lighting deepam and lamps at home and in temples. Not for cooking or eating.",
    uses: ["Pooja lamps", "Temple deepam"],
    variants: [{ size: "1 L", price: 220 }],
    art: { kind: "bottle", fill: "#E07B2E" },
    photo: "/products/deepam-oil.webp",
  },
];

// Fill in the struck-out price for every size from the store-wide discount; selling prices stay as above.
const off = site.discountPercent / 100;
export const products: Product[] = baseProducts.map((p) => ({
  ...p,
  variants: p.variants.map((v) => ({ ...v, mrp: v.mrp ?? (off > 0 ? Math.round(v.price / (1 - off)) : undefined) })),
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const productsIn = (id: CategoryId) => products.filter((p) => p.category === id);
export const fromPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));
export const cheapest = (p: Product) => p.variants.reduce((a, v) => (v.price < a.price ? v : a));
export const percentOff = (v: Variant) => (v.mrp && v.mrp > v.price ? Math.round((1 - v.price / v.mrp) * 100) : 0);
export const bestOff = (p: Product) => Math.max(...p.variants.map(percentOff));

// Phase 1: catalog lives in code. Phase 2 moves this to Supabase + admin panel.
// TODO(client): replace placeholder prices/sizes with real ones.

export type CategoryId = "oils" | "shavige" | "pantry";

export type Category = {
  id: CategoryId;
  name: string;
  kannada: string;
  blurb: string;
};

export type Variant = { size: string; price: number };

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
  featured?: boolean;
};

export const categories: Category[] = [
  {
    id: "oils",
    name: "Wood-pressed oils",
    kannada: "ಗಾಣದ ಎಣ್ಣೆ",
    blurb: "Cold-pressed slowly in a wooden chekku. Nothing added, nothing refined.",
  },
  {
    id: "shavige",
    name: "Shavige & vermicelli",
    kannada: "ಶಾವಿಗೆ",
    blurb: "For upma, payasa and kheer. Made from wheat, ragi and rice.",
  },
  {
    id: "pantry",
    name: "Pantry",
    kannada: "ದಿನಸಿ",
    blurb: "A few traditional staples we stock alongside the oils.",
  },
];

export const products: Product[] = [
  {
    slug: "groundnut-oil",
    name: "Groundnut oil",
    kannada: "ಕಡಲೆಕಾಯಿ ಎಣ್ಣೆ",
    category: "oils",
    short: "Everyday cooking oil with a nutty smell.",
    description:
      "Pressed from sun-dried groundnuts in a wooden chekku at low speed, so the oil stays cool and keeps its natural aroma. Filtered by settling, not chemicals.",
    uses: ["Daily cooking", "Deep frying", "Chutneys and gojju"],
    variants: [
      { size: "500 ml", price: 180 },
      { size: "1 L", price: 340 },
      { size: "5 L", price: 1600 },
    ],
    art: { kind: "bottle", fill: "#E3A934" },
    featured: true,
  },
  {
    slug: "sesame-oil",
    name: "Sesame oil",
    kannada: "ಎಳ್ಳೆಣ್ಣೆ",
    category: "oils",
    short: "Gingelly oil for tempering, pickles and oil baths.",
    description:
      "Made from black and white sesame with a little jaggery in the press, the traditional way. Rich, slightly sweet and deep amber in colour.",
    uses: ["Tempering", "Pickles", "Oil bath"],
    variants: [
      { size: "500 ml", price: 250 },
      { size: "1 L", price: 480 },
    ],
    art: { kind: "bottle", fill: "#B5651D" },
    featured: true,
  },
  {
    slug: "coconut-oil",
    name: "Coconut oil",
    kannada: "ಕೊಬ್ಬರಿ ಎಣ್ಣೆ",
    category: "oils",
    short: "Pressed from dried copra. For cooking, hair and skin.",
    description:
      "Clear, fragrant oil pressed from sun-dried copra. Solidifies below 24°C, which is normal for pure coconut oil.",
    uses: ["Cooking", "Hair oil", "Baby massage"],
    variants: [
      { size: "500 ml", price: 220 },
      { size: "1 L", price: 420 },
    ],
    art: { kind: "bottle", fill: "#F1E6C2" },
    featured: true,
  },
  {
    slug: "mustard-oil",
    name: "Mustard oil",
    kannada: "ಸಾಸಿವೆ ಎಣ್ಣೆ",
    category: "oils",
    short: "Sharp and pungent. Good for pickles.",
    description: "Pressed from yellow mustard seed. Strong flavour that mellows when heated.",
    uses: ["Pickles", "North Indian cooking"],
    variants: [
      { size: "500 ml", price: 160 },
      { size: "1 L", price: 300 },
    ],
    art: { kind: "bottle", fill: "#C9A227" },
    featured: true,
  },
  {
    slug: "sunflower-oil",
    name: "Sunflower oil",
    kannada: "ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ",
    category: "oils",
    short: "Light and mild, for those who want little flavour.",
    description: "Wood-pressed from sunflower seed. Lighter taste than groundnut, unrefined.",
    uses: ["Daily cooking", "Baking"],
    variants: [
      { size: "1 L", price: 260 },
      { size: "5 L", price: 1250 },
    ],
    art: { kind: "bottle", fill: "#F0C64A" },
  },
  {
    slug: "castor-oil",
    name: "Castor oil",
    kannada: "ಹರಳೆಣ್ಣೆ",
    category: "oils",
    short: "Thick oil for hair and skin. Not for cooking.",
    description: "Pressed from castor seeds. Traditionally used for hair, lamps and oil baths.",
    uses: ["Hair care", "Deepam lamps"],
    variants: [{ size: "500 ml", price: 220 }],
    art: { kind: "bottle", fill: "#D9C27A" },
  },
  {
    slug: "wheat-shavige",
    name: "Wheat shavige",
    kannada: "ಗೋಧಿ ಶಾವಿಗೆ",
    category: "shavige",
    short: "Roasted wheat vermicelli for upma and payasa.",
    description: "Thin, pre-roasted vermicelli. Cooks in about 5 minutes.",
    uses: ["Shavige upma", "Payasa"],
    variants: [
      { size: "200 g", price: 35 },
      { size: "500 g", price: 70 },
    ],
    art: { kind: "pouch", fill: "#D8A657", tint: "#2F6B3A" },
    featured: true,
  },
  {
    slug: "ragi-shavige",
    name: "Ragi shavige",
    kannada: "ರಾಗಿ ಶಾವಿಗೆ",
    category: "shavige",
    short: "Finger-millet vermicelli. High in calcium and fibre.",
    description: "Made from ragi flour. Steam or cook like regular shavige.",
    uses: ["Ragi shavige bath", "Sweet shavige"],
    variants: [
      { size: "200 g", price: 45 },
      { size: "500 g", price: 90 },
    ],
    art: { kind: "pouch", fill: "#7A4A35", tint: "#8B3A2B" },
    featured: true,
  },
  {
    slug: "rice-shavige",
    name: "Rice shavige",
    kannada: "ಅಕ್ಕಿ ಶಾವಿಗೆ",
    category: "shavige",
    short: "Fine rice noodles for lemon and coconut shavige.",
    description: "Thin rice vermicelli. Soak in hot water for 3 minutes, then season.",
    uses: ["Lemon shavige", "Coconut shavige"],
    variants: [
      { size: "200 g", price: 40 },
      { size: "500 g", price: 80 },
    ],
    art: { kind: "pouch", fill: "#EDE6D3", tint: "#3D5A80" },
  },
  {
    slug: "jaggery-powder",
    name: "Jaggery powder",
    kannada: "ಬೆಲ್ಲದ ಪುಡಿ",
    category: "pantry",
    short: "Chemical-free jaggery, powdered for easy use.",
    description: "Made from sugarcane juice without chemical clarifiers.",
    uses: ["Tea and coffee", "Payasa", "Sweets"],
    variants: [
      { size: "500 g", price: 75 },
      { size: "1 kg", price: 140 },
    ],
    art: { kind: "jar", fill: "#9C5A22" },
  },
  {
    slug: "rock-salt",
    name: "Rock salt",
    kannada: "ಕಲ್ಲುಪ್ಪು",
    category: "pantry",
    short: "Unrefined crystal salt.",
    description: "Coarse, unrefined salt. Grind as needed.",
    uses: ["Cooking", "Pickles"],
    variants: [{ size: "1 kg", price: 60 }],
    art: { kind: "jar", fill: "#E9D9D4" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const productsIn = (id: CategoryId) => products.filter((p) => p.category === id);
export const fromPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));

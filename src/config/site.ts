// Everything the client will want to change lives here.
export const site = {
  name: "Fresh Choice",
  partner: "Sai Sangama Sales Corporation",
  tagline: "Wood-pressed oils, delivered across Bengaluru",
  // Public address used for link previews, sitemap and Google data. Hosts set it on every build:
  // Vercel as VERCEL_PROJECT_PRODUCTION_URL (e.g. freshchoice.vercel.app, no https), Netlify as
  // URL. It follows the custom domain once one is connected. NEXT_PUBLIC_SITE_URL overrides both.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    process.env.URL ||
    "https://freshchoicewoodpressed.in"
  ).replace(/\/$/, ""),
  // WhatsApp number in international format, digits only (91 + 10-digit mobile)
  // PILOT: test number. Switch back to the client's 919731939909 / "+91 97319 39909" before launch.
  whatsapp: "917530000840",
  phoneDisplay: "+91 75300 00840",
  address:
    "176, 7th Cross Rd, near Ganesha Temple Road, Gopal Nagar, Nelgadernhalli, Nagasandra, Bengaluru, Karnataka 560073",
  // Same address split up for Google's structured data
  postal: {
    streetAddress: "176, 7th Cross Rd, near Ganesha Temple Road, Gopal Nagar, Nelgadernhalli, Nagasandra",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560073",
    addressCountry: "IN",
  },
  // Shown on the store card and used for the embedded map
  mapsQuery: "Fresh Choice, 176, 7th Cross Rd, Gopal Nagar, Nagasandra, Bengaluru 560073",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Fresh+Choice+176+7th+Cross+Rd+Gopal+Nagar+Nagasandra+Bengaluru+560073",
  freeDeliveryRadiusKm: 3,
  fssai: "FSSAI Lic. No. 11224315000120",
  hours: "Open daily · 9 AM – 9 PM",
  // 24h clock, Bengaluru time; drives the live "Open now" badge
  openHours: { open: 9, close: 21 },
  // Developer credit in the footer. Add a url (WhatsApp, LinkedIn, portfolio) to make it a link.
  credit: { name: "Santhosh Tharun", url: "" },
} as const;

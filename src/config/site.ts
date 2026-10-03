// Everything the client will want to change lives here.
export const site = {
  name: "Fresh Choice",
  partner: "Sai Sangama Sales Corporation",
  tagline: "Wood-pressed oils, delivered across Bengaluru",
  url: "https://freshchoicewoodpressed.in",
  // WhatsApp number in international format, digits only (91 + 10-digit mobile)
  whatsapp: "919731939909",
  phoneDisplay: "+91 97319 39909",
  address:
    "176, 7th Cross Rd, near Ganesha Temple Road, Gopal Nagar, Nelgadernhalli, Nagasandra, Bengaluru, Karnataka 560073",
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

# Fresh Choice – website (Phase 1)

Catalog site for Sai Sangama Sales Corporation. Customers browse products, build an order list, and send it as one WhatsApp message.

Stack: Next.js 16 (App Router) + Tailwind v4, fonts self-hosted via @fontsource. No backend in Phase 1.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Where to change things

| What | File |
|---|---|
| WhatsApp number, phone, store area, hours, FSSAI no. | `src/config/site.ts` |
| Products, sizes, prices, categories | `src/data/catalog.ts` |
| WhatsApp message format | `src/lib/whatsapp.ts` |
| Colours and fonts | `src/app/globals.css` |
| Home page sections | `src/app/page.tsx` |

Product images are SVG illustrations (`src/components/ProductArt.tsx`) until real photos arrive.

## Before go-live (needs client)

- [ ] Real WhatsApp number, store area, hours, FSSAI licence number
- [ ] Real product list, sizes and prices
- [ ] Product photos
- [ ] Logo (if Fresh Choice has an official one)
- [ ] Domain

## Deploy (Vercel)

1. Push this repo to GitHub.
2. vercel.com → Add New Project → import the repo → Deploy (no settings needed).
3. Project → Settings → Domains → add the client's domain and set the DNS records Vercel shows.

## Roadmap

- **Phase 2:** move catalog to Supabase, admin page for prices/stock, cart checkout with Razorpay/UPI, orders table, distance-based delivery fee.
- **Phase 3:** customer accounts, repeat/subscription orders, WhatsApp API notifications.

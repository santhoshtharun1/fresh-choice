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

## Deploy (Netlify)

1. app.netlify.com → **Add new project → Import an existing project → GitHub** → pick `fresh-choice`, branch `main`.
2. Build settings are detected automatically (build command `npm run build`). Click **Deploy**.
3. **Site configuration → Change site name** → e.g. `freshchoice` → the site is live at `https://freshchoice.netlify.app`.
4. Every push to `main` redeploys. Pull requests get their own preview link.

The site's public address (link previews, sitemap, Google data) comes from Netlify's `URL`, so it follows whatever address the site has. On another host, set `NEXT_PUBLIC_SITE_URL`.

**Custom domain later:** Netlify → **Domain management → Add a domain** → `freshchoicewoodpressed.in`, then add the DNS records Netlify shows at the domain registrar. HTTPS is set up automatically.

## Roadmap

- **Phase 2:** move catalog to Supabase, admin page for prices/stock, cart checkout with Razorpay/UPI, orders table, distance-based delivery fee.
- **Phase 3:** customer accounts, repeat/subscription orders, WhatsApp API notifications.

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

## Deploy

### Vercel
1. vercel.com → sign in with GitHub → **Add New → Project** → import `fresh-choice` → **Deploy** (settings are detected automatically).
2. Live at `https://<project-name>.vercel.app`. Rename under **Settings → General → Project Name**, then redeploy.
3. Every push to `main` goes live; every pull request gets a preview link.
4. Note: Vercel's free Hobby plan is for non-commercial use. A live shop should be on Pro.

### Netlify
1. app.netlify.com → **Add new project → Import an existing project → GitHub** → `fresh-choice`, branch `main` → **Deploy**.
2. **Site configuration → Change site name** (e.g. `freshchoice` → `https://freshchoice.netlify.app`), then trigger a redeploy.

The site's public address (link previews, sitemap, Google data) is read from the host on each build (`VERCEL_PROJECT_PRODUCTION_URL` on Vercel, `URL` on Netlify), so it follows the site's address, including a custom domain. Set `NEXT_PUBLIC_SITE_URL` to override.

**Custom domain later:** in the host's domain settings, add `freshchoicewoodpressed.in` and create the DNS records it shows at the domain registrar. HTTPS is automatic.

## Roadmap

- **Phase 2:** move catalog to Supabase, admin page for prices/stock, cart checkout with Razorpay/UPI, orders table, distance-based delivery fee.
- **Phase 3:** customer accounts, repeat/subscription orders, WhatsApp API notifications.

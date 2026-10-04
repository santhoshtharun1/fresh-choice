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

## Visitor and enquiry tracking (Umami)

Free, cookie-free analytics. Off until a website ID is set.

1. Sign up at cloud.umami.is → **Add website** → domain `freshchoice-oils.vercel.app` → copy the **Website ID**.
2. Vercel → project → **Settings → Environment Variables** → `NEXT_PUBLIC_UMAMI_WEBSITE_ID` = that ID → redeploy.
3. Umami → website → **Share** → turn on the share URL to give the client a read-only dashboard.

What is counted (only on the live address, never names, phones or addresses):

| Event | When | Data |
|---|---|---|
| page views | every visit | page, device, city, referrer |
| `add_to_list` | Add / Add to order list | product, size |
| `order_sent` | Send order on WhatsApp | ref, items, total, delivery, payment |
| `quick_order_sent` | Order just this | ref, product, size, qty, total |
| `bulk_quote_sent` | bulk quote form | ref, business type, frequency |
| `whatsapp_chat` | any chat-with-us button | where it was tapped |
| `call_click`, `directions_click` | store and footer buttons | where it was tapped |

Every order message ends with `Ref: FC-DDMM-XXXX (sent from the website)` (`FCB-` for bulk), the same ref
recorded in Umami, so website orders can be matched one-to-one with the shop's WhatsApp chats.

## Private Google Sheet log

Every visit, add-to-list, order, quick order, bulk quote and WhatsApp/Call/Directions tap on the live
site becomes a row in a private Google Sheet (tabs: Summary, Enquiries, Visits, Added to list).
Orders and bulk quotes also record the customer's name, phone and address/area (as the privacy
policy says); everything else is anonymous, and Umami never gets personal details. Share the sheet
only with the team. Off until the two env vars below are set.

**Updating the script later:** paste the new `Code.gs` (keep your TOKEN line), Save, run `setup` once
(it updates the header rows and keeps all data), then **Deploy → Manage deployments → ✏️ Edit →
Version: New version → Deploy**. The web app URL stays the same, so Vercel needs no change.

1. Create a Google Sheet, e.g. "Fresh Choice – Website log". **File → Settings → Time zone → (GMT+05:30) India**.
2. **Extensions → Apps Script** → replace the code with `docs/google-sheet/Code.gs` → set `TOKEN` to a long random secret → **Save**.
3. In the function menu pick **setup** → **Run** → allow access. This creates the tabs and the Summary.
4. **Deploy → New deployment** → type **Web app** → Execute as **Me** → Who has access **Anyone** → **Deploy** → copy the Web app URL.
5. Vercel → Environment Variables (Production, type **Secret**):
   `SHEET_WEBHOOK_URL` = the Web app URL, `SHEET_WEBHOOK_TOKEN` = the same secret as in step 2 → **Redeploy**.
6. Share the sheet with the team (**Share** → add emails as Viewer or Editor). Download with **File → Download → Excel**.

The Web app URL and token live only in Vercel's server settings; the website's code never exposes them.
Only requests to the live address are logged. If you edit Code.gs later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Roadmap

- **Phase 2:** move catalog to Supabase, admin page for prices/stock, cart checkout with Razorpay/UPI, orders table, distance-based delivery fee.
- **Phase 3:** customer accounts, repeat/subscription orders, WhatsApp API notifications.

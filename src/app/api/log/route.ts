import { after, type NextRequest } from "next/server";

// Receives enquiry/visit events from the site and forwards them to a private Google Sheet
// (Apps Script web app, see docs/google-sheet/Code.gs). The sheet URL and token live only in
// server env vars, so visitors can't see or write to the sheet directly.
// Customer contact details are passed on only for orders and bulk quotes (see CONTACT_EVENTS).

const EVENTS = new Set([
  "visit",
  "add_to_list",
  "order_sent",
  "quick_order_sent",
  "bulk_quote_sent",
  "whatsapp_chat",
  "call_click",
  "directions_click",
]);

// Only these events may carry the customer's name, phone and address
const CONTACT_EVENTS = new Set(["order_sent", "bulk_quote_sent"]);

const text = (v: unknown, max = 200) => (v === undefined || v === null ? "" : String(v).slice(0, max));
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : "");

// Only the live site writes rows; preview links and local dev are ignored.
function liveHost() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = process.env.NEXT_PUBLIC_SITE_URL || (vercel && `https://${vercel}`) || process.env.URL;
  try {
    return url ? new URL(url).host : null;
  } catch {
    return null;
  }
}

const noContent = () => new Response(null, { status: 204 });

export async function POST(request: NextRequest) {
  const hook = process.env.SHEET_WEBHOOK_URL;
  const token = process.env.SHEET_WEBHOOK_TOKEN;
  if (!hook || !token || request.headers.get("host") !== liveHost()) return noContent();
  if (Number(request.headers.get("content-length") ?? 0) > 4000) return new Response(null, { status: 413 });

  let body: {
    event?: unknown;
    data?: Record<string, unknown>;
    contact?: Record<string, unknown>;
    page?: unknown;
    referrer?: unknown;
    device?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  if (typeof body.event !== "string" || !EVENTS.has(body.event)) return new Response(null, { status: 400 });

  const d = body.data && typeof body.data === "object" ? body.data : {};
  const c = CONTACT_EVENTS.has(body.event) && body.contact && typeof body.contact === "object" ? body.contact : {};
  const row = {
    token,
    event: body.event,
    ref: text(d.ref, 40),
    products: text(d.products ?? d.product, 300),
    size: text(d.size, 40),
    qty: num(d.qty ?? d.items),
    total: num(d.total),
    delivery: text(d.delivery, 40),
    payment: text(d.payment, 40),
    from: text(d.from ?? d.type, 60),
    page: text(body.page, 200),
    referrer: text(body.referrer, 200),
    device: text(body.device, 20),
    name: text(c.name, 80),
    phone: text(c.phone, 20),
    address: text(c.address, 300),
    business: text(c.business, 80),
  };

  after(() =>
    fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(row) }).catch(() => {}),
  );
  return noContent();
}

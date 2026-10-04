// Visitor and enquiry tracking (Umami). Does nothing until NEXT_PUBLIC_UMAMI_WEBSITE_ID is set.
// Never send customer names, phone numbers or addresses here: only counts, refs and totals.

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

export function track(event: string, data?: EventData) {
  try {
    window.umami?.track(event, data);
  } catch {}
}

// Short code added to every WhatsApp order from the site, e.g. "FC-0410-K7Q2", so orders seen in
// the analytics dashboard can be matched one-to-one with messages in the shop's WhatsApp.
export function orderRef(prefix = "FC") {
  const d = new Date();
  const day = `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)), (n) => chars[n % chars.length]).join("");
  return `${prefix}-${day}-${rand}`;
}

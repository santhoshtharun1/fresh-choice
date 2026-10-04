// Visitor and enquiry tracking: Umami (dashboard) and our private Google Sheet (via /api/log).
// Each is inactive until its env vars are set.
// Umami never gets customer names, phones or addresses. The private Google Sheet gets them only for
// orders and bulk quotes (the `contact` argument), so the shop can see who enquired.

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

export type Contact = { name?: string; phone?: string; address?: string; business?: string };

export function track(event: string, data?: EventData, contact?: Contact) {
  try {
    window.umami?.track(event, data);
  } catch {}
  logToSheet(event, data, contact);
}

// Sends one row to the private Google Sheet. sendBeacon survives the page switching to WhatsApp.
export function logToSheet(event: string, data?: EventData, contact?: Contact) {
  try {
    const body = JSON.stringify({
      event,
      data,
      contact,
      page: location.pathname,
      referrer: document.referrer && new URL(document.referrer).host !== location.host ? document.referrer : "",
      device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    });
    const blob = new Blob([body], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/log", blob)) {
      fetch("/api/log", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
    }
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

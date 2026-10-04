import { site } from "@/config/site";

export const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Indian mobile number: accepts "98765 43210", "+91 98765-43210", "098765..."; returns "9876543210" or null
export function cleanPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

const formatPhone = (raw: string) => {
  const d = cleanPhone(raw);
  return d ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : raw;
};

export type OrderLine = { name: string; size: string; price: number; qty: number };

export type Customer = {
  name: string;
  phone: string;
  address: string;
  delivery: "near" | "far";
  // Cash on delivery is only offered within the free-delivery radius
  payment: "cod" | "upi";
};

export const paysCod = (c: Customer) => c.delivery === "near" && c.payment === "cod";

export function orderMessage(lines: OrderLine[], c: Customer) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const items = lines
    .map((l) => `• ${l.name} – ${l.size} × ${l.qty} = ${rupees(l.price * l.qty)}`)
    .join("\n");
  const delivery =
    c.delivery === "near"
      ? `Within ${site.freeDeliveryRadiusKm} km – free doorstep delivery`
      : `Beyond ${site.freeDeliveryRadiusKm} km – delivery by your delivery partner (I'll pay the delivery charges)`;
  const payment = paysCod(c)
    ? "Cash on delivery"
    : "UPI – please send the UPI details on WhatsApp";

  return [
    `Hi ${site.name}, I'd like to order:`,
    "",
    items,
    "",
    `Estimated total: ${rupees(total)}`,
    "",
    `Name: ${c.name}`,
    `Phone: ${formatPhone(c.phone)}`,
    `Address: ${c.address}`,
    `Delivery: ${delivery}`,
    `Payment: ${payment}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function quickOrderMessage(name: string, size: string, qty: number, price: number) {
  return [
    `Hi ${site.name}, I'd like to order:`,
    "",
    `• ${name} – ${size} × ${qty} = ${rupees(price * qty)}`,
    "",
    "Please confirm and share delivery details.",
  ].join("\n");
}

import { site } from "@/config/site";

export const rupees = (n: number) => "₹" + n.toLocaleString("en-IN");

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export type OrderLine = { name: string; size: string; price: number; qty: number };

export type Customer = {
  name: string;
  phone: string;
  address: string;
  delivery: "near" | "far";
};

export function orderMessage(lines: OrderLine[], c: Customer) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const items = lines
    .map((l) => `• ${l.name} – ${l.size} × ${l.qty} = ${rupees(l.price * l.qty)}`)
    .join("\n");
  const delivery =
    c.delivery === "near"
      ? `Within ${site.freeDeliveryRadiusKm} km – please deliver`
      : `Beyond ${site.freeDeliveryRadiusKm} km – send by Rapido parcel, I'll pay the fare`;

  return [
    `Hi ${site.name}, I'd like to order:`,
    "",
    items,
    "",
    `Estimated total: ${rupees(total)}`,
    "",
    `Name: ${c.name}`,
    c.phone ? `Phone: ${c.phone}` : null,
    `Address: ${c.address}`,
    `Delivery: ${delivery}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function quickOrderMessage(name: string, size: string, qty: number) {
  return `Hi ${site.name}, I'd like to order ${name} – ${size} × ${qty}. Please share the price and delivery details.`;
}

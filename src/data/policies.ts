import { site } from "@/config/site";

// TODO(client): have these reviewed before go-live.
export type Policy = { slug: string; title: string; intro: string; sections: { heading: string; body: string[] }[] };

const r = site.freeDeliveryRadiusKm;
const contact = `WhatsApp or call us on ${site.phoneDisplay} (${site.hours}).`;

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    intro: `This explains what ${site.name} collects when you use this website and how we use it.`,
    sections: [
      {
        heading: "What we collect",
        body: [
          "We don't ask you to create an account. When you send an order or a bulk enquiry, the website opens WhatsApp with a message containing your name, phone number (if you add it), delivery address and the products you chose. We only receive this when you press send in WhatsApp.",
          "Your order list is saved in your own browser on this device so it is still there when you come back. It is not sent to us until you send the order.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your details only to confirm, pack and deliver your order, and to contact you about it.",
          "To deliver your order, we share your name, phone number and address with our delivery partner. We don't sell or share your details with anyone else.",
        ],
      },
      { heading: "Questions or deletion", body: [`To ask what we hold about you or to have it deleted, ${contact}`] },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of service",
    intro: `These terms apply when you order from ${site.name} through this website or WhatsApp.`,
    sections: [
      {
        heading: "Orders and prices",
        body: [
          "Prices shown on the website are a guide. Oil prices follow the seed market, so we confirm the final price on WhatsApp before your order is packed. Your order is confirmed only after we reply.",
          "We may decline or cancel an order if a product is out of stock, a price was shown wrongly, or we can't deliver to the address given. If you have already paid, we refund you in full.",
          "There is no minimum order.",
        ],
      },
      {
        heading: "Payment",
        body: [
          `Within ${r} km of our store you can pay cash on delivery or by UPI. Beyond ${r} km, orders are paid by UPI before dispatch.`,
        ],
      },
      {
        heading: "Use of products",
        body: [
          "Castor oil and deepam oil are not for cooking or eating. Wood-pressed oils are unrefined, so some settling or cloudiness is natural. Store them closed, away from sunlight.",
        ],
      },
      { heading: "Contact", body: [`${site.name}, ${site.address}. ${site.fssai}. ${contact}`] },
    ],
  },
  {
    slug: "shipping-policy",
    title: "Shipping and delivery policy",
    intro: "We deliver across Bengaluru.",
    sections: [
      {
        heading: `Within ${r} km of our store`,
        body: ["Free doorstep delivery by our delivery partner. Pay cash on delivery or by UPI. We confirm the delivery time on WhatsApp."],
      },
      {
        heading: `More than ${r} km away`,
        body: [
          "Our delivery partner delivers to your door once your UPI payment is received. Delivery charges are paid by you, and we tell you the exact amount before dispatch.",
        ],
      },
      {
        heading: "Store pickup",
        body: [`You can also collect your order from our store: ${site.address}. ${site.hours}.`],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund and cancellation policy",
    intro: "Our oils are food products, so for hygiene and safety we can't take back opened or used products. Here is what we do when something goes wrong.",
    sections: [
      {
        heading: "Cancelling an order",
        body: [
          "You can cancel any time before your order is dispatched. If you paid by UPI, we refund the full amount to the same UPI account within 5–7 working days.",
          "Once an order has left our store it can't be cancelled.",
        ],
      },
      {
        heading: "Damaged, leaking or wrong products",
        body: [
          "Tell us within 24 hours of delivery if a bottle arrives damaged, leaking, unsealed or past its best-before date, or if you received the wrong product.",
          "Send a WhatsApp message with your name, the product, and clear photos or a short video of the problem. Keep the product in its original packaging until we reply.",
          "If the issue is confirmed, we will replace the product or refund you, whichever you prefer.",
        ],
      },
      {
        heading: "What we can't accept",
        body: [
          "Products that have been opened, used or not kept in their original packaging, except for a genuine quality problem reported within 24 hours.",
          "Delivery charges already paid are not refundable unless the problem was our mistake.",
        ],
      },
      { heading: "Contact", body: [contact] },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
